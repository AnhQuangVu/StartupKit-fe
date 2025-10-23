import React, { useState } from "react";

export default function ProjectProfileChatbot({ form }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần hỗ trợ gì về hồ sơ dự án?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    // Phản hồi bot theo nội dung nhập
    setTimeout(() => {
      const devKeywords = [
        "phát triển",
        "develop",
        "development",
        "dev",
        "quá trình phát triển",
        "đang phát triển",
      ];
      const lowerInput = input.toLowerCase();
      if (devKeywords.some((k) => lowerInput.includes(k))) {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "Bạn đang hỏi về quá trình phát triển. Hãy sử dụng chức năng AI sau khi hệ thống cập nhật để nhận tư vấn thông minh hơn nhé!",
          },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "Cảm ơn bạn! Chức năng AI sẽ sớm hỗ trợ trả lời thông minh hơn.",
          },
        ]);
      }
    }, 700);
    setInput("");
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
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
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Nhập câu hỏi..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-[#FFCE23] hover:bg-yellow-500 px-4 py-1 rounded font-semibold text-sm"
          onClick={handleSend}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
