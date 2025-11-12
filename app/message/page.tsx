'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ENDPOINT_PRICING } from '@/lib/x402-config'

export default function MessagePage() {
  const price = ENDPOINT_PRICING['message']

  function handlePurchase() {
    // Redirect to the protected payment page
    window.location.href = '/message/user-payment'
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-5xl">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Simple Message API
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Test the x402 payment protocol with a simple message endpoint
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-green-500 bg-green-50 text-green-700 text-base px-4 py-1.5">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">What You'll Get</p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Access to protected message content
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Test X402 micropayment protocol
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Instant blockchain settlement
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
