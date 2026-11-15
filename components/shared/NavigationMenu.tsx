"use client";

/**
 * NavigationMenu: full-screen sheet for small screens.
 *
 * Rendered through a portal so it sits above every stacking context (WebGL
 * canvases included). Accessibility:
 *  - role="dialog" + aria-modal, real focus trap, Escape closes
 *  - focus moves to the first link on open and back to the burger on close
 *  - links reveal with a CSS stagger that is disabled under reduced motion
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useFocusTrap, useMounted } from "@/lib/hooks";
import { NAV_LINKS } from "@/lib/nav";
import { setScrollLocked } from "@/lib/scroll";
import { NAV_ICON_BUTTON } from "@/components/shared/ThemeToggle";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const STYLE = `
@keyframes sheetLinkIn {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sheet-link { animation: sheetLinkIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
@media (prefers-reduced-motion: reduce) { .sheet-link { animation: none; } }
`;

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useFocusTrap(sheetRef, isOpen, close);

  // Scroll lock: body overflow for native scrolling, Lenis stop for smooth scrolling.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    setScrollLocked(isOpen);
    return () => {
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  const sheet = (
    <div
      ref={sheetRef}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-[99999] flex h-[100dvh] flex-col bg-canvas transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
        isOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div aria-hidden className="page-backdrop pointer-events-none absolute inset-0" />

      <div className="relative flex h-[52px] shrink-0 items-center px-4 sm:px-6">
        <button type="button" aria-label="Close menu" onClick={close} className={NAV_ICON_BUTTON}>
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      <nav aria-label="Site sections" className="relative flex flex-1 flex-col justify-center overflow-y-auto px-8 pb-16 sm:px-12">
        <ul role="list" className="flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, idx }, i) => (
            <li key={href}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={close}
                className={cn(
                  "group flex items-baseline gap-4 rounded-xl py-2",
                  // Re-keyed on open so the stagger replays every time.
                  isOpen && "sheet-link",
                  FOCUS_RING
                )}
                style={{ animationDelay: `${60 + i * 55}ms` }}
              >
                <span className="w-6 text-xs font-medium tabular-nums text-ink-2">{idx}</span>
                <span className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-ink transition-colors group-hover:text-accent sm:text-5xl">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="relative pb-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
        Shalev Atsis · Software Engineer
      </p>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="nav-overlay"
        onClick={(e) => {
          // WebKit does not focus buttons on click; focus explicitly so the
          // sheet can hand focus back here when it closes.
          e.currentTarget.focus();
          setIsOpen(true);
        }}
        className={cn(NAV_ICON_BUTTON, "flex-col gap-[5px]")}
      >
        <span className="block h-[1.5px] w-[17px] rounded-full bg-current" />
        <span className="block h-[1.5px] w-[17px] rounded-full bg-current" />
      </button>
      {mounted ? createPortal(sheet, document.body) : null}
    </>
  );
}
