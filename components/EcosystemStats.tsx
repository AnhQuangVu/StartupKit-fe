"use client";
import { useDictionary } from "@/lib/dict-context";

const categories = [
    {
        label: "Startups",
        count: "500+",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4 L22 10 L22 20 L14 24 L6 20 L6 10 Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M14 4 L14 24M6 10 L22 10M6 20 L22 20" stroke="#111111" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
        ),
    },
    {
        label: "Investors",
        count: "80+",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 20 L10 14 L14 17 L19 10 L23 13" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="23" cy="10" r="2.5" stroke="#111111" strokeWidth="1.5" fill="none" />
            </svg>
        ),
    },
    {
        label: "Accelerators",
        count: "24",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 5 C18 5 22 8 22 13 C22 18 18 22 13 22 C9 22 6 19 6 15" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M14 5 L17 8 M14 5 L11 8" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Coworking",
        count: "65",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="8" width="18" height="14" rx="2" stroke="#111111" strokeWidth="1.5" fill="none" />
                <path d="M9 8 L9 6 M14 8 L14 6 M19 8 L19 6" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 14 L19 14 M9 17 L15 17" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
            </svg>
        ),
    },
    {
        label: "Corporates",
        count: "40+",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="6" y="6" width="16" height="16" rx="2" stroke="#111111" strokeWidth="1.5" fill="none" />
                <path d="M10 10 L18 10 M10 14 L18 14 M10 18 L14 18" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
            </svg>
        ),
    },
    {
        label: "Universities",
        count: "18",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 5 L24 10 L14 15 L4 10 Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M8 13 L8 20 C8 22 11 23 14 23 C17 23 20 22 20 20 L20 13" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M24 10 L24 16" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Government",
        count: "12",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 22 L23 22" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 22 L7 14 M11 22 L11 14 M17 22 L17 14 M21 22 L21 14" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M5 14 L23 14" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 6 L23 11 L5 11 Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            </svg>
        ),
    },
];

export default function EcosystemStats() {
    const dict = useDictionary();
    const s = dict.stats;
    const LABELS: Record<string, string> = {
        "Startups": s.startups,
        "Investors": s.investors,
        "Accelerators": s.accelerators,
        "Coworking": s.coworking,
        "Corporates": s.corporates,
        "Universities": s.universities,
        "Government": s.government,
    };
    return (
        <section id="ecosystem" className="py-20 bg-white border-t border-[#EAEAEA]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-14 max-w-[500px]">
                    <p className="text-[13px] font-semibold text-[#F4B400] uppercase tracking-widest mb-3">
                        {s.label}
                    </p>
                    <h2 className="text-[32px] md:text-[38px] font-bold text-[#111111] leading-[1.2]">
                        {s.title}
                    </h2>
                </div>

                {/* Icon Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-px border border-[#EAEAEA] rounded-[8px] overflow-hidden">
                    {categories.map((cat) => (
                        <div
                            key={cat.label}
                            className="flex flex-col items-center gap-3 px-4 py-8 bg-white hover:bg-[#F7F7F7] transition-colors group cursor-default"
                        >
                            <div className="opacity-70 group-hover:opacity-100 transition-opacity">{cat.icon}</div>
                            <div className="text-center">
                                <div className="text-[22px] font-bold text-[#111111] leading-none mb-1">{cat.count}</div>
                                <div className="text-[12px] text-[#888888] font-medium">{LABELS[cat.label] ?? cat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scale stats */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px border border-[#EAEAEA] rounded-[8px] overflow-hidden">
                    {[
                        { n: s.scaleProfiles, l: s.scaleProfilesLabel, sub: s.scaleProfilesSub },
                        { n: s.scaleUsers, l: s.scaleUsersLabel, sub: s.scaleUsersSub },
                        { n: s.scaleNetwork, l: s.scaleNetworkLabel, sub: s.scaleNetworkSub },
                    ].map((sc) => (
                        <div key={sc.l} className="flex flex-col gap-1 px-8 py-6 bg-white">
                            <div className="text-[26px] font-bold text-[#111111]">{sc.n}</div>
                            <div className="text-[13px] font-semibold text-[#333333]">{sc.l}</div>
                            <div className="text-[12px] text-[#999999] leading-[1.5] mt-0.5">{sc.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
