'use client'

import Script from 'next/script'

export function GoogleAnalytics({ gaMeasurementId }: { gaMeasurementId: string }) {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaMeasurementId}');
          `
        }}
      />
    </>
  )
}
