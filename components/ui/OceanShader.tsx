"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * OceanShader: the site's signature visual, built in code.
 *
 * Raw WebGL2, one full-screen triangle, no dependencies. The fragment shader
 * draws the open sea from a low camera: a clear horizon, a sky with a low
 * moon (dark theme) or sun (light theme), swells rolling towards the viewer,
 * fresnel sky reflection, a glittering light path and foam on the crests.
 *
 * Performance budget
 *  - renders at 0.5-0.75x device pixel ratio, capped at 30-45 fps
 *  - pauses when off-screen (IntersectionObserver) and when the tab is hidden
 *  - `powerPreference: "low-power"`, zero per-frame allocations
 *
 * Fallbacks (the parent always paints a CSS gradient + SVG waves underneath)
 *  - no WebGL2, a software renderer, a GPU that needs more than 50 ms for one
 *    frame, or a lost context -> canvas stays transparent and the CSS
 *    fallback shows
 *  - prefers-reduced-motion or Save-Data -> a single still frame, no loop
 */

export type OceanVariant = "hero" | "deep";

interface OceanShaderProps {
  variant?: OceanVariant;
  /** 0..1 progress of the host section scrolling away (camera lifts, scene dims). */
  scroll?: MotionValue<number>;
  /** 0..1 "dive" depth: darker, calmer, caustics fade in. */
  depth?: MotionValue<number>;
  className?: string;
}

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uScroll;   // 0..1 hero progress
uniform vec2  uPointer;  // -1..1, smoothed
uniform float uDepth;    // 0..1 dive depth
uniform float uLight;    // 0 dark theme, 1 light theme
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 3; i++) {
    s += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.0);
    a *= 0.5;
  }
  return s;
}

// Swell directions (radians off "straight at the camera"). Keeping them within
// ~50 degrees makes the crests read as long horizontal lines that foreshorten
// towards the horizon, which is what makes water look like the sea.
const float SWELL[6] = float[6](-0.28, 0.42, -0.85, 0.16, 0.72, -0.52);

// Sea surface height: six swells with peaked crests (Gerstner-like), each
// dragging the domain a little for choppiness, plus fine fbm detail.
float seaHeight(vec2 p, float t) {
  float h = 0.0, f = 0.36, a = 0.36;
  for (int i = 0; i < 6; i++) {
    vec2 dir = vec2(sin(SWELL[i]), -cos(SWELL[i]));
    float x = dot(p, dir) * f - t * (0.62 + 0.13 * float(i));
    float w = exp(sin(x) - 1.0);
    h += a * w;
    p += dir * (cos(x) * w) * a * 0.30;
    f *= 1.62;
    a *= 0.60;
  }
  return h + (fbm(p * 1.1 + t * 0.08) - 0.5) * 0.08;
}

// Sky: vertical gradient, a low sun (day) or moon (night) with a wide glow,
// and thin stratus streaks hugging the horizon.
vec3 skyColor(vec3 rd, vec3 skyTop, vec3 skyHor, vec3 sunC, vec3 sun, float t, float disc) {
  float y = clamp(rd.y, 0.0, 1.0);
  vec3 c = mix(skyHor, skyTop, pow(clamp(y * 2.4, 0.0, 1.0), 0.62));
  float sd = max(dot(rd, sun), 0.0);
  c += sunC * (0.20 * pow(sd, 8.0) + 0.45 * pow(sd, 140.0));
  c += sunC * disc * smoothstep(0.99972, 0.99986, sd);
  float streak = fbm(vec2(rd.x * 2.6 + t * 0.006, y * 22.0 + 3.0));
  c = mix(c, mix(skyHor, sunC, 0.55), smoothstep(0.50, 0.82, streak) * 0.28 * (1.0 - smoothstep(0.0, 0.22, y)));
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime;

  // Palette. Dark theme: blue hour, a moonlit sea. Light theme: a clear day.
  vec3 deepC   = mix(vec3(0.012, 0.075, 0.180), vec3(0.070, 0.380, 0.720), uLight);
  vec3 crestC  = mix(vec3(0.055, 0.300, 0.520), vec3(0.250, 0.700, 0.900), uLight);
  vec3 skyTop  = mix(vec3(0.010, 0.030, 0.095), vec3(0.360, 0.620, 0.950), uLight);
  vec3 skyHor  = mix(vec3(0.130, 0.330, 0.640), vec3(0.780, 0.890, 0.990), uLight);
  vec3 sunC    = mix(vec3(0.720, 0.860, 1.000), vec3(1.000, 0.970, 0.900), uLight);
  vec3 foamC   = mix(vec3(0.780, 0.900, 1.000), vec3(1.0), uLight);

  // Camera: low over the water with the horizon in the upper third; it lifts
  // and pitches down as the hero scrolls away.
  float camH  = 1.35 + uScroll * 1.4;
  float pitch = 0.20 + uScroll * 0.22;
  vec3 ro = vec3(uPointer.x * 0.25, camH, t * 0.12);
  vec3 rd = normalize(vec3(uv.x + uPointer.x * 0.035, uv.y - pitch + uPointer.y * 0.02, 1.25));
  // The light sits off to the right (at ~77% of the width on any aspect ratio)
  // so its reflection never runs underneath the centred headline.
  vec3 sun = normalize(vec3(0.27 * uResolution.x / uResolution.y, 0.075, 1.25));

  float calm = mix(1.0, 0.35, uDepth);
  vec3 col;

  if (rd.y < -0.002) {
    float dist = ro.y / -rd.y;
    vec2 pos = ro.xz + rd.xz * dist;

    // Fade wave energy with distance to keep the horizon alias-free.
    float amp = calm / (1.0 + dist * 0.030);
    float e = 0.03 + dist * 0.012;
    float h0 = seaHeight(pos, t);
    float hx = seaHeight(pos + vec2(e, 0.0), t);
    float hz = seaHeight(pos + vec2(0.0, e), t);
    vec3 n = vec3(-(hx - h0) / e * amp, 1.0, -(hz - h0) / e * amp);
    // Fine ripples: only near the camera, they are what makes the light glitter.
    float ripple = 0.16 * calm / (1.0 + dist * 0.25);
    n.xz += (vec2(noise(pos * 5.0 + vec2(t * 0.6, 0.0)), noise(pos * 5.0 + vec2(13.0, -t * 0.6))) - 0.5) * ripple;
    n = normalize(n);

    float fres = 0.03 + 0.97 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
    vec3 refl = reflect(rd, n);
    refl.y = abs(refl.y);

    // Body colour: deep water in the troughs, lit turquoise through the crests.
    float lift = smoothstep(0.22, 0.68, h0);
    vec3 water = mix(deepC, crestC, lift * (0.35 + 0.65 * amp));
    col = mix(water, skyColor(refl, skyTop, skyHor, sunC, sun, t, 0.0), fres * 0.85);

    // The light path: a wide sheen plus sharp glitter running to the horizon.
    float sd = max(dot(refl, sun), 0.0);
    col += sunC * pow(sd, 10.0) * mix(0.16, 0.10, uLight);
    col += sunC * pow(sd, 70.0) * mix(0.38, 0.30, uLight);
    col += vec3(1.0) * pow(sd, 420.0) * 1.2;

    float foam = smoothstep(0.60, 0.80, h0) * smoothstep(0.35, 0.75, fbm(pos * 2.6 + t * 0.2)) * amp;
    col = mix(col, foamC, foam * mix(0.42, 0.65, uLight));

    col = mix(col, skyHor, 1.0 - exp(-dist * 0.022));           // haze to horizon
  } else {
    col = skyColor(rd, skyTop, skyHor, sunC, sun, t, 1.0);
  }

  // Dive: cross-fade to an underwater column with drifting caustics.
  if (uDepth > 0.001) {
    vec2 cp = uv * 3.2 + vec2(0.0, t * 0.05);
    float caust = pow(0.5 + 0.5 * sin(8.0 * fbm(cp * 1.2 + t * 0.12) + 6.0 * fbm(cp * 1.7 - t * 0.10)), 6.0);
    // Light theme: a pale, sunlit shallow, so the dark text of the section stays readable.
    vec3 columnLow  = mix(deepC * 0.30, vec3(0.800, 0.890, 0.985), uLight);
    vec3 columnHigh = mix(deepC * 1.45, vec3(0.910, 0.955, 1.000), uLight);
    vec3 column = mix(columnLow, columnHigh, smoothstep(-0.6, 0.6, uv.y));
    column += mix(mix(crestC, sunC, 0.35) * 0.22, vec3(0.10), uLight) * caust * smoothstep(-0.5, 0.5, uv.y);
    col = mix(col, column, uDepth);
  }

  col *= 1.0 - uScroll * 0.35;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 128.0;      // dither: no banding
  outColor = vec4(col, 1.0);
}`;

/** A single full-size frame slower than this means the GPU cannot keep up. */
const FRAME_BUDGET_MS = 50;

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") console.warn("[OceanShader]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function OceanShader({ variant = "hero", scroll, depth, className }: OceanShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionSafe();
  const { resolvedTheme } = useTheme();
  const lightRef = useRef(0);
  const redrawRef = useRef<(() => void) | null>(null);

  // Theme changes only flip a uniform; a paused scene repaints one frame.
  useEffect(() => {
    lightRef.current = resolvedTheme === "light" ? 1 : 0;
    redrawRef.current?.();
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Shader compilation is deferred until the page has loaded and the main
    // thread is idle, so it can never delay first paint or LCP.
    const init = (): (() => void) | void => {
      const fail = () => {
        canvas.dataset.state = "fallback";
        canvas.dataset.running = "false";
        canvas.style.opacity = "0";
      };

      const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
      });
      if (!gl) return fail();

      // Software rasterisers (SwiftShader, llvmpipe) run the shader on the CPU
      // and would block the main thread: treat them as "no WebGL" and keep the
      // CSS fallback. `?ocean=webgl` forces the shader (used by the test suite).
      const forced = new URLSearchParams(window.location.search).get("ocean") === "webgl";
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      if (!forced && /swiftshader|llvmpipe|software|basic render/i.test(renderer)) return fail();

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      if (!vs || !fs || !program) return fail();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return fail();
      gl.useProgram(program);

      const uResolution = gl.getUniformLocation(program, "uResolution");
      const uTime = gl.getUniformLocation(program, "uTime");
      const uScroll = gl.getUniformLocation(program, "uScroll");
      const uPointer = gl.getUniformLocation(program, "uPointer");
      const uDepth = gl.getUniformLocation(program, "uDepth");
      const uLight = gl.getUniformLocation(program, "uLight");

      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const still = reduced || connection?.saveData === true;
      const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4 || window.matchMedia("(max-width: 768px)").matches;
      const resolutionScale = lowEnd ? 0.5 : 0.75;
      const frameInterval = 1000 / (lowEnd ? 30 : 45);

      let raf = 0;
      let visible = false;
      let disposed = false;
      let time = variant === "deep" ? 40 : 12; // start mid-swell, not on a flat frame
      let last = 0;
      let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
      let shown = false;

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2) * resolutionScale;
        const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
        const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };

      const paint = () => {
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, time);
        gl.uniform1f(uScroll, scroll ? scroll.get() : 0);
        gl.uniform2f(uPointer, pointerX, pointerY);
        gl.uniform1f(uDepth, depth ? depth.get() : variant === "deep" ? 1 : 0);
        gl.uniform1f(uLight, lightRef.current);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const draw = () => {
        paint();
        if (!shown) {
          shown = true;
          canvas.dataset.state = "webgl";
          canvas.style.opacity = "1";
        }
      };

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const elapsed = now - last;
        if (elapsed < frameInterval) return;
        last = now;
        time += Math.min(elapsed, 100) / 1000;
        pointerX += (targetX - pointerX) * 0.05;
        pointerY += (targetY - pointerY) * 0.05;
        draw();
      };

      const sync = () => {
        const shouldRun = !still && visible && !document.hidden && !disposed;
        canvas.dataset.running = String(shouldRun);
        cancelAnimationFrame(raf);
        if (shouldRun) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      };

      const renderStill = () => {
        if (disposed) return;
        resize();
        draw();
      };
      redrawRef.current = () => {
        if (canvas.dataset.running !== "true") renderStill();
      };

      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onLost = (e: Event) => {
        e.preventDefault();
        disposed = true;
        cancelAnimationFrame(raf);
        fail();
      };

      const resizeObserver = new ResizeObserver(() => {
        resize();
        if (canvas.dataset.running !== "true") draw();
      });
      const intersection = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          sync();
        },
        { rootMargin: "80px" }
      );

      // Not every browser exposes the renderer name (WebKit masks it), so the
      // real cost of one frame is measured as well: a tiny warm-up draw absorbs
      // shader compilation, then a full-size frame is timed synchronously.
      // Anything slower than the budget would starve the main thread, so the
      // CSS fallback stays instead.
      if (!forced) {
        const pixel = new Uint8Array(4);
        resize();
        gl.viewport(0, 0, 4, 4);
        paint();
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        gl.viewport(0, 0, canvas.width, canvas.height);
        const startedAt = performance.now();
        paint();
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        if (performance.now() - startedAt > FRAME_BUDGET_MS) {
          disposed = true;
          gl.deleteProgram(program);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          return fail();
        }
      }

      renderStill();
      canvas.dataset.running = "false";
      resizeObserver.observe(canvas);
      intersection.observe(canvas);
      document.addEventListener("visibilitychange", sync);
      canvas.addEventListener("webglcontextlost", onLost);
      if (!still) window.addEventListener("pointermove", onPointer, { passive: true });

      return () => {
        disposed = true;
        redrawRef.current = null;
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        intersection.disconnect();
        document.removeEventListener("visibilitychange", sync);
        canvas.removeEventListener("webglcontextlost", onLost);
        window.removeEventListener("pointermove", onPointer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    };

    let cancelled = false;
    let cleanup: (() => void) | void;
    let idleHandle = 0;
    const start = () => {
      if (!cancelled) cleanup = init();
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        idleHandle = window.setTimeout(start, 200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      if (cleanup) cleanup();
    };
  }, [reduced, variant, scroll, depth]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      data-ocean-shader={variant}
      data-state="pending"
      data-running="false"
      className={className}
      style={{ opacity: 0, transition: "opacity 900ms ease" }}
    />
  );
}
