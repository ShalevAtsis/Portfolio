import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { DebugProvider } from "@/context/DebugContext";
import DebugLayoutWrapper from "@/components/layout/DebugLayoutWrapper";
import dynamic from "next/dynamic";
import { asset } from "@/lib/basePath";
import ScrollToTop from "@/components/shared/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Stripped non-essential weights
  variable: "--font-sans",
  display: "swap",   // paint text immediately with fallback, swap when loaded
  preload: true,     // emits <link rel=preload> in <head> for zero-delay font start
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shalevatsis.dev"),
  title: {
    default: "Shalev Atsis · Software Engineer & AI Developer",
    template: "%s | Shalev Atsis",
  },
  description:
    "Experienced Software Engineer specializing in AI, Computer Vision, and Full Stack Development. Tier 2 at Jifiti, B.Sc. Computer Science. Open to engineering opportunities.",
  keywords: [
    "Software Engineer",
    "Full Stack",
    "AI",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "PyTorch",
    "Shalev Atsis",
  ],
  openGraph: {
    title: "Shalev Atsis · Software Engineer & AI Developer",
    description:
      "Experienced Software Engineer specializing in AI, Computer Vision, and Full Stack Development. Open to new opportunities.",
    url: "https://shalevatsis.dev",
    siteName: "Shalev Atsis",
    images: [
      {
        url: "https://res.cloudinary.com/ddyrg0nz5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1774023127/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shalev Atsis - Software Engineer & AI Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalev Atsis · Software Engineer",
    description:
      "Experienced Software Engineer exploring the intersection of modern web development and Artificial Intelligence.",
    images: ["https://res.cloudinary.com/ddyrg0nz5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1774023127/og-image.png"],
  },
  icons: {
    // asset() dynamically prepends the basePath for static deployment
    icon: [
      { url: asset("/icon.svg"), type: "image/svg+xml" },
    ],
    shortcut: asset("/icon.svg"),
    apple: asset("/icon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required by next-themes to avoid the
    // class mismatch warning between SSR (no class) and client (dark/light class).
    // It is also needed on the body tag because extensions (like Grammarly) inject attributes.
    <html lang="en" className={`${inter.variable} ${lora.variable} overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Critical CSS for Hero LCP Element to paint immediately without waiting for main CSS file */}
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes heroSlideUp {
                from { transform: translateY(14px); }
                to { transform: translateY(0); }
              }
              @keyframes heroFadeUp {
                from { opacity: 0; transform: translateY(18px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-hero-slide-up {
                animation: heroSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
              }
              .animate-hero-fade-up {
                animation: heroFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
              }
            `
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        {/* ── Skip to Content — WCAG 2.4.1 Bypass Blocks ──────────────────────────
            Visually hidden until keyboard-focused. Appears as a premium cyan pill
            at the very top of the viewport for Tab-key users, letting them skip
            the entire navbar and jump straight to #main-content.              */}
        <a
          href="#main-content"
          className={[
            "fixed left-4 top-4 z-[99999] -translate-y-[200%]",
            "rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg",
            "transition-transform duration-200",
            "focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-500",
          ].join(" ")}
        >
          Skip to content
        </a>
        <Providers>
          <div className="flex min-h-screen flex-col transition-colors duration-300">
            <DebugProvider>
              <DebugLayoutWrapper>
                  <ScrollToTop />
                  {children}
              </DebugLayoutWrapper>
            </DebugProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
