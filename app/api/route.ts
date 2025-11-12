/**
 * /api - X402 Resource Discovery Endpoint
 *
 * Returns all available X402 payment-protected resources
 * This endpoint is public and doesn't require payment
 */

import { NextResponse } from 'next/server';
import { getX402Config, ENDPOINT_PRICING } from '@/lib/x402-config';

const x402Config = getX402Config();

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Define all available resources with their schemas
  const resources = [
    {
      scheme: 'exact',
      network: x402Config.chain,
      maxAmountRequired: String(ENDPOINT_PRICING.message * 1_000_000),
      resource: `${baseUrl}/api/message`,
      description: 'Simple message API - test X402 payments',
      mimeType: 'application/json',
      payTo: x402Config.walletAddress,
      maxTimeoutSeconds: 300,
      asset: x402Config.usdcAddress,
      extra: {
        name: 'USDC',
        version: '2',
      },
      outputSchema: {
        input: {
          type: 'http',
          method: 'GET',
          discoverable: true,
        },
        output: {
          success: {
            type: 'boolean',
            description: 'Whether the request was successful',
          },
          message: {
            type: 'string',
            description: 'Response message from the API',
          },
          endpoint: {
            type: 'string',
            description: 'The endpoint that was called',
          },
          price: {
            type: 'string',
            description: 'The price paid for this endpoint',
          },
          timestamp: {
            type: 'string',
            description: 'ISO 8601 timestamp of the response',
          },
        },
      },
    },
    {
      scheme: 'exact',
      network: x402Config.chain,
      maxAmountRequired: String(ENDPOINT_PRICING['ui-ux-book'] * 1_000_000),
      resource: `${baseUrl}/api/ui-ux-book`,
      description: 'Access premium UI/UX book content and resources',
      mimeType: 'application/pdf',
      payTo: x402Config.walletAddress,
      maxTimeoutSeconds: 300,
      asset: x402Config.usdcAddress,
      extra: {
        name: 'USDC',
        version: '2',
      },
      outputSchema: {
        input: {
          type: 'http',
          method: 'GET',
          discoverable: true,
        },
        output: {
          type: 'file',
          mimeType: 'application/pdf',
          description: 'Premium UI/UX Design Guide PDF document',
          filename: 'ui-ux-design-guide.pdf',
        },
      },
    },
    {
      scheme: 'exact',
      network: x402Config.chain,
      maxAmountRequired: String(ENDPOINT_PRICING['shadcn-block'] * 1_000_000),
      resource: `${baseUrl}/api/shadcn-block`,
      description: 'Get ShadCN UI component blocks and templates',
      mimeType: 'application/json',
      payTo: x402Config.walletAddress,
      maxTimeoutSeconds: 300,
      asset: x402Config.usdcAddress,
      extra: {
        name: 'USDC',
        version: '2',
      },
      outputSchema: {
        input: {
          type: 'http',
          method: 'GET',
          discoverable: true,
        },
        output: {
          success: {
            type: 'boolean',
            description: 'Whether the request was successful',
          },
          data: {
            type: 'object',
            description: 'ShadCN UI component block data from Creative Tim registry',
            properties: {
              name: {
                type: 'string',
                description: 'Block name',
              },
              type: {
                type: 'string',
                description: 'Block type (e.g., registry:block)',
              },
              files: {
                type: 'array',
                description: 'Array of component files with code',
                properties: {
                  path: {
                    type: 'string',
                    description: 'File path',
                  },
                  content: {
                    type: 'string',
                    description: 'Component source code',
                  },
                  type: {
                    type: 'string',
                    description: 'File type (e.g., registry:component)',
                  },
                },
              },
            },
          },
          endpoint: {
            type: 'string',
            description: 'The endpoint that was called',
          },
          price: {
            type: 'string',
            description: 'The price paid for this endpoint',
          },
          timestamp: {
            type: 'string',
            description: 'ISO 8601 timestamp of the response',
          },
        },
      },
    },
  ];

  return NextResponse.json({
    x402Version: 1,
    resources,
    metadata: {
      provider: 'x402 Payment Demo - Creative Tim',
      description: 'Blockchain micropayments demo using x402 Protocol on Base Network. Purchase UI/UX resources, component blocks, and API access with cryptocurrency.',
      totalResources: resources.length,
      network: x402Config.chain,
      supportedAssets: ['USDC'],
    },
  });
}
