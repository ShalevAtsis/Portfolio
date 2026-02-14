"use client";

import { motion } from "framer-motion";
import { springSnappy, fadeInUpVariants } from "@/lib/motion";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  margin?: string;
  as?: keyof typeof motion;
}

export default function FadeInUp({
  children,
  className,
  delay = 0,
  once = true,
  margin = "-60px",
  as = "div",
}: FadeInUpProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={fadeInUpVariants}
      transition={{ ...springSnappy, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
