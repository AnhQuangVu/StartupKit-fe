import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

const blockTemplates = [
  { id: "info", label: "Thông tin dự án", content: "Nhập thông tin dự án..." },
  { id: "team", label: "Đội ngũ", content: "Thêm thành viên đội ngũ..." },
  { id: "market", label: "Thị trường", content: "Phân tích thị trường..." },
  { id: "solution", label: "Giải pháp", content: "Mô tả giải pháp..." },
];


function SortableItem({ id, label, content, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className="bg-white border rounded-lg shadow p-6 mb-4 cursor-grab"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <button className="text-xs text-blue-500 underline" onClick={onEdit}>Chỉnh sửa</button>
      </div>
      <div className="text-sm text-gray-600 whitespace-pre-line">{content}</div>
    </motion.div>
  );
}

export default CustomProjectBuilder;

  function CustomProjectBuilder() {
    // State cho các block động
    const [blocks, setBlocks] = useState([]);
    const [editIdx, setEditIdx] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [layout, setLayout] = useState("one-col");
    const layoutOptions = [
      { value: "one-col", label: "1 cột" },
      { value: "two-col", label: "2 cột" },
      { value: "three-col", label: "3 cột" },
      { value: "grid", label: "Lưới" },
    ];
  
    // Thông tin cơ bản cố định
    const [basicInfo, setBasicInfo] = useState({
      name: "Tên dự án",
      field: "Lĩnh vực",
      year: "Năm thành lập",
      location: "Trụ sở",
      contact: "Liên hệ"
    });
    const [editBasic, setEditBasic] = useState(false);
  
    // Thêm block mới
    const handleAddBlock = (template) => {
      if (!blocks.some(b => b.id === template.id)) {
        setBlocks([...blocks, { ...template }]);
      }
    };
  
    // Chỉnh sửa block
    const handleEditBlock = (idx) => {
      setEditIdx(idx);
      setEditContent(blocks[idx].content);
    };
  
    // Lưu chỉnh sửa block
    const handleSaveEdit = () => {
      const newBlocks = [...blocks];
      newBlocks[editIdx].content = editContent;
      setBlocks(newBlocks);
      setEditIdx(null);
    };
  
  // Render block thông tin cơ bản
  const renderBasicInfoBlock = () => (
    <motion.div
      layout
      className="bg-yellow-50 border border-yellow-300 rounded-lg shadow p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-yellow-700 text-lg">Thông tin cơ bản</span>
        <button className="text-xs text-blue-500 underline" onClick={() => setEditBasic(true)}>Chỉnh sửa</button>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div><span className="font-semibold">Tên dự án:</span> {basicInfo.name}</div>
        <div><span className="font-semibold">Lĩnh vực:</span> {basicInfo.field}</div>
        <div><span className="font-semibold">Năm thành lập:</span> {basicInfo.year}</div>
        <div><span className="font-semibold">Trụ sở:</span> {basicInfo.location}</div>
        <div><span className="font-semibold">Liên hệ:</span> {basicInfo.contact}</div>
      </div>
    </motion.div>
  );

  // Modal chỉnh sửa thông tin cơ bản
  const renderEditBasicModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Chỉnh sửa thông tin cơ bản</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="border rounded px-3 py-2" value={basicInfo.name} onChange={e => setBasicInfo({ ...basicInfo, name: e.target.value })} placeholder="Tên dự án" />
          <input className="border rounded px-3 py-2" value={basicInfo.field} onChange={e => setBasicInfo({ ...basicInfo, field: e.target.value })} placeholder="Lĩnh vực" />
          <input className="border rounded px-3 py-2" value={basicInfo.year} onChange={e => setBasicInfo({ ...basicInfo, year: e.target.value })} placeholder="Năm thành lập" />
          <input className="border rounded px-3 py-2" value={basicInfo.location} onChange={e => setBasicInfo({ ...basicInfo, location: e.target.value })} placeholder="Trụ sở" />
          <input className="border rounded px-3 py-2" value={basicInfo.contact} onChange={e => setBasicInfo({ ...basicInfo, contact: e.target.value })} placeholder="Liên hệ" />
        </div>
        <div className="flex gap-4 justify-end">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setEditBasic(false)}>Hủy</button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded" onClick={() => setEditBasic(false)}>Lưu</button>
        </div>
      </div>
    </div>
  );

  // Render blocks by layout
  const renderBlocks = () => {
    // Luôn render block thông tin cơ bản ở đầu
    const blockList = [renderBasicInfoBlock()];
    if (layout === "one-col") {
      blockList.push(
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={event => {
            const { active, over } = event;
            if (active.id !== over?.id) {
              const oldIndex = blocks.findIndex(b => b.id === active.id);
              const newIndex = blocks.findIndex(b => b.id === over.id);
              setBlocks(arrayMove(blocks, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            {blocks.map((block, idx) => (
              <SortableItem
                key={block.id}
                id={block.id}
                label={block.label}
                content={block.content}
                onEdit={() => handleEditBlock(idx)}
              />
            ))}
          </SortableContext>
        </DndContext>
      );
      return blockList;
    }
    if (layout === "two-col") {
      blockList.push(
        <div className="grid grid-cols-2 gap-6">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={event => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                const oldIndex = blocks.findIndex(b => b.id === active.id);
                const newIndex = blocks.findIndex(b => b.id === over.id);
                setBlocks(arrayMove(blocks, oldIndex, newIndex));
              }
            }}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block, idx) => (
                <SortableItem
                  key={block.id}
                  id={block.id}
                  label={block.label}
                  content={block.content}
                  onEdit={() => handleEditBlock(idx)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
      return blockList;
    }
    if (layout === "three-col") {
      blockList.push(
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={event => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                const oldIndex = blocks.findIndex(b => b.id === active.id);
                const newIndex = blocks.findIndex(b => b.id === over.id);
                setBlocks(arrayMove(blocks, oldIndex, newIndex));
              }
            }}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block, idx) => (
                <SortableItem
                  key={block.id}
                  id={block.id}
                  label={block.label}
                  content={block.content}
                  onEdit={() => handleEditBlock(idx)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
      return blockList;
    }
    if (layout === "grid") {
      blockList.push(
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={event => {
              const { active, over } = event;
              if (active.id !== over?.id) {
                const oldIndex = blocks.findIndex(b => b.id === active.id);
                const newIndex = blocks.findIndex(b => b.id === over.id);
                setBlocks(arrayMove(blocks, oldIndex, newIndex));
              }
            }}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block, idx) => (
                <SortableItem
                  key={block.id}
                  id={block.id}
                  label={block.label}
                  content={block.content}
                  onEdit={() => handleEditBlock(idx)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
      return blockList;
    }
    return blockList;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row py-10 px-4 gap-8">
      {/* Sidebar chọn block */}
      <div className="w-64 bg-white border rounded-lg shadow p-6 h-fit flex flex-col gap-4">
        <h3 className="text-lg font-bold text-yellow-500 mb-2">Thành phần hồ sơ</h3>
        {blockTemplates.map(template => (
          <button
            key={template.id}
            className="bg-yellow-100 hover:bg-yellow-400 text-yellow-700 hover:text-white font-semibold px-4 py-2 rounded mb-2 border border-yellow-300"
            onClick={() => handleAddBlock(template)}
          >
            + {template.label}
          </button>
        ))}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Chọn bố cục</h4>
          <div className="flex flex-col gap-2">
            {layoutOptions.map(opt => (
              <button
                key={opt.value}
                className={`px-3 py-2 rounded border text-sm font-semibold ${layout === opt.value ? "bg-yellow-400 text-white border-yellow-400" : "bg-white text-gray-700 border-gray-200"}`}
                onClick={() => setLayout(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Khu vực builder mô phỏng trang A4 */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <button
            className="bg-gray-100 hover:bg-yellow-400 text-yellow-500 hover:text-white px-4 py-2 rounded-lg border border-gray-300 font-semibold flex items-center gap-2"
            onClick={() => window.location.href = '/create-project'}
          >
            ← Quay lại tạo hồ sơ
          </button>
          <div></div>
        </div>
        <div className="flex justify-center">
          <div
            className="relative bg-white border border-gray-300 shadow-lg rounded-xl"
            style={{ width: "794px", height: "1123px", minWidth: "794px", minHeight: "1123px", maxWidth: "794px", maxHeight: "1123px", overflowY: "auto" }}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-dashed border-yellow-300 rounded-xl"></div>
            <div className="p-10 h-full overflow-y-auto">
              {renderBlocks()}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">Kích thước khung builder: A4 (794 x 1123 px)</div>
      </div>

      {/* Modal chỉnh sửa nội dung block */}
      {editIdx !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Chỉnh sửa nội dung</h3>
            <textarea
              className="w-full border rounded px-4 py-2 mb-4 min-h-[120px]"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
            <div className="flex gap-4 justify-end">
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setEditIdx(null)}>Hủy</button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded" onClick={handleSaveEdit}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa thông tin cơ bản */}
      {editBasic && renderEditBasicModal()}
    </div>
  );
}
