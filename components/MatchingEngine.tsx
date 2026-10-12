"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import { 
    Cpu, 
    Filter, 
    Sliders, 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    Layers, 
    TrendingUp,
    Building2,
    RefreshCw
} from "lucide-react";

export default function MatchingEngine() {
    const dict = useDictionary();
    const mt = dict.matching;

    const [selectedSector, setSelectedSector] = useState("AI & Machine Learning");
    const [selectedStage, setSelectedStage] = useState("Seed ($150K - $500K)");

    const sectors = [
        "AI & Machine Learning",
        "Fintech & Payments",
        "B2B SaaS Enterprise",
        "Greentech & Logistics",
    ];

    const stages = [
        "Pre-Seed ($50K - $150K)",
        "Seed ($150K - $500K)",
        "Pre-Series A ($500K - $1.5M)",
    ];

    // Dynamic simulated results
    const simulationResults: Record<string, { score: number; funds: string[]; ticket: string; thesisFit: string }> = {
        "AI & Machine Learning": {
            score: 96,
            funds: ["Ascend Vietnam Ventures", "CyberAgent Capital", "Nextrans"],
            ticket: "$200,000 - $450,000",
            thesisFit: "Ưu tiên DeepTech & Tối ưu năng suất B2B",
        },
        "Fintech & Payments": {
            score: 93,
            funds: ["Do Ventures", "Insignia Ventures Partners", "VinaCapital Ventures"],
            ticket: "$250,000 - $500,000",
            thesisFit: "Đã có giấy phép trung gian hoặc đối tác ngân hàng",
        },
        "B2B SaaS Enterprise": {
            score: 95,
            funds: ["Wavemaker Partners", "Monk's Hill Ventures", "500 Global"],
            ticket: "$150,000 - $400,000",
            thesisFit: "ARR > $100K hoặc tốc độ tăng trưởng MoM > 20%",
        },
        "Greentech & Logistics": {
            score: 91,
            funds: ["ADB Ventures", "Touchstone Partners", "Genesia Ventures"],
            ticket: "$200,000 - $600,000",
            thesisFit: "Tác động giảm phát thải carbon đo lường được",
        },
    };

    const currentResult = simulationResults[selectedSector] ?? simulationResults["AI & Machine Learning"];

    const rules = [
        {
            code: "RULE_01",
            tag: "SECTOR_FIT",
            label: mt.rule1Label,
            desc: mt.rule1Desc,
            icon: <Filter className="w-5 h-5 text-amber-600" />,
        },
        {
            code: "RULE_02",
            tag: "STAGE_FIT",
            label: mt.rule2Label,
            desc: mt.rule2Desc,
            icon: <Layers className="w-5 h-5 text-blue-600" />,
        },
        {
            code: "RULE_03",
            tag: "AUTONOMOUS",
            label: mt.rule3Label,
            desc: mt.rule3Desc,
            icon: <Cpu className="w-5 h-5 text-emerald-600" />,
        },
    ];

    return (
        <section className="relative py-28 bg-[#FFFFFF] border-t border-gray-200/80 overflow-hidden fintech-grid-bg">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[720px] h-[480px] bg-radial from-amber-400/8 via-amber-200/4 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 text-xs font-semibold text-amber-700 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {mt.label}
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 font-normal">KHỚP LỆNH TỰ ĐỘNG</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                        {mt.title1}
                        <br />
                        <span className="relative inline-block text-[#111827]">
                            {mt.title2}
                            <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-amber-300/40 -z-10 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-base text-gray-600 mt-4 leading-relaxed">
                        {mt.sub}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                    
                    {/* Left: Interactive Thesis Matching Simulator */}
                    <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-2xl p-7 shadow-[0_12px_36px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-700">
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-900 uppercase tracking-wide">Thesis Matching Simulator</div>
                                        <div className="text-[11px] text-gray-500">Mô phỏng thuật toán khớp lệnh danh mục VC</div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> Live Engine
                                </span>
                            </div>

                            {/* Control 1: Select Sector */}
                            <div className="mb-5">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                                    1. Lĩnh Vực Hoạt Động (Industry Sector):
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {sectors.map((sec) => (
                                        <button
                                            key={sec}
                                            onClick={() => setSelectedSector(sec)}
                                            className={`text-xs font-semibold p-2.5 rounded-xl border text-left transition-all ${
                                                selectedSector === sec
                                                    ? "bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-xs"
                                                    : "bg-gray-50/80 border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            {sec}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Control 2: Select Funding Stage */}
                            <div className="mb-6">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                                    2. Giai Đoạn Gọi Vốn & Quy Mô Vé (Stage & Ticket):
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {stages.map((stg) => (
                                        <button
                                            key={stg}
                                            onClick={() => setSelectedStage(stg)}
                                            className={`text-xs font-semibold p-2.5 rounded-xl border text-center transition-all ${
                                                selectedStage === stg
                                                    ? "bg-gray-900 border-gray-900 text-white font-bold shadow-xs"
                                                    : "bg-gray-50/80 border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            {stg.split(" ")[0]}
                                            <span className="block text-[10px] opacity-75 font-normal">{stg.split(" ")[1]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Simulation Engine Output Card */}
                            <div className="p-5 rounded-2xl bg-[#111827] text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                                        KẾT QUẢ KHỚP LỆNH DANH MỤC
                                    </span>
                                    <span className="text-2xl font-black text-amber-400 font-mono">
                                        {currentResult.score}% PHÙ HỢP
                                    </span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-800">
                                        <span className="text-gray-400">Quỹ đầu tư hàng đầu phù hợp:</span>
                                        <span className="font-bold text-white text-right">{currentResult.funds.join(" • ")}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-800">
                                        <span className="text-gray-400">Vé giải ngân khuyến nghị:</span>
                                        <span className="font-mono font-bold text-emerald-400">{currentResult.ticket}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs py-1.5">
                                        <span className="text-gray-400">Luận điểm tương thích:</span>
                                        <span className="text-gray-200 text-right">{currentResult.thesisFit}</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                        Cơ chế Double Opt-in Bảo Mật
                                    </span>
                                    <span className="text-amber-400 font-semibold">Tự động kết nối 2 chiều →</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-center text-xs text-gray-500">
                            * Thuật toán cập nhật liên tục từ dữ liệu giải ngân thực tế của các Quỹ thành viên.
                        </div>
                    </div>

                    {/* Right: 3 Algorithmic Rule Cards */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                            Tiêu Chí Sàng Lọc & Khớp Lệnh
                        </div>

                        {rules.map((rule) => (
                            <div
                                key={rule.code}
                                className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm hover:border-gray-300 hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                                                {rule.icon}
                                            </div>
                                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                                                {rule.code}
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                                            {rule.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-[#111827] mb-1.5">
                                        {rule.label}
                                    </h3>

                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {rule.desc}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                                    <span>Tự động hóa hoàn toàn</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
