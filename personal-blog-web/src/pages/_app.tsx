import '/styles/globals.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'src/components/layouts/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <ThemeProvider enableSystem={false}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
