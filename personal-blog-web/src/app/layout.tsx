import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import Metatags from 'src/components/Metatags'
import AnimationWrapper from 'src/components/AnimationWrapper'
import Navbar from 'src/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Metatags
          title="TekBlogg"
          description="Velkommen til TekBloggen! Sjekk ut det nyeste innen teknologi og programmering her."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
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
      </head>
      <body>
        <ThemeProvider enableSystem={false}>
          <Navbar />
          <AnimationWrapper>
            <main className="my-10 flex justify-center py-[5%] px-[10%] xl:px-[20%]">
              {children}
            </main>
          </AnimationWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
