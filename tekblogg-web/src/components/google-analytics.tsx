'use client'

import Script from 'next/script'

export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  return (
    <>
      <Script
        strategy="worker"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
              });
                `
        }}
      />
      <script
        data-partytown-config
        dangerouslySetInnerHTML={{
          __html: `
          partytown = {
            lib: "/_next/static/~partytown/",
            forward: ["gtag"]           
          };
        `
        }}
      />
    </>
  )
}
