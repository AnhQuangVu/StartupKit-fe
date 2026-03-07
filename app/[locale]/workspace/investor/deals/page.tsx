"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { loadFounderProjects, type FounderProject } from "@/lib/project-store";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";
import { loadSavedDeals, saveSavedDeal, unsaveSavedDeal, isSavedDeal } from "@/lib/investor-store";

export default function InvestorDealsPage() {
    const dict = useDictionary();
    const params = useParams();
    const locale = (params?.locale as Locale) ?? "vi";

    const [deals, setDeals] = useState<FounderProject[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<FounderProject[]>([]);
    const [savedDealIds, setSavedDealIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState<string>("");
    const [selectedStage, setSelectedStage] = useState<string>("");
    const [selectedScore, setSelectedScore] = useState<string>("");

    // Mock data for SEED projects
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
                screenshots: "",
                financials: ""
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
                screenshots: "",
                financials: ""
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
        },
        {
            id: "s6",
            slug: "healthscore",
            status: "Published",
            score: 89,
            hasLandingPage: true,
            createdAt: "2024-02-15",
            updatedAt: "2024-03-08",
            basicInfo: {
                startupName: "HealthScore",
                foundedYear: "2023",
                headquarters: "Hanoi",
                website: "https://healthscore.vn",
                industry: "Healthtech",
                teamSize: "12",
                founderName: "Dr. Linh Tran",
                founderEmail: "linh@healthscore.vn",
                linkedin: "https://linkedin.com/in/linhtra"
            },
            problemSolution: {
                problem: "85% of Vietnamese have no regular preventive health monitoring, leading to late-stage diagnostics",
                solution: "AI-powered chronic disease risk assessment using self-reported health data and wearable integration",
                valueProposition: "Early identification of health risks reduces treatment costs by 70%"
            },
            product: {
                stage: "MVP",
                description: "Mobile app with AI risk assessment engine and telehealth integration",
                techStack: "Flutter, TensorFlow, PostgreSQL",
                demoLink: "https://healthscore.vn/demo",
                screenshots: "",
                financials: ""
            },
            market: {
                targetMarket: "Corporate wellness programs in Vietnam",
                marketSize: "500K+ corporate employees in Vietnam seeking health monitoring",
                customerSegment: "Large enterprises (500+ employees) and insurance companies",
                competitors: "MyFitnessPal, Ada Health, manual doctor visits",
                competitiveAdvantage: "Vietnam-trained AI, local healthcare data, insurance partnerships"
            },
            business: {
                revenueModel: "B2B SaaS ($2/employee/month) + premium consumer features",
                pricingStrategy: "Enterprise contracts + freemium consumer app",
                monthlyRevenue: "$85,000",
                activeUsers: "8,500",
                growthRate: "35% MoM"
            },
            funding: {
                fundingStage: "Seed",
                totalFunding: "$300,000",
                investmentNeeded: "$1,500,000",
                equityOffered: "6%",
                pitchDeck: "",
                financials: ""
            }
        }
    ];

    useEffect(() => {
        // Load published founder projects + mock deals
        const projects = loadFounderProjects().filter(p => p.status === "Published");
        const allDeals = [...projects, ...MOCK_DEALS].reduce((acc, deal) => {
            if (!acc.find(d => d.id === deal.id)) acc.push(deal);
            return acc;
        }, [] as FounderProject[]);
        setDeals(allDeals);
        setSavedDealIds(new Set(loadSavedDeals()));
    }, []);

    // Apply filters whenever search or filter changes
    useEffect(() => {
        let filtered = deals;

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(d => d.basicInfo.startupName.toLowerCase().includes(q));
        }

        // Industry filter
        if (selectedIndustry) {
            filtered = filtered.filter(d => d.basicInfo.industry === selectedIndustry);
        }

        // Stage filter
        if (selectedStage) {
            filtered = filtered.filter(d => d.funding.fundingStage === selectedStage);
        }

        // Score filter
        if (selectedScore) {
            if (selectedScore === "90+") {
                filtered = filtered.filter(d => d.score >= 90);
            } else if (selectedScore === "80-89") {
                filtered = filtered.filter(d => d.score >= 80 && d.score < 90);
            } else if (selectedScore === "<80") {
                filtered = filtered.filter(d => d.score < 80);
            }
        }

        setFilteredDeals(filtered);
    }, [searchQuery, selectedIndustry, selectedStage, selectedScore, deals]);

    const handleSaveDeal = (dealId: string) => {
        if (savedDealIds.has(dealId)) {
            unsaveSavedDeal(dealId);
            setSavedDealIds(prev => {
                const next = new Set(prev);
                next.delete(dealId);
                return next;
            });
        } else {
            saveSavedDeal(dealId);
            setSavedDealIds(prev => new Set([...prev, dealId]));
        }
    };

    const industries = Array.from(new Set(deals.map(d => d.basicInfo.industry)));
    const stages = Array.from(new Set(deals.map(d => d.funding.fundingStage)));

    return (
        <WorkspaceLayout
            title={dict.workspace.investor.dealFlow}
            subtitle={dict.workspace.investor.dealFlowSub}
        >
            {/* Filters */}
            <div className="mb-8 bg-white rounded-xl border border-[#EAEAEA] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-semibold text-[#111111] mb-2">
                            {dict.filters.search}
                        </label>
                        <input
                            type="text"
                            placeholder={dict.workspace.investor.searchDealsPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-semibold text-[#111111] mb-2">
                            {dict.workspace.investor.filterByIndustry}
                        </label>
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                        >
                            <option value="">{dict.filters.allIndustries}</option>
                            {industries.map(ind => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>
                    </div>

                    {/* Funding Stage */}
                    <div>
                        <label className="block text-sm font-semibold text-[#111111] mb-2">
                            {dict.workspace.investor.filterByStage}
                        </label>
                        <select
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                        >
                            <option value="">{dict.filters.allStages}</option>
                            {stages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>

                    {/* AI Score */}
                    <div>
                        <label className="block text-sm font-semibold text-[#111111] mb-2">
                            {dict.workspace.investor.filterByScore}
                        </label>
                        <select
                            value={selectedScore}
                            onChange={(e) => setSelectedScore(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                        >
                            <option value="">{dict.filters.anyScore}</option>
                            <option value="90+">{dict.filters.scoreTop}</option>
                            <option value="80-89">{dict.filters.scoreMid}</option>
                            <option value="<80">{dict.filters.scoreLow}</option>
                        </select>
                    </div>

                    {/* Reset button */}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedIndustry("");
                                setSelectedStage("");
                                setSelectedScore("");
                            }}
                            className="w-full px-4 py-2 bg-[#F5F5F5] text-[#111111] font-semibold rounded-lg hover:bg-[#EAEAEA] transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredDeals.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-[#EAEAEA]">
                    <p className="text-lg font-semibold text-[#111111] mb-1">
                        {dict.workspace.investor.noDealsFound}
                    </p>
                    <p className="text-sm text-[#888888]">
                        {dict.workspace.investor.searchDealsPlaceholder}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDeals.map(deal => (
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
                                    onClick={() => handleSaveDeal(deal.id)}
                                    className={`flex-1 px-3 py-2 font-semibold text-sm rounded-lg transition ${
                                        savedDealIds.has(deal.id)
                                            ? "bg-[#FFD600] text-[#111111] hover:bg-[#E6C200]"
                                            : "bg-[#F5F5F5] text-[#111111] hover:bg-[#EAEAEA]"
                                    }`}
                                >
                                    {savedDealIds.has(deal.id) ? "✓" : dict.workspace.investor.saveDeal}
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
