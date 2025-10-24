// Simple forwarding proxy for Vercel serverless functions
// - Usage: deploy to Vercel, set env PROXY_TARGET (optional)
// - Request from browser: fetch('/api/proxy/projects', { method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type':'application/json'} })
// - This file is a catch-all route. It strips the /api/proxy prefix and forwards the remainder to PROXY_TARGET.

const DEFAULT_TARGET = process.env.PROXY_TARGET || process.env.VITE_API_BASE || 'https://160.191.243.253:8003';

export default async function handler(req, res) {
  try {
    // Build forward path: keep query string (req.url already contains it)
    const incoming = req.url || '';
    // Remove the leading /api/proxy prefix
    const prefix = '/api/proxy';
    let forwardPath = incoming.startsWith(prefix) ? incoming.slice(prefix.length) : incoming;
    if (!forwardPath.startsWith('/')) forwardPath = '/' + forwardPath;

    const target = `${DEFAULT_TARGET}${forwardPath}`;

    console.log(`[PROXY] ${req.method} ${incoming} → ${target}`);

    // Clone headers but remove hop-by-hop / host that shouldn't be forwarded
    const forwardHeaders = { ...req.headers };
    delete forwardHeaders.host;
    delete forwardHeaders.connection;
    delete forwardHeaders['x-vercel-ip-country'];

    // Read request body if present
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
      if (body && body.length === 0) body = undefined;
    }

    // Forward request to target
    const forwarded = await fetch(target, {
      method: req.method,
      headers: forwardHeaders,
      body,
      redirect: 'manual',
    });

    // Copy response headers (exclude hop-by-hop)
    forwarded.headers.forEach((value, name) => {
      if (name.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(name, value);
    });

    res.statusCode = forwarded.status;

    console.log(`[PROXY] Response: ${forwarded.status}`);

    // Stream response body back to client
    const arrayBuffer = await forwarded.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.end(buffer);
  } catch (err) {
    console.error('Proxy error:', err);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: String(err.message || err) }));
  }
}
