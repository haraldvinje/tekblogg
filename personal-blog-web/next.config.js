/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'nextjs.gallery']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
