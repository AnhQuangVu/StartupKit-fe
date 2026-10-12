"use client";

import { useState } from "react";
import Link from "next/link";
import { useDictionary } from "@/lib/dict-context";

type SectorFilter = "all" | "fintech" | "ai" | "climate";

interface FeaturedDeal {
    id: string;
    name: string;
    sector: string;
    sectorLabel: string;
    stage: string;
    tagline: string;
    targetAmount: string;
    committedAmount: string;
    percentFilled: number;
    sciScore: number;
    mrr: string;
    momGrowth: string;
    runway: string;
    coInvestors: string[];
    location: string;
}

const FEATURED_DEALS: Record<SectorFilter, FeaturedDeal> = {
    all: {
        id: "finflow",
        name: "FinFlow Treasury",
        sector: "fintech",
        sectorLabel: "B2B FinTech",
        stage: "Seed Round",
        tagline: "Hạ tầng quản trị thanh toán đa tiền tệ và tối ưu dòng tiền B2B cho doanh nghiệp xuất khẩu.",
        targetAmount: "$1,000,000",
        committedAmount: "$680,000",
        percentFilled: 68,
        sciScore: 94,
        mrr: "$48,500",
        momGrowth: "+24% MoM",
        runway: "18 tháng",
        coInvestors: ["Nextrans", "500 Global", "Do Ventures"],
        location: "TP. Hồ Chí Minh"
    },
    fintech: {
        id: "finflow",
        name: "FinFlow Treasury",
        sector: "fintech",
        sectorLabel: "B2B FinTech",
        stage: "Seed Round",
        tagline: "Hạ tầng quản trị thanh toán đa tiền tệ và tối ưu dòng tiền B2B cho doanh nghiệp xuất khẩu.",
        targetAmount: "$1,000,000",
        committedAmount: "$680,000",
        percentFilled: 68,
        sciScore: 94,
        mrr: "$48,500",
        momGrowth: "+24% MoM",
        runway: "18 tháng",
        coInvestors: ["Nextrans", "500 Global", "Do Ventures"],
        location: "TP. Hồ Chí Minh"
    },
    ai: {
        id: "vinai-flow",
        name: "OmniAI Platform",
        sector: "ai",
        sectorLabel: "Enterprise AI SaaS",
        stage: "Pre-Series A",
        tagline: "Giải pháp AI tự động hóa chuỗi cung ứng và phân tích tài liệu hợp đồng thời gian thực.",
        targetAmount: "$1,500,000",
        committedAmount: "$1,120,000",
        percentFilled: 75,
        sciScore: 96,
        mrr: "$78,000",
        momGrowth: "+31% MoM",
        runway: "22 tháng",
        coInvestors: ["Golden Gate", "CyberAgent", "VNG Syndicate"],
        location: "Hà Nội"
    },
    climate: {
        id: "agrigreen",
        name: "AgriCarbon Nexus",
        sector: "climate",
        sectorLabel: "ClimateTech / AgriTech",
        stage: "Seed Round",
        tagline: "Sàn giao dịch tín chỉ carbon nông nghiệp và giám sát phát thải chuỗi cung ứng xuất khẩu.",
        targetAmount: "$750,000",
        committedAmount: "$480,000",
        percentFilled: 64,
        sciScore: 90,
        mrr: "$28,000",
        momGrowth: "+19% MoM",
        runway: "16 tháng",
        coInvestors: ["Reapra", "Touchstone Partners", "Angel Network"],
        location: "Đà Nẵng"
    }
};

export default function EcosystemMapHero() {
    const dict = useDictionary();
    const [selectedSector, setSelectedSector] = useState<SectorFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [savedNotification, setSavedNotification] = useState(false);

    const activeDeal = FEATURED_DEALS[selectedSector] || FEATURED_DEALS.all;

    const handleSaveDeal = () => {
        setSavedNotification(true);
        setTimeout(() => setSavedNotification(false), 2400);
    };

    return (
        <section className="relative w-full bg-[#FFFFFF] border-b border-[#EAEAEA] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
            {/* Subtle background ambient dot grid */}
            <div className="absolute inset-0 fintech-grid-bg opacity-70 pointer-events-none" />

            {/* Subtle warm atmospheric glow */}
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.12) 0%, rgba(244, 180, 0, 0.02) 50%, transparent 75%)",
                }}
            />

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
                
                {/* 2-Column Split: Value Proposition & Interactive Venture Terminal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-16">
                    
                    {/* Left Column: Heading, Search & Value Prop */}
                    <div className="lg:col-span-6 flex flex-col items-start z-10">
                        
                        {/* Institutional Network Badge */}
                        <div className="inline-flex items-center gap-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-full px-3.5 py-1.5 mb-6 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                            <span className="text-[12px] font-semibold text-[#1F2937] tracking-wide">
                                VIETNAM & SEA VENTURE NETWORK
                            </span>
                            <span className="text-[11px] text-[#D97706] font-bold bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                                500+ DEALS
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] font-black text-[#111827] leading-[1.12] tracking-tight mb-5">
                            Kết nối Dòng vốn
                            <br />
                            <span className="text-[#111827] relative inline-block">
                                & Cố vấn Thể chế
                                <span className="absolute bottom-1.5 left-0 right-0 h-[6px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                            </span>
                            <br />
                            <span className="text-[#4B5563] text-[32px] sm:text-[42px] lg:text-[46px] font-bold">
                                cho Khởi nghiệp.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[16px] text-[#4B5563] leading-[1.7] mb-8 max-w-[540px]">
                            Hạ tầng kết nối trực tiếp Nhà sáng lập xuất sắc, Cố vấn thực chiến và Mạng lưới Quỹ đầu tư mạo hiểm. Chuẩn hóa hồ sơ gọi vốn, thẩm định minh bạch, cam kết <strong className="text-[#111827]">Zero Upfront (10% Phí thành công)</strong>.
                        </p>

                        {/* Interactive Search & Filter Bar */}
                        <div className="w-full max-w-[540px] bg-white border border-[#D1D5DB] rounded-[12px] p-2 shadow-sm mb-6 focus-within:border-[#111827] focus-within:ring-2 focus-within:ring-[#111827]/10 transition-all">
                            <div className="flex items-center gap-2 px-2 pb-2 border-b border-[#F3F4F6]">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[#9CA3AF]">
                                    <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm kiếm startup, ngành, vòng gọi vốn, hoặc quỹ VC..."
                                    className="w-full text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none bg-transparent"
                                />
                                <Link
                                    href={`/market/startups${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}
                                    className="shrink-0 bg-[#111827] hover:bg-[#1F2937] text-white text-[12.5px] font-semibold px-3.5 py-1.5 rounded-[8px] transition-colors"
                                >
                                    Khám phá
                                </Link>
                            </div>

                            {/* Sector Filter Chips */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-2 px-1">
                                <span className="text-[11.5px] font-medium text-[#6B7280] mr-1">Lĩnh vực:</span>
                                {[
                                    { key: "all", label: "Tất cả" },
                                    { key: "fintech", label: "FinTech" },
                                    { key: "ai", label: "AI & SaaS" },
                                    { key: "climate", label: "ClimateTech" },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedSector(tab.key as SectorFilter)}
                                        className={`text-[12px] font-medium px-2.5 py-1 rounded-[6px] transition-all ${
                                            selectedSector === tab.key
                                                ? "bg-[#111827] text-white font-semibold shadow-xs"
                                                : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827]"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-6">
                            <Link
                                href="/market/investments"
                                className="inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#1F2937] text-white text-[15px] font-semibold px-7 py-3.5 rounded-[10px] shadow-sm hover:shadow transition-all"
                            >
                                Khám phá Luồng Deal (Dealflow)
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>

                            <Link
                                href="/register?role=startup"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9FAFB] border border-[#D1D5DB] hover:border-[#111827] text-[#111827] text-[15px] font-semibold px-7 py-3.5 rounded-[10px] shadow-xs transition-all"
                            >
                                Tạo Hồ sơ Gọi vốn (Miễn phí)
                            </Link>
                        </div>

                        {/* Trust Micro-Bullets */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[12.5px] text-[#4B5563]">
                            <span className="flex items-center gap-1.5 font-medium">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-emerald-600">
                                    <path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                10% Phí thành công khi giải ngân
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-emerald-600">
                                    <path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Virtual Deal Room bảo mật
                            </span>
                        </div>

                    </div>

                    {/* Right Column: Interactive Venture Terminal (Real Product Mockup) */}
                    <div className="lg:col-span-6 relative">
                        
                        {/* Terminal Outer Frame */}
                        <div className="relative bg-white border border-[#E5E7EB] rounded-[18px] shadow-xl overflow-hidden transition-all">
                            
                            {/* Window Topbar */}
                            <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-5 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                                    <span className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                                    <span className="text-[12px] font-mono font-medium text-[#6B7280] ml-2">
                                        startupkit.vn/dealroom/{activeDeal.id}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        LIVE DEAL
                                    </span>
                                </div>
                            </div>

                            {/* Deal Spotlight Body */}
                            <div className="p-6 md:p-7">
                                
                                {/* Deal Title & Verification */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-[12px] bg-[#111827] text-white flex items-center justify-center font-black text-[18px] shadow-sm">
                                            {activeDeal.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[19px] font-bold text-[#111827]">
                                                    {activeDeal.name}
                                                </h3>
                                                <span className="text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] px-2 py-0.5 rounded-[4px]">
                                                    {activeDeal.stage}
                                                </span>
                                            </div>
                                            <p className="text-[12.5px] text-[#6B7280]">
                                                {activeDeal.sectorLabel} • {activeDeal.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Startup Credibility Index (SCI) Badge */}
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1.5 bg-[#F8F9FA] border border-[#E5E7EB] px-3 py-1 rounded-[8px]">
                                            <span className="text-[10px] font-bold text-[#6B7280]">SCI SCORE</span>
                                            <span className="text-[15px] font-black text-[#111827]">{activeDeal.sciScore}</span>
                                            <span className="text-[10px] text-[#9CA3AF]">/100</span>
                                        </div>
                                        <span className="text-[10px] font-semibold text-emerald-600 mt-1">
                                            ✓ Verified Audit
                                        </span>
                                    </div>
                                </div>

                                {/* One-line Pitch */}
                                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-6 bg-[#F9FAFB] p-3 rounded-[8px] border border-[#F3F4F6]">
                                    "{activeDeal.tagline}"
                                </p>

                                {/* Live Funding Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between text-[13px] mb-2 font-medium">
                                        <span className="text-[#374151]">
                                            Đã cam kết: <strong className="text-[#111827] font-bold">{activeDeal.committedAmount}</strong>
                                        </span>
                                        <span className="text-[#6B7280]">
                                            Mục tiêu: <strong className="text-[#111827]">{activeDeal.targetAmount}</strong> ({activeDeal.percentFilled}%)
                                        </span>
                                    </div>
                                    <div className="w-full h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden border border-[#E5E7EB]">
                                        <div
                                            className="h-full bg-[#F4B400] rounded-full transition-all duration-700"
                                            style={{ width: `${activeDeal.percentFilled}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Key Traction Metrics Grid */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-[10px] text-center">
                                        <span className="text-[11px] text-[#6B7280] font-medium block">MRR HIỆN TẠI</span>
                                        <span className="text-[15px] font-black text-[#111827] block mt-0.5">{activeDeal.mrr}</span>
                                    </div>
                                    <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-[10px] text-center">
                                        <span className="text-[11px] text-[#6B7280] font-medium block">TĂNG TRƯỞNG</span>
                                        <span className="text-[15px] font-black text-emerald-600 block mt-0.5">{activeDeal.momGrowth}</span>
                                    </div>
                                    <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-[10px] text-center">
                                        <span className="text-[11px] text-[#6B7280] font-medium block">RUNWAY</span>
                                        <span className="text-[15px] font-black text-[#111827] block mt-0.5">{activeDeal.runway}</span>
                                    </div>
                                </div>

                                {/* Backed by & Co-Investors */}
                                <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6] mb-5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11.5px] font-semibold text-[#6B7280]">Đồng đầu tư:</span>
                                        <div className="flex items-center gap-1.5">
                                            {activeDeal.coInvestors.map((investor) => (
                                                <span
                                                    key={investor}
                                                    className="text-[11px] font-semibold bg-[#F3F4F6] text-[#374151] px-2 py-0.5 rounded-[4px] border border-[#E5E7EB]"
                                                >
                                                    {investor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Deal Action Footer */}
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/market/investments"
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#1F2937] text-white text-[13.5px] font-semibold py-2.5 px-4 rounded-[8px] transition-all shadow-xs"
                                    >
                                        Xem Virtual Deal Room
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={handleSaveDeal}
                                        className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] text-[13px] font-medium py-2.5 px-3.5 rounded-[8px] transition-colors"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                        </svg>
                                        {savedNotification ? "Đã lưu ✓" : "Lưu Deal"}
                                    </button>
                                </div>

                            </div>

                            {/* Live activity ticker */}
                            <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] px-5 py-2.5 flex items-center justify-between text-[11.5px] text-[#6B7280]">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Quỹ <strong>Nextrans</strong> vừa xem hồ sơ của {activeDeal.name}</span>
                                </span>
                                <span className="font-mono text-[#9CA3AF]">2 phút trước</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* 3 High-Trust Metric Bento Cards at Bottom of Hero */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F3F4F6]">
                    
                    <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-6 shadow-xs hover:border-[#111827] hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wide uppercase">
                                THẨM ĐỊNH NGUỒN DEAL
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                        </div>
                        <div className="text-[32px] font-black text-[#111827] leading-none mb-2">
                            +500 Startups
                        </div>
                        <p className="text-[13.5px] text-[#4B5563] leading-relaxed">
                            Hồ sơ Pre-Seed đến Series A tại Việt Nam được chuẩn hóa đầy đủ số liệu tài chính sống.
                        </p>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-6 shadow-xs hover:border-[#111827] hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wide uppercase">
                                THANH KHOẢN VỐN ĐẦU TƯ
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-[32px] font-black text-[#111827] leading-none mb-2">
                            $18.5M+
                        </div>
                        <p className="text-[13.5px] text-[#4B5563] leading-relaxed">
                            Quy mô vốn mở vòng từ hơn 80+ quỹ đầu tư mạo hiểm và nhà đầu tư thiên thần công khai khẩu vị.
                        </p>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-6 shadow-xs hover:border-[#111827] hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wide uppercase">
                                CHUẨN XÁC THEO LUẬN ĐIỂM
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#111827]" />
                        </div>
                        <div className="text-[32px] font-black text-[#111827] leading-none mb-2">
                            98.2%
                        </div>
                        <p className="text-[13.5px] text-[#4B5563] leading-relaxed">
                            Khớp lệnh tự động giữa năng lực đội ngũ sáng lập với khẩu vị giải ngân của nhà đầu tư.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}