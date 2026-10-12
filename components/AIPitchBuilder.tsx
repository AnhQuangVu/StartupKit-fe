"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import { 
    FileText, 
    BarChart3, 
    ShieldCheck, 
    Zap, 
    CheckCircle2, 
    ArrowRight, 
    Download, 
    Lock, 
    Eye,
    TrendingUp,
    Building2,
    Users
} from "lucide-react";

export default function AIPitchBuilder() {
    const dict = useDictionary();
    const ai = dict.ai;
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 0,
            code: "FOUNDER_INPUT",
            stepNumber: "01",
            label: "Hồ Sơ & Mô Hình Kinh Doanh",
            desc: "Cấu trúc rõ ràng Problem-Solution, TAM/SAM/SOM và chân dung Co-founders.",
            icon: <FileText className="w-5 h-5 text-amber-600" />,
            badge: "BƯỚC 01",
        },
        {
            id: 1,
            code: "METRICS_AUDIT",
            stepNumber: "02",
            label: "Thẩm Định Chỉ Số Tài Chính",
            desc: "Đối soát tự động LTV/CAC, Runway, Net Dollar Retention và biên lợi nhuận gộp.",
            icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
            badge: "BƯỚC 02",
        },
        {
            id: 2,
            code: "INVESTMENT_MEMO",
            stepNumber: "03",
            label: "Xuất Bản VC Investment Memo",
            desc: "Bản báo cáo 10 mục chuẩn hóa theo khẩu vị thẩm định của các quỹ đầu tư quốc tế.",
            icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
            badge: "BƯỚC 03",
        },
        {
            id: 3,
            code: "DEAL_ROOM_MATCH",
            stepNumber: "04",
            label: "Phân Phối Virtual Deal Room",
            desc: "Bảo mật hai lớp qua NDA điện tử, tự động đề xuất đến các quỹ đầu tư phù hợp.",
            icon: <Zap className="w-5 h-5 text-purple-600" />,
            badge: "BƯỚC 04",
        },
    ];

    return (
        <section className="relative py-28 bg-[#FAFAFA] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {ai.label}
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 font-normal">CHUẨN ĐẦU TƯ TIER-1</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                        {ai.title1}
                        <br />
                        <span className="relative inline-block text-[#111827]">
                            {ai.title2}
                            <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-amber-300/40 -z-10 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-base text-gray-600 mt-4 leading-relaxed">
                        {ai.desc}
                    </p>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: 4 Interactive Stepper Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-3.5">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                            <span>Quy Trình Chuẩn Hóa 4 Bước</span>
                            <span className="text-amber-600 font-semibold">Bấm để xem mô phỏng</span>
                        </div>

                        {steps.map((st) => {
                            const isCurrent = activeStep === st.id;
                            return (
                                <div
                                    key={st.id}
                                    onClick={() => setActiveStep(st.id)}
                                    className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 border text-left flex flex-col justify-between ${
                                        isCurrent
                                            ? "bg-white border-amber-400 shadow-[0_8px_25px_rgba(244,180,0,0.12)] ring-2 ring-amber-400/20"
                                            : "bg-white/80 border-gray-200/80 hover:border-gray-300 hover:bg-white shadow-sm"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2.5">
                                            <div className={`p-2 rounded-xl border transition-colors ${
                                                isCurrent 
                                                    ? "bg-amber-50 border-amber-200 text-amber-700" 
                                                    : "bg-gray-50 border-gray-100 text-gray-500"
                                            }`}>
                                                {st.icon}
                                            </div>
                                            <div>
                                                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                                    isCurrent ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    {st.badge}
                                                </span>
                                                <h3 className="text-base font-bold text-[#111827] mt-1">
                                                    {st.label}
                                                </h3>
                                            </div>
                                        </div>

                                        <span className={`text-xs font-mono font-black ${
                                            isCurrent ? "text-amber-600" : "text-gray-300"
                                        }`}>
                                            #{st.stepNumber}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 leading-relaxed pl-11">
                                        {st.desc}
                                    </p>

                                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] pl-11">
                                        <span className={isCurrent ? "text-amber-700 font-semibold" : "text-gray-400"}>
                                            {isCurrent ? "● Đang xem tài liệu" : "○ Chọn bước này"}
                                        </span>
                                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                                            isCurrent ? "text-amber-600 translate-x-1" : "text-gray-300"
                                        }`} />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="mt-4 pt-2">
                            <Link
                                href="/register?role=startup"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-amber-500 hover:text-gray-950 text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm"
                            >
                                {ai.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Live Standardized VC Memo Document Preview (Carta / Notion Style) */}
                    <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                        
                        {/* Document Top Bar */}
                        <div className="bg-gray-50/90 border-b border-gray-200 px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                                <span className="text-gray-300 pl-2">|</span>
                                <span className="text-xs font-mono font-bold text-gray-700 flex items-center gap-1.5">
                                    <Lock className="w-3 h-3 text-amber-600" />
                                    VC_INVESTMENT_MEMO_v2.4.pdf
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> AUDITED
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 flex items-center gap-1">
                                    <Eye className="w-3 h-3" /> PREVIEW
                                </span>
                            </div>
                        </div>

                        {/* Interactive Document Tabs */}
                        <div className="flex border-b border-gray-200 bg-gray-50/40 px-5 text-xs font-semibold overflow-x-auto">
                            {["01. THỊ TRƯỜNG & TAM", "02. CHỈ SỐ LTV/CAC", "03. LUẬN ĐIỂM ĐẦU TƯ", "04. DEAL ROOM PHÂN PHỐI"].map((tab, idx) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveStep(idx)}
                                    className={`py-3 px-3.5 whitespace-nowrap border-b-2 transition-colors ${
                                        activeStep === idx
                                            ? "border-amber-500 text-gray-900 font-bold bg-white"
                                            : "border-transparent text-gray-500 hover:text-gray-900"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Document Content Area */}
                        <div className="p-7">
                            
                            {/* Step 0 Content: Market & Founder Persona */}
                            {activeStep === 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <span className="text-xs text-amber-600 font-bold uppercase tracking-wider">Hạng Mục 01 • Thẩm Định Thị Trường</span>
                                            <h4 className="text-xl font-black text-[#111827] mt-0.5">Phân Tích Quy Mô TAM / SAM / SOM</h4>
                                        </div>
                                        <span className="text-xs font-mono bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-md">
                                            CAGR: +28.4%
                                        </span>
                                    </div>

                                    {/* TAM SAM SOM Visual Cards */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/70 text-left">
                                            <span className="text-[10px] font-mono font-bold text-gray-500 block">TAM (Toàn Khu Vực)</span>
                                            <span className="text-lg font-black text-gray-900 font-mono">$4.8 Tỷ</span>
                                            <span className="text-[10px] text-gray-500 block mt-1">Đông Nam Á (SEA)</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-left">
                                            <span className="text-[10px] font-mono font-bold text-amber-700 block">SAM (Thị Trường Trọng Điểm)</span>
                                            <span className="text-lg font-black text-amber-900 font-mono">$1.2 Tỷ</span>
                                            <span className="text-[10px] text-amber-700 block mt-1">Việt Nam & Thái Lan</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-left">
                                            <span className="text-[10px] font-mono font-bold text-emerald-700 block">SOM (Mục Tiêu Năm 1-3)</span>
                                            <span className="text-lg font-black text-emerald-900 font-mono">$45 Triệu</span>
                                            <span className="text-[10px] text-emerald-700 block mt-1">Thị phần sơ cấp 3.75%</span>
                                        </div>
                                    </div>

                                    {/* Problem vs Solution Summary */}
                                    <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 text-left space-y-2">
                                        <div className="text-xs font-bold text-gray-900">Vấn Đề Cốt Lõi Được Giải Quyết:</div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Chi phí vận hành logistics chặng cuối tại Việt Nam chiếm tới 24% giá trị đơn hàng do thiếu mạng lưới tối ưu tuyến đường thời gian thực.
                                        </p>
                                        <div className="pt-2 text-xs font-bold text-gray-900">Giải Pháp Công Nghệ:</div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Hệ thống định tuyến AI phân tán giúp giảm 38% chi phí nhiên liệu và tăng 2.1x số điểm giao trên mỗi tài xế.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 1 Content: Financial & Unit Economics */}
                            {activeStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Hạng Mục 02 • Unit Economics & Vận Hành</span>
                                            <h4 className="text-xl font-black text-[#111827] mt-0.5">Thẩm Định Tỷ Suất Tài Chính Cốt Lõi</h4>
                                        </div>
                                        <span className="text-xs font-mono bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-md">
                                            Audited: Seed Stage
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70">
                                            <span className="text-[10px] text-gray-500 block">LTV / CAC</span>
                                            <span className="text-lg font-black text-emerald-700 font-mono">8.2x</span>
                                            <span className="text-[10px] text-emerald-600 block mt-0.5">Top 5% Khu vực</span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70">
                                            <span className="text-[10px] text-gray-500 block">Net Retention (NDR)</span>
                                            <span className="text-lg font-black text-gray-900 font-mono">132%</span>
                                            <span className="text-[10px] text-gray-500 block mt-0.5">Tăng trưởng ròng</span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70">
                                            <span className="text-[10px] text-gray-500 block">Gross Margin</span>
                                            <span className="text-lg font-black text-gray-900 font-mono">76.4%</span>
                                            <span className="text-[10px] text-gray-500 block mt-0.5">Biên lợi nhuận gộp</span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/70">
                                            <span className="text-[10px] text-gray-500 block">Runway Hiện Tại</span>
                                            <span className="text-lg font-black text-amber-700 font-mono">18 Tháng</span>
                                            <span className="text-[10px] text-amber-600 block mt-0.5">An toàn tài chính</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-left">
                                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            Đánh Giá Của Ban Thẩm Định StartupKit:
                                        </div>
                                        <p className="text-xs text-emerald-800 leading-relaxed">
                                            Startup đạt tỷ suất hoàn vốn CAC Payback trong 4.2 tháng. Cấu trúc doanh thu SaaS định kỳ B2B chiếm 88% tổng GMV, đủ điều kiện tiến vào Deal Room vòng Pre-Series A.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 Content: Standardized VC Memo */}
                            {activeStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Hạng Mục 03 • Khung Thẩm Định Quỹ VC</span>
                                            <h4 className="text-xl font-black text-[#111827] mt-0.5">Investment Committee Memorandum</h4>
                                        </div>
                                        <span className="text-xs font-mono bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                                            Điểm SCI: 94/100
                                        </span>
                                    </div>

                                    <div className="space-y-3 text-left">
                                        <div className="p-3.5 rounded-xl border border-gray-200 flex items-start justify-between gap-4">
                                            <div>
                                                <div className="text-xs font-bold text-gray-900">1. Lợi Thế Cạnh Tranh & Hào Khí Phòng Thủ (Moat)</div>
                                                <p className="text-xs text-gray-500 mt-1">Độc quyền bộ dữ liệu định tuyến 120,000 km đường đô thị tại 5 thành phố lớn; mạng lưới tài xế tích hợp API độc quyền.</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">XÁC MINH</span>
                                        </div>

                                        <div className="p-3.5 rounded-xl border border-gray-200 flex items-start justify-between gap-4">
                                            <div>
                                                <div className="text-xs font-bold text-gray-900">2. Cấu Trúc Sử Dụng Vốn Gọi (Use of Proceeds)</div>
                                                <p className="text-xs text-gray-500 mt-1">45% R&D Mở rộng thuật toán AI • 35% Kinh doanh B2B Doanh nghiệp • 20% Vốn lưu động & Dự phòng rủi ro.</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">CHUẨN HÓA</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 Content: Virtual Deal Room Match */}
                            {activeStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <span className="text-xs text-purple-600 font-bold uppercase tracking-wider">Hạng Mục 04 • Tiếp Cận Virtual Deal Room</span>
                                            <h4 className="text-xl font-black text-[#111827] mt-0.5">Phân Phối Đúng Khẩu Vị Đầu Tư</h4>
                                        </div>
                                        <span className="text-xs font-mono bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-md">
                                            14 Quỹ Khớp Lệnh
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                                        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-gray-900">Do Ventures Partner</span>
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">96% Phù Hợp</span>
                                            </div>
                                            <span className="text-[11px] text-gray-500 block">Khẩu vị: B2B SaaS, Logistics • Ticket $200K-$500K</span>
                                        </div>

                                        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-gray-900">Ascend Vietnam Ventures</span>
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">92% Phù Hợp</span>
                                            </div>
                                            <span className="text-[11px] text-gray-500 block">Khẩu vị: Tech Seed • Ticket $100K-$300K</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/60 flex items-center justify-between text-left">
                                        <div>
                                            <span className="text-xs font-bold text-purple-950 block">Virtual Deal Room Đã Mã Hóa</span>
                                            <span className="text-xs text-purple-700">Chỉ nhà đầu tư đã ký NDA điện tử mới có quyền tải Cap Table & Báo cáo kiểm toán.</span>
                                        </div>
                                        <ShieldCheck className="w-6 h-6 text-purple-600 shrink-0" />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Document Footer Bar */}
                        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex items-center justify-between text-xs text-gray-500">
                            <span>Định dạng chuẩn: National Innovation Center (NIC) & NVCA</span>
                            <span className="font-semibold text-gray-900">Hỗ trợ xuất PDF / Virtual Link</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
