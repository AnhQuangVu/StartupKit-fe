"use client";

import { useEffect, useState } from "react";
import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminStats from "@/components/admin/AdminStats";
import AdminTable from "@/components/admin/AdminTable";
import {
  loadBillingTransactions,
  saveBillingTransactions,
  type BillingTransaction,
} from "@/lib/billing-store";

export default function AdminPaymentsPage() {
  const [rows, setRows] = useState<BillingTransaction[]>([]);

  useEffect(() => {
    setRows(loadBillingTransactions());
  }, []);

  const updateStatus = (id: string, status: BillingTransaction["status"]) => {
    const next = rows.map((r) => (r.id === id ? { ...r, status } : r));
    setRows(next);
    saveBillingTransactions(next);
  };

  const paidRows = rows.filter((r) => r.status === "Paid");
  const totalVnd = paidRows.reduce((sum, r) => sum + (r.amountVnd || 0), 0);

  return (
    <AdminWorkspaceLayout
      title="Payments & Billing (PayOS / VietQR)"
      subtitle="Monitor SaaS subscriptions, featured startup fees, mentorship bookings, and 10% deal success fees"
    >
      <div className="space-y-4">
        <AdminStats
          items={[
            { label: "Subscriptions (MRR)", value: "$38,400" },
            { label: "Featured & Deal Fees", value: "$15,700" },
            { label: "Mentorship Commission", value: "$9,420" },
            { label: "Recent VietQR Settled", value: `${totalVnd.toLocaleString("vi-VN")}đ` },
          ]}
        />

        <AdminTable
          rows={rows}
          columns={[
            {
              key: "orderCode",
              header: "Order Code",
              render: (row) => <span className="font-mono text-xs font-bold">#{row.orderCode}</span>,
            },
            { key: "user", header: "User / Organization", render: (row) => row.user },
            { key: "paymentType", header: "Payment Type", render: (row) => row.paymentType },
            { key: "method", header: "Gateway", render: (row) => row.method },
            { key: "amount", header: "Amount", render: (row) => <span className="font-bold">{row.amount}</span> },
            { key: "date", header: "Date", render: (row) => row.date },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    row.status === "Paid"
                      ? "bg-green-50 text-green-700"
                      : row.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
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
                  {row.status !== "Paid" && (
                    <button
                      onClick={() => updateStatus(row.id, "Paid")}
                      className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-green-50 text-green-700 rounded cursor-pointer"
                    >
                      Approve VietQR
                    </button>
                  )}
                  {row.status === "Paid" && (
                    <button
                      onClick={() => updateStatus(row.id, "Refunded")}
                      className="px-2.5 py-1 text-[11px] font-semibold border border-[#EAEAEA] hover:bg-gray-100 rounded cursor-pointer"
                    >
                      Refund
                    </button>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminWorkspaceLayout>
  );
}
