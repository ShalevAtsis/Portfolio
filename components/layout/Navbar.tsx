/**
 * Navbar — Pure Server Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout: [≡ burger]   Shalev Atsis   [NavActions]
 *
 * NavActions handles two modes:
 *   • Desktop (sm+): full inline social icon row + toggles
 *   • Mobile  (<sm): theme + mode toggles always visible,
 *                    social icons collapse into a ⋯ dropdown panel
 *
 * Layout strategy: Absolute centering for brand name
 *   The brand name is positioned absolutely at 50% to guarantee mathematical
 *   centering relative to the viewport, completely independent of the dynamic
 *   widths of left (burger) and right (NavActions) elements.
 */

import Link from "next/link";
import NavigationMenu from "@/components/shared/NavigationMenu";
import NavActions from "@/components/shared/NavActions";
import BrandName from "./BrandName";

export default function Navbar() {
  return (
    <header className="animate-nav-slide-down fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
      <nav
        className="relative mx-auto flex w-full max-w-5xl lg:max-w-6xl 2xl:max-w-screen-xl items-center justify-between px-4 py-2 sm:px-6 lg:px-12 lg:py-4 2xl:px-16"
        aria-label="Main navigation"
      >
        {/* ── Left: Burger ───────────────────────────────────────────── */}
        <div className="z-10">
          <NavigationMenu />
        </div>

        {/* ── Center: Brand (Absolutely Centered) ────────────────────── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandName />
        </div>

        {/* ── Right: NavActions (responsive icon row + mobile dropdown) ── */}
        <div className="z-10">
          <NavActions />
        </div>
      </nav>
    </header>
  );
}

