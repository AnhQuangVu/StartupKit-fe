"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Briefcase, GraduationCap, Flag, ShieldAlert, CreditCard, BarChart3, Settings } from "lucide-react";

const ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "dashboard" },
  { key: "users", label: "Users", icon: Users, href: "users" },
  { key: "projects", label: "Projects", icon: FolderKanban, href: "projects" },
  { key: "investors", label: "Investors", icon: Briefcase, href: "investors" },
  { key: "mentors", label: "Mentors", icon: GraduationCap, href: "mentors" },
  { key: "reports", label: "Reports", icon: Flag, href: "reports" },
  { key: "moderation", label: "Moderation", icon: ShieldAlert, href: "moderation" },
  { key: "payments", label: "Payments", icon: CreditCard, href: "payments" },
  { key: "analytics", label: "Analytics", icon: BarChart3, href: "analytics" },
  { key: "settings", label: "Settings", icon: Settings, href: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const base = `/${locale}/workspace/admin`;

  return (
    <aside className="w-[260px] border-r border-[#EAEAEA] bg-white shrink-0">
      <div className="h-14 px-5 border-b border-[#EAEAEA] flex items-center">
        <p className="text-[14px] font-black text-[#111111]">Admin Panel</p>
      </div>

      <nav className="py-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const href = `${base}/${item.href}`;
          const active = pathname === href || pathname === base;

          return (
            <Link
              key={item.key}
              href={href}
              className={`flex items-center gap-3 px-5 py-2.5 text-[13px] transition ${
                active && item.href === "dashboard"
                  ? pathname === `${base}/dashboard` || pathname === base
                    ? "bg-[#FFFBF0] text-[#111111] border-r-2 border-[#FFD600] font-semibold"
                    : "text-[#555555] hover:bg-[#F8F8F8]"
                  : active
                  ? "bg-[#FFFBF0] text-[#111111] border-r-2 border-[#FFD600] font-semibold"
                  : "text-[#555555] hover:bg-[#F8F8F8]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
