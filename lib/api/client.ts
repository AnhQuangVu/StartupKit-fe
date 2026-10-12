const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
const ACCESS_TOKEN_KEY = "startupkit_token"
const REFRESH_TOKEN_KEY = "startupkit_refresh_token"
const ROLE_COOKIE_KEY = "startupkit_role"
const REFRESH_PATH = "/v1/auth/refresh"
const KNOWN_LOCALES = ["en", "vi"] as const

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

function setAccessToken(token: string) {
  if (typeof window === "undefined") return
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

function clearAuthState() {
  if (typeof window === "undefined") return
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  document.cookie = `${ROLE_COOKIE_KEY}=GUEST; path=/; max-age=2592000; SameSite=Lax`
  window.dispatchEvent(new Event("startupkit:auth-expired"))
}

function redirectToLoginIfProtectedRoute() {
  if (typeof window === "undefined") return
  const pathname = window.location.pathname
  const segments = pathname.split("/").filter(Boolean)
  const candidateLocale = segments[0]
  const locale = KNOWN_LOCALES.includes(candidateLocale as (typeof KNOWN_LOCALES)[number])
    ? candidateLocale
    : "vi"

  const isProtectedRoute = pathname.includes("/workspace")
  const isLoginRoute = pathname.endsWith("/login") || pathname.includes("/login/")
  if (!isProtectedRoute || isLoginRoute) return

  window.location.assign(`/${locale}/login`)
}

export interface ApiError {
  status: number
  message: string
}

export interface ApiRequestOptions extends RequestInit {
  skipAuthRefresh?: boolean
  _retry?: boolean
}

let refreshPromise: Promise<string | null> | null = null

function buildAlternateBaseUrl(baseUrl: string) {
  const trimmed = baseUrl.replace(/\/+$/, "")
  if (trimmed.endsWith("/api")) return trimmed.slice(0, -4)
  return `${trimmed}/api`
}

async function fetchWithBaseFallback(path: string, init: RequestInit) {
  const normalizedBase = BASE_URL.replace(/\/+$/, "")
  const firstResponse = await fetch(`${normalizedBase}${path}`, init)

  // Support both styles across environments:
  // - http://host/v1/*
  // - http://host/api/v1/*
  if (firstResponse.status !== 404 || !path.startsWith("/v1/")) {
    return firstResponse
  }

  const alternateBase = buildAlternateBaseUrl(normalizedBase)
  if (alternateBase === normalizedBase) return firstResponse

  return fetch(`${alternateBase}${path}`, init)
}

async function requestAccessTokenRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null

  const res = await fetch(`${BASE_URL}${REFRESH_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) return null

  type RefreshEnvelope = {
    result?: {
      accessToken?: string
      refreshToken?: string
    }
  }

  const data = (await res.json().catch(() => null)) as RefreshEnvelope | null
  const nextAccessToken = data?.result?.accessToken
  const nextRefreshToken = data?.result?.refreshToken
  if (!nextAccessToken) return null

  setAccessToken(nextAccessToken)
  if (nextRefreshToken && typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, nextRefreshToken)
  }

  return nextAccessToken
}

async function getRefreshedAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = requestAccessTokenRefresh()
      .catch(() => null)
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

async function parseApiError(res: Response): Promise<ApiError> {
  const fallback = res.statusText || "Request failed"
  const text = await res.text().catch(() => fallback)

  let message = text || fallback
  if (text) {
    try {
      const parsed = JSON.parse(text) as {
        message?: unknown
        error?: unknown
        result?: { message?: unknown }
      }

      const preferredMessage = parsed.message ?? parsed.error ?? parsed.result?.message
      if (typeof preferredMessage === "string" && preferredMessage.trim()) {
        message = preferredMessage
      }
    } catch {
      // Keep plain-text fallback.
    }
  }

  return {
    status: res.status,
    message,
  }
}

export async function apiClient<T>(
  path: string,
  options?: ApiRequestOptions
): Promise<T> {
  const token = getAuthToken()
  const { skipAuthRefresh = false, _retry = false, ...requestOptions } = options ?? {}

  const requestInit: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((requestOptions.headers as Record<string, string>) ?? {}),
    },
    ...requestOptions,
  }

  const res = await fetchWithBaseFallback(path, requestInit)

  if (res.status === 401 && !skipAuthRefresh && !_retry && path !== REFRESH_PATH) {
    const nextAccessToken = await getRefreshedAccessToken()
    if (nextAccessToken) {
      return apiClient<T>(path, {
        ...requestOptions,
        _retry: true,
      })
    }

    clearAuthState()
    redirectToLoginIfProtectedRoute()
  }

  if (!res.ok) {
    throw await parseApiError(res)
  }

  // 204 No Content
  if (res.status === 204) return undefined as T

  return res.json()
}

export function get<T>(path: string) {
  return apiClient<T>(path, { method: "GET" })
}

export function post<T>(path: string, body: unknown, options?: ApiRequestOptions) {
  return apiClient<T>(path, { method: "POST", body: JSON.stringify(body), ...options })
}

export function put<T>(path: string, body: unknown, options?: ApiRequestOptions) {
  return apiClient<T>(path, { method: "PUT", body: JSON.stringify(body), ...options })
}

export function patch<T>(path: string, body: unknown, options?: ApiRequestOptions) {
  return apiClient<T>(path, { method: "PATCH", body: JSON.stringify(body), ...options })
}

export function del<T>(path: string, options?: ApiRequestOptions) {
  return apiClient<T>(path, { method: "DELETE", ...options })
}
