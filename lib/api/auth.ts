import { post } from "./client"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  role: string
  userId: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  role: string
}

export function login(body: LoginRequest) {
  return post<LoginResponse>("/api/auth/login", body)
}

export function register(body: RegisterRequest) {
  return post<void>("/api/auth/register", body)
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("startupkit_token")
  }
}
