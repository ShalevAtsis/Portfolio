import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import Headline from "@/components/ui/Headline";

/** Centered content column (~1100px) with responsive gutters. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-content px-6 sm:px-8", className)}>{children}</div>;
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed: children manage their own width (showpiece sections). */
  bleed?: boolean;
}

/** Page section with generous vertical rhythm. */
export function Section({ id, children, className, bleed = false }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-14 py-28 md:py-44", className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/** Small caps label above a headline. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-accent", className)}>{children}</p>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow + headline + optional lede, revealed on scroll. */
export function SectionHeader({ eyebrow, title, lede, align = "left", className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-14 md:mb-20", align === "center" && "text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Headline className="mt-4">{title}</Headline>
      {lede && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl",
            align === "center" && "mx-auto"
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
