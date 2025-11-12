import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ClientLayout } from '@/components/client-layout';

export const metadata: Metadata = {
  title: {
    default: 'x402 Payment Demo - Creative Tim',
    template: '%s | x402 Payment Demo - Creative Tim',
  },
  description: 'Blockchain micropayments demo using x402 Protocol on Base Network. Purchase UI/UX resources, component blocks, and API access with cryptocurrency.',
  keywords: [
    'x402',
    'blockchain payments',
    'cryptocurrency',
    'Base Network',
    'micropayments',
    'payment protocol',
    'Web3',
    'USDC',
    'Creative Tim',
    'shadcn/ui',
    'UI components',
    'Next.js',
  ],
  authors: [
    {
      name: 'Creative Tim',
      url: 'https://www.creative-tim.com',
    },
  ],
  creator: '@creativetim',
  publisher: 'Creative Tim',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    title: 'x402 Payment Demo - Creative Tim',
    description: 'Blockchain micropayments demo using x402 Protocol on Base Network. Purchase UI/UX resources and component blocks with cryptocurrency.',
    siteName: 'x402 Payment Demo',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'x402 Payment Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'x402 Payment Demo - Creative Tim',
    description: 'Blockchain micropayments using x402 Protocol on Base Network',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/android-chrome-512x512.png`],
    creator: '@creativetim',
  },
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_APP_URL}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_APP_URL}/favicon.ico`, sizes: 'any' },
    ],
    apple: [
      { url: `${process.env.NEXT_PUBLIC_APP_URL}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/android-chrome-192x192.png`,
      },
      {
        rel: 'android-chrome',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/android-chrome-512x512.png`,
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here if needed
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
