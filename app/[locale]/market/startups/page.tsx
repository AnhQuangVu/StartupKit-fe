"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import StartupCard from "@/components/cards/StartupCard";
import { loadFounderProjects } from "@/lib/project-store";

const LOGO_COLORS: Record<string, string> = {
    s1: "#3D6B35",
    s2: "#C05621",
    s3: "#7B2D8B",
    s4: "#1A3A5C",
    s5: "#2D6A4F",
    s6: "#9B2335",
    s7: "#0F766E",
    s8: "#3730A3",
    s9: "#B45309",
    s10: "#1E40AF",
    s11: "#047857",
    s12: "#6D28D9",
};

const BASE_STARTUPS = [
    {
        id: "s1",
        name: "AgriBot Vietnam",
        tagline: "AI-driven crop monitoring for Vietnam's 10M rice farmers",
        description: "AI-driven crop monitoring for Vietnam's 10M rice farmers. Reduces crop loss by 30% via real-time IoT sensor data.",
        industry: "Agritech",
        stage: "Seed",
        score: 94,
        location: "Hà Nội",
        teamSize: "12 people",
        traction: "3,450 farmers · $28.5k MRR",
        coverImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=450&fit=crop",
        founderName: "Nguyễn Văn Minh",
        founderAvatar: "https://i.pravatar.cc/150?u=minh",
    },
    {
        id: "s4",
        name: "PayEase",
        tagline: "B2B payment automation cutting reconciliation time by 90%",
        description: "B2B payment automation cutting reconciliation time 90% for mid-size enterprises across Southeast Asia.",
        industry: "Fintech",
        stage: "Series A",
        score: 97,
        location: "TP. Hồ Chí Minh",
        teamSize: "32 people",
        traction: "$1.74M ARR · 210 clients",
        coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop",
        founderName: "Trần Thị Lan",
        founderAvatar: "https://i.pravatar.cc/150?u=lan",
    },
    {
        id: "s3",
        name: "MediConnect",
        tagline: "Connecting rural Vietnamese patients with urban specialists in real-time",
        description: "Telemedicine platform connecting rural Vietnamese patients with certified urban specialists and 45 satellite clinics.",
        industry: "Healthtech",
        stage: "Seed",
        score: 91,
        location: "Đà Nẵng",
        teamSize: "16 people",
        traction: "14.5k patients · $42k MRR",
        coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
        founderName: "BS. Lê Hoàng",
        founderAvatar: "https://i.pravatar.cc/150?u=hoang",
    },
    {
        id: "s2",
        name: "EduPath AI",
        tagline: "Personalized K-12 curriculum adapting in real-time using AI",
        description: "Personalized K-12 curriculum adapting in real-time using AI. 91% student engagement rate across 18 pilot schools.",
        industry: "Edtech",
        stage: "Pre-seed",
        score: 88,
        location: "Hà Nội",
        teamSize: "9 people",
        traction: "18 schools · 9,800 students",
        coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop",
        founderName: "Phạm Anh Tuấn",
        founderAvatar: "https://i.pravatar.cc/150?u=tuan",
    },
    {
        id: "s7",
        name: "LogiSmart Green",
        tagline: "AI cold-chain & backhaul optimization cutting empty truck miles by 42%",
        description: "AI route & backhaul matching platform for commercial trucking and cold-chain logistics across Vietnam.",
        industry: "Logistics",
        stage: "Seed",
        score: 92,
        location: "TP. Hồ Chí Minh",
        teamSize: "21 people",
        traction: "1,400 trucks · $68k MRR",
        coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop",
        founderName: "Đặng Quốc Khánh",
        founderAvatar: "https://i.pravatar.cc/150?u=khanh",
    },
    {
        id: "s8",
        name: "CyberSafe Shield",
        tagline: "Autonomous AI SOC-as-a-Service for SEA Fintech & SMEs",
        description: "24/7 automated vulnerability detection, zero-day isolation, and Decree 13 compliance for growing enterprises.",
        industry: "SaaS",
        stage: "Seed",
        score: 90,
        location: "Hà Nội",
        teamSize: "10 people",
        traction: "42 B2B clients · 0% churn",
        coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
        founderName: "Vũ Hoàng Nam",
        founderAvatar: "https://i.pravatar.cc/150?u=namvu",
    },
    {
        id: "s5",
        name: "FarmList",
        tagline: "Direct-to-consumer marketplace eliminating 4-layer middlemen for farmers",
        description: "Direct-to-consumer marketplace for Vietnamese farmers, eliminating 4-layer middlemen. 850+ registered cooperatives.",
        industry: "Agritech",
        stage: "Pre-seed",
        score: 84,
        location: "Cần Thơ",
        teamSize: "7 people",
        traction: "850+ farms · $95k GMV/mo",
        coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=450&fit=crop",
        founderName: "Võ Thanh Hải",
        founderAvatar: "https://i.pravatar.cc/150?u=hai",
    },
    {
        id: "s6",
        name: "HealthScore",
        tagline: "AI-powered preventive diagnostics via smartphone camera in under 90s",
        description: "AI-powered preventive diagnostics detecting 14 cardiovascular & metabolic biomarkers via smartphone camera.",
        industry: "Healthtech",
        stage: "Seed",
        score: 89,
        location: "TP. Hồ Chí Minh",
        teamSize: "11 people",
        traction: "45k scans · 6 insurers",
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop",
        founderName: "Bùi Minh Châu",
        founderAvatar: "https://i.pravatar.cc/150?u=chau",
    },
    {
        id: "s9",
        name: "SolarGrid VN",
        tagline: "Zero-capex rooftop solar & AI battery EMS for manufacturing plants",
        description: "Helping industrial factories in Binh Duong and Bac Ninh cut peak electricity tariffs by 28% with AI microgrid management.",
        industry: "CleanTech",
        stage: "Series A",
        score: 93,
        location: "Bình Dương",
        teamSize: "26 people",
        traction: "18 MWp installed · $110k MRR",
        coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop",
        founderName: "Hoàng Gia Bảo",
        founderAvatar: "https://i.pravatar.cc/150?u=giabao",
    },
    {
        id: "s10",
        name: "RetailPulse AI",
        tagline: "Computer vision shelf-analytics & demand forecasting for GT/MT retail",
        description: "Real-time out-of-stock detection and automated restock ordering for 12,000+ convenience stores and pharmacies.",
        industry: "E-commerce",
        stage: "Seed",
        score: 87,
        location: "TP. Hồ Chí Minh",
        teamSize: "14 people",
        traction: "12,400 stores tracked",
        coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
        founderName: "Lý Mỹ Linh",
        founderAvatar: "https://i.pravatar.cc/150?u=mylinh",
    },
    {
        id: "s11",
        name: "ReGreen Pack",
        tagline: "Biodegradable packaging from agricultural rice husk & bagasse waste",
        description: "Replacing single-use industrial plastics with molded fiber packaging at price parity for F&B and export electronics.",
        industry: "CleanTech",
        stage: "Pre-seed",
        score: 85,
        location: "Long An",
        teamSize: "9 people",
        traction: "2.4M units/mo · 15 F&B chains",
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop",
        founderName: "Ngô Thảo Vy",
        founderAvatar: "https://i.pravatar.cc/150?u=thaovy",
    },
    {
        id: "s12",
        name: "VoiceFlow Care",
        tagline: "Vietnamese dialect-aware conversational AI agents for banking & aviation",
        description: "Handles 78% of tier-1 customer support calls in Northern, Central, and Southern Vietnamese accents with <400ms latency.",
        industry: "SaaS",
        stage: "Seed",
        score: 91,
        location: "Hà Nội",
        teamSize: "15 people",
        traction: "1.2M calls/mo · $54k MRR",
        coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=450&fit=crop",
        founderName: "Trịnh Quang Huy",
        founderAvatar: "https://i.pravatar.cc/150?u=quanghuy",
    },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[12px] overflow-hidden animate-pulse flex flex-col">
            <div className="w-full bg-[#EBEBEB]" style={{ paddingTop: "56.25%" }} />
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#EBEBEB] rounded-full" />
                    <div className="h-3 bg-[#EBEBEB] rounded w-24" />
                </div>
                <div className="h-5 bg-[#EBEBEB] rounded w-3/4" />
                <div className="h-4 bg-[#EBEBEB] rounded w-full" />
                <div className="flex gap-2">
                    {[48, 64, 72].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}
                </div>
                <div className="h-10 bg-[#EBEBEB] rounded-[8px] w-full mt-4" />
            </div>
        </div>
    );
}

export default function StartupsDiscovery() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    const ALL_IND = dict.filters.allIndustries;
    const ALL_STG = dict.filters.allStages;
    const CATEGORIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce", "Logistics", "CleanTech"];
    const STAGES = [ALL_STG, "Pre-seed", "Seed", "Series A", "Series B"];

    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState(() => ALL_IND);
    const [stage, setStage] = useState(() => ALL_STG);
    const [isLoading] = useState(false);
    const [startups, setStartups] = useState(BASE_STARTUPS);

    useEffect(() => {
        const custom = loadFounderProjects();
        const existingIds = new Set(BASE_STARTUPS.map(s => s.id));
        const extra = custom
            .filter(p => !existingIds.has(p.id) && p.basicInfo.startupName)
            .map(p => ({
                id: p.id,
                name: p.basicInfo.startupName,
                tagline: p.problemSolution.valueProposition || p.problemSolution.solution || "Innovative startup on StartupKit",
                description: p.product.description || p.problemSolution.solution || "",
                industry: p.basicInfo.industry || "SaaS",
                stage: p.funding.fundingStage || "Seed",
                score: p.score || 88,
                location: p.basicInfo.headquarters || "Việt Nam",
                teamSize: p.basicInfo.teamSize || "10 people",
                traction: p.business.monthlyRevenue || p.business.activeUsers || "Active",
                coverImage: p.product.screenshots || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
                founderName: p.basicInfo.founderName || "Founder",
                founderAvatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(p.id)}`,
            }));
        if (extra.length > 0) {
            setStartups([...extra, ...BASE_STARTUPS]);
        }
    }, []);

    const filtered = startups.filter(s => {
        const q = search.toLowerCase();
        return (
            (s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) &&
            (industry === ALL_IND || s.industry === industry) &&
            (stage === ALL_STG || s.stage === stage)
        );
    });

    const resetFilters = () => { setSearch(""); setIndustry(ALL_IND); setStage(ALL_STG); };
    const hasFilters = !!(search || industry !== ALL_IND || stage !== ALL_STG);

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.startups.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.startups.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                {/* Filter Card */}
                <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 mb-10 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.filters.searchStartups}
                            className="w-full border border-[#EAEAEA] rounded-[10px] px-5 py-3 text-[14px] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 transition-all" />
                        <div className="flex flex-wrap gap-3">
                            {[{ value: industry, onChange: setIndustry, opts: CATEGORIES }, { value: stage, onChange: setStage, opts: STAGES }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#F4B400] text-[#111111] cursor-pointer hover:border-[#CCCCCC] transition-colors">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#F4B400] px-4 py-2 transition-colors">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[14px] font-semibold text-[#888888] mb-8">{filtered.length} {dict.nav.startups} {dict.common.found}</p>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-24 text-center">
                        <div className="text-[56px] mb-6">🔍</div>
                        <h3 className="text-[20px] font-bold text-[#111111] mb-3">{dict.common.noResults}</h3>
                        <p className="text-[15px] text-[#888888] mb-8 max-w-[400px]">{dict.common.noResultsSub}</p>
                        <button onClick={resetFilters} className="bg-[#111111] text-white px-8 py-3 rounded-[10px] text-[14px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-all hover:shadow-lg">{dict.common.resetFilters}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(s => (
                            <StartupCard key={s.id} {...s} logoColor={LOGO_COLORS[s.id] ?? "#111111"} locale={locale} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
