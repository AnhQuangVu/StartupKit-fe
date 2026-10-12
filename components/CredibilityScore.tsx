"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";

const signals = [
    {
        label: "Mentor Reviews",
        code: "SIG_01",
        weight: 35,
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 19,7 11,12 3,7" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
                <polygon points="3,7 11,12 11,18 3,13" fill="#F7F7F7" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 19,7 19,13 11,18" fill="#EAEAEA" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,5 12,8 15,8 12.5,10 13.5,13 11,11 8.5,13 9.5,10 7,8 10,8" fill="#F4B400" />
            </svg>
        ),
    },
    {
        label: "Completed Sessions",
        code: "SIG_02",
        weight: 35,
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 19,7 11,12 3,7" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
                <polygon points="3,7 11,12 11,18 3,13" fill="#F7F7F7" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 19,7 19,13 11,18" fill="#EAEAEA" stroke="#111111" strokeWidth="1.4" />
                <path d="M7 10 L10 13 L15 8" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Successful Deals",
        code: "SIG_03",
        weight: 30,
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 19,7 11,12 3,7" fill="#FFF8E1" stroke="#111111" strokeWidth="1.4" />
                <polygon points="3,7 11,12 11,18 3,13" fill="#F4B400" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 19,7 19,13 11,18" fill="#D99B00" stroke="#111111" strokeWidth="1.4" />
            </svg>
        ),
    },
];

export default function CredibilityScore() {
    const dict = useDictionary();
    const cr = dict.credibility;
    const [selectedSignal, setSelectedSignal] = useState<number | null>(null);

    const SIG_TEXT = [
        { label: cr.sig1Label, desc: cr.sig1Desc, value: cr.sig1Val },
        { label: cr.sig2Label, desc: cr.sig2Desc, value: cr.sig2Val },
        { label: cr.sig3Label, desc: cr.sig3Desc, value: cr.sig3Val },
    ];

    return (
        <section className="relative py-28 bg-[#FAFAFA] border-t border-[#EAEAEA] overflow-hidden iso-scanline">
            {/* Background isometric grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-35 pointer-events-none" />

            {/* Ambient Breathing Gold Halo */}
            <div
                className="absolute top-1/2 left-1/4 w-[650px] h-[450px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.13) 0%, transparent 70%)",
                }}
            />

            {/* Floating Isometric 3D Geometric Polyhedron */}
            <div className="absolute top-14 right-14 iso-float pointer-events-none opacity-25 hidden xl:block">
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none">
                    <polygon points="38,8 68,25 38,42 8,25" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="8,25 38,42 38,66 8,49" fill="#F4B400" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="38,42 68,25 68,49 38,66" fill="#111111" stroke="#111111" strokeWidth="1.6" />
                </svg>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left: Isometric 3D Trust Score Pedestal */}
                    <div className="lg:col-span-5 bg-white border-2 border-[#111111] rounded-[14px] p-8 iso-card-3d flex flex-col items-center">
                        <div className="w-full flex items-center justify-between pb-4 border-b border-[#F0F0F0] mb-6">
                            <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider">
                                ISO REPUTATION INDEX
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F4B400] text-[#111111]">
                                {selectedSignal !== null ? `SIGNAL 0${selectedSignal + 1} FOCUS` : "VERIFIED AUDIT"}
                            </span>
                        </div>

                        {/* Isometric Score Ring Visual */}
                        <div className="relative w-44 h-44 my-2">
                            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="62" stroke="#EAEAEA" strokeWidth="14" fill="none" />
                                <circle
                                    cx="80" cy="80" r="62"
                                    stroke="#111111" strokeWidth="14" fill="none"
                                    strokeDasharray={`${0.74 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="80" cy="80" r="62"
                                    stroke="#F4B400" strokeWidth="14" fill="none"
                                    strokeDasharray={`${0.35 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                                    strokeDashoffset={`${-0.39 * 2 * Math.PI * 62}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[40px] font-black text-[#111111] leading-none">74</span>
                                <span className="text-[11px] font-bold text-[#D99B00] uppercase tracking-wider mt-1">{cr.gauge}</span>
                            </div>
                        </div>

                        <div className="text-center mt-3 mb-6">
                            <div className="text-[16px] font-bold text-[#111111]">{cr.scoreTitle}</div>
                            <div className="text-[12px] text-[#777777] mt-0.5">{cr.gaugeSub}</div>
                        </div>

                        {/* Weighted metric bars with 3D tactile finish */}
                        <div className="w-full flex flex-col gap-3.5 pt-4 border-t border-[#F0F0F0]">
                            {signals.map((s, i) => (
                                <div key={s.label} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[12px] font-semibold">
                                        <span className="text-[#333333]">{SIG_TEXT[i].value}</span>
                                        <span className="font-mono text-[#111111]">{s.weight}%</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-[#F0F0F0] rounded-full overflow-hidden border border-[#EAEAEA]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                i === 2 ? "bg-[#F4B400]" : "bg-[#111111]"
                                            }`}
                                            style={{ width: `${s.weight * 2.5}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Description & Signal Details */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                            {cr.label}
                        </div>

                        <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight mb-4">
                            {cr.title1}
                            <br />
                            <span className="relative inline-block text-[#111111]">
                                {cr.title2}
                                <span className="absolute bottom-1 left-0 right-0 h-[5px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                            </span>
                        </h2>

                        <p className="text-[15px] text-[#666666] leading-[1.7] mb-8">
                            {cr.sub}
                        </p>

                        {/* 3 Isometric Signal Cards (Interactive) */}
                        <div className="flex flex-col gap-4">
                            {signals.map((s, idx) => {
                                const isSelected = selectedSignal === idx;
                                return (
                                    <div
                                        key={s.label}
                                        onClick={() => setSelectedSignal(isSelected ? null : idx)}
                                        className={`border-2 rounded-[10px] p-5 iso-card-3d flex items-start gap-4 cursor-pointer transition-all ${
                                            isSelected
                                                ? "bg-[#FFFDF5] border-[#F4B400] ring-4 ring-[#F4B400]/30 scale-[1.01]"
                                                : "bg-white border-[#111111] hover:border-[#F4B400] hover:translate-x-1"
                                        }`}
                                    >
                                        <div className={`p-2 border rounded-[6px] shrink-0 transition-colors ${
                                            isSelected ? "bg-[#F4B400] border-[#111111]" : "bg-[#F7F7F7] border-[#EAEAEA]"
                                        }`}>
                                            {s.icon}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-[15px] font-bold text-[#111111]">
                                                    {SIG_TEXT[idx].label}
                                                </h3>
                                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                                    isSelected ? "bg-[#111111] text-[#F4B400]" : "bg-[#F7F7F7] text-[#555555]"
                                                }`}>
                                                    {s.code}
                                                </span>
                                            </div>
                                            <p className="text-[13px] text-[#666666] leading-relaxed">
                                                {SIG_TEXT[idx].desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
