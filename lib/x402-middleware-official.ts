/**
 * Official X402 Middleware Configuration
 *
 * Uses x402-next + @coinbase/x402 facilitator for proper blockchain settlement.
 * This replaces the custom middleware that only verified signatures.
 *
 * All endpoints configured here will:
 * 1. Verify payment signatures (including ERC-6492)
 * 2. Settle transactions on blockchain via Coinbase CDP
 * 3. Transfer USDC to the specified wallet
 * 4. Return real transaction hashes
 */

import { paymentMiddleware } from 'x402-next';
import { getX402Config, ENDPOINT_PRICING } from './x402-config';
import type { Address } from 'viem';

const x402Config = getX402Config();

// Use facilitator from config (CDP for mainnet, community for testnet)
if (!x402Config.facilitator) {
  throw new Error('Facilitator not configured. Check your network settings and API keys.');
}

/**
 * Unified middleware for all payment-protected endpoints
 *
 * Benefits over custom implementation:
 * - Automatic settlement on blockchain
 * - Real transaction execution
 * - Built-in ERC-6492 support
 * - Coinbase CDP integration
 * - Less code to maintain
 */
export const officialMiddleware = paymentMiddleware(
  x402Config.walletAddress as Address,
  {
    // Message API - $0.10
    '/api/message': {
      price: `$${ENDPOINT_PRICING.message.toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'Simple message - test X402 payments',
      },
    },

    // Message User Payment Page - $0.10
    '/message/user-payment': {
      price: `$${ENDPOINT_PRICING.message.toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'View message content after payment',
      },
    },

    // UI/UX Book API - $0.10
    '/api/ui-ux-book': {
      price: `$${ENDPOINT_PRICING['ui-ux-book'].toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'Access premium UI/UX book content and resources',
      },
    },

    // UI/UX Book User Payment Page - $0.10
    '/ui-ux-book/user-payment': {
      price: `$${ENDPOINT_PRICING['ui-ux-book'].toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'Download UI/UX book after payment',
      },
    },

    // ShadCN Block API - $0.01
    '/api/shadcn-block': {
      price: `$${ENDPOINT_PRICING['shadcn-block'].toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'Get ShadCN UI component blocks and templates',
      },
    },

    // ShadCN Blocks User Payment Page - $0.01
    '/shadcn-blocks/user-payment': {
      price: `$${ENDPOINT_PRICING['shadcn-block'].toFixed(2)}`,
      network: x402Config.chain,
      config: {
        description: 'View component code after payment',
      },
    },
  },
  x402Config.facilitator,
  {
    appName: 'Creative Tim X402',
    appLogo:  `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
  }
);
