import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',  // Static export for S3 + CloudFront (was 'standalone' for ECS)
  // Note: rewrites not supported with output: 'export'. Use NEXT_PUBLIC_API_URL for API calls.
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
};

export default nextConfig;
