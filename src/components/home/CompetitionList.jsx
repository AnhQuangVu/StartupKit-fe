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
      desc: "Cuộc thi công nghệ cho startup trẻ",
      date: "April 10–12, 2025",
      location: "Hà Nội",
    },
    {
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      title: "AI Challenge",
      desc: "Thử thách AI sáng tạo",
      date: "June 5–7, 2025",
      location: "TP. Hồ Chí Minh",
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      title: "Fintech Innovation",
      desc: "Đổi mới tài chính số",
      date: "August 20–22, 2025",
      location: "Đà Nẵng",
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
    <section className="max-w-4xl mx-auto mt-8 text-center px-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Các cuộc thi <span className="text-[#FFCE23]">Startup</span>
      </h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Khám phá cơ hội để trình bày ý tưởng đổi mới của bạn
      </p>
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch p-4 md:p-8 gap-4 md:gap-6 mx-auto max-w-3xl border-2 border-[#FFCE23] transition-all duration-500">
        {/* Left side */}
        <div className="flex-1 flex flex-col items-start justify-center text-left">
          <span className="text-[#FFCE23] font-semibold mb-2 flex items-center gap-2 text-xs md:text-base">
            <span className="w-2 h-2 rounded-full bg-[#FFCE23] inline-block" />{" "}
            Featured Competition
          </span>
          <h3 className="text-lg md:text-2xl font-bold mb-2">{comp.title}</h3>
          <div className="text-gray-500 mb-3 text-xs md:text-base">
            {comp.desc}
          </div>
          <div className="flex flex-col gap-2 mb-4 md:mb-6 text-gray-700 text-xs md:text-sm">
            <span>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-[#FFCE23]"
              />
              {comp.date}
            </span>
            <span>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-[#FFCE23]"
              />
              {comp.location}
            </span>
          </div>
          <button className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-bold px-4 py-2 md:px-6 rounded-lg shadow-md transition-all duration-200 text-xs md:text-base">
            Register Now
          </button>
        </div>
        {/* Right side */}
        <div className="flex-1 flex items-center justify-center mt-4 md:mt-0">
          <div className="w-full flex items-center justify-center">
            <img
              src={comp.img}
              alt={comp.title}
              className="rounded-xl object-cover w-full h-24 md:h-32 max-w-[220px] md:max-w-[260px]"
              style={{ background: "#FFCE23" }}
            />
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {competitions.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-[#FFCE23]" : "bg-gray-200"
            } cursor-pointer`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}
