import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export default function CompetitionList() {
  const competitions = [
    {
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      title: "Hackathon 2025",
      desc: "Cuộc thi lập trình, đổi mới sáng tạo dành cho startup trẻ.",
      date: "10–12/4/2025",
      location: "Hà Nội",
      registerLink: "https://example.com/hackathon-2025",
    },
    {
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      title: "Thử thách AI Việt Nam",
      desc: "Thi đấu trí tuệ nhân tạo, sáng tạo giải pháp thực tiễn.",
      date: "5–7/6/2025",
      location: "TP. Hồ Chí Minh",
      registerLink: "https://example.com/ai-challenge-2025",
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      title: "Đổi mới Fintech",
      desc: "Cuộc thi phát triển giải pháp tài chính số cho tương lai.",
      date: "20–22/8/2025",
      location: "Đà Nẵng",
      registerLink: "https://example.com/fintech-2025",
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      title: "Startup Pitch Night",
      desc: "Buổi trình bày ý tưởng trước nhà đầu tư và ban cố vấn.",
      date: "15/9/2025",
      location: "Hà Nội",
      registerLink: "https://example.com/pitchnight-2025",
    },
    {
      img: "https://images.unsplash.com/photo-1532619675605-efd93b0a1f0b?auto=format&fit=crop&w=400&q=80",
      title: "Demo Day Accelerator",
      desc: "Ngày trình diễn sản phẩm của các đội tăng tốc với cơ hội gọi vốn.",
      date: "30/11/2025",
      location: "TP. Hồ Chí Minh",
      registerLink: "https://example.com/demoday-2025",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Tự động chuyển slide mỗi 4 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % competitions.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, competitions.length]);

  const comp = competitions[current];

  return (
    <section className="max-w-4xl mx-auto mt-0 mb-0 text-center px-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Các cuộc thi <span className="text-[#FFCE23]">Startup</span>
      </h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Cơ hội tranh tài, trình bày ý tưởng và kết nối cộng đồng khởi nghiệp
      </p>
      <div className="bg-gradient-to-br from-[#fffbe6] to-[#fff] rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch p-4 md:p-8 gap-4 md:gap-6 mx-auto max-w-3xl border border-[#FFCE23] transition-all duration-500">
        {/* Thông tin cuộc thi */}
        <div className="flex-1 flex flex-col items-start justify-center text-left">
          <span className="text-[#FFCE23] font-semibold mb-2 flex items-center gap-2 text-xs md:text-base">
            <FontAwesomeIcon icon={faTrophy} className="mr-1" /> Cuộc thi nổi bật
          </span>
          <h3 className="text-lg md:text-2xl font-bold mb-2">{comp.title}</h3>
          <div className="text-gray-700 mb-3 text-xs md:text-base font-medium">
            {comp.desc}
          </div>
          <div className="flex flex-col gap-2 mb-4 md:mb-6 text-gray-700 text-xs md:text-sm">
            <span>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-[#FFCE23]"
              />
              <span className="font-semibold">Thời gian:</span> {comp.date}
            </span>
            <span>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-[#FFCE23]"
              />
              <span className="font-semibold">Địa điểm:</span> {comp.location}
            </span>
          </div>
          {comp.registerLink ? (
            <a href={comp.registerLink} target="_blank" rel="noopener noreferrer" className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-bold px-4 py-2 md:px-6 rounded-lg shadow-md transition-all duration-200 text-xs md:text-base inline-block">Đăng ký</a>
          ) : (
            <button className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-bold px-4 py-2 md:px-6 rounded-lg shadow-md transition-all duration-200 text-xs md:text-base">Đăng ký ngay</button>
          )}
        </div>
        {/* Ảnh minh họa */}
        <div className="flex-1 flex items-center justify-center mt-4 md:mt-0">
          <div className="w-full flex items-center justify-center">
            <img
              src={comp.img}
              alt={comp.title}
              className="rounded-xl object-cover w-full h-24 md:h-32 max-w-[220px] md:max-w-[260px] border-2 border-[#FFCE23] shadow"
              style={{ background: "#FFCE23" }}
            />
          </div>
        </div>
      </div>
      {/* Dots chuyển slide */}
      <div className="flex justify-center gap-2 mt-4">
        {competitions.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-[#FFCE23]" : "bg-gray-200"} cursor-pointer transition-all duration-200`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}
