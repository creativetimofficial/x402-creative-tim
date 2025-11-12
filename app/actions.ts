"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";
import { getX402Config, ENDPOINT_PRICING } from "@/lib/x402-config";
import { verifyPaymentWithERC6492, settlePaymentWithFacilitator } from "@/lib/custom-facilitator";

const x402Config = getX402Config();

/**
 * Verify and settle payment for /api/message endpoint
 */
export async function verifyMessagePayment(payload: string): Promise<{success: boolean; error?: string}> {
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: x402Config.chain,
    maxAmountRequired: String(ENDPOINT_PRICING.message * 1_000_000), // Convert to USDC base units
    resource: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/message`,
    description: "Simple message API - test X402 payments",
    mimeType: "application/json",
    payTo: x402Config.walletAddress as `0x${string}`,
    maxTimeoutSeconds: 300,
    asset: x402Config.usdcAddress as `0x${string}`,
    outputSchema: undefined,
    extra: {
      name: "USDC",
      version: "2",
    },
  };

  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔍 SERVER: Payment Verification & Settlement (Custom ERC-6492 Facilitator)');
    console.log('='.repeat(80));
    console.log(`⏰ Server time: ${new Date().toISOString()}`);
    console.log(`📍 Resource: ${paymentRequirements.resource}`);
    console.log(`💰 Amount: ${paymentRequirements.maxAmountRequired} (${ENDPOINT_PRICING.message} USDC)`);
    console.log(`🔗 Network: ${paymentRequirements.network}`);
    console.log(`💳 Pay to: ${paymentRequirements.payTo}`);
    console.log(`🏢 Facilitator: Custom with ERC-6492 support`);
    
    console.log('\n📦 Decoding payment payload...');
    const payment = exact.evm.decodePayment(payload);
    const evmPayload = payment.payload as any; // ExactEvmPayload type
    console.log('✅ Payment decoded successfully');
    console.log(`   Payer: ${evmPayload?.authorization?.from || 'unknown'}`);
    console.log(`   Amount: ${evmPayload?.authorization?.value || 'unknown'}`);
    console.log(`   Nonce: ${evmPayload?.authorization?.nonce || 'unknown'}`);
    console.log(`   Signature length: ${evmPayload?.signature?.length || 0}`);
    
    console.log('\n🔍 Verifying payment with custom facilitator (ERC-6492 support)...');
    const valid = await verifyPaymentWithERC6492(payload, paymentRequirements);
    console.log(`📡 Verification response:`, valid);

    if (!valid.isValid) {
      console.error('❌ Payment verification failed!');
      console.error(`   Reason: ${valid.invalidReason}`);
      console.error(`   Payer: ${valid.payer}`);
      console.error('='.repeat(80) + '\n');
      return { success: false, error: `Failed to verify payment: ${valid.invalidReason || "Unknown reason"}` };
    }

    console.log('✅ Payment verified successfully!');
    console.log(`   Payer verified: ${valid.payer}`);

    console.log('\n💰 Settling payment with facilitator...');
    console.log(`   This calls the x402 facilitator to settle the transaction`);

    const settleResponse = await settlePaymentWithFacilitator(payload, paymentRequirements);
    console.log(`📡 Settlement response:`, settleResponse);

    if (!settleResponse.success) {
      console.error('❌ Payment settlement failed!');
      console.error(`   Error reason: ${settleResponse.errorReason}`);
      console.error(`   Network: ${settleResponse.network}`);
      console.error(`   Transaction: ${settleResponse.transaction}`);
      console.error('='.repeat(80) + '\n');

      // Provide more detailed error message
      const errorDetails = settleResponse.errorReason || 'Unknown settlement error';
      return {
        success: false,
        error: `Failed to settle payment: ${errorDetails}. This may be due to insufficient USDC balance, network issues, or facilitator errors.`
      };
    }

    console.log('✅ Payment settled successfully!');
    console.log(`   Transaction: ${settleResponse.transaction}`);
    console.log(`   Network: ${settleResponse.network}`);
    console.log(`   Payer: ${settleResponse.payer}`);

    console.log('\n🍪 Setting payment session cookie...');
    const cookieStore = await cookies();
    cookieStore.set("message-payment-session", payload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    console.log('✅ Cookie set successfully');

    console.log('\n' + '='.repeat(80));
    console.log('🎉 SERVER: Payment Verification & Settlement COMPLETED');
    console.log('='.repeat(80) + '\n');

    return { success: true };
  } catch (error) {
    console.error('\n' + '='.repeat(80));
    console.error('❌ SERVER: Payment Processing FAILED');
    console.error('='.repeat(80));
    console.error(`⏰ Failed at: ${new Date().toISOString()}`);
    console.error('Error details:', error);
    
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack:`, error.stack);
    }
    console.error('='.repeat(80) + '\n');
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred during payment processing"
    };
  }
}

/**
 * Fetch the message content (called after payment verification)
 * Includes polling for blockchain confirmation (can take 15-20 seconds)
 */
export async function fetchMessageContent(retryCount = 0): Promise<{
  success: boolean; 
  data?: any; 
  error?: string;
  retryInfo?: { current: number; max: number }
}> {
  const cookieStore = await cookies();
  const paymentSession = cookieStore.get("message-payment-session");

  if (!paymentSession) {
    console.error("❌ No payment session cookie found");
    return { success: false, error: "No payment session found" };
  }

  // Poll for up to 30 seconds with 2 second intervals
  const MAX_RETRIES = 15; // 15 attempts × 2 seconds = 30 seconds max
  const RETRY_DELAY_MS = 2000; // 2 seconds between attempts

  const attempt = retryCount + 1;
  const timestamp = new Date().toISOString();
  
  console.log(`\n🔄 [${timestamp}] Fetch attempt ${attempt}/${MAX_RETRIES}`);
  console.log(`📝 Payment session cookie: ${paymentSession.value.substring(0, 50)}...`);

  try {
    // Small initial delay for cookie propagation on first attempt
    if (retryCount === 0) {
      console.log("⏳ Initial 1s delay for cookie propagation...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/message`;
    console.log(`🌐 Fetching from: ${apiUrl}`);

    // Fetch from the API endpoint
    const response = await fetch(apiUrl, {
      headers: {
        'X-PAYMENT': paymentSession.value,
      },
      cache: 'no-store', // Ensure fresh response
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // If we get a 402 and haven't exhausted retries, poll again
      if (response.status === 402 && retryCount < MAX_RETRIES) {
        const errorData = await response.json().catch(() => ({}));
        console.log(`⚠️  Payment not yet confirmed on chain. This is normal for blockchain transactions.`);
        console.log(`⏳ Waiting ${RETRY_DELAY_MS / 1000}s before retry ${attempt + 1}/${MAX_RETRIES}...`);
        console.log(`📊 Error details:`, errorData);
        
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchMessageContent(retryCount + 1);
      }
      
      console.error(`❌ Failed after ${attempt} attempts. Status: ${response.status}`);
      const errorText = await response.text().catch(() => 'Unknown error');
      return { 
        success: false, 
        error: `Failed to fetch content: ${response.statusText}`,
        retryInfo: { current: attempt, max: MAX_RETRIES }
      };
    }

    const data = await response.json();
    console.log(`✅ Content fetched successfully after ${attempt} attempt(s)!`);
    console.log(`📦 Data:`, data);
    return { success: true, data, retryInfo: { current: attempt, max: MAX_RETRIES } };
    
  } catch (error) {
    console.error(`❌ Network/fetch error on attempt ${attempt}:`, error);
    
    // Retry on network errors
    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Network error - retrying in ${RETRY_DELAY_MS / 1000}s (${attempt + 1}/${MAX_RETRIES})...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return fetchMessageContent(retryCount + 1);
    }
    
    console.error(`❌ Failed after ${MAX_RETRIES} attempts due to network errors`);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch content after multiple attempts",
      retryInfo: { current: attempt, max: MAX_RETRIES }
    };
  }
}

/**
 * Verify and settle payment for /api/shadcn-block endpoint
 * Returns block data after successful payment verification
 */
export async function verifyShadcnBlockPayment(payload: string): Promise<{success: boolean; data?: any; error?: string}> {
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: x402Config.chain,
    maxAmountRequired: String(ENDPOINT_PRICING['shadcn-block'] * 1_000_000),
    resource: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/shadcn-block`,
    description: "Get ShadCN UI component blocks and templates",
    mimeType: "application/json",
    payTo: x402Config.walletAddress as `0x${string}`,
    maxTimeoutSeconds: 300,
    asset: x402Config.usdcAddress as `0x${string}`,
    outputSchema: undefined,
    extra: {
      name: "USDC",
      version: "2",
    },
  };

  try {
    console.log('\n' + '='.repeat(80));
    console.log('🎨 ShadCN Block Payment Verification');
    console.log('='.repeat(80));

    const valid = await verifyPaymentWithERC6492(payload, paymentRequirements);
    if (!valid.isValid) {
      console.error('❌ Payment verification failed:', valid.invalidReason);
      return { success: false, error: `Failed to verify payment: ${valid.invalidReason || "Unknown reason"}` };
    }

    console.log('✅ Payment verified, settling...');
    const settleResponse = await settlePaymentWithFacilitator(payload, paymentRequirements);
    if (!settleResponse.success) {
      const errorDetails = settleResponse.errorReason || 'Unknown settlement error';
      console.error('❌ Settlement failed:', errorDetails);
      return { success: false, error: `Failed to settle payment: ${errorDetails}` };
    }

    console.log('✅ Payment settled successfully! Transaction:', settleResponse.transaction);
    console.log('📦 Fetching block data from Creative Tim registry...');

    // Fetch the block data directly from Creative Tim registry
    // (bypassing our own API since it's protected by X402 middleware)
    const registryUrl = 'https://www.creative-tim.com/ui/r/cruds-01.json';
    const response = await fetch(registryUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Failed to fetch block data from registry:', response.statusText);
      return { success: false, error: `Failed to fetch block data: ${response.statusText}` };
    }

    const blockData = await response.json();
    console.log('✅ Block data fetched successfully from Creative Tim registry!');
    console.log('='.repeat(80) + '\n');

    return { success: true, data: blockData };
  } catch (error) {
    console.error('❌ Payment processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during payment processing"
    };
  }
}

/**
 * Fetch the shadcn-block content
 * Includes polling for blockchain confirmation (similar to message endpoint)
 */
export async function fetchShadcnBlockContent(retryCount = 0): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  retryInfo?: { current: number; max: number }
}> {
  const cookieStore = await cookies();
  const paymentSession = cookieStore.get("shadcn-block-payment-session");

  if (!paymentSession) {
    console.error("❌ No payment session cookie found");
    return { success: false, error: "No payment session found" };
  }

  // Poll for up to 30 seconds with 2 second intervals
  const MAX_RETRIES = 15;
  const RETRY_DELAY_MS = 2000;

  const attempt = retryCount + 1;
  const timestamp = new Date().toISOString();

  console.log(`\n🔄 [${timestamp}] Fetch attempt ${attempt}/${MAX_RETRIES}`);
  console.log(`📝 Payment session cookie: ${paymentSession.value.substring(0, 50)}...`);

  try {
    // Small initial delay for cookie propagation on first attempt
    if (retryCount === 0) {
      console.log("⏳ Initial 1s delay for cookie propagation...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/shadcn-block`;
    console.log(`🌐 Fetching from: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: { 'X-PAYMENT': paymentSession.value },
      cache: 'no-store',
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      // If we get a 402 and haven't exhausted retries, poll again
      if (response.status === 402 && retryCount < MAX_RETRIES) {
        const errorData = await response.json().catch(() => ({}));
        console.log(`⚠️  Payment not yet confirmed on chain. Retrying...`);
        console.log(`⏳ Waiting ${RETRY_DELAY_MS / 1000}s before retry ${attempt + 1}/${MAX_RETRIES}...`);

        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return fetchShadcnBlockContent(retryCount + 1);
      }

      console.error(`❌ Failed after ${attempt} attempts. Status: ${response.status}`);
      return {
        success: false,
        error: `Failed to fetch content: ${response.statusText}`,
        retryInfo: { current: attempt, max: MAX_RETRIES }
      };
    }

    const data = await response.json();
    console.log(`✅ Content fetched successfully after ${attempt} attempt(s)!`);
    return { success: true, data, retryInfo: { current: attempt, max: MAX_RETRIES } };

  } catch (error) {
    console.error(`❌ Network/fetch error on attempt ${attempt}:`, error);

    // Retry on network errors
    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Network error - retrying in ${RETRY_DELAY_MS / 1000}s (${attempt + 1}/${MAX_RETRIES})...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return fetchShadcnBlockContent(retryCount + 1);
    }

    console.error(`❌ Failed after ${MAX_RETRIES} attempts due to network errors`);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch content after multiple attempts",
      retryInfo: { current: attempt, max: MAX_RETRIES }
    };
  }
}

/**
 * Verify and settle payment for /api/ui-ux-book endpoint
 * No cookie needed - just verify and settle the payment
 */
export async function verifyUIUXBookPayment(payload: string): Promise<{success: boolean; error?: string}> {
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: x402Config.chain,
    maxAmountRequired: String(ENDPOINT_PRICING['ui-ux-book'] * 1_000_000),
    resource: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ui-ux-book`,
    description: "Access premium UI/UX book content and resources",
    mimeType: "application/pdf",
    payTo: x402Config.walletAddress as `0x${string}`,
    maxTimeoutSeconds: 300,
    asset: x402Config.usdcAddress as `0x${string}`,
    outputSchema: undefined,
    extra: {
      name: "USDC",
      version: "2",
    },
  };

  try {
    console.log('\n' + '='.repeat(80));
    console.log('📚 UI/UX Book Payment Verification');
    console.log('='.repeat(80));
    
    const valid = await verifyPaymentWithERC6492(payload, paymentRequirements);
    if (!valid.isValid) {
      console.error('❌ Payment verification failed:', valid.invalidReason);
      return { success: false, error: `Failed to verify payment: ${valid.invalidReason || "Unknown reason"}` };
    }

    console.log('✅ Payment verified, settling...');
    const settleResponse = await settlePaymentWithFacilitator(payload, paymentRequirements);
    if (!settleResponse.success) {
      const errorDetails = settleResponse.errorReason || 'Unknown settlement error';
      console.error('❌ Settlement failed:', errorDetails);
      return { success: false, error: `Failed to settle payment: ${errorDetails}` };
    }

    console.log('✅ Payment settled successfully! Transaction:', settleResponse.transaction);
    console.log('='.repeat(80) + '\n');

    return { success: true };
  } catch (error) {
    console.error('❌ Payment processing error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred during payment processing"
    };
  }
}

