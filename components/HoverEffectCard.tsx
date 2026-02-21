"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from "framer-motion";

/**
 * HoverEffectCard — Spotlight 2.0
 * ────────────────────────────────
 * Physics-based hover that combines:
 *
 *  1. Radial spotlight fill  — cursor-tracked radial-gradient with a
 *     soft emerald tint + card-specific accent. Radius: 480px.
 *
 *  2. Border glow ring       — a thinner, brighter gradient masked to the
 *     1-px border only, so the glow "spills" past the edge of the card.
 *
 *  3. 3D tilt                — spring-smoothed ±7° rotation on X/Y axes,
 *     stiffness:160 / damping:22, with translateZ(24px) content lift.
 *
 * All values spring from 0 on Enter and back to 0 on Leave.
 */

const SPRING_CFG = { stiffness: 160, damping: 22 } as const;
const TILT_DEG = 7;    // max tilt amplitude
const SPOT_PX = 480;  // spotlight radius (px) — larger = softer spill
const BORDER_PX = 380;  // border glow radius

interface HoverEffectCardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Card-specific accent colour for the spotlight centre — RGBA string */
    spotlightColor?: string;
}

export default function HoverEffectCard({
    children,
    className = "",
    style,
    spotlightColor = "rgba(16,185,129,0.12)",  // emerald default
}: HoverEffectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // ── Normalised mouse pos [0,1] — drives tilt ────────────────────────────
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // ── Exact pixel pos — drives spotlight ──────────────────────────────────
    const spotX = useMotionValue(-9999);
    const spotY = useMotionValue(-9999);

    // ── Spring-smoothed tilt ─────────────────────────────────────────────────
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [TILT_DEG, -TILT_DEG]), SPRING_CFG);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-TILT_DEG, TILT_DEG]), SPRING_CFG);

    // ── Spotlight opacity — springs in/out so it doesn't snap ───────────────
    const spotOpacity = useSpring(0, { stiffness: 120, damping: 18 });

    // ── CSS gradient templates ───────────────────────────────────────────────
    //    Fill: layered dual-stop = emerald tint at centre → card accent → transparent
    const fillGlow = useMotionTemplate`radial-gradient(
        ${SPOT_PX}px circle at ${spotX}px ${spotY}px,
        rgba(16,185,129,0.10) 0%,
        ${spotlightColor} 40%,
        transparent 80%
    )`;

    //    Border: bright, narrower ring — masked to 1-px border only
    const borderGlow = useMotionTemplate`radial-gradient(
        ${BORDER_PX}px circle at ${spotX}px ${spotY}px,
        rgba(16,185,129,0.35),
        transparent 70%
    )`;

    // ── Event handlers ───────────────────────────────────────────────────────
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x / rect.width);
        mouseY.set(y / rect.height);
        spotX.set(x);
        spotY.set(y);
    };

    const onEnter = () => spotOpacity.set(1);

    const onLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        spotOpacity.set(0);
        // keep spotX/Y position — the fade handles disappearance cleanly
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 900,
                ...style,
            }}
            className={`group relative isolate overflow-visible ${className}`}
        >
            {/* ── Spotlight fill ── */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                style={{ background: fillGlow, opacity: spotOpacity }}
            />

            {/* ── Border glow — masked to border-stroke only ── */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-px z-0 rounded-[inherit]"
                style={{
                    background: borderGlow,
                    opacity: spotOpacity,
                    // Mask-composite punches out the content-box, leaving only the border ring
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "1px",
                }}
            />

            {/* ── Content — translateZ lifts for 3D depth ── */}
            <div className="relative z-10" style={{ transform: "translateZ(24px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
