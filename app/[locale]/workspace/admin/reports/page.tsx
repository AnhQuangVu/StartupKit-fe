"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";

interface ReportRow {
  type: "Fake Startup" | "Scam" | "Spam" | "Harassment";
  target: string;
  reporter: string;
  createdAt: string;
  status: "Open" | "Investigating" | "Resolved";
}

const rows: ReportRow[] = [
  { type: "Fake Startup", target: "CryptoGain AI", reporter: "user_202", createdAt: "2026-03-05", status: "Open" },
  { type: "Scam", target: "FastFund Co", reporter: "founder_11", createdAt: "2026-03-04", status: "Investigating" },
  { type: "Harassment", target: "Mentor #M-882", reporter: "founder_88", createdAt: "2026-03-03", status: "Resolved" },
];

export default function AdminReportsPage() {
  return (
    <AdminWorkspaceLayout title="Reports Center" subtitle="Handle scam, spam, fake startup, and harassment reports">
      <AdminTable
        rows={rows}
        columns={[
          { key: "type", header: "Report Type", render: (row) => row.type },
          { key: "target", header: "Target", render: (row) => row.target },
          { key: "reporter", header: "Reporter", render: (row) => row.reporter },
          { key: "createdAt", header: "Date", render: (row) => row.createdAt },
          { key: "status", header: "Status", render: (row) => row.status },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex gap-1.5">
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Review</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Investigate</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Remove Content</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded text-red-600">Ban User</button>
              </div>
            ),
          },
        ]}
      />
    </AdminWorkspaceLayout>
  );
}
