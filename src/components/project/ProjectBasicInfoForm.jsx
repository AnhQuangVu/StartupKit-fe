import React, { useState } from "react";

export default function ProjectBasicInfoForm({ onNext }) {
  const [form, setForm] = useState({
    name: "",
    field: "",
    stage: "",
    year: "",
    location: "",
    contact: ""
  });
  const [showProjectProfileModal, setShowProjectProfileModal] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-6 mb-6 w-full max-w-xl mx-auto">
        <div>
          <label className="block text-sm font-medium mb-2">Tên dự án</label>
          <input className="w-full border rounded px-4 py-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Tên dự án" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Lĩnh vực</label>
          <input className="w-full border rounded px-4 py-2" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })} placeholder="Lĩnh vực" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Giai đoạn</label>
          <input className="w-full border rounded px-4 py-2" value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })} placeholder="Giai đoạn" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Năm thành lập</label>
          <input className="w-full border rounded px-4 py-2" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Năm thành lập" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Trụ sở</label>
          <input className="w-full border rounded px-4 py-2" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Trụ sở" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Liên hệ</label>
          <input className="w-full border rounded px-4 py-2" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="Email/SĐT" />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold px-6 py-3 rounded" onClick={onNext}>
          Tiếp theo
        </button>
      </div>
    </div>
  );
}
