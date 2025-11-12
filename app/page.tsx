import { getX402Config, ENDPOINT_PRICING } from '@/lib/x402-config';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  let config;
  try {
    config = getX402Config();
  } catch (error) {
    config = null;
  }

  return (
    <main className="grid min-h-screen place-items-center py-16 px-4">
      <div className="w-full max-w-5xl">
        <Card className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">x402 Creative Tim</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Payment-gated content and API endpoints powered by x402 protocol on Base network.
              Access premium content via browser or integrate with AI agents through our API endpoints.
            </p>
          </div>

          {!config && (
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm font-medium text-yellow-800">
                ⚠️ Configuration not set. Please configure environment variables to start using the API.
              </p>
            </div>
          )}

          {config && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-800">
                <span className="flex items-center">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span>
                    Active Network: <span className="uppercase">{config.network}</span> · {config.chain}
                  </span>
                </span>
              </p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold">How It Works</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Two ways to access our premium content
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 border-2 border-blue-200 bg-blue-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-600 text-white rounded-lg p-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Browser Access</h3>
                  <p className="text-muted-foreground text-sm">
                    Visit presentation pages, connect your wallet via OnchainKit, and access beautiful UI pages with your purchased content.
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Beautiful user interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Wallet connection via OnchainKit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Direct download links</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-purple-200 bg-purple-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-purple-600 text-white rounded-lg p-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">API Access</h3>
                  <p className="text-muted-foreground text-sm">
                    Integrate with AI agents and custom applications. API endpoints return JSON data after payment verification.
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>JSON response format</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>AI agent integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Programmatic access</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Available Content</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Three premium content offerings with dual access methods
            </p>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Message Content</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                      ${ENDPOINT_PRICING.message.toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Simple message content for demonstration purposes
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">Browser Access:</div>
                      <code className="text-xs text-muted-foreground">
                        /message → /message/user-payment
                      </code>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">API Access:</div>
                      <code className="text-xs text-muted-foreground">
                        GET /api/message
                      </code>
                    </div>
                  </div>
                </div>
                <Link href="/message" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Presentation Page →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">UI/UX Design Book</h3>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                      ${ENDPOINT_PRICING['ui-ux-book'].toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Premium UI/UX book content, templates, and design resources
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">Browser Access:</div>
                      <code className="text-xs text-muted-foreground">
                        /ui-ux-book → /ui-ux-book/user-payment
                      </code>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">API Access:</div>
                      <code className="text-xs text-muted-foreground">
                        GET /api/ui-ux-book
                      </code>
                    </div>
                  </div>
                </div>
                <Link href="/ui-ux-book" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Presentation Page →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">shadcn/ui Component Blocks</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      ${ENDPOINT_PRICING['shadcn-block'].toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm">
                    shadcn/ui component blocks and ready-to-use templates
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">Browser Access:</div>
                      <code className="text-xs text-muted-foreground">
                        /shadcn-blocks → /shadcn-blocks/user-payment
                      </code>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="text-xs font-semibold mb-1">API Access:</div>
                      <code className="text-xs text-muted-foreground">
                        GET /api/shadcn-block
                      </code>
                    </div>
                  </div>
                </div>
                <Link href="/shadcn-blocks" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Presentation Page →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-8 space-y-6 border-t pt-8">
            <div>
              <h3 className="text-lg font-semibold">Payment Flow</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Seamless payment experience powered by x402 protocol
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                  Browser Flow
                </h4>
                <ol className="text-muted-foreground space-y-2 text-sm pl-8">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Visit presentation page</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Click purchase button</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Connect wallet via OnchainKit</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Complete USDC payment</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Access beautiful payment success page</span>
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                  API Flow
                </h4>
                <ol className="text-muted-foreground space-y-2 text-sm pl-8">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Make API request to endpoint</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Receive 402 Payment Required response</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Complete payment with Web3 wallet</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Retry request with payment proof</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Receive JSON response with content</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Technical Details</h4>
              <ul className="text-muted-foreground text-xs space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Protocol:</strong> x402 payment protocol with official @coinbase/x402 facilitator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Network:</strong> Base (mainnet) and Base Sepolia (testnet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Currency:</strong> USDC stablecoin for all payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Middleware:</strong> Next.js middleware protecting both pages and API routes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>UI Kit:</strong> OnchainKit for wallet connection and payment interface</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted mt-6 rounded-lg p-4">
            <p className="text-muted-foreground text-xs">
              Powered by{' '}
              <a
                href="https://x402.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                X402 Protocol
              </a>
              {' '}on Base Network • Built with{' '}
              <a
                href="https://www.creative-tim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Creative Tim UI
              </a>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
