/**
 * Type declarations for browser window.ethereum
 */

interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>
    isMetaMask?: boolean
    isCoinbaseWallet?: boolean
    selectedAddress?: string
    chainId?: string
  }
}

