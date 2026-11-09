"use client";

import { useEffect, useMemo, useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminStats from "@/components/admin/AdminStats";
import AdminTable from "@/components/admin/AdminTable";
import {
  loadAdminReports,
  saveAdminReports,
  type AdminReportItem,
} from "@/lib/admin-store";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReportItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<"ALL" | AdminReportItem["status"]>("ALL");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<AdminReportItem | null>(null);
  const [resolutionInput, setResolutionInput] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTarget, setNewTarget] = useState("");
  const [newType, setNewType] = useState<AdminReportItem["type"]>("Fake Startup");
  const [newSeverity, setNewSeverity] = useState<AdminReportItem["severity"]>("High");
  const [newReason, setNewReason] = useState("");

  useEffect(() => {
    setReports(loadAdminReports());
  }, []);

  const updateReport = (
    id: string,
    status: AdminReportItem["status"],
    note?: string
  ) => {
    const next = reports.map((r) =>
      r.id === id
        ? {
            ...r,
            status,
            resolutionNote: note !== undefined ? note : r.resolutionNote,
          }
        : r
    );
    setReports(next);
    saveAdminReports(next);
    if (selectedReport?.id === id) {
      setSelectedReport(next.find((r) => r.id === id) ?? null);
    }
  };

  const handleDeleteReport = (id: string) => {
    const next = reports.filter((r) => r.id !== id);
    setReports(next);
    saveAdminReports(next);
    if (selectedReport?.id === id) setSelectedReport(null);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTarget.trim() || !newReason.trim()) return;
    const item: AdminReportItem = {
      id: `RPT-${1000 + reports.length + 1}`,
      type: newType,
      target: newTarget.trim(),
      targetRole: "STARTUP",
      reporter: "Admin Compliance Team",
      reason: newReason.trim(),
      severity: newSeverity,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "Open",
    };
    const next = [item, ...reports];
    setReports(next);
    saveAdminReports(next);
    setNewTarget("");
    setNewReason("");
    setShowNewModal(false);
  };

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const q = search.toLowerCase();
      const matchQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.target.toLowerCase().includes(q) ||
        r.reporter.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q);
      const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [reports, search, statusFilter]);

  const openCount = reports.filter((r) => r.status === "Open").length;
  const investigatingCount = reports.filter((r) => r.status === "Investigating").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;
  const highSeverityCount = reports.filter((r) => r.severity === "High" && r.status !== "Resolved").length;

  return (
    <AdminWorkspaceLayout
      title="Reports Center (Manage Reports)"
      subtitle="Handle scam, spam, fake startup, plagiarized deck, and harassment reports across the ecosystem"
    >
      <div className="space-y-5">
        <AdminStats
          items={[
            { label: "Open Reports", value: String(openCount) },
            { label: "Investigating", value: String(investigatingCount) },
            { label: "High Risk Active", value: String(highSeverityCount) },
            { label: "Resolved Cases", value: String(resolvedCount) },
          ]}
        />

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["ALL", "Open", "Investigating", "Resolved", "Dismissed"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#111111] text-[#F4B400] border-[#111111]"
                    : "bg-white text-[#555555] border-[#EAEAEA] hover:border-[#111111]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm mã báo cáo, đối tượng, người gửi..."
              className="border border-[#EAEAEA] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#111111] min-w-[240px]"
            />
            <button
              onClick={() => setShowNewModal(true)}
              className="px-3.5 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap cursor-pointer"
            >
              + Tạo báo cáo vi phạm
            </button>
          </div>
        </div>

        <AdminTable
          rows={filtered}
          columns={[
            {
              key: "id",
              header: "ID",
              render: (row) => <span className="font-mono text-xs font-bold text-[#111111]">{row.id}</span>,
            },
            {
              key: "type",
              header: "Report Type",
              render: (row) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-[#111111]">{row.type}</span>
                  <span
                    className={`text-[10px] font-bold w-fit px-1.5 py-0.5 rounded mt-0.5 ${
                      row.severity === "High"
                        ? "bg-red-50 text-red-700"
                        : row.severity === "Medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.severity} Risk
                  </span>
                </div>
              ),
            },
            {
              key: "target",
              header: "Target",
              render: (row) => (
                <div>
                  <p className="font-semibold text-[#111111]">{row.target}</p>
                  <p className="text-[11px] text-[#777777] line-clamp-1 max-w-[260px]">{row.reason}</p>
                </div>
              ),
            },
            { key: "reporter", header: "Reporter", render: (row) => row.reporter },
            { key: "createdAt", header: "Date", render: (row) => row.createdAt },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    row.status === "Open"
                      ? "bg-red-50 text-red-700"
                      : row.status === "Investigating"
                      ? "bg-amber-50 text-amber-700"
                      : row.status === "Resolved"
                      ? "bg-green-50 text-green-700"
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
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedReport(row);
                      setResolutionInput(row.resolutionNote ?? "");
                    }}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:border-[#111111] rounded cursor-pointer"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => updateReport(row.id, "Investigating", "Đang thẩm tra hồ sơ và lịch sử hoạt động.")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-amber-50 rounded cursor-pointer"
                  >
                    Investigate
                  </button>
                  <button
                    onClick={() => updateReport(row.id, "Resolved", "Đã gỡ bỏ nội dung vi phạm và gửi cảnh báo.")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-green-50 text-green-700 rounded cursor-pointer"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => updateReport(row.id, "Resolved", "Đã khóa vĩnh viễn tài khoản vi phạm (Banned).")}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                  >
                    Ban User
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Review Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#888888]">{selectedReport.id}</span>
                <h3 className="text-lg font-bold text-[#111111]">{selectedReport.target}</h3>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-[#888888] hover:text-[#111111] font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-[#555555]">Loại vi phạm:</span> {selectedReport.type} ({selectedReport.severity} Risk)
              </p>
              <p>
                <span className="font-semibold text-[#555555]">Người báo cáo:</span> {selectedReport.reporter}
              </p>
              <p>
                <span className="font-semibold text-[#555555]">Ngày gửi:</span> {selectedReport.createdAt}
              </p>
              <div className="p-3 bg-[#F9F9F9] rounded-lg border border-[#EAEAEA]">
                <p className="text-xs font-bold text-[#888888] uppercase mb-1">Chi tiết bằng chứng / Lý do</p>
                <p className="text-[#333333]">{selectedReport.reason}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#555555] uppercase mb-1">Ghi chú xử lý của Admin</label>
              <textarea
                value={resolutionInput}
                onChange={(e) => setResolutionInput(e.target.value)}
                rows={3}
                placeholder="Nhập quyết định xử lý (VD: Đã gỡ dự án, khóa tài khoản 30 ngày...)"
                className="w-full border border-[#EAEAEA] rounded-lg p-2.5 text-sm outline-none focus:border-[#111111]"
              />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <button
                onClick={() => handleDeleteReport(selectedReport.id)}
                className="px-3 py-2 text-xs font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
              >
                Xóa báo cáo
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    updateReport(selectedReport.id, "Dismissed", resolutionInput || "Không đủ bằng chứng vi phạm.");
                    setSelectedReport(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold border border-[#EAEAEA] rounded-lg hover:border-[#111111] cursor-pointer"
                >
                  Bác bỏ (Dismiss)
                </button>
                <button
                  onClick={() => {
                    updateReport(selectedReport.id, "Investigating", resolutionInput || "Đang điều tra xác minh.");
                    setSelectedReport(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-600 cursor-pointer"
                >
                  Đang điều tra
                </button>
                <button
                  onClick={() => {
                    updateReport(selectedReport.id, "Resolved", resolutionInput || "Đã xử lý triệt để.");
                    setSelectedReport(null);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-[#111111] text-[#F4B400] rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Hoàn tất xử lý ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Report Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateReport}
            className="bg-white border border-[#EAEAEA] rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3">
              <h3 className="text-base font-bold text-[#111111]">Tạo biên bản vi phạm mới</h3>
              <button type="button" onClick={() => setShowNewModal(false)} className="text-[#888888] font-bold">
                ✕
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#555555] mb-1">Đối tượng bị báo cáo</label>
              <input
                required
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="VD: ScamCoin Startup / User #102"
                className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#555555] mb-1">Phân loại</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as AdminReportItem["type"])}
                  className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option>Fake Startup</option>
                  <option>Scam</option>
                  <option>Plagiarized Deck</option>
                  <option>Spam</option>
                  <option>Harassment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#555555] mb-1">Mức độ rủi ro</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as AdminReportItem["severity"])}
                  className="w-full border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#555555] mb-1">Mô tả chi tiết bằng chứng</label>
              <textarea
                required
                rows={3}
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="Mô tả hành vi vi phạm quy chuẩn cộng đồng StartupKit..."
                className="w-full border border-[#EAEAEA] rounded-lg p-2.5 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 text-xs font-semibold border border-[#EAEAEA] rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-[#111111] text-white rounded-lg hover:bg-[#F4B400] hover:text-[#111111]"
              >
                Lưu biên bản
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminWorkspaceLayout>
  );
}
