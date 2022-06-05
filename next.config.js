/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: 'dist',
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  reactStrictMode: true,
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = nextConfig;
