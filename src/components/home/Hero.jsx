export default function Hero() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-10 md:py-16 border-b px-3 relative animate-hero-bg"
      aria-label="Hero Khởi nghiệp - Khởi đầu ý tưởng của bạn"
      style={{
        background: 'linear-gradient(120deg, #FFCE23 0%, #FFF9E0 100%)',
        backgroundSize: '200% 200%',
        animation: 'heroGradientMove 6s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes heroGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
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
      {/* SVG wave cong xuống ở đáy Hero */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-28" style={{ transform: 'translateX(-120px)' }}>
          <path fill="#FFCE23" fillOpacity="0.25" d="M0,0 C480,120 960,0 1440,120 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
