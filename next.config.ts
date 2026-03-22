import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',
  trailingSlash: true, // Exports as /path/index.html for CloudFront+S3 routing
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
