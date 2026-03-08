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

const genId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function loadInvestmentRequests(): InvestmentRequest[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(INVESTMENT_REQUESTS_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as InvestmentRequest[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
  return loadInvestmentRequests().filter((item) => item.investor_id === investorId);
}

export function loadDeals(): Deal[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(DEALS_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Deal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
  return loadDeals().filter((item) => item.investor_id === investorId);
}

export function getDealsForStartup(startupIds: string[]) {
  const set = new Set(startupIds);
  return loadDeals().filter((item) => set.has(item.startup_id));
}

export function loadDealRooms(): DealRoomData[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(DEAL_ROOM_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DealRoomData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
