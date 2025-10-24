export default async function handler(req, res) {
  const target = "http://160.191.243.253:8003" + req.url.replace(/^\/api\/proxy/, '');

  try {
    console.log(`[PROXY] ${req.method} ${req.url} → ${target}`);
    
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
