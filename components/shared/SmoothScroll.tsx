"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { goToHash, registerLenis } from "@/lib/scroll";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Smooth scrolling (Lenis) + in-page anchor handling.
 *
 * - Lenis only smooths wheel / touch input; keyboard scrolling (Space, PgDn,
 *   arrows, Home/End) stays native, so nothing is taken away from keyboard users.
 * - Disabled entirely under prefers-reduced-motion: the page scrolls natively.
 * - Anchor clicks are handled here in both modes so the hash, scroll position
 *   and focus always stay in sync.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, autoRaf: true });
    registerLenis(lenis);
    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href") ?? "";
      if (hash.length < 2) return;
      if (goToHash(hash)) e.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
