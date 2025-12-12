import type { NextConfig } from 'next';
import { env } from './src/lib/env';

// Validate env variables at build time
void env;

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thewitcher.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default nextConfig;
