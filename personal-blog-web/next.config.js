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

const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching
})

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withPWA]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}
