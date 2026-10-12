"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function CTASection() {
    const dict = useDictionary();
    const cta = dict.cta;

    return (
        <section className="relative py-28 bg-[#111827] overflow-hidden fintech-grid-dark border-t border-gray-800">
            {/* Ambient gold radial glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[450px] pointer-events-none rounded-full blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.03) 50%, transparent 70%)",
                }}
            />

            <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
                {/* Institutional Tag */}
                <div className="inline-flex items-center gap-2 bg-gray-850/80 border border-amber-500/30 text-amber-400 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    {cta.label}
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-300 font-normal">VIETNAM VENTURE NETWORK</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] max-w-3xl tracking-tight mb-5">
                    {cta.title}
                </h2>

                <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-9">
                    {cta.sub}
                </p>

                {/* Clean Institutional Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        {cta.btn1}
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                        href="/market/mentors"
                        className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all hover:bg-white/5"
                    >
                        {cta.btn2}
                    </Link>
                </div>

                {/* Trust Signal Footer */}
                <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Xác thực danh tính KYC
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Không phát sinh chi phí ban đầu
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Được bảo trợ bởi đối tác hệ sinh thái
                    </span>
                </div>
            </div>
        </section>
    );
}
