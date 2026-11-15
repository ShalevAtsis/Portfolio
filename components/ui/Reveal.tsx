"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the entrance starts (use for staggering siblings). */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Starting scale (1 = no scale). */
  scale?: number;
  as?: "div" | "li" | "span" | "article";
}

/**
 * Scroll-triggered entrance: fades and rises once when ~10% inside the viewport.
 * Animates transform + opacity only. Under reduced motion the final state is
 * applied immediately with no movement.
 */
export default function Reveal({ children, className, delay = 0, y = 28, scale = 1, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as] as typeof motion.div;
  const shown = { opacity: 1, y: 0, scale: 1 };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale }}
      {...(reduced
        ? { animate: shown, transition: { duration: 0 } }
        : {
            whileInView: shown,
            viewport: { once: true, margin: "-10% 0px" },
            transition: { duration: 0.8, ease: EASE_OUT, delay },
          })}
    >
      {children}
    </Tag>
  );
}
