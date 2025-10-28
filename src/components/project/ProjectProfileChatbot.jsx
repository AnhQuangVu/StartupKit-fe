import React, { useState, useRef, useEffect } from "react";
import { API_BASE, authHeaders } from "../../config/api";

export default function ProjectProfileChatbot({ form, onFillField }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! 🤖 Tôi là AI Assistant. Tôi có thể giúp bạn gợi ý điền các field, phân tích thị trường, tạo kế hoạch kinh doanh... Hỏi tôi gì đi!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const fieldMappings = {
    pain_point: ["vấn đề", "problem", "khó khăn", "challenge", "thách thức", "khách hàng gặp", "người dùng gặp", "gặp phải", "đau đớn"],
    solution: ["giải pháp", "solution", "cách giải quyết", "cách khắc phục", "làm sao", "như thế nào", "xử lý", "giải quyết"],
    product: ["sản phẩm", "product", "dịch vụ", "service", "tính năng", "feature", "ứng dụng", "app", "platform", "nền tảng"],
    targetCustomer: ["khách hàng", "customer", "đối tượng", "audience", "người dùng", "user", "market", "thị trường", "segment", "mục tiêu"],
    advantage: ["lợi thế", "advantage", "ưu điểm", "cạnh tranh", "competitive", "khác biệt", "unique", "đặc biệt", "tuyệt vời"],
    marketSize: ["thị trường", "market size", "quy mô", "scale", "ngành", "industry", "tiềm năng", "potential", "cơ hội"],
    businessModel: ["mô hình kinh doanh", "business model", "b2b", "b2c", "c2c", "subscription", "freemium", "cách kiếm tiền", "revenue"],
    finance: ["tài chính", "finance", "chi phí", "cost", "vốn", "investment", "funding", "budget", "ước tính", "estimate"],
    team: ["đội ngũ", "team", "thành viên", "member", "nhân sự", "resource", "kỹ năng", "skill", "người", "personnel"],
  };

  const detectField = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const [field, keywords] of Object.entries(fieldMappings)) {
      for (const keyword of keywords) {
        if (lowerInput.includes(keyword)) {
          return field;
        }
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    const detectedField = detectField(userInput);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      
      // Gọi endpoint /ai/chat thay vì /ai/rag/chat
      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          project_id: form?.id || null,
          use_google: true,
          conversation_history: messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Lỗi từ AI");
      }

      const data = await response.json();
      
      const botMessage = {
        sender: "bot",
        text: data.answer,
        sources: data.sources,
        detectedField,
      };
      
      setMessages((msgs) => [...msgs, botMessage]);

      if (detectedField) {
        setSuggestion({
          field: detectedField,
          value: data.answer,
          confidence: 0.85,
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: `❌ ${err.message}. Vui lòng thử lại hoặc hỏi câu khác!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (suggestion && onFillField) {
      onFillField(suggestion.field, suggestion.value);
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: `✅ Đã điền vào field "${suggestion.field}"!`,
        },
      ]);
    }
    setSuggestion(null);
  };

  const handleRejectSuggestion = () => {
    setSuggestion(null);
  };

  return (
    <div className="w-full flex flex-col h-full bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <p className="text-xs text-blue-100">Trợ lý thông minh cho dự án của bạn</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 animate-fadeIn ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Bot Avatar */}
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                🤖
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-medium rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              {msg.text}
              {msg.sources && (
                <div className="text-xs mt-2 opacity-70 italic text-gray-600 pt-2 border-t border-gray-200 border-opacity-50">
                  📚 Từ {msg.sources.documents?.length || 0} tài liệu
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm font-bold">
                👤
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fadeIn">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              🤖
            </div>
            <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none text-sm shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Box */}
      {suggestion && (
        <div className="mx-4 mb-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 shadow-md animate-slideUp">
          <div className="flex gap-2 items-start mb-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="font-semibold text-emerald-900 text-sm">Gợi ý cho bạn</p>
              <p className="text-xs text-emerald-700 mt-1">
                Điền vào field: <span className="font-bold bg-white px-2 py-1 rounded text-emerald-800">{suggestion.field}</span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-emerald-200 rounded-lg p-3 mb-3 max-h-24 overflow-y-auto">
            <p className="text-sm text-gray-700 italic text-justify">{suggestion.value}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAcceptSuggestion}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              ✅ Đồng ý
            </button>
            <button
              onClick={handleRejectSuggestion}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-2 px-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ❌ Bỏ qua
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
              placeholder="Hỏi AI gợi ý... (vd: gợi ý vấn đề khách hàng)"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
          </div>
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-gray-900 disabled:text-gray-600 font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:scale-100 flex-shrink-0"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <span className="flex gap-1 items-center">⏳</span>
            ) : (
              <span className="flex gap-1 items-center">Gửi →</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
