"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/lib/auth-context";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminWorkspaceLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminWorkspaceLayout({ title, subtitle, actions, children }: AdminWorkspaceLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "vi";

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
      return;
    }

    if (user?.role !== "ADMIN") {
      router.replace(`/${locale}/workspace`);
    }
  }, [isAuthenticated, isLoading, locale, router, user?.role]);

  if (isLoading) {
    return (
      <div className="pt-[72px] min-h-screen bg-[#F7F7F7] p-6 md:p-8">
        <div className="h-14 bg-white border border-[#EAEAEA] rounded-[10px] animate-pulse mb-6" />
        <div className="h-[420px] bg-white border border-[#EAEAEA] rounded-[10px] animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

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
