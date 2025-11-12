# X402 Payment Demo - Creative Tim

A Next.js application demonstrating the [X402 Protocol](https://x402.org) for blockchain-based micropayments on Base Network. This project showcases three different payment flows with interactive UIs and secure payment verification.

![X402 Protocol](https://img.shields.io/badge/X402-Protocol-blue)
![Base Network](https://img.shields.io/badge/Network-Base-0052FF)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 What is X402?

X402 is a protocol that enables HTTP 402 (Payment Required) status for the modern web, allowing content creators to monetize their APIs and digital content using cryptocurrency micropayments. This demo shows how to integrate X402 payments into a Next.js application.

## ✨ Features

This project demonstrates three payment-gated endpoints with full interactive UIs:

### 1. **Message API** (`/message`) - $0.10
- Simple message endpoint for testing
- GET and POST support
- Real-time payment verification
- Perfect for understanding the basic flow

### 2. **UI/UX Design Book** (`/ui-ux-book`) - $0.10
- Digital book download after payment
- Shows Dropbox links after successful payment
- Demonstrates content delivery after verification
- PDF-based content distribution

### 3. **ShadCN UI Component Blocks** (`/shadcn-blocks`) - $0.01
- Premium UI components from Creative Tim
- Fetches real data from Creative Tim registry
- Copy-paste ready code blocks
- Demonstrates API-to-API payment flows

## 🏗️ Architecture

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Client    │──────▶│   X402       │──────▶│  Content    │
│  (Browser)  │◀──────│  Middleware  │◀──────│  Endpoint   │
└─────────────┘       └──────────────┘       └─────────────┘
      │                      │
      │                      │
      ▼                      ▼
┌─────────────┐       ┌──────────────┐
│   Wallet    │       │ X402 Facil.  │
│  (MetaMask) │       │  (x402.org)  │
└─────────────┘       └──────────────┘
```

### Payment Flow

1. **User visits payment page** (e.g., `/shadcn-blocks`)
2. **User connects wallet** (MetaMask, Coinbase Wallet, etc.)
3. **User clicks "Purchase"**
4. **Client prepares X402 payment** using wagmi hooks
5. **User signs EIP-712 message** in their wallet
6. **Payment sent to server action** for verification
7. **Server verifies payment** with custom ERC-6492 facilitator
8. **Server settles payment** via X402 facilitator
9. **Content returned** and displayed to user

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- A cryptocurrency wallet (MetaMask recommended)
- For testnet: Base Sepolia testnet ETH (free from faucets)
- For mainnet: Real ETH and USDC on Base, plus CDP API keys

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd x402-creative-tim
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Network defaults to mainnet
# Use ?testnet=true in URL to switch to testnet mode
NETWORK=mainnet

# Mainnet wallet (default)
MAINNET_WALLET_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_MAINNET_WALLET_ADDRESS=0xYourWalletAddress

# Testnet wallet (for testing with ?testnet=true)
TESTNET_WALLET_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_TESTNET_WALLET_ADDRESS=0xYourWalletAddress

# CDP API Keys (required for mainnet)
CDP_API_KEY_NAME=your-cdp-api-key-name
CDP_API_KEY_PRIVATE_KEY=your-cdp-private-key

# OnchainKit API key (optional but recommended)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-api-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **For testing: Enable testnet mode**

Add `?testnet=true` to any URL to test with free tokens:
```
http://localhost:3000?testnet=true
```

Then get testnet tokens:
- Visit [Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)
- Enter your wallet address
- Request free testnet ETH and USDC

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Visit `http://localhost:3000` and start testing!

## 📱 Demo Pages

### Message API Demo
**Route:** `/message`

Simple message endpoint demonstrating the basic X402 flow. Perfect for testing and understanding the protocol.

### UI/UX Book Demo
**Route:** `/ui-ux-book`

After payment verification, displays download links for:
- Complete UI/UX Design Book (Dropbox folder)
- Free preview PDF

### ShadCN Blocks Demo
**Route:** `/shadcn-blocks`

After payment, fetches and displays:
- Component code from Creative Tim registry
- Registry dependencies
- Copy-to-clipboard functionality
- Page integration code

## 🔧 Technical Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **OnchainKit** - Coinbase's Web3 UI components

### Payment & Blockchain
- **X402 Protocol** - Payment protocol
- **Base Network** - L2 blockchain (Sepolia testnet / mainnet)
- **USDC** - Stablecoin for payments
- **EIP-712** - Typed structured data signing
- **ERC-6492** - Smart contract wallet signature verification

### Backend
- **Next.js Server Actions** - Payment verification
- **X402 Facilitator** - Settlement service
- **Custom Middleware** - Payment validation

## 📂 Project Structure

```
x402-creative-tim/
├── app/
│   ├── api/
│   │   ├── message/
│   │   │   └── route.ts              # Message API endpoint
│   │   ├── ui-ux-book/
│   │   │   ├── route.ts              # Book API endpoint
│   │   │   └── success/route.ts      # Success redirect
│   │   └── shadcn-block/
│   │       ├── route.ts              # Block API endpoint
│   │       └── success/route.ts      # Success redirect
│   ├── message/page.tsx              # Message demo UI
│   ├── ui-ux-book/page.tsx           # Book demo UI
│   ├── shadcn-blocks/page.tsx        # Blocks demo UI
│   ├── actions.ts                    # Server actions for payment
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Homepage
│   └── providers.tsx                 # Wagmi & OnchainKit setup
├── lib/
│   ├── x402-config.ts                # X402 configuration
│   ├── x402-middleware-custom.ts     # Custom middleware
│   ├── custom-facilitator.ts         # ERC-6492 facilitator
│   └── network-context.tsx           # Network provider
├── components/ui/                    # shadcn/ui components
├── middleware.ts                     # X402 middleware router
└── .env.example                      # Environment variables template
```

## 🔐 Security Considerations

### For Open Source Release

✅ **Safe to share:**
- All code in this repository
- `.env.example` file
- Public wallet addresses (for receiving payments)
- Frontend code and UI components

❌ **NEVER commit:**
- `.env` or `.env.local` files (already in .gitignore)
- Private keys or seed phrases
- CDP API keys
- OnchainKit API keys (get your own)

### Best Practices

1. **Use separate wallets** for testnet and mainnet
2. **Never hardcode secrets** in your code
3. **Use environment variables** for all sensitive data
4. **Enable 2FA** on all service accounts
5. **Monitor your wallet** for unauthorized transactions
6. **Use hardware wallets** for mainnet/production

## 🌐 Network Configuration

This application **defaults to Base Mainnet** for production use. You can easily switch to testnet mode for testing.

### Switching Networks

**Method 1: URL Parameter (Recommended)**
```
# Enable testnet mode
http://localhost:3000?testnet=true

# Disable testnet mode (back to mainnet)
http://localhost:3000?testnet=false
```

The testnet setting persists across page navigation using `sessionStorage`.

**Method 2: Navbar Toggle**

Use the Testnet/Mainnet toggle in the navigation bar.

**Method 3: Environment Variable**

Set `NETWORK=testnet` in `.env.local` for server-side default.

### Network Details

#### Mainnet (Default)
- **Network:** Base
- **Chain ID:** 8453
- **RPC:** https://mainnet.base.org
- **Explorer:** https://basescan.org
- **USDC:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Requires:** Real funds, CDP API keys

#### Testnet (via ?testnet=true)
- **Network:** Base Sepolia
- **Chain ID:** 84532
- **RPC:** https://sepolia.base.org
- **Explorer:** https://sepolia.basescan.org
- **USDC:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Faucet:** https://www.alchemy.com/faucets/base-sepolia
- **Facilitator:** https://x402.org/facilitator (free)

See [TESTNET_MODE.md](./TESTNET_MODE.md) for detailed information.

## 🎨 Customization

### Change Pricing

Edit `lib/x402-config.ts`:

```typescript
export const ENDPOINT_PRICING = {
  'message': 0.10,       // Change these values
  'ui-ux-book': 0.10,
  'shadcn-block': 0.01,
} as const;
```

### Add New Endpoints

1. Add pricing to `lib/x402-config.ts`
2. Create API route in `app/api/your-endpoint/route.ts`
3. Add middleware in `middleware.ts`
4. Create UI page in `app/your-endpoint/page.tsx`
5. Add server action in `app/actions.ts`

### Customize UI

All pages use Tailwind CSS and shadcn/ui components. Modify:
- `app/globals.css` for global styles
- Individual page files for layout
- `components/ui/` for component styles

## 🧪 Testing

### Test the Payment Flow (Testnet Mode)

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Visit a demo page in testnet mode**
   ```
   http://localhost:3000/shadcn-blocks?testnet=true
   ```

   The `?testnet=true` parameter switches everything to Base Sepolia testnet.

3. **Connect your wallet** (MetaMask)
   - The app automatically uses Base Sepolia when in testnet mode
   - Make sure you have some testnet ETH and USDC

4. **Click "Purchase"**
   - Sign the EIP-712 message
   - Wait for payment verification
   - Content appears after successful payment!

### Switch to Mainnet

Simply remove the `?testnet=true` parameter or add `?testnet=false`:
```
http://localhost:3000/shadcn-blocks
```

You can also use the network toggle in the navbar.

### Get Testnet USDC

Base Sepolia USDC address: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

You can:
- Use the [Coinbase Faucet](https://portal.cdp.coinbase.com/products/faucet)
- Or swap testnet ETH for USDC on testnet DEXs

## 📊 Monitoring Payments

### View Transactions

- **Testnet:** https://sepolia.basescan.org/address/YOUR_WALLET_ADDRESS
- **Mainnet:** https://basescan.org/address/YOUR_WALLET_ADDRESS

### Server Logs

The application logs detailed payment information:
```
🎨 ShadCN Block Payment Verification
✅ Payment verified, settling...
✅ Payment settled successfully! Transaction: 0x...
📦 Fetching block data from Creative Tim registry...
✅ Block data fetched successfully!
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub (make sure `.env.local` is gitignored!)
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

### Environment Variables for Production

```env
NETWORK=mainnet
MAINNET_WALLET_ADDRESS=0x...
NEXT_PUBLIC_MAINNET_WALLET_ADDRESS=0x...
CDP_API_KEY_NAME=organizations/.../apiKeys/...
CDP_API_KEY_PRIVATE_KEY=...
NEXT_PUBLIC_ONCHAINKIT_API_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📚 Resources

- [X402 Protocol](https://x402.org) - Payment protocol documentation
- [Base Network](https://docs.base.org) - L2 blockchain documentation
- [wagmi](https://wagmi.sh) - React hooks for Ethereum
- [OnchainKit](https://onchainkit.xyz) - Coinbase Web3 toolkit
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) - Get API keys

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on testnet
5. Submit a pull request

## ⚖️ License

Apache-2.0 license

## 🙏 Acknowledgments

- [X402 Protocol](https://x402.org) for the payment infrastructure
- [Creative Tim](https://www.creative-tim.com) for the UI components
- [Coinbase](https://www.coinbase.com) for Base Network and OnchainKit
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components

---

**Built with ❤️ using Next.js, X402 Protocol, and Base Network**

For questions or issues, please open an issue on GitHub.
