'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { baseSepolia, base } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { USDC_ADDRESSES } from './x402-config';

export type NetworkType = 'testnet' | 'mainnet';

interface NetworkContextType {
  network: NetworkType;
  chain: Chain;
  walletAddress: string;
  usdcAddress: string;
  setNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  // Default to mainnet
  const [network, setNetworkState] = useState<NetworkType>('mainnet');

  // Check for testnet mode via URL parameter or sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check URL parameter first
      const urlParams = new URLSearchParams(window.location.search);
      const testnetParam = urlParams.get('testnet');

      if (testnetParam === 'true') {
        // Enable testnet mode and persist it
        setNetworkState('testnet');
        sessionStorage.setItem('testnet-mode', 'true');
      } else if (testnetParam === 'false') {
        // Explicitly disable testnet mode
        setNetworkState('mainnet');
        sessionStorage.removeItem('testnet-mode');
      } else {
        // Check if testnet mode was previously enabled
        const stored = sessionStorage.getItem('testnet-mode');
        if (stored === 'true') {
          setNetworkState('testnet');
        } else {
          // Default to mainnet
          setNetworkState('mainnet');
        }
      }
    }
  }, []);

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    if (typeof window !== 'undefined') {
      if (newNetwork === 'testnet') {
        sessionStorage.setItem('testnet-mode', 'true');
      } else {
        sessionStorage.removeItem('testnet-mode');
      }
    }
  };

  const chain = network === 'testnet' ? baseSepolia : base;
  
  // Get wallet address based on network
  const walletAddress = network === 'testnet'
    ? process.env.NEXT_PUBLIC_TESTNET_WALLET_ADDRESS || ''
    : process.env.NEXT_PUBLIC_MAINNET_WALLET_ADDRESS || '';

  // USDC contract addresses (public constants)
  const usdcAddress = network === 'testnet'
    ? USDC_ADDRESSES.testnet
    : USDC_ADDRESSES.mainnet;

  return (
    <NetworkContext.Provider value={{ network, chain, walletAddress, usdcAddress, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
}

