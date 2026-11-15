"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Anchor, ArrowRight, BookOpen, CheckCircle2, Film, Loader2, Music2, Pause, Play, Send, Sparkles, Waves, Wind } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { CARD_SURFACE } from "@/components/ui/BentoCard";
import { FOCUS_RING } from "@/components/ui/Button";
import GlobeLoader, { type GlobeVizHandle } from "@/components/ui/GlobeLoader";
import OceanBackdrop from "@/components/ui/OceanBackdrop";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import cloudinaryLoader from "@/lib/cloudinaryLoader";
import { formatTime, seek, togglePlay, TRACK, usePlayer } from "@/lib/player";
import { useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────

type SpotKind = "surf" | "dive";

interface Spot {
  label: string;
  kind: SpotKind;
  country: string;
  /** Sea or ocean the spot sits on. */
  water: string;
  lat: number;
  lng: number;
  /** Optional personal line and Cloudinary photo id; shown in the detail panel when set. */
  note?: string;
  image?: string;
}

const SURF_SPOTS: Spot[] = [
  { label: "Brazil", kind: "surf", country: "Brazil", water: "Atlantic Ocean", lat: -14.235, lng: -51.925 },
  { label: "Colombia", kind: "surf", country: "Colombia", water: "Caribbean Sea", lat: 11.249, lng: -73.561 },
  { label: "Ecuador", kind: "surf", country: "Ecuador", water: "Pacific Ocean", lat: -1.826, lng: -80.751 },
  { label: "Panama", kind: "surf", country: "Panama", water: "Pacific Ocean", lat: 7.433, lng: -80.183 },
  { label: "Nicaragua", kind: "surf", country: "Nicaragua", water: "Pacific Ocean", lat: 11.254, lng: -85.871 },
  { label: "Mexico", kind: "surf", country: "Mexico", water: "Pacific Ocean", lat: 15.864, lng: -97.071 },
];

const DIVE_SPOTS: Spot[] = [
  { label: "Eilat", kind: "dive", country: "Israel", water: "Red Sea", lat: 29.558, lng: 34.948 },
  { label: "Thailand", kind: "dive", country: "Thailand", water: "Gulf of Thailand", lat: 10.094, lng: 99.838 },
  { label: "San Andrés", kind: "dive", country: "Colombia", water: "Caribbean Sea", lat: 12.585, lng: -81.701 },
  { label: "Galapagos", kind: "dive", country: "Ecuador", water: "Pacific Ocean", lat: -0.38, lng: -90.3 },
  { label: "Bocas del Toro", kind: "dive", country: "Panama", water: "Caribbean Sea", lat: 9.333, lng: -82.25 },
  { label: "Belize", kind: "dive", country: "Belize", water: "Caribbean Sea", lat: 17.316, lng: -87.535 },
  { label: "Cozumel", kind: "dive", country: "Mexico", water: "Caribbean Sea", lat: 20.423, lng: -86.922 },
];

const ALL_SPOTS = [...SURF_SPOTS, ...DIVE_SPOTS];

// Derived from the spot list, so the numbers can never drift from the map.
const WORLD_STATS = [
  { value: new Set(ALL_SPOTS.map((s) => s.country)).size, label: "countries on the map" },
  { value: SURF_SPOTS.length, label: "surf coasts" },
  { value: DIVE_SPOTS.length, label: "dive sites" },
  { value: new Set(ALL_SPOTS.map((s) => s.water)).size, label: "seas and oceans" },
];

function formatCoords(lat: number, lng: number) {
  const part = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;
  return `${part(lat, "N", "S")}, ${part(lng, "E", "W")}`;
}

const BOOKS_READ = [
  "The Power of Habit", "Can't Hurt Me", "Badulina",
  "The Alchemist", "Rich Dad Poor Dad", "The Monk Who Sold His Ferrari",
];

const FILMS = [
  { title: "Shutter Island", year: 2010 },
  { title: "The Godfather", year: 1972 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Inception", year: 2010 },
  { title: "Fight Club", year: 1999 },
  { title: "Django Unchained", year: 2012 },
];

const TILE = cn(CARD_SURFACE, "h-full");

function CardLabel({ icon, label, className }: { icon: React.ReactNode; label: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent", className)}>
      {icon}
      {label}
    </div>
  );
}

// ─── Surf & dive globe ────────────────────────────────────────────────────────

function OceanCard() {
  const globeRef = useRef<GlobeVizHandle>(null);
  const [selected, setSelected] = useState<Spot | null>(null);
  const pill =
    "inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  const select = (spot: Spot) => {
    setSelected(spot);
    globeRef.current?.flyTo(spot.lat, spot.lng);
  };

  const pills = (spots: Spot[]) =>
    spots.map((spot) => {
      const active = selected?.label === spot.label;
      return (
        <button
          key={spot.label}
          type="button"
          aria-pressed={active}
          onClick={() => select(spot)}
          className={cn(
            pill,
            active
              ? "border-white bg-white text-[#06152e]"
              : spot.kind === "surf"
                ? "border-[#2997ff]/40 bg-[#2997ff]/15 text-white hover:bg-[#2997ff]/30"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
          )}
        >
          {spot.label}
        </button>
      );
    });

  return (
    // Always dark: the globe texture is a night-side Earth in both themes.
    <div className="grid overflow-hidden rounded-card border border-hairline bg-ocean-abyss shadow-soft lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="relative min-h-[440px] lg:min-h-[520px]">
        <div className="absolute inset-0">
          <GlobeLoader ref={globeRef} minHeight={440} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-abyss via-ocean-abyss/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <CardLabel icon={<Waves className="h-3.5 w-3.5" aria-hidden />} label="Global Adventures" className="text-[#2997ff]" />
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">Surf &amp; Dive Spots</h3>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Surf spots">
              <Wind className="mr-1 h-3.5 w-3.5 shrink-0 text-[#2997ff]" aria-hidden />
              {pills(SURF_SPOTS)}
            </div>
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Dive spots">
              <Anchor className="mr-1 h-3.5 w-3.5 shrink-0 text-white/80" aria-hidden />
              {pills(DIVE_SPOTS)}
            </div>
          </div>
        </div>
      </div>

      {/* Detail panel: what the selected pin is. */}
      <div
        aria-live="polite"
        data-spot-panel
        className="flex flex-col justify-center border-t border-white/10 bg-white/[0.04] p-6 lg:border-l lg:border-t-0 lg:p-8"
      >
        {selected ? (
          <div key={selected.label}>
            {selected.image && (
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image loader={cloudinaryLoader} src={selected.image} alt="" fill sizes="340px" className="object-cover" />
              </div>
            )}
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">
              {selected.kind === "surf" ? <Wind className="h-3.5 w-3.5" aria-hidden /> : <Anchor className="h-3.5 w-3.5" aria-hidden />}
              {selected.kind === "surf" ? "Surf trip" : "Dive site"}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-white">{selected.label}</p>
            {selected.note && <p className="mt-3 text-[15px] leading-relaxed text-white/80">{selected.note}</p>}
            <dl className="mt-5 space-y-3 text-sm">
              {selected.country !== selected.label && (
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-white/60">Country</dt>
                  <dd className="text-right font-medium text-white">{selected.country}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/60">Water</dt>
                <dd className="text-right font-medium text-white">{selected.water}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Coordinates</dt>
                <dd className="text-right font-mono text-[13px] text-white">{formatCoords(selected.lat, selected.lng)}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">Logbook</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">Pick a spot on the map.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">
              Every pin is water I have surfed or dived. Choose one and the globe flies there.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Cinema & library ─────────────────────────────────────────────────────────

function CinephileReaderCard() {
  const [tab, setTab] = useState<"cinema" | "books">("cinema");

  return (
    <div className={cn(TILE, "flex min-h-[440px] flex-col p-6")}>
      <div className="mb-5 inline-flex self-start rounded-full border border-hairline bg-ink/[0.06] p-1">
        {(["cinema", "books"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "inline-flex min-h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors",
              tab === t ? "bg-accent-fill text-white" : "text-ink-2 hover:text-ink",
              FOCUS_RING
            )}
          >
            {t === "cinema" ? <Film className="h-3.5 w-3.5" aria-hidden /> : <BookOpen className="h-3.5 w-3.5" aria-hidden />}
            {t === "cinema" ? "Cinema" : "Library"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "cinema" ? (
          <motion.div
            key="cinema"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-2">Director&apos;s Cut</p>
            <ol className="flex flex-col">
              {FILMS.map((film, i) => (
                <li key={film.title} className="flex items-center gap-3 border-b border-hairline py-2.5 last:border-0">
                  <span className="w-5 text-xs tabular-nums text-ink-2" aria-hidden>{i + 1}</span>
                  <span className="flex-1 text-[15px] font-medium text-ink">{film.title}</span>
                  <span className="text-xs tabular-nums text-ink-2">{film.year}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        ) : (
          <motion.div
            key="books"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="rounded-card-sm border border-hairline bg-accent/10 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Currently Reading</p>
              <p className="mt-1 text-[17px] font-semibold text-ink">The Lean Startup</p>
              <p className="text-sm text-ink-2">Eric Ries</p>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-2">Read</p>
              <ul className="flex flex-col gap-2">
                {BOOKS_READ.map((book) => (
                  <li key={book} className="flex items-center gap-2 text-[15px] text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Now playing (Apple-Music-like glass card) ────────────────────────────────

const BAR_COUNT = 28;

function NowPlayingCard() {
  const { isPlaying, currentTime, duration } = usePlayer();
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className={cn(TILE, "flex min-h-[440px] flex-col p-6")}>
      <CardLabel icon={<Music2 className="h-3.5 w-3.5" aria-hidden />} label="Now Playing" />

      <div className="relative mx-auto mt-5 aspect-square w-full max-w-[220px] overflow-hidden rounded-card-sm shadow-lift">
        <Image
          loader={cloudinaryLoader}
          src={TRACK.artwork}
          alt={`${TRACK.artist}: ${TRACK.album} album artwork`}
          fill
          sizes="220px"
          className={cn("object-cover transition-transform duration-700 motion-reduce:transition-none", isPlaying ? "scale-100" : "scale-[0.94]")}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[17px] font-semibold tracking-[-0.01em] text-ink">{TRACK.title}</p>
          <p className="truncate text-sm text-ink-2">{TRACK.artist}</p>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-150 hover:scale-105 active:scale-95",
            FOCUS_RING
          )}
        >
          {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" aria-hidden /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden />}
        </button>
      </div>

      {/* Waveform: bars pulse only while playing (and never under reduced motion). */}
      <div className="mt-4 flex h-8 items-center gap-[3px]" aria-hidden data-visual-mask>
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 origin-center rounded-full",
              i / BAR_COUNT <= progress ? "bg-accent" : "bg-ink/20",
              isPlaying && "animate-equalize"
            )}
            style={{
              height: `${30 + ((i * 37) % 70)}%`,
              animationDelay: `${(i * 83) % 900}ms`,
              animationDuration: `${800 + ((i * 53) % 500)}ms`,
            }}
          />
        ))}
      </div>

      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={Math.round(duration)}
          step={1}
          value={Math.round(currentTime)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className="scrubber w-full"
          style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
        />
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-ink-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Suggestion box ───────────────────────────────────────────────────────────

type SuggestionState = "idle" | "sending" | "success" | "error";

function SuggestionCard() {
  const [state, setState] = useState<SuggestionState>("idle");
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setState("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
          subject: "New suggestion from the portfolio",
          from_name: "Portfolio Suggestion Box",
          suggestion: input,
          category: "Suggestion",
          botcheck: "",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setInput("");
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <div className={cn(TILE, "p-6 md:px-8 md:py-6")}>
      <div aria-live="polite">
        {(state === "idle" || state === "error") && (
          <div className="grid items-center gap-x-8 gap-y-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <CardLabel icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />} label="AI Suggestion Engine" />
              <p className="mt-2 text-lg font-semibold tracking-[-0.01em] text-ink">
                Know a movie, book, or dive site I&apos;d love?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">
                The &ldquo;engine&rdquo; is me: it lands in my inbox and I rate the match myself, no model involved.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. The Social Network, Sipadan Island, Thinking Fast and Slow..."
                aria-label="Your suggestion"
                className="h-12 w-full shrink-0 rounded-full border border-hairline bg-elevated/80 px-5 sm:w-auto sm:min-w-0 sm:flex-1 sm:shrink text-[15px] text-ink outline-none placeholder:text-ink-2 focus-visible:ring-2 focus-visible:ring-accent"
              />
              <button
                type="submit"
                className={cn(
                  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-fill px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90",
                  FOCUS_RING
                )}
              >
                <Send className="h-4 w-4" aria-hidden /> Send
              </button>
            </form>
            {state === "error" && (
              <p className="text-sm text-[#ff6961] lg:col-span-2">That didn&apos;t go through. Please try again in a moment.</p>
            )}
          </div>
        )}

        {state === "sending" && (
          <div className="flex items-center justify-center gap-3 py-3 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-accent motion-reduce:animate-none" aria-hidden />
            <p className="text-[15px] font-medium text-ink">Sending your suggestion&hellip;</p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
            <CheckCircle2 className="h-6 w-6 text-[#30d158]" aria-hidden />
            <p className="text-base font-semibold text-ink">Got it! Added to my backlog.</p>
            <p className="text-sm text-ink-2">Thanks for the rec. I&apos;ll rate it the old-fashioned way.</p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className={cn("rounded-full px-3 py-1 text-sm font-medium text-accent hover:underline", FOCUS_RING)}
            >
              Suggest something else
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Galapagos "species classifier" ───────────────────────────────────────────

function AISharkCard() {
  return (
    <div className="group relative h-full min-h-[460px] overflow-hidden rounded-card border border-hairline bg-ocean-abyss shadow-soft">
      <Image
        loader={cloudinaryLoader}
        src="hammerhead_vj3iky"
        alt="Hammerhead shark photographed while diving in the Galapagos"
        fill
        sizes="(max-width: 768px) 100vw, 550px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-abyss via-ocean-abyss/50 to-ocean-abyss/10" />

      {/* Mock computer-vision overlay: decorative */}
      <div className="absolute inset-x-0 top-0 flex justify-center pt-24" aria-hidden>
        <div className="relative h-[110px] w-[200px]">
          <div className="absolute inset-0 animate-soft-pulse rounded-lg border-2 border-[#2997ff]" />
          <div className="absolute -top-16 left-0 right-0 rounded-xl border border-white/15 bg-black/60 px-3 py-2 font-mono text-[11px] leading-relaxed text-white backdrop-blur-md">
            <div className="font-semibold text-[#2997ff]">[AI TARGET ACQUIRED]</div>
            <div>Species: Hammerhead Shark</div>
            <div>
              Match: <span className="font-semibold text-[#30d158]">99.8%</span> · Status: Favorite
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">Computer Vision · Marine Biology</p>
        <p className="mt-1 text-lg font-semibold text-white">AI Species Classifier: Galapagos Islands</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
          The label is a joke, the habit is real: the curiosity that has me naming sharks underwater is what went into
          SwellSight, my computer-vision project that reads waves from beach cams.
        </p>
        <a
          href="#projects"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-[#2997ff] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          See SwellSight <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PersonalWorld() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const near = useInView(ref, { margin: "400px 0px", once: true });

  // The "dive": the page sinks into deep water as this section crosses the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const depth = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 0.98], [0, 1, 1, 0]);

  return (
    <section id="personal-world" ref={ref} className="relative scroll-mt-14 overflow-hidden py-28 md:py-44">
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: reduced ? 1 : depth }}>
        <OceanBackdrop variant="deep" depth={depth} webgl={near} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </motion.div>

      <Container className="relative">
        <SectionHeader
          eyebrow="Beyond the Code"
          title="Personal World"
          lede="The ocean, the music, and the stories that keep me curious outside of the terminal."
        />

        <Reveal>
          <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4" data-world-stats>
            {WORLD_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">{label}</dt>
                <dd className="text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
                  <CountUp to={value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="md:col-span-2 lg:col-span-4">
            <OceanCard />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2">
            <AISharkCard />
          </Reveal>
          <Reveal delay={0.12}>
            <CinephileReaderCard />
          </Reveal>
          <Reveal delay={0.16}>
            <NowPlayingCard />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2 lg:col-span-4">
            <SuggestionCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
