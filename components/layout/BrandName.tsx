"use client";

import Link from "next/link";
import { scrollToTarget } from "@/lib/scroll";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Brand link: scrolls back to the top when already on the home page. */
export default function BrandName() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    scrollToTarget(0);
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={cn(
        "whitespace-nowrap rounded-md px-1 text-[15px] font-semibold tracking-tight text-ink transition-opacity hover:opacity-70",
        FOCUS_RING
      )}
    >
      Shalev Atsis
    </Link>
  );
}
