import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Skip static generation for pages with Supabase
  experimental: {
    // Disable static generation for specific routes
  },
  // Generate build ID that doesn't fail on missing env vars
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
