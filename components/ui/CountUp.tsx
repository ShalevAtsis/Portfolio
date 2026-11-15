"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `to` the first time it scrolls into view. The final value is
 * server-rendered (no-JS and assistive tech always read the real number) and
 * the animation writes straight to the DOM node, never through React state.
 */
export default function CountUp({ to, suffix = "", prefix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = `${prefix}${to}${suffix}`;
    };
  }, [inView, reduced, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className} data-visual-mask>
      {`${prefix}${to}${suffix}`}
    </span>
  );
}
