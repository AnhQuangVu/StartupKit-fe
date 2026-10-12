"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

const steps = [
    {
        id: "01",
        code: "INPUT_LAYER",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 20,7 11,12 2,7" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
                <polygon points="2,7 11,12 11,18 2,13" fill="#F7F7F7" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 20,7 20,13 11,18" fill="#EAEAEA" stroke="#111111" strokeWidth="1.4" />
            </svg>
        ),
    },
    {
        id: "02",
        code: "AI_CORE_PROCESSOR",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 20,7 11,12 2,7" fill="#FFF8E1" stroke="#111111" strokeWidth="1.4" />
                <polygon points="2,7 11,12 11,18 2,13" fill="#F4B400" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 20,7 20,13 11,18" fill="#D99B00" stroke="#111111" strokeWidth="1.4" />
            </svg>
        ),
    },
    {
        id: "03",
        code: "PITCH_SYNTHESIS",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,3 19,7 11,11 3,7" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
                <polygon points="3,7 11,11 11,16 3,12" fill="#111111" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,11 19,7 19,12 11,16" fill="#333333" stroke="#111111" strokeWidth="1.4" />
                <circle cx="11" cy="7" r="1.5" fill="#F4B400" />
            </svg>
        ),
    },
    {
        id: "04",
        code: "VC_DISTRIBUTION",
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="11,2 20,7 11,12 2,7" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
                <polygon points="2,7 11,12 11,19 2,14" fill="#EAEAEA" stroke="#111111" strokeWidth="1.4" />
                <polygon points="11,12 20,7 20,14 11,19" fill="#D5D5D5" stroke="#111111" strokeWidth="1.4" />
                <path d="M7 10 L11 7 L15 10" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function AIPitchBuilder() {
    const dict = useDictionary();
    const ai = dict.ai;
    const [activeStep, setActiveStep] = useState(1);

    const STEP_TEXT: Record<string, { label: string; desc: string }> = {
        "01": { label: ai.step1Label, desc: ai.step1Desc },
        "02": { label: ai.step2Label, desc: ai.step2Desc },
        "03": { label: ai.step3Label, desc: ai.step3Desc },
        "04": { label: ai.step4Label, desc: ai.step4Desc },
    };

    return (
        <section className="relative py-28 bg-[#FAFAFA] border-t border-[#EAEAEA] overflow-hidden">
            {/* Background isometric grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-40 pointer-events-none" />

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left: Sticky Details & Pitch Builder Value Proposition */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                            {ai.label}
                        </div>

                        <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight mb-4">
                            {ai.title1}
                            <br />
                            <span className="relative inline-block text-[#111111]">
                                {ai.title2}
                                <span className="absolute bottom-1 left-0 right-0 h-[5px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                            </span>
                        </h2>

                        <p className="text-[15px] text-[#666666] leading-[1.7] mb-6">
                            {ai.desc}
                        </p>

                        {/* Isometric Callout Box */}
                        <div className="mb-8 p-5 bg-white border-2 border-[#111111] rounded-[10px] iso-card-3d">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                                <span className="text-[12px] font-mono font-bold text-[#111111] uppercase">ISO STANDARD FORMAT</span>
                            </div>
                            <p className="text-[13px] text-[#555555] leading-relaxed">
                                {ai.note}
                            </p>
                        </div>

                        <Link
                            href="/register?role=startup"
                            className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[15px] font-bold px-7 py-3.5 rounded-[8px] iso-btn hover:bg-[#F4B400] hover:text-[#111111] transition-all"
                        >
                            {ai.cta}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right: Stacked Isometric Architectural Slabs */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#888888] tracking-widest mb-1 flex items-center justify-between">
                            <span>4-TIER ARCHITECTURAL PIPELINE</span>
                            <span className="text-[#D99B00]">INTERACTIVE VIEW</span>
                        </div>

                        {steps.map((step, index) => {
                            const isCurrent = activeStep === index;
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`cursor-pointer border-2 rounded-[12px] p-6 transition-all duration-300 iso-card-3d ${
                                        isCurrent
                                            ? "bg-[#111111] text-white border-[#111111] scale-[1.01]"
                                            : "bg-white text-[#111111] border-[#EAEAEA] hover:border-[#111111]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3.5">
                                            {/* Step number badge */}
                                            <span className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${
                                                isCurrent ? "bg-[#222222] text-[#F4B400]" : "bg-[#F7F7F7] text-[#111111]"
                                            }`}>
                                                TIER {step.id}
                                            </span>

                                            <span className="text-[10px] font-mono tracking-wider text-[#888888]">
                                                {step.code}
                                            </span>
                                        </div>

                                        <div className="shrink-0">
                                            {step.icon}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className={`text-[18px] font-bold mb-1.5 ${
                                            isCurrent ? "text-white" : "text-[#111111]"
                                        }`}>
                                            {STEP_TEXT[step.id].label}
                                        </h3>
                                        <p className={`text-[13px] leading-relaxed ${
                                            isCurrent ? "text-[#CCCCCC]" : "text-[#666666]"
                                        }`}>
                                            {STEP_TEXT[step.id].desc}
                                        </p>
                                    </div>

                                    {/* Active Isometric Indicator Bar */}
                                    <div className="mt-4 pt-3 border-t border-dashed border-[#EAEAEA]/30 flex items-center justify-between text-[11px] font-mono">
                                        <span className={isCurrent ? "text-[#F4B400]" : "text-[#999999]"}>
                                            {isCurrent ? "● ACTIVE LAYER COMPLETED" : "○ READY FOR INGESTION"}
                                        </span>
                                        <span className={isCurrent ? "text-white" : "text-[#888888]"}>
                                            LAYER 0{index + 1}/04
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
