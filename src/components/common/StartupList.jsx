import { useState, useEffect } from "react";
import StartupCard from "./StartupCard";

export default function StartupList() {
  const startups = [
    {
      img: "https://logo.clearbit.com/stripe.com",
      title: "TechFlow",
      desc: "Tự động hóa quy trình bằng AI",
      tag: "SaaS",
      stage: "Series A",
    },
    {
      img: "https://logo.clearbit.com/wise.com",
      title: "FinanceHub",
      desc: "Giải pháp tài chính thông minh",
      tag: "Fintech",
      stage: "Seed",
    },
    {
      img: "https://logo.clearbit.com/khanacademy.org",
      title: "EduSpace",
      desc: "Nền tảng học trực tuyến",
      tag: "Edtech",
      stage: "Pre-seed",
    },
    {
      img: "https://logo.clearbit.com/healthline.com",
      title: "HealthPlus",
      desc: "Giải pháp y tế số",
      tag: "Healthtech",
      stage: "Series B",
    },
    {
      img: "https://logo.clearbit.com/tesla.com",
      title: "GreenTech",
      desc: "Khởi nghiệp năng lượng xanh",
      tag: "Energy",
      stage: "Seed",
    },
    {
      img: "https://logo.clearbit.com/airbnb.com",
      title: "StayConnect",
      desc: "Nền tảng kết nối chỗ ở toàn cầu",
      tag: "Travel",
      stage: "Series A",
    },
    {
      img: "https://logo.clearbit.com/duolingo.com",
      title: "LinguaPro",
      desc: "Ứng dụng học ngôn ngữ thông minh",
      tag: "Edtech",
      stage: "Seed",
    },
    {
      img: "https://logo.clearbit.com/robinhood.com",
      title: "Investly",
      desc: "Đầu tư dễ dàng cho mọi người",
      tag: "Fintech",
      stage: "Series B",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % startups.length);
    }, 3000); // đổi thời gian nếu muốn nhanh/chậm hơn
    return () => clearTimeout(timer);
  }, [startIndex, startups.length]);

  // Lấy 5 startup liên tiếp, nếu vượt quá thì quay lại đầu
  const visibleStartups = Array.from({ length: 5 }, (_, i) => {
    return startups[(startIndex + i) % startups.length];
  });

  return (
    <section className="max-w-5xl mx-auto mt-16 text-center px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Các Startup Nổi Bật</h2>
      <p className="text-gray-500 mb-8 text-xs md:text-base">
        Khám phá những công ty sáng tạo đang tìm kiếm đối tác và cơ hội phát triển
      </p>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6 justify-center pb-4">
        {visibleStartups.map((s, i) => (
          <div key={i + startIndex} className="flex-shrink-0">
            <StartupCard {...s} />
          </div>
        ))}
      </div>
    </section>
  );
}
