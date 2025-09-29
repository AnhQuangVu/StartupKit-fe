import React, { useState } from "react";

export default function AiAssistantSidebar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "ai", text: "Xin chào! Tôi là trợ lý AI giúp bạn phân tích và gợi ý cho hồ sơ khởi nghiệp của bạn." },
    { type: "ai", text: "Để khởi tạo hồ sơ, vui lòng nhập các thông tin dự án, giải pháp, mô hình kinh doanh, v.v." }
  ]);
  const recentFeedback = [
    "Phân tích mô hình kinh doanh",
    "Gợi ý cải tiến sản phẩm",
    "Xem gợi ý"
  ];
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: "user", text: input }]);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-base font-bold mb-1">Trợ lý AI</h3>
        <div className="text-xs text-gray-600 mb-2">Tôi sẽ hỗ trợ bạn phân tích và đưa ra giải pháp cho hồ sơ khởi nghiệp.</div>
      </div>
      <div className="flex-1 bg-gray-50 rounded border border-gray-200 p-3 mb-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg text-xs ${msg.type === "ai" ? "bg-white text-gray-700 border border-gray-200" : "bg-yellow-400 text-white"}`}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Nhập ý kiến..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-4 py-2 rounded" onClick={handleSend}>
          Gửi
        </button>
      </div>
      <div className="text-xs text-gray-500 mb-1 font-semibold">Phản hồi gần đây:</div>
      <ul className="text-xs text-gray-600 mb-2">
        {recentFeedback.map((fb, idx) => (
          <li key={idx} className="mb-1">- {fb}</li>
        ))}
      </ul>
      <div className="text-xs text-blue-500 underline cursor-pointer">Xem gợi ý chi tiết</div>
    </div>
  );
}
