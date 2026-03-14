"use client";

/**
 * GlobeLoader
 * ───────────
 * Viewport-observer wrapper for the 3D Globe.
 * Forwards a ref to GlobeViz so parent components can call flyTo().
 */

import { useEffect, useRef, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import type { GlobeVizHandle } from "@/components/ui/GlobeViz";

export type { GlobeVizHandle };

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

// ─── Lazy GlobeViz ───────────────────────────────────────────────────────────

const GlobeViz = dynamic(() => import("@/components/ui/GlobeViz"), {
    ssr: false,
    loading: GlobeSkeleton,
});

// ─── Component ───────────────────────────────────────────────────────────────

interface GlobeLoaderProps {
    minHeight?: number;
}

const GlobeLoader = forwardRef<GlobeVizHandle, GlobeLoaderProps>(
    function GlobeLoader({ minHeight = 380 }, ref) {
        const wrapperRef = useRef<HTMLDivElement>(null);
        const [inView, setInView] = useState(false);

        useEffect(() => {
            const el = wrapperRef.current;
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                },
                { rootMargin: "120px" }
            );

            observer.observe(el);
            return () => observer.disconnect();
        }, []);

        return (
            <div ref={wrapperRef} className="h-full w-full" style={{ minHeight }}>
                {inView ? <GlobeViz ref={ref} /> : <GlobeSkeleton />}
            </div>
        );
    }
);

export default GlobeLoader;
