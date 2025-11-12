/**
 * Test Middleware using Official x402-next Flow
 * Uses Coinbase facilitator which properly settles payments on blockchain
 */

import { NextRequest } from 'next/server';
import { paymentMiddleware } from 'x402-next';
import { facilitator } from '@coinbase/x402';
import { getX402Config } from './x402-config';
import type { Address } from 'viem';

const x402Config = getX402Config();

// Using Coinbase facilitator for proper blockchain settlement
export const testOfficialMiddleware = paymentMiddleware(
  x402Config.walletAddress as Address,
  {
    '/protected': {
      price: '$0.01',
      network: x402Config.chain,
      config: {
        description: 'Access to protected content',
      },
    },
    '/api/test-official': {
      price: '$0.01',
      network: x402Config.chain,
      config: {
        description: 'Test API route using official x402-next flow with proper settlement',
      },
    },
  },
  facilitator,
  {
    appName: 'Creative Tim X402 Demo',
    appLogo: '/logo.png',
  }
);

// Export the middleware handler
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/protected') || req.nextUrl.pathname.startsWith('/api/test-official')) {
    return testOfficialMiddleware(req);
  }
}
