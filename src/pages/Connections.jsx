import React from "react";

export default function Connections() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Tìm kiếm kết nối</h1>
        <p className="text-lg text-gray-700 mb-2">Chức năng đang được phát triển.</p>
        <p className="text-sm text-gray-400 mb-6">Vui lòng quay lại sau để sử dụng tính năng này.</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg" onClick={() => window.history.back()}>
          Quay lại
        </button>
      </div>
    </div>
  );
}
