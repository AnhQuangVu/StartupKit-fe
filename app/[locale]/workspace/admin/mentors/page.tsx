"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";

interface MentorRow {
  name: string;
  expertise: string;
  sessions: number;
  rating: string;
  status: "Approved" | "Pending" | "Suspended";
}

const rows: MentorRow[] = [
  { name: "Dr. Linh Tran", expertise: "Healthtech", sessions: 42, rating: "4.9", status: "Approved" },
  { name: "Minh Hoang", expertise: "SaaS", sessions: 28, rating: "4.7", status: "Pending" },
  { name: "Tran Quoc Anh", expertise: "Growth", sessions: 14, rating: "4.5", status: "Suspended" },
];

export default function AdminMentorsPage() {
  return (
    <AdminWorkspaceLayout title="Mentor Management" subtitle="Approve applications, track sessions, and monitor mentor quality">
      <AdminTable
        rows={rows}
        columns={[
          { key: "name", header: "Name", render: (row) => row.name },
          { key: "expertise", header: "Expertise", render: (row) => row.expertise },
          { key: "sessions", header: "Sessions", render: (row) => row.sessions },
          { key: "rating", header: "Rating", render: (row) => row.rating },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                row.status === "Approved"
                  ? "bg-green-50 text-green-700"
                  : row.status === "Pending"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-red-50 text-red-700"
              }`}>
                {row.status}
              </span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex gap-1.5">
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Approve</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Manage Sessions</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Track Ratings</button>
              </div>
            ),
          },
        ]}
      />
    </AdminWorkspaceLayout>
  );
}
