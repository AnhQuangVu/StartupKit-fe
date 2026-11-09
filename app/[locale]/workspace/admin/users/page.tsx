"use client";

import { useEffect, useMemo, useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";
import {
  loadAdminUsers,
  saveAdminUsers,
  type AdminUserItem,
} from "@/lib/admin-store";

type UserRole = "FOUNDER" | "INVESTOR" | "MENTOR";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  useEffect(() => {
    setUsers(loadAdminUsers());
  }, []);

  const toggleStatus = (id: string) => {
    const next = users.map((u) =>
      u.id === id ? { ...u, status: (u.status === "Active" ? "Suspended" : "Active") as AdminUserItem["status"] } : u
    );
    setUsers(next);
    saveAdminUsers(next);
  };

  const toggleVerify = (id: string) => {
    const next = users.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u));
    setUsers(next);
    saveAdminUsers(next);
  };

  const deleteUser = (id: string) => {
    const next = users.filter((u) => u.id !== id);
    setUsers(next);
    saveAdminUsers(next);
  };

  const rows = useMemo(
    () => (roleFilter === "ALL" ? users : users.filter((user) => user.role === roleFilter)),
    [roleFilter, users]
  );

  return (
    <AdminWorkspaceLayout title="User Management" subtitle="View, verify KYC/KYB, suspend, and moderate ecosystem accounts">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["ALL", "FOUNDER", "INVESTOR", "MENTOR"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg border cursor-pointer ${
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
            {
              key: "name",
              header: "Name",
              render: (row) => (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#111111]">{row.name}</span>
                  {row.verified && (
                    <span className="text-[10px] font-bold bg-[#FFFBF0] border border-[#F4B400] text-[#111111] px-1.5 py-0.5 rounded">
                      ✓ KYC
                    </span>
                  )}
                </div>
              ),
            },
            { key: "email", header: "Email", render: (row) => row.email },
            { key: "role", header: "Role", render: (row) => row.role },
            { key: "organization", header: "Organization", render: (row) => row.organization },
            { key: "joinDate", header: "Join Date", render: (row) => row.joinDate },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                    row.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedUser(row)}
                    className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded hover:border-[#111111] cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => toggleStatus(row.id)}
                    className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded hover:bg-amber-50 cursor-pointer"
                  >
                    {row.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                  <button
                    onClick={() => toggleVerify(row.id)}
                    className="px-2 py-1 text-[11px] border border-[#EAEAEA] rounded hover:bg-green-50 cursor-pointer"
                  >
                    {row.verified ? "Unverify" : "Verify KYC"}
                  </button>
                  <button
                    onClick={() => deleteUser(row.id)}
                    className="px-2 py-1 text-[11px] border border-red-200 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] rounded-xl max-w-md w-full p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3">
              <h3 className="text-base font-bold text-[#111111]">{selectedUser.name}</h3>
              <button onClick={() => setSelectedUser(null)} className="text-[#888888] font-bold">
                ✕
              </button>
            </div>
            <p className="text-sm"><span className="font-semibold">Email:</span> {selectedUser.email}</p>
            <p className="text-sm"><span className="font-semibold">Tổ chức:</span> {selectedUser.organization}</p>
            <p className="text-sm"><span className="font-semibold">Vai trò:</span> {selectedUser.role}</p>
            <p className="text-sm"><span className="font-semibold">Trạng thái KYC:</span> {selectedUser.verified ? "Đã xác thực (Verified)" : "Chưa xác thực"}</p>
            <p className="text-sm"><span className="font-semibold">Số dự án:</span> {selectedUser.projectsCount}</p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminWorkspaceLayout>
  );
}
