"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import StartupCard from "@/components/cards/StartupCard";

const LOGO_COLORS: Record<string, string> = {
    s1: "#3D6B35", s2: "#C05621", s3: "#7B2D8B", s4: "#1A3A5C", s5: "#2D6A4F", s6: "#9B2335",
};

const STARTUPS = [
    {
        id: "s1",
        name: "AgriBot Vietnam",
        tagline: "AI-driven crop monitoring for Vietnam's 10M rice farmers",
        description: "AI-driven crop monitoring for Vietnam's 10M rice farmers. Reduces crop loss by 30% via real-time IoT sensor data.",
        industry: "Agritech",
        stage: "Seed",
        score: 94,
        location: "Hà Nội",
        teamSize: "8 people",
        traction: "230 farmers piloted",
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
        traction: "$8.2M ARR",
        coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop",
        founderName: "Trần Thị Lan",
        founderAvatar: "https://i.pravatar.cc/150?u=lan",
    },
    {
        id: "s3",
        name: "MediConnect",
        tagline: "Connecting rural Vietnamese patients with urban specialists in real-time",
        description: "Telemedicine platform connecting rural Vietnamese patients with certified urban specialists in real-time.",
        industry: "Healthtech",
        stage: "Seed",
        score: 91,
        location: "Đà Nẵng",
        teamSize: "14 people",
        traction: "12k consultations",
        coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
        founderName: "Dr. Lê Hoàng",
        founderAvatar: "https://i.pravatar.cc/150?u=hoang",
    },
    {
        id: "s2",
        name: "EduPath",
        tagline: "Personalized K-12 curriculum adapting in real-time using AI",
        description: "Personalized K-12 curriculum adapting in real-time using AI. 91% student engagement rate across 14 pilot schools.",
        industry: "Edtech",
        stage: "Pre-seed",
        score: 86,
        location: "Hà Nội",
        teamSize: "6 people",
        traction: "14 pilot schools",
        coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop",
        founderName: "Phạm Anh Tuấn",
        founderAvatar: "https://i.pravatar.cc/150?u=tuan",
    },
    {
        id: "s5",
        name: "FarmList",
        tagline: "Direct-to-consumer marketplace eliminating 4-layer middlemen for farmers",
        description: "Direct-to-consumer marketplace for Vietnamese farmers, eliminating 4-layer middlemen. 850+ registered farmers.",
        industry: "Agritech",
        stage: "Pre-seed",
        score: 82,
        location: "Cần Thơ",
        teamSize: "5 people",
        traction: "850+ farmers",
        coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=450&fit=crop",
        founderName: "Võ Thanh Hải",
        founderAvatar: "https://i.pravatar.cc/150?u=hai",
    },
    {
        id: "s6",
        name: "HealthScore",
        tagline: "AI-powered preventive diagnostics via smartphone camera in under 90s",
        description: "AI-powered preventive diagnostics detecting 14 biomarkers via smartphone camera in under 90 seconds, no lab needed.",
        industry: "Healthtech",
        stage: "Seed",
        score: 89,
        location: "TP. Hồ Chí Minh",
        teamSize: "11 people",
        traction: "90s diagnostics",
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop",
        founderName: "Bùi Minh Châu",
        founderAvatar: "https://i.pravatar.cc/150?u=chau",
    },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[12px] overflow-hidden animate-pulse flex flex-col">
            {/* Cover image skeleton */}
            <div className="w-full bg-[#EBEBEB]" style={{ paddingTop: '56.25%' }} />
            
            {/* Content skeleton */}
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
    const CATEGORIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce"];
    const STAGES = [ALL_STG, "Pre-seed", "Seed", "Series A", "Series B"];

    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState(() => ALL_IND);
    const [stage, setStage] = useState(() => ALL_STG);
    const [isLoading] = useState(false);

    const filtered = STARTUPS.filter(s => {
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

                {filtered.length > 0 && (
                    <div className="flex justify-center mt-16">
                        <button className="border-2 border-[#EAEAEA] text-[14px] font-bold text-[#111111] px-10 py-3.5 rounded-[10px] hover:border-[#F4B400] hover:text-[#F4B400] transition-all hover:shadow-lg">{dict.common.loadMore}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
