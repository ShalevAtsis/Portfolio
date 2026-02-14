"use client";

import FadeInUp from "./FadeInUp";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Center-align title and subtitle */
  centerHeading?: boolean;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
  centerHeading = true,
}: SectionWrapperProps) {
  return (
    <section id={id} className={className}>
      {(title || subtitle) && (
        <FadeInUp
          as="div"
          className={
            centerHeading
              ? "mb-10 text-center sm:mb-12"
              : "mb-10 sm:mb-12"
          }
        >
          {title && (
            <h2 className="text-2xl font-bold text-cyber-text sm:text-3xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-cyber-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </FadeInUp>
      )}
      {children}
    </section>
  );
}
