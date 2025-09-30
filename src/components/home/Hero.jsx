export default function Hero() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-10 md:py-16 bg-gradient-to-b from-[#FFCE23]/60 to-[#FFCE23]/10 border-b px-3"
      aria-label="Hero Khởi nghiệp - Khởi đầu ý tưởng của bạn"
    >
      <header className="w-full text-center mb-3 md:mb-5">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          KHỞI ĐẦU Ý TƯỞNG CỦA BẠN
        </h1>
        <meta name="description" content="Từ cảm hứng đến thành công – chúng tôi đồng hành cùng bạn trên mọi chặng đường khởi nghiệp." />
      </header>
      <p className="text-gray-500 text-sm md:text-base text-center max-w-lg mb-3 md:mb-5">
        Từ cảm hứng đến thành công – chúng tôi đồng hành cùng bạn trên mọi chặng đường khởi nghiệp.
      </p>
      <a
        href="/dashboard?tab=create-project"
        className="bg-[#FFCE23] hover:bg-[#FFD600] text-gray-900 font-bold px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base inline-block"
        aria-label="Tạo dự án ngay"
      >
        Tạo dự án ngay
      </a>
    </section>
  );
}
