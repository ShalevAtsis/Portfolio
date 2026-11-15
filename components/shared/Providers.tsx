"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ViewProvider } from "@/context/ViewContext";
import SmoothScroll from "@/components/shared/SmoothScroll";

/** Marks the document once React has hydrated (used by the Playwright suite). */
function HydrationFlag() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return null;
}

/**
 * App-wide providers:
 *  - next-themes: dark by default, light via the toggle (class on <html>)
 *  - MotionConfig: Framer Motion honours prefers-reduced-motion globally
 *  - ViewProvider: portfolio / resume mode
 *  - SmoothScroll: Lenis + anchor navigation
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <ViewProvider>
          <SmoothScroll />
          {children}
          <HydrationFlag />
        </ViewProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
