export default function Hero() {
  return (
    <section
  className="w-full flex flex-col items-center justify-center py-20 md:py-32 border-b px-3 relative overflow-hidden"
      aria-label="Hero Khởi nghiệp - Khởi đầu ý tưởng của bạn"
      style={{
        background: 'linear-gradient(120deg, #FFCE23 0%, #FFF9E0 100%)',
        backgroundSize: '200% 200%'
      }}
    >
      {/* SVG grid dấu cộng lặp lại làm nền Hero */}
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 400"
          width="100%"
          height="100%"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <pattern id="plusGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <text x="16" y="20" textAnchor="middle" fontSize="20" fill="#FFB300" opacity="0.55">+</text>
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#plusGrid)" />
        </svg>
      </div>
      {/* Nội dung Hero hiển thị trên grid */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
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
          className="bg-[#FFCE23] hover:bg-[#FFD600] text-black font-bold px-5 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg inline-flex items-center gap-2 shadow-lg border-2 border-white drop-shadow-[0_2px_8px_rgba(255,206,35,0.5)] transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
          aria-label="Tham gia ngay"
        >
          Tham gia ngay
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5 10h10M13 7l2 3-2 3" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      {/* SVG wave cong xuống ở đáy Hero */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-28" style={{ transform: 'translateX(-120px)' }}>
          <path fill="#FFCE23" fillOpacity="0.25" d="M0,0 C480,120 960,0 1440,120 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
