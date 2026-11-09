export const ADMIN_REPORTS_KEY = "startupkit_admin_reports";
export const ADMIN_MODERATION_KEY = "startupkit_admin_moderation";
export const ADMIN_USERS_KEY = "startupkit_admin_users";

export interface AdminReportItem {
  id: string;
  type: "Fake Startup" | "Scam" | "Spam" | "Harassment" | "Plagiarized Deck";
  target: string;
  targetRole: "STARTUP" | "INVESTOR" | "MENTOR";
  reporter: string;
  reason: string;
  severity: "High" | "Medium" | "Low";
  createdAt: string;
  status: "Open" | "Investigating" | "Resolved" | "Dismissed";
  resolutionNote?: string;
}

export interface AdminModerationItem {
  id: string;
  contentType: "Startup Profile" | "Project Description" | "Comment" | "Landing Page" | "Pitch Deck";
  title: string;
  author: string;
  submittedAt: string;
  aiRiskScore: string;
  status: "Pending" | "Approved" | "Rejected" | "Flagged";
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "FOUNDER" | "INVESTOR" | "MENTOR";
  organization: string;
  joinDate: string;
  projectsCount: number;
  verified: boolean;
  status: "Active" | "Suspended";
}

export const DEFAULT_ADMIN_REPORTS: AdminReportItem[] = [
  {
    id: "RPT-1001",
    type: "Fake Startup",
    target: "CryptoGain AI X100",
    targetRole: "STARTUP",
    reporter: "Trần Bảo Ngọc (Mekong Ventures)",
    reason: "Hồ sơ dự án cam kết lợi nhuận cố định 30%/tháng, dấu hiệu huy động vốn trái phép và số liệu ARR không có chứng từ.",
    severity: "High",
    createdAt: "2026-11-09",
    status: "Open",
  },
  {
    id: "RPT-1002",
    type: "Scam",
    target: "FastFund Global Syndicate",
    targetRole: "INVESTOR",
    reporter: "Nguyễn Văn Minh (AgriBot Vietnam)",
    reason: "Yêu cầu startup chuyển trước $2,000 phí thẩm định hồ sơ cá nhân ngoài hệ thống Deal Room của StartupKit.",
    severity: "High",
    createdAt: "2026-11-08",
    status: "Investigating",
    resolutionNote: "Đang tạm khóa quyền gửi tin nhắn của tài khoản để kiểm tra lịch sử chat.",
  },
  {
    id: "RPT-1003",
    type: "Plagiarized Deck",
    target: "CopyPay VN",
    targetRole: "STARTUP",
    reporter: "Trần Thị Lan (PayEase)",
    reason: "Sao chép nguyên văn 8 slides kiến trúc thanh toán và biểu đồ tăng trưởng từ Pitch Deck công khai của PayEase.",
    severity: "Medium",
    createdAt: "2026-11-07",
    status: "Investigating",
  },
  {
    id: "RPT-1004",
    type: "Spam",
    target: "BoostFollowers Agency",
    targetRole: "MENTOR",
    reporter: "Phạm Anh Tuấn (EduPath AI)",
    reason: "Gửi tin nhắn quảng cáo dịch vụ seeding hàng loạt cho các Founder trên Marketplace.",
    severity: "Low",
    createdAt: "2026-11-05",
    status: "Resolved",
    resolutionNote: "Đã gỡ nội dung quảng cáo và cảnh cáo lần 1.",
  },
  {
    id: "RPT-1005",
    type: "Harassment",
    target: "Anonymous Angel #882",
    targetRole: "INVESTOR",
    reporter: "BS. Lê Hoàng (MediConnect)",
    reason: "Sử dụng ngôn từ không phù hợp trong phần bình luận hỏi đáp Q&A của dự án.",
    severity: "Medium",
    createdAt: "2026-11-03",
    status: "Resolved",
    resolutionNote: "Đã xóa bình luận vi phạm và khóa quyền bình luận 14 ngày.",
  },
];

export const DEFAULT_ADMIN_MODERATION: AdminModerationItem[] = [
  {
    id: "MOD-201",
    contentType: "Startup Profile",
    title: "AgriBot Vietnam — Cập nhật báo cáo tài chính Q3/2026",
    author: "Nguyễn Văn Minh",
    submittedAt: "2026-11-09 14:20",
    aiRiskScore: "2% (An toàn)",
    status: "Pending",
  },
  {
    id: "MOD-202",
    contentType: "Pitch Deck",
    title: "LogiSmart Green — Seed Pitch Deck ($900k Raise)",
    author: "Đặng Quốc Khánh",
    submittedAt: "2026-11-09 11:05",
    aiRiskScore: "4% (An toàn)",
    status: "Pending",
  },
  {
    id: "MOD-203",
    contentType: "Project Description",
    title: "CryptoGain AI X100 — Cam kết nhân 10 tài khoản trong 30 ngày",
    author: "user_anon_99",
    submittedAt: "2026-11-09 08:15",
    aiRiskScore: "94% (Rủi ro lừa đảo cao)",
    status: "Flagged",
  },
  {
    id: "MOD-204",
    contentType: "Landing Page",
    title: "PayEase — Trang giới thiệu vòng Series A ($2M)",
    author: "Trần Thị Lan",
    submittedAt: "2026-11-08 17:30",
    aiRiskScore: "1% (Đã xác thực KYB)",
    status: "Approved",
  },
  {
    id: "MOD-205",
    contentType: "Comment",
    title: "Bình luận thẩm định kỹ thuật eBPF trên CyberSafe Shield",
    author: "Khanh Dang (Mentor)",
    submittedAt: "2026-11-08 10:12",
    aiRiskScore: "0% (An toàn)",
    status: "Approved",
  },
];

export const DEFAULT_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "USR-01",
    name: "Nguyễn Văn Minh",
    email: "minh@agribot.vn",
    role: "FOUNDER",
    organization: "AgriBot Vietnam",
    joinDate: "2026-08-02",
    projectsCount: 2,
    verified: true,
    status: "Active",
  },
  {
    id: "USR-02",
    name: "Trần Thị Lan",
    email: "lan.tran@payease.vn",
    role: "FOUNDER",
    organization: "PayEase",
    joinDate: "2026-07-15",
    projectsCount: 1,
    verified: true,
    status: "Active",
  },
  {
    id: "USR-03",
    name: "Trần Bảo Ngọc",
    email: "ngoc@mekong.vc",
    role: "INVESTOR",
    organization: "Mekong Tech Ventures",
    joinDate: "2026-06-11",
    projectsCount: 0,
    verified: true,
    status: "Active",
  },
  {
    id: "USR-04",
    name: "TS. Lê Hoàng An",
    email: "an.le@mentor.vn",
    role: "MENTOR",
    organization: "Ex-VNPay / Startup Advisor",
    joinDate: "2026-06-29",
    projectsCount: 0,
    verified: true,
    status: "Active",
  },
  {
    id: "USR-05",
    name: "Đặng Quốc Khánh",
    email: "khanh@logismart.vn",
    role: "FOUNDER",
    organization: "LogiSmart Green",
    joinDate: "2026-09-19",
    projectsCount: 1,
    verified: false,
    status: "Active",
  },
  {
    id: "USR-06",
    name: "FastFund Global",
    email: "contact@fastfund-syndicate.io",
    role: "INVESTOR",
    organization: "FastFund Co",
    joinDate: "2026-11-01",
    projectsCount: 0,
    verified: false,
    status: "Suspended",
  },
];

export function loadAdminReports(): AdminReportItem[] {
  if (typeof window === "undefined") return DEFAULT_ADMIN_REPORTS;
  const raw = window.localStorage.getItem(ADMIN_REPORTS_KEY);
  if (!raw) {
    window.localStorage.setItem(ADMIN_REPORTS_KEY, JSON.stringify(DEFAULT_ADMIN_REPORTS));
    return DEFAULT_ADMIN_REPORTS;
  }
  try {
    const parsed = JSON.parse(raw) as AdminReportItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ADMIN_REPORTS;
  } catch {
    return DEFAULT_ADMIN_REPORTS;
  }
}

export function saveAdminReports(items: AdminReportItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_REPORTS_KEY, JSON.stringify(items));
}

export function loadAdminModeration(): AdminModerationItem[] {
  if (typeof window === "undefined") return DEFAULT_ADMIN_MODERATION;
  const raw = window.localStorage.getItem(ADMIN_MODERATION_KEY);
  if (!raw) {
    window.localStorage.setItem(ADMIN_MODERATION_KEY, JSON.stringify(DEFAULT_ADMIN_MODERATION));
    return DEFAULT_ADMIN_MODERATION;
  }
  try {
    const parsed = JSON.parse(raw) as AdminModerationItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ADMIN_MODERATION;
  } catch {
    return DEFAULT_ADMIN_MODERATION;
  }
}

export function saveAdminModeration(items: AdminModerationItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_MODERATION_KEY, JSON.stringify(items));
}

export function loadAdminUsers(): AdminUserItem[] {
  if (typeof window === "undefined") return DEFAULT_ADMIN_USERS;
  const raw = window.localStorage.getItem(ADMIN_USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(DEFAULT_ADMIN_USERS));
    return DEFAULT_ADMIN_USERS;
  }
  try {
    const parsed = JSON.parse(raw) as AdminUserItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ADMIN_USERS;
  } catch {
    return DEFAULT_ADMIN_USERS;
  }
}

export function saveAdminUsers(items: AdminUserItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(items));
}
