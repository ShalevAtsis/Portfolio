"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SCROLL_SPRING } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Section transition: a hairline that scales in from the centre and a single
 * wave line that draws itself as it scrolls into view. Decorative only.
 */
export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 50%"] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const opacity = useTransform(progress, [0, 0.15], [0, 1]);

  return (
    <div ref={ref} aria-hidden className="mx-auto w-full max-w-content px-6 sm:px-8">
      <motion.div className="h-px w-full origin-center bg-hairline" style={reduced ? undefined : { scaleX: progress }} />
      <svg viewBox="0 0 1100 28" preserveAspectRatio="none" fill="none" className="-mt-3.5 h-7 w-full text-accent">
        <motion.path
          d="M0 14 C 70 2, 140 26, 210 14 S 350 2, 420 14 S 560 26, 630 14 S 770 2, 840 14 S 980 26, 1100 14"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          style={reduced ? undefined : { pathLength: progress, opacity }}
        />
      </svg>
    </div>
  );
}
