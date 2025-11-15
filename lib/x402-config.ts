/**
 * X402 Configuration
 * Handles network-specific settings for testnet and mainnet
 */

import { facilitator, createFacilitatorConfig } from '@coinbase/x402';

export type NetworkType = 'testnet' | 'mainnet';
export type ChainType = 'base' | 'base-sepolia';
export type FacilitatorType = 'x402-org' | 'coinbase-cdp';

/**
 * USDC Token Addresses (Public Constants)
 *
 * These are the official USDC token contract addresses on Base networks.
 *
 * @see https://docs.base.org/tokens - Base token addresses
 */
export const USDC_ADDRESSES = {
  mainnet: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC on Base Mainnet
  testnet: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
} as const;

export interface X402Config {
  network: NetworkType;
  chain: ChainType;
  walletAddress: string;
  usdcAddress: string;
  facilitatorUrl?: string;
  facilitator?: any; // Facilitator instance from @coinbase/x402 (community or CDP)
  facilitatorType: FacilitatorType;
  cdpApiKeyName?: string;
  cdpApiKeyPrivateKey?: string;
}

/**
 * Get X402 configuration based on environment variables
 * Defaults to mainnet if NETWORK is not set
 */
export function getX402Config(): X402Config {
  const network = (process.env.NETWORK || 'mainnet') as NetworkType;

  if (network === 'testnet') {
    const walletAddress = process.env.NEXT_PUBLIC_TESTNET_WALLET_ADDRESS;

    if (!walletAddress) {
      throw new Error('TESTNET_WALLET_ADDRESS is required when NETWORK=testnet');
    }

    return {
      network: 'testnet',
      chain: 'base-sepolia',
      walletAddress,
      usdcAddress: USDC_ADDRESSES.testnet,
      facilitatorUrl: 'https://x402.org/facilitator',
      facilitator: facilitator, // Use default community facilitator from @coinbase/x402
      facilitatorType: 'x402-org',
    };
  } else {
    // Mainnet configuration
    const walletAddress = process.env.NEXT_PUBLIC_MAINNET_WALLET_ADDRESS;
    const cdpApiKeyName = process.env.CDP_API_KEY_ID;
    const cdpApiKeyPrivateKey = process.env.CDP_API_KEY_SECRET;

    if (!walletAddress) {
      throw new Error('MAINNET_WALLET_ADDRESS is required when NETWORK=mainnet');
    }

    if (!cdpApiKeyName || !cdpApiKeyPrivateKey) {
      throw new Error('CDP_API_KEY_ID and CDP_API_KEY_SECRET are required for mainnet');
    }

    // Create CDP facilitator for mainnet using API keys
    const cdpFacilitator = createFacilitatorConfig(cdpApiKeyName, cdpApiKeyPrivateKey);

    return {
      network: 'mainnet',
      chain: 'base',
      walletAddress,
      usdcAddress: USDC_ADDRESSES.mainnet,
      facilitator: cdpFacilitator,
      facilitatorType: 'coinbase-cdp',
      cdpApiKeyName,
      cdpApiKeyPrivateKey,
    };
  }
}

/**
 * Endpoint pricing configuration
 */
export const ENDPOINT_PRICING = {
  'message': 0.10,        // $0.10
  'ui-ux-book': 10.00,    // $10.00
  'shadcn-block': 0.01,   // $0.01
} as const;

export type EndpointName = keyof typeof ENDPOINT_PRICING;
