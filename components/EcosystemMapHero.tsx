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
            className="relative w-full bg-[#FFFFFF] overflow-hidden border-b border-[#EAEAEA] pt-[72px]"
            style={{ minHeight: "680px" }}
        >
            {/* Isometric background grid overlay */}
            <div className="absolute inset-0 iso-grid-bg opacity-60 pointer-events-none" />

            {/* Subtle radial ambient spotlight in Vietnam Gold */}
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[480px] pointer-events-none rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(244, 180, 0, 0.12) 0%, rgba(244, 180, 0, 0.03) 45%, transparent 70%)",
                }}
            />

            <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Hero Text & CTAs */}
                <div className="lg:col-span-5 flex flex-col items-start z-10">
                    {/* Isometric Tag Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#111111] text-white rounded-[6px] px-3.5 py-1.5 mb-6 iso-btn shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase">{h.badge}</span>
                        <span className="text-[10px] text-[#888888] font-mono pl-1 border-l border-[#333333]">3D ISO GRID</span>
                    </div>

                    <p className="text-[12px] font-bold text-[#D99B00] uppercase tracking-[0.2em] mb-3">
                        {h.powered}
                    </p>

                    <div className="relative mb-4">
                        <span className="hidden lg:block absolute -left-5 top-2 bottom-2 w-[4px] rounded-full bg-[#F4B400]" />
                        <h1 className="text-[38px] sm:text-[46px] lg:text-[54px] font-extrabold text-[#111111] leading-[1.12] tracking-tight">
                            {h.title1}
                            <br />
                            <span className="relative inline-block text-[#111111]">
                                {h.title2}
                                <span className="absolute bottom-1 left-0 right-0 h-[6px] bg-[#F4B400]/40 -z-10 rounded-sm" />
                            </span>
                        </h1>
                    </div>

                    <div className="w-[64px] h-[3px] bg-[#F4B400] rounded-full mb-5" />

                    <p className="text-[14px] font-semibold text-[#111111] mb-2 leading-relaxed">
                        {h.ai}
                    </p>

                    <p className="text-[15px] text-[#666666] leading-[1.7] mb-8 max-w-[480px]">
                        {h.sub}
                    </p>

                    {/* Interactive isometric tab toggles */}
                    <div className="flex flex-wrap gap-2 mb-8 bg-[#F7F7F7] p-1.5 rounded-[8px] border border-[#EAEAEA]">
                        {(["all", "startups", "investors", "mentors"] as TabMode[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-[6px] transition-all capitalize ${
                                    activeTab === tab
                                        ? "bg-[#111111] text-white shadow-sm"
                                        : "text-[#666666] hover:text-[#111111] hover:bg-white"
                                }`}
                            >
                                {tab === "all" ? "Toàn cảnh" : tab}
                            </button>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                        <a
                            href="#ecosystem"
                            className="inline-flex items-center justify-center gap-2.5 bg-[#111111] text-white text-[15px] font-semibold px-7 py-3.5 rounded-[8px] iso-btn hover:bg-[#F4B400] hover:text-[#111111] transition-all"
                        >
                            {h.cta1}
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F4B400] text-[#111111]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path
                                        d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </a>

                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#111111] text-[#111111] text-[15px] font-semibold px-7 py-3.5 rounded-[8px] iso-btn hover:bg-[#F7F7F7] transition-all"
                        >
                            {h.cta2}
                        </Link>
                    </div>
                </div>

                {/* Right Column: 3D Isometric Ecosystem Stage */}
                <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] md:min-h-[540px]">
                    
                    {/* Isometric 3D Stage Container */}
                    <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">

                        {/* Isometric Base Grid SVG */}
                        <svg
                            viewBox="0 0 640 480"
                            className="w-full h-full drop-shadow-2xl select-none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Isometric Platform Gradients */}
                                <linearGradient id="isoTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" />
                                    <stop offset="100%" stopColor="#F9F9F8" />
                                </linearGradient>

                                <linearGradient id="isoFrontLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#EAEAEA" />
                                    <stop offset="100%" stopColor="#D5D5D5" />
                                </linearGradient>

                                <linearGradient id="isoFrontRight" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#DDDDDD" />
                                    <stop offset="100%" stopColor="#C4C4C4" />
                                </linearGradient>

                                <linearGradient id="goldPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F4B400" />
                                    <stop offset="100%" stopColor="#E59B00" />
                                </linearGradient>

                                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Drop shadow of platform */}
                            <polygon
                                points="320,440 590,290 320,160 50,290"
                                fill="#000000"
                                fillOpacity="0.06"
                                transform="translate(0, 18)"
                            />

                            {/* Isometric Pedestal: Left Face */}
                            <polygon
                                points="50,290 320,440 320,465 50,315"
                                fill="url(#isoFrontLeft)"
                                stroke="#CCCCCC"
                                strokeWidth="1"
                            />

                            {/* Isometric Pedestal: Right Face */}
                            <polygon
                                points="320,440 590,290 590,315 320,465"
                                fill="url(#isoFrontRight)"
                                stroke="#B8B8B8"
                                strokeWidth="1"
                            />

                            {/* Isometric Platform Top Face (Diamond Grid) */}
                            <polygon
                                points="320,140 590,290 320,440 50,290"
                                fill="url(#isoTopGrad)"
                                stroke="#111111"
                                strokeWidth="2"
                            />

                            {/* Isometric Grid Lines on Platform Top */}
                            {/* Axis 1 (Top-Right to Bottom-Left) */}
                            <line x1="140" y1="240" x2="410" y2="390" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="230" y1="190" x2="500" y2="340" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="320" y1="140" x2="320" y2="440" stroke="#F4B400" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />

                            {/* Axis 2 (Top-Left to Bottom-Right) */}
                            <line x1="500" y1="240" x2="230" y2="390" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="410" y1="190" x2="140" y2="340" stroke="#EAEAEA" strokeWidth="1" strokeDasharray="3 3" />

                            {/* Isometric Circuit Data Highway in Gold */}
                            <path
                                d="M220 230 L320 280 L420 230 M320 280 L320 370"
                                stroke="#F4B400"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Animated pulses along the circuit path */}
                            <circle cx="270" cy="255" r="3" fill="#111111">
                                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="370" cy="255" r="3" fill="#111111">
                                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="320" cy="325" r="3" fill="#F4B400">
                                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="1s" repeatCount="indefinite" />
                            </circle>

                            {/* Stylized Isometric Vietnam Backbone (S-curve in 2.5D projection) */}
                            <g transform="translate(10, -5)">
                                {/* Vietnam geographical ribbon/contour */}
                                <path
                                    d="M 285 200 
                                       C 305 210, 315 225, 312 245 
                                       C 310 265, 325 285, 335 305 
                                       C 342 320, 338 340, 320 355
                                       C 305 365, 290 370, 275 360"
                                    stroke="#111111"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                                <path
                                    d="M 285 200 
                                       C 305 210, 315 225, 312 245 
                                       C 310 265, 325 285, 335 305 
                                       C 342 320, 338 340, 320 355
                                       C 305 365, 290 370, 275 360"
                                    stroke="#F4B400"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                />

                                {/* 1. Hanoi Node (North Hub) */}
                                <g
                                    className="cursor-pointer transition-transform"
                                    onMouseEnter={() => setHoveredNode("hanoi")}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    {/* Pulse ring */}
                                    <circle cx="285" cy="200" r="10" stroke="#F4B400" strokeWidth="1.5" fill="none">
                                        <animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite" />
                                        <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Isometric Hub Pin */}
                                    <circle cx="285" cy="200" r="5" fill="#111111" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <circle cx="285" cy="200" r="2.5" fill="#F4B400" />
                                    {/* Label Pin */}
                                    <text x="285" y="180" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="bold">
                                        HÀ NỘI
                                    </text>
                                </g>

                                {/* 2. Da Nang Node (Central Hub) */}
                                <g
                                    className="cursor-pointer transition-transform"
                                    onMouseEnter={() => setHoveredNode("danang")}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <circle cx="318" cy="255" r="4.5" fill="#111111" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <circle cx="318" cy="255" r="2" fill="#F4B400" />
                                    <text x="345" y="258" textAnchor="start" fill="#444444" fontSize="9" fontWeight="bold">
                                        ĐÀ NẴNG
                                    </text>
                                </g>

                                {/* 3. Ho Chi Minh City Node (South Engine) */}
                                <g
                                    className="cursor-pointer transition-transform"
                                    onMouseEnter={() => setHoveredNode("hcmc")}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <circle cx="310" cy="350" r="11" stroke="#F4B400" strokeWidth="1.5" fill="none">
                                        <animate attributeName="r" values="7;20;7" dur="2.1s" repeatCount="indefinite" />
                                        <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="2.1s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="310" cy="350" r="5.5" fill="#111111" stroke="#FFFFFF" strokeWidth="1.5" />
                                    <circle cx="310" cy="350" r="3" fill="#F4B400" />
                                    <text x="310" y="375" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="bold">
                                        TP. HỒ CHÍ MINH
                                    </text>
                                </g>

                                {/* 4. Islands: Hoàng Sa & Trường Sa with maritime sovereignty markers */}
                                <g>
                                    {/* Hoàng Sa */}
                                    <circle cx="390" cy="235" r="3.5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1" />
                                    <circle cx="390" cy="235" r="7" stroke="#F4B400" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                                    <text x="402" y="238" textAnchor="start" fill="#666666" fontSize="8" fontWeight="600">
                                        QĐ. Hoàng Sa
                                    </text>

                                    {/* Trường Sa */}
                                    <circle cx="415" cy="320" r="3.5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1" />
                                    <circle cx="415" cy="320" r="7" stroke="#F4B400" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                                    <text x="427" y="323" textAnchor="start" fill="#666666" fontSize="8" fontWeight="600">
                                        QĐ. Trường Sa
                                    </text>
                                </g>
                            </g>

                            {/* 3D Isometric Central AI Core (Floating Diamond/Polyhedron) */}
                            <g transform="translate(320, 260)" className="iso-float">
                                {/* Core shadow */}
                                <ellipse cx="0" cy="25" rx="28" ry="12" fill="#000000" fillOpacity="0.12" />

                                {/* Upper pyramid */}
                                <polygon points="0,-35 22,-5 -22,-5" fill="#F4B400" stroke="#FFFFFF" strokeWidth="1" />
                                <polygon points="0,-35 22,-5 0,0" fill="#E59B00" stroke="#FFFFFF" strokeWidth="0.8" />
                                <polygon points="0,-35 -22,-5 0,0" fill="#FFC933" stroke="#FFFFFF" strokeWidth="0.8" />

                                {/* Lower pyramid */}
                                <polygon points="0,25 22,-5 0,0" fill="#CC8A00" stroke="#FFFFFF" strokeWidth="0.8" />
                                <polygon points="0,25 -22,-5 0,0" fill="#B37700" stroke="#FFFFFF" strokeWidth="0.8" />

                                {/* Glowing aura ring */}
                                <ellipse cx="0" cy="0" rx="36" ry="14" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0"
                                        to="360"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </ellipse>
                            </g>
                        </svg>

                        {/* Floating Isometric Card 1: STARTUP TOWER (Top-Left) */}
                        <div
                            className={`absolute top-4 left-0 sm:left-4 bg-white border-2 border-[#111111] rounded-[8px] p-3.5 iso-card-3d max-w-[200px] z-20 transition-all ${
                                activeTab === "all" || activeTab === "startups" ? "opacity-100 scale-100" : "opacity-40 scale-95"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F4B400] shadow-sm inline-block" />
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#111111] text-white rounded-[3px]">
                                    +500 LIVE
                                </span>
                            </div>
                            <div className="text-[13px] font-bold text-[#111111] leading-tight">Startup Hub</div>
                            <div className="text-[11px] text-[#666666] mt-0.5">Seed to Series A</div>
                            <div className="mt-2 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px]">
                                <span className="text-[#888888]">AI Deal Room</span>
                                <span className="font-semibold text-[#D99B00]">100% Free</span>
                            </div>
                        </div>

                        {/* Floating Isometric Card 2: INVESTOR VAULT (Top-Right) */}
                        <div
                            className={`absolute top-10 right-0 sm:right-4 bg-[#111111] text-white border-2 border-[#F4B400] rounded-[8px] p-3.5 iso-card-dark max-w-[210px] z-20 transition-all ${
                                activeTab === "all" || activeTab === "investors" ? "opacity-100 scale-100" : "opacity-40 scale-95"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-ping" />
                                    <span className="text-[10px] font-mono text-[#F4B400] font-bold">CAPITAL FLOW</span>
                                </div>
                                <span className="text-[10px] text-[#AAAAAA]">80+ VCs</span>
                            </div>
                            <div className="text-[16px] font-extrabold text-[#F4B400] leading-none">$18.5M+</div>
                            <div className="text-[11px] text-[#CCCCCC] mt-1">Verified Investor Network</div>
                            <div className="mt-2 pt-2 border-t border-[#222222] flex items-center justify-between text-[10px] text-[#888888]">
                                <span>Deal Filter</span>
                                <span className="text-[#FFFFFF] font-semibold">Active Match</span>
                            </div>
                        </div>

                        {/* Floating Isometric Card 3: AI MATCHING ENGINE (Bottom-Right) */}
                        <div
                            className={`absolute bottom-6 right-2 sm:right-10 bg-white border border-[#EAEAEA] rounded-[8px] p-3 iso-card-3d max-w-[190px] z-20 transition-all ${
                                activeTab === "all" || activeTab === "mentors" ? "opacity-100 scale-100" : "opacity-40 scale-95"
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                                <span className="text-[11px] font-bold text-[#111111]">AI Precision</span>
                            </div>
                            <div className="text-[18px] font-extrabold text-[#111111]">98.2%</div>
                            <p className="text-[10px] text-[#777777] leading-snug mt-0.5">
                                Khớp dữ liệu tự động theo vòng gọi vốn & ngành
                            </p>
                        </div>

                        {/* Interactive Node Tooltip */}
                        {hoveredNode && (
                            <div className="absolute bottom-4 left-4 bg-[#111111] text-white text-[11px] font-semibold px-3 py-1.5 rounded-[6px] border border-[#F4B400] z-30 shadow-lg animate-fade-in">
                                {hoveredNode === "hanoi" && "Hà Nội • Trung tâm R&D & Trí tuệ Nhân tạo"}
                                {hoveredNode === "danang" && "Đà Nẵng • Cửa ngõ Công nghệ Cao Miền Trung"}
                                {hoveredNode === "hcmc" && "TP. Hồ Chí Minh • Đầu tàu Tài chính & Khởi nghiệp"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}