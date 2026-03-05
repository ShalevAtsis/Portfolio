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
 * Layout strategy: grid-cols-[auto_1fr_auto]
 *   Left / right columns take their natural width (auto).
 *   Center column gets all leftover space (1fr) with min-w-0 to prevent bleed.
 */

import Link from "next/link";
import NavigationMenu from "@/components/NavigationMenu";
import NavActions from "@/components/NavActions";

export default function Navbar() {
  return (
    <header className="animate-nav-slide-down fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
      <nav
        className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 py-2 sm:px-6 lg:px-10"
        aria-label="Main navigation"
      >
        {/* ── Left: Burger ───────────────────────────────────────────── */}
        <div>
          <NavigationMenu />
        </div>

        {/* ── Center: Brand ──────────────────────────────────────────── */}
        {/* min-w-0 keeps the 1fr cell from bleeding into adjacent columns */}
        <div className="min-w-0 flex justify-center px-2">
          <Link
            href="/"
            className="block truncate text-sm font-extrabold tracking-tight text-slate-900
                       transition-colors duration-150 hover:text-indigo-600
                       dark:text-slate-50 dark:hover:text-indigo-400
                       sm:text-base md:text-lg"
          >
            Shalev Atsis
          </Link>
        </div>

        {/* ── Right: NavActions (responsive icon row + mobile dropdown) ── */}
        <NavActions />
      </nav>
    </header>
  );
}

