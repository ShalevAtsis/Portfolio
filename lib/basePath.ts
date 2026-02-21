/**
 * basePath.ts
 * ────────────
 * Single source of truth for the repository sub-path.
 *
 * - In GitHub Pages CI:  set NEXT_PUBLIC_BASE_PATH=/Portfolio
 * - Local dev:           leave the env var unset → resolves to ""
 *
 * NEXT_PUBLIC_ prefix makes the value available in both server and
 * client components (inlined at build time by Next.js).
 *
 * Usage:
 *   import { basePath, asset } from "@/lib/basePath";
 *
 *   // for <a>, <object>, <img> tags (native HTML – NOT next/link):
 *   <a href={asset("/Shalev_Atsis_CV.pdf")} download>
 *
 *   // for next/link / next/image – they read basePath from next.config
 *   // automatically, so you still pass just "/path" there.
 */

export const basePath: string =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

/**
 * Prepend the basePath to a root-relative asset path.
 * e.g. asset("/Shalev_Atsis_CV.pdf") → "/Portfolio/Shalev_Atsis_CV.pdf"
 */
export function asset(path: string): string {
    return `${basePath}${path}`;
}
