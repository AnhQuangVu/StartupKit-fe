import React, { useState, useRef, useEffect } from "react";
import { API_BASE } from "../../config/api";
import iconAI from "../../assets/images/iconAI.jpg";
import ReactMarkdown from "react-markdown";

export default function HomeOnlyChatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi là Creata (phiên bản công khai). Bạn muốn hỏi gì?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async (msgText) => {
        const text = msgText || input;
        if (!text.trim() || loading) return;

        setMessages((m) => [...m, { sender: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            const PUBLIC_AI_ENDPOINT = `${API_BASE}/ai/chat/public`;
            const response = await fetch(PUBLIC_AI_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                const err = await response.text().catch(() => "");
                throw new Error(err || `Lỗi ${response.status}`);
            }

            const data = await response.json().catch(() => ({}));
            const answer = data.answer || data.message || "Xin lỗi, tôi không có phản hồi.";

            setMessages((m) => [...m, { sender: "bot", text: answer }]);
        } catch (err) {
            setMessages((m) => [...m, { sender: "bot", text: `❌ Lỗi: ${err.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col h-full bg-white rounded-lg overflow-hidden">
            <div className="relative bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white px-4 py-3 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                        <img src={iconAI} alt="AI" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-bold">Creata — Trợ lý AI</div>
                    </div>
                </div>
            </div>

            <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {m.sender === "bot" && (
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 shadow">
                                <img src={iconAI} alt="AI" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${m.sender === "user" ? "bg-amber-500 text-white" : "bg-gray-50 text-gray-800"}`}>
                            {m.sender === "bot" ? (
                                <ReactMarkdown>{m.text}</ReactMarkdown>
                            ) : (
                                <div>{m.text}</div>
                            )}
                        </div>

                        {m.sender === "user" && (
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center ml-3 text-white shadow">👤</div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 shadow">
                            <img src={iconAI} alt="AI" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-50 px-4 py-2 rounded-2xl text-sm">Đang xử lý…</div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 border rounded-full px-4 py-2 text-sm"
                        placeholder="Hỏi AI (không cần đăng nhập)..."
                        disabled={loading}
                    />
                    <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="bg-amber-500 text-white px-4 py-2 rounded-full">
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}
