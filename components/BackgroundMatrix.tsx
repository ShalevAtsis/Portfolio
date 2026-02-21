import type { ReactNode } from "react";
import OceanicBackground from "@/components/OceanicBackground";

/**
 * BackgroundMatrix
 * ────────────────
 * Full-page shell providing:
 *   • OceanicBackground animated canvas (dark mode) — z-[-1]
 *   • 28×28 px CSS grid-line texture (both modes, subtle)
 *   • SVG feTurbulence noise grain at ~3.5 % opacity via mix-blend-overlay
 *   • Fixed indigo radial ambient glow — dark mode only
 */


// Inline SVG noise — no external file, no network request
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter>
  <rect width='200' height='200' filter='url(%23n)' opacity='1'/>
</svg>`;

const NOISE_URI = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

interface Props {
    children: ReactNode;
    className?: string;
}

export default function BackgroundMatrix({ children, className = "" }: Props) {
    return (
        <div
            className={`relative min-h-screen bg-slate-50 dark:bg-transparent ${className}`}
            style={{
                backgroundImage: [
                    "linear-gradient(to right,  rgba(100,116,139,0.05) 1px, transparent 1px)",
                    "linear-gradient(to bottom, rgba(100,116,139,0.05) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "28px 28px",
            }}
        >
            {/* Animated Bathymetric Canvas — always mounted, fills its own dark background */}
            <OceanicBackground className="hidden dark:block" />
            {/* Noise grain overlay */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0 mix-blend-overlay opacity-[0.035] dark:opacity-[0.025]"
                style={{ backgroundImage: NOISE_URI, backgroundRepeat: "repeat" }}
            />

            {/* Indigo ambient glow — dark only */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[520px] opacity-0 dark:opacity-100"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 45% at 50% -8%, rgba(99,102,241,0.14) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10">{children}</div>
        </div>
    );
}
