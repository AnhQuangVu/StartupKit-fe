import React, { useState, useRef, useEffect } from "react";
import { API_BASE, authHeaders } from "../../config/api";
import iconAI from "../../assets/images/iconAI.jpg";

export default function ProjectProfileChatbot({ form, onFillField }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! 🤖 Tôi là Creata. Tôi có thể giúp bạn gợi ý điền các field, phân tích thị trường, tạo kế hoạch kinh doanh... Hỏi tôi gì đi!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    // Chỉ scroll trong container của chatbot, không ảnh hưởng trang
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const fieldMappings = {
    pain_point: [
      "vấn đề",
      "problem",
      "khó khăn",
      "challenge",
      "thách thức",
      "khách hàng gặp",
      "người dùng gặp",
      "gặp phải",
      "đau đớn",
    ],
    solution: [
      "giải pháp",
      "solution",
      "cách giải quyết",
      "cách khắc phục",
      "làm sao",
      "như thế nào",
      "xử lý",
      "giải quyết",
    ],
    product: [
      "sản phẩm",
      "product",
      "dịch vụ",
      "service",
      "tính năng",
      "feature",
      "ứng dụng",
      "app",
      "platform",
      "nền tảng",
    ],
    targetCustomer: [
      "khách hàng",
      "customer",
      "đối tượng",
      "audience",
      "người dùng",
      "user",
      "market",
      "thị trường",
      "segment",
      "mục tiêu",
    ],
    advantage: [
      "lợi thế",
      "advantage",
      "ưu điểm",
      "cạnh tranh",
      "competitive",
      "khác biệt",
      "unique",
      "đặc biệt",
      "tuyệt vời",
    ],
    marketSize: [
      "thị trường",
      "market size",
      "quy mô",
      "scale",
      "ngành",
      "industry",
      "tiềm năng",
      "potential",
      "cơ hội",
    ],
    businessModel: [
      "mô hình kinh doanh",
      "business model",
      "b2b",
      "b2c",
      "c2c",
      "subscription",
      "freemium",
      "cách kiếm tiền",
      "revenue",
    ],
    finance: [
      "tài chính",
      "finance",
      "chi phí",
      "cost",
      "vốn",
      "investment",
      "funding",
      "budget",
      "ước tính",
      "estimate",
    ],
    team: [
      "đội ngũ",
      "team",
      "thành viên",
      "member",
      "nhân sự",
      "resource",
      "kỹ năng",
      "skill",
      "người",
      "personnel",
    ],
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
      const token =
        localStorage.getItem("token") || localStorage.getItem("access_token");

      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          project_id: form?.id || null,
          use_google: true,
          max_length: 300,
          concise: true,
          conversation_history: messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
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
    <div className="w-full flex flex-col h-full bg-white rounded-lg overflow-hidden">
      {/* Header - Premium Design - Không border radius trên mobile */}
      <div className="relative bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white px-6 py-5 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg overflow-hidden">
            <img src={iconAI} alt="AI" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide">Trợ Lý Creata</h3>
            <p className="text-xs text-yellow-100 font-light">
              Gợi ý thông minh cho dự án
            </p>     
          </div>
        </div>
      </div>

      {/* Messages Area - Enhanced */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-slate-50 to-white"
        style={{
          scrollBehavior: "smooth",
          overflowAnchor: "none",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 animate-fadeIn ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Avatar */}
            {msg.sender === "bot" && (
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden border border-gray-100">
                <img
                  src={iconAI}
                  alt="AI"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-sm px-5 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-200 ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-tr-none shadow-lg"
                  : "bg-white text-gray-800 rounded-tl-none shadow-md border border-gray-100"
              }`}
            >
              <p className="text-base">{msg.text}</p>
              {msg.sources && (
                <div className="text-xs mt-3 opacity-70 italic text-gray-500 pt-2 border-t border-gray-200 border-opacity-30">
                  📚 {msg.sources.documents?.length || 0} tài liệu tham khảo
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.sender === "user" && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-lg flex-shrink-0 shadow-lg font-bold text-white">
                👤
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-4 animate-fadeIn">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden border border-gray-100">
              <img
                src={iconAI}
                alt="AI"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white border border-gray-100 text-gray-800 px-5 py-3 rounded-2xl rounded-tl-none text-sm shadow-md">
              <div className="flex gap-2 items-center">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce"></span>
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></span>
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Box - Premium */}
      {suggestion && (
        <div className="mx-5 mb-5 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5 shadow-xl animate-slideUp">
          <div className="flex gap-3 items-start mb-4">
            <span className="text-2xl mt-0.5">💡</span>
            <div className="flex-1">
              <p className="font-bold text-yellow-900 text-base">
                Gợi ý thông minh
              </p>
              <p className="text-xs text-yellow-700 mt-1 font-medium">
                Trường:{" "}
                <span className="inline-block bg-white px-3 py-1 rounded-lg text-yellow-700 font-bold mt-1">
                  {suggestion.field}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-yellow-100 rounded-xl p-4 mb-4 max-h-28 overflow-y-auto">
            <p className="text-sm text-gray-700 leading-relaxed">
              {suggestion.value}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAcceptSuggestion}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              ✅ Chấp nhận
            </button>
            <button
              onClick={handleRejectSuggestion}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ✕ Bỏ qua
            </button>
          </div>
        </div>
      )}

      {/* Input Area - Premium */}
      <div className="p-6 border-t border-gray-100 bg-white shadow-2xl">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 placeholder-gray-400 bg-gray-50 focus:bg-white"
              placeholder="Hỏi AI... (vd: gợi ý vấn đề, thị trường, đội ngũ)"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
          </div>
          <button
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 text-white disabled:text-gray-600 font-bold px-7 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 active:scale-95 flex-shrink-0"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <span className="flex gap-1 items-center">⏳</span>
            ) : (
              <span className="flex gap-1 items-center">↑</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
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
            scale: 0.95;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            scale: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
