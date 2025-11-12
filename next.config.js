/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Required for @coinbase/x402 facilitator (Node.js only package)
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
