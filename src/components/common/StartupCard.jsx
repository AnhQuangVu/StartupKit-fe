export default function StartupCard({ img, title, desc, tag, stage }) {
  return (
    <div className="bg-white border rounded-lg shadow p-2 md:p-4 w-full max-w-xs md:w-[200px] flex flex-col mx-auto">
      <img
        src={img}
        alt={title}
        className="w-full h-24 md:h-24 object-cover mb-2 rounded-md"
      />
      <h3 className="font-bold text-base md:text-sm mb-1 truncate">{title}</h3>
      <p className="text-gray-500 text-xs md:text-xs mb-2 truncate">{desc}</p>
      <div className="flex justify-between text-xs md:text-xs">
        <span className="bg-yellow-200 px-2 py-1 rounded-full truncate">{tag}</span>
        <span className="text-gray-500 truncate">{stage}</span>
      </div>
    </div>
  );
}
