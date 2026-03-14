"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "./GallerySection";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

const AUTOPLAY_MS = 4000;

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: Props) {
  const img = images[index];

  // ── Keyboard ──────────────────────────────────────────────────────────────
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  // ── Autoplay — resets on every index change ───────────────────────────────
  useEffect(() => {
    const id = setTimeout(onNext, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, onNext]);

  return (
    // Backdrop — clicking bare backdrop closes the lightbox
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-slate-950/95 p-4 backdrop-blur-xl md:p-8"
      style={{ animation: "lb-fade 0.2s ease both" }}
      onClick={onClose}
    >
      {/* Card — stopPropagation so clicks inside don't close the lightbox.
          position:relative is required so absolute children (close, prev,
          next) are positioned relative to this card, not the backdrop.
          This guarantees the close button is never covered by the card itself. */}
      <div
        className="relative flex w-full max-w-7xl flex-col"
        style={{
          height: "90vh",
          animation: "lb-scale 0.3s cubic-bezier(0.22,1,0.36,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close — top-right of the card, always on top ─────────────────── */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[120] rounded-full bg-slate-800 p-2.5 text-slate-300 ring-1 ring-white/20 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ── Image area ───────────────────────────────────────────────────── */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-xl bg-slate-900">

          {/* key={index} remounts this div on every slide → restarts the
              animate-lb-crossfade CSS animation from scratch (crossfade). */}
          <div key={index} className="absolute inset-0 animate-lb-crossfade">
            <Image
              loader={cloudinaryLoader}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 80vw"
              quality={90}
              className="object-contain"
            />
          </div>

          {/* HUD corner accents */}
          <div className="pointer-events-none absolute left-3 top-3 z-10 h-6 w-6 rounded-tl-sm border-l-2 border-t-2 border-cyan-500/80" />
          <div className="pointer-events-none absolute right-3 top-3 z-10 h-6 w-6 rounded-tr-sm border-r-2 border-t-2 border-cyan-500/80" />
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-6 w-6 rounded-bl-sm border-b-2 border-l-2 border-cyan-500/80" />
          <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-6 w-6 rounded-br-sm border-b-2 border-r-2 border-cyan-500/80" />

          {/* Autoplay progress bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-slate-800">
            <div
              key={index}
              className="h-full bg-cyan-500/70"
              style={{ animation: `lb-progress ${AUTOPLAY_MS}ms linear both` }}
            />
          </div>

          {/* Prev — vertically centred on the image area */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-800/80 p-4 text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 sm:p-2.5"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-800/80 p-4 text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 sm:p-2.5"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ── Caption ──────────────────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between gap-4 rounded-b-xl border-t border-white/10 bg-slate-900/80 px-5 py-3 backdrop-blur-md">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
              {img.caption}
            </p>
            <p className="mt-0.5 truncate text-xs text-slate-400">{img.sub}</p>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-slate-500">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Dot strip ────────────────────────────────────────────────────── */}
        <div className="mt-3 flex shrink-0 items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => onGoTo(i)}
              className={[
                "rounded-full transition-all duration-300",
                i === index
                  ? "h-1.5 w-5 bg-cyan-400"
                  : "h-1.5 w-1.5 bg-slate-600 hover:bg-slate-400",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
