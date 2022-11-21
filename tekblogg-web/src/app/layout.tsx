'use client'

import '/styles/globals.css'
import { ReactNode } from 'react'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import Metatags from 'src/components/Metatags'
import Navbar from 'src/app/Navbar'
import { fadeIn } from 'src/lib/animations'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Metatags
          title="TekBlogg"
          description="Velkommen til TekBloggen! Sjekk ut det nyeste innen teknologi og programmering her."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {cookie_flags: 'SameSite=None;Secure'});
          `}
      </Script>
    </html>
  )
}

function AnimationWrapper({ children }: { children: ReactNode }) {
  const animation = fadeIn
  return (
    <div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation.variants}
            transition={animation.transition}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}
