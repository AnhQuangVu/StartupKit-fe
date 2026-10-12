"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import { 
    ShieldCheck, 
    CheckCircle2, 
    Star, 
    TrendingUp, 
    FileCheck, 
    Lock, 
    Award
} from "lucide-react";

export default function CredibilityScore() {
    const dict = useDictionary();
    const cr = dict.credibility;
    const [selectedSignal, setSelectedSignal] = useState(0);

    const signals = [
        {
            id: 0,
            label: "Mentor Reviews & Milestones",
            code: "SIG_01",
            weight: 35,
            score: "96/100",
            icon: <Star className="w-5 h-5 text-amber-600" />,
            title: "Đánh Giá & Nhật Ký Mentoring Chuyên Sâu",
            auditDetail: "Xác thực qua 42+ giờ làm việc 1-on-1 với các chuyên gia vận hành từ Tech Unicorn và Quỹ đầu tư mạo hiểm.",
            metricTags: ["Co-founder Commitment", "Product Velocity", "Coachability: 9.8/10"],
        },
        {
            id: 1,
            label: "Financial & Unit Economics Audit",
            code: "SIG_02",
            weight: 35,
            score: "92/100",
            icon: <FileCheck className="w-5 h-5 text-blue-600" />,
            title: "Đối Soát Chỉ Số Tài Chính & Tăng Trưởng",
            auditDetail: "Đối soát trực tiếp qua cổng thanh toán và sao kê tài chính. Không chấp nhận số liệu tự khai khống.",
            metricTags: ["MRR $24.5K Audited", "LTV/CAC 8.2x", "Gross Margin 76.4%"],
        },
        {
            id: 2,
            label: "Successful Deal Closings & Traction",
            code: "SIG_03",
            weight: 30,
            score: "94/100",
            icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
            title: "Lịch Sử Vòng Gọi & Sự Tín Nhiệm Của Quỹ",
            auditDetail: "Lưu trữ lịch sử cam kết giải ngân, thư bày tỏ nguyện vọng đầu tư (LOI) và Term Sheet đã được xác minh.",
            metricTags: ["12 Term Sheets", "Cap Table Verified", "Double Opt-in Active"],
        },
    ];

    const currentSig = signals[selectedSignal] ?? signals[0];

    return (
        <section className="relative py-28 bg-[#FAFAFA] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[720px] h-[480px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: SCI Audit Gauge Pedestal */}
                    <div className="lg:col-span-5 bg-white border border-gray-200/90 rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col items-center">
                        <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Startup Credibility Index (SCI)
                                </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                TIER-1 ACCREDITED
                            </span>
                        </div>

                        {/* High-Precision Circular Audit Gauge */}
                        <div className="relative w-48 h-48 my-2">
                            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                                <circle 
                                    cx="80" cy="80" r="64" 
                                    stroke="#F3F4F6" strokeWidth="12" fill="none" 
                                />
                                <circle
                                    cx="80" cy="80" r="64"
                                    stroke="#111827" strokeWidth="12" fill="none"
                                    strokeDasharray={`${0.94 * 2 * Math.PI * 64} ${2 * Math.PI * 64}`}
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="80" cy="80" r="64"
                                    stroke="#F59E0B" strokeWidth="12" fill="none"
                                    strokeDasharray={`${0.35 * 2 * Math.PI * 64} ${2 * Math.PI * 64}`}
                                    strokeDashoffset={`${-0.59 * 2 * Math.PI * 64}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-[#111827] font-mono tracking-tight">94</span>
                                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mt-0.5">XUẤT SẮC • TIER 1</span>
                                <span className="text-[10px] text-gray-400 font-mono">THANG ĐIỂM 100</span>
                            </div>
                        </div>

                        <div className="text-center mt-2 mb-6">
                            <div className="text-base font-bold text-[#111827]">{cr.scoreTitle}</div>
                            <div className="text-xs text-gray-500 mt-1">{cr.gaugeSub}</div>
                        </div>

                        {/* Interactive 3 Pillar Signal Progress Bars */}
                        <div className="w-full flex flex-col gap-3.5 pt-5 border-t border-gray-100">
                            {signals.map((s, idx) => (
                                <div 
                                    key={s.code} 
                                    onClick={() => setSelectedSignal(idx)}
                                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                                        selectedSignal === idx
                                            ? "bg-amber-50/70 border-amber-300 shadow-xs"
                                            : "bg-gray-50/50 border-gray-100 hover:border-gray-200"
                                    }`}
                                >
                                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                                        <span className="text-gray-800 flex items-center gap-1.5">
                                            {s.icon}
                                            {s.label}
                                        </span>
                                        <span className="font-mono font-bold text-gray-900">{s.score} ({s.weight}%)</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200/80 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                idx === 0 ? "bg-amber-500" : idx === 1 ? "bg-blue-600" : "bg-emerald-600"
                                            }`}
                                            style={{ width: `${s.weight * 2.7}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Detailed Audit Criteria & Trust Signals */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm w-fit">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            {cr.label}
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500 font-normal">MINH BẠCH & THỰC CHẤT</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-4">
                            {cr.title1}
                            <br />
                            <span className="relative inline-block text-[#111827]">
                                {cr.title2}
                                <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-amber-300/40 -z-10 rounded-sm" />
                            </span>
                        </h2>

                        <p className="text-base text-gray-600 leading-relaxed mb-6">
                            Bộ chỉ số tín nhiệm SCI giải quyết triệt để vấn nạn thông tin bất đối xứng giữa Nhà sáng lập và Quỹ đầu tư. Mọi dữ liệu đều được thẩm định đa nguồn, loại bỏ hoàn toàn các con số phóng đại trên slide thuyết trình.
                        </p>

                        {/* Active Pillar Highlight Card */}
                        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-gray-900 text-white">
                                    TIÊU CHÍ CHI TIẾT • {currentSig.code}
                                </span>
                                <span className="text-xs text-amber-600 font-bold">
                                    Trọng số: {currentSig.weight}% tổng điểm
                                </span>
                            </div>

                            <h4 className="text-lg font-bold text-[#111827] mb-2">
                                {currentSig.title}
                            </h4>

                            <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                {currentSig.auditDetail}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                                {currentSig.metricTags.map((tag) => (
                                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Trust Compliance Footer */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200/60">
                                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>Bảo mật dữ liệu chuẩn SOC-2 & ISO 27001</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200/60">
                                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Khung thẩm định chuẩn hóa NVCA quốc tế</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
