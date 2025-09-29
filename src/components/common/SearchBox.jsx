import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");

  return (
    <section className="max-w-4xl mx-auto mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 px-2">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
        Kết nối đúng người đúng cơ hội
      </h2>
      <p className="text-gray-500 text-center mb-4 md:mb-6 text-xs md:text-base">
        Khám phá mạng lưới startup, nhà đầu tư và mentor
      </p>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 text-xs md:text-sm"
        />
        <button
          className="flex items-center justify-center gap-2 bg-yellow-400 px-4 py-2 rounded-md font-bold text-xs md:text-sm"
          onClick={() => alert(`Tìm: ${keyword}`)}
        >
          <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
          <span className="hidden sm:inline">Tìm kiếm</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {["Tất cả", "Công nghệ", "Y tế", "Giáo dục", "AI"].map((tag) => (
          <button
            key={tag}
            className="border rounded-full px-4 py-2 text-xs text-gray-500 hover:bg-yellow-100"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
