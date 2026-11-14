"use client";

import { useSyncExternalStore } from "react";
import { asset } from "@/lib/basePath";

/**
 * Tiny global audio store so the "Now Playing" card and the navbar mini-player
 * share one <audio> element. Audio never autoplays: it is created lazily on the
 * first explicit play and nothing is downloaded before that.
 */

export const TRACK = {
  title: "Baile Inolvidable",
  artist: "Bad Bunny",
  album: "Debí Tirar Más Fotos",
  artwork: "bad_bunny_svvufd.png",
  src: "/bad_bunny.mp3",
  fallbackDuration: 378,
} as const;

export interface PlayerState {
  isPlaying: boolean;
  /** True once the listener has pressed play at least once this visit. */
  hasStarted: boolean;
  currentTime: number;
  duration: number;
}

const SERVER_STATE: PlayerState = { isPlaying: false, hasStarted: false, currentTime: 0, duration: TRACK.fallbackDuration };

let state: PlayerState = SERVER_STATE;
let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function ensureAudio(): HTMLAudioElement {
  if (audio) return audio;
  const el = new Audio(asset(TRACK.src));
  el.preload = "none";
  el.volume = 0.6;
  el.addEventListener("timeupdate", () => set({ currentTime: el.currentTime }));
  el.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(el.duration)) set({ duration: el.duration });
  });
  el.addEventListener("play", () => set({ isPlaying: true, hasStarted: true }));
  el.addEventListener("pause", () => set({ isPlaying: false }));
  el.addEventListener("ended", () => set({ isPlaying: false, currentTime: 0 }));
  audio = el;
  return el;
}

export function togglePlay() {
  const el = ensureAudio();
  if (el.paused) {
    // Optimistic update keeps the UI responsive even if the browser rejects playback.
    set({ isPlaying: true, hasStarted: true });
    el.play().catch(() => set({ isPlaying: false }));
  } else {
    el.pause();
  }
}

export function seek(seconds: number) {
  const el = ensureAudio();
  const clamped = Math.max(0, Math.min(seconds, state.duration));
  try {
    el.currentTime = clamped;
  } catch {
    /* metadata not loaded yet: the UI position still updates below */
  }
  set({ currentTime: clamped });
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePlayer(): PlayerState {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}
