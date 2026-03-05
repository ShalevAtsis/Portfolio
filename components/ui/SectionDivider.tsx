import type { ReactNode } from "react";

/**
 * SectionDivider
 * ──────────────
 * A 1 px fading gradient line. No harsh solid <hr>.
 * Pass `double` for an extra offset line beneath for added depth.
 */
interface DividerProps {
    double?: boolean;
}

export default function SectionDivider({ double = false }: DividerProps) {
    return (
        <div aria-hidden className="my-0 flex flex-col items-center gap-2 py-2">
            <div
                className="h-px w-full max-w-2xl"
                style={{
                    background:
                        "linear-gradient(to right, transparent 0%, rgba(100,116,139,0.25) 30%, rgba(100,116,139,0.25) 70%, transparent 100%)",
                }}
            />
            {double && (
                <div
                    className="h-px w-full max-w-sm"
                    style={{
                        background:
                            "linear-gradient(to right, transparent 0%, rgba(100,116,139,0.12) 35%, rgba(100,116,139,0.12) 65%, transparent 100%)",
                    }}
                />
            )}
        </div>
    );
}

/**
 * SectionBand
 * ───────────
 * Optional frosted-glass wrapper for alternating section depth.
 */
interface BandProps {
    children: ReactNode;
    variant?: "tinted" | "transparent";
}

export function SectionBand({ children, variant = "transparent" }: BandProps) {
    if (variant === "tinted") {
        return (
            <div className="relative rounded-3xl bg-slate-900/[0.03] ring-1 ring-slate-900/[0.04] backdrop-blur-[2px] dark:bg-white/[0.025] dark:ring-white/[0.04]">
                {children}
            </div>
        );
    }
    return <>{children}</>;
}
