"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useAuth } from "@/lib/auth-context";
import { getNotificationsFor, markNotificationRead } from "@/lib/notification-store";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

export default function NotificationsPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "vi";
  const [items, setItems] = useState(() => (user ? getNotificationsFor(user.role) : []));

  useEffect(() => {
    if (!user) return;
    setItems(getNotificationsFor(user.role));
  }, [user]);

  const unread = useMemo(() => items.filter((item) => !item.read).length, [items]);

  return (
    <WorkspaceLayout
      title="Notifications"
      subtitle="Track messages, deal interest, approvals, and platform updates"
    >
      <div className="space-y-4">
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-4">
          <p className="text-sm font-semibold text-[#111111]">
            {items.length} total • {unread} unread
          </p>
        </div>

        <div className="bg-white border border-[#EAEAEA] rounded-xl divide-y divide-[#F2F2F2]">
          {items.length === 0 ? (
            <div className="p-6 text-sm text-[#888888]">No notifications yet.</div>
          ) : (
            items.map((item) => (
              <Link
                key={item.id}
                href={item.link.includes("[locale]") ? item.link.replace("[locale]", locale) : item.link}
                onClick={() => {
                  markNotificationRead(item.id);
                  setItems((prev) => prev.map((value) => (value.id === item.id ? { ...value, read: true } : value)));
                }}
                className="p-4 flex items-start gap-3 hover:bg-[#FAFAFA] transition"
              >
                <img
                  src={`https://i.pravatar.cc/48?u=${item.avatar ?? item.type}`}
                  alt={item.title}
                  className="w-10 h-10 rounded-full border border-[#EAEAEA]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-bold text-[#111111] truncate">{item.title}</p>
                    {!item.read ? <span className="w-2 h-2 rounded-full bg-[#FFD600]" /> : null}
                  </div>
                  <p className="text-[12px] text-[#666666] mt-1">{item.description}</p>
                  <p className="text-[11px] text-[#AAAAAA] mt-1">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
