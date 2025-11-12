/**
 * /api/message endpoint - $0.10
 * Simple message API endpoint protected by X402 payment middleware
 * Returns JSON with message content (only accessible after payment)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Payment is verified by middleware - only paid users reach here
  console.log('✅ GET /api/message - Payment verified by middleware, returning content');

  return NextResponse.json({
    success: true,
    message: 'Hello from the other side! This message is protected by X402 payments.',
    endpoint: '/message',
    price: '$0.10',
    timestamp: new Date().toISOString(),
  });
}
