"use client";

import { useDictionary } from "@/lib/dict-context";

export default function MatchingEngine() {
    const dict = useDictionary();
    const mt = dict.matching;

    const NODE_TEXT = [
        { label: mt.node1Label, sub: mt.node1Sub, role: "SOURCE_NODE" },
        { label: mt.node2Label, sub: mt.node2Sub, role: "AI_CORE", center: true },
        { label: mt.node3Label, sub: mt.node3Sub, role: "TARGET_NODE" },
    ];

    const RULE_TEXT = [
        { label: mt.rule1Label, desc: mt.rule1Desc, code: "RULE_01", tag: "SECTOR_FIT" },
        { label: mt.rule2Label, desc: mt.rule2Desc, code: "RULE_02", tag: "STAGE_FIT" },
        { label: mt.rule3Label, desc: mt.rule3Desc, code: "RULE_03", tag: "AUTONOMOUS" },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-[#EAEAEA] overflow-hidden">
            {/* Isometric background grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-30 pointer-events-none" />

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-18 max-w-[560px]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6px] mb-3 text-[12px] font-bold text-[#D99B00] uppercase tracking-wider iso-btn">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                        {mt.label}
                    </div>
                    <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
                        {mt.title1}
                        <br />
                        <span className="relative inline-block text-[#111111]">
                            {mt.title2}
                            <span className="absolute bottom-1 left-0 right-0 h-[5px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                        </span>
                    </h2>
                    <p className="text-[15px] text-[#666666] mt-4 leading-relaxed">
                        {mt.sub}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Isometric 3D Network Diagram Stage */}
                    <div className="lg:col-span-6 bg-[#FAFAFA] border-2 border-[#111111] rounded-[14px] p-8 iso-card-3d relative overflow-hidden">
                        
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAEAEA]">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                                <span className="text-[12px] font-mono font-bold text-[#111111] uppercase">ISO MATCH MATRIX</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#D99B00] font-bold">100% AUTONOMOUS</span>
                        </div>

                        {/* Interactive Isometric Node Pipeline */}
                        <div className="flex flex-col items-center gap-0 my-4 relative">
                            
                            {/* Node 1: Startup Source */}
                            <div className="w-full max-w-[320px] bg-white border-2 border-[#111111] rounded-[10px] p-4 iso-card-3d flex items-center justify-between z-10">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 rounded-[6px] bg-[#111111] text-white flex items-center justify-center shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <polygon points="10,2 17,6 10,10 3,6" fill="#F4B400" />
                                            <polygon points="3,6 10,10 10,16 3,12" fill="#FFFFFF" fillOpacity="0.8" />
                                            <polygon points="10,10 17,6 17,12 10,16" fill="#FFFFFF" fillOpacity="0.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-bold text-[#111111]">{NODE_TEXT[0].label}</div>
                                        <div className="text-[11px] text-[#666666]">{NODE_TEXT[0].sub}</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F7F7F7] text-[#888888]">IN</span>
                            </div>

                            {/* Connecting Isometric Circuit Track 1 */}
                            <div className="h-10 w-full flex flex-col items-center justify-center relative">
                                <div className="w-[3px] h-full bg-[#F4B400] relative">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111] absolute left-1/2 -translate-x-1/2 animate-bounce" />
                                </div>
                            </div>

                            {/* Node 2: Central AI Engine (Hero Cube) */}
                            <div className="w-full max-w-[340px] bg-[#111111] text-white border-2 border-[#F4B400] rounded-[10px] p-4.5 iso-card-dark flex items-center justify-between z-20">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-[6px] bg-[#222222] border border-[#F4B400] flex items-center justify-center shrink-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <polygon points="12,2 21,7 12,12 3,7" fill="#F4B400" />
                                            <polygon points="3,7 12,12 12,19 3,14" fill="#E59B00" />
                                            <polygon points="12,12 21,7 21,14 12,19" fill="#FFC933" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-extrabold text-[#F4B400] leading-none mb-1">{NODE_TEXT[1].label}</div>
                                        <div className="text-[11px] text-[#CCCCCC]">{NODE_TEXT[1].sub}</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F4B400] text-[#111111]">AI CORE</span>
                            </div>

                            {/* Connecting Isometric Circuit Track 2 */}
                            <div className="h-10 w-full flex flex-col items-center justify-center relative">
                                <div className="w-[3px] h-full bg-[#F4B400] relative">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111] absolute left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDelay: "0.5s" }} />
                                </div>
                            </div>

                            {/* Node 3: Investor & Mentor Pipeline */}
                            <div className="w-full max-w-[320px] bg-white border-2 border-[#111111] rounded-[10px] p-4 iso-card-3d flex items-center justify-between z-10">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 rounded-[6px] bg-[#F4B400] text-[#111111] flex items-center justify-center shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <polygon points="10,2 17,6 10,10 3,6" fill="#111111" />
                                            <polygon points="3,6 10,10 10,16 3,12" fill="#333333" />
                                            <polygon points="10,10 17,6 17,12 10,16" fill="#555555" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-bold text-[#111111]">{NODE_TEXT[2].label}</div>
                                        <div className="text-[11px] text-[#666666]">{NODE_TEXT[2].sub}</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F7F7F7] text-[#888888]">OUT</span>
                            </div>

                        </div>
                    </div>

                    {/* Right: Isometric Engine Rules */}
                    <div className="lg:col-span-6 flex flex-col gap-5">
                        <div className="text-[11px] font-mono font-bold uppercase text-[#888888] tracking-widest mb-1">
                            ENGINE LOGIC SPECIFICATIONS
                        </div>

                        {RULE_TEXT.map((rule, idx) => (
                            <div
                                key={rule.code}
                                className="bg-white border-2 border-[#111111] rounded-[10px] p-6 iso-card-3d hover:translate-x-1 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-[#111111] text-white">
                                        {rule.code}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-[#F4B400]/20 text-[#B37700]">
                                        {rule.tag}
                                    </span>
                                </div>

                                <h3 className="text-[17px] font-extrabold text-[#111111] mb-1.5">
                                    {rule.label}
                                </h3>

                                <p className="text-[14px] text-[#666666] leading-relaxed">
                                    {rule.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
