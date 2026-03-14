import type { ImageLoaderProps } from "next/image";

/**
 * Cloudinary custom loader for next/image.
 *
 * Configured via NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env var.
 * Falls back to the raw `src` when the cloud name is absent (local dev
 * without Cloudinary, or plain public/ images).
 *
 * Transformation string:
 *   f_auto   — serve WebP/AVIF automatically based on Accept header
 *   q_auto   — Cloudinary's perceptual quality algorithm
 *   ql_{q}   — quality level hint (0-100) fed into q_auto for fine control
 *   w_{w}    — resize to the requested width
 *   c_limit  — never upscale
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // No cloud name → return src as-is (local /public images still work)
  if (!cloud) return src;

  const q = quality ?? 85;
  // q_auto:best picks the optimal codec+quality automatically;
  // ql_ passes the Next.js quality hint as a Cloudinary quality level.
  const transforms = `f_auto,q_auto,ql_${q},w_${width},c_limit`;

  // src is expected to be a Cloudinary public ID (e.g. "gallery/photo-1")
  // Strip any leading slash so the URL is well-formed
  const publicId = src.replace(/^\//, "");

  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}
