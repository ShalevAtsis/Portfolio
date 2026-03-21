/** @type {import('next').NextConfig} */

/**
 * GitHub Pages deployment config.
 * Optimized for root-level custom domain (shalevatsis.dev).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'clsx', 'tailwind-merge'],
  },
  // GitHub Pages serves files without a trailing slash by default,
  // but static export works best with it on.
  trailingSlash: true,

  images: {
    // Custom loader delegates all optimisation to Cloudinary's CDN.
    // This is the correct pattern for `output: 'export'` — the built-in
    // Next.js image optimisation API requires a Node server and cannot run
    // in a static export. The custom loader bypasses that restriction entirely.
    loader: "custom",
    loaderFile: "./lib/cloudinaryLoader.ts",
    qualities: [25, 50, 75, 85, 90, 100],
    // remotePatterns are still respected for security when loader is 'custom'
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
