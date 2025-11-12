/**
 * Custom X402 Middleware with ERC-6492 Support
 * 
 * This middleware extends the standard x402-next middleware to support ERC-6492 signatures
 * from smart contract wallets like Coinbase Smart Wallet, while maintaining all the
 * security features of the standard middleware.
 */

import { NextRequest, NextResponse } from 'next/server';
import { exact } from 'x402/schemes';
import { verifyPaymentWithERC6492 } from './custom-facilitator';
import { getX402Config, ENDPOINT_PRICING } from './x402-config';
import type { PaymentRequirements } from 'x402/types';

const x402Config = getX402Config();

// In-memory nonce tracking (in production, use Redis or database)
const usedNonces = new Set<string>();

// Track payment verifications (simple in-memory cache)
// In production, use Redis with TTL
const verifiedPayments = new Map<string, {
  payer: string;
  expiresAt: number;
  nonce: string;
}>();

export function createX402MiddlewareWithERC6492(
  endpoint: string,
  price: number,
  description: string,
  outputSchema?: any
) {
  return async (req: NextRequest) => {
    const paymentRequirements: PaymentRequirements = {
      scheme: 'exact',
      network: x402Config.chain,
      maxAmountRequired: String(price * 1_000_000),
      resource: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${endpoint}`,
      description,
      mimeType: 'application/json',
      payTo: x402Config.walletAddress as `0x${string}`,
      maxTimeoutSeconds: 300,
      asset: x402Config.usdcAddress as `0x${string}`,
      outputSchema: outputSchema || {
        input: {
          type: 'http',
          method: 'GET',
          discoverable: true,
        },
      },
      extra: {
        name: 'USDC',
        version: '2',
      },
    };

    console.log(`\n🔐 Middleware: Protecting ${endpoint}`);

    // Check for X-PAYMENT header
    const paymentHeader = req.headers.get('X-PAYMENT');
    
    if (!paymentHeader) {
      console.log('❌ No X-PAYMENT header found - returning 402');
      return NextResponse.json({
        x402Version: 1,
        error: 'Payment required',
        accepts: [paymentRequirements],
      }, { status: 402 });
    }

    try {
      // Decode the payment to get the nonce
      const paymentPayload = exact.evm.decodePayment(paymentHeader);
      const evmPayload = paymentPayload.payload as any;
      const nonce = evmPayload.authorization.nonce;
      const payer = evmPayload.authorization.from;

      console.log(`   Payment from: ${payer}`);
      console.log(`   Nonce: ${nonce}`);

      // Check if this payment was already verified and is still valid
      const cached = verifiedPayments.get(nonce);
      if (cached && cached.expiresAt > Date.now()) {
        console.log('✅ Payment already verified and cached - allowing access');
        return NextResponse.next();
      }

      // Check if nonce was already used (replay attack protection)
      if (usedNonces.has(nonce)) {
        console.log('❌ Nonce already used - potential replay attack');
        return NextResponse.json({
          x402Version: 1,
          error: 'Payment nonce already used',
          accepts: [paymentRequirements],
        }, { status: 402 });
      }

      console.log('🔍 Verifying payment with ERC-6492 support...');
      
      // Verify payment with ERC-6492 support
      const verificationResult = await verifyPaymentWithERC6492(
        paymentHeader,
        paymentRequirements
      );

      if (!verificationResult.isValid) {
        console.log(`❌ Payment verification failed: ${verificationResult.invalidReason}`);
        return NextResponse.json({
          x402Version: 1,
          error: `Payment verification failed: ${verificationResult.invalidReason}`,
          accepts: [paymentRequirements],
        }, { status: 402 });
      }

      console.log('✅ Payment verified successfully!');

      // Mark nonce as used (prevents replay attacks)
      usedNonces.add(nonce);

      // Cache the verification (expires in 5 minutes)
      verifiedPayments.set(nonce, {
        payer,
        expiresAt: Date.now() + 5 * 60 * 1000,
        nonce,
      });

      // Clean up old entries (simple garbage collection)
      const now = Date.now();
      for (const [key, value] of verifiedPayments.entries()) {
        if (value.expiresAt < now) {
          verifiedPayments.delete(key);
          usedNonces.delete(value.nonce);
        }
      }

      console.log('✅ Access granted - forwarding to API route');

      // Allow the request to proceed
      return NextResponse.next();

    } catch (error) {
      console.error('❌ Middleware error:', error);
      return NextResponse.json({
        x402Version: 1,
        error: 'Payment processing error',
        accepts: [paymentRequirements],
      }, { status: 402 });
    }
  };
}

