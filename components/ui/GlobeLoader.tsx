"use client";

/**
 * GlobeLoader
 * ───────────
 * Dedicated viewport-observer wrapper for the 3D Globe.
 *
 * Architecture:
 *  1. Maintains a fixed minimum height while unloaded — ensures the placeholder
 *     card sits BELOW the fold and the IntersectionObserver never fires on the
 *     initial paint.
 *  2. Uses IntersectionObserver to detect when the card enters the viewport.
 *  3. Only then dynamically imports GlobeViz (which in turn imports react-globe.gl
 *     / Three.js). This guarantees those heavy chunks are NEVER in the initial JS
 *     evaluation path and cannot corrupt the LCP measurement.
 *  4. Displays a pure-CSS loading skeleton while unloaded or while loading.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// ─── Skeleton ────────────────────────────────────────────────────────────────

function GlobeSkeleton() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-slate-950" aria-hidden>
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-cyan-500/20 border-t-cyan-500" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-500/60">
                    Initializing Orbit…
                </span>
            </div>
        </div>
    );
}

// ─── Lazy GlobeViz — NOT imported at module level ────────────────────────────
// This dynamic() call is intentionally placed inside this file (not at the
// parent level) so that the react-globe.gl / Three.js chunk is only downloaded
// after the IntersectionObserver fires.

const GlobeViz = dynamic(() => import("@/components/ui/GlobeViz"), {
    ssr: false,
    loading: GlobeSkeleton,
});

// ─── Component ───────────────────────────────────────────────────────────────

interface GlobeLoaderProps {
    /**
     * Must match the containing card's height so the placeholder keeps
     * the card below the fold — preventing the observer from firing
     * instantly during the initial paint.
     */
    minHeight?: number;
}

export default function GlobeLoader({ minHeight = 380 }: GlobeLoaderProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // one-shot — no need to keep watching
                }
            },
            { rootMargin: "120px" } // pre-load slightly before it enters the viewport
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="h-full w-full"
            style={{ minHeight }}
        >
            {inView ? <GlobeViz /> : <GlobeSkeleton />}
        </div>
    );
}
