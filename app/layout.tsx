import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { DebugProvider } from "@/context/DebugContext";
import DebugLayoutWrapper from "@/components/DebugLayoutWrapper";

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
    // SVG auto-picked up from app/icon.svg by Next.js file convention
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",   // iOS home-screen icon (browsers scale the SVG)
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <DebugProvider>
          <DebugLayoutWrapper>
            <Providers>{children}</Providers>
          </DebugLayoutWrapper>
        </DebugProvider>
      </body>
    </html>
  );
}
