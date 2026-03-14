"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import FadeInUp from "@/components/ui/FadeInUp";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });

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

// Cinematic grid — 2-column symmetrical layout.
// Ordered by visual weight: strongest images anchor rows 1 and 2.
// 7 images = 3 full pairs + 1 orphan that spans both columns as a panoramic closer.
const IMAGES: GalleryImage[] = [
  {
    src: "IMG_9845_1_rt7mur",
    alt: "Autonomous drone pre-flight systems check",
    caption: "Autonomous Drone Integration",
    sub: "Pre-flight systems check · Global deployment",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_1334_dpg2t6",
    alt: "Ground control station setup",
    caption: "Ground Control Station",
    sub: "C2 link verification · Remote operations",
    width: 3840,
    height: 2160,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_1341_1_re7iq2",
    alt: "Military vehicle sensor installation",
    caption: "Vehicle Sensor Installation",
    sub: "Multi-sensor array · Field integration",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_8390_1_witvvh",
    alt: "Drone swarm coordination test",
    caption: "Swarm Coordination Test",
    sub: "Multi-UAV formation · Live exercise",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_6674_aepizs",
    alt: "Sensor mast installation on armoured vehicle",
    caption: "Sensor Mast Installation",
    sub: "Armoured platform · Systems integration",
    width: 3520,
    height: 1986,
    blurDataURL: PLACEHOLDER,
  },
  {
    src: "IMG_7975_3_sxvi88",
    alt: "Night-vision optics field calibration",
    caption: "Night-Vision Optics Calibration",
    sub: "Low-light validation · Forward operating base",
    width: 4032,
    height: 2268,
    blurDataURL: PLACEHOLDER,
  },
  {
    // Panoramic closer — spans full width, 21:9 crop hides the 4:3 ratio entirely
    src: "IMG_8392_b509ka",
    alt: "Radar and EO/IR payload alignment",
    caption: "EO/IR Payload Alignment",
    sub: "Precision calibration · Operational site",
    width: 4000,
    height: 3000,
    blurDataURL: PLACEHOLDER,
  },
];

// ─── Grid Item ────────────────────────────────────────────────────────────────

function GalleryItem({
  img,
  index,
  total,
  onClick,
}: {
  img: GalleryImage;
  index: number;
  total: number;
  onClick: (i: number) => void;
}) {
  const isLast = index === total - 1;
  const isOddTotal = total % 2 !== 0;
  const isPanoramic = isLast && isOddTotal;

  return (
    <button
      onClick={() => onClick(index)}
      aria-label={`View: ${img.caption}`}
      className={[
        "group relative overflow-hidden rounded-2xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        isPanoramic ? "md:col-span-2" : "col-span-1",
      ].join(" ")}
    >
      {/* Aspect ratio: 16:9 for paired cells, 21:9 for the panoramic closer.
          The 4:3 outlier (IMG_8392) is placed last — the 21:9 crop removes
          its excess height symmetrically, making it look intentionally cinematic.
          The lightbox always shows the full uncropped original. */}
      <div className={isPanoramic ? "aspect-[21/9] w-full" : "aspect-video w-full"}>
        <div className="relative h-full w-full">

          <Image
            loader={cloudinaryLoader}
            src={img.src}
            alt={img.alt}
            fill
            sizes={
              isPanoramic
                ? "100vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            quality={85}
            loading="lazy"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
            className="object-cover brightness-[0.5] transition-all duration-700 ease-out group-hover:brightness-[0.85] group-hover:scale-[1.04]"
          />

          {/* Corner scan-line accents */}
          <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-cyan-400/60 transition-all duration-500 group-hover:border-cyan-400 group-hover:h-7 group-hover:w-7" />
          <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-cyan-400/60 transition-all duration-500 group-hover:border-cyan-400 group-hover:h-7 group-hover:w-7" />

          {/* Index badge */}
          <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center">
            <span className="font-mono text-[9px] font-bold text-cyan-400/80 transition-colors duration-300 group-hover:text-cyan-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Bottom vignette */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Glassmorphism caption */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <div className="border-t border-white/10 bg-slate-900/75 px-4 py-3 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                {img.caption}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">{img.sub}</p>
            </div>
          </div>

        </div>
      </div>
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open  = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : i), []);
  const next  = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % IMAGES.length : i), []);
  const goTo  = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
      <FadeInUp className="mb-10">
        {/* Eyebrow with scan-line decoration */}
        <div className="mb-3 flex items-center gap-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Field Engineering
          </p>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          In the Field
        </h2>
        <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          Autonomous systems, sensor integrations, and global deployments captured on-site.
        </p>
      </FadeInUp>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        {IMAGES.map((img, i) => (
          <GalleryItem key={img.src} img={img} index={i} total={IMAGES.length} onClick={open} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={IMAGES}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
        />
      )}
    </section>
  );
}
