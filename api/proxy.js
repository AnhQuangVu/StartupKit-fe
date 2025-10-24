export default async function handler(req, res) {
  const BACKEND_URL = process.env.PROXY_TARGET || 'http://160.191.243.253:8003';
  const target = BACKEND_URL + req.url.replace(/^\/api\/proxy/, '');

  try {
    console.log(`[PROXY] ${req.method} ${req.url} → ${target}`);
    console.log(`[PROXY] PROXY_TARGET=${process.env.PROXY_TARGET}`);
    
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        ...req.headers,
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    console.log(`[PROXY] Response: ${response.status}`);
    res.status(response.status).send(data);
  } catch (error) {
    console.error("[PROXY] Error:", error);
    res.status(500).json({ error: "Proxy request failed", message: error.message });
  }
}
