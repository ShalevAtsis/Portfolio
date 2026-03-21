"use client";

/**
 * OceanicBackground — Bathymetric Flow Field Wrapper
 * ─────────────────────────────────────────────
 * The canvas rendering is extracted to OceanicCanvas for aggressive SSR lazy loading,
 * preventing hydration locks. This wrapper maintains the visual gradient background
 * and smoothly mounts the canvas asynchronously.
 */

import dynamic from "next/dynamic";

const OceanicCanvas = dynamic(() => import("./OceanicCanvas"), { ssr: false });

interface OceanicBackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export default function OceanicBackground({ children, className = "" }: OceanicBackgroundProps) {
    return (
        <div className={`relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 ${className}`}>
            <OceanicCanvas />
            {children}
        </div>
    );
}

