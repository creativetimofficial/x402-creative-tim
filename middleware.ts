/**
 * X402 Payment Middleware
 * Protects API routes and pages with payment requirements
 *
 * Now uses official x402-next + @coinbase/x402 facilitator for all endpoints.
 * This ensures proper blockchain settlement and actual fund transfers.
 *
 * See docs/PAYMENT_FLOW_COMPARISON.md for details on why this works.
 */

import { NextRequest, NextResponse } from 'next/server';
import { officialMiddleware } from './lib/x402-middleware-official';

// Route all payment-protected endpoints through official middleware
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // All payment-protected routes use official middleware
  // This ensures proper blockchain settlement via @coinbase/x402 facilitator
  if (
    pathname.startsWith('/api/message') ||
    pathname.startsWith('/message/user-payment') ||
    pathname.startsWith('/api/ui-ux-book') ||
    pathname.startsWith('/ui-ux-book/user-payment') ||
    pathname.startsWith('/api/shadcn-block') ||
    pathname.startsWith('/shadcn-blocks/user-payment')
  ) {
    return officialMiddleware(req);
  }

  // Default: allow request to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/message/:path*',
    '/message/user-payment/:path*',
    '/api/ui-ux-book/:path*',
    '/ui-ux-book/user-payment/:path*',
    '/api/shadcn-block/:path*',
    '/shadcn-blocks/user-payment/:path*',
  ],
  runtime: 'nodejs',
};

