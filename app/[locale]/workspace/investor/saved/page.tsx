"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadFounderProjects, type FounderProject } from "@/lib/project-store";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { loadSavedDeals, unsaveSavedDeal } from "@/lib/investor-store";

export default function SavedDealsPage() {
    const dict = useDictionary();
    const params = useParams();
    const locale = (params?.locale as Locale) ?? "vi";

    const [savedDeals, setSavedDeals] = useState<FounderProject[]>([]);

    // Mock DEALS
    const MOCK_DEALS: FounderProject[] = [
        {
            id: "s1",
            slug: "agribot",
            status: "Published",
            score: 94,
            hasLandingPage: true,
            createdAt: "2024-01-15",
            updatedAt: "2024-03-08",
            basicInfo: {
                startupName: "AgriBot",
                foundedYear: "2023",
                headquarters: "Ho Chi Minh",
                website: "https://agribot.vn",
                industry: "Agritech",
                teamSize: "8",
                founderName: "Nguyen Van A",
                founderEmail: "a@agribot.vn",
                linkedin: "https://linkedin.com/in/nguyenvana"
            },
            problemSolution: {
                problem: "Vietnamese farmers lack access to modern farming techniques leading to low crop yields",
                solution: "AI-driven precision agriculture platform providing real-time crop monitoring and recommendations",
                valueProposition: "Farmers can increase yields by 30-40% with minimal additional investment"
            },
            product: {
                stage: "MVP",
                description: "Mobile app + IoT sensors for soil monitoring and crop disease detection",
                techStack: "React Native, Python, AWS",
                demoLink: "https://demo.agribot.vn",
                screenshots: ""
            },
            market: {
                targetMarket: "Rice & vegetable farming in Vietnam",
                marketSize: "2M+ rice farmers in Vietnam",
                customerSegment: "Smallholder farmers earning $200-500/month",
                competitors: "Manual observation, traditional advisors",
                competitiveAdvantage: "AI-powered, mobile-first, affordable"
            },
            business: {
                revenueModel: "Subscription ($5/month) + premium features",
                pricingStrategy: "Freemium with 30-day trial",
                monthlyRevenue: "$25,000",
                activeUsers: "5,200",
                growthRate: "22% MoM"
            },
            funding: {
                fundingStage: "Seed",
                totalFunding: "$150,000",
                investmentNeeded: "$500,000",
                equityOffered: "5%",
                pitchDeck: "",
                financials: ""
            }
        },
        {
            id: "s4",
            slug: "payease",
            status: "Published",
            score: 97,
            hasLandingPage: true,
            createdAt: "2024-02-01",
            updatedAt: "2024-03-08",
            basicInfo: {
                startupName: "PayEase",
                foundedYear: "2022",
                headquarters: "Bangkok",
                website: "https://payease.asia",
                industry: "Fintech",
                teamSize: "15",
                founderName: "Pattana Siri",
                founderEmail: "pattana@payease.asia",
                linkedin: "https://linkedin.com/in/pattanasiri"
            },
            problemSolution: {
                problem: "3 billion unbanked & underbanked people in Southeast Asia lack access to digital payments",
                solution: "Blockchain-based payment protocol enabling instant cross-border transfers without banks",
                valueProposition: "Send money across SEA in seconds with 0.5% fees vs 7-10% traditional remit"
            },
            product: {
                stage: "Beta",
                description: "Web + mobile app for peer-to-peer and merchant payments",
                techStack: "Vue.js, Go, Solana blockchain",
                demoLink: "https://beta.payease.asia",
                screenshots: ""
            },
            market: {
                targetMarket: "Migrant workers & SMEs in SEA",
                marketSize: "$150B annual remittance market in SEA",
                customerSegment: "Migrant workers earning $300-1000/month",
                competitors: "Western Union, Wise, MoneyGram",
                competitiveAdvantage: "Blockchain native, lowest fees, instant settlement"
            },
            business: {
                revenueModel: "Transaction fees (0.5%) + premium features",
                pricingStrategy: "Pay-per-use, volume discounts",
                monthlyRevenue: "$420,000",
                activeUsers: "78,000",
                growthRate: "45% MoM"
            },
            funding: {
                fundingStage: "Series A",
                totalFunding: "$2,500,000",
                investmentNeeded: "$5,000,000",
                equityOffered: "8%",
                pitchDeck: "",
                financials: ""
            }
        }
    ];

    useEffect(() => {
        const savedIds = loadSavedDeals();
        const allDeals = [...loadFounderProjects().filter(p => p.status === "Published"), ...MOCK_DEALS];
        const saved = allDeals.filter(d => savedIds.includes(d.id));
        setSavedDeals(saved);
    }, []);

    const handleRemove = (dealId: string) => {
        unsaveSavedDeal(dealId);
        setSavedDeals(prev => prev.filter(d => d.id !== dealId));
    };

    return (
        <WorkspaceLayout
            title={dict.workspace.investor.savedStartups}
            subtitle={dict.workspace.investor.dealFlowSub}
        >
            {savedDeals.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-[#EAEAEA]">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5F5F5] rounded-full mb-4">
                        <svg className="w-8 h-8 text-[#CCCCCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#111111] mb-1">
                        {dict.workspace.investor.noSavedDeals}
                    </h3>
                    <p className="text-sm text-[#888888] mb-6">
                        {dict.workspace.investor.startSavingDeals}
                    </p>
                    <a
                        href={`/${locale}/workspace/investor/deals`}
                        className="inline-block px-6 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#333333] transition"
                    >
                        {dict.workspace.investor.browseDeals}
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDeals.map(deal => (
                        <div
                            key={deal.id}
                            className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden hover:shadow-md transition"
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-[#EAEAEA]">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[16px] font-bold text-[#111111] truncate">
                                            {deal.basicInfo.startupName}
                                        </h3>
                                        <p className="text-[12px] text-[#888888] mt-0.5 line-clamp-2">
                                            {deal.basicInfo.website}
                                        </p>
                                    </div>
                                    <AIScoreBadge score={deal.score} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                {/* Industry & Stage */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[11px] font-bold bg-[#F5F5F5] text-[#555555] px-2.5 py-1 rounded-full">
                                        {deal.basicInfo.industry}
                                    </span>
                                    <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                                        {deal.funding.fundingStage}
                                    </span>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[10px] text-[#888888] font-semibold uppercase">
                                            Active Users
                                        </p>
                                        <p className="text-[14px] font-bold text-[#111111]">
                                            {deal.business.activeUsers}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#888888] font-semibold uppercase">
                                            Monthly Revenue
                                        </p>
                                        <p className="text-[14px] font-bold text-[#111111]">
                                            {deal.business.monthlyRevenue}
                                        </p>
                                    </div>
                                </div>

                                {/* Growth */}
                                <div>
                                    <p className="text-[10px] text-[#888888] font-semibold uppercase">
                                        Growth Rate
                                    </p>
                                    <p className="text-[14px] font-bold text-green-600">
                                        {deal.business.growthRate}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-5 border-t border-[#EAEAEA] flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#333333] transition">
                                    {dict.workspace.investor.viewStartup}
                                </button>
                                <button
                                    onClick={() => handleRemove(deal.id)}
                                    className="flex-1 px-3 py-2 border border-red-300 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition"
                                >
                                    {dict.workspace.investor.removeSaved}
                                </button>
                                <button className="flex-1 px-3 py-2 border border-[#EAEAEA] text-[#111111] font-semibold text-sm rounded-lg hover:bg-[#F5F5F5] transition">
                                    {dict.workspace.investor.messageFounder}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </WorkspaceLayout>
    );
}
