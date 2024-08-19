import 'normalize.css'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/navbar'
import { ThemeWrapper } from '@/components/theme-wrapper'
import { generateCanonicalUrl } from '@/lib/text-utils'

const title = 'TekBlogg'
const titleObject = {
  default: title,
  template: '%s - TekBlogg'
}
const description =
  'Velkommen til TekBlogg 🤓 Sjekk ut det nyeste innen teknologi og programmering her!'
const image = { url: '/harald_og.png', width: 800, height: 600 }

const url = generateCanonicalUrl()

const commonFields = {
  title,
  description,
  images: image,
  url
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
  metadataBase: url,
  alternates: {
    canonical: '/'
  },
  ...commonFields,
  openGraph: {
    type: 'website',
    siteName: title,
    description,
    images: [image],
    url,
    title,
    ...titleObject
  },
  twitter: {
    card: 'summary',
    ...commonFields,
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

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? ''

  return (
    <html lang="nb" className={inter.className}>
      <body className="transition duration-500 dark:bg-dark">
        <ThemeWrapper>
          <Navbar />
          <main className="flex w-full justify-center px-[10%] py-10 xl:px-[20%]">{children}</main>
        </ThemeWrapper>
        <Analytics />
        <SpeedInsights />
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  )
}
