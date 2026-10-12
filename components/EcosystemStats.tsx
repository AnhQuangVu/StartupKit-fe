"use client";

import { useDictionary } from "@/lib/dict-context";
import { 
    Rocket, 
    Landmark, 
    TrendingUp, 
    Building2, 
    Briefcase, 
    GraduationCap, 
    ShieldCheck, 
    CheckCircle2, 
    ArrowUpRight,
    Activity
} from "lucide-react";

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

    const categories = [
        {
            key: "Startups",
            label: LABELS["Startups"] ?? "Startups",
            count: "500+",
            delta: "+18% MoM",
            tag: "INNOVATION",
            sub: "Hồ sơ startup công nghệ tìm kiếm cố vấn & gọi vốn",
            badgeStyle: "bg-amber-50 text-amber-700 border-amber-200/60",
            icon: <Rocket className="w-5 h-5 text-amber-600" />,
            iconBg: "bg-amber-50 group-hover:bg-amber-100/80 text-amber-600",
        },
        {
            key: "Investors",
            label: LABELS["Investors"] ?? "Investors",
            count: "80+",
            delta: "+12 VCs Q1",
            tag: "CAPITAL",
            sub: "Quỹ đầu tư mạo hiểm VC & mạng lưới thiên thần",
            badgeStyle: "bg-blue-50 text-blue-700 border-blue-200/60",
            icon: <Landmark className="w-5 h-5 text-blue-600" />,
            iconBg: "bg-blue-50 group-hover:bg-blue-100/80 text-blue-600",
        },
        {
            key: "Accelerators",
            label: LABELS["Accelerators"] ?? "Accelerators",
            count: "24",
            delta: "Quốc tế & Nội địa",
            tag: "GROWTH",
            sub: "Vườn ươm doanh nghiệp & chương trình tăng tốc",
            badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
            icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
            iconBg: "bg-emerald-50 group-hover:bg-emerald-100/80 text-emerald-600",
        },
        {
            key: "Coworking",
            label: LABELS["Coworking"] ?? "Coworking",
            count: "65",
            delta: "3 Vùng kinh tế",
            tag: "SPACES",
            sub: "Không gian làm việc chung & trung tâm ươm tạo",
            badgeStyle: "bg-purple-50 text-purple-700 border-purple-200/60",
            icon: <Building2 className="w-5 h-5 text-purple-600" />,
            iconBg: "bg-purple-50 group-hover:bg-purple-100/80 text-purple-600",
        },
        {
            key: "Corporates",
            label: LABELS["Corporates"] ?? "Corporates",
            count: "40+",
            delta: "Tier 1 Partners",
            tag: "PARTNERS",
            sub: "Tập đoàn công nghệ & đối tác chiến lược đồng hành",
            badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
            icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
            iconBg: "bg-indigo-50 group-hover:bg-indigo-100/80 text-indigo-600",
        },
        {
            key: "Universities",
            label: LABELS["Universities"] ?? "Universities",
            count: "18",
            delta: "Top Viện & ĐH",
            tag: "TALENT",
            sub: "Đại học hàng đầu đào tạo nhân lực & R&D công nghệ",
            badgeStyle: "bg-cyan-50 text-cyan-700 border-cyan-200/60",
            icon: <GraduationCap className="w-5 h-5 text-cyan-600" />,
            iconBg: "bg-cyan-50 group-hover:bg-cyan-100/80 text-cyan-600",
        },
        {
            key: "Government",
            label: LABELS["Government"] ?? "Government",
            count: "12",
            delta: "Cơ quan bảo trợ",
            tag: "POLICY",
            sub: "Trung tâm Đổi mới sáng tạo & cơ quan hỗ trợ chính sách",
            badgeStyle: "bg-rose-50 text-rose-700 border-rose-200/60",
            icon: <ShieldCheck className="w-5 h-5 text-rose-600" />,
            iconBg: "bg-rose-50 group-hover:bg-rose-100/80 text-rose-600",
        },
    ];

    return (
        <section id="ecosystem" className="relative py-24 bg-[#FAFAFA] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-radial from-amber-400/10 via-amber-200/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {s.label}
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 font-normal">XÁC THỰC THỜI GIAN THỰC</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                            {s.title}
                        </h2>
                    </div>

                    <div className="max-w-md bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <Activity className="w-3.5 h-3.5 text-amber-600" />
                            Hạ Tầng Kết Nối Mở Toàn Diện
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Mạng lưới tích hợp đa chiều kết nối đồng bộ <strong className="text-gray-900 font-semibold">7 mắt xích cốt lõi</strong> của hệ sinh thái đổi mới sáng tạo Việt Nam.
                        </p>
                    </div>
                </div>

                {/* Modern Bento Taxonomy Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categories.slice(0, 4).map((cat, idx) => (
                        <div
                            key={cat.key}
                            className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl border border-gray-100 transition-colors ${cat.iconBg}`}>
                                        {cat.icon}
                                    </div>
                                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${cat.badgeStyle}`}>
                                        {cat.tag}
                                    </span>
                                </div>

                                <div className="flex items-baseline justify-between mb-1">
                                    <div className="text-3xl font-black text-[#111827] tracking-tight group-hover:text-amber-600 transition-colors">
                                        {cat.count}
                                    </div>
                                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {cat.delta}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-[#111827] mt-3 mb-1.5 flex items-center gap-1.5">
                                    {cat.label}
                                    <span className="text-[10px] text-gray-400 font-normal">#0{idx + 1}</span>
                                </h3>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {cat.sub}
                                </p>
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                                <span>Trạng thái: Hoạt động</span>
                                <span className="group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all">Khám phá →</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Remaining 3 Broad Bento Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {categories.slice(4).map((cat, idx) => (
                        <div
                            key={cat.key}
                            className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl border border-gray-100 transition-colors ${cat.iconBg}`}>
                                        {cat.icon}
                                    </div>
                                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${cat.badgeStyle}`}>
                                        {cat.tag}
                                    </span>
                                </div>

                                <div className="flex items-baseline justify-between mb-1">
                                    <div className="text-3xl font-black text-[#111827] tracking-tight group-hover:text-amber-600 transition-colors">
                                        {cat.count}
                                    </div>
                                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {cat.delta}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-[#111827] mt-3 mb-1.5 flex items-center gap-1.5">
                                    {cat.label}
                                    <span className="text-[10px] text-gray-400 font-normal">#0{idx + 5}</span>
                                </h3>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {cat.sub}
                                </p>
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                                <span>Trạng thái: Hoạt động</span>
                                <span className="group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all">Khám phá →</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3 High-Trust Institutional Scale Telemetry Bento Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Dark Institutional Card */}
                    <div className="relative bg-[#111827] text-white rounded-2xl p-7 border border-gray-800 shadow-[0_12px_35px_rgba(0,0,0,0.12)] flex flex-col justify-between overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    TIER 01 • INFRASTRUCTURE
                                </span>
                                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                </span>
                            </div>

                            <div className="text-4xl lg:text-5xl font-black text-amber-400 tracking-tight leading-none mb-3">
                                {s.scaleProfiles}
                            </div>
                            <div className="text-lg font-bold text-white mb-2">
                                {s.scaleProfilesLabel}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {s.scaleProfilesSub}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                            <span>Độ phủ dữ liệu 63 tỉnh thành</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>

                    {/* Card 2: High Concurrency Card */}
                    <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-gray-300 transition-all">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                                    TIER 02 • CONCURRENCY
                                </span>
                                <span className="text-xs text-amber-600 font-semibold">99.98% Uptime</span>
                            </div>

                            <div className="text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-none mb-3">
                                {s.scaleUsers}
                            </div>
                            <div className="text-lg font-bold text-[#111827] mb-2">
                                {s.scaleUsersLabel}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {s.scaleUsersSub}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <span>Độ trễ phản hồi &lt; 85ms</span>
                            <span className="font-mono text-gray-700 font-semibold">Low Latency</span>
                        </div>
                    </div>

                    {/* Card 3: National Reach Card */}
                    <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-gray-300 transition-all">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200/60">
                                    TIER 03 • NATIONAL FOCUS
                                </span>
                                <span className="text-xs text-emerald-600 font-semibold">Dedicated Hub</span>
                            </div>

                            <div className="text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-none mb-3">
                                {s.scaleNetwork}
                            </div>
                            <div className="text-lg font-bold text-[#111827] mb-2">
                                {s.scaleNetworkLabel}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {s.scaleNetworkSub}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <span>Chuẩn hóa theo khung pháp lý VN</span>
                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
