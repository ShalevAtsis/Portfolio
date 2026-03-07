/** @type {import('next').NextConfig} */

/**
 * GitHub Pages deployment config.
 * Optimized for root-level custom domain (shalevatsis.dev).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // GitHub Pages serves files without a trailing slash by default,
  // but static export works best with it on.
  trailingSlash: true,

  images: {
    unoptimized: true, // required for static export
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
