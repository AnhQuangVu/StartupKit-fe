"use client";

import { useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";

type TabMode = "all" | "startups" | "investors" | "mentors";

export default function EcosystemMapHero() {
    const dict = useDictionary();
    const h = dict.hero;
    const [activeTab, setActiveTab] = useState<TabMode>("all");
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <section
            className="relative w-full bg-[#FFFFFF] overflow-hidden border-b-2 border-[#111111] pt-[72px]"
            style={{ minHeight: "720px" }}
        >
            {/* 3D Isometric Background Grid with animated depth */}
            <div className="absolute inset-0 iso-grid-bg opacity-70 pointer-events-none" />

            {/* Floating 3D Geometric Polyhedrons in Background */}
            <div className="absolute top-20 left-8 iso-float pointer-events-none opacity-40 hidden xl:block">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <polygon points="36,6 66,22 36,38 6,22" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
                    <polygon points="6,22 36,38 36,64 6,48" fill="#F4B400" stroke="#111111" strokeWidth="1.5" />
                    <polygon points="36,38 66,22 66,48 36,64" fill="#D99B00" stroke="#111111" strokeWidth="1.5" />
                </svg>
            </div>

            <div className="absolute bottom-28 left-1/3 iso-float-reverse pointer-events-none opacity-30 hidden xl:block">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <polygon points="28,5 50,18 28,31 6,18" fill="#F4B400" stroke="#111111" strokeWidth="1.2" />
                    <polygon points="6,18 28,31 28,50 6,37" fill="#111111" stroke="#111111" strokeWidth="1.2" />
                    <polygon points="28,31 50,18 50,37 28,50" fill="#333333" stroke="#111111" strokeWidth="1.2" />
                </svg>
            </div>

            <div className="absolute top-28 right-12 iso-float-delay pointer-events-none opacity-40 hidden xl:block">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <polygon points="40,8 72,25 40,42 8,25" fill="#FFFFFF" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="8,25 40,42 40,70 8,53" fill="#EAEAEA" stroke="#111111" strokeWidth="1.6" />
                    <polygon points="40,42 72,25 72,53 40,70" fill="#CCCCCC" stroke="#111111" strokeWidth="1.6" />
                </svg>
            </div>

            {/* Radial Gold Ambient Spotlight with Dynamic Breathing Glow */}
            <div
                className="absolute top-1/4 left-1/2 w-[840px] h-[520px] pointer-events-none rounded-full iso-ambient-glow"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.22) 0%, rgba(244, 180, 0, 0.06) 50%, transparent 70%)",
                }}
            />

            <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-18">
                
                {/* Main 2-Column Split: Content & Big 3D Isometric Platform */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">
                    
                    {/* Left Column: Hero Typography & Actions */}
                    <div className="lg:col-span-5 flex flex-col items-start z-10">
                        {/* Institutional Venture Badge */}
                        <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white rounded-[8px] px-3.5 py-1.5 mb-6 shadow-sm border border-[#222222]">
                            <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                            <span className="text-[12px] font-semibold tracking-wide uppercase">{h.badge}</span>
                            <span className="text-[11px] text-[#F4B400] font-medium pl-2.5 border-l border-[#333333]">VENTURE NETWORK</span>
                        </div>

                        <p className="text-[13px] font-extrabold text-[#D99B00] uppercase tracking-[0.22em] mb-3">
                            {h.powered}
                        </p>

                        <div className="relative mb-5">
                            <span className="hidden lg:block absolute -left-6 top-2 bottom-2 w-[5px] rounded-full bg-[#F4B400]" />
                            <h1 className="text-[40px] sm:text-[50px] lg:text-[56px] font-black text-[#111111] leading-[1.1] tracking-tight">
                                {h.title1}
                                <br />
                                <span className="relative inline-block text-[#111111]">
                                    {h.title2}
                                    <span className="absolute bottom-1.5 left-0 right-0 h-[8px] bg-[#F4B400]/45 -z-10 rounded-sm" />
                                </span>
                            </h1>
                        </div>

                        <div className="w-[72px] h-[4px] bg-[#F4B400] rounded-full mb-6" />

                        <p className="text-[15px] font-bold text-[#111111] mb-2 leading-relaxed">
                            {h.ai}
                        </p>

                        <p className="text-[15px] text-[#666666] leading-[1.7] mb-8 max-w-[480px]">
                            {h.sub}
                        </p>

                        {/* Interactive Filter Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-8 bg-[#F7F7F7] p-1.5 rounded-[10px] border border-[#EAEAEA]">
                            {(["all", "startups", "investors", "mentors"] as TabMode[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[13px] font-semibold px-4 py-2 rounded-[7px] transition-all capitalize ${
                                        activeTab === tab
                                            ? "bg-[#111111] text-white shadow-sm"
                                            : "text-[#555555] hover:text-[#111111] hover:bg-white"
                                    }`}
                                >
                                    {tab === "all" ? "Toàn cảnh hệ sinh thái" : tab}
                                </button>
                            ))}
                        </div>

                        {/* Clean Institutional Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                            <a
                                href="#ecosystem"
                                className="inline-flex items-center justify-center gap-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[15px] font-semibold px-7 py-3.5 rounded-[8px] transition-all shadow-sm hover:shadow"
                            >
                                {h.cta1}
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F4B400] text-[#111111]">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </a>

                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9F9F9] border border-[#CCCCCC] hover:border-[#111111] text-[#111111] text-[15px] font-semibold px-7 py-3.5 rounded-[8px] transition-all shadow-sm"
                            >
                                {h.cta2}
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Grand 3D Isometric Platform (Prominent & Spacious) */}
                    <div className="lg:col-span-7 relative flex items-center justify-center">
                        <div className="relative w-full max-w-[680px] aspect-[16/11] flex items-center justify-center">
                            
                            {/* Grand 3D Isometric Ecosystem SVG */}
                            <svg
                                viewBox="0 0 680 460"
                                className="w-full h-full drop-shadow-2xl select-none"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="grandIsoTop" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFFFFF" />
                                        <stop offset="50%" stopColor="#FAFAF9" />
                                        <stop offset="100%" stopColor="#F4F4F2" />
                                    </linearGradient>

                                    <linearGradient id="grandFrontLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#E5E5E5" />
                                        <stop offset="100%" stopColor="#CCCCCC" />
                                    </linearGradient>

                                    <linearGradient id="grandFrontRight" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#D5D5D5" />
                                        <stop offset="100%" stopColor="#BBBBBB" />
                                    </linearGradient>

                                    <linearGradient id="goldBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#F4B400" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#F4B400" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>

                                {/* Drop shadow of 3D platform */}
                                <polygon
                                    points="340,420 640,250 340,100 40,250"
                                    fill="#000000"
                                    fillOpacity="0.08"
                                    transform="translate(0, 24)"
                                />

                                {/* 3D Pedestal Left Face */}
                                <polygon
                                    points="40,250 340,420 340,455 40,285"
                                    fill="url(#grandFrontLeft)"
                                    stroke="#111111"
                                    strokeWidth="1.8"
                                />

                                {/* 3D Pedestal Right Face */}
                                <polygon
                                    points="340,420 640,250 640,285 340,455"
                                    fill="url(#grandFrontRight)"
                                    stroke="#111111"
                                    strokeWidth="1.8"
                                />

                                {/* 3D Platform Top Face */}
                                <polygon
                                    points="340,80 640,250 340,420 40,250"
                                    fill="url(#grandIsoTop)"
                                    stroke="#111111"
                                    strokeWidth="2.5"
                                />

                                {/* Isometric Diamond Coordinates Grid */}
                                <line x1="140" y1="195" x2="440" y2="365" stroke="#EAEAEA" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="240" y1="140" x2="540" y2="310" stroke="#EAEAEA" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="540" y1="195" x2="240" y2="365" stroke="#EAEAEA" strokeWidth="1.5" strokeDasharray="4 4" />
                                <line x1="440" y1="140" x2="140" y2="310" stroke="#EAEAEA" strokeWidth="1.5" strokeDasharray="4 4" />

                                {/* Main Gold Energy Spine */}
                                <line x1="340" y1="80" x2="340" y2="420" stroke="#F4B400" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="6 6" />

                                {/* Glowing Gold Data Arteries */}
                                <path
                                    d="M210 200 L340 270 L470 200 M340 270 L340 375"
                                    stroke="#F4B400"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Flowing Data Particles */}
                                <circle cx="275" cy="235" r="4" fill="#111111">
                                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="405" cy="235" r="4" fill="#111111">
                                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.6s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="340" cy="325" r="4.5" fill="#F4B400">
                                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="1.2s" repeatCount="indefinite" />
                                </circle>

                                {/* Stylized Vietnam Economic S-Curve in 2.5D Elevation */}
                                <g transform="translate(10, 0)">
                                    {/* Thick 3D Relief Shadow */}
                                    <path
                                        d="M 300 160 
                                           C 325 175, 335 195, 330 220 
                                           C 325 245, 345 270, 360 295 
                                           C 370 315, 365 340, 345 360
                                           C 325 375, 305 380, 285 370"
                                        stroke="#000000"
                                        strokeOpacity="0.1"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        fill="none"
                                        transform="translate(0, 4)"
                                    />

                                    {/* Vietnam 2.5D Ribbon */}
                                    <path
                                        d="M 300 160 
                                           C 325 175, 335 195, 330 220 
                                           C 325 245, 345 270, 360 295 
                                           C 370 315, 365 340, 345 360
                                           C 325 375, 305 380, 285 370"
                                        stroke="#111111"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M 300 160 
                                           C 325 175, 335 195, 330 220 
                                           C 325 245, 345 270, 360 295 
                                           C 370 315, 365 340, 345 360
                                           C 325 375, 305 380, 285 370"
                                        stroke="#F4B400"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        fill="none"
                                    />

                                    {/* 1. Hà Nội Node */}
                                    <g
                                        className="cursor-pointer transition-transform"
                                        onMouseEnter={() => setHoveredNode("hanoi")}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    >
                                        <circle cx="300" cy="160" r="14" stroke="#F4B400" strokeWidth="2" fill="none">
                                            <animate attributeName="r" values="8;24;8" dur="2.4s" repeatCount="indefinite" />
                                            <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="300" cy="160" r="7" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
                                        <circle cx="300" cy="160" r="3.5" fill="#F4B400" />
                                        <text x="300" y="138" textAnchor="middle" fill="#111111" fontSize="13" fontWeight="900">
                                            HÀ NỘI
                                        </text>
                                    </g>

                                    {/* 2. Đà Nẵng Node */}
                                    <g
                                        className="cursor-pointer transition-transform"
                                        onMouseEnter={() => setHoveredNode("danang")}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    >
                                        <circle cx="340" cy="235" r="6" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
                                        <circle cx="340" cy="235" r="3" fill="#F4B400" />
                                        <text x="372" y="240" textAnchor="start" fill="#222222" fontSize="12" fontWeight="800">
                                            ĐÀ NẴNG
                                        </text>
                                    </g>

                                    {/* 3. TP. Hồ Chí Minh Node */}
                                    <g
                                        className="cursor-pointer transition-transform"
                                        onMouseEnter={() => setHoveredNode("hcmc")}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    >
                                        <circle cx="330" cy="350" r="16" stroke="#F4B400" strokeWidth="2" fill="none">
                                            <animate attributeName="r" values="9;28;9" dur="2.2s" repeatCount="indefinite" />
                                            <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="2.2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="330" cy="350" r="8" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
                                        <circle cx="330" cy="350" r="4" fill="#F4B400" />
                                        <text x="330" y="380" textAnchor="middle" fill="#111111" fontSize="13" fontWeight="900">
                                            TP. HỒ CHÍ MINH
                                        </text>
                                    </g>

                                    {/* 4. Hoàng Sa & Trường Sa with prominent sovereignty labels */}
                                    <g>
                                        <circle cx="430" cy="205" r="4.5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1.5" />
                                        <circle cx="430" cy="205" r="10" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                        <text x="445" y="210" textAnchor="start" fill="#444444" fontSize="11" fontWeight="700">
                                            QĐ. Hoàng Sa
                                        </text>

                                        <circle cx="460" cy="315" r="4.5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1.5" />
                                        <circle cx="460" cy="315" r="10" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                        <text x="475" y="320" textAnchor="start" fill="#444444" fontSize="11" fontWeight="700">
                                            QĐ. Trường Sa
                                        </text>
                                    </g>
                                </g>

                                {/* 3D Floating Central AI Core Crystal */}
                                <g transform="translate(340, 250)" className="iso-float">
                                    <ellipse cx="0" cy="32" rx="36" ry="15" fill="#000000" fillOpacity="0.14" />
                                    {/* 3D Polyhedron facets */}
                                    <polygon points="0,-45 30,-8 -30,-8" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <polygon points="0,-45 30,-8 0,0" fill="#E59B00" stroke="#FFFFFF" strokeWidth="1" />
                                    <polygon points="0,-45 -30,-8 0,0" fill="#FFC933" stroke="#FFFFFF" strokeWidth="1" />
                                    <polygon points="0,32 30,-8 0,0" fill="#CC8A00" stroke="#FFFFFF" strokeWidth="1" />
                                    <polygon points="0,32 -30,-8 0,0" fill="#B37700" stroke="#FFFFFF" strokeWidth="1" />

                                    {/* Orbiting Tech Ring */}
                                    <ellipse cx="0" cy="0" rx="46" ry="18" stroke="#F4B400" strokeWidth="1.8" strokeDasharray="5 5" fill="none">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0"
                                            to="360"
                                            dur="16s"
                                            repeatCount="indefinite"
                                        />
                                    </ellipse>
                                </g>
                            </svg>

                            {/* Interactive Spatial Telemetry HUD (Top-Right) */}
                            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex flex-col items-end gap-2 pointer-events-none">
                                <div className="bg-[#111111]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-[6px] border border-[#F4B400]/40 shadow-lg flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                                    <span>SYSTEM ONLINE</span>
                                    <span className="text-[#666666]">|</span>
                                    <span className="text-[#F4B400] uppercase">{activeTab === "all" ? "PANORAMIC" : activeTab}</span>
                                </div>
                                {hoveredNode && (
                                    <div className="bg-[#111111] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-[6px] border-2 border-[#F4B400] shadow-xl animate-fade-in flex items-center gap-2 pointer-events-auto">
                                        <span className="text-[#F4B400]">📍</span>
                                        <span>
                                            {hoveredNode === "hanoi" && "Hà Nội • Trung tâm Đổi mới Sáng tạo & AI"}
                                            {hoveredNode === "danang" && "Đà Nẵng • Vườn ươm & Công nghệ Cao"}
                                            {hoveredNode === "hcmc" && "TP. Hồ Chí Minh • Đầu tàu Vốn & Startups"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Institutional Venture Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    
                    {/* Module 1: STARTUP PIPELINE */}
                    <div
                        onClick={() => setActiveTab(activeTab === "startups" ? "all" : "startups")}
                        className={`rounded-[12px] p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                            activeTab === "startups"
                                ? "bg-[#FFFDF5] border-[#F4B400] shadow-md ring-2 ring-[#F4B400]/20"
                                : "bg-white border-[#EAEAEA] hover:border-[#111111] shadow-sm hover:shadow"
                        }`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-[6px] ${
                                    activeTab === "startups" ? "bg-[#F4B400] text-[#111111]" : "bg-[#F5F5F5] text-[#333333]"
                                }`}>
                                    FOUNDER PIPELINE {activeTab === "startups" && "• ĐANG XEM"}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
                            </div>
                            <div className="text-[28px] font-black text-[#111111] leading-none mb-2">
                                +500 Startups
                            </div>
                            <p className="text-[13.5px] text-[#666666] leading-relaxed">
                                Giai đoạn từ Pre-Seed đến Series A trên toàn Việt Nam và Đông Nam Á.
                            </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-[12px]">
                            <span className="text-[#777777] font-medium">Hồ sơ Thẩm định & Deal Room</span>
                            <span className="font-semibold text-[#D99B00]">Chuẩn hóa</span>
                        </div>
                    </div>

                    {/* Module 2: CAPITAL VAULT */}
                    <div
                        onClick={() => setActiveTab(activeTab === "investors" ? "all" : "investors")}
                        className={`text-white rounded-[12px] p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                            activeTab === "investors"
                                ? "bg-[#1A1A1A] border-[#F4B400] shadow-md ring-2 ring-[#F4B400]/30"
                                : "bg-[#111111] border-[#222222] hover:border-[#F4B400] shadow-sm hover:shadow"
                        }`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                                    <span className="text-[11px] font-semibold text-[#F4B400] tracking-wide">
                                        CAPITAL NETWORK {activeTab === "investors" && "• ĐANG XEM"}
                                    </span>
                                </div>
                                <span className="text-[11px] text-[#888888]">80+ VCs & Angels</span>
                            </div>
                            <div className="text-[32px] font-black text-[#F4B400] leading-none mb-2">
                                $18.5M+
                            </div>
                            <p className="text-[13.5px] text-[#CCCCCC] leading-relaxed">
                                Mạng lưới quỹ đầu tư mạo hiểm và thiên thần công khai khẩu vị đầu tư.
                            </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-[#222222] flex items-center justify-between text-[12px]">
                            <span className="text-[#888888]">Luận điểm đầu tư</span>
                            <span className="font-semibold text-white">Deal Room Xác minh</span>
                        </div>
                    </div>

                    {/* Module 3: THESIS MATCHING ENGINE */}
                    <div
                        onClick={() => setActiveTab(activeTab === "mentors" ? "all" : "mentors")}
                        className={`rounded-[12px] p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                            activeTab === "mentors"
                                ? "bg-[#FFFDF5] border-[#F4B400] shadow-md ring-2 ring-[#F4B400]/20"
                                : "bg-white border-[#EAEAEA] hover:border-[#111111] shadow-sm hover:shadow"
                        }`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-[6px] ${
                                    activeTab === "mentors"
                                        ? "bg-[#F4B400] text-[#111111]"
                                        : "bg-[#F5F5F5] text-[#333333]"
                                }`}>
                                    MATCHING ENGINE {activeTab === "mentors" && "• ĐANG XEM"}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                            </div>
                            <div className="text-[28px] font-black text-[#111111] leading-none mb-2">
                                98.2%
                            </div>
                            <p className="text-[13.5px] text-[#666666] leading-relaxed">
                                Độ khớp mục tiêu giữa năng lực nhà sáng lập và khẩu vị của Cố vấn / Quỹ đầu tư.
                            </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-[12px]">
                            <span className="text-[#777777] font-medium">Sàng lọc đa chiều</span>
                            <span className="font-semibold text-[#111111]">Tự động & Bảo mật</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}