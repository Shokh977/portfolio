import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.resolve.alias['installHook.js'] = false;
    }

    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
