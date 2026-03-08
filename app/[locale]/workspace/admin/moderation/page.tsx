"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";

interface ModerationRow {
  contentType: "Startup Profile" | "Project Description" | "Comment" | "Landing Page";
  title: string;
  author: string;
  status: "Pending" | "Approved" | "Rejected" | "Flagged";
}

const rows: ModerationRow[] = [
  { contentType: "Startup Profile", title: "AgriBot profile update", author: "Nguyen Van A", status: "Pending" },
  { contentType: "Project Description", title: "PayEase deck summary", author: "Pattana Siri", status: "Flagged" },
  { contentType: "Comment", title: "Investor feedback thread", author: "investor_110", status: "Pending" },
  { contentType: "Landing Page", title: "HealthScore campaign page", author: "Dr. Linh Tran", status: "Approved" },
];

export default function AdminModerationPage() {
  return (
    <AdminWorkspaceLayout title="Moderation Center" subtitle="Review startup content, comments, and generated landing pages">
      <AdminTable
        rows={rows}
        columns={[
          { key: "contentType", header: "Content Type", render: (row) => row.contentType },
          { key: "title", header: "Title", render: (row) => row.title },
          { key: "author", header: "Author", render: (row) => row.author },
          { key: "status", header: "Status", render: (row) => row.status },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex gap-1.5">
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Approve</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Reject</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Flag</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded text-red-600">Remove</button>
              </div>
            ),
          },
        ]}
      />
    </AdminWorkspaceLayout>
  );
}
