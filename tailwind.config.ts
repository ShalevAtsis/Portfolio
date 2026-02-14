import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* Cyber theme – Portfolio Mode: dark, glassmorphism, cyan/emerald glow */
      colors: {
        cyber: {
          bg: "#0a0e17",
          surface: "rgba(15, 23, 42, 0.6)",
          border: "rgba(6, 182, 212, 0.3)",
          accent: "#06b6d4",
          accentDim: "#0891b2",
          emerald: "#10b981",
          emeraldDim: "#059669",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
        /* Paper theme – Resume Mode: light/clean, document-style */
        paper: {
          bg: "#f8f9fa",
          surface: "#ffffff",
          border: "#dee2e6",
          text: "#212529",
          muted: "#6c757d",
          accent: "#0d6efd",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(6, 182, 212, 0.4)",
        "glow-emerald": "0 0 40px -10px rgba(16, 185, 129, 0.3)",
        paper: "0 1px 3px rgba(0,0,0,0.08)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
