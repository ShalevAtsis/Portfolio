"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(480px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.12), transparent 60%)`;

  const cardClassName = `group relative overflow-hidden rounded-2xl border border-cyber-border/50 bg-cyber-surface/60 backdrop-blur-xl transition-all duration-300 hover:border-cyber-accent/40 hover:shadow-glow ${className}`;

  if (as === "a" && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cardClassName}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.span
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
          aria-hidden
        />
        <span className="relative">{children}</span>
      </motion.a>
    );
  }

  const Component = as === "article" ? motion.article : motion.div;

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cardClassName}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
        aria-hidden
      />
      <span className="relative">{children}</span>
    </Component>
  );
}
