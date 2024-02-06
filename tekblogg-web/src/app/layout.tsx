import './globals.css'
import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { headers } from 'next/headers'
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
  const nonce = headers().get('x-nonce') ?? ''
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? ''

  return (
    <html lang="nb" className={inter.className}>
      <body className="transition duration-500 dark:bg-dark-lighter">
        <Script id="gtmScript" nonce={nonce} strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
            n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ThemeWrapper nonce={nonce}>
          <Navbar />
          <main className="flex w-full justify-center px-[10%] py-10 xl:px-[20%]">{children}</main>
        </ThemeWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
