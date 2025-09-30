import React from "react";

export default function MentorContactList() {
  const contacts = [
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h3 className="text-base font-bold mb-3">Các dự án đã contact</h3>
      <ul className="space-y-2">
        {contacts.map((c, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-gray-900">{c.name}</span>
              <span className="block text-xs text-gray-500">{c.desc}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${c.status === 'Đã phản hồi' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
