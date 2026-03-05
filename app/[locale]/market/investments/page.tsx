"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import InvestorCard from "@/components/cards/InvestorCard";

const FOCUS_AREAS = ["All Focus", "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "Deep Tech"];
const STAGE_PREFS = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B+"];

const INVESTORS = [
    { id: "i1", firmName: "Mekong Capital", focus: ["Fintech", "Consumer"], stages: ["Seed", "Series A"], ticketMin: "$500k", ticketMax: "$3M", portfolio: 48, avatarSeed: "mekong" },
    { id: "i2", firmName: "Do Ventures", focus: ["SaaS", "Edtech", "Deep Tech"], stages: ["Pre-seed", "Seed"], ticketMin: "$100k", ticketMax: "$1M", portfolio: 31, avatarSeed: "doventures" },
    { id: "i3", firmName: "Monk's Hill", focus: ["Fintech", "Healthtech"], stages: ["Series A", "B+"], ticketMin: "$1M", ticketMax: "$8M", portfolio: 27, avatarSeed: "monkshill" },
    { id: "i4", firmName: "500 Startups VN", focus: ["Agritech", "Logistics"], stages: ["Pre-seed", "Seed"], ticketMin: "$50k", ticketMax: "$500k", portfolio: 62, avatarSeed: "500startups" },
    { id: "i5", firmName: "Vertex Ventures", focus: ["SaaS", "Fintech"], stages: ["Seed", "Series A"], ticketMin: "$500k", ticketMax: "$5M", portfolio: 44, avatarSeed: "vertex" },
    { id: "i6", firmName: "Touchstone", focus: ["Deep Tech", "Healthtech"], stages: ["Seed", "Series A"], ticketMin: "$200k", ticketMax: "$2M", portfolio: 19, avatarSeed: "touchstone" },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] overflow-hidden animate-pulse flex flex-col">
            <div className="w-full" style={{ paddingTop: "56.25%", background: "#F0F0F0" }} />
            <div className="p-6 space-y-3">
                <div className="h-5 bg-[#EBEBEB] rounded w-2/3" />
                <div className="flex gap-2">{[56, 64].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}</div>
                <div className="flex gap-2">{[44, 52, 44].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}</div>
                <div className="border-t border-[#F0F0F0] pt-4 space-y-1"><div className="h-3 bg-[#EBEBEB] rounded w-24" /><div className="h-5 bg-[#EBEBEB] rounded w-36" /></div>
                <div className="h-9 bg-[#EBEBEB] rounded-[8px]" />
            </div>
        </div>
    );
}

export default function InvestorDirectory() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState("All Focus");
    const [stage, setStage] = useState("All Stages");
    const [isLoading] = useState(false);

    const filtered = INVESTORS.filter(inv => {
        const q = search.toLowerCase();
        return (
            (inv.firmName.toLowerCase().includes(q) || inv.focus.some(f => f.toLowerCase().includes(q))) &&
            (focus === "All Focus" || inv.focus.includes(focus)) &&
            (stage === "All Stages" || inv.stages.includes(stage))
        );
    });

    const resetFilters = () => { setSearch(""); setFocus("All Focus"); setStage("All Stages"); };
    const hasFilters = !!(search || focus !== "All Focus" || stage !== "All Stages");

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.investments.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.investments.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
                {/* Filter Card */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 mb-8">
                    <div className="flex flex-col gap-3">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.filters.searchInvestors}
                            className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-[#111111] transition-colors" />
                        <div className="flex flex-wrap gap-2">
                            {[{ value: focus, onChange: setFocus, opts: FOCUS_AREAS }, { value: stage, onChange: setStage, opts: STAGE_PREFS }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-3 py-2 text-[13px] font-medium outline-none focus:border-[#111111] text-[#111111] cursor-pointer">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#111111] px-3 py-2">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[13px] text-[#888888] mb-6">{filtered.length} {dict.common.found}</p>

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
                        {filtered.map(inv => (
                            <InvestorCard key={inv.id} {...inv} locale={locale} />
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
