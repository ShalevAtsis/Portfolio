"use client";

import dynamic from "next/dynamic";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";
import type { OceanVariant } from "@/components/ui/OceanShader";

// The shader is client-only and loaded after first paint; the CSS/SVG layer
// below is what SSR and LCP see, so there is no layout shift and no blank frame.
const OceanShader = dynamic(() => import("@/components/ui/OceanShader"), { ssr: false });

const WAVES = [
  { d: "M0 40 Q 150 10 300 40 T 600 40 T 900 40 T 1200 40 T 1500 40 T 1800 40 T 2100 40 T 2400 40", top: "58%", duration: "26s", opacity: 0.35 },
  { d: "M0 40 Q 200 5 400 40 T 800 40 T 1200 40 T 1600 40 T 2000 40 T 2400 40", top: "68%", duration: "34s", opacity: 0.25 },
  { d: "M0 40 Q 120 20 240 40 T 480 40 T 720 40 T 960 40 T 1200 40 T 1440 40 T 1680 40 T 1920 40 T 2160 40 T 2400 40", top: "80%", duration: "20s", opacity: 0.18 },
];

interface OceanBackdropProps {
  variant?: OceanVariant;
  scroll?: MotionValue<number>;
  depth?: MotionValue<number>;
  /** Mount the WebGL layer (set false to render only the CSS/SVG fallback). */
  webgl?: boolean;
  className?: string;
}

/**
 * Decorative ocean layer: CSS gradient + drifting SVG wave lines (always), with
 * the WebGL shader fading in on top when available. Purely presentational.
 */
export default function OceanBackdrop({ variant = "hero", scroll, depth, webgl = true, className }: OceanBackdropProps) {
  return (
    <div
      aria-hidden="true"
      data-ocean-backdrop={variant}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Static fallback / first paint */}
      <div className={cn("absolute inset-0", variant === "deep" ? "ocean-gradient-deep" : "ocean-gradient")} />
      <div className="absolute inset-0">
        {WAVES.map((wave, i) => (
          <svg
            key={i}
            className="ocean-wave absolute left-0 h-20 w-[200%] text-accent"
            style={{ top: wave.top, opacity: wave.opacity, animationDuration: wave.duration }}
            viewBox="0 0 2400 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d={wave.d} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>

      {webgl && <OceanShader variant={variant} scroll={scroll} depth={depth} className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
