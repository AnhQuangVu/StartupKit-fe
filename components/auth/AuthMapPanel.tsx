import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VIETNAM_ID = "704";
const HANOI: [number, number] = [105.8412, 21.0245];

export default function AuthMapPanel() {
    return (
        <div className="hidden lg:flex flex-col relative w-full h-full bg-[#F7F8FA] overflow-hidden">
            {/* World map */}
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
                                            default: {
                                                fill: isVN ? "#F4B400" : "#E0E2E8",
                                                fillOpacity: isVN ? 0.9 : 1,
                                                stroke: "#FFFFFF",
                                                strokeWidth: isVN ? 0.8 : 0.4,
                                                outline: "none",
                                            },
                                            hover: { fill: isVN ? "#F4B400" : "#D4D6DC", outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {/* Hanoi pulse */}
                    <Marker coordinates={HANOI}>
                        <circle r={0} fill="none" stroke="#F4B400" strokeWidth={1.5}>
                            <animate attributeName="r" values="5;16;5" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.2s" repeatCount="indefinite" />
                        </circle>
                        <circle r={4} fill="#F4B400" stroke="#FFFFFF" strokeWidth={1.2} />
                    </Marker>
                </ComposableMap>
            </div>

            {/* Overlay content: branding bottom-left */}
            <div className="relative z-10 mt-auto p-10">
                <div
                    className="bg-white/80 border border-[#EAEAEA] rounded-[12px] p-6 max-w-[340px]"
                    style={{ backdropFilter: "blur(8px)" }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                        <span className="text-[11px] font-semibold text-[#999999] uppercase tracking-widest">
                            Vietnam Startup Ecosystem
                        </span>
                    </div>
                    <p className="text-[15px] font-semibold text-[#111111] leading-[1.5] mb-4">
                        "The tools and network founders need to go global."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-[#F4B400]">SK</span>
                        </div>
                        <div>
                            <div className="text-[13px] font-semibold text-[#111111]">StartupKit Team</div>
                            <div className="text-[12px] text-[#999999]">Ho Chi Minh City, Vietnam</div>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-6 mt-6">
                    {[["500+", "Startups"], ["120+", "Mentors"], ["$12M+", "Raised"]].map(([n, l]) => (
                        <div key={l}>
                            <div className="text-[18px] font-bold text-[#111111]">{n}</div>
                            <div className="text-[11px] text-[#888888]">{l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
