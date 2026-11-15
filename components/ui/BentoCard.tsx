"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { useFinePointer, useReducedMotionSafe } from "@/lib/hooks";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Pointer-driven tilt + spotlight. Ignored on touch devices and under reduced motion. */
  interactive?: boolean;
}

export const CARD_SURFACE =
  "relative overflow-hidden rounded-card border border-hairline bg-surface/70 shadow-soft backdrop-blur-xl";

const SPRING = { stiffness: 180, damping: 22 } as const;
const TILT_DEG = 3.5;

/** Glass tile used across the bento grids. */
export default function BentoCard({ children, className, interactive = false }: BentoCardProps) {
  const finePointer = useFinePointer();
  const reduced = useReducedMotionSafe();
  const active = interactive && finePointer && !reduced;

  const rect = useRef<DOMRect | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spotX = useMotionValue(-999);
  const spotY = useMotionValue(-999);
  const glow = useSpring(0, { stiffness: 140, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [TILT_DEG, -TILT_DEG]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT_DEG, TILT_DEG]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}px ${spotY}px, rgb(var(--accent) / 0.14), transparent 70%)`;

  if (!active) {
    return <div className={cn(CARD_SURFACE, className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(CARD_SURFACE, className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerEnter={(e) => {
        rect.current = e.currentTarget.getBoundingClientRect();
        glow.set(1);
      }}
      onPointerMove={(e) => {
        const r = rect.current;
        if (!r) return;
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        px.set(x / r.width);
        py.set(y / r.height);
        spotX.set(x);
        spotY.set(y);
      }}
      onPointerLeave={() => {
        rect.current = null;
        px.set(0.5);
        py.set(0.5);
        glow.set(0);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlight, opacity: glow }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
