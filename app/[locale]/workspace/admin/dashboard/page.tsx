"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminStats from "@/components/admin/AdminStats";
import AdminCharts from "@/components/admin/AdminCharts";

const stats = [
  { label: "Total Users", value: "2,940", delta: "+8.6% this month" },
  { label: "Founders", value: "1,120", delta: "+4.3%" },
  { label: "Investors", value: "490", delta: "+6.1%" },
  { label: "Mentors", value: "730", delta: "+5.8%" },
  { label: "Total Projects", value: "1,845", delta: "+112 this month" },
  { label: "Published Startups", value: "920", delta: "49.8% publish rate" },
  { label: "Funding Requests", value: "688", delta: "+39 this week" },
  { label: "Active Sessions", value: "374", delta: "+22 this week" },
  { label: "Revenue", value: "$84,300", delta: "+11.2% MoM" },
];

const charts = [
  {
    title: "Users Growth",
    series: [
      { label: "Jan", value: 2200 },
      { label: "Feb", value: 2480 },
      { label: "Mar", value: 2940 },
    ],
  },
  {
    title: "Projects Created",
    series: [
      { label: "Jan", value: 460 },
      { label: "Feb", value: 590 },
      { label: "Mar", value: 795 },
    ],
  },
  {
    title: "Published Startups",
    series: [
      { label: "Jan", value: 305 },
      { label: "Feb", value: 488 },
      { label: "Mar", value: 920 },
    ],
  },
  {
    title: "Revenue",
    series: [
      { label: "Jan", value: 42000 },
      { label: "Feb", value: 61100 },
      { label: "Mar", value: 84300 },
    ],
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminWorkspaceLayout
      title="Platform Dashboard"
      subtitle="Overview of users, projects, funding, sessions, and revenue"
    >
      <div className="space-y-6">
        <AdminStats items={stats.slice(0, 4)} />
        <AdminStats items={stats.slice(4, 8)} />
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <p className="text-[11px] font-bold text-[#888888] uppercase mb-1">Revenue</p>
          <p className="text-[28px] font-black text-[#111111]">{stats[8].value}</p>
          <p className="text-[11px] text-[#555555]">{stats[8].delta}</p>
        </div>
        <AdminCharts charts={charts} />
      </div>
    </AdminWorkspaceLayout>
  );
}
