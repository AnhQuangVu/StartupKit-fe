"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminWorkspaceLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminWorkspaceLayout({ title, subtitle, actions, children }: AdminWorkspaceLayoutProps) {
  return (
    <div className="pt-[72px] min-h-screen bg-[#F7F7F7] flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader title={title} subtitle={subtitle} actions={actions} />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
