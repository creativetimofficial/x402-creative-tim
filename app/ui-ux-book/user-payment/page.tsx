import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UIUXBookSuccessPage() {
  // This page is protected by middleware - users can only access if they've paid $0.10
  // Download URLs are loaded from environment variables for security
  const bookData = {
    message: 'Your payment of $0.10 USDC was processed and settled on the blockchain. Access granted to UI/UX Design Book.',
    downloads: [
      {
        title: 'Complete UI/UX Design Book',
        description: 'Access the full book with all chapters, templates, design resources, and bonus materials.',
        label: 'Dropbox Folder - All Resources',
        url: process.env.BOOK_URL_PAID || '',
        type: 'primary' as const
      },
      {
        title: 'Free Preview (Sample Chapters)',
        description: 'View a free preview of the book content. Includes sample chapters and design examples.',
        label: 'PDF Preview - Sample Content',
        url: process.env.BOOK_URL_PREVIEW || '',
        type: 'preview' as const
      }
    ]
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-5xl">
        {/* Success Card */}
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
          </div>

          <CardContent className="p-0">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-500 flex items-start gap-3 rounded-lg p-6 mb-6">
              <svg
                className="mt-0.5 h-5 w-5 text-green-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-green-900">Payment Successful!</h4>
                <p className="text-green-800 text-sm">
                  {bookData.message}
                </p>
              </div>
            </div>

            {/* Download Links */}
            <div className="space-y-0">
              {bookData.downloads.map((download, index) => (
                <div
                  key={index}
                  className={`group flex flex-wrap items-center justify-between gap-6 py-6 ${
                    index < bookData.downloads.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      download.type === 'primary' ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <svg
                        className={`h-6 w-6 ${
                          download.type === 'primary' ? 'text-primary' : 'text-muted-foreground'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {download.type === 'primary' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{download.title}</p>
                        {download.type === 'primary' && (
                          <span className="text-primary border-primary bg-primary/10 rounded-full border px-2 py-0.5 text-xs font-medium">
                            Full Access
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {download.description}
                      </p>
                      {download.label && (
                        <p className="text-sm font-semibold">
                          <svg
                            className="mr-1 inline h-4 w-4 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {download.label}
                        </p>
                      )}
                    </div>
                  </div>
                  <a href={download.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant={download.type === 'primary' ? 'default' : 'outline'}>
                      {download.type === 'primary' ? 'Download' : 'Preview'}
                    </Button>
                  </a>
                </div>
              ))}
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
