/** @type {import('next').NextConfig} */
import withBundleAnalyzerInit from '@next/bundle-analyzer'
import withSerwistInit from "@serwist/next"

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
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
}

const finalConfig = (_phase, { }) => {
  const plugins = [withSerwist, withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}


export default finalConfig