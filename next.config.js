/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/search': { page: '/search' },
      '/image': { page: '/image' },
      '/news': { page: '/news' },
      '/404': { page: '/404' },
    }
  },
  images: {
    loader: 'imgix',
    path: '',
  },
}
