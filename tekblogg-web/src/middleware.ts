import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const scriptSrcWhitelist = ['www.googletagmanager.com', 'va.vercel-scripts.com']
  const scriptSrcWhiteListString = scriptSrcWhitelist.map((domain) => `https://${domain}`).join(' ')

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    script-src 'strict-dynamic' 'nonce-${nonce}';
    img-src 'self' cdn.sanity.io blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
