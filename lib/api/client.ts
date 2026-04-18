const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("startupkit_token")
}

export interface ApiError {
  status: number
  message: string
}

export async function apiClient<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options?.headers as Record<string, string>) ?? {}),
    },
    ...options,
  })

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      message: await res.text().catch(() => res.statusText),
    }
    throw error
  }

  // 204 No Content
  if (res.status === 204) return undefined as T

  return res.json()
}

export function get<T>(path: string) {
  return apiClient<T>(path, { method: "GET" })
}

export function post<T>(path: string, body: unknown) {
  return apiClient<T>(path, { method: "POST", body: JSON.stringify(body) })
}

export function put<T>(path: string, body: unknown) {
  return apiClient<T>(path, { method: "PUT", body: JSON.stringify(body) })
}

export function patch<T>(path: string, body: unknown) {
  return apiClient<T>(path, { method: "PATCH", body: JSON.stringify(body) })
}

export function del<T>(path: string) {
  return apiClient<T>(path, { method: "DELETE" })
}
