# x402 Creative Tim

A Next.js application demonstrating the [x402 Protocol](https://x402.org) for blockchain-based micropayments on Base Network. This project showcases payment-gated content with dual access methods: beautiful browser UIs and JSON API endpoints for AI agents.

![x402 Protocol](https://img.shields.io/badge/x402-Protocol-blue)
![Base Network](https://img.shields.io/badge/Network-Base-0052FF)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 What is x402?

x402 is a protocol that enables HTTP 402 (Payment Required) status for the modern web, allowing content creators to monetize their APIs and digital content using cryptocurrency micropayments. This demo shows how to integrate x402 payments into a Next.js application with proper blockchain settlement.

## ✨ Features

This project demonstrates three payment-gated content offerings with **dual access methods**:

### Browser Access
- Beautiful presentation pages with OnchainKit wallet integration
- Seamless payment flow with USDC on Base Network
- User-friendly payment success pages with direct download links

### API Access
- JSON endpoints for AI agents and programmatic access
- Same payment verification through x402 middleware
- Perfect for integrating with AI tools and automated systems

---

### 1. **Message Content** - $0.10
**Routes:** `/message` → `/message/user-payment` (Browser) | `/api/message` (API)

Simple message endpoint demonstrating the basic x402 flow. Perfect for testing and understanding the protocol.

**What you get:**
- Access to protected message content
- Test x402 micropayment protocol
- Instant blockchain settlement

---

### 2. **Roots of UI/UX Design Book** - $10.00
**Routes:** `/ui-ux-book` → `/ui-ux-book/user-payment` (Browser) | `/api/ui-ux-book` (API)

Comprehensive UI/UX design book with practical resources.

**What's included:**
- **322 Pages** of insights and practical examples
- **Figma Files** - Design templates ready to use
- **AI Prompts** - Leverage AI for faster design workflows
- **Practical Examples** - Real-world case studies and applications

**Browser access** shows a beautiful payment success page with download links.
**API access** returns JSON with the same download links for programmatic access.

---

### 3. **shadcn/ui Component Blocks** - $0.01
**Routes:** `/shadcn-blocks` → `/shadcn-blocks/user-payment` (Browser) | `/api/shadcn-block` (API)

Premium UI component blocks from Creative Tim built with shadcn/ui.

**What you get:**
- Creative Tim x shadcn/ui CRUD form block
- Complete component and page code
- Ready to copy and use in your project

---

## 🏗️ Architecture

### Dual Access Pattern

```
Browser Users:
┌──────────────┐      ┌─────────────────┐      ┌──────────────────┐
│ Presentation │─────▶│ User Payment    │─────▶│ Beautiful UI     │
│ Page         │      │ Page (Protected)│      │ with Downloads   │
└──────────────┘      └─────────────────┘      └──────────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │   x402       │
                      │  Middleware  │
                      └──────────────┘

API/AI Agents:
┌──────────────┐      ┌─────────────────┐      ┌──────────────────┐
│ API Request  │─────▶│   x402          │─────▶│ JSON Response    │
│              │      │  Middleware     │      │ with Data        │
└──────────────┘      └─────────────────┘      └──────────────────┘
```

### Payment Flow (Browser)

1. **User visits presentation page** (e.g., `/ui-ux-book`)
2. **User clicks "Get Access"** button
3. **Redirected to payment page** (`/ui-ux-book/user-payment`)
4. **x402 middleware intercepts** and shows OnchainKit payment UI
5. **User connects wallet** (MetaMask, Coinbase Wallet, etc.)
6. **User completes USDC payment** on Base Network
7. **Payment settled on blockchain** via @coinbase/x402 facilitator
8. **User redirected to success page** with download links

### Payment Flow (API)

1. **Client makes API request** to endpoint (e.g., `/api/ui-ux-book`)
2. **x402 middleware intercepts** and returns 402 Payment Required
3. **Client receives payment details** (amount, wallet, chain)
4. **Client completes payment** with Web3 wallet
5. **Client retries request** with payment proof headers
6. **Server verifies and settles payment**
7. **Server returns JSON** with content/download links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- A cryptocurrency wallet (MetaMask recommended)
- For testnet: Free testnet USDC from Base Sepolia faucet
- For mainnet: Real USDC on Base + Coinbase CDP API keys

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/creativetimofficial/x402-creative-tim
cd x402-creative-tim
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Network Configuration
NETWORK=mainnet

# Wallet Addresses for receiving payments
NEXT_PUBLIC_MAINNET_WALLET_ADDRESS=0xYourMainnetWallet
NEXT_PUBLIC_TESTNET_WALLET_ADDRESS=0xYourTestnetWallet

# CDP API Keys (required for mainnet)
CDP_API_KEY_ID=your-cdp-api-key-id
CDP_API_KEY_SECRET=your-cdp-api-key-secret

# OnchainKit API key (optional but recommended)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Book Download URLs (for UI/UX book content)
BOOK_URL_PAID=https://your-dropbox-url
NEXT_PUBLIC_BOOK_URL_PREVIEW=https://your-preview-pdf-url
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Visit `http://localhost:3001` and start exploring!

## 🌐 Network Configuration

The application supports both **Base Mainnet** (production) and **Base Sepolia** (testnet).

### Switching Networks

Use the network toggle in the navbar to switch between:
- **Testnet** (Base Sepolia) - Free testnet USDC
- **Mainnet** (Base) - Real USDC payments

### Network Details

#### Mainnet (Production)
- **Network:** Base
- **Chain ID:** 8453
- **USDC:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Settlement:** @coinbase/x402 facilitator with CDP API keys
- **Requires:** Real USDC and CDP API credentials

#### Testnet (Testing)
- **Network:** Base Sepolia
- **Chain ID:** 84532
- **USDC:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Settlement:** Free x402.org facilitator
- **Faucet:** https://www.alchemy.com/faucets/base-sepolia

### Current Pricing

```typescript
export const ENDPOINT_PRICING = {
  'message': 0.10,        // $0.10 USDC
  'ui-ux-book': 10.00,    // $10.00 USDC
  'shadcn-block': 0.01,   // $0.01 USDC
}
```

Prices are centrally configured in `lib/x402-config.ts` and automatically apply to:
- Presentation page badges
- Purchase buttons
- Middleware payment verification
- API route protection
- Success page displays

## 📱 Routes Overview

### Presentation Pages (Public)
- `/` - Homepage with all offerings
- `/message` - Message content presentation
- `/ui-ux-book` - UI/UX book presentation
- `/shadcn-blocks` - Component blocks presentation

### User Payment Pages (Protected by x402)
- `/message/user-payment` - Access message after $0.10 payment
- `/ui-ux-book/user-payment` - Download book after $10.00 payment
- `/shadcn-blocks/user-payment` - View component code after $0.01 payment

### API Endpoints (Protected by x402)
- `/api/message` - Returns JSON message content
- `/api/ui-ux-book` - Returns JSON with download links
- `/api/shadcn-block` - Returns JSON with component code

## 🔧 Technical Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **OnchainKit** for wallet integration and payment UI

### Payment & Blockchain
- **x402 Protocol** via `x402-next` package
- **@coinbase/x402** facilitator for mainnet settlement
- **Base Network** (mainnet and Sepolia testnet)
- **USDC** stablecoin for all payments
- **Coinbase CDP** for mainnet transaction settlement

### Backend
- **Next.js Middleware** for route protection
- **Server Components** for payment-protected pages
- **Official x402 middleware** with proper blockchain settlement

## 📂 Project Structure

```
x402-creative-tim/
├── app/
│   ├── api/                          # API routes (return JSON)
│   │   ├── message/route.ts          # Message API ($0.10)
│   │   ├── ui-ux-book/route.ts       # Book API ($10.00)
│   │   └── shadcn-block/route.ts     # Component API ($0.01)
│   ├── message/
│   │   ├── page.tsx                  # Message presentation page
│   │   └── user-payment/page.tsx     # Payment success page
│   ├── ui-ux-book/
│   │   ├── page.tsx                  # Book presentation page
│   │   └── user-payment/page.tsx     # Payment success page
│   ├── shadcn-blocks/
│   │   ├── page.tsx                  # Blocks presentation page
│   │   └── user-payment/page.tsx     # Payment success page
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   └── providers.tsx                 # OnchainKit providers
├── lib/
│   ├── x402-config.ts                # Pricing & network config
│   ├── x402-middleware-official.ts   # Official middleware config
│   └── network-context.tsx           # Network switching context
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── navbar.tsx                    # Navigation with network toggle
│   ├── client-layout.tsx             # Client wrapper
│   └── analytics.tsx                 # Google Tag Manager
├── middleware.ts                     # Route protection
└── .env.example                      # Environment template
```

## 🔐 Security Best Practices

### ✅ Safe to Share (Public Repo)
- All code in this repository
- `.env.example` file
- Public wallet addresses (for receiving payments)
- Frontend code and UI components

### ❌ NEVER Commit
- `.env` files (already in .gitignore)
- CDP API keys (sensitive credentials)
- Book download URLs (paid content)
- Private keys or seed phrases

### Environment Variables
- **BOOK_URL_PAID** - Server-only, not exposed to client
- **NEXT_PUBLIC_BOOK_URL_PREVIEW** - Public, safe to expose (free preview)
- **CDP_API_KEY_SECRET** - Server-only, never exposed

## 🎨 Customization

### Change Pricing

Edit `lib/x402-config.ts`:

```typescript
export const ENDPOINT_PRICING = {
  'message': 0.10,        // Change to your price
  'ui-ux-book': 10.00,    // Change to your price
  'shadcn-block': 0.01,   // Change to your price
}
```

All pages automatically update to reflect new pricing.

### Add New Content

1. Add pricing to `lib/x402-config.ts`
2. Add route config to `lib/x402-middleware-official.ts`
3. Add matcher to `middleware.ts`
4. Create presentation page: `app/your-content/page.tsx`
5. Create payment page: `app/your-content/user-payment/page.tsx`
6. Create API route (optional): `app/api/your-content/route.ts`

### Customize UI

- **Global styles:** `app/globals.css`
- **Components:** `components/ui/` (shadcn/ui)
- **Navbar:** `components/navbar.tsx`
- **Layout:** `components/client-layout.tsx`

## 🧪 Testing

### Testnet Testing (Recommended)

1. Switch to testnet using the navbar toggle
2. Get free testnet USDC from the faucet
3. Test all payment flows with $0 cost
4. Verify blockchain settlement on Base Sepolia explorer

### Mainnet Testing

1. Switch to mainnet using the navbar toggle
2. Use real USDC for payments
3. Verify transactions on Base mainnet explorer
4. Monitor CDP API usage

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NETWORK=mainnet
NEXT_PUBLIC_MAINNET_WALLET_ADDRESS=0x...
NEXT_PUBLIC_TESTNET_WALLET_ADDRESS=0x...
CDP_API_KEY_ID=...
CDP_API_KEY_SECRET=...
NEXT_PUBLIC_ONCHAINKIT_API_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
BOOK_URL_PAID=https://your-dropbox-url
NEXT_PUBLIC_BOOK_URL_PREVIEW=https://your-preview-url
```

## 📊 Wallet Addresses

This project uses specific wallet addresses for receiving payments:

- **Mainnet:** `0x45ac00db8bdd4b837abbbf75888cbdfe6b6d8943`
- **Testnet:** `0x92a0f8ac8b8c2ef60d6d46e0f768067fa379f7f3`

Configure your own addresses in the `.env` file.

## 📚 Resources

- [x402 Protocol](https://x402.org) - Official protocol documentation
- [x402-next Package](https://www.npmjs.com/package/x402-next) - Next.js middleware
- [Base Network](https://docs.base.org) - Layer 2 documentation
- [OnchainKit](https://onchainkit.xyz) - Coinbase Web3 toolkit
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) - Get API keys

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Test thoroughly on testnet
4. Submit a pull request

## ⚖️ License

Apache-2.0 License

## 🙏 Acknowledgments

- [x402 Protocol](https://x402.org) for the payment infrastructure
- [Creative Tim UI](https://www.creative-tim.com/ui) for the UI components and design
- [Coinbase](https://www.coinbase.com) for Base Network and OnchainKit
- [shadcn](https://twitter.com/shadcn) for the beautiful UI component system

---

**Built with ❤️ by [Creative Tim UI](https://www.creative-tim.com/ui) using Next.js, x402 Protocol, and Base Network**

For questions or issues, please open an issue on [GitHub](https://github.com/creativetimofficial/x402-creative-tim).
