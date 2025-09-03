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
        hostname: '**', // อนุญาตทุกโดเมน
      },
      {
        protocol: 'http',
        hostname: '**', // เผื่อใช้ HTTP ด้วย
      },
    ],
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion'],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
