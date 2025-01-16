/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '',
  trailingSlash: true,
}

module.exports = nextConfig
