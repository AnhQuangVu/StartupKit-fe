"use client";

import { useDictionary } from "@/lib/dict-context";

const categories = [
    {
        label: "Startups",
        count: "500+",
        tag: "Active",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                {/* Isometric Cube / Module */}
                <polygon points="16,4 28,11 16,18 4,11" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="4,11 16,18 16,28 4,21" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,18 28,11 28,21 16,28" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="16" cy="11" r="2" fill="#F4B400" />
            </svg>
        ),
    },
    {
        label: "Investors",
        count: "80+",
        tag: "Capital",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,5 27,11 16,17 5,11" fill="#FFFDF5" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="5,11 16,17 16,27 5,21" fill="#FFF8E1" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,17 27,11 27,21 16,27" fill="#F4B400" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M11 11 L16 8 L21 11" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Accelerators",
        count: "24",
        tag: "Scale",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,6 26,12 16,18 6,12" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="6,12 16,18 16,26 6,20" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,18 26,12 26,20 16,26" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M16 10 L16 14 M14 12 L18 12" stroke="#F4B400" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Coworking",
        count: "65",
        tag: "Space",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,7 25,12 16,17 7,12" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="7,12 16,17 16,25 7,20" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,17 25,12 25,20 16,25" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <rect x="13" y="10" width="6" height="4" fill="#111111" rx="1" />
            </svg>
        ),
    },
    {
        label: "Corporates",
        count: "40+",
        tag: "Partners",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,4 27,10 16,16 5,10" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="5,10 16,16 16,28 5,22" fill="#111111" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,16 27,10 27,22 16,28" fill="#333333" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <line x1="16" y1="9" x2="16" y2="11" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Universities",
        count: "18",
        tag: "Talent",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,5 26,11 16,17 6,11" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="6,11 16,17 16,26 6,20" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,17 26,11 26,20 16,26" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M12 11 L16 13 L20 11" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Government",
        count: "12",
        tag: "Policy",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="16,6 26,12 16,18 6,12" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="6,12 16,18 16,26 6,20" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <polygon points="16,18 26,12 26,20 16,26" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="16" cy="12" r="2.5" fill="#111111" stroke="#F4B400" strokeWidth="1" />
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
        <section id="ecosystem" className="relative py-24 bg-[#FAFAFA] border-t border-[#EAEAEA] overflow-hidden">
            {/* Subtle isometric grid pattern */}
            <div className="absolute inset-0 iso-grid-bg opacity-40 pointer-events-none" />

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-[560px]">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                            {s.label}
                        </div>
                        <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
                            {s.title}
                        </h2>
                    </div>

                    <div className="text-[13px] text-[#666666] max-w-[320px] bg-white p-3.5 rounded-[8px] border border-[#EAEAEA] iso-card-3d">
                        <span className="font-semibold text-[#111111]">Mạng lưới kết nối đa chiều</span> với cấu trúc dữ liệu chuẩn hóa cho toàn thị trường khởi nghiệp Việt Nam.
                    </div>
                </div>

                {/* Isometric Modular Stat Pedestals */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map((cat, idx) => (
                        <div
                            key={cat.label}
                            className="bg-white border-2 border-[#111111] rounded-[10px] p-5 flex flex-col items-center justify-between text-center iso-card-3d group cursor-pointer"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            {/* Top mini-tag */}
                            <div className="w-full flex justify-between items-center mb-2">
                                <span className="text-[9px] font-mono font-bold uppercase text-[#999999] tracking-wider">
                                    0{idx + 1}
                                </span>
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-[4px] bg-[#F4B400]/15 text-[#B37700]">
                                    {cat.tag}
                                </span>
                            </div>

                            {/* Isometric SVG Icon */}
                            <div className="my-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                                {cat.icon}
                            </div>

                            {/* Stat count and label */}
                            <div className="w-full pt-2 border-t border-[#F0F0F0]">
                                <div className="text-[24px] font-black text-[#111111] leading-none mb-1 group-hover:text-[#D99B00] transition-colors">
                                    {cat.count}
                                </div>
                                <div className="text-[12px] font-semibold text-[#555555]">
                                    {LABELS[cat.label] ?? cat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Isometric Scale Highlights (3-Level Stepped Platforms) */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { 
                            n: s.scaleProfiles, 
                            l: s.scaleProfilesLabel, 
                            sub: s.scaleProfilesSub,
                            tier: "Tier 01",
                            accent: "bg-[#111111] text-white"
                        },
                        { 
                            n: s.scaleUsers, 
                            l: s.scaleUsersLabel, 
                            sub: s.scaleUsersSub,
                            tier: "Tier 02",
                            accent: "bg-[#FFFDF5] border-[#F4B400] text-[#111111]"
                        },
                        { 
                            n: s.scaleNetwork, 
                            l: s.scaleNetworkLabel, 
                            sub: s.scaleNetworkSub,
                            tier: "Tier 03",
                            accent: "bg-white text-[#111111]"
                        },
                    ].map((sc, i) => (
                        <div
                            key={sc.l}
                            className={`border-2 border-[#111111] rounded-[10px] p-7 flex flex-col justify-between iso-card-3d ${
                                i === 0 ? "bg-[#111111] text-white" : "bg-white text-[#111111]"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${
                                    i === 0 ? "bg-[#222222] text-[#F4B400]" : "bg-[#F7F7F7] text-[#111111]"
                                }`}>
                                    {sc.tier}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[#F4B400]" />
                            </div>

                            <div>
                                <div className={`text-[36px] font-extrabold tracking-tight leading-none mb-2 ${
                                    i === 0 ? "text-[#F4B400]" : "text-[#111111]"
                                }`}>
                                    {sc.n}
                                </div>
                                <div className={`text-[15px] font-bold mb-1.5 ${
                                    i === 0 ? "text-white" : "text-[#111111]"
                                }`}>
                                    {sc.l}
                                </div>
                                <div className={`text-[13px] leading-relaxed ${
                                    i === 0 ? "text-[#AAAAAA]" : "text-[#666666]"
                                }`}>
                                    {sc.sub}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
