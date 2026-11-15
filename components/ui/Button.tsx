import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "link";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
}

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-[transform,opacity,background-color] duration-200 active:scale-[0.97] motion-reduce:transition-none";

export const BUTTON_VARIANTS: Record<Variant, string> = {
  primary: cn(BASE, "min-h-11 bg-accent-fill px-6 py-2.5 text-white hover:opacity-90"),
  secondary: cn(BASE, "min-h-11 border border-hairline bg-ink/[0.06] px-6 py-2.5 text-ink backdrop-blur-md hover:bg-ink/[0.12]"),
  link: "group inline-flex items-center gap-0.5 text-[15px] font-medium text-accent hover:underline underline-offset-4",
};

/** Pill button rendered as a link. `link` is the Apple-style "Learn more ›" text link. */
export default function ButtonLink({ variant = "primary", external, className, children, ...rest }: ButtonLinkProps) {
  return (
    <a
      className={cn(BUTTON_VARIANTS[variant], FOCUS_RING, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {variant === "link" && (
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
      )}
    </a>
  );
}
