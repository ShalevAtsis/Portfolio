import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { DebugProvider } from "@/context/DebugContext";
import DebugLayoutWrapper from "@/components/layout/DebugLayoutWrapper";
import { asset } from "@/lib/basePath";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",   // paint text immediately with fallback, swap when loaded
  preload: true,     // emits <link rel=preload> in <head> for zero-delay font start
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Shalev Atsis · Software Engineer & AI Developer",
  description:
    "Software Engineer specializing in AI & Computer Vision. Tier 2 at Jifiti, B.Sc. Computer Science. Python, PyTorch, OpenCV. Open to engineering opportunities.",
  icons: {
    // asset() prepends /Portfolio on GitHub Pages, empty string locally
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
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased overflow-x-hidden transition-colors duration-300" suppressHydrationWarning>
        <DebugProvider>
          <DebugLayoutWrapper>
            <Providers>{children}</Providers>
          </DebugLayoutWrapper>
        </DebugProvider>
      </body>
    </html>
  );
}
