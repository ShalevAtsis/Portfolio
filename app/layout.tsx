import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "@/context/ViewContext";
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
  title: "Shalev Atsis | Software Engineer",
  description:
    "Building intelligent software solutions. Tier 2 Software Support Engineer at Jifiti. B.Sc. Computer Science at HIT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <DebugProvider>
          <DebugLayoutWrapper>
            <ViewProvider>{children}</ViewProvider>
          </DebugLayoutWrapper>
        </DebugProvider>
      </body>
    </html>
  );
}
