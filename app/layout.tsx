import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { DebugProvider } from "@/context/DebugContext";
import DebugLayoutWrapper from "@/components/DebugLayoutWrapper";
import { asset } from "@/lib/basePath";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Shalev Atsis · Software Engineer & AI Developer",
  description:
    "Software Engineer specializing in AI & Computer Vision. Tier 2 at Jifiti, B.Sc. CS (GPA 90). Python, PyTorch, OpenCV. Open to engineering opportunities.",
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
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
