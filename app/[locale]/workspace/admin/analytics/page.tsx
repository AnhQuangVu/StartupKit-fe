"use client";

import AdminWorkspaceLayout from "@/components/admin/AdminWorkspaceLayout";
import AdminCharts from "@/components/admin/AdminCharts";

export default function AdminAnalyticsPage() {
  return (
    <AdminWorkspaceLayout title="Platform Analytics" subtitle="Track user growth, startup creation, investor activity, sessions, and revenue">
      <AdminCharts
        charts={[
          {
            title: "User Growth",
            series: [
              { label: "Week 1", value: 520 },
              { label: "Week 2", value: 610 },
              { label: "Week 3", value: 720 },
              { label: "Week 4", value: 810 },
            ],
          },
          {
            title: "Startup Creation",
            series: [
              { label: "Week 1", value: 88 },
              { label: "Week 2", value: 102 },
              { label: "Week 3", value: 115 },
              { label: "Week 4", value: 137 },
            ],
          },
          {
            title: "Investor Activity",
            series: [
              { label: "Saved Startups", value: 340 },
              { label: "Intros Requested", value: 121 },
              { label: "Messages", value: 490 },
            ],
          },
          {
            title: "Mentorship Activity",
            series: [
              { label: "Sessions", value: 266 },
              { label: "Requests", value: 193 },
              { label: "Completed", value: 214 },
            ],
          },
          {
            title: "Platform Revenue",
            series: [
              { label: "Subscriptions", value: 38400 },
              { label: "Featured", value: 12700 },
              { label: "Bookings", value: 9420 },
            ],
          },
        ]}
      />
    </AdminWorkspaceLayout>
  );
}
