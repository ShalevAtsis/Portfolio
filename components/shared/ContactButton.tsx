import type { ReactNode } from "react";
import { CARD_SURFACE } from "@/components/ui/BentoCard";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface ContactButtonProps {
  href?: string;
  icon: ReactNode;
  label: string;
  description?: string;
  external?: boolean;
  download?: string;
  className?: string;
}

/** Contact channel tile: icon, label, one-line description. */
export default function ContactButton({ href, icon, label, description, external = false, download, className }: ContactButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      download={download}
      className={cn(
        CARD_SURFACE,
        "group flex items-center gap-4 rounded-card-sm px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transition-none",
        FOCUS_RING,
        className
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-ink">{label}</span>
        {description && <span className="mt-0.5 block truncate text-[13px] text-ink-2">{description}</span>}
      </span>
    </a>
  );
}
