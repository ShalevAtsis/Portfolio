/**
 * Shared motion config: snappy yet smooth spring physics.
 */
export const springSnappy = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const springGentle = {
  type: "spring" as const,
  stiffness: 80,
  damping: 22,
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
