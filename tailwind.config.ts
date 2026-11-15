import type { Config } from "tailwindcss";

/**
 * Design tokens. Colours resolve to CSS variables defined in app/globals.css,
 * so every utility adapts to the dark (default) and light themes automatically.
 */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class", // next-themes toggles class="dark" on <html>
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: withAlpha("--canvas"), // page background
        surface: withAlpha("--surface"), // cards
        elevated: withAlpha("--elevated"), // raised controls, inputs
        ink: withAlpha("--ink"), // primary text
        "ink-2": withAlpha("--ink-2"), // secondary text
        accent: withAlpha("--accent"), // Apple blue: links, highlights
        "accent-fill": withAlpha("--accent-fill"), // filled buttons (white text passes AA)
        hairline: "var(--hairline)",
        ocean: {
          abyss: "#020b1a",
          deep: "#06214a",
        },
        /* Resume view keeps its own document-style "paper" look. */
        paper: {
          bg: "#f8f9fa",
          surface: "#ffffff",
          border: "#dee2e6",
          text: "#212529",
          muted: "#6c757d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 9vw, 7.5rem)", { lineHeight: "0.98" }],
        headline: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.05" }],
      },
      maxWidth: {
        content: "1100px",
      },
      borderRadius: {
        "card-sm": "20px",
        card: "28px",
        "card-lg": "36px",
      },
      boxShadow: {
        soft: "0 1px 0 0 var(--hairline) inset, 0 30px 60px -30px rgb(0 0 0 / var(--shadow-strength))",
        lift: "0 40px 80px -40px rgb(0 0 0 / var(--shadow-strength))",
      },
      keyframes: {
        "hero-rise": {
          from: { transform: "translateY(0.5em)" },
          to: { transform: "translateY(0)" },
        },
        "hero-fade": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "wave-drift": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        equalize: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "hero-rise": "hero-rise 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "hero-fade": "hero-fade 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "soft-pulse": "soft-pulse 2.8s ease-in-out infinite",
        equalize: "equalize 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
