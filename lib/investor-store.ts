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

// Saved Deals Management
export function loadSavedDeals(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SAVED_DEALS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
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
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(MESSAGES_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
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
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(INVESTOR_PROFILE_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InvestorProfile;
  } catch {
    return null;
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
