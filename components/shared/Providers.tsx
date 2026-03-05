"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { ViewProvider } from "@/context/ViewContext";

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Providers.tsx
 * ─────────────
 * Wraps the app with:
 *  • next-themes ThemeProvider  — global dark/light mode, dark by default,
 *    toggled via the `class` attribute on <html> (Tailwind's `dark:` prefix).
 *  • ViewProvider               — dual-mode (portfolio / resume) context.
 *
 * Usage in layout.tsx:
 *   <Providers>{children}</Providers>
 */
export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"        // adds `class="dark"` to <html>
            defaultTheme="dark"      // start in dark mode
            enableSystem={false}     // ignore OS preference; user controls it
            disableTransitionOnChange // prevent flash during theme swap
        >
            <ViewProvider>{children}</ViewProvider>
        </ThemeProvider>
    );
}
