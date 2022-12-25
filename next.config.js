/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["rickandmortyapi.com"]
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
}

module.exports = nextConfig
