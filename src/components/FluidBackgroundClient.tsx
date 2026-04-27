"use client";

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const FluidBackground = dynamic(() => import('@/components/FluidBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

export default function FluidBackgroundClient({ children }: { children: ReactNode }) {
  return <FluidBackground>{children}</FluidBackground>;
}
