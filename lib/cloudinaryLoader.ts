import type { ImageLoaderProps } from "next/image";

const CLOUD_NAME = "ddyrg0nz5";

/**
 * Cloudinary custom loader for next/image.
 *
 * Transformation string:
 *   f_auto   — serve WebP/AVIF automatically based on Accept header
 *   q_auto   — Cloudinary's perceptual quality algorithm
 *   ql_{q}   — quality level hint (0-100) fed into q_auto for fine control
 *   w_{w}    — resize to the requested width
 *   c_limit  — never upscale
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 85;
  // q_auto:best picks the optimal codec+quality automatically;
  // ql_ passes the Next.js quality hint as a Cloudinary quality level.
  const transforms = `f_auto,q_auto,w_${width},c_limit`;

  // src is expected to be a Cloudinary public ID (e.g. "gallery/photo-1")
  // Strip any leading slash so the URL is well-formed
  const publicId = src.replace(/^\//, "");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
