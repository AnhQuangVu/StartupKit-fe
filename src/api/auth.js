import { API_BASE, fetchWithTimeout } from '../config/api';

/**
 * Fetch public social auth configuration from backend
 */
export async function getSocialConfig() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/auth/social/config`, { timeout: 6000 });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn('Failed to load social config:', error);
    return null;
  }
}

/**
 * Authenticate or register using a social provider (Google or LinkedIn)
 * @param {Object} params
 * @param {'google' | 'linkedin'} params.provider
 * @param {string} [params.token] - OAuth access token or Google ID token
 * @param {string} [params.email]
 * @param {string} [params.full_name]
 * @param {string} [params.avatar_url]
 * @param {'founder' | 'investor' | 'mentor'} [params.role]
 */
export async function socialAuth({ provider, token, email, full_name, avatar_url, role = 'founder' }) {
  const payload = {
    provider,
    token: token || undefined,
    email: email ? email.trim() : undefined,
    full_name: full_name ? full_name.trim() : undefined,
    avatar_url: avatar_url || undefined,
    role,
  };

  const response = await fetchWithTimeout(`${API_BASE}/auth/social/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    timeout: 12000,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      data?.detail ||
      (Array.isArray(data?.detail) ? data.detail.map((d) => d.msg).join(', ') : null) ||
      `Đăng nhập với ${provider === 'google' ? 'Google' : 'LinkedIn'} thất bại. Vui lòng thử lại.`;
    throw new Error(errorMsg);
  }

  return data;
}

export default { getSocialConfig, socialAuth };
