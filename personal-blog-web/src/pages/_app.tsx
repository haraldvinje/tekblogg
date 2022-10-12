import '/styles/globals.css'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'src/components/layouts/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {cookie_flags: 'SameSite=None;Secure'});
        `}
      </Script>
      <ThemeProvider enableSystem={false}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
