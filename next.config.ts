import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Enable type checking for production builds
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable linting for production builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lifewire.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  output: 'standalone', // Optimized for Node.js server environments like Netlify
};

export default nextConfig;
