import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary. Rules for every animation on the site:
 *  - animate `transform` and `opacity` only (no layout-affecting properties)
 *  - scroll-linked values are MotionValues, never React state
 *  - every component checks useReducedMotionSafe() and renders its final state
 */

/** Apple-like ease-out: quick start, long soft landing. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const springSnappy: Transition = { type: "spring", stiffness: 100, damping: 20 };
export const springGentle: Transition = { type: "spring", stiffness: 80, damping: 22 };

/** Spring used to smooth scroll-linked values. */
export const SCROLL_SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 } as const;

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Parent variant that staggers its children by `delay` seconds. */
export function staggerContainer(delay = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: delay, delayChildren } },
  };
}

/** Child variant for staggered chips / list items. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Default viewport config for one-shot reveals. */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px" } as const;
