"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useDictionary } from "@/lib/dict-context";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VIETNAM_ID = "704";
const HANOI: [number, number] = [105.8412, 21.0245];
const HCMC: [number, number] = [106.6602, 10.7769];

export default function EcosystemMapHero() {
    const dict = useDictionary();
    const h = dict.hero;

    return (
        <section
            className="relative w-full bg-white overflow-hidden"
            style={{ height: "90vh", minHeight: "580px", paddingTop: "72px" }}
        >
            {/* Layer 1: World Map */}
            <div className="absolute inset-0">
                <ComposableMap
                    projection="geoNaturalEarth1"
                    projectionConfig={{ rotate: [-108, -12, 0], scale: 170 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isVN = geo.id === VIETNAM_ID;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: { fill: isVN ? "#F4B400" : "#E5E5E5", fillOpacity: isVN ? 0.92 : 1, stroke: "#FFFFFF", strokeWidth: isVN ? 0.8 : 0.5, outline: "none" },
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
            </div>

            {/* Layer 2: White panel behind text */}
            <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: "46%", backgroundColor: "rgba(255,255,255,0.72)" }} />

            {/* Layer 3: Vietnam badge (desktop) */}
            <div className="absolute z-20 hidden md:flex items-center gap-1.5 bg-[#111111] text-white rounded-[8px] px-3 py-1.5" style={{ top: "30%", left: "59%" }}>
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

                    <p className="text-[12px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">{h.powered}</p>

                    <div className="relative flex items-start justify-center">
                        <span className="hidden md:block absolute -left-6 top-2 w-[3px] rounded-full bg-[#F4B400]" style={{ height: "calc(100% - 8px)" }} />
                        <h1 className="text-[40px] md:text-[54px] font-bold text-[#111111] leading-[1.1]">
                            {h.title1}<br />{h.title2}
                        </h1>
                    </div>

                    <div className="flex justify-center mt-3 mb-3">
                        <div className="w-[60px] h-[2px] bg-[#F4B400] rounded-full" />
                    </div>

                    <p className="text-[13px] font-medium text-[#888888] mb-4 leading-[1.6]">{h.ai}</p>
                    <p className="text-[16px] text-[#555555] leading-[1.7] mb-8">{h.sub}</p>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <a href="#ecosystem" className="inline-flex items-center gap-2 bg-[#111111] text-white text-[15px] font-semibold px-7 py-3 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                            {h.cta1}
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F4B400] text-[#111111]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </a>
                        <a href="/register" className="inline-flex items-center gap-2 bg-white border border-[#CCCCCC] text-[#111111] text-[15px] font-semibold px-7 py-3 rounded-[8px] hover:border-[#111111] transition-colors">
                            {h.cta2}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
