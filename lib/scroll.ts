import type Lenis from "lenis";

/** Height of the fixed navbar; anchor targets stop just below it. */
export const NAV_OFFSET = 56;

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Pause / resume smooth scrolling (used while a modal owns the screen). */
export function setScrollLocked(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll to a Y position or element, through Lenis when it is running. */
export function scrollToTarget(target: number | HTMLElement, opts: { immediate?: boolean } = {}) {
  const immediate = opts.immediate ?? prefersReducedMotion();
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -NAV_OFFSET, immediate });
    return;
  }
  const top =
    typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Navigate to an in-page anchor: updates the URL hash, scrolls, and moves
 * keyboard focus to the section so screen-reader and Tab order follow.
 */
export function goToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = id ? document.getElementById(id) : null;
  if (!el) return false;
  if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
  scrollToTarget(el);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}
