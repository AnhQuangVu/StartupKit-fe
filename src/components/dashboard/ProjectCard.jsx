import React from "react";

export default function ProjectCard({ title, status, date, progress, tasks }) {
  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-300 shadow-sm p-4 w-full max-w-md md:max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className={`px-2 py-0.5 rounded-full font-bold ${
                status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {status}
            </span>
            <span>{date}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-bold mb-1">
          <span>Tiến độ</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-yellow-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <input type="checkbox" className="w-3 h-3 border rounded" />
            <span>{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
