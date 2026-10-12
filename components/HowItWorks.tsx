"use client";

import { useDictionary } from "@/lib/dict-context";
import { 
    FileText, 
    Compass, 
    TrendingUp, 
    CheckCircle2, 
    ArrowRight 
} from "lucide-react";

export default function HowItWorks() {
    const dict = useDictionary();
    const hw = dict.how;

    const steps = [
        {
            number: "01",
            level: "GIAI ĐOẠN 01: HỒ SƠ ĐẦU TƯ",
            title: hw.step1Title,
            description: hw.step1Desc,
            icon: <FileText className="w-6 h-6 text-amber-600" />,
            badge: "BƯỚC 01",
            details: "Chuẩn hóa hồ sơ 10 mục chuẩn VC • Điểm tín nhiệm SCI ban đầu",
        },
        {
            number: "02",
            level: "GIAI ĐOẠN 02: KẾT NỐI CỐ VẤN",
            title: hw.step2Title,
            description: hw.step2Desc,
            icon: <Compass className="w-6 h-6 text-blue-600" />,
            badge: "BƯỚC 02",
            details: "Làm việc 1-on-1 với Mentor • Hoàn thiện Unit Economics & Pitch Deck",
        },
        {
            number: "03",
            level: "GIAI ĐOẠN 03: GỌI VỐN THÀNH CÔNG",
            title: hw.step3Title,
            description: hw.step3Desc,
            icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
            badge: "BƯỚC 03",
            details: "Virtual Deal Room • Khớp lệnh với 80+ Quỹ VC & Mạng lưới Thiên thần",
        },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mx-auto max-w-2xl mb-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {hw.label}
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 font-normal">LỘ TRÌNH 3 BƯỚC</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                        {hw.title}
                    </h2>
                </div>

                {/* 3-Column Stepped Progression */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {steps.map((s, idx) => (
                        <div
                            key={s.number}
                            className={`border rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] ${
                                idx === 2 
                                    ? "bg-amber-50/20 border-amber-300 ring-1 ring-amber-300/40" 
                                    : "bg-white border-gray-200/90 hover:border-gray-300"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                                        {s.level}
                                    </span>
                                    <span className="text-xl font-mono font-black text-amber-600">
                                        #{s.number}
                                    </span>
                                </div>

                                <div className="p-3 w-fit rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors mb-5">
                                    {s.icon}
                                </div>

                                <h3 className="text-xl font-bold text-[#111827] mb-2.5">
                                    {s.title}
                                </h3>

                                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                    {s.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="text-[11px] text-gray-500 flex items-center gap-1.5 font-medium mb-3">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    {s.details}
                                </div>

                                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-amber-600 transition-colors">
                                    <span>TIẾN TRÌNH 0{idx + 1}/03</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
