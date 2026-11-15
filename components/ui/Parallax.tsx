"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Moves its child vertically by ±`offset` px as it crosses the viewport
 * (transform only). Different offsets on siblings create depth layers.
 */
export default function Parallax({ children, offset = 40, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
