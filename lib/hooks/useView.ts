"use client";

import { useContext } from "react";
import { ViewContext } from "@/context/ViewContext";

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) {
    throw new Error("useView must be used inside a <ViewProvider>.");
  }
  return ctx;
}
