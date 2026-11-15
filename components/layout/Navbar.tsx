"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import NavigationMenu from "@/components/shared/NavigationMenu";
import NavActions from "@/components/shared/NavActions";
import MiniPlayer from "@/components/shared/MiniPlayer";
import BrandName from "./BrandName";
import { NAV_LINKS } from "@/lib/nav";
import { useView } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { FOCUS_RING } from "@/components/ui/Button";

/**
 * Glass navbar (Apple style): fixed, 52px, translucent with blur + saturation.
 * The hairline under it fades in once the page has scrolled 8px.
 *
 *   < lg : [burger] [brand] ............ [actions]
 *   lg+  : [brand] ... [section links] ... [actions]
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { isResumeMode } = useView();

  // Fires per scroll frame, but React only re-renders when the boolean flips.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 h-[52px]">
      <div aria-hidden className="absolute inset-0 bg-canvas/70 backdrop-blur-xl backdrop-saturate-150" />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-hairline transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-full w-full max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6"
      >
        <div className="flex items-center gap-1.5">
          <div className="lg:hidden">
            <NavigationMenu />
          </div>
          <BrandName />
        </div>

        {!isResumeMode && (
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    "rounded-md text-[13px] text-ink-2 transition-colors duration-200 hover:text-ink",
                    FOCUS_RING
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-1">
          <MiniPlayer />
          <NavActions />
        </div>
      </nav>
    </header>
  );
}
