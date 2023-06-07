import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Partytown } from '@builder.io/partytown/react'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/navbar'
import { ThemeWrapper } from '@/components/theme-wrapper'
import { AnimationWrapper } from '@/components/animation-wrapper'

const title = 'TekBlogg'
const titleObject = {
  default: title,
  template: '%s - TekBlogg'
}
const description =
  'Velkommen til TekBlogg 🤓 Sjekk ut det nyeste innen teknologi og programmering her!'
const image = { url: '/harald.png', width: 400, height: 400 }

const metaFields = {
  title,
  description,
  images: image
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ?? 'https://tekblogg.dev'),
  ...metaFields,
  openGraph: {
    type: 'website',
    siteName: title,
    description,
    images: [image],
    ...titleObject
  },
  twitter: {
    card: 'summary',
    description,
    ...titleObject
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <body className="transition duration-500 dark:bg-dark-lighter">
        <ThemeWrapper>
          <Navbar />
          <AnimationWrapper>
            <main className="flex w-full justify-center px-[10%] py-10 xl:px-[20%]">
              {children}
            </main>
          </AnimationWrapper>
          <Partytown debug={true} forward={['dataLayer.push']} />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="worker"
          />
          <Script id="google-analytics" strategy="worker">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {cookie_flags: 'SameSite=None;Secure'});
            `}
          </Script>
        </ThemeWrapper>
        <Analytics />
      </body>
    </html>
  )
}
