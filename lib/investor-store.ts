// Investor-specific data persistence

export const SAVED_DEALS_STORAGE_KEY = "startupkit_investor_saved_deals";
export const MESSAGES_STORAGE_KEY = "startupkit_investor_messages";
export const INVESTOR_PROFILE_STORAGE_KEY = "startupkit_investor_profile";

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
  senderRole: "investor" | "founder";
  content: string;
  timestamp: string;
}

export interface InvestorProfile {
  fullName: string;
  bio: string;
  avatar?: string;
  investmentFocus: string[];
  preferredStage: string[];
  ticketSize: string;
  portfolio: string[];
  socialLinks: {
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export const DEFAULT_SAVED_DEALS: string[] = ["s1", "s4", "s3", "s7"];

export const DEFAULT_INVESTOR_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-inv-1",
    founderId: "f-agribot",
    founderName: "Nguyễn Văn Minh",
    startupName: "AgriBot Vietnam",
    lastMessage: "Em đã cập nhật báo cáo Unit Economics Q3 và danh sách 18 hợp tác xã tại Đồng bằng sông Cửu Long trong Deal Room ạ.",
    lastMessageTime: "10 phút trước",
    unread: 2,
    messages: [
      {
        id: "m-inv-101",
        senderId: "f-agribot",
        senderRole: "founder",
        content: "Chào chị Ngọc, cảm ơn quỹ Mekong Ventures đã quan tâm đến vòng Seed $500k của AgriBot Vietnam!",
        timestamp: "09:15",
      },
      {
        id: "m-inv-102",
        senderId: "u-investor-1",
        senderRole: "investor",
        content: "Chào Minh, bên chị rất ấn tượng với tỷ lệ giữ chân 87% của nông hộ. Em có thể chia sẻ thêm về chi phí sản xuất phần cứng trạm cảm biến ở quy mô 1,000 thiết bị không?",
        timestamp: "09:22",
      },
      {
        id: "m-inv-103",
        senderId: "f-agribot",
        senderRole: "founder",
        content: "Em đã cập nhật báo cáo Unit Economics Q3 và danh sách 18 hợp tác xã tại Đồng bằng sông Cửu Long trong Deal Room ạ.",
        timestamp: "09:30",
      },
    ],
  },
  {
    id: "conv-inv-2",
    founderId: "f-payease",
    founderName: "Trần Thị Lan",
    startupName: "PayEase",
    lastMessage: "Lịch họp Due Diligence vào 14:00 thứ Năm tuần này hoàn toàn phù hợp với team PayEase ạ.",
    lastMessageTime: "2 giờ trước",
    unread: 0,
    messages: [
      {
        id: "m-inv-201",
        senderId: "u-investor-1",
        senderRole: "investor",
        content: "Chào Lan, chỉ số NRR 118% và ARR $1.74M của PayEase rất ấn tượng. Quỹ muốn đặt lịch trao đổi sâu hơn với CTO về kiến trúc kết nối 22 ngân hàng.",
        timestamp: "Hôm qua",
      },
      {
        id: "m-inv-202",
        senderId: "f-payease",
        senderRole: "founder",
        content: "Lịch họp Due Diligence vào 14:00 thứ Năm tuần này hoàn toàn phù hợp với team PayEase ạ.",
        timestamp: "2 giờ trước",
      },
    ],
  },
  {
    id: "conv-inv-3",
    founderId: "f-mediconnect",
    founderName: "BS. Lê Hoàng",
    startupName: "MediConnect",
    lastMessage: "Vâng, hiện tại 45 phòng khám vệ tinh miền Trung đã có lãi ròng từ tháng thứ 4 vận hành.",
    lastMessageTime: "Hôm qua",
    unread: 1,
    messages: [
      {
        id: "m-inv-301",
        senderId: "u-investor-1",
        senderRole: "investor",
        content: "Chào BS. Hoàng, mô hình kết hợp phòng khám xét nghiệm vệ tinh của MediConnect giải quyết rất tốt bài toán niềm tin ở tuyến tỉnh.",
        timestamp: "Hôm qua",
      },
      {
        id: "m-inv-302",
        senderId: "f-mediconnect",
        senderRole: "founder",
        content: "Vâng, hiện tại 45 phòng khám vệ tinh miền Trung đã có lãi ròng từ tháng thứ 4 vận hành.",
        timestamp: "Hôm qua",
      },
    ],
  },
];

export const DEFAULT_INVESTOR_PROFILE: InvestorProfile = {
  fullName: "Trần Bảo Ngọc · Partner @ Mekong Tech Ventures",
  bio: "Hơn 10 năm kinh nghiệm đầu tư mạo hiểm (Venture Capital) và M&A tại Việt Nam & Đông Nam Á. Tập trung dẫn dắt các vòng gọi vốn từ Pre-seed đến Series A cho các startup ứng dụng AI, Fintech, Agritech và B2B SaaS giải quyết bài toán thực tiễn tại thị trường mới nổi.",
  avatar: "https://i.pravatar.cc/150?u=investor-ngoc",
  investmentFocus: ["Fintech", "Agritech", "Healthtech", "B2B SaaS", "AI / Deep Tech", "Logistics"],
  preferredStage: ["Pre-seed", "Seed", "Series A"],
  ticketSize: "$100,000 – $1,500,000",
  portfolio: [
    "PayEase (Series A · Fintech)",
    "AgriBot Vietnam (Seed · Agritech)",
    "LogiSmart Green (Seed · Logistics)",
    "MediConnect (Seed · Healthtech)",
    "CloudOps VN (Exited · B2B SaaS)",
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/tran-bao-ngoc-vc",
    website: "https://mekongtechventures.vn",
    twitter: "https://x.com/ngoctran_vc",
  },
};

// Saved Deals Management
export function loadSavedDeals(): string[] {
  if (typeof window === "undefined") return DEFAULT_SAVED_DEALS;
  const raw = window.localStorage.getItem(SAVED_DEALS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(SAVED_DEALS_STORAGE_KEY, JSON.stringify(DEFAULT_SAVED_DEALS));
    return DEFAULT_SAVED_DEALS;
  }
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return DEFAULT_SAVED_DEALS;
  }
}

export function saveSavedDeal(dealId: string) {
  if (typeof window === "undefined") return;
  const deals = loadSavedDeals();
  if (!deals.includes(dealId)) {
    deals.push(dealId);
    window.localStorage.setItem(SAVED_DEALS_STORAGE_KEY, JSON.stringify(deals));
  }
}

export function unsaveSavedDeal(dealId: string) {
  if (typeof window === "undefined") return;
  const deals = loadSavedDeals();
  const filtered = deals.filter(id => id !== dealId);
  window.localStorage.setItem(SAVED_DEALS_STORAGE_KEY, JSON.stringify(filtered));
}

export function isSavedDeal(dealId: string): boolean {
  return loadSavedDeals().includes(dealId);
}

// Messages Management
export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return DEFAULT_INVESTOR_CONVERSATIONS;
  const raw = window.localStorage.getItem(MESSAGES_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(DEFAULT_INVESTOR_CONVERSATIONS));
    return DEFAULT_INVESTOR_CONVERSATIONS;
  }
  try {
    const parsed = JSON.parse(raw) as Conversation[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INVESTOR_CONVERSATIONS;
  } catch {
    return DEFAULT_INVESTOR_CONVERSATIONS;
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

// Investor Profile Management
export function loadInvestorProfile(): InvestorProfile | null {
  if (typeof window === "undefined") return DEFAULT_INVESTOR_PROFILE;
  const raw = window.localStorage.getItem(INVESTOR_PROFILE_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(INVESTOR_PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_INVESTOR_PROFILE));
    return DEFAULT_INVESTOR_PROFILE;
  }
  try {
    return JSON.parse(raw) as InvestorProfile;
  } catch {
    return DEFAULT_INVESTOR_PROFILE;
  }
}

export function saveInvestorProfile(profile: InvestorProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INVESTOR_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

let messageIdCounter = 0;
let conversationIdCounter = 0;

export function createConversationId(): string {
  return `conv-${Date.now()}-${conversationIdCounter++}`;
}

export function createMessageId(): string {
  return `msg-${Date.now()}-${messageIdCounter++}`;
}
