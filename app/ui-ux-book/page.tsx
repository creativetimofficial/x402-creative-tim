'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function UIUXBookPage() {
  function handlePurchase() {
    // Redirect to the protected payment page
    window.location.href = '/ui-ux-book/user-payment'
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  UI/UX Design Book
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Complete guide to modern interface design principles
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-indigo-500 bg-indigo-50 text-indigo-700 text-base px-4 py-1.5">
              $0.10
            </Badge>
          </div>

          <CardContent className="p-0">
            {/* Purchase State */}
            <div className="space-y-0">
              {/* What You'll Get Section */}
              <div className="group flex items-start gap-4 py-6 border-b border-border">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                  <svg className="text-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">What You'll Get</p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete UI/UX Design Book (200+ pages)
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      50+ Design Templates & Resources
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Lifetime Access & Updates
                    </li>
                  </ul>
                </div>
              </div>

              {/* Free Preview Section - Only shown before purchase */}
              <div className="group flex flex-wrap items-center justify-between gap-6 py-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <svg className="text-muted-foreground h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold">Free Preview (Sample Chapters)</p>
                    <p className="text-muted-foreground text-sm">
                      View a free preview of the book content. Includes sample chapters and design examples.
                    </p>
                  </div>
                </div>
                <a
                  href={process.env.NEXT_PUBLIC_BOOK_URL_PREVIEW || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline">
                    Preview Free
                  </Button>
                </a>
              </div>

              {/* Purchase Button */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  onClick={handlePurchase}
                  size="default"
                  className="min-w-[200px]"
                >
                  Purchase for $0.10
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Branding */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Creative Tim UI
            </a>
            {' '}• Built with X402 Protocol
          </p>
        </div>
      </div>
    </div>
  )
}
