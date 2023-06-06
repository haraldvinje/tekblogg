/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io', 'nextjs.gallery']
  },
  compiler: {
    styledComponents: true
  }
}

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

const withBundleAnalyzer = require('next-bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withPWA, withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
