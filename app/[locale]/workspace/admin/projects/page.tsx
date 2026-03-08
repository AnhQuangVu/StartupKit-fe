"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";

interface ProjectRow {
  projectName: string;
  founder: string;
  stage: string;
  fundingGoal: string;
  status: "Draft" | "Published";
  createdDate: string;
}

const rows: ProjectRow[] = [
  { projectName: "AgriBot", founder: "Nguyen Van A", stage: "Seed", fundingGoal: "$500,000", status: "Published", createdDate: "2025-11-09" },
  { projectName: "PayEase", founder: "Pattana Siri", stage: "Series A", fundingGoal: "$5,000,000", status: "Published", createdDate: "2025-10-04" },
  { projectName: "HealthScore", founder: "Dr. Linh Tran", stage: "Pre-Seed", fundingGoal: "$250,000", status: "Draft", createdDate: "2025-12-01" },
];

export default function AdminProjectsPage() {
  return (
    <AdminWorkspaceLayout title="Project Management" subtitle="Review and manage startup project listings">
      <AdminTable
        rows={rows}
        columns={[
          { key: "projectName", header: "Project Name", render: (row) => row.projectName },
          { key: "founder", header: "Founder", render: (row) => row.founder },
          { key: "stage", header: "Stage", render: (row) => row.stage },
          { key: "fundingGoal", header: "Funding Goal", render: (row) => row.fundingGoal },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${row.status === "Published" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                {row.status}
              </span>
            ),
          },
          { key: "createdDate", header: "Created Date", render: (row) => row.createdDate },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex gap-1.5">
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">View</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Edit</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Unpublish</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Feature</button>
                <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded text-red-600">Delete</button>
              </div>
            ),
          },
        ]}
      />
    </AdminWorkspaceLayout>
  );
}
