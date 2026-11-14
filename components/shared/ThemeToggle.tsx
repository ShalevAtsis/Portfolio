"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useMounted } from "@/lib/hooks";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const NAV_ICON_BUTTON = cn(
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-2 transition-[color,background-color,transform] duration-200 hover:bg-ink/[0.08] hover:text-ink active:scale-90 motion-reduce:transition-none",
  FOCUS_RING
);

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  // Stable placeholder: same box, so nothing shifts when the theme is known.
  if (!mounted) return <span className="inline-flex h-9 w-9 shrink-0" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={NAV_ICON_BUTTON}
    >
      {isDark ? <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} /> : <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />}
    </button>
  );
}
