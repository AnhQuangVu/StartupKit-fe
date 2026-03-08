import type { UserRole } from "@/lib/auth-context";

export const NOTIFICATIONS_STORAGE_KEY = "startupkit_notifications";

export interface AppNotification {
  id: string;
  recipient_role: UserRole;
  recipient_id?: string;
  type: "investor_message" | "mentor_request" | "deal_interest" | "project_approval" | "platform_announcement" | "deal_update";
  title: string;
  description: string;
  link: string;
  created_at: string;
  read: boolean;
  avatar?: string;
}

const genId = () => `ntf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function loadNotifications(): AppNotification[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as AppNotification[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNotifications(items: AppNotification[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(items));
}

export function createNotification(payload: Omit<AppNotification, "id" | "created_at" | "read">) {
  const next: AppNotification = {
    id: genId(),
    created_at: new Date().toISOString(),
    read: false,
    ...payload,
  };
  const all = loadNotifications();
  saveNotifications([next, ...all]);
  return next;
}

export function getNotificationsFor(role: UserRole, userId?: string) {
  return loadNotifications().filter((item) => item.recipient_role === role && (!item.recipient_id || !userId || item.recipient_id === userId));
}

export function markNotificationRead(id: string) {
  const all = loadNotifications();
  const next = all.map((item) => (item.id === id ? { ...item, read: true } : item));
  saveNotifications(next);
}
