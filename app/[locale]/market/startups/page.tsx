"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import StartupCard from "@/components/cards/StartupCard";

const CATEGORIES = ["All Industries", "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce"];
const STAGES = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B"];

const LOGO_COLORS: Record<string, string> = {
    s1: "#3D6B35", s2: "#C05621", s3: "#7B2D8B", s4: "#1A3A5C", s5: "#2D6A4F", s6: "#9B2335",
};

const STARTUPS = [
    { id: "s1", name: "AgriBot Vietnam", industry: "Agritech", stage: "Seed", score: 94, location: "Hà Nội", teamSize: "8 people", traction: "230 farmers piloted", description: "AI-driven crop monitoring for Vietnam's 10M rice farmers. Reduces crop loss by 30% via real-time IoT sensor data." },
    { id: "s4", name: "PayEase", industry: "Fintech", stage: "Series A", score: 97, location: "TP. Hồ Chí Minh", teamSize: "32 people", traction: "$8.2M ARR", description: "B2B payment automation cutting reconciliation time 90% for mid-size enterprises across Southeast Asia." },
    { id: "s3", name: "MediConnect", industry: "Healthtech", stage: "Seed", score: 91, location: "Đà Nẵng", teamSize: "14 people", traction: "12k consultations", description: "Telemedicine platform connecting rural Vietnamese patients with certified urban specialists in real-time." },
    { id: "s2", name: "EduPath", industry: "Edtech", stage: "Pre-seed", score: 86, location: "Hà Nội", teamSize: "6 people", traction: "14 pilot schools", description: "Personalized K-12 curriculum adapting in real-time using AI. 91% student engagement rate across 14 pilot schools." },
    { id: "s5", name: "FarmList", industry: "Agritech", stage: "Pre-seed", score: 82, location: "Cần Thơ", teamSize: "5 people", traction: "850+ farmers", description: "Direct-to-consumer marketplace for Vietnamese farmers, eliminating 4-layer middlemen. 850+ registered farmers." },
    { id: "s6", name: "HealthScore", industry: "Healthtech", stage: "Seed", score: 89, location: "TP. Hồ Chí Minh", teamSize: "11 people", traction: "90s diagnostics", description: "AI-powered preventive diagnostics detecting 14 biomarkers via smartphone camera in under 90 seconds, no lab needed." },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] animate-pulse flex flex-col">
            <div className="p-5 flex gap-4">
                <div className="w-12 h-12 bg-[#EBEBEB] rounded-[8px] shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                    <div className="h-4 bg-[#EBEBEB] rounded w-3/4" />
                    <div className="h-3 bg-[#EBEBEB] rounded w-1/2" />
                </div>
            </div>
            <div className="border-t border-[#F5F5F5] mx-5" />
            <div className="px-5 py-4 space-y-2">
                <div className="h-3 bg-[#EBEBEB] rounded w-full" />
                <div className="h-3 bg-[#EBEBEB] rounded w-4/5" />
            </div>
            <div className="px-5 pb-4 flex gap-2">
                {[64, 72, 80].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}
            </div>
            <div className="border-t border-[#F5F5F5] px-5 py-4">
                <div className="h-9 bg-[#EBEBEB] rounded-[8px] w-full" />
            </div>
        </div>
    );
}

export default function StartupsDiscovery() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };
    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState("All Industries");
    const [stage, setStage] = useState("All Stages");
    const [isLoading] = useState(false);

    const filtered = STARTUPS.filter(s => {
        const q = search.toLowerCase();
        return (
            (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) &&
            (industry === "All Industries" || s.industry === industry) &&
            (stage === "All Stages" || s.stage === stage)
        );
    });

    const resetFilters = () => { setSearch(""); setIndustry("All Industries"); setStage("All Stages"); };
    const hasFilters = !!(search || industry !== "All Industries" || stage !== "All Stages");

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.startups.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.startups.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
                {/* Filter Card */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 mb-8">
                    <div className="flex flex-col gap-3">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.filters.searchStartups}
                            className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-[#111111] transition-colors" />
                        <div className="flex flex-wrap gap-2">
                            {[{ value: industry, onChange: setIndustry, opts: CATEGORIES }, { value: stage, onChange: setStage, opts: STAGES }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-3 py-2 text-[13px] font-medium outline-none focus:border-[#111111] text-[#111111] cursor-pointer">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#111111] px-3 py-2">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[13px] text-[#888888] mb-6">{filtered.length} {dict.nav.startups} {dict.common.found}</p>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="text-[48px] mb-4">🔍</div>
                        <h3 className="text-[18px] font-bold text-[#111111] mb-2">{dict.common.noResults}</h3>
                        <p className="text-[14px] text-[#888888] mb-6">{dict.common.noResultsSub}</p>
                        <button onClick={resetFilters} className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">{dict.common.resetFilters}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(s => (
                            <StartupCard key={s.id} {...s} logoColor={LOGO_COLORS[s.id] ?? "#111111"} locale={locale} />
                        ))}
                    </div>
                )}

                {filtered.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <button className="border border-[#EAEAEA] text-[14px] font-semibold text-[#111111] px-8 py-3 rounded-[8px] hover:border-[#111111] transition-colors">{dict.common.loadMore}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
