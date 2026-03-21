"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// ─── Lightweight Value Noise (no external deps) ───────────────────────────────

const PERM = (() => {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let seed = 42;
    const rand = () => {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        return (seed >>> 0) / 0x100000000;
    };
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
    }
    return new Uint8Array([...p, ...p]);
})();

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

function noise2d(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const a = PERM[xi] + yi;
    const b = PERM[xi + 1] + yi;
    return lerp(
        lerp(((PERM[PERM[a]] * 127) / 255) * 2 - 1, ((PERM[PERM[b]] * 127) / 255) * 2 - 1, u),
        lerp(((PERM[PERM[a + 1]] * 127) / 255) * 2 - 1, ((PERM[PERM[b + 1]] * 127) / 255) * 2 - 1, u),
        v
    );
}

function fbm(x: number, y: number, octaves = 3): number {
    let val = 0, amp = 0.5, freq = 1, max = 0;
    for (let o = 0; o < octaves; o++) {
        val += noise2d(x * freq, y * freq) * amp;
        max += amp; amp *= 0.5; freq *= 2.1;
    }
    return val / max;
}

// ─── CV Artifact type ─────────────────────────────────────────────────────────

interface Artifact {
    x: number; y: number;
    alpha: number; dir: 1 | -1;
    size: number;
    label: string;
}

export default function OceanicCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    // Use a ref to access the latest theme inside the animation loop without re-running effects
    const themeRef = useRef(theme);
    useEffect(() => { themeRef.current = theme; }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // Non-null aliases — narrowing doesn't propagate into nested closures in TS,
        // but the guards above guarantee these are safe.
        const cvs = canvas as HTMLCanvasElement;
        const cx = ctx as CanvasRenderingContext2D;

        let rafId = 0;
        let t = 0;
        let dpr = 1;
        let lastDraw = 0;
        const FRAME_MS = 33; // ~30 fps cap for smoother but still performant animation

        // ─── Artifacts pool ──────────────────────────────────────────────────────
        const ARTIFACT_COUNT = 18;
        const artifacts: Artifact[] = Array.from({ length: ARTIFACT_COUNT }, () => ({
            x: Math.random(), y: Math.random(),
            alpha: Math.random(),
            dir: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
            size: 4 + Math.random() * 5,
            label: `${(Math.random() * 0xfff | 0).toString(16).toUpperCase().padStart(3, "0")}`,
        }));

        // ─── Resize ───────────────────────────────────────────────────────────────
        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            cvs.width = w * dpr;
            cvs.height = h * dpr;
            cvs.style.width = `${w}px`;
            cvs.style.height = `${h}px`;
            cx.scale(dpr, dpr);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(document.documentElement);

        // ─── Draw ─────────────────────────────────────────────────────────────────
        const CONTOUR_COUNT = 22;
        const COLS = 48; // reduced from 80 for perf (~14× CPU improvement combined with fps cap)
        const ROWS = 30; // reduced from 50

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const onMouseMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            targetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        };
        window.addEventListener("mousemove", onMouseMove);

        function draw() {
            const W = cvs.width / dpr;
            const H = cvs.height / dpr;

            // Parallax interpolation (faster follow)
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            // Background
            cx.clearRect(0, 0, W, H);

            const isDark = themeRef.current !== "light";

            // ─── Contour lines ────────────────────────────────────────────────────
            for (let c = 0; c < CONTOUR_COUNT; c++) {
                const isoVal = -1 + (2 / CONTOUR_COUNT) * c;

                const cw = W / COLS;
                const ch = H / ROWS;

                const alpha = 0.04 + 0.11 * Math.abs(isoVal);
                const isEmphasis = c % 4 === 0;

                cx.beginPath();

                const emphasisColor = isDark
                    ? `rgba(16, 185, 129, ${alpha * 2.2})` // Emerald
                    : `rgba(14, 165, 233, ${alpha * 2.5})`; // Sky blue

                const baseColor = isDark
                    ? `rgba(148, 163, 184, ${alpha})` // Slate 400
                    : `rgba(15, 23, 42, ${alpha * 1.5})`; // Slate 900

                cx.strokeStyle = isEmphasis ? emphasisColor : baseColor;
                cx.lineWidth = isEmphasis ? 0.8 : 0.4;

                let penDown = false;

                for (let xi = 0; xi <= COLS; xi++) {
                    const baseX = xi * cw;
                    const noiseX = (baseX / W) * 3.5;

                    let prevVal = Infinity;
                    let prevY = 0;

                    for (let yi = 0; yi <= ROWS; yi++) {
                        const baseY = yi * ch;
                        const noiseY = (baseY / H) * 2.2;
                        const val = fbm(noiseX + t * 0.04 + mouseX * 0.5, noiseY + t * 0.025 + mouseY * 0.5);

                        if (prevVal !== Infinity && (prevVal - isoVal) * (val - isoVal) < 0) {
                            const frac = (isoVal - prevVal) / (val - prevVal);
                            const px = baseX;
                            const py = prevY + frac * ch;

                            if (!penDown) { cx.moveTo(px, py); penDown = true; }
                            else cx.lineTo(px, py);
                        }
                        prevVal = val; prevY = baseY;
                    }
                }
                cx.stroke();
            }

            // ─── CV Artifacts ──────────────────────────────────────────────────────
            artifacts.forEach((art) => {
                art.alpha += art.dir * 0.015; // increased speed of appearance/disappearance
                if (art.alpha >= 1) { art.alpha = 1; art.dir = -1; }
                if (art.alpha <= 0) {
                    art.alpha = 0; art.dir = 1;
                    art.x = Math.random(); art.y = Math.random();
                    art.label = `${(Math.random() * 0xfff | 0).toString(16).toUpperCase().padStart(3, "0")}`;
                }

                const sx = art.x * W;
                const sy = art.y * H;
                const a = art.alpha * 0.55;
                const s = art.size;
                const color = isDark ? `rgba(16, 185, 129, ${a})` : `rgba(14, 165, 233, ${a * 1.5})`;

                cx.strokeStyle = color;
                cx.lineWidth = 0.7;

                // + crosshair
                cx.beginPath();
                cx.moveTo(sx - s, sy); cx.lineTo(sx + s, sy);
                cx.moveTo(sx, sy - s); cx.lineTo(sx, sy + s);
                cx.stroke();

                // Tiny corner brackets
                const b = s * 0.55;
                cx.beginPath();
                cx.moveTo(sx - s, sy - b); cx.lineTo(sx - s, sy - s); cx.lineTo(sx - b, sy - s);
                cx.moveTo(sx + b, sy - s); cx.lineTo(sx + s, sy - s); cx.lineTo(sx + s, sy - b);
                cx.moveTo(sx + s, sy + b); cx.lineTo(sx + s, sy + s); cx.lineTo(sx + b, sy + s);
                cx.moveTo(sx - b, sy + s); cx.lineTo(sx - s, sy + s); cx.lineTo(sx - s, sy + b);
                cx.stroke();

                // Hex label
                cx.fillStyle = color;
                cx.font = `${Math.max(7, s * 0.9)}px monospace`;
                cx.fillText(`0x${art.label}`, sx + s + 3, sy - s + 2);
            });

            t += 0.035; // increased speed of topographic lines
        }

        // ─── RAF loop with visibility pause ────────────────────────────────────────
        let paused = false;
        const onVisibility = () => { paused = document.hidden; if (!paused) rafId = requestAnimationFrame(loop); };
        document.addEventListener("visibilitychange", onVisibility);

        function loop(now: number) {
            if (paused) return;
            rafId = requestAnimationFrame(loop);
            if (now - lastDraw < FRAME_MS) return; // throttle to ~20 fps
            lastDraw = now;
            draw();
        }
        rafId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        />
    );
}
