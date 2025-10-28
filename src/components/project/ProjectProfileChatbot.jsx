import React, { useState } from "react";
import { API_BASE, authHeaders } from "../../config/api";

export default function ProjectProfileChatbot({ form, onFillField }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! 🤖 Tôi là AI Assistant. Tôi có thể giúp bạn gợi ý điền các field, phân tích thị trường, tạo kế hoạch kinh doanh... Hỏi tôi gì đi!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null); // Để hiển thị suggestion popup

  // Mapping từ keywords → field names
  const fieldMappings = {
    pain_point: [
      "vấn đề", "problem", "khó khăn", "challenge", "thách thức",
      "khách hàng gặp", "người dùng gặp", "gặp phải", "đau đớn",
    ],
    solution: [
      "giải pháp", "solution", "cách giải quyết", "cách khắc phục",
      "làm sao", "như thế nào", "xử lý", "giải quyết",
    ],
    product: [
      "sản phẩm", "product", "dịch vụ", "service", "tính năng",
      "feature", "ứng dụng", "app", "platform", "nền tảng",
    ],
    targetCustomer: [
      "khách hàng", "customer", "đối tượng", "audience", "người dùng",
      "user", "market", "thị trường", "segment", "mục tiêu",
    ],
    advantage: [
      "lợi thế", "advantage", "ưu điểm", "cạnh tranh", "competitive",
      "khác biệt", "unique", "đặc biệt", "tuyệt vời",
    ],
    marketSize: [
      "thị trường", "market size", "quy mô", "scale", "ngành",
      "industry", "tiềm năng", "potential", "cơ hội",
    ],
    businessModel: [
      "mô hình kinh doanh", "business model", "b2b", "b2c", "c2c",
      "subscription", "freemium", "cách kiếm tiền", "revenue",
    ],
    finance: [
      "tài chính", "finance", "chi phí", "cost", "vốn", "investment",
      "funding", "budget", "ước tính", "estimate",
    ],
    team: [
      "đội ngũ", "team", "thành viên", "member", "nhân sự",
      "resource", "kỹ năng", "skill", "người", "personnel",
    ],
  };

  // Detect field từ câu hỏi
  const detectField = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    for (const [field, keywords] of Object.entries(fieldMappings)) {
      for (const keyword of keywords) {
        if (lowerInput.includes(keyword)) {
          return field;
        }
      }
    }
    
    return null; // Không detect được field nào
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    // Detect field từ câu hỏi
    const detectedField = detectField(userInput);

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      
      const response = await fetch(`https://160.191.243.253:8003/ai/rag/chat`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          project_context: form,
          use_google: true,
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
        detectedField, // Lưu field được detect
      };
      
      setMessages((msgs) => [...msgs, botMessage]);

      // Nếu detect được field, hiển thị suggestion popup
      if (detectedField) {
        setSuggestion({
          field: detectedField,
          value: data.answer, // Dùng AI answer làm giá trị
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
    <div className="w-full flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-yellow-100 text-gray-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
              {msg.sources && (
                <div className="text-xs mt-1 opacity-70 italic">
                  📚 Từ {msg.sources.document_count || 0} tài liệu
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
              <span className="inline-block">⏳ Đang suy nghĩ...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Popup */}
      {suggestion && (
        <div className="p-3 bg-blue-50 border-t border-blue-200">
          <p className="text-xs text-gray-600 mb-2">
            💡 <strong>Gợi ý:</strong> Điền vào <span className="font-semibold text-blue-700">{suggestion.field}</span>?
          </p>
          <p className="text-xs bg-white p-2 rounded mb-2 italic text-gray-700 max-h-20 overflow-y-auto">
            "{suggestion.value}"
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAcceptSuggestion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-2 rounded transition-all"
            >
              ✅ Điền
            </button>
            <button
              onClick={handleRejectSuggestion}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-semibold py-1 px-2 rounded transition-all"
            >
              ❌ Bỏ qua
            </button>
          </div>
        </div>
      )}

      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Hỏi AI gợi ý... (vd: gợi ý vấn đề khách hàng)"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          className="bg-[#FFCE23] hover:bg-yellow-500 disabled:opacity-50 px-4 py-1 rounded font-semibold text-sm transition-all"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          {loading ? "⏳" : "Gửi"}
        </button>
      </div>
    </div>
  );
}
