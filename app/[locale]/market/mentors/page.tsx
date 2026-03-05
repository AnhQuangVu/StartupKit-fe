"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import MentorCard from "@/components/cards/MentorCard";

const MENTORS = [
    { id: "m1", name: "Dr. An Nguyen", title: "Ex-VP Product · VNPay", expertise: ["Product", "Fintech", "Growth"], score: 97, sessions: 142, rate: "$80/hr", bio: "12 years scaling B2B fintech products across SEA. Advisor to 40+ startups.", avatarSeed: "man1mentor" },
    { id: "m2", name: "Mai Tran", title: "Growth Marketer · Edtech", expertise: ["Marketing", "Edtech", "D2C"], score: 91, sessions: 88, rate: "$60/hr", bio: "Led 0-to-1M user acquisition campaigns for 3 edtech startups across Vietnam.", avatarSeed: "woman1mentor" },
    { id: "m3", name: "Hung Le", title: "Ex-VC Partner · Do Ventures", expertise: ["Finance", "SaaS", "Fundraising"], score: 95, sessions: 213, rate: "$120/hr", bio: "8 years evaluating early-stage SaaS investments. $40M+ deployed across SEA.", avatarSeed: "man2mentor" },
    { id: "m4", name: "Linh Pham", title: "CTO · Healthtech", expertise: ["Tech", "AI/ML", "Healthtech"], score: 89, sessions: 65, rate: "$70/hr", bio: "Built AI diagnostic systems deployed across 12 provincial hospitals in Vietnam.", avatarSeed: "woman2mentor" },
    { id: "m5", name: "Bao Vo", title: "GTM Strategist · Agritech", expertise: ["Go-to-Market", "Agritech", "Rural"], score: 93, sessions: 110, rate: "$55/hr", bio: "Deep experience in rural Vietnam distribution and last-mile market expansion.", avatarSeed: "man3mentor" },
    { id: "m6", name: "Thu Dao", title: "COO · Series A startup", expertise: ["Operations", "SaaS", "Scaling"], score: 88, sessions: 79, rate: "$65/hr", bio: "Ex-COO of two successful Series A startups. Expert in ops frameworks from 0→1.", avatarSeed: "woman3mentor" },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6 animate-pulse">
            <div className="flex gap-4 mb-4"><div className="w-14 h-14 bg-[#EBEBEB] rounded-full" /><div className="flex-1 pt-1 space-y-2"><div className="h-4 bg-[#EBEBEB] rounded w-1/2" /><div className="h-3 bg-[#EBEBEB] rounded w-1/3" /></div></div>
            <div className="flex gap-2 mb-4">{[40, 52, 46].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}</div>
            <div className="space-y-1.5 mb-5"><div className="h-3 bg-[#EBEBEB] rounded w-full" /><div className="h-3 bg-[#EBEBEB] rounded w-4/5" /></div>
            <div className="h-9 bg-[#EBEBEB] rounded" />
        </div>
    );
}

export default function MentorMarketPage() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    const ALL_EXP = dict.filters.allExpertise;
    const ALL_IND = dict.filters.allIndustries;
    const ANY_SCR = dict.filters.anyScore;
    const EXPERTISE = [ALL_EXP, "Product", "Marketing", "Finance", "Tech", "Operations", "Legal", "Go-to-Market"];
    const INDUSTRIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS"];
    const SCORES = [ANY_SCR, dict.filters.scoreTop, dict.filters.scoreMid, dict.filters.scoreLow];

    const [search, setSearch] = useState("");
    const [expertise, setExpertise] = useState(() => ALL_EXP);
    const [industryF, setIndustryF] = useState(() => ALL_IND);
    const [scoreFilter, setScoreF] = useState(() => ANY_SCR);
    const [isLoading] = useState(false);

    const filtered = MENTORS.filter(m => {
        const q = search.toLowerCase();
        return (
            (m.name.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q) || m.expertise.some(e => e.toLowerCase().includes(q))) &&
            (expertise === ALL_EXP || m.expertise.includes(expertise)) &&
            (industryF === ALL_IND || m.expertise.some(e => e === industryF)) &&
            (scoreFilter === ANY_SCR
                || (scoreFilter === dict.filters.scoreTop && m.score >= 90)
                || (scoreFilter === dict.filters.scoreMid && m.score >= 80 && m.score < 90)
                || (scoreFilter === dict.filters.scoreLow && m.score < 80))
        );
    });

    const resetFilters = () => { setSearch(""); setExpertise(ALL_EXP); setIndustryF(ALL_IND); setScoreF(ANY_SCR); };
    const hasFilters = !!(search || expertise !== ALL_EXP || industryF !== ALL_IND || scoreFilter !== ANY_SCR);

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.mentors.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.mentors.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 mb-8">
                    <div className="flex flex-col gap-3">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.market.mentors.searchPlaceholder}
                            className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-[#111111] transition-colors" />
                        <div className="flex flex-wrap gap-2">
                            {[{ value: expertise, onChange: setExpertise, opts: EXPERTISE }, { value: industryF, onChange: setIndustryF, opts: INDUSTRIES }, { value: scoreFilter, onChange: setScoreF, opts: SCORES }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-3 py-2 text-[13px] font-medium outline-none focus:border-[#111111] text-[#111111] cursor-pointer">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#111111] px-3 py-2">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[13px] text-[#888888] mb-5">{filtered.length} {dict.nav.mentors} {dict.card.available.toLowerCase()}</p>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="text-[48px] mb-4">🔍</div>
                        <h3 className="text-[18px] font-bold text-[#111111] mb-2">{dict.common.noResults}</h3>
                        <p className="text-[14px] text-[#888888] mb-6">{dict.common.noResultsSub}</p>
                        <button onClick={resetFilters} className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">{dict.common.resetFilters}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(m => <MentorCard key={m.id} {...m} locale={locale} />)}
                    </div>
                )}

                {filtered.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <button className="border border-[#EAEAEA] text-[14px] font-semibold text-[#111111] px-8 py-3 rounded-[8px] hover:border-[#111111] transition-colors">{dict.common.loadMore}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
