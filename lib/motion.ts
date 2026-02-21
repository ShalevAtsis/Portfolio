import type { Variants, Transition } from "framer-motion";

// ─── Spring presets ───────────────────────────────────────────────────────────

/** Snappy spring – used for entrance animations and interactive elements. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

/** Gentler spring – used for larger / heavier elements. */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 22,
};

// ─── Reusable Framer Motion variants ─────────────────────────────────────────

/** FadeInUp: slides from y+20 at opacity 0 → y=0 at opacity 1. */
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Ready-to-spread transition object for the FadeInUp pattern.
 * Usage: `transition={{ ...fadeInUp, delay: 0.1 }}`
 */
export const fadeInUp: Transition = {
  ...springSnappy,
};

// ─── Stagger helpers ──────────────────────────────────────────────────────────

/**
 * Container variant that staggers children by `delay` seconds.
 * @param delay – seconds between each child (default 0.08)
 */
export function staggerContainer(delay = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };
}
