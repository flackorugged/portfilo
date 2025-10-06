import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nccolgsytoyxtovnbxuf.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Modern image formats for better performance
    formats: ['image/avif', 'image/webp'],
    // Responsive image sizes for different devices
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 60 seconds
    minimumCacheTTL: 60,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize for production
  poweredByHeader: false, // Remove X-Powered-By header for security
};

export default nextConfig;
