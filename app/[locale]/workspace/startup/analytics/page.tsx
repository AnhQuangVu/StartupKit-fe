"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { useState } from "react";

export default function StartupAnalyticsPage() {
    const dict = useDictionary();
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

    const METRICS = [
        { label: "Profile Views", value: "1,247", change: "+12%", trend: "up" },
        { label: "Investor Impressions", value: "3,542", change: "+8%", trend: "up" },
        { label: "Mentor Connections", value: "23", change: "+5", trend: "up" },
        { label: "Deal Interest", value: "12", change: "-2", trend: "down" },
    ];

    const TRAFFIC_DATA = [
        { day: "Mon", views: 120 },
        { day: "Tue", views: 180 },
        { day: "Wed", views: 150 },
        { day: "Thu", views: 220 },
        { day: "Fri", views: 190 },
        { day: "Sat", views: 140 },
        { day: "Sun", views: 160 },
    ];

    const SOURCES = [
        { source: "Direct", visits: 450, percentage: 36 },
        { source: "Search", visits: 320, percentage: 26 },
        { source: "Social Media", visits: 280, percentage: 22 },
        { source: "Referral", visits: 197, percentage: 16 },
    ];

    const TOP_INVESTORS = [
        { name: "Linh Pham", company: "Mekong Capital", views: 15 },
        { name: "John Nguyen", company: "500 Startups", views: 12 },
        { name: "Mai Tran", company: "IDG Ventures", views: 10 },
        { name: "David Le", company: "Golden Gate Ventures", views: 8 },
        { name: "An Pham", company: "Jungle Ventures", views: 7 },
    ];

    const maxHeight = Math.max(...TRAFFIC_DATA.map(d => d.views));

    return (
        <WorkspaceLayout
            title="Analytics"
            subtitle="Track your startup's performance and engagement metrics"
        >
            {/* Time Range Selector */}
            <div className="mb-6 flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[#555555]">Time Range:</span>
                <div className="flex gap-1 bg-white border border-[#EAEAEA] rounded-lg p-1">
                    {(["7d", "30d", "90d"] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 text-[12px] font-semibold rounded transition-colors ${
                                timeRange === range
                                    ? "bg-[#F4B400] text-[#111111]"
                                    : "text-[#888888] hover:text-[#111111] hover:bg-[#F5F5F5]"
                            }`}
                        >
                            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {METRICS.map((metric) => (
                    <div key={metric.label} className="bg-white border border-[#EAEAEA] rounded-[10px] p-5">
                        <div className="flex items-start justify-between mb-1">
                            <span className="text-[12px] font-semibold text-[#888888]">{metric.label}</span>
                            <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    metric.trend === "up"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {metric.change}
                            </span>
                        </div>
                        <div className="text-[28px] font-black text-[#111111]">{metric.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Profile Views Chart */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-5">Profile Views (Last 7 Days)</h3>
                    <div className="flex items-end justify-between gap-2 h-[200px]">
                        {TRAFFIC_DATA.map((item) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                                <div className="flex-1 w-full flex items-end">
                                    <div
                                        className="w-full bg-[#F4B400] rounded-t-md hover:bg-[#FFD600] transition-colors cursor-pointer"
                                        style={{ height: `${(item.views / maxHeight) * 100}%` }}
                                        title={`${item.views} views`}
                                    />
                                </div>
                                <span className="text-[11px] text-[#888888] font-medium">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                    <h3 className="text-[14px] font-bold text-[#111111] mb-5">Traffic Sources</h3>
                    <div className="space-y-4">
                        {SOURCES.map((source) => (
                            <div key={source.source}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[13px] font-semibold text-[#333333]">{source.source}</span>
                                    <span className="text-[12px] text-[#888888]">
                                        {source.visits} ({source.percentage}%)
                                    </span>
                                </div>
                                <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#F4B400] rounded-full transition-all"
                                        style={{ width: `${source.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Investors */}
            <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6">
                <h3 className="text-[14px] font-bold text-[#111111] mb-5">Top Investors Viewing Your Profile</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#F0F0F0]">
                                <th className="text-left text-[12px] font-semibold text-[#888888] pb-3 px-3">Name</th>
                                <th className="text-left text-[12px] font-semibold text-[#888888] pb-3 px-3">Company</th>
                                <th className="text-right text-[12px] font-semibold text-[#888888] pb-3 px-3">Profile Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TOP_INVESTORS.map((investor, idx) => (
                                <tr key={investor.name} className="border-b border-[#F5F5F5] last:border-0">
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-bold text-[#AAAAAA] w-5">
                                                #{idx + 1}
                                            </span>
                                            <span className="text-[13px] font-semibold text-[#111111]">
                                                {investor.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 text-[13px] text-[#555555]">{investor.company}</td>
                                    <td className="py-3 px-3 text-right text-[13px] font-semibold text-[#111111]">
                                        {investor.views}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
