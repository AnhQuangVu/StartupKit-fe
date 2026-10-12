"use client";

import { useDictionary } from "@/lib/dict-context";

export default function HowItWorks() {
    const dict = useDictionary();
    const hw = dict.how;

    const steps = [
        {
            number: "01",
            level: "LEVEL 01: FOUNDATION",
            title: hw.step1Title,
            description: hw.step1Desc,
            artwork: (
                <svg viewBox="0 0 80 60" className="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="40,8 68,22 40,36 12,22" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="12,22 40,36 40,46 12,32" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="40,36 68,22 68,32 40,46" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" />
                    <rect x="32" y="18" width="16" height="4" fill="#111111" rx="1" />
                    <circle cx="26" cy="20" r="2" fill="#F4B400" />
                </svg>
            ),
        },
        {
            number: "02",
            level: "LEVEL 02: SYNERGY",
            title: hw.step2Title,
            description: hw.step2Desc,
            artwork: (
                <svg viewBox="0 0 80 60" className="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="40,8 68,22 40,36 12,22" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="12,22 40,36 40,46 12,32" fill="#F7F7F7" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="40,36 68,22 68,32 40,46" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" />
                    <circle cx="32" cy="20" r="3" fill="#111111" />
                    <circle cx="48" cy="20" r="3" fill="#F4B400" />
                    <line x1="35" y1="20" x2="45" y2="20" stroke="#111111" strokeWidth="1.4" strokeDasharray="2 2" />
                </svg>
            ),
        },
        {
            number: "03",
            level: "LEVEL 03: ELEVATION",
            title: hw.step3Title,
            description: hw.step3Desc,
            artwork: (
                <svg viewBox="0 0 80 60" className="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="40,8 68,22 40,36 12,22" fill="#FFFDF5" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="12,22 40,36 40,46 12,32" fill="#F4B400" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="40,36 68,22 68,32 40,46" fill="#D99B00" stroke="#111111" strokeWidth="1.6" />
                    <path d="M30 24 L38 16 L44 20 L52 12" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="52" cy="12" r="2.5" fill="#111111" />
                </svg>
            ),
        },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-[#EAEAEA] overflow-hidden iso-scanline">
            {/* Isometric grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-30 pointer-events-none" />

            {/* Ambient Breathing Gold Halo */}
            <div
                className="absolute top-1/2 left-1/3 w-[680px] h-[450px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.12) 0%, transparent 70%)",
                }}
            />

            {/* Floating Isometric 3D Geometric Accents */}
            <div className="absolute top-14 right-16 iso-float pointer-events-none opacity-20 hidden xl:block">
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                    <polygon points="42,8 74,26 42,44 10,26" fill="#F4B400" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="10,26 42,44 42,74 10,56" fill="#111111" stroke="#111111" strokeWidth="1.8" />
                    <polygon points="42,44 74,26 74,56 42,74" fill="#333333" stroke="#111111" strokeWidth="1.8" />
                </svg>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mx-auto max-w-[520px] mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                        {hw.label}
                    </div>
                    <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
                        {hw.title}
                    </h2>
                </div>

                {/* 3-Column Stepped Isometric Progression */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {steps.map((s, idx) => (
                        <div
                            key={s.number}
                            className={`border-2 border-[#111111] rounded-[12px] p-8 flex flex-col justify-between iso-card-3d group transition-all duration-300 ${
                                idx === 2 ? "bg-[#FFFDF5] border-[#111111]" : "bg-white"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#111111] text-white">
                                        {s.level}
                                    </span>
                                    <span className="text-[20px] font-mono font-black text-[#D99B00]">
                                        #{s.number}
                                    </span>
                                </div>

                                {/* Custom Isometric Step Illustration */}
                                <div className="my-5 p-3 bg-white border border-[#EAEAEA] rounded-[8px] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                    {s.artwork}
                                </div>

                                <h3 className="text-[20px] font-extrabold text-[#111111] mb-2.5">
                                    {s.title}
                                </h3>
                                <p className="text-[14px] text-[#666666] leading-relaxed">
                                    {s.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                                <span>STAGE 0{idx + 1}/03</span>
                                <span className="font-semibold text-[#111111] group-hover:text-[#D99B00] transition-colors">
                                    PHASE CLEAR →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
