/**
 * /api/ui-ux-book endpoint - $0.10
 * Premium UI/UX book content API endpoint protected by X402 payment middleware
 * Returns JSON with download links (only accessible after payment)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Payment is verified by middleware - only paid users reach here
  // Return the protected download links as JSON
  // URLs are loaded from environment variables for security

  return NextResponse.json({
    success: true,
    message: 'Payment successful! Access granted to UI/UX Design Book.',
    downloads: [
      {
        title: 'Complete UI/UX Design Book',
        description: 'Access the full book with all chapters, templates, design resources, and bonus materials.',
        label: 'Dropbox Folder - All Resources',
        url: process.env.BOOK_URL_PAID || '',
        type: 'primary'
      },
      {
        title: 'Free Preview (Sample Chapters)',
        description: 'View a free preview of the book content before purchasing. Includes sample chapters and design examples.',
        label: 'PDF Preview - Sample Content',
        url: process.env.NEXT_PUBLIC_BOOK_URL_PREVIEW || '',
        type: 'preview'
      }
    ],
    timestamp: new Date().toISOString(),
  });
}
