"use client";

/**
 * GlobeLoader
 * ───────────
 * Keeps the 3D globe (three.js via react-globe.gl, the heaviest dependency on
 * the page) out of the initial bundle and off the main thread until needed:
 *  - the chunk is fetched only when the card comes within 200px of the viewport
 *  - the render loop is paused whenever the card is off-screen or the tab is hidden
 */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeVizHandle } from "@/components/ui/GlobeViz";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export type { GlobeVizHandle };

function GlobeSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#2997ff] motion-reduce:animate-none" />
    </div>
  );
}

/** Shown when WebGL is unavailable: a calm static planet glow instead of the 3D globe. */
function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden data-globe-fallback>
      <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle_at_35%_30%,#2997ff_0%,#06214a_45%,#020b1a_75%)] opacity-70 shadow-[0_0_80px_10px_rgba(41,151,255,0.25)]" />
    </div>
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const GlobeViz = dynamic(() => import("@/components/ui/GlobeViz"), { ssr: false, loading: GlobeSkeleton });

const GlobeLoader = forwardRef<GlobeVizHandle, { minHeight?: number }>(function GlobeLoader({ minHeight = 380 }, ref) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeVizHandle>(null);
  const [mode, setMode] = useState<"idle" | "globe" | "fallback">("idle");

  useImperativeHandle(ref, () => ({
    flyTo: (lat, lng) => globeRef.current?.flyTo(lat, lng),
    setPaused: (paused) => globeRef.current?.setPaused(paused),
  }));

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let onScreen = false;
    const apply = () => globeRef.current?.setPaused(!onScreen || document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) setMode((m) => (m === "idle" ? (supportsWebGL() ? "globe" : "fallback") : m));
        apply();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);

  return (
    <div ref={wrapperRef} data-globe className="h-full w-full" style={{ minHeight }}>
      {mode === "idle" && <GlobeSkeleton />}
      {mode === "fallback" && <GlobeFallback />}
      {mode === "globe" && (
        <ErrorBoundary fallback={<GlobeFallback />}>
          <GlobeViz ref={globeRef} />
        </ErrorBoundary>
      )}
    </div>
  );
});

export default GlobeLoader;
