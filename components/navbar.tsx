'use client';

import Link from 'next/link';
import { useNetwork } from '@/lib/network-context';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { network, setNetwork } = useNetwork();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-bold text-base">x402 Blocks</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/message"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Message
              </Link>
              <Link
                href="/ui-ux-book"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                UI/UX Book
              </Link>
              <Link
                href="/shadcn-blocks"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                shadcn/ui blocks
              </Link>
            </div>
          </div>

          {/* Right Side: Network Switch */}
          <div className="flex items-center gap-4">
            {/* Network Switcher */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setNetwork('testnet')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  network === 'testnet'
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Testnet
              </button>
              <button
                onClick={() => setNetwork('mainnet')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  network === 'mainnet'
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mainnet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Network Badge */}
      <div className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant={network === 'testnet' ? 'secondary' : 'default'} className="text-xs">
                {network === 'testnet' ? 'Base Sepolia (Testnet)' : 'Base (Mainnet)'}
              </Badge>
              {network === 'testnet' && (
                <span className="text-xs">
                  Test with free testnet USDC
                </span>
              )}
            </div>
            <a
              href="https://creative-tim.com/ui"
              target="_blank"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Powered by Creative Tim UI
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
