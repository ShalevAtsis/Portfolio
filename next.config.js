/** @type {import('next').NextConfig} */

// Required for GitHub Pages: set BASE_PATH in CI (e.g. /portfolio for repo "portfolio")
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

module.exports = nextConfig;
