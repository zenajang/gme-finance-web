import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = {
        level: "error",
      };
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bjvimqlluaksrztvrgfa.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Skip static generation for pages with Supabase
  experimental: {},
  // Generate build ID that doesn't fail on missing env vars
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // 정적 파일 캐시 설정
  async headers() {
    return [
      {
        // 이미지 파일 - 1년 캐시
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 비디오 파일 - 1년 캐시
        source: '/:path*.webm',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // SVG, 폰트 등 - 1년 캐시
        source: '/:path*.(svg|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
