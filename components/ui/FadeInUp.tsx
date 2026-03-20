"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springSnappy, fadeInUpVariants } from "@/lib/motion";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  margin?: string;
  as?: keyof typeof motion;
}

/**
 * FadeInUp — Scroll-triggered entrance animation utility.
 *
 * A11y: Respects the user's "Reduce Motion" OS preference (WCAG 2.3.3).
 * When prefers-reduced-motion is set, the animation variants are overridden
 * to show children immediately at full opacity with no transform.
 */
export default function FadeInUp({
  children,
  className,
  delay = 0,
  once = true,
  margin = "-60px",
  as = "div",
}: FadeInUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  // When the user prefers reduced motion, skip the animation entirely —
  // both hidden and visible states are identical (instant render).
  const reducedVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={prefersReducedMotion ? reducedVariants : fadeInUpVariants}
      transition={prefersReducedMotion ? { duration: 0 } : { ...springSnappy, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
