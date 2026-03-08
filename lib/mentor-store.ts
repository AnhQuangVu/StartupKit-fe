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

// Sessions Management
export function loadMentorSessions(): MentorSession[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SESSIONS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MentorSession[];
  } catch {
    return [];
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
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MentorRequest[];
  } catch {
    return [];
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

// Profile Management
export function loadMentorProfile(): MentorProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(MENTOR_PROFILE_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MentorProfile;
  } catch {
    return null;
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
