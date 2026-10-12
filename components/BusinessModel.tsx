"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { 
    CheckCircle2, 
    Sparkles, 
    ArrowRight, 
    Coins, 
    ShieldCheck, 
    Zap 
} from "lucide-react";

export default function BusinessModel() {
    const dict = useDictionary();
    const bm = dict.business;

    const tiers = [
        {
            name: bm.freeName,
            desc: bm.freeDesc,
            features: [bm.freeF1, bm.freeF2, bm.freeF3, bm.freeF4],
            cta: bm.freeCta,
            href: "/register",
            highlight: false,
            badge: "TIER 01: STANDARD MEMBERSHIP",
            price: "Miễn Phí",
            priceSub: "Khởi tạo hồ sơ & tham gia hệ sinh thái",
        },
        {
            name: bm.premName,
            desc: bm.premDesc,
            features: [bm.premF1, bm.premF2, bm.premF3, bm.premF4],
            cta: bm.premCta,
            href: "/register?plan=pro",
            highlight: true,
            badge: "TIER 02: VENTURE PRO & INSTITUTIONAL",
            price: "10% Thành Công",
            priceSub: "Zero upfront fee • Chỉ trả khi giải ngân thành công",
        },
    ];

    return (
        <section id="pricing" className="relative py-28 bg-[#FAFAFA] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-18 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {bm.label}
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 font-normal">MINH BẠCH & ĐỒNG HÀNH</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                        {bm.title1}
                        <br />
                        <span className="relative inline-block text-[#111827]">
                            {bm.title2}
                            <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-amber-300/40 -z-10 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-base text-gray-600 mt-4 leading-relaxed">
                        {bm.sub}
                    </p>
                </div>

                {/* 2 Institutional Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-2xl p-8 md:p-9 border transition-all duration-300 flex flex-col justify-between ${
                                tier.highlight
                                    ? "bg-[#111827] border-amber-500/40 text-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] relative overflow-hidden"
                                    : "bg-white border-gray-200/90 text-[#111827] shadow-sm hover:border-gray-300 hover:shadow-md"
                            }`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                            )}

                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className={`text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-md ${
                                        tier.highlight ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "bg-gray-100 text-gray-700"
                                    }`}>
                                        {tier.badge}
                                    </span>
                                    {tier.highlight ? (
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                    ) : (
                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                                    )}
                                </div>

                                <div className={`text-2xl font-black uppercase tracking-tight mb-2 ${
                                    tier.highlight ? "text-amber-400" : "text-[#111827]"
                                }`}>
                                    {tier.name}
                                </div>

                                <div className="mb-4">
                                    <div className={`text-3xl font-black font-mono tracking-tight ${
                                        tier.highlight ? "text-white" : "text-[#111827]"
                                    }`}>
                                        {tier.price}
                                    </div>
                                    <div className={`text-xs mt-0.5 ${
                                        tier.highlight ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                        {tier.priceSub}
                                    </div>
                                </div>

                                <p className={`text-xs leading-relaxed mb-6 ${
                                    tier.highlight ? "text-gray-300" : "text-gray-600"
                                }`}>
                                    {tier.desc}
                                </p>

                                <div className="pt-6 border-t border-gray-200/40 flex flex-col gap-3">
                                    {tier.features.map((f) => (
                                        <div key={f} className="flex items-start gap-2.5 text-xs">
                                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                                                tier.highlight ? "text-amber-400" : "text-emerald-600"
                                            }`} />
                                            <span className={tier.highlight ? "text-gray-200" : "text-gray-700"}>
                                                {f}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-4">
                                <Link
                                    href={tier.href}
                                    className={`w-full inline-flex items-center justify-center gap-2 text-sm font-bold py-3.5 px-6 rounded-xl transition-all ${
                                        tier.highlight
                                            ? "bg-amber-500 text-gray-950 hover:bg-amber-400 shadow-sm hover:shadow-md"
                                            : "bg-[#111827] text-white hover:bg-gray-800 shadow-sm"
                                    }`}
                                >
                                    {tier.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Success fee note */}
                <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200/90 rounded-2xl flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-700">
                        <Coins className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">{bm.feeTitle}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                ZERO UPFRONT COST
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            {bm.feeDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
