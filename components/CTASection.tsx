"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

export default function CTASection() {
    const dict = useDictionary();
    const cta = dict.cta;

    return (
        <section className="relative py-32 bg-[#111111] overflow-hidden border-t-2 border-[#111111] iso-scanline">
            {/* Isometric dark grid background */}
            <div className="absolute inset-0 iso-grid-dark opacity-35 pointer-events-none" />

            {/* Glowing gold isometric spotlight with Breathing Dark Glow */}
            <div
                className="absolute top-1/2 left-1/2 w-[700px] h-[450px] pointer-events-none rounded-full iso-ambient-glow-dark"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.22) 0%, rgba(244, 180, 0, 0.05) 50%, transparent 70%)",
                }}
            />

            {/* Floating Isometric Decorative Cubes (Left & Right) */}
            <div className="hidden lg:block absolute left-12 top-1/3 iso-float pointer-events-none">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <polygon points="32,8 56,22 32,36 8,22" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1.2" />
                    <polygon points="8,22 32,36 32,56 8,42" fill="#D99B00" stroke="#FFFFFF" strokeWidth="1.2" />
                    <polygon points="32,36 56,22 56,42 32,56" fill="#B37700" stroke="#FFFFFF" strokeWidth="1.2" />
                </svg>
            </div>

            <div className="hidden lg:block absolute right-14 bottom-1/4 iso-float-delay pointer-events-none">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <polygon points="28,7 49,19 28,31 7,19" fill="#FFFFFF" stroke="#333333" strokeWidth="1.2" />
                    <polygon points="7,19 28,31 28,48 7,36" fill="#EAEAEA" stroke="#333333" strokeWidth="1.2" />
                    <polygon points="28,31 49,19 49,36 28,48" fill="#CCCCCC" stroke="#333333" strokeWidth="1.2" />
                </svg>
            </div>

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-7">
                {/* Institutional Tag */}
                <div className="inline-flex items-center gap-2 bg-[#222222] border border-[#F4B400]/40 text-[#F4B400] rounded-[6px] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wider shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                    {cta.label}
                    <span className="text-white/40 pl-2 border-l border-white/20">VENTURE NETWORK</span>
                </div>

                <h2 className="text-[36px] sm:text-[46px] md:text-[54px] font-black text-white leading-[1.12] max-w-[720px] tracking-tight">
                    {cta.title}
                </h2>

                <p className="text-[16px] text-[#A0A0A0] max-w-[500px] leading-relaxed">
                    {cta.sub}
                </p>

                {/* Clean Institutional Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2.5 bg-[#F4B400] hover:bg-[#FFC933] text-[#111111] text-[15.5px] font-bold px-8 py-3.5 rounded-[8px] transition-all shadow-md hover:shadow-lg"
                    >
                        {cta.btn1}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>

                    <Link
                        href="/market/mentors"
                        className="inline-flex items-center justify-center gap-2 border border-[#444444] hover:border-white text-white text-[15.5px] font-semibold px-8 py-3.5 rounded-[8px] transition-all hover:bg-white/5 shadow-sm"
                    >
                        {cta.btn2}
                    </Link>
                </div>
            </div>
        </section>
    );
}
