"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { 
    Rocket, 
    Compass, 
    TrendingUp, 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    Star, 
    Calendar, 
    SlidersHorizontal,
    FileText
} from "lucide-react";

export default function RoleEcosystem() {
    const dict = useDictionary();
    const r = dict.roles;

    const rolesData = [
        {
            id: "startup",
            label: r.startup.label,
            tagline: r.startup.tagline,
            features: [r.startup.f1, r.startup.f2, r.startup.f3],
            cta: r.startup.cta,
            href: "/register?role=startup",
            badge: "FOR FOUNDERS",
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
            icon: <Rocket className="w-5 h-5 text-amber-600" />,
            preview: (
                <div className="w-full bg-white border border-gray-200/90 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-left">
                    <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-gray-900">EcoCharge AI</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                            Pre-A • $500K
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50/80 rounded-lg border border-gray-100 text-xs mb-3">
                        <div>
                            <span className="text-[10px] text-gray-500 block">MRR Tăng Trưởng</span>
                            <span className="font-bold text-emerald-700 font-mono">$24.5K (+32%)</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-500 block">SCI Uy Tín</span>
                            <span className="font-bold text-amber-600 font-mono">92/100 (Tier 1)</span>
                        </div>
                    </div>

                    <div className="space-y-1 mb-2">
                        <div className="flex justify-between text-[11px] text-gray-500">
                            <span>Tiến độ cam kết vòng gọi</span>
                            <span className="font-semibold text-gray-900">76%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "76%" }} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                            <FileText className="w-3 h-3 text-amber-600" /> VC Memo v2.4 Ready
                        </span>
                        <span className="text-emerald-600 font-semibold">12 VCs Reviewing</span>
                    </div>
                </div>
            ),
        },
        {
            id: "mentor",
            label: r.mentor.label,
            tagline: r.mentor.tagline,
            features: [r.mentor.f1, r.mentor.f2, r.mentor.f3],
            cta: r.mentor.cta,
            href: "/register?role=mentor",
            badge: "FOR EXPERTS",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
            icon: <Compass className="w-5 h-5 text-blue-600" />,
            preview: (
                <div className="w-full bg-white border border-gray-200/90 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-left">
                    <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">
                                TM
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">Dr. Tu Tran Minh</div>
                                <div className="text-[10px] text-gray-500">Ex-VP Product • Fintech</div>
                            </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> 4.95
                        </span>
                    </div>

                    <div className="p-2 bg-gray-50/80 rounded-lg border border-gray-100 text-xs mb-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-blue-600" /> Phiên tư vấn kế tiếp:
                            </span>
                            <span className="font-semibold text-gray-900">Thứ Năm 15:00</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-[9px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">GTM Strategy</span>
                            <span className="text-[9px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Unit Economics</span>
                            <span className="text-[9px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Fundraising Deck</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                            <ShieldCheck className="w-3 h-3 text-blue-600" /> Đã xác thực KYC
                        </span>
                        <span className="text-blue-600 font-semibold">42 Phiên hoàn thành</span>
                    </div>
                </div>
            ),
        },
        {
            id: "investor",
            label: r.investor.label,
            tagline: r.investor.tagline,
            features: [r.investor.f1, r.investor.f2, r.investor.f3],
            cta: r.investor.cta,
            href: "/register?role=investor",
            badge: "FOR CAPITAL",
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
            icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
            preview: (
                <div className="w-full bg-white border border-gray-200/90 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-left">
                    <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-xs font-bold text-gray-900">Khẩu Vị Đầu Tư</span>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/60">
                            Seed - Pre-A
                        </span>
                    </div>

                    <div className="p-2 bg-gray-50/80 rounded-lg border border-gray-100 text-xs mb-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500">Quy mô vé đầu tư:</span>
                            <span className="font-bold text-gray-900 font-mono">$50,000 - $300,000</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500">Khớp lệnh tự động:</span>
                            <span className="font-bold text-emerald-700 font-mono">96% Phù Hợp</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                            <Sparkles className="w-3 h-3 text-emerald-600" /> Deal Room Bảo Mật
                        </span>
                        <span className="text-emerald-700 font-semibold">18 Term Sheets</span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {r.label}
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 font-normal">HỆ SINH THÁI 3 TRỤ CỘT</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                        {r.title1}
                        <br />
                        <span className="relative inline-block text-[#111827]">
                            {r.title2}
                            <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-amber-300/40 -z-10 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-base text-gray-600 mt-4 leading-relaxed">
                        {r.sub}
                    </p>
                </div>

                {/* 3 High-Impact Role Studio Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rolesData.map((role) => (
                        <div
                            key={role.id}
                            className="group relative bg-white border border-gray-200/90 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
                        >
                            {/* Card Top */}
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${role.badgeColor}`}>
                                        {role.badge}
                                    </span>
                                    <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-amber-50 group-hover:border-amber-200/60 transition-colors">
                                        {role.icon}
                                    </div>
                                </div>

                                {/* Micro Product Interface Preview */}
                                <div className="my-3 p-3 bg-gray-50/70 border border-gray-200/70 rounded-xl">
                                    {role.preview}
                                </div>

                                <div className="mt-5">
                                    <h3 className="text-2xl font-black text-[#111827] tracking-tight">
                                        {role.label}
                                    </h3>
                                    <div className="text-xs font-bold text-amber-600 tracking-wide mt-1">
                                        {role.tagline}
                                    </div>
                                </div>

                                {/* Feature checklist with clean Lucide checkmarks */}
                                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
                                    {role.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-600 leading-relaxed">
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card CTA */}
                            <div className="mt-8 pt-4">
                                <Link
                                    href={role.href}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#111827] text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-200 hover:bg-amber-500 hover:text-gray-950 shadow-sm hover:shadow-md"
                                >
                                    {role.cta}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
