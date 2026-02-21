/** @type {import('next').NextConfig} */

/**
 * GitHub Pages deployment config.
 *
 * Environment variables (set in GitHub Actions / repo Settings → Variables):
 *   BASE_PATH             = /Portfolio   (used by Next.js internals)
 *   NEXT_PUBLIC_BASE_PATH = /Portfolio   (used by client/server code via lib/basePath.ts)
 *
 * Both must be set to the SAME value during `npm run build`.
 * Leave them unset for local `npm run dev` (resolves to "").
 */

const basePath = process.env.BASE_PATH?.replace(/\/$/, "") || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Tells Next.js router + next/link that all routes live under /Portfolio
  basePath: basePath || undefined,

  // Tells Next.js where to load JS/CSS chunks from
  assetPrefix: basePath ? `${basePath}/` : undefined,

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
