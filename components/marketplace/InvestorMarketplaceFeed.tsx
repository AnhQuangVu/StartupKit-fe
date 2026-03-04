"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function InvestorMarketplaceFeed() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    return (
        <div className="pt-[100px] pb-24 max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F9F9F9] border border-[#EAEAEA] rounded-[12px] p-8 mb-12">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111111] mb-2">{dict.marketplace.investor.welcome}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[600px]">{dict.marketplace.investor.welcomeSub}</p>
                </div>
                <Link href={`/${locale}/workspace/investor`} className="shrink-0 bg-[#111111] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                    {dict.marketplace.investor.workspaceCta}
                </Link>
            </div>

            <div className="mb-16">
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-[22px] font-bold text-[#111111]">{dict.marketplace.investor.aiDeals}</h2>
                    <Link href={`/${locale}/explore/startups`} className="text-[14px] font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{dict.marketplace.viewAll}</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border border-[#F4B400] bg-[#FFFBF0] rounded-[8px] p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[18px] font-bold">Startup Beta {i}</h3>
                                <span className="bg-[#111111] text-white px-2 py-1 rounded text-[11px] font-bold">94 Score</span>
                            </div>
                            <p className="text-[14px] text-[#555555] mb-4 line-clamp-2">Seed stage fintech revolutionizing B2B payments across SEA.</p>
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                                <span>Seeking: $800k</span>
                                <Link href={`/${locale}/project/beta${i}`} className="text-[#111111] hover:text-[#F4B400] border-b border-[#111111] hover:border-[#F4B400] pb-0.5 transition-colors">View Deep Dive</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
