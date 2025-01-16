/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '',
  trailingSlash: true,
}

module.exports = nextConfig
