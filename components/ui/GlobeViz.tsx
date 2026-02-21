"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-globe.gl with no SSR for Next.js App Router
// @ts-ignore
const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" />
                <span className="text-xs font-medium uppercase tracking-widest text-cyan-500/70">Initializing Orbit...</span>
            </div>
        </div>
    ),
});

export interface LocationData {
    lat: number;
    lng: number;
    name: string;
    type: "surf" | "dive";
}

const LOCATIONS: LocationData[] = [
    // Surf Spots
    { lat: 32.0853, lng: 34.7818, name: "Tel Aviv, Israel", type: "surf" },
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro, Brazil", type: "surf" },
    { lat: -22.7469, lng: -41.8817, name: "Búzios, Brazil", type: "surf" },
    { lat: -14.2775, lng: -38.9967, name: "Itacaré, Brazil", type: "surf" },
    { lat: -13.3805, lng: -38.9140, name: "Morro de São Paulo, Brazil", type: "surf" },
    { lat: 11.2494, lng: -73.5606, name: "Palomino, Colombia", type: "surf" },
    { lat: -1.8263, lng: -80.7513, name: "Montañita, Ecuador", type: "surf" },
    { lat: 7.4333, lng: -80.1833, name: "Playa Venao, Panama", type: "surf" },
    { lat: 9.3333, lng: -82.2500, name: "Bocas del Toro, Panama", type: "surf" },
    { lat: 11.2536, lng: -85.8705, name: "San Juan del Sur, Nicaragua", type: "surf" },
    { lat: 15.8643, lng: -97.0708, name: "Puerto Escondido, Mexico", type: "surf" },

    // Dive Spots
    { lat: 29.5581, lng: 34.9482, name: "Eilat, Israel", type: "dive" },
    { lat: 10.0936, lng: 99.8384, name: "Koh Tao, Thailand", type: "dive" },
    { lat: 12.5847, lng: -81.7006, name: "San Andres, Colombia", type: "dive" },
    { lat: -0.3800, lng: -90.3000, name: "Galapagos Islands, Ecuador", type: "dive" },
    { lat: 9.3333, lng: -82.2500, name: "Bocas del Toro, Panama", type: "dive" },
    { lat: 17.3155, lng: -87.5345, name: "Blue Hole, Belize", type: "dive" },
    { lat: 20.4229, lng: -86.9223, name: "Cozumel, Mexico", type: "dive" }
];

export default function GlobeViz() {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredRing, setHoveredRing] = useState<LocationData | null>(null);

    // Auto-resize the globe to fit its container
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Set up globe controls (auto-rotate, disable zoom)
    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = false; // Disable scroll-zooming to keep the page scrollable
            // Tilt the globe slightly for a better angle
            globeRef.current.pointOfView({ altitude: 2.2 }, 0);
        }
    }, [globeRef.current, dimensions.width]);

    // Pause rotation when interacting/hovering
    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = !hoveredRing;
            controls.autoRotateSpeed = hoveredRing ? 0 : 0.5;
        }
    }, [hoveredRing]);

    // Ring configurations
    const getRingColor = useMemo(() => {
        return (d: any) => {
            return d.type === "surf"
                ? (t: number) => `rgba(16,185,129,${1 - t})`   // Emerald/Cyan hue for surf
                : (t: number) => `rgba(99,102,241,${1 - t})`; // Deep Indigo/Purple for dive
        };
    }, []);

    const getTooltipHtml = (d: LocationData) => {
        const isSurf = d.type === "surf";
        const icon = isSurf ? "🌊" : "🤿";
        const title = isSurf ? "Surf" : "Dive";
        const colorClass = isSurf ? "color: #10b981;" : "color: #818cf8;"; // Emerald vs Indigo

        return `
      <div style="
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.1);
        padding: 8px 12px;
        border-radius: 8px;
        font-family: inherit;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      ">
        <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; ${colorClass}">
          ${icon} ${title}
        </div>
        <div style="font-size: 13px; color: #f1f5f9; margin-top: 2px;">
          ${d.name}
        </div>
      </div>
    `;
    };

    return (
        <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing">
            {dimensions.width > 0 && dimensions.height > 0 && (
                <Globe
                    ref={globeRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

                    atmosphereColor="rgba(99, 102, 241, 0.4)"
                    atmosphereAltitude={0.15}

                    ringsData={LOCATIONS}
                    ringLat="lat"
                    ringLng="lng"
                    ringColor={getRingColor}
                    ringMaxRadius={(d: any) => (d.type === "surf" ? 4 : 3)}
                    ringPropagationSpeed={2.5}
                    ringRepeatPeriod={1000}

                    // Invisible label dots layered over rings to act as hover targets
                    labelsData={LOCATIONS}
                    labelLat="lat"
                    labelLng="lng"
                    labelText={() => ""}
                    labelSize={0}
                    labelDotRadius={1.5}
                    labelColor={() => "rgba(255,255,255,0.01)"}
                    labelLabel={getTooltipHtml as any}
                    onLabelHover={(label: any) => setHoveredRing(label)}
                />
            )}
        </div>
    );
}
