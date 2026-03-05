"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function MentorMarketplaceFeed() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    return (
        <div className="pt-[100px] pb-24 max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F9F9F9] border border-[#EAEAEA] rounded-[12px] p-8 mb-12">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111111] mb-2">{dict.marketplace.mentor.welcome}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[600px]">{dict.marketplace.mentor.welcomeSub}</p>
                </div>
                <Link href={`/${locale}/workspace/mentor`} className="shrink-0 bg-[#111111] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                    {dict.marketplace.mentor.workspaceCta}
                </Link>
            </div>

            <div className="mb-16">
                <div className="flex items-end justify-between mb-6">
                    <h2 className="text-[22px] font-bold text-[#111111]">{dict.marketplace.mentor.seekingMentors}</h2>
                    <Link href={`/${locale}/explore/startups`} className="text-[14px] font-semibold text-[#111111] hover:text-[#F4B400] transition-colors">{dict.marketplace.viewAll}</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border border-[#EAEAEA] rounded-[8px] p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[18px] font-bold">Startup Alpha {i}</h3>
                                <span className="bg-[#EAEAEA] text-[#111111] px-2 py-1 rounded text-[11px] font-bold">Tech</span>
                            </div>
                            <p className="text-[14px] text-[#555555] mb-4 line-clamp-2">Building AI-driven agriculture bots for Southeast Asian rice farmers.</p>
                            <Link href={`/${locale}/project/alpha${i}`} className="text-[13px] font-semibold text-[#111111] hover:text-[#F4B400] border-b border-[#111111] hover:border-[#F4B400] pb-0.5 transition-colors">{dict.marketplace.mentor.viewPitch}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
