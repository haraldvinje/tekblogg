'use client'

import { ThemeProvider } from 'next-themes'

export function ThemeWrapper({ children, nonce }: { children: React.ReactNode; nonce: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableColorScheme={false} nonce={nonce}>
      {children}
    </ThemeProvider>
  )
}
