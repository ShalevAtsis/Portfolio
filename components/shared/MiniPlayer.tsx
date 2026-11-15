"use client";

import { Pause, Play } from "lucide-react";
import { TRACK, togglePlay, usePlayer } from "@/lib/player";
import { cn } from "@/lib/cn";
import { FOCUS_RING } from "@/components/ui/Button";

/**
 * Navbar mini-player. Appears only after the visitor has started the track in
 * Personal World, so music is always one click away while they keep reading.
 */
export default function MiniPlayer() {
  const { isPlaying, hasStarted } = usePlayer();
  if (!hasStarted) return null;

  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-pressed={isPlaying}
      aria-label={`Toggle music: ${TRACK.title} by ${TRACK.artist}`}
      className={cn(
        "glass mr-1 inline-flex h-8 items-center gap-2 rounded-full pl-2.5 pr-3 text-xs font-medium text-ink",
        FOCUS_RING
      )}
    >
      {isPlaying ? <Pause className="h-3 w-3" fill="currentColor" aria-hidden /> : <Play className="h-3 w-3" fill="currentColor" aria-hidden />}
      <span className="flex h-3 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("w-[2px] origin-bottom rounded-full bg-accent", isPlaying ? "animate-equalize" : "scale-y-[0.3]")}
            style={{ height: "100%", animationDelay: `${i * 160}ms` }}
          />
        ))}
      </span>
      <span className="hidden max-w-[9rem] truncate xl:inline">{TRACK.title}</span>
    </button>
  );
}
