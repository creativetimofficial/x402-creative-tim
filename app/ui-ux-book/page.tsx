'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ENDPOINT_PRICING } from '@/lib/x402-config'

export default function UIUXBookPage() {
  const price = ENDPOINT_PRICING['ui-ux-book']
  function handlePurchase() {
    // Redirect to the protected payment page
    window.location.href = '/ui-ux-book/user-payment'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <Card className="bg-card border shadow-2xl overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-purple-500/10 p-8 border-b">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl shadow-sm">
                    <svg
                      className="text-primary h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <Badge variant="outline" className="border-indigo-500 bg-indigo-50 text-indigo-700 text-sm px-3 py-1">
                    ${price.toFixed(2)}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  Roots of UI/UX Design
                </h1>
                <p className="text-lg text-muted-foreground font-medium mb-3">
                  Learn to Develop Intuitive Web Experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Want to learn UI/UX? With <strong className="text-foreground">322 Pages of Insights</strong> and Practical Examples, Figma Files, and useful AI Prompts, this book helps you create intuitive digital experiences.
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* What You'll Get Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                What's Inside
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">322 Pages</p>
                    <p className="text-xs text-muted-foreground">Comprehensive insights and practical examples</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Figma Files Included</p>
                    <p className="text-xs text-muted-foreground">Design templates ready to use</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">AI Prompts</p>
                    <p className="text-xs text-muted-foreground">Leverage AI for faster design workflows</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Practical Examples</p>
                    <p className="text-xs text-muted-foreground">Real-world case studies and applications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mb-8 p-6 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-sm">
                    <svg className="text-muted-foreground h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Try Before You Buy</p>
                    <p className="text-muted-foreground text-sm">
                      Preview sample chapters to see what you'll learn
                    </p>
                  </div>
                </div>
                <a
                  href={process.env.NEXT_PUBLIC_BOOK_URL_PREVIEW || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="shadow-sm">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Free Preview
                  </Button>
                </a>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  One-time payment • Instant access • Lifetime updates
                </p>
              </div>
              <Button
                onClick={handlePurchase}
                size="lg"
                className="w-full sm:w-auto min-w-[200px] shadow-lg"
              >
                Get Access for ${price.toFixed(2)}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Branding */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Creative Tim
            </a>
            {' '}• Secured with{' '}
            <a
              href="https://x402.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              X402 Protocol
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
