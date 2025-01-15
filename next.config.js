/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Corsica-Luxury-Rentals',
  trailingSlash: true,
}

module.exports = nextConfig
