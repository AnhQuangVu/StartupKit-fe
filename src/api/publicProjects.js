import { API_BASE, fetchWithTimeout } from "../config/api";

// Build query string from params, supporting array params like industry[]
function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  const {
    q,
    industry, // string | string[]
    stage, // string | string[]
    sort,
    limit,
    cursor,
    facets,
  } = params;

  if (q) qs.set("q", q);

  const addArray = (key, value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach(v => qs.append(`${key}[]`, v));
    } else {
      qs.append(`${key}[]`, value);
    }
  };

  addArray("industry", industry);
  addArray("stage", stage);

  if (sort) qs.set("sort", sort);
  if (limit != null) qs.set("limit", String(limit));
  if (cursor) qs.set("cursor", cursor);
  if (facets) qs.set("facets", String(facets));

  return qs.toString();
}

// Normalize API response: handle array-only or object with items/nextCursor/facets
function normalizeResponse(json) {
  if (Array.isArray(json)) {
    return { items: json, nextCursor: null, facets: null, total: json.length };
  }
  if (json && typeof json === 'object') {
    const items = json.items || json.data || json.results || [];
    const nextCursor = json.nextCursor || json.next_cursor || json.cursor || null;
    const facets = json.facets || null;
    const total = json.total ?? items.length;
    return { items, nextCursor, facets, total };
  }
  return { items: [], nextCursor: null, facets: null, total: 0 };
}

// Search published projects with filters and optional cursor pagination
export async function searchPublishedProjects(params = {}, { signal } = {}) {
  const query = buildQuery(params);
  const url = `${API_BASE}/public/projects/published${query ? `?${query}` : ''}`;

  const res = await fetchWithTimeout(url, { method: 'GET', timeout: 15000, signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch failed ${res.status}: ${text || res.statusText}`);
  }
  const json = await res.json();
  return normalizeResponse(json);
}

export default { searchPublishedProjects };
