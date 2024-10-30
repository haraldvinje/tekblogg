import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "nextjs.gallery",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
