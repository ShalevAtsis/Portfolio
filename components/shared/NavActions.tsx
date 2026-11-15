"use client";

/**
 * NavActions
 *   sm+ : social icons inline, then theme + view-mode toggles
 *   <sm : toggles always visible; socials collapse into a "more" popover
 *
 * E-mail and WhatsApp hrefs are filled in after hydration (see lib/contact.ts).
 */

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, MoreHorizontal, X } from "lucide-react";
import ThemeToggle, { NAV_ICON_BUTTON } from "@/components/shared/ThemeToggle";
import DualModeToggle from "@/components/shared/DualModeToggle";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { useContact } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { FOCUS_RING } from "@/components/ui/Button";

function useSocials() {
  const contact = useContact();
  return [
    { label: "GitHub", href: GITHUB_URL as string | undefined, icon: Github, external: true },
    { label: "LinkedIn", href: LINKEDIN_URL as string | undefined, icon: Linkedin, external: true },
    { label: "Email", href: contact.mailto, icon: Mail, external: false },
    { label: "WhatsApp", href: contact.whatsapp, icon: MessageCircle, external: true },
  ];
}

function InlineIcons() {
  const socials = useSocials();
  return (
    <div className="hidden items-center sm:flex">
      {socials.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className={NAV_ICON_BUTTON}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
        </a>
      ))}
      <span className="mx-1.5 h-4 w-px shrink-0 bg-hairline" aria-hidden />
      <ThemeToggle />
      <DualModeToggle />
    </div>
  );
}

function MobileActions() {
  const socials = useSocials();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative flex items-center sm:hidden">
      <ThemeToggle />
      <DualModeToggle />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="social-links-panel"
        aria-label={open ? "Close social links" : "Open social links"}
        className={cn(NAV_ICON_BUTTON, "ml-1", open && "bg-ink/[0.08] text-ink")}
      >
        {open ? <X className="h-4 w-4" strokeWidth={2} /> : <MoreHorizontal className="h-[17px] w-[17px]" strokeWidth={1.75} />}
      </button>

      <div
        ref={panelRef}
        id="social-links-panel"
        aria-label="Social links"
        className={cn(
          "glass absolute right-0 top-[calc(100%+10px)] z-50 w-52 origin-top-right rounded-card-sm p-2 shadow-lift transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none",
          // `invisible` keeps the closed panel out of the tab order and the a11y tree.
          open ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"
        )}
      >
        <div className="grid grid-cols-2 gap-1">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 text-ink-2 transition-colors hover:bg-ink/[0.08] hover:text-ink",
                FOCUS_RING
              )}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <span className="text-[11px] font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavActions() {
  return (
    <>
      <InlineIcons />
      <MobileActions />
    </>
  );
}
