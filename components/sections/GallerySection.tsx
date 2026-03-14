"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  sub: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const IMAGES: GalleryImage[] = [
  {
    src: "IMG_9845_1_rt7mur.jpg",
    alt: "Military vehicles undergoing sensor integration",
    caption: "Tactical Vehicle Integration",
    sub: "Sensor installation · Multi-platform networking",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_1334_dpg2t6.jpg",
    alt: "Thai Navy personnel operating installed base systems",
    caption: "Base System Deployment",
    sub: "Operator training · Royal Thai Navy",
    width: 3840,
    height: 2160,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_1341_1_re7iq2.jpg",
    alt: "Commemorative exchange with Thai Navy officer",
    caption: "Joint Cooperation",
    sub: "Project completion · Officer recognition",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_8390_1_witvvh.jpg",
    alt: "Field engineering team with Thai Navy personnel",
    caption: "Field Deployment Team",
    sub: "On-site integration · Royal Thai Navy",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_6674_aepizs.jpg",
    alt: "Dual autonomous drone takeoff during field test",
    caption: "Autonomous UAV Field Test",
    sub: "Dual drone launch · Flight verification",
    width: 3520,
    height: 1986,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_7975_3_sxvi88.jpg",
    alt: "Command and control center operational setup",
    caption: "Command & Control (C2) Center",
    sub: "System deployment · Live operational environment",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_8392_b509ka.jpg",
    alt: "Official system handover to Thai Ministry of Defense",
    caption: "Official System Handover",
    sub: "Project delivery · Thai Ministry of Defense",
    width: 4000,
    height: 3000,
    blurDataURL: PLACEHOLDER,
  }
];

const AUTOPLAY_MS = 6000;

// ─── Section ──────────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0); // increments to force animation restart
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback((callback: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, AUTOPLAY_MS);
  }, []);

  const advance = useCallback((indexFn: (i: number) => number) => {
    setCurrent((i) => indexFn(i));
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(() => advance((i) => (i + 1) % IMAGES.length), [advance]);
  const prev = useCallback(() => advance((i) => (i - 1 + IMAGES.length) % IMAGES.length), [advance]);

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  const handlePrev = useCallback(() => { prev(); resetTimer(next); }, [prev, next, resetTimer]);
  const handleNext = useCallback(() => { next(); resetTimer(next); }, [next, resetTimer]);
  const handleDot  = useCallback((i: number) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
    resetTimer(next);
  }, [next, resetTimer]);

  const img = IMAGES[current];

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
      <FadeInUp className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Field Engineering
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          Autonomous systems, sensor integrations, and global deployments captured on-site.
        </p>
      </FadeInUp>

      {/* Outer card — full width, centers the dynamic image wrapper */}
      <div className="w-full overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10">

        {/* Progress bar — sits above the image wrapper, outside the stacking context */}
        <div className="relative h-[2px] bg-slate-800/60">
          <div
            key={current}
            className="h-full bg-cyan-500/70 gallery-progress"
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>

        {/* Dynamic image wrapper — shaped exactly to the current image's aspect ratio.
            Because the box IS the right shape, object-cover fills it with zero
            cropping AND zero letterboxing. max-h caps it on tall/portrait images. */}
        <div
          className="relative mx-auto w-full max-h-[80vh] overflow-hidden"
          style={{ aspectRatio: `${img.width} / ${img.height}` }}
        >
          {/* All slides stacked — only the active one animates */}
          {IMAGES.map((image, i) => (
            <div
              key={i === current ? `active-${animKey}` : image.src}
              className={[
                "absolute inset-0",
                i === current ? "gallery-slide-active" : "gallery-slide-idle",
              ].join(" ")}
              style={{ zIndex: i === current ? 2 : 1 }}
            >
              <Image
                loader={cloudinaryLoader}
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                quality={90}
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}

          {/* Bottom vignette */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10" />

          {/* HUD corner accents — hug the dynamic image bounds */}
          <div className="pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 border-l-2 border-t-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute right-3 top-3 z-20 h-6 w-6 border-r-2 border-t-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute bottom-3 left-3 z-20 h-6 w-6 border-b-2 border-l-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute bottom-3 right-3 z-20 h-6 w-6 border-b-2 border-r-2 border-cyan-400/60" />

          {/* Prev button */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-3 md:left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-800/80 p-2 sm:p-2.5 md:p-3 text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-3 md:right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-800/80 p-2 sm:p-2.5 md:p-3 text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Caption bar — outside the image wrapper, always full card width */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 border-t border-white/10 bg-slate-900/80 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 backdrop-blur-md">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.15em] text-cyan-400">
              {img.caption}
            </p>
            <p className="mt-0.5 text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-slate-300">{img.sub}</p>
          </div>

          {/* Dot indicators */}
          <div className="hidden md:flex shrink-0 items-center gap-1.5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => handleDot(i)}
                className={[
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "h-1.5 w-5 bg-cyan-400"
                    : "h-1.5 w-1.5 bg-slate-600 hover:bg-slate-400",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
