"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";
import AdminStats from "@/components/admin/AdminStats";

interface InvestorRow {
  name: string;
  verified: "Yes" | "No";
  dealActivity: number;
  savedStartups: number;
  messagesActivity: number;
}

const rows: InvestorRow[] = [
  { name: "Mekong Capital", verified: "Yes", dealActivity: 24, savedStartups: 13, messagesActivity: 87 },
  { name: "SEA Ventures", verified: "No", dealActivity: 7, savedStartups: 9, messagesActivity: 28 },
  { name: "An Binh Fund", verified: "Yes", dealActivity: 15, savedStartups: 10, messagesActivity: 42 },
];

export default function AdminInvestorsPage() {
  return (
    <AdminWorkspaceLayout title="Investor Management" subtitle="Verification, activity, and risk monitoring for investors">
      <div className="space-y-4">
        <AdminStats
          items={[
            { label: "Verified Investors", value: "312" },
            { label: "Deal Activity", value: "1,942" },
            { label: "Saved Startups", value: "876" },
            { label: "Messages Activity", value: "4,511" },
          ]}
        />

        <AdminTable
          rows={rows}
          columns={[
            { key: "name", header: "Investor", render: (row) => row.name },
            {
              key: "verified",
              header: "Verified",
              render: (row) => (
                <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${row.verified === "Yes" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                  {row.verified}
                </span>
              ),
            },
            { key: "dealActivity", header: "Deal Activity", render: (row) => row.dealActivity },
            { key: "savedStartups", header: "Saved Startups", render: (row) => row.savedStartups },
            { key: "messagesActivity", header: "Messages", render: (row) => row.messagesActivity },
            {
              key: "actions",
              header: "Actions",
              render: () => (
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Verify</button>
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Revoke Access</button>
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded text-red-600">Flag</button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminWorkspaceLayout>
  );
}
