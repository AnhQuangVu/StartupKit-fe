"use client";

import { useDictionary } from "@/lib/dict-context";

const categories = [
    {
        label: "Startups",
        count: "500+",
        tag: "INNOVATION",
        sub: "Hồ sơ startup công nghệ tìm kiếm cố vấn & gọi vốn",
        color: "bg-[#FFF8E1] text-[#B37700]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,6 42,16 24,26 6,16" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="6,16 24,26 24,38 6,28" fill="#F7F7F7" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,26 42,16 42,28 24,38" fill="#EAEAEA" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="16" r="3.5" fill="#F4B400" />
            </svg>
        ),
    },
    {
        label: "Investors",
        count: "80+",
        tag: "CAPITAL",
        sub: "Quỹ đầu tư mạo hiểm VC & mạng lưới thiên thần",
        color: "bg-[#111111] text-[#F4B400]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,6 42,16 24,26 6,16" fill="#FFFDF5" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="6,16 24,26 24,38 6,28" fill="#FFF8E1" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,26 42,16 42,28 24,38" fill="#F4B400" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <path d="M16 16 L24 11 L32 16" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Accelerators",
        count: "24",
        tag: "GROWTH",
        sub: "Vườn ươm doanh nghiệp & chương trình tăng tốc",
        color: "bg-[#F7F7F7] text-[#111111]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,8 40,17 24,26 8,17" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="8,17 24,26 24,37 8,28" fill="#F7F7F7" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,26 40,17 40,28 24,37" fill="#EAEAEA" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <path d="M24 13 L24 19 M21 16 L27 16" stroke="#F4B400" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Coworking",
        count: "65",
        tag: "SPACES",
        sub: "Không gian làm việc chung & trung tâm ươm tạo",
        color: "bg-[#F7F7F7] text-[#111111]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,8 39,16 24,24 9,16" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="9,16 24,24 24,36 9,28" fill="#F7F7F7" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,24 39,16 39,28 24,36" fill="#EAEAEA" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <rect x="20" y="13" width="8" height="6" fill="#111111" rx="1.5" />
            </svg>
        ),
    },
    {
        label: "Corporates",
        count: "40+",
        tag: "PARTNERS",
        sub: "Tập đoàn công nghệ & đối tác chiến lược đồng hành",
        color: "bg-[#111111] text-white",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,6 42,16 24,26 6,16" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="6,16 24,26 24,38 6,28" fill="#111111" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,26 42,16 42,28 24,38" fill="#333333" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <line x1="24" y1="13" x2="24" y2="18" stroke="#F4B400" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Universities",
        count: "18",
        tag: "TALENT",
        sub: "Đại học hàng đầu đào tạo nhân lực & R&D công nghệ",
        color: "bg-[#F7F7F7] text-[#111111]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,7 40,16 24,25 8,16" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="8,16 24,25 24,37 8,28" fill="#F7F7F7" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,25 40,16 40,28 24,37" fill="#EAEAEA" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 16 L24 19 L30 16" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Government",
        count: "12",
        tag: "POLICY",
        sub: "Trung tâm Đổi mới sáng tạo & cơ quan hỗ trợ chính sách",
        color: "bg-[#FFF8E1] text-[#B37700]",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <polygon points="24,8 39,16 24,24 9,16" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="9,16 24,24 24,36 9,28" fill="#F7F7F7" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="24,24 39,16 39,28 24,36" fill="#EAEAEA" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="24" cy="16" r="3.5" fill="#111111" stroke="#F4B400" strokeWidth="1.5" />
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
        <section id="ecosystem" className="relative py-28 bg-[#FAFAFA] border-t-2 border-[#111111] overflow-hidden iso-scanline">
            {/* 3D Isometric Background Patterns */}
            <div className="absolute inset-0 iso-grid-bg opacity-50 pointer-events-none" />

            {/* Ambient Breathing Gold Halo */}
            <div
                className="absolute top-1/2 left-1/4 w-[600px] h-[400px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.12) 0%, transparent 70%)",
                }}
            />

            {/* Ambient 3D floating shapes in background */}
            <div className="absolute top-12 right-16 iso-float pointer-events-none opacity-25 hidden xl:block">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                    <polygon points="48,10 88,32 48,54 8,32" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
                    <polygon points="8,32 48,54 48,84 8,62" fill="#F4B400" stroke="#111111" strokeWidth="2" />
                    <polygon points="48,54 88,32 88,62 48,84" fill="#111111" stroke="#111111" strokeWidth="2" />
                </svg>
            </div>

            <div className="absolute bottom-16 left-12 iso-float-reverse pointer-events-none opacity-20 hidden xl:block">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <polygon points="36,8 64,24 36,40 8,24" fill="#F7F7F7" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="8,24 36,40 36,64 8,48" fill="#111111" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="36,40 64,24 64,48 36,64" fill="#EAEAEA" stroke="#111111" strokeWidth="1.8" />
                </svg>
            </div>

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-18 gap-8">
                    <div className="max-w-[640px]">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white border-2 border-[#111111] rounded-[8px] mb-4 text-[13px] font-black text-[#D99B00] uppercase tracking-wider iso-btn shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                            {s.label}
                        </div>
                        <h2 className="text-[34px] md:text-[46px] font-black text-[#111111] leading-[1.14] tracking-tight">
                            {s.title}
                        </h2>
                    </div>

                    <div className="text-[14px] text-[#555555] max-w-[420px] bg-white p-5 rounded-[12px] border-2 border-[#111111] iso-card-3d leading-relaxed">
                        <span className="font-bold text-[#111111]">Mạng lưới kết nối không gian mở</span> kết nối đồng bộ 7 thành phần trọng yếu của hệ sinh thái khởi nghiệp sáng tạo Việt Nam.
                    </div>
                </div>

                {/* Big, Roomy 3D Isometric Station Blocks (3-Column & 4-Column Balanced Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.slice(0, 4).map((cat, idx) => (
                        <div
                            key={cat.label}
                            className="bg-white border-2 border-[#111111] rounded-[14px] p-7 flex flex-col justify-between iso-card-3d group cursor-pointer"
                        >
                            {/* Card Top: Code and Tag */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[11px] font-mono font-bold tracking-wider text-[#999999]">
                                    STATION 0{idx + 1}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${cat.color}`}>
                                    {cat.tag}
                                </span>
                            </div>

                            {/* 3D Isometric Icon & Stat Count */}
                            <div className="my-3 flex items-center justify-between">
                                <div className="text-[40px] font-black text-[#111111] leading-none group-hover:text-[#D99B00] transition-colors">
                                    {cat.count}
                                </div>
                                <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-115">
                                    {cat.icon}
                                </div>
                            </div>

                            {/* Label & Description */}
                            <div className="pt-4 border-t border-[#F0F0F0]">
                                <h3 className="text-[18px] font-extrabold text-[#111111] mb-1">
                                    {LABELS[cat.label] ?? cat.label}
                                </h3>
                                <p className="text-[12px] text-[#666666] leading-relaxed">
                                    {cat.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Remaining 3 Categories in 3 Larger, Expansive Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {categories.slice(4).map((cat, idx) => (
                        <div
                            key={cat.label}
                            className="bg-white border-2 border-[#111111] rounded-[14px] p-7 flex flex-col justify-between iso-card-3d group cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[11px] font-mono font-bold tracking-wider text-[#999999]">
                                    STATION 0{idx + 5}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${cat.color}`}>
                                    {cat.tag}
                                </span>
                            </div>

                            <div className="my-3 flex items-center justify-between">
                                <div className="text-[40px] font-black text-[#111111] leading-none group-hover:text-[#D99B00] transition-colors">
                                    {cat.count}
                                </div>
                                <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-115">
                                    {cat.icon}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#F0F0F0]">
                                <h3 className="text-[18px] font-extrabold text-[#111111] mb-1">
                                    {LABELS[cat.label] ?? cat.label}
                                </h3>
                                <p className="text-[12px] text-[#666666] leading-relaxed">
                                    {cat.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grand 3-Level Isometric Architectural Platforms */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            n: s.scaleProfiles, 
                            l: s.scaleProfilesLabel, 
                            sub: s.scaleProfilesSub,
                            tier: "TIER 01 • INFRASTRUCTURE",
                            style: "bg-[#111111] text-white border-2 border-[#111111] iso-card-dark",
                            tagStyle: "bg-[#222222] text-[#F4B400]",
                            numColor: "text-[#F4B400]",
                            textColor: "text-white",
                            subColor: "text-[#AAAAAA]",
                        },
                        { 
                            n: s.scaleUsers, 
                            l: s.scaleUsersLabel, 
                            sub: s.scaleUsersSub,
                            tier: "TIER 02 • CONCURRENCY",
                            style: "bg-[#FFFDF5] border-2 border-[#111111] text-[#111111] iso-card-3d",
                            tagStyle: "bg-[#FFF8E1] border border-[#F4B400] text-[#B37700]",
                            numColor: "text-[#111111]",
                            textColor: "text-[#111111]",
                            subColor: "text-[#666666]",
                        },
                        { 
                            n: s.scaleNetwork, 
                            l: s.scaleNetworkLabel, 
                            sub: s.scaleNetworkSub,
                            tier: "TIER 03 • NATIONAL REACH",
                            style: "bg-white border-2 border-[#111111] text-[#111111] iso-card-3d",
                            tagStyle: "bg-[#F7F7F7] text-[#111111]",
                            numColor: "text-[#111111]",
                            textColor: "text-[#111111]",
                            subColor: "text-[#666666]",
                        },
                    ].map((sc) => (
                        <div
                            key={sc.l}
                            className={`rounded-[14px] p-8 flex flex-col justify-between ${sc.style}`}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-[4px] ${sc.tagStyle}`}>
                                    {sc.tier}
                                </span>
                                <div className="w-3 h-3 rounded-full bg-[#F4B400]" />
                            </div>

                            <div>
                                <div className={`text-[46px] font-black tracking-tight leading-none mb-3 ${sc.numColor}`}>
                                    {sc.n}
                                </div>
                                <div className={`text-[17px] font-extrabold mb-2 ${sc.textColor}`}>
                                    {sc.l}
                                </div>
                                <div className={`text-[14px] leading-relaxed ${sc.subColor}`}>
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
