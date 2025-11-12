'use client';

import { ReactNode } from 'react';
import { Navbar } from './navbar';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

