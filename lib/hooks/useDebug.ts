"use client";

import { useContext } from "react";
import { DebugContext } from "@/context/DebugContext";

export function useDebug() {
  const ctx = useContext(DebugContext);
  if (!ctx) {
    throw new Error("useDebug must be used within a DebugProvider");
  }
  return ctx;
}
