import '/styles/globals.css'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import type { AppProps } from 'next/app'
import { Html, Head } from 'next/document'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'src/components/layouts/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Html lang="nb">
      <Head />
      <body>
        <GoogleAnalytics trackPageViews />
        <ThemeProvider enableSystem={false}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </body>
    </Html>
  )
}

export default MyApp
