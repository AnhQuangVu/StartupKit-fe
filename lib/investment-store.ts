export const INVESTMENT_REQUESTS_STORAGE_KEY = "startupkit_investment_requests";
export const DEALS_STORAGE_KEY = "startupkit_deals";
export const DEAL_ROOM_STORAGE_KEY = "startupkit_deal_rooms";

export type InvestmentRequestStatus = "pending" | "accepted" | "rejected";

export interface InvestmentRequest {
  id: string;
  startup_id: string;
  startup_slug?: string;
  startup_name?: string;
  investor_id: string;
  investor_name?: string;
  message: string;
  amount_range: string;
  notes?: string;
  status: InvestmentRequestStatus;
  created_at: string;
}

export interface Deal {
  id: string;
  startup_id: string;
  startup_name?: string;
  investor_id: string;
  investor_name?: string;
  status: "active" | "closed";
  created_at: string;
}

export interface DealQuestion {
  id: string;
  from: "founder" | "investor";
  text: string;
  created_at: string;
}

export interface DealRoomData {
  deal_id: string;
  pitch_deck_url?: string;
  financial_docs_url?: string;
  traction_data?: string;
  team_notes?: string;
  questions: DealQuestion[];
}

export const DEFAULT_INVESTMENT_REQUESTS: InvestmentRequest[] = [
  {
    id: "req-seed-101",
    startup_id: "s1",
    startup_slug: "agribot-vietnam",
    startup_name: "AgriBot Vietnam",
    investor_id: "u-investor-1",
    investor_name: "Trần Bảo Ngọc (Mekong Ventures)",
    message:
      "Quỹ Mekong Tech Ventures ấn tượng với mô hình HaaS + SaaS cho hợp tác xã của AgriBot. Chúng tôi muốn tham gia dẫn dắt vòng Seed với quy mô vé từ $250k - $350k.",
    amount_range: "$250,000 - $350,000",
    notes: "Ưu tiên thẩm định kỹ thuật phần cứng IoT và hợp đồng phân phối tại An Giang, Đồng Tháp.",
    status: "accepted",
    created_at: "2026-11-04T09:00:00.000Z",
  },
  {
    id: "req-seed-102",
    startup_id: "s4",
    startup_slug: "payease",
    startup_name: "PayEase",
    investor_id: "u-investor-1",
    investor_name: "Trần Bảo Ngọc (Mekong Ventures)",
    message:
      "Chỉ số NRR 118% và ARR $1.74M của PayEase hoàn toàn phù hợp tiêu chí Series A của quỹ. Mong muốn mở Deal Room để thẩm định sâu.",
    amount_range: "$500,000 - $1,000,000",
    notes: "Cần xem thêm báo cáo kiểm toán 2025 và lộ trình mở rộng sang Philippines.",
    status: "accepted",
    created_at: "2026-11-05T14:20:00.000Z",
  },
  {
    id: "req-seed-103",
    startup_id: "s3",
    startup_slug: "mediconnect",
    startup_name: "MediConnect",
    investor_id: "u-investor-2",
    investor_name: "Do Ventures Partner",
    message:
      "Do Ventures đánh giá cao mạng lưới 45 phòng khám vệ tinh của MediConnect tại miền Trung. Đề xuất trao đổi vòng Seed $800k.",
    amount_range: "$300,000 - $400,000",
    notes: "Quan tâm đến tỷ lệ bác sĩ hoạt động hàng tháng và chi phí thu hút bệnh nhân mới (CAC).",
    status: "pending",
    created_at: "2026-11-08T11:10:00.000Z",
  },
  {
    id: "req-seed-104",
    startup_id: "s7",
    startup_slug: "logismart-green",
    startup_name: "LogiSmart Green",
    investor_id: "u-investor-1",
    investor_name: "Trần Bảo Ngọc (Mekong Ventures)",
    message:
      "Giải pháp tối ưu tải chiều về và kho lạnh của LogiSmart rất tiềm năng trong bối cảnh ESG. Quỹ muốn đề xuất Term Sheet vòng Seed.",
    amount_range: "$400,000 - $600,000",
    notes: "Thẩm định danh sách 85 khách hàng doanh nghiệp B2B hiện hữu.",
    status: "pending",
    created_at: "2026-11-09T10:30:00.000Z",
  },
];

export const DEFAULT_DEALS: Deal[] = [
  {
    id: "deal-agribot-1",
    startup_id: "s1",
    startup_name: "AgriBot Vietnam",
    investor_id: "u-investor-1",
    investor_name: "Trần Bảo Ngọc (Mekong Ventures)",
    status: "active",
    created_at: "2026-11-05T10:00:00.000Z",
  },
  {
    id: "deal-payease-1",
    startup_id: "s4",
    startup_name: "PayEase",
    investor_id: "u-investor-1",
    investor_name: "Trần Bảo Ngọc (Mekong Ventures)",
    status: "active",
    created_at: "2026-11-06T15:30:00.000Z",
  },
];

export const DEFAULT_DEAL_ROOMS: DealRoomData[] = [
  {
    deal_id: "deal-agribot-1",
    pitch_deck_url: "https://agribot.vn/investor-room/AgriBot_Seed_Deck_2026.pdf",
    financial_docs_url: "https://agribot.vn/investor-room/AgriBot_3Year_Financial_Model.xlsx",
    traction_data:
      "• MRR: $28,500 (+22% MoM)\n• Nông hộ trả phí: 3,450 nông hộ & 18 hợp tác xã tại An Giang, Đồng Tháp, Cần Thơ\n• Gross Margin: 68% (Phần cứng IoT hoàn vốn trong 3.5 tháng)\n• Net Retention 12 tháng: 89%",
    team_notes:
      "• Nguyễn Văn Minh (CEO): 10 năm R&D Nông nghiệp công nghệ cao (ĐH Bách Khoa Hà Nội)\n• Lê Thị Nga (CTO): Cựu Tech Lead AI/Computer Vision tại FPT Software\n• Phạm Đức (COO): 8 năm vận hành chuỗi cung ứng vật tư nông nghiệp ĐBSCL",
    questions: [
      {
        id: "dq-1",
        from: "investor",
        text: "Khi mở rộng lên 10,000 trạm cảm biến trong năm 2027, chuỗi cung ứng linh kiện và bảo hành tại địa phương sẽ được vận hành như thế nào?",
        created_at: "2026-11-07T09:00:00.000Z",
      },
      {
        id: "dq-2",
        from: "founder",
        text: "Hiện tại AgriBot lắp ráp bo mạch tại Khu Công nghệ cao Hòa Lạc và ủy quyền lắp đặt/bảo hành 1-đổi-1 thông qua đội ngũ kỹ thuật của 18 Hợp tác xã đối tác nên không cần phình to nhân sự cố định ạ.",
        created_at: "2026-11-07T10:15:00.000Z",
      },
    ],
  },
  {
    deal_id: "deal-payease-1",
    pitch_deck_url: "https://payease.vn/dataroom/PayEase_SeriesA_PitchDeck.pdf",
    financial_docs_url: "https://payease.vn/dataroom/PayEase_Audited_Financials_2026.xlsx",
    traction_data:
      "• ARR: $1.74M ($145k MRR · Tăng trưởng 18% MoM)\n• Khách hàng B2B: 210 doanh nghiệp Mid-market\n• Tỷ lệ giữ chân doanh thu ròng (NRR): 118%\n• Tổng giá trị giao dịch đối soát (TPV): $85M/tháng qua 22 ngân hàng",
    team_notes:
      "• Trần Thị Lan (CEO): Cựu VP Finance tại MoMo (15 năm kinh nghiệm Fintech)\n• Trần Khoa (CTO): Cựu Principal Engineer tại Grab Financial Group\n• Nguyễn Thu (VP Enterprise Sales): 10 năm triển khai ERP SAP & Oracle",
    questions: [
      {
        id: "dq-3",
        from: "investor",
        text: "Thời gian trung bình để onboard một doanh nghiệp có sẵn hệ thống ERP SAP hoặc MISA là bao lâu?",
        created_at: "2026-11-08T14:00:00.000Z",
      },
      {
        id: "dq-4",
        from: "founder",
        text: "Nhờ bộ pre-built connector cho MISA, Odoo và SAP B1, thời gian tích hợp trung bình hiện chỉ mất 36-48 giờ làm việc hoàn toàn tự động qua API ạ.",
        created_at: "2026-11-08T15:05:00.000Z",
      },
    ],
  },
];

const genId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function loadInvestmentRequests(): InvestmentRequest[] {
  if (typeof window === "undefined") return DEFAULT_INVESTMENT_REQUESTS;
  const raw = window.localStorage.getItem(INVESTMENT_REQUESTS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(INVESTMENT_REQUESTS_STORAGE_KEY, JSON.stringify(DEFAULT_INVESTMENT_REQUESTS));
    return DEFAULT_INVESTMENT_REQUESTS;
  }
  try {
    const parsed = JSON.parse(raw) as InvestmentRequest[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INVESTMENT_REQUESTS;
  } catch {
    return DEFAULT_INVESTMENT_REQUESTS;
  }
}

export function saveInvestmentRequests(items: InvestmentRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INVESTMENT_REQUESTS_STORAGE_KEY, JSON.stringify(items));
}

export function createInvestmentRequest(
  payload: Omit<InvestmentRequest, "id" | "status" | "created_at">
): InvestmentRequest {
  const next: InvestmentRequest = {
    id: genId("req"),
    ...payload,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  const all = loadInvestmentRequests();
  saveInvestmentRequests([next, ...all]);
  return next;
}

export function updateInvestmentRequestStatus(id: string, status: InvestmentRequestStatus) {
  const all = loadInvestmentRequests();
  const next = all.map((item) => (item.id === id ? { ...item, status } : item));
  saveInvestmentRequests(next);
  return next.find((item) => item.id === id);
}

export function getStartupRequests(startupIds: string[]) {
  const set = new Set(startupIds);
  return loadInvestmentRequests().filter((item) => set.has(item.startup_id));
}

export function getInvestorRequests(investorId: string) {
  const all = loadInvestmentRequests();
  const mine = all.filter((item) => item.investor_id === investorId);
  return mine.length > 0 ? mine : all;
}

export function loadDeals(): Deal[] {
  if (typeof window === "undefined") return DEFAULT_DEALS;
  const raw = window.localStorage.getItem(DEALS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(DEFAULT_DEALS));
    return DEFAULT_DEALS;
  }
  try {
    const parsed = JSON.parse(raw) as Deal[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEALS;
  } catch {
    return DEFAULT_DEALS;
  }
}

export function saveDeals(items: Deal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(items));
}

export function createDeal(payload: Omit<Deal, "id" | "created_at" | "status"> & { status?: Deal["status"] }) {
  const next: Deal = {
    id: genId("deal"),
    ...payload,
    status: payload.status ?? "active",
    created_at: new Date().toISOString(),
  };
  const all = loadDeals();
  saveDeals([next, ...all]);
  return next;
}

export function findDeal(startupId: string, investorId: string) {
  return loadDeals().find((item) => item.startup_id === startupId && item.investor_id === investorId && item.status === "active");
}

export function getDealsForInvestor(investorId: string) {
  const all = loadDeals();
  const mine = all.filter((item) => item.investor_id === investorId);
  return mine.length > 0 ? mine : all;
}

export function getDealsForStartup(startupIds: string[]) {
  const set = new Set(startupIds);
  return loadDeals().filter((item) => set.has(item.startup_id));
}

export function loadDealRooms(): DealRoomData[] {
  if (typeof window === "undefined") return DEFAULT_DEAL_ROOMS;
  const raw = window.localStorage.getItem(DEAL_ROOM_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(DEAL_ROOM_STORAGE_KEY, JSON.stringify(DEFAULT_DEAL_ROOMS));
    return DEFAULT_DEAL_ROOMS;
  }
  try {
    const parsed = JSON.parse(raw) as DealRoomData[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEAL_ROOMS;
  } catch {
    return DEFAULT_DEAL_ROOMS;
  }
}

export function saveDealRooms(items: DealRoomData[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEAL_ROOM_STORAGE_KEY, JSON.stringify(items));
}

export function getDealRoomById(dealId: string): DealRoomData {
  const all = loadDealRooms();
  const found = all.find((item) => item.deal_id === dealId);
  return (
    found ?? {
      deal_id: dealId,
      questions: [],
    }
  );
}

export function upsertDealRoom(room: DealRoomData) {
  const all = loadDealRooms();
  const next = [room, ...all.filter((item) => item.deal_id !== room.deal_id)];
  saveDealRooms(next);
}

export function addDealRoomQuestion(dealId: string, from: DealQuestion["from"], text: string) {
  const room = getDealRoomById(dealId);
  const question: DealQuestion = {
    id: genId("q"),
    from,
    text,
    created_at: new Date().toISOString(),
  };
  upsertDealRoom({
    ...room,
    questions: [...room.questions, question],
  });
  return question;
}
