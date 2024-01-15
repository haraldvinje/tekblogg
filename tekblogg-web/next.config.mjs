/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next"
import withBundleAnalyzerInit from '@next/bundle-analyzer'

const withSerwist = withSerwistInit({
  cacheOnFrontEndNav: true,
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
})

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'nextjs.gallery',
      }
    ]
  },
  compiler: {
    styledComponents: true
  },
  experimental: {
    windowHistorySupport: true,
  }
}

const finalConfig = (_phase, { }) => {
  const plugins = [withSerwist, withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}


export default finalConfig