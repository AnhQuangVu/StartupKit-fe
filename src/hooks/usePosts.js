// src/hooks/usePosts.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { listPosts, createPost as apiCreatePost, updatePost as apiUpdatePost, deletePost as apiDeletePost } from '../api/posts';

function mapPost(raw) {
  if (!raw) return null;
  const author = raw.author || {};
  return {
    id: raw.id,
    body: raw.body ?? raw.content ?? '',
    title: raw.title ?? '',
    author_id: raw.author_id ?? author.id ?? raw.user_id ?? null,
    author_name: author.full_name ?? raw.author_name ?? (raw.author_id ? `User ${raw.author_id}` : 'Người dùng'),
    avatar_url: author.avatar_url ?? raw.avatar_url ?? '',
    created_at: raw.created_at ?? raw.createdAt ?? new Date().toISOString(),
    media: raw.media || [],
    status: raw.status || 'published',
    _raw: raw,
  };
}

export function usePosts(projectId, { pageSize = 20 } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const abortRef = useRef(null);

  const reset = useCallback(() => {
    setItems([]);
    setError(null);
    setNextCursor(null);
    setHasMore(false);
  }, []);

  const loadInitial = useCallback(async () => {
    if (!projectId) return;
    // Cancel previous
    if (abortRef.current) {
      try { abortRef.current.abort(); } catch {}
    }
    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const { items: list, nextCursor: cursor } = await listPosts(projectId, { limit: pageSize });
      const mapped = list.map(mapPost).filter(Boolean);
      // Sort by created_at desc if backend doesn't
      mapped.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setItems(mapped);
      setNextCursor(cursor);
      setHasMore(Boolean(cursor));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [projectId, pageSize]);

  const loadMore = useCallback(async () => {
    if (!projectId || loadingMore || (!hasMore && nextCursor == null)) return;
    setLoadingMore(true);
    setError(null);
    try {
      const { items: list, nextCursor: cursor } = await listPosts(projectId, { limit: pageSize, cursor: nextCursor });
      const mapped = list.map(mapPost).filter(Boolean);
      setItems(prev => {
        const merged = [...prev, ...mapped];
        // De-duplicate by id
        const seen = new Set();
        return merged.filter(p => (p && !seen.has(p.id) && seen.add(p.id)));
      });
      setNextCursor(cursor);
      setHasMore(Boolean(cursor));
    } catch (e) {
      setError(e);
    } finally {
      setLoadingMore(false);
    }
  }, [projectId, pageSize, nextCursor, hasMore, loadingMore]);

  const refresh = useCallback(() => {
    return loadInitial();
  }, [loadInitial]);

  const createPost = useCallback(async (payload) => {
    // optimistic add
    const tempId = `temp-${Date.now()}`;
    const optimistic = mapPost({ id: tempId, ...payload, created_at: new Date().toISOString() });
    setItems(prev => [optimistic, ...prev]);
    try {
      const created = await apiCreatePost(projectId, payload);
      const mapped = mapPost(created);
      setItems(prev => prev.map(p => (p.id === tempId ? mapped : p)));
      return mapped;
    } catch (e) {
      // rollback
      setItems(prev => prev.filter(p => p.id !== tempId));
      throw e;
    }
  }, [projectId]);

  const updatePost = useCallback(async (postId, patch) => {
    const prevSnapshot = items;
    // optimistic patch
    setItems(prev => prev.map(p => (p.id === postId ? { ...p, ...patch } : p)));
    try {
      const updated = await apiUpdatePost(projectId, postId, patch);
      const mapped = mapPost(updated);
      setItems(prev => prev.map(p => (p.id === postId ? mapped : p)));
      return mapped;
    } catch (e) {
      // rollback
      setItems(prevSnapshot);
      throw e;
    }
  }, [projectId, items]);

  const deletePost = useCallback(async (postId) => {
    const prevSnapshot = items;
    // optimistic remove
    setItems(prev => prev.filter(p => p.id !== postId));
    try {
      await apiDeletePost(projectId, postId);
      return { ok: true };
    } catch (e) {
      setItems(prevSnapshot); // rollback
      throw e;
    }
  }, [projectId, items]);

  useEffect(() => {
    reset();
    if (projectId) loadInitial();
    // Cleanup on unmount/change
    return () => {
      if (abortRef.current) {
        try { abortRef.current.abort(); } catch {}
      }
    };
  }, [projectId, reset, loadInitial]);

  return {
    posts: items,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    createPost,
    updatePost,
    deletePost,
  };
}
