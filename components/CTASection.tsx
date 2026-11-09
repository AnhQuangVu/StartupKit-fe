"use client";
import { useDictionary } from "@/lib/dict-context";

export default function CTASection() {
    const dict = useDictionary();
    const cta = dict.cta;
    return (
        <section className="py-24 bg-[#111111]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
                <p className="text-[13px] font-semibold text-[#F4B400] uppercase tracking-widest">
                    {cta.label}
                </p>
                <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.2] max-w-[600px]">
                    {cta.title}
                </h2>
                <p className="text-[16px] text-[#888888] max-w-[440px] leading-[1.7]">
                    {cta.sub}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-[#F4B400] text-[#111111] text-[16px] font-semibold px-8 py-4 rounded-[8px] hover:bg-yellow-400 transition-colors"
                    >
                        {cta.btn1}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#mentors"
                        className="inline-flex items-center justify-center gap-2 border border-[#333333] text-white text-[16px] font-semibold px-8 py-4 rounded-[8px] hover:border-[#555555] transition-colors"
                    >
                        {cta.btn2}
                    </a>
                </div>
            </div>
        </section>
    );
}
