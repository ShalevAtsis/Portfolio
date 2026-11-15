import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { DebugProvider } from "@/context/DebugContext";
import DebugLayoutWrapper from "@/components/layout/DebugLayoutWrapper";
import { asset } from "@/lib/basePath";
import ScrollToTop from "@/components/shared/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const TITLE = "Shalev Atsis · Software Engineer · AI Engineer";
const DESCRIPTION =
  "Software Engineer and AI Engineer building AI-driven quality engineering for autonomous aviation at High Lander. Computer vision, test automation (Playwright, TypeScript, Python), B.Sc. Computer Science Honor Graduate. Open to opportunities.";
const OG_IMAGE =
  "https://res.cloudinary.com/ddyrg0nz5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1774023127/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://shalevatsis.dev"),
  title: { default: TITLE, template: "%s | Shalev Atsis" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "Test Automation",
    "Playwright",
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
    title: TITLE,
    description:
      "Software Engineer and AI Engineer: AI-driven quality engineering for autonomous aviation, computer vision, and test automation. Open to new opportunities.",
    url: "https://shalevatsis.dev",
    siteName: "Shalev Atsis",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Shalev Atsis - Software Engineer and AI Engineer portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Software Engineer and AI Engineer. AI-driven quality engineering for autonomous aviation, computer vision, and test automation.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
    shortcut: asset("/icon.svg"),
    apple: asset("/icon.svg"),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: next-themes sets the theme class before hydration,
    // and browser extensions inject attributes on <body>.
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {/* Skip link: WCAG 2.4.1. Hidden until focused with the keyboard. */}
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[99999] -translate-y-[250%] rounded-full bg-accent-fill px-5 py-2.5 text-sm font-semibold text-white shadow-lift transition-transform duration-200 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent-fill"
        >
          Skip to content
        </a>
        <Providers>
          <DebugProvider>
            <DebugLayoutWrapper>
              <ScrollToTop />
              {children}
            </DebugLayoutWrapper>
          </DebugProvider>
        </Providers>
      </body>
    </html>
  );
}
