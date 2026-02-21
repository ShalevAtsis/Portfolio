"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ViewMode = "portfolio" | "resume";

export interface ViewContextValue {
  /** True when the user has toggled into Resume (document) mode. */
  isResumeMode: boolean;
  /** Convenience alias: "portfolio" | "resume". */
  viewMode: ViewMode;
  /** Programmatically set resume mode on/off. */
  setResumeMode: (value: boolean) => void;
  /** Flip between the two modes. */
  toggleMode: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ViewContext = createContext<ViewContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [isResumeMode, setIsResumeMode] = useState<boolean>(false);

  const setResumeMode = useCallback((value: boolean) => {
    setIsResumeMode(value);
  }, []);

  const toggleMode = useCallback(() => {
    setIsResumeMode((prev) => !prev);
  }, []);

  const viewMode: ViewMode = isResumeMode ? "resume" : "portfolio";

  /**
   * Reflect the active mode on <html> as a data-attribute so CSS / Tailwind
   * dark/light overrides and 3rd-party libs can respond without prop drilling.
   *
   * data-view="portfolio"  →  dark-cyber design system
   * data-view="resume"     →  light-paper design system
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-view", viewMode);
  }, [viewMode]);

  const value: ViewContextValue = {
    isResumeMode,
    viewMode,
    setResumeMode,
    toggleMode,
  };

  return (
    <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useView(): ViewContextValue {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useView must be used inside a <ViewProvider>.");
  }
  return ctx;
}
