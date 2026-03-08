"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const GEO_FALLBACK_URL = "https://unpkg.com/world-atlas@2/countries-110m.json"; // secondary CDN
const VIETNAM_ID = "704";
const HANOI: [number, number] = [105.8412, 21.0245];
const HCMC: [number, number] = [106.6602, 10.7769];

type MapState =
    | { status: "loading" }
    | { status: "ready"; geoData: unknown }
    | { status: "error" };

async function fetchGeoWithFallback(): Promise<unknown> {
    // Try primary CDN first, then fallback
    for (const url of [GEO_URL, GEO_FALLBACK_URL]) {
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch {
            // Silently try next URL
        }
    }
    throw new Error("All CDN sources failed");
}

/** Fallback visual when map CDN is unavailable */
function MapFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#F9F9F7]">
            {/* Decorative dot grid */}
            <svg
                className="absolute inset-0 w-full h-full opacity-40"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#CCCCCC" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>

            {/* Radial glow behind Vietnam marker area */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 340,
                    height: 340,
                    top: "18%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "radial-gradient(circle, rgba(244,180,0,0.18) 0%, transparent 70%)",
                }}
            />

            {/* Simplified Vietnam silhouette placeholder */}
            <div className="relative flex flex-col items-center" style={{ marginTop: "-80px" }}>
                <svg
                    viewBox="0 0 80 160"
                    width="80"
                    height="160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md"
                >
                    {/* Rough Vietnam shape */}
                    <path
                        d="M38 4 C30 6 22 14 18 24 C14 34 16 46 20 54 C24 62 20 70 18 80 C16 90 14 100 18 110 C22 120 28 130 36 138 C40 142 44 148 48 152 C52 148 56 140 58 132 C62 122 60 112 56 104 C52 96 54 88 56 80 C58 72 62 64 60 54 C58 44 62 34 58 24 C54 14 46 6 38 4Z"
                        fill="#F4B400"
                        fillOpacity="0.9"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                    />
                </svg>

                {/* Hanoi pulse dot */}
                <div
                    className="absolute"
                    style={{ top: 38, left: "50%", transform: "translateX(-50%)" }}
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4B400] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F4B400] border-2 border-white" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function EcosystemMapHero() {
    const dict = useDictionary();
    const h = dict.hero;

    const [mapState, setMapState] = useState<MapState>({ status: "loading" });

    useEffect(() => {
        let cancelled = false;
        fetchGeoWithFallback()
            .then((data) => {
                if (!cancelled) setMapState({ status: "ready", geoData: data });
            })
            .catch(() => {
                if (!cancelled) setMapState({ status: "error" });
            });
        return () => { cancelled = true; };
    }, []);

    return (
        <section
            className="relative w-full bg-white overflow-hidden"
            style={{ height: "90vh", minHeight: "580px", paddingTop: "72px" }}
        >
            {/* Layer 1: World Map or Fallback */}
            <div className="absolute inset-0">
                {mapState.status === "loading" && (
                    // Skeleton shimmer while fetching
                    <div className="w-full h-full bg-[#F0F0F0] animate-pulse" />
                )}

                {mapState.status === "error" && <MapFallback />}

                {mapState.status === "ready" && (
                    <ComposableMap
                        projection="geoNaturalEarth1"
                        projectionConfig={{ rotate: [-108, -12, 0], scale: 170 }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <Geographies geography={mapState.geoData as object}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isVN = geo.id === VIETNAM_ID;
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                default: {
                                                    fill: isVN ? "#F4B400" : "#E5E5E5",
                                                    fillOpacity: isVN ? 0.92 : 1,
                                                    stroke: "#FFFFFF",
                                                    strokeWidth: isVN ? 0.8 : 0.5,
                                                    outline: "none",
                                                },
                                                hover: { fill: isVN ? "#F4B400" : "#D8D8D8", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        <Marker coordinates={HANOI}>
                            <circle r={0} fill="none" stroke="#F4B400" strokeWidth={1.5}>
                                <animate attributeName="r" values="5;16;5" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.2s" repeatCount="indefinite" />
                            </circle>
                            <circle r={4} fill="#F4B400" stroke="#FFFFFF" strokeWidth={1.2} />
                        </Marker>

                        <Marker coordinates={HCMC}>
                            <circle r={3.5} fill="#F4B400" stroke="#FFFFFF" strokeWidth={1} />
                        </Marker>
                    </ComposableMap>
                )}
            </div>

            {/* Layer 2: White panel behind text */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10"
                style={{ height: "46%", backgroundColor: "rgba(255,255,255,0.72)" }}
            />

            {/* Layer 3: Vietnam badge (desktop) */}
            <div
                className="absolute z-20 hidden md:flex items-center gap-1.5 bg-[#111111] text-white rounded-[8px] px-3 py-1.5"
                style={{ top: "30%", left: "59%" }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] shrink-0" />
                <span className="text-[11px] font-semibold whitespace-nowrap">{h.badge}</span>
            </div>

            {/* Layer 4: Text overlay */}
            <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center text-center px-6 pb-12">
                <div className="max-w-[580px]">
                    {/* Mobile badge */}
                    <div className="md:hidden inline-flex items-center gap-1.5 bg-[#111111] text-white rounded-[8px] px-3 py-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] inline-block" />
                        <span className="text-[11px] font-semibold">{h.badge}</span>
                    </div>

                    <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        {h.powered}
                    </p>

                    <div className="relative flex items-start justify-center">
                        <span
                            className="hidden md:block absolute -left-6 top-2 w-[3px] rounded-full bg-[#F4B400]"
                            style={{ height: "calc(100% - 8px)" }}
                        />
                        <h1 className="text-[40px] md:text-[54px] font-bold text-[#111111] leading-[1.1]">
                            {h.title1}
                            <br />
                            {h.title2}
                        </h1>
                    </div>

                    <div className="flex justify-center mt-3 mb-3">
                        <div className="w-[60px] h-[2px] bg-[#F4B400] rounded-full" />
                    </div>

                    <p className="text-[13px] font-medium text-[#888888] mb-4 leading-[1.6]">{h.ai}</p>
                    <p className="text-[16px] text-[#555555] leading-[1.7] mb-8">{h.sub}</p>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <a
                            href="#ecosystem"
                            className="inline-flex items-center gap-2 bg-[#111111] text-white text-[15px] font-semibold px-7 py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
                        >
                            {h.cta1}
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F4B400] text-[#111111]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path
                                        d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </a>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 bg-white border border-[#CCCCCC] text-[#111111] text-[15px] font-semibold px-7 py-3 rounded-[8px] hover:border-[#111111] transition-colors"
                        >
                            {h.cta2}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}