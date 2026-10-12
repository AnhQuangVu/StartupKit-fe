import { post } from "./client"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ApiResponse<T> {
  code: number
  message: string | null
  result: T
}

export function getGoogleOAuthAuthorizeUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL?.trim()
  if (explicitUrl) return explicitUrl

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/+$/, "")
  const oauthPath = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_PATH?.trim() || "/oauth2/authorization/google"
  const normalizedPath = oauthPath.startsWith("/") ? oauthPath : `/${oauthPath}`

  return `${baseUrl}${normalizedPath}`
}

export function login(body: LoginRequest) {
  return post<ApiResponse<LoginResponse>>("/v1/auth/login", body)
}

export function forgotPassword(body: ForgotPasswordRequest) {
  return post<ApiResponse<string>>("/v1/auth/forgot-password", body)
}

export function refreshToken(body: RefreshTokenRequest) {
  return post<ApiResponse<LoginResponse>>("/v1/auth/refresh", body, { skipAuthRefresh: true })
}

export function resetPassword(body: ResetPasswordRequest) {
  return post<ApiResponse<string>>("/v1/auth/reset-password", body)
}
