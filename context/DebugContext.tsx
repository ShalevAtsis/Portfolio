"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

interface DebugContextValue {
  isSystemBroken: boolean;
  isTerminalOpen: boolean;
  isFixed: boolean;
  toastMessage: string | null;
  triggerChaos: () => void;
  fixSystem: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
}

const DebugContext = createContext<DebugContextValue | null>(null);

const TOAST_DURATION_MS = 4000;

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [isSystemBroken, setIsSystemBroken] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(null);
  }, []);

  const triggerChaos = useCallback(() => {
    setIsSystemBroken(true);
    setIsTerminalOpen(true);
    setIsFixed(false);
  }, []);

  const fixSystem = useCallback(() => {
    setIsFixed(true);
    setIsTerminalOpen(false);
    setIsSystemBroken(false);
    showToast("System Restored. Good job, Engineer.");
  }, [showToast]);

  const openTerminal = useCallback(() => {
    setIsTerminalOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    setIsTerminalOpen(false);
  }, []);

  const value: DebugContextValue = {
    isSystemBroken,
    isTerminalOpen,
    isFixed,
    toastMessage,
    triggerChaos,
    fixSystem,
    openTerminal,
    closeTerminal,
    showToast,
    dismissToast,
  };

  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
}

export function useDebug() {
  const ctx = useContext(DebugContext);
  if (!ctx) {
    throw new Error("useDebug must be used within a DebugProvider");
  }
  return ctx;
}
