"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

const steps = [
    {
        id: "01",
        code: "FOUNDER_INPUT",
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
        code: "METRICS_AUDIT",
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
        code: "INVESTMENT_MEMO",
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
        code: "DEAL_ROOM_MATCH",
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

    const TIER_TELEMETRY = [
        {
            title: "HỒ SƠ ĐẦU VÀO NHÀ SÁNG LẬP",
            status: "DỮ LIỆU ĐẦY ĐỦ",
            snippet: "Phân tích cấu trúc mô hình kinh doanh, quy mô thị trường (TAM/SAM/SOM), chỉ số tăng trưởng MoM và chân dung co-founders.",
            indicator: "SẴN SÀNG CHUẨN HÓA"
        },
        {
            title: "THẨM ĐỊNH CHỈ SỐ TÀI CHÍNH",
            status: "ĐỐI SOÁT XONG",
            snippet: "Kiểm tra tính hợp lý của LTV/CAC, Runway, Moat và lợi thế phòng thủ so với cơ sở dữ liệu của hơn 500 startup trong khu vực.",
            indicator: "ĐỘ TIN CẬY: 98.4%"
        },
        {
            title: "XUẤT BẢN VC INVESTMENT MEMO",
            status: "HỒ SƠ SẴN SÀNG",
            snippet: "Hồ sơ 10 mục chuẩn hóa theo định dạng thẩm định của các quỹ đầu tư mạo hiểm và nhà đầu tư thiên thần.",
            indicator: "ĐIỂM SẴN SÀNG GỌI VỐN: 92/100"
        },
        {
            title: "KẾT NỐI VÀO VIRTUAL DEAL ROOM",
            status: "12 QUỸ PHÙ HỢP",
            snippet: "Phân phối thông minh đến đúng các quỹ có khẩu vị giải ngân khớp với lĩnh vực, quy mô vòng gọi và chỉ số tăng trưởng.",
            indicator: "SẴN SÀNG TIẾP CẬN DEAL ROOM"
        }
    ];

    return (
        <section className="relative py-28 bg-[#FAFAFA] border-t border-[#EAEAEA] overflow-hidden iso-scanline">
            {/* Background isometric grid */}
            <div className="absolute inset-0 iso-grid-bg opacity-40 pointer-events-none" />

            {/* Ambient Breathing Gold Halo */}
            <div
                className="absolute top-1/2 left-1/3 w-[680px] h-[450px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.14) 0%, transparent 70%)",
                }}
            />

            {/* Floating Isometric 3D Geometric Elements */}
            <div className="absolute top-16 right-12 iso-float pointer-events-none opacity-25 hidden xl:block">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <polygon points="40,8 72,25 40,42 8,25" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="8,25 40,42 40,70 8,53" fill="#F4B400" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="40,42 72,25 72,53 40,70" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" />
                </svg>
            </div>

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

                        {/* Interactive VC Memo Preview Box */}
                        <div className="mb-8 p-5 bg-white border border-[#CCCCCC] rounded-[10px] shadow-sm transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                                    <span className="text-[12px] font-bold text-[#111111] uppercase tracking-wide">
                                        {TIER_TELEMETRY[activeStep]?.title ?? "CHUẨN HÓA HỒ SƠ ĐẦU TƯ"}
                                    </span>
                                </div>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#111111] text-[#F4B400]">
                                    {TIER_TELEMETRY[activeStep]?.status}
                                </span>
                            </div>
                            <p className="text-[13.5px] text-[#555555] leading-relaxed mb-3">
                                {TIER_TELEMETRY[activeStep]?.snippet}
                            </p>
                            <div className="pt-2.5 border-t border-dashed border-[#EAEAEA] flex items-center justify-between text-[11.5px] text-[#D99B00]">
                                <span className="font-semibold">{TIER_TELEMETRY[activeStep]?.indicator}</span>
                                <span className="text-[#888888] font-medium">BƯỚC 0{activeStep + 1}/04</span>
                            </div>
                        </div>

                        <Link
                            href="/register?role=startup"
                            className="inline-flex items-center gap-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[15px] font-semibold px-7 py-3.5 rounded-[8px] transition-all shadow-sm hover:shadow"
                        >
                            {ai.cta}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right: Stacked Architectural Step Cards */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="text-[11px] font-semibold uppercase text-[#888888] tracking-wider mb-1 flex items-center justify-between">
                            <span>QUY TRÌNH CHUẨN HÓA 4 BƯỚC</span>
                            <span className="text-[#D99B00] font-bold">CHỌN ĐỂ XEM CHI TIẾT</span>
                        </div>

                        {steps.map((step, index) => {
                            const isCurrent = activeStep === index;
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStep(index)}
                                    className={`cursor-pointer rounded-[12px] p-6 transition-all duration-300 border ${
                                        isCurrent
                                            ? "bg-[#111111] text-white border-[#111111] shadow-md scale-[1.01]"
                                            : "bg-white text-[#111111] border-[#EAEAEA] hover:border-[#CCCCCC] shadow-sm hover:shadow"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            {/* Step number badge */}
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] ${
                                                isCurrent ? "bg-[#222222] text-[#F4B400]" : "bg-[#F5F5F5] text-[#111111]"
                                            }`}>
                                                BƯỚC {step.id}
                                            </span>

                                            <span className="text-[11px] font-semibold tracking-wide text-[#888888]">
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
                                        <p className={`text-[13.5px] leading-relaxed ${
                                            isCurrent ? "text-[#CCCCCC]" : "text-[#666666]"
                                        }`}>
                                            {STEP_TEXT[step.id].desc}
                                        </p>
                                    </div>

                                    {/* Active Step Indicator */}
                                    <div className="mt-4 pt-3 border-t border-dashed border-[#EAEAEA]/30 flex items-center justify-between text-[11px]">
                                        <span className={`font-semibold ${isCurrent ? "text-[#F4B400]" : "text-[#999999]"}`}>
                                            {isCurrent ? "● ĐANG CHỌN XEM" : "○ BẤM ĐỂ XEM BƯỚC NÀY"}
                                        </span>
                                        <span className={isCurrent ? "text-white/80" : "text-[#888888]"}>
                                            0{index + 1} / 04
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
