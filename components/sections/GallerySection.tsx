"use client";

import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import cloudinaryLoader from "@/lib/cloudinaryLoader";
import { cn } from "@/lib/cn";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  sub: string;
  width: number;
  height: number;
}

const IMAGES: GalleryImage[] = [
  { src: "IMG_9845_1_rt7mur.jpg", alt: "Military vehicles undergoing sensor integration", caption: "Tactical Vehicle Integration", sub: "Sensor installation · Multi-platform networking", width: 4032, height: 2268 },
  { src: "IMG_1334_dpg2t6.jpg", alt: "Thai Navy personnel operating installed base systems", caption: "Base System Deployment", sub: "Operator training · Royal Thai Navy", width: 3840, height: 2160 },
  { src: "IMG_1341_1_re7iq2.jpg", alt: "Commemorative exchange with Thai Navy officer", caption: "Joint Cooperation", sub: "Project completion · Officer recognition", width: 4032, height: 2268 },
  { src: "IMG_8390_1_witvvh.jpg", alt: "Field engineering team with Thai Navy personnel", caption: "Field Deployment Team", sub: "On-site integration · Royal Thai Navy", width: 4032, height: 2268 },
  { src: "IMG_6674_aepizs.jpg", alt: "Dual autonomous drone takeoff during field test", caption: "Autonomous UAV Field Test", sub: "Dual drone launch · Flight verification", width: 3520, height: 1986 },
  { src: "IMG_7975_3_sxvi88.jpg", alt: "Command and control center operational setup", caption: "Command & Control (C2) Center", sub: "System deployment · Live operational environment", width: 4032, height: 2268 },
  { src: "IMG_8392_b509ka.jpg", alt: "Official system handover to Thai Ministry of Defense", caption: "Official System Handover", sub: "Project delivery · Thai Ministry of Defense", width: 4000, height: 3000 },
];

const [LEAD, ...REST] = IMAGES;
const LEFT = REST.filter((_, i) => i % 2 === 0);
const RIGHT = REST.filter((_, i) => i % 2 === 1);

function Figure({ image, sizes, className }: { image: GalleryImage; sizes: string; className?: string }) {
  return (
    <figure className={className}>
      {/* Slight scale on enter; the reserved aspect-ratio box prevents layout shift. */}
      <Reveal scale={0.95} y={36}>
        <div
          className="relative overflow-hidden rounded-card border border-hairline bg-elevated shadow-soft"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          <Image loader={cloudinaryLoader} src={image.src} alt={image.alt} fill sizes={sizes} quality={80} className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.15} y={12}>
        <figcaption className="mt-4 px-1">
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{image.caption}</p>
          <p className="mt-0.5 text-sm text-ink-2">{image.sub}</p>
        </figcaption>
      </Reveal>
    </figure>
  );
}

/**
 * Field gallery: two columns of images drifting at different speeds (parallax
 * layers), each scaling in softly with its caption fading in after it.
 */
export default function GallerySection() {
  const columnSizes = "(max-width: 768px) 100vw, 540px";

  return (
    <Section id="gallery">
      <SectionHeader
        eyebrow="Field Engineering"
        title="Gallery"
        lede="Autonomous systems, sensor integrations, and global deployments captured on-site."
      />

      <Figure image={LEAD} sizes="(max-width: 1100px) 100vw, 1100px" />

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-16 md:grid-cols-2">
        {[LEFT, RIGHT].map((column, col) => (
          <Parallax key={col} offset={col === 0 ? 24 : 72} className={cn("flex flex-col gap-10 md:gap-16", col === 1 && "md:mt-32")}>
            {column.map((image) => (
              <Figure key={image.src} image={image} sizes={columnSizes} />
            ))}
          </Parallax>
        ))}
      </div>
    </Section>
  );
}
