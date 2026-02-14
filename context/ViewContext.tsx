"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ViewMode = "portfolio" | "resume";

interface ViewContextValue {
  isResumeMode: boolean;
  viewMode: ViewMode;
  setResumeMode: (value: boolean) => void;
  toggleMode: () => void;
}

const ViewContext = createContext<ViewContextValue | null>(null);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [isResumeMode, setIsResumeMode] = useState(false);

  const setResumeMode = useCallback((value: boolean) => {
    setIsResumeMode(value);
  }, []);

  const toggleMode = useCallback(() => {
    setIsResumeMode((prev) => !prev);
  }, []);

  const viewMode: ViewMode = isResumeMode ? "resume" : "portfolio";

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

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return ctx;
}
