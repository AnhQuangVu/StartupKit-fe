"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminStats from "@/components/admin/AdminStats";
import AdminTable from "@/components/admin/AdminTable";

interface PaymentRow {
  user: string;
  paymentType: "Subscription" | "Featured Startup" | "Mentorship Booking";
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
}

const rows: PaymentRow[] = [
  { user: "AgriBot", paymentType: "Featured Startup", amount: "$120", date: "2026-03-01", status: "Paid" },
  { user: "Mekong Capital", paymentType: "Subscription", amount: "$299", date: "2026-03-03", status: "Paid" },
  { user: "HealthScore", paymentType: "Mentorship Booking", amount: "$80", date: "2026-03-04", status: "Pending" },
];

export default function AdminPaymentsPage() {
  return (
    <AdminWorkspaceLayout title="Payments & Billing" subtitle="Monitor subscriptions, featured startup fees, and session payments">
      <div className="space-y-4">
        <AdminStats
          items={[
            { label: "Subscriptions", value: "$38,400" },
            { label: "Featured Payments", value: "$12,700" },
            { label: "Mentorship Payments", value: "$9,420" },
            { label: "Total Revenue", value: "$60,520" },
          ]}
        />

        <AdminTable
          rows={rows}
          columns={[
            { key: "user", header: "User", render: (row) => row.user },
            { key: "paymentType", header: "Payment Type", render: (row) => row.paymentType },
            { key: "amount", header: "Amount", render: (row) => row.amount },
            { key: "date", header: "Date", render: (row) => row.date },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                  row.status === "Paid" ? "bg-green-50 text-green-700" : row.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                }`}>
                  {row.status}
                </span>
              ),
            },
          ]}
        />
      </div>
    </AdminWorkspaceLayout>
  );
}
