"use client";

import { useEffect, useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminTable from "@/components/admin/AdminTable";
import {
  loadAdminModeration,
  saveAdminModeration,
  type AdminModerationItem,
} from "@/lib/admin-store";

export default function AdminModerationPage() {
  const [rows, setRows] = useState<AdminModerationItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | AdminModerationItem["status"]>("ALL");

  useEffect(() => {
    setRows(loadAdminModeration());
  }, []);

  const updateStatus = (id: string, status: AdminModerationItem["status"]) => {
    const next = rows.map((r) => (r.id === id ? { ...r, status } : r));
    setRows(next);
    saveAdminModeration(next);
  };

  const removeRow = (id: string) => {
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    saveAdminModeration(next);
  };

  const visible = filter === "ALL" ? rows : rows.filter((r) => r.status === filter);

  return (
    <AdminWorkspaceLayout
      title="Moderation Center"
      subtitle="Review startup content, pitch decks, comments, and generated landing pages"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["ALL", "Pending", "Approved", "Flagged", "Rejected"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                filter === st
                  ? "bg-[#111111] text-[#F4B400] border-[#111111]"
                  : "bg-white text-[#555555] border-[#EAEAEA]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <AdminTable
          rows={visible}
          columns={[
            { key: "contentType", header: "Content Type", render: (row) => row.contentType },
            {
              key: "title",
              header: "Title",
              render: (row) => (
                <div>
                  <p className="font-semibold text-[#111111]">{row.title}</p>
                  <p className="text-[11px] text-[#888888]">AI Scan: {row.aiRiskScore} · {row.submittedAt}</p>
                </div>
              ),
            },
            { key: "author", header: "Author", render: (row) => row.author },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    row.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : row.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : row.status === "Flagged"
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-600"
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
                    onClick={() => updateStatus(row.id, "Approved")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-green-50 text-green-700 rounded cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(row.id, "Rejected")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(row.id, "Flagged")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-amber-50 text-amber-700 rounded cursor-pointer"
                  >
                    Flag
                  </button>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-red-200 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminWorkspaceLayout>
  );
}
