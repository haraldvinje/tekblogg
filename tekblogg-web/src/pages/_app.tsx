import '/styles/globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <ThemeProvider enableSystem={false}>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default appWithTranslation(MyApp)
