"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionSafe } from "@/lib/hooks";

/**
 * Pulls its child a few pixels toward the cursor (Apple-style magnetic CTA).
 * Mouse only; a no-op on touch devices and under reduced motion.
 */
export default function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const finePointer = useFinePointer();
  const reduced = useReducedMotionSafe();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });

  if (!finePointer || reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
