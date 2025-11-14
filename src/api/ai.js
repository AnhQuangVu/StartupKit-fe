import { API_BASE, fetchWithTimeout, authHeaders } from "../config/api";

/**
 * Gọi API Backend để sinh mô tả Startup Profile tự động bằng LLM
 * 
 * @param {Object} params
 * @param {string} [params.name] - Tên startup/dự án
 * @param {string} [params.industry] - Lĩnh vực
 * @param {string} [params.target_audience] - Đối tượng khách hàng
 * @param {string} [params.key_features] - Giải pháp/tính năng nổi bật
 * @param {string} [params.tone] - Phong cách văn phong
 * @param {string} [params.current_description] - Mô tả hiện tại
 * @param {string} [params.token] - Auth JWT token (nếu có)
 * @returns {Promise<{description: string, short_pitch: string, tagline: string, suggested_tags: string[]}>}
 */
export async function generateStartupDescription({
  name,
  industry,
  target_audience,
  key_features,
  tone,
  current_description,
  token,
}) {
  const url = `${API_BASE}/ai/generate-description`;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? authHeaders(token) : {}),
  };

  const body = JSON.stringify({
    name: name || undefined,
    industry: industry || undefined,
    target_audience: target_audience || undefined,
    key_features: key_features || undefined,
    tone: tone || "chuyên nghiệp, thu hút nhà đầu tư",
    current_description: current_description || undefined,
  });

  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers,
    body,
    timeout: 35000,
  });

  if (!response.ok) {
    let message = `Lỗi máy chủ (${response.status})`;
    try {
      const errJson = await response.json();
      message = errJson.detail || message;
    } catch {
      // fallback
    }
    throw new Error(message);
  }

  return await response.json();
}
