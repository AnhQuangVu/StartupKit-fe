import React, { useState } from "react";

export default function ProjectProfileChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần hỗ trợ gì về hồ sơ dự án?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    // Giả lập phản hồi bot
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "bot", text: "Cảm ơn bạn! Chức năng AI sẽ sớm hỗ trợ trả lời thông minh hơn." }]);
    }, 700);
    setInput("");
  };

  return (
    <div className="bg-white border rounded-xl shadow-lg p-4 w-full max-w-xs flex flex-col h-[400px]">
      <h3 className="font-bold text-yellow-600 mb-2 text-center">Chat hỗ trợ hồ sơ</h3>
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-yellow-100 text-gray-800' : 'bg-gray-100 text-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Nhập câu hỏi..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
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
