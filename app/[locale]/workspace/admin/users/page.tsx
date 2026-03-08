"use client";

import { useMemo, useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";

type UserRole = "FOUNDER" | "INVESTOR" | "MENTOR";

interface UserRow {
  name: string;
  email: string;
  role: UserRole;
  joinDate: string;
  projectsCount: number;
  status: "Active" | "Suspended";
}

const users: UserRow[] = [
  { name: "Nguyen Van A", email: "a@agribot.vn", role: "FOUNDER", joinDate: "2025-08-02", projectsCount: 2, status: "Active" },
  { name: "Pattana Siri", email: "pattana@payease.asia", role: "FOUNDER", joinDate: "2025-07-15", projectsCount: 1, status: "Active" },
  { name: "Mai Lan", email: "lan@mekong.vc", role: "INVESTOR", joinDate: "2025-06-11", projectsCount: 0, status: "Active" },
  { name: "Dr. Linh Tran", email: "linh@mentor.vn", role: "MENTOR", joinDate: "2025-06-29", projectsCount: 0, status: "Suspended" },
];

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");

  const rows = useMemo(
    () => (roleFilter === "ALL" ? users : users.filter((user) => user.role === roleFilter)),
    [roleFilter]
  );

  return (
    <AdminWorkspaceLayout title="User Management" subtitle="View, verify, suspend, and moderate user accounts">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["ALL", "FOUNDER", "INVESTOR", "MENTOR"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                roleFilter === role ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#555555] border-[#EAEAEA]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <AdminTable
          rows={rows}
          columns={[
            { key: "name", header: "Name", render: (row) => row.name },
            { key: "email", header: "Email", render: (row) => row.email },
            { key: "role", header: "Role", render: (row) => row.role },
            { key: "joinDate", header: "Join Date", render: (row) => row.joinDate },
            { key: "projects", header: "Projects", render: (row) => row.projectsCount },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${row.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {row.status}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: () => (
                <div className="flex gap-1.5">
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Profile</button>
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Suspend</button>
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded">Verify</button>
                  <button className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded text-red-600">Delete</button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminWorkspaceLayout>
  );
}
