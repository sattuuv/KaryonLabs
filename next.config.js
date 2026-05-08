/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/KaryonLabs',
  assetPrefix: '/KaryonLabs/',
  distDir: 'out'
}

module.exports = nextConfig
