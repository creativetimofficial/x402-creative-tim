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

          {/* Right Side: GitHub & Network Switch */}
          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/creativetimofficial/x402-creative-tim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View on GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

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
