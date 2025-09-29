export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-12 md:py-20 bg-gradient-to-b from-[#FFCE23]/60 to-[#FFCE23]/10 border-b px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
        KHỞI ĐẦU Ý TƯỞNG CỦA BẠN
      </h1>
      <p className="text-gray-500 text-xs md:text-sm text-center max-w-xs md:max-w-md mb-4 md:mb-6">
        Từ cảm hứng đến thành công – chúng tôi đồng hành cùng bạn trên mọi chặng đường khởi nghiệp.
      </p>
      <button className="bg-[#FFCE23] hover:bg-[#FFD600] text-gray-900 font-bold px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base">
        Khám phá ngay
      </button>
    </section>
  );
}
