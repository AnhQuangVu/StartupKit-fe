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

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "ntf-def-1",
    recipient_role: "STARTUP",
    type: "deal_interest",
    title: "Quỹ Mekong Tech Ventures quan tâm đầu tư vòng Seed",
    description: "Partner Trần Bảo Ngọc đã gửi đề xuất đầu tư $250,000 - $350,000 vào AgriBot Vietnam và mở Deal Room.",
    link: "/vi/workspace/deals/deal-agribot-1",
    created_at: "2026-11-09T14:30:00.000Z",
    read: false,
    avatar: "investor-ngoc",
  },
  {
    id: "ntf-def-2",
    recipient_role: "STARTUP",
    type: "project_approval",
    title: "AI Credibility Score đạt 94/100 (Top 5% Agritech)",
    description: "Hồ sơ gọi vốn của AgriBot Vietnam đã được xác thực và hiển thị nổi bật trên Sàn Gọi Vốn.",
    link: "/vi/workspace/startup/projects",
    created_at: "2026-11-08T09:15:00.000Z",
    read: false,
    avatar: "ai-score",
  },
  {
    id: "ntf-def-3",
    recipient_role: "STARTUP",
    type: "investor_message",
    title: "Phản hồi mới từ Mentor TS. Lê Hoàng An",
    description: "Mentor đã gửi nhận xét chi tiết cho Pitch Deck 12 slides trước buổi gặp quỹ đầu tư.",
    link: "/vi/workspace/startup",
    created_at: "2026-11-07T16:40:00.000Z",
    read: true,
    avatar: "mentor-an",
  },
  {
    id: "ntf-def-4",
    recipient_role: "INVESTOR",
    type: "deal_update",
    title: "AgriBot Vietnam vừa cập nhật Financial Model Q3",
    description: "Founder Nguyễn Văn Minh đã tải lên bảng Unit Economics mới và trả lời câu hỏi thẩm định trong Deal Room.",
    link: "/vi/workspace/deals/deal-agribot-1",
    created_at: "2026-11-09T11:20:00.000Z",
    read: false,
    avatar: "agribot",
  },
  {
    id: "ntf-def-5",
    recipient_role: "INVESTOR",
    type: "platform_announcement",
    title: "3 Startup AI/SaaS mới đạt AI Score > 90 tuần này",
    description: "PayEase (97 điểm), AgriBot Vietnam (94 điểm) và LogiSmart Green (92 điểm) đang mở vòng gọi vốn mới.",
    link: "/vi/deals",
    created_at: "2026-11-08T08:00:00.000Z",
    read: false,
    avatar: "startupkit",
  },
  {
    id: "ntf-def-6",
    recipient_role: "MENTOR",
    type: "mentor_request",
    title: "Yêu cầu cố vấn mới từ LogiSmart Green ($68k MRR)",
    description: "Founder Đặng Quốc Khánh đăng ký phiên cố vấn về Chiến lược định giá Enterprise SaaS & Gọi vốn Seed.",
    link: "/vi/workspace/mentor/requests",
    created_at: "2026-11-09T10:05:00.000Z",
    read: false,
    avatar: "logismart",
  },
  {
    id: "ntf-def-7",
    recipient_role: "MENTOR",
    type: "mentor_request",
    title: "Yêu cầu cố vấn mới từ CyberSafe Shield",
    description: "Founder Vũ Hoàng Nam mong muốn được cố vấn xây dựng đội ngũ B2B Outbound Sales khối Fintech.",
    link: "/vi/workspace/mentor/requests",
    created_at: "2026-11-09T14:15:00.000Z",
    read: false,
    avatar: "cybersafe",
  },
  {
    id: "ntf-def-8",
    recipient_role: "ADMIN",
    type: "platform_announcement",
    title: "Báo cáo hệ sinh thái tuần: 12 Startup & 10 Quỹ VC đang hoạt động",
    description: "Tổng giá trị cam kết đầu tư qua Deal Room tăng 34% so với tháng trước.",
    link: "/vi/workspace/admin",
    created_at: "2026-11-09T07:00:00.000Z",
    read: false,
    avatar: "admin",
  },
];

const genId = () => `ntf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function loadNotifications(): AppNotification[] {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
  const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
    return DEFAULT_NOTIFICATIONS;
  }
  try {
    const parsed = JSON.parse(raw) as AppNotification[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_NOTIFICATIONS;
  } catch {
    return DEFAULT_NOTIFICATIONS;
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
