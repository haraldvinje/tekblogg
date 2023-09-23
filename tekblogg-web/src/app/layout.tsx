import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Partytown } from '@builder.io/partytown/react'
import { Analytics } from '@vercel/analytics/react'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { ThemeWrapper } from '@/components/theme-wrapper'
import { generateCanonicalUrl } from '@/lib/text-utils'
import { GoogleAnalytics } from '@/components/google-analytics'

const title = 'TekBlogg'
const titleObject = {
  default: title,
  template: '%s - TekBlogg'
}
const description =
  'Velkommen til TekBlogg 🤓 Sjekk ut det nyeste innen teknologi og programmering her!'
const image = { url: '/harald.png', width: 200, height: 200 }

const url = generateCanonicalUrl()

const commonFields = {
  title,
  description,
  images: image,
  url
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

function GoogleAnalyticsFallback() {
  return <>placeholder</>
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={inter.className}>
      <body className="transition duration-500 dark:bg-dark-lighter">
        <Suspense fallback={<GoogleAnalyticsFallback />}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
        </Suspense>
        <ThemeWrapper>
          <Navbar />
          <main className="flex w-full justify-center px-[10%] py-10 xl:px-[20%]">{children}</main>
          <Partytown debug={true} forward={['dataLayer.push']} />
        </ThemeWrapper>
        <Analytics />
      </body>
    </html>
  )
}
