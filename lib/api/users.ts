import { get, post } from "./client"
import type { ApiResponse } from "./auth"

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  userType: "STARTUP" | "INVESTOR" | "MENTOR"
}

export interface RegisterResult {
  id: string
  email: string
}

// Profile types per role
export interface StartupProfile {
  userId: string
  userName: string
  roles: "STARTUP"
  location: string
  startupId: string
  industry: string
  description: string
  teamSize: number
  averageScore: number
  totalRatings: number
  totalCompletedSessions: number
  totalProjects: number
  project: { projectId: string; projectName: string; projectDescription: string }[]
}

export interface InvestorProfile {
  userId: string
  fullName: string
  role: string
  location: string
  organizationName: string
  bio: string
  investmentCriteria: string[]
  preferredStages: string[]
  investmentMin: number
  investmentMax: number
  linkedinUrl: string
  websiteUrl: string
  twitterUrl: string
  totalInvested: number
  portfolio: { startupId: string; startupName: string; industry: string }[]
}

export interface MentorProfile {
  userId: string
  fullName: string
  role: string
  location: string
  bio: string
  expertiseTags: string[]
  averageScore: number
  totalCompletedSessions: number
  totalRatings: number
  sessionReviews: { startupName: string; reviewContent: string; rating: number }[]
}

export type UserProfile = StartupProfile | InvestorProfile | MentorProfile

export function register(body: RegisterRequest) {
  return post<ApiResponse<RegisterResult>>("/v1/users", body)
}

export function getProfile() {
  return get<ApiResponse<UserProfile>>("/v1/users/profile")
}
