// Mentor-specific data persistence

export const SESSIONS_STORAGE_KEY = "startupkit_mentor_sessions";
export const REQUESTS_STORAGE_KEY = "startupkit_mentor_requests";
export const MESSAGES_STORAGE_KEY = "startupkit_mentor_messages";
export const MENTOR_PROFILE_STORAGE_KEY = "startupkit_mentor_profile";

export type SessionStatus = "Upcoming" | "Completed" | "Cancelled";

export interface MentorSession {
  id: string;
  founderId: string;
  founderName: string;
  startupName: string;
  startupId: string;
  topic: string;
  dateTime: string;
  status: SessionStatus;
  videoLink?: string;
  notes?: string;
}

export interface MentorRequest {
  id: string;
  founderId: string;
  founderName: string;
  startupName: string;
  startupId: string;
  industry: string;
  requestMessage: string;
  requestedTopic: string;
  status: "Pending" | "Accepted" | "Declined";
  createdAt: string;
}

export interface Conversation {
  id: string;
  founderId: string;
  founderName: string;
  startupName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  senderRole: "mentor" | "founder";
  content: string;
  timestamp: string;
}

export interface MentorProfile {
  fullName: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  skills: string[];
  yearsExperience: number;
  mentoringFocus: string[];
  availability: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export const DEFAULT_MENTOR_SESSIONS: MentorSession[] = [
  {
    id: "sess-101",
    founderId: "f-coolmate",
    founderName: "Phạm Chí Nhu",
    startupName: "Coolmate",
    startupId: "s1",
    topic: "Chiến lược đàm phán mở rộng thị trường Thái Lan & Vòng gọi vốn Series B $5M",
    dateTime: "2026-11-12T14:00:00.000Z",
    status: "Upcoming",
    videoLink: "https://meet.google.com/stk-coolmate-seriesb",
    notes: "Review cấu trúc Data Room, thỏa thuận cổ đông và định giá trước vòng đầu tư của Vertex Ventures.",
  },
  {
    id: "sess-102",
    founderId: "f-datbike",
    founderName: "Nguyễn Bá Cảnh Sơn",
    startupName: "Dat Bike",
    startupId: "s2",
    topic: "Tối ưu chuỗi cung ứng linh kiện và mở rộng công suất nhà máy Bình Dương",
    dateTime: "2026-11-14T09:30:00.000Z",
    status: "Upcoming",
    videoLink: "https://meet.google.com/stk-datbike-ops",
    notes: "Đánh giá các nhà cung cấp cell pin LFP nội địa và kế hoạch phủ sóng 100 trạm Dat Charge.",
  },
  {
    id: "sess-103",
    founderId: "f-buymed",
    founderName: "Hoàng Nguyễn",
    startupName: "BuyMed (Thuocsi.vn)",
    startupId: "s3",
    topic: "Hoàn thiện hệ thống kho vận dược phẩm chuẩn GSP và mở rộng danh mục B2B",
    dateTime: "2026-11-05T15:00:00.000Z",
    status: "Completed",
    videoLink: "https://meet.google.com/stk-buymed-seriesb",
    notes: "Đã rà soát SLA giao hàng cho 35,000 nhà thuốc tuyến huyện và hệ thống đối soát tài chính tự động.",
  },
  {
    id: "sess-104",
    founderId: "f-topcv",
    founderName: "Trần Trung Hiếu",
    startupName: "TopCV Vietnam",
    startupId: "s4",
    topic: "Ứng dụng AI LLM trong sàng lọc CV & Chiến lược đóng gói Enterprise HR Tech",
    dateTime: "2026-11-01T10:00:00.000Z",
    status: "Completed",
    videoLink: "https://meet.google.com/stk-topcv-ai",
    notes: "Thống nhất lộ trình ra mắt gói giải pháp HR Intelligence cho các tập đoàn ngân hàng và bán lẻ.",
  },
];

export const DEFAULT_MENTOR_REQUESTS: MentorRequest[] = [
  {
    id: "mreq-201",
    founderId: "f-logismart",
    founderName: "Đặng Quốc Khánh",
    startupName: "LogiSmart Green",
    startupId: "s7",
    industry: "Logistics",
    requestedTopic: "Chiến lược định giá Enterprise SaaS & Gọi vốn vòng Seed $900k",
    requestMessage:
      "Chào TS. Hoàng An, LogiSmart Green đang đạt $68k MRR với 1,400 xe tải liên kết. Em rất mong được thầy cố vấn về cách đóng gói gói Enterprise cho các tập đoàn FMCG lớn và hoàn thiện hồ sơ gọi vốn.",
    status: "Pending",
    createdAt: "2026-11-09T08:30:00.000Z",
  },
  {
    id: "mreq-202",
    founderId: "f-cybersafe",
    founderName: "Vũ Hoàng Nam",
    startupName: "CyberSafe Shield",
    startupId: "s8",
    industry: "SaaS / Cybersecurity",
    requestedTopic: "Xây dựng đội ngũ B2B Outbound Sales cho giải pháp AI SOC",
    requestMessage:
      "Chào anh, tụi em là đội ngũ kỹ sư bảo mật vừa ra mắt sản phẩm AI SOC-as-a-Service (42 khách hàng). Tụi em cần cố vấn để rút ngắn chu kỳ chốt sale B2B với khối Fintech và Ngân hàng.",
    status: "Pending",
    createdAt: "2026-11-09T14:15:00.000Z",
  },
  {
    id: "mreq-203",
    founderId: "f-agribot",
    founderName: "Nguyễn Văn Minh",
    startupName: "AgriBot Vietnam",
    startupId: "s1",
    industry: "Agritech",
    requestedTopic: "Tối ưu chiến lược Go-to-Market qua kênh Hợp tác xã",
    requestMessage: "Em mong được anh hướng dẫn chuẩn bị cho buổi làm việc với 3 quỹ VC vào tuần tới ạ.",
    status: "Accepted",
    createdAt: "2026-11-06T10:00:00.000Z",
  },
];

export const DEFAULT_MENTOR_CONVERSATIONS: Conversation[] = [
  {
    id: "mconv-1",
    founderId: "f-agribot",
    founderName: "Nguyễn Văn Minh",
    startupName: "AgriBot Vietnam",
    lastMessage: "Cảm ơn thầy An! Em đã sửa lại slide Unit Economics và bổ sung chỉ số CAC Payback 4.5 tháng theo góp ý của thầy.",
    lastMessageTime: "30 phút trước",
    unread: 1,
    messages: [
      {
        id: "mm-1",
        senderId: "u-mentor-1",
        senderRole: "mentor",
        content: "Chào Minh, anh đã xem qua Pitch Deck vòng Seed của AgriBot. Phần công nghệ rất thuyết phục, nhưng em cần làm nổi bật hơn hợp đồng MOU với 18 hợp tác xã ngay ở slide Traction.",
        timestamp: "08:45",
      },
      {
        id: "mm-2",
        senderId: "f-agribot",
        senderRole: "founder",
        content: "Cảm ơn thầy An! Em đã sửa lại slide Unit Economics và bổ sung chỉ số CAC Payback 4.5 tháng theo góp ý của thầy.",
        timestamp: "09:10",
      },
    ],
  },
  {
    id: "mconv-2",
    founderId: "f-edupath",
    founderName: "Phạm Anh Tuấn",
    startupName: "EduPath AI",
    lastMessage: "Dạ vâng, hẹn gặp anh vào 9h30 sáng thứ Sáu tuần này trên Google Meet ạ!",
    lastMessageTime: "3 giờ trước",
    unread: 0,
    messages: [
      {
        id: "mm-3",
        senderId: "u-mentor-1",
        senderRole: "mentor",
        content: "Tuấn ơi, trước buổi mentoring thứ Sáu này em chuẩn bị giúp anh bảng tỷ lệ học sinh active theo từng khối lớp nhé.",
        timestamp: "Hôm qua",
      },
      {
        id: "mm-4",
        senderId: "f-edupath",
        senderRole: "founder",
        content: "Dạ vâng, hẹn gặp anh vào 9h30 sáng thứ Sáu tuần này trên Google Meet ạ!",
        timestamp: "3 giờ trước",
      },
    ],
  },
];

export const DEFAULT_MENTOR_PROFILE: MentorProfile = {
  fullName: "TS. Lê Hoàng An · Ex-VP Product & Startup Advisor",
  bio: "12 năm kinh nghiệm xây dựng và mở rộng quy mô sản phẩm công nghệ (Fintech, AI SaaS, Marketplace) tại Đông Nam Á. Cố vấn chiến lược cho hơn 40 startup từ giai đoạn Pre-seed đến Series B với tổng vốn huy động thành công trên $35M.",
  avatar: "https://i.pravatar.cc/150?u=mentor-an",
  expertise: ["Product Strategy", "Go-to-Market", "Fundraising & Pitching", "Unit Economics", "B2B SaaS Growth"],
  skills: ["Product-Market Fit", "Financial Modeling", "Series A Readiness", "OKRs & Scaling", "Enterprise Sales", "AI Commercialization"],
  yearsExperience: 12,
  mentoringFocus: ["Pre-seed & Seed Founders", "Chiến lược gọi vốn VC", "Tối ưu tăng trưởng & giữ chân khách hàng"],
  availability: "Thứ 3, Thứ 5 & Sáng Thứ 7 (6 giờ/tuần)",
  socialLinks: {
    linkedin: "https://linkedin.com/in/dr-le-hoang-an",
    website: "https://hoangan.advisor.vn",
    twitter: "https://x.com/hoangan_product",
  },
};

// Sessions Management
export function loadMentorSessions(): MentorSession[] {
  if (typeof window === "undefined") return DEFAULT_MENTOR_SESSIONS;
  const raw = window.localStorage.getItem(SESSIONS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(DEFAULT_MENTOR_SESSIONS));
    return DEFAULT_MENTOR_SESSIONS;
  }
  try {
    const parsed = JSON.parse(raw) as MentorSession[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MENTOR_SESSIONS;
  } catch {
    return DEFAULT_MENTOR_SESSIONS;
  }
}

export function saveMentorSessions(sessions: MentorSession[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
}

export function addMentorSession(session: MentorSession) {
  if (typeof window === "undefined") return;
  const sessions = loadMentorSessions();
  sessions.push(session);
  saveMentorSessions(sessions);
}

export function getMentorSessionById(id: string): MentorSession | undefined {
  return loadMentorSessions().find(s => s.id === id);
}

export function updateMentorSessionStatus(id: string, status: SessionStatus) {
  if (typeof window === "undefined") return;
  const sessions = loadMentorSessions();
  const updated = sessions.map(s => s.id === id ? { ...s, status } : s);
  saveMentorSessions(updated);
}

// Requests Management
export function loadMentorRequests(): MentorRequest[] {
  if (typeof window === "undefined") return DEFAULT_MENTOR_REQUESTS;
  const raw = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(DEFAULT_MENTOR_REQUESTS));
    return DEFAULT_MENTOR_REQUESTS;
  }
  try {
    const parsed = JSON.parse(raw) as MentorRequest[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MENTOR_REQUESTS;
  } catch {
    return DEFAULT_MENTOR_REQUESTS;
  }
}

export function saveMentorRequests(requests: MentorRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

export function acceptMentorRequest(requestId: string): MentorSession | null {
  if (typeof window === "undefined") return null;
  const requests = loadMentorRequests();
  const request = requests.find(r => r.id === requestId);
  if (!request) return null;

  // Convert request to session
  const session: MentorSession = {
    id: createSessionId(),
    founderId: request.founderId,
    founderName: request.founderName,
    startupName: request.startupName,
    startupId: request.startupId,
    topic: request.requestedTopic,
    dateTime: new Date().toISOString(),
    status: "Upcoming"
  };

  addMentorSession(session);

  // Update request status
  const updated = requests.map(r => r.id === requestId ? { ...r, status: "Accepted" as const } : r);
  saveMentorRequests(updated);

  return session;
}

export function declineMentorRequest(requestId: string) {
  if (typeof window === "undefined") return;
  const requests = loadMentorRequests();
  const updated = requests.map(r => r.id === requestId ? { ...r, status: "Declined" as const } : r);
  saveMentorRequests(updated);
}

// Messages Management
export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return DEFAULT_MENTOR_CONVERSATIONS;
  const raw = window.localStorage.getItem(MESSAGES_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(DEFAULT_MENTOR_CONVERSATIONS));
    return DEFAULT_MENTOR_CONVERSATIONS;
  }
  try {
    const parsed = JSON.parse(raw) as Conversation[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MENTOR_CONVERSATIONS;
  } catch {
    return DEFAULT_MENTOR_CONVERSATIONS;
  }
}

export function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(conversations));
}

export function getConversationById(id: string): Conversation | undefined {
  return loadConversations().find(c => c.id === id);
}

export function addMessage(conversationId: string, message: Message) {
  if (typeof window === "undefined") return;
  const conversations = loadConversations();
  const conv = conversations.find(c => c.id === conversationId);
  if (conv) {
    conv.messages.push(message);
    conv.lastMessage = message.content;
    conv.lastMessageTime = message.timestamp;
    saveConversations(conversations);
  }
}

export function createConversation(conversation: Conversation) {
  if (typeof window === "undefined") return;
  const conversations = loadConversations();
  if (!conversations.find(c => c.id === conversation.id)) {
    conversations.push(conversation);
    saveConversations(conversations);
  }
}

// Profile Management
export function loadMentorProfile(): MentorProfile | null {
  if (typeof window === "undefined") return DEFAULT_MENTOR_PROFILE;
  const raw = window.localStorage.getItem(MENTOR_PROFILE_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(MENTOR_PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_MENTOR_PROFILE));
    return DEFAULT_MENTOR_PROFILE;
  }
  try {
    return JSON.parse(raw) as MentorProfile;
  } catch {
    return DEFAULT_MENTOR_PROFILE;
  }
}

export function saveMentorProfile(profile: MentorProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MENTOR_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

let conversationIdCounter = 0;
let messageIdCounter = 0;
let sessionIdCounter = 0;

export function createConversationId(): string {
  return `conv-${Date.now()}-${conversationIdCounter++}`;
}

export function createMessageId(): string {
  return `msg-${Date.now()}-${messageIdCounter++}`;
}

export function createSessionId(): string {
  return `sess-${Date.now()}-${sessionIdCounter++}`;
}
