export default function TaskItem({ text }) {
  return (
    <div className="flex items-center gap-2 ml-8 mb-1">
      <input type="checkbox" className="w-3 h-3 border rounded" />
      <span className="text-xs text-gray-700">{text}</span>
    </div>
  );
}
