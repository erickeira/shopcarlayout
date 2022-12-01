// import urlImg from './utils'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-dev.shopcar.com.br',
      },
    ],
  },
}

module.exports = nextConfig
