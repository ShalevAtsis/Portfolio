"use client";

import { useEffect } from "react";

/**
 * Always start a fresh visit at the top: restoring a deep scroll position on
 * reload would land mid-way through a pinned, scroll-linked section.
 */
export default function ScrollToTop() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return null;
}
