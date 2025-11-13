'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ENDPOINT_PRICING } from '@/lib/x402-config'

export default function ShadcnBlocksPage() {
  const price = ENDPOINT_PRICING['shadcn-block']

  function handlePurchase() {
    // Redirect to the protected payment page
    window.location.href = '/shadcn-blocks/user-payment'
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-5xl space-y-6">
        {/* WIP Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              All blocks will be available to the protocol in the next days.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-card border p-8 shadow-xl">
          {/* Header Section */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  className="text-primary h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  shadcn/ui Component Blocks
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Access premium UI component blocks and ready-to-use templates
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  This is an example. Code will be from{' '}
                  <a
                    href="https://www.creative-tim.com/ui/blocks/cruds#cruds-01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Creative Tim UI Blocks
                  </a>
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-500 bg-blue-50 text-blue-700 text-base px-4 py-1.5">
              ${price.toFixed(2)}
            </Badge>
          </div>

          <CardContent className="p-0">
            {/* Purchase State */}
            <div className="space-y-0">
              {/* What You'll Get Section */}
              <div className="group flex items-start gap-4 py-6 border-b border-border">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                  <svg className="text-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">What You'll Get</p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Creative Tim x shadcn/ui CRUD form block
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete component and page code
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ready to copy and use in your project
                    </li>
                  </ul>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  onClick={handlePurchase}
                  size="default"
                  className="min-w-[200px]"
                >
                  Purchase for ${price.toFixed(2)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
