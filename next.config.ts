import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.lukhamhan.siraxuth.xyz',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', '@radix-ui/themes'],
  },
  serverExternalPackages: ['bcrypt'],
};

export default nextConfig;
