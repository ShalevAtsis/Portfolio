"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * OceanShader: the site's signature visual, built in code.
 *
 * Raw WebGL2, one full-screen triangle, no dependencies. The fragment shader
 * draws a calm deep-blue sea at a low camera angle: layered Gerstner-like
 * swells + fbm detail, fresnel sky reflection, soft specular glints and a
 * little foam on the crests.
 *
 * Performance budget
 *  - renders at 0.5-0.75x device pixel ratio, capped at 30-45 fps
 *  - pauses when off-screen (IntersectionObserver) and when the tab is hidden
 *  - `powerPreference: "low-power"`, zero per-frame allocations
 *
 * Fallbacks (the parent always paints a CSS gradient + SVG waves underneath)
 *  - no WebGL2, a software renderer, or a lost context -> canvas stays
 *    transparent and the CSS fallback shows
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

// Sea surface height: five rotated swells with peaked crests (Gerstner-like),
// each dragging the domain a little for choppiness, plus fine fbm detail.
float seaHeight(vec2 p, float t) {
  float h = 0.0, f = 0.42, a = 0.36;
  vec2 dir = vec2(0.80, 0.60);
  for (int i = 0; i < 5; i++) {
    float x = dot(p, dir) * f + t * (0.50 + 0.11 * float(i));
    float w = exp(sin(x) - 1.0);
    h += a * w;
    p += dir * (-cos(x) * w) * a * 0.32;
    dir = mat2(0.80, -0.60, 0.60, 0.80) * dir;
    f *= 1.72;
    a *= 0.56;
  }
  return h + (fbm(p * 0.9 + t * 0.07) - 0.5) * 0.10;
}

vec3 skyColor(vec3 rd, vec3 skyTop, vec3 skyHorizon, vec3 glow, vec3 sun) {
  vec3 c = mix(skyHorizon, skyTop, pow(clamp(rd.y, 0.0, 1.0), 0.45));
  return c + glow * 0.10 * pow(max(dot(rd, sun), 0.0), 5.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime;

  // Palette: deep navy #020b1a -> Apple blue #2997ff highlights (dark theme),
  // pale sky and soft blue water (light theme).
  vec3 deepC   = mix(vec3(0.008, 0.043, 0.102), vec3(0.56, 0.76, 0.95), uLight);
  vec3 crestC  = mix(vec3(0.030, 0.150, 0.330), vec3(0.72, 0.87, 1.00), uLight);
  vec3 blue    = mix(vec3(0.161, 0.592, 1.000), vec3(1.00, 1.00, 1.00), uLight);
  vec3 skyTop  = mix(vec3(0.000, 0.002, 0.008), vec3(0.984, 0.984, 0.992), uLight);
  vec3 skyHor  = mix(vec3(0.012, 0.060, 0.150), vec3(0.840, 0.915, 0.990), uLight);
  vec3 foamC   = mix(vec3(0.70, 0.85, 1.00), vec3(1.0), uLight);

  // Camera: low over the water; lifts and pitches down as the hero scrolls away.
  float camH  = 1.55 + uScroll * 1.4;
  float pitch = 0.10 + uScroll * 0.22;
  vec3 ro = vec3(uPointer.x * 0.25, camH, t * 0.35);
  vec3 rd = normalize(vec3(uv.x + uPointer.x * 0.035, uv.y - pitch + uPointer.y * 0.02, 1.25));
  vec3 sun = normalize(vec3(0.22, 0.30, 1.0));

  float calm = mix(1.0, 0.35, uDepth);
  vec3 col;

  if (rd.y < -0.002) {
    float dist = ro.y / -rd.y;
    vec2 pos = ro.xz + rd.xz * dist;

    // Fade wave energy with distance to keep the horizon alias-free.
    float amp = calm / (1.0 + dist * 0.035);
    float e = 0.03 + dist * 0.012;
    float h0 = seaHeight(pos, t);
    float hx = seaHeight(pos + vec2(e, 0.0), t);
    float hz = seaHeight(pos + vec2(0.0, e), t);
    vec3 n = normalize(vec3(-(hx - h0) / e * amp, 1.0, -(hz - h0) / e * amp));

    float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
    vec3 refl = reflect(rd, n);
    refl.y = abs(refl.y);

    vec3 water = mix(deepC, crestC, smoothstep(0.25, 0.85, h0) * amp);
    col = mix(water, skyColor(refl, skyTop, skyHor, blue, sun), fres);

    float sd = max(dot(refl, sun), 0.0);
    col += blue * pow(sd, 14.0) * 0.10 * calm;                 // broad sheen
    col += mix(blue, vec3(1.0), 0.45) * pow(sd, 260.0) * 0.9;   // glints

    float foam = smoothstep(0.70, 0.95, h0) * fbm(pos * 3.0 + t * 0.15) * amp;
    col = mix(col, foamC, foam * 0.30);

    col = mix(col, skyHor, 1.0 - exp(-dist * 0.045));           // haze to horizon
  } else {
    col = skyColor(rd, skyTop, skyHor, blue, sun);
  }

  // Dive: cross-fade to an underwater column with drifting caustics.
  if (uDepth > 0.001) {
    vec2 cp = uv * 3.2 + vec2(0.0, t * 0.05);
    float caust = pow(0.5 + 0.5 * sin(8.0 * fbm(cp * 1.2 + t * 0.12) + 6.0 * fbm(cp * 1.7 - t * 0.10)), 6.0);
    vec3 column = mix(deepC * mix(0.35, 0.92, uLight), deepC * mix(1.5, 1.06, uLight), smoothstep(-0.6, 0.6, uv.y));
    column += blue * caust * 0.16 * smoothstep(-0.5, 0.5, uv.y);
    col = mix(col, column, uDepth * 0.92);
  }

  col *= 1.0 - uScroll * 0.45;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 128.0;      // dither: no banding
  outColor = vec4(col, 1.0);
}`;

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

      const draw = () => {
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, time);
        gl.uniform1f(uScroll, scroll ? scroll.get() : 0);
        gl.uniform2f(uPointer, pointerX, pointerY);
        gl.uniform1f(uDepth, depth ? depth.get() : variant === "deep" ? 1 : 0);
        gl.uniform1f(uLight, lightRef.current);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
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
