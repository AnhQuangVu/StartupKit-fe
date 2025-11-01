import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faRocket } from '@fortawesome/free-solid-svg-icons';
import { API_BASE, authHeaders } from '../config/api';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-3 hover:scale-[1.02] transition-transform border border-gray-100">
      <div className="flex items-center gap-3">
        <img src={project.logo_url || project.logo?.url || '/default-logo.png'} alt="Logo" className="w-14 h-14 rounded-lg object-cover border" />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {project.name}
            {project.stage === 'launch' && <FontAwesomeIcon icon={faRocket} className="text-blue-500" title="Đã ra mắt" />}
          </h2>
          <div className="text-sm text-gray-500">{project.tagline}</div>
        </div>
      </div>
      <div className="text-gray-700 text-sm line-clamp-2">{project.description}</div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(project)} className="px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold flex items-center gap-1">
          <FontAwesomeIcon icon={faEdit} /> Sửa
        </button>
        <button onClick={() => onDelete(project)} className="px-3 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold flex items-center gap-1">
          <FontAwesomeIcon icon={faTrash} /> Xóa
        </button>
      </div>
    </div>
  );
}

function ProjectForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || { name: '', tagline: '', description: '', logo_url: '' });
  useEffect(() => { setForm(initial || { name: '', tagline: '', description: '', logo_url: '' }); }, [initial, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-7 w-full max-w-md relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h2 className="text-xl font-bold mb-4">{initial ? 'Sửa dự án' : 'Thêm dự án mới'}</h2>
        <div className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Tên dự án" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="w-full p-2 border rounded" placeholder="Tóm tắt ngắn" value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} />
          <textarea className="w-full p-2 border rounded" placeholder="Giới thiệu dự án" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
          <input className="w-full p-2 border rounded" placeholder="Logo URL" value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} />
        </div>
        <button onClick={() => onSave(form)} className="mt-5 w-full py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">{initial ? 'Cập nhật' : 'Thêm mới'}</button>
      </div>
    </div>
  );
}

export default function DienDan() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Lấy danh sách dự án của user
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/projects?limit=50`, { headers: authHeaders(token) });
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Thêm/sửa dự án
  const handleSave = async (form) => {
    const token = localStorage.getItem('token');
    const method = editProject ? 'PATCH' : 'POST';
    const url = editProject ? `${API_BASE}/projects/${editProject.id}` : `${API_BASE}/projects`;
    const res = await fetch(url, {
      method,
      headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setShowForm(false);
      setEditProject(null);
      // Reload
      const updated = await fetch(`${API_BASE}/projects?limit=50`, { headers: authHeaders(token) });
      setProjects(await updated.json());
    }
  };

  // Xóa dự án
  const handleDelete = async () => {
    if (!deleteProject) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE}/projects/${deleteProject.id}`, { method: 'DELETE', headers: authHeaders(token) });
    setConfirmDelete(false);
    setDeleteProject(null);
    // Reload
    const updated = await fetch(`${API_BASE}/projects?limit=50`, { headers: authHeaders(token) });
    setProjects(await updated.json());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-black drop-shadow">Quản lý hồ sơ dự án của bạn</h1>
          <button onClick={() => { setShowForm(true); setEditProject(null); }} className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base shadow flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} /> Thêm dự án
          </button>
        </div>
        {loading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">Đang tải danh sách dự án...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">Bạn chưa có dự án nào.</div>
            ) : (
              projects.map(p => (
                <ProjectCard key={p.id} project={p} onEdit={proj => { setEditProject(proj); setShowForm(true); }} onDelete={proj => { setDeleteProject(proj); setConfirmDelete(true); }} />
              ))
            )}
          </div>
        )}
      </main>
      <ProjectForm open={showForm} onClose={() => { setShowForm(false); setEditProject(null); }} onSave={handleSave} initial={editProject} />
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-7 w-full max-w-sm animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-red-600">Xác nhận xóa dự án</h2>
            <div className="mb-5 text-gray-700">Bạn có chắc chắn muốn xóa dự án <span className="font-semibold">{deleteProject?.name}</span> không?</div>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold">Xóa</button>
              <button onClick={() => { setConfirmDelete(false); setDeleteProject(null); }} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold">Hủy</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}