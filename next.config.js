/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours cache for better performance
    deviceSizes: [640, 700, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 700],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.lukhamhan.siraxuth.xyz',
      },
    ],
  },
  experimental: {
    // Explicitly disable CSS optimization as it's causing build issues
    optimizeCss: false,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion'],
  },
  reactStrictMode: true,
  // Next.js 15 uses swc by default and doesn't need swcMinify option
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 