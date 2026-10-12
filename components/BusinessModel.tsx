"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

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
            badge: "TIER 01: OPEN ACCESS",
        },
        {
            name: bm.premName,
            desc: bm.premDesc,
            features: [bm.premF1, bm.premF2, bm.premF3, bm.premF4],
            cta: bm.premCta,
            href: "/register?plan=pro",
            highlight: true,
            badge: "TIER 02: ADVANCED ISO ENGINE",
        },
    ];

    return (
        <section id="pricing" className="relative py-28 bg-[#FAFAFA] border-t border-[#EAEAEA] overflow-hidden iso-scanline">
            {/* Background isometric grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-35 pointer-events-none" />

            {/* Ambient Breathing Gold Halo */}
            <div
                className="absolute top-1/2 left-1/2 w-[700px] h-[500px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.15) 0%, transparent 70%)",
                }}
            />

            {/* Floating Isometric 3D Geometric Accents */}
            <div className="absolute top-16 left-12 iso-float pointer-events-none opacity-25 hidden xl:block">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <polygon points="36,6 66,22 36,38 6,22" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="6,22 36,38 36,64 6,48" fill="#F4B400" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="36,38 66,22 66,48 36,64" fill="#D99B00" stroke="#111111" strokeWidth="1.6" />
                </svg>
            </div>

            <div className="absolute bottom-20 right-16 iso-float-reverse pointer-events-none opacity-20 hidden xl:block">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <polygon points="32,7 58,21 32,36 6,21" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="6,21 32,36 32,58 6,43" fill="#111111" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="32,36 58,21 58,43 32,58" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" />
                </svg>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-18 max-w-[540px] mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                        {bm.label}
                    </div>
                    <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
                        {bm.title1}
                        <br />
                        <span className="relative inline-block text-[#111111]">
                            {bm.title2}
                            <span className="absolute bottom-1 left-0 right-0 h-[5px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                        </span>
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-relaxed">
                        {bm.sub}
                    </p>
                </div>

                {/* 2 Isometric Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto mb-14">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-[14px] p-8 md:p-10 border-2 flex flex-col justify-between ${
                                tier.highlight
                                    ? "bg-[#111111] border-[#F4B400] text-white iso-card-dark"
                                    : "bg-white border-[#111111] text-[#111111] iso-card-3d"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${
                                        tier.highlight ? "bg-[#222222] text-[#F4B400]" : "bg-[#F7F7F7] text-[#111111]"
                                    }`}>
                                        {tier.badge}
                                    </span>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#F4B400]" />
                                </div>

                                <div className={`text-[26px] font-black uppercase tracking-tight mb-2 ${
                                    tier.highlight ? "text-[#F4B400]" : "text-[#111111]"
                                }`}>
                                    {tier.name}
                                </div>

                                <p className={`text-[14px] leading-relaxed mb-6 ${
                                    tier.highlight ? "text-[#AAAAAA]" : "text-[#666666]"
                                }`}>
                                    {tier.desc}
                                </p>

                                <div className="pt-6 border-t border-dashed border-[#EAEAEA]/40 flex flex-col gap-3.5">
                                    {tier.features.map((f) => (
                                        <div key={f} className="flex items-start gap-3 text-[14px]">
                                            <div className="mt-1 shrink-0">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <polygon points="7,2 12,5 7,8 2,5" fill="#F4B400" />
                                                    <polygon points="2,5 7,8 7,12 2,9" fill={tier.highlight ? "#FFFFFF" : "#111111"} />
                                                    <polygon points="7,8 12,5 12,9 7,12" fill={tier.highlight ? "#DDDDDD" : "#333333"} />
                                                </svg>
                                            </div>
                                            <span className={tier.highlight ? "text-[#E0E0E0]" : "text-[#444444]"}>
                                                {f}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 pt-4">
                                <Link
                                    href={tier.href}
                                    className={`w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold py-3.5 px-6 rounded-[8px] transition-all ${
                                        tier.highlight
                                            ? "bg-[#F4B400] text-[#111111] iso-btn-gold hover:bg-[#FFC933]"
                                            : "bg-[#111111] text-white iso-btn hover:bg-[#F4B400] hover:text-[#111111]"
                                    }`}
                                >
                                    {tier.cta}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Success fee note as an Isometric Protocol Strip */}
                <div className="max-w-[700px] mx-auto p-6 bg-white border-2 border-[#111111] rounded-[12px] flex items-start gap-5 iso-card-3d">
                    <div className="w-11 h-11 rounded-[8px] bg-[#FFF8E1] border border-[#F4B400] flex items-center justify-center shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <polygon points="12,3 21,8 12,13 3,8" fill="#F4B400" />
                            <polygon points="3,8 12,13 12,20 3,15" fill="#111111" />
                            <polygon points="12,13 21,8 21,15 12,20" fill="#333333" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[15px] font-bold text-[#111111]">{bm.feeTitle}</span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F4B400] text-[#111111]">
                                ZERO UPFRONT
                            </span>
                        </div>
                        <p className="text-[13px] text-[#666666] leading-relaxed">
                            {bm.feeDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
