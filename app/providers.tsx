'use client';

import { ReactNode } from 'react';
import { baseSepolia, base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { NetworkProvider } from '@/lib/network-context';

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          logo: "/x402-icon-blue.png",
          name: "X402 Creative Tim Demo",
        },
      }}
    >
      <NetworkProvider>
        {props.children}
      </NetworkProvider>
    </OnchainKitProvider>
  );
}

