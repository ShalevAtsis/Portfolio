import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Hallucinate from "@/components/shared/Hallucinate";

interface HeadlineProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "headline" | "title";
  className?: string;
}

const SIZES = {
  display: "text-display font-bold tracking-[-0.04em] leading-[0.98]",
  headline: "text-headline font-semibold tracking-[-0.03em] leading-[1.05]",
  title: "text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight",
} as const;

/**
 * Large confident heading. Plain-string children take part in the
 * "model hallucination" easter egg (see Hallucinate).
 */
export default function Headline({ children, as: Tag = "h2", size = "headline", className }: HeadlineProps) {
  return (
    <Tag className={cn(SIZES[size], "text-balance text-ink", className)}>
      {typeof children === "string" ? <Hallucinate text={children} className="text-gradient pb-[0.08em]" /> : children}
    </Tag>
  );
}
