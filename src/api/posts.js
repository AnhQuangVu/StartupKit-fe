// src/api/posts.js
import { API_BASE, authHeaders, fetchWithTimeout } from '../config/api';

// Internal: get token from localStorage (kept consistent with other parts)
function getToken() {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('access_token') ||
    null
  );
}

function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.append(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function getErrorMessage(raw, fallback = 'Yêu cầu thất bại') {
  if (!raw) return fallback;
  if (typeof raw === 'string') return raw.slice(0, 200);
  if (raw.message) return raw.message;
  if (raw.detail) return typeof raw.detail === 'string' ? raw.detail : JSON.stringify(raw.detail).slice(0, 200);
  if (raw.errors) return Object.entries(raw.errors).map(([f, m]) => `${f}: ${m}`).join('; ').slice(0, 200);
  return JSON.stringify(raw).slice(0, 200);
}

export async function listPosts(projectId, { limit = 20, offset, cursor, sort = 'desc' } = {}) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const params = { limit, sort };
  if (offset !== undefined) params.offset = offset;
  if (cursor !== undefined) params.cursor = cursor;
  const url = `${API_BASE}/projects/${projectId}/posts${buildQuery(params)}`;

  try {
    const res = await fetchWithTimeout(url, {
      headers: authHeaders(token),
      timeout: 10000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Không tải được danh sách bài viết'));
    }
    // Allow both array and {items,nextCursor}
    if (Array.isArray(data)) {
      return { items: data, nextCursor: null };
    }
    return {
      items: data?.items || [],
      nextCursor: data?.nextCursor ?? null,
    };
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

export async function createPost(projectId, payload) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/${projectId}/posts`;
  try {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      timeout: 12000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Tạo bài đăng thất bại'));
    }
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

export async function updatePost(projectId, postId, patch) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/${projectId}/posts/${postId}`;
  try {
    const res = await fetchWithTimeout(url, {
      method: 'PATCH',
      headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
      timeout: 12000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Cập nhật bài đăng thất bại'));
    }
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

export async function deletePost(projectId, postId) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/${projectId}/posts/${postId}`;
  try {
    const res = await fetchWithTimeout(url, {
      method: 'DELETE',
      headers: authHeaders(token),
      timeout: 10000,
    });
    if (!res.ok) {
      const data = await parseJsonSafe(res);
      throw new Error(getErrorMessage(data, 'Xóa bài đăng thất bại'));
    }
    return { ok: true };
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

// New: Get single post detail (includes author)
export async function getPost(postId) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/posts/${postId}`;
  try {
    const res = await fetchWithTimeout(url, {
      headers: authHeaders(token),
      timeout: 10000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Không tải được bài viết'));
    }
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

// New: List comments tree for a post
export async function listPostComments(postId) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/posts/${postId}/comments`;
  try {
    const res = await fetchWithTimeout(url, {
      headers: authHeaders(token),
      timeout: 10000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Không tải được bình luận'));
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}

// New: Create a comment or reply
export async function createPostComment(postId, payload) {
  const token = getToken();
  if (!token) throw new Error('Bạn cần đăng nhập.');
  const url = `${API_BASE}/projects/posts/${postId}/comments`;
  try {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      timeout: 12000,
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      throw new Error(getErrorMessage(data, 'Tạo bình luận thất bại'));
    }
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') throw new Error('Máy chủ phản hồi quá lâu (timeout).');
    throw err;
  }
}
