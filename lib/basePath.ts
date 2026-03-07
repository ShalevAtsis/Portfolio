/**
 * basePath.ts
 * ────────────
 * Single source of truth for the repository sub-path.
 *
 * - Now optimized for root-level custom domain (shalevatsis.dev).
 * - Resolves to "" by default.
 *
 * Usage:
 *   import { basePath, asset } from "@/lib/basePath";
 *
 *   // for <a>, <object>, <img> tags (native HTML – NOT next/link):
 *   <a href={asset("/Shalev_Atsis_CV.pdf")} download>
 *
 *   // for next/link / next/image – they pass just "/path".
 */

export const basePath: string =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

/**
 * Prepend the basePath to a root-relative asset path.
 * e.g. asset("/Shalev_Atsis_CV.pdf") → "/Shalev_Atsis_CV.pdf"
 */
export function asset(path: string): string {
    return `${basePath}${path}`;
}
