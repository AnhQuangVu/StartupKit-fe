"use client";

import { useDictionary } from "@/lib/dict-context";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function AdminOverviewFeed() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    return (
        <div className="pt-[100px] pb-24 max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-red-50 border border-red-200 rounded-[12px] p-8 mb-12">
                <div>
                    <h1 className="text-[28px] font-bold text-red-900 mb-2">{dict.marketplace.admin.welcome}</h1>
                    <p className="text-[15px] text-red-700 max-w-[600px]">{dict.marketplace.admin.welcomeSub}</p>
                </div>
                <Link href={`/${locale}/workspace/admin`} className="shrink-0 bg-red-900 text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-black transition-colors">
                    {dict.marketplace.admin.workspaceCta}
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                    { label: dict.marketplace.admin.pendingDisputes, val: "3", color: "text-red-600" },
                    { label: dict.marketplace.admin.activeDeals, val: "142", color: "text-[#111111]" },
                    { label: dict.marketplace.admin.newStartups, val: "+24", color: "text-[#111111]" },
                    { label: dict.marketplace.admin.estRevenue, val: "$42k", color: "text-[#F4B400]" }
                ].map(s => (
                    <div key={s.label} className="border border-[#EAEAEA] rounded-[8px] p-6 text-center">
                        <div className={`text-[32px] font-bold ${s.color}`}>{s.val}</div>
                        <div className="text-[13px] font-semibold text-[#555555] mt-1">{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
