"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function StartupMarketplaceFeed() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    return (
        <div className="pt-[100px] pb-24 max-w-[1200px] mx-auto px-6 md:px-12">
            {/* Welcome Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F9F9F9] border border-[#EAEAEA] rounded-[12px] p-8 mb-12">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111111] mb-2">{dict.marketplace.startup.welcome}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[600px]">{dict.marketplace.startup.welcomeSub}</p>
                </div>
                <Link href={`/${locale}/workspace/startup`} className="shrink-0 bg-[#111111] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                    {dict.marketplace.startup.workspaceCta}
                </Link>
            </div>

            {/* Recommended Mentors */}
            <div className="mb-16">
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-[22px] font-bold text-[#111111]">{dict.marketplace.startup.recMentors}</h2>
                    <Link href={`/${locale}/explore/mentors`} className="text-[14px] font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{dict.marketplace.viewAll}</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Mock Mentor Cards */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border border-[#EAEAEA] rounded-[8px] p-6 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-[#E5E5E5] rounded-full mb-4" />
                            <h3 className="text-[16px] font-bold">Mentor Name {i}</h3>
                            <p className="text-[13px] text-[#555555] mb-4">Fintech • Seed Stage</p>
                            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#F4B400]">
                                <span>★ 4.9 {dict.marketplace.startup.score}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Investors */}
            <div>
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-[22px] font-bold text-[#111111]">{dict.marketplace.startup.trendingInvestors}</h2>
                    <Link href={`/${locale}/explore/investors`} className="text-[14px] font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{dict.marketplace.viewAll}</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Mock Investor Cards */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border border-[#EAEAEA] rounded-[8px] p-6 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-[#111111] rounded-[6px] mb-4" />
                            <h3 className="text-[16px] font-bold">VC Fund {i}</h3>
                            <p className="text-[13px] text-[#555555] mb-4">{dict.marketplace.startup.ticketSize}: $100k - $500k</p>
                            <Link href={`/${locale}/profile/VC${i}`} className="text-[13px] font-semibold underline underline-offset-2">{dict.marketplace.startup.viewMandates}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
