import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Hero() {
  const { isLoggedIn } = useAuth();
  const joinHref = isLoggedIn ? '/dashboard?tab=create-project' : '/dang-nhap';
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  // Quick theme switcher for Hero look & feel
  // Options: 'brand' (vàng sáng), 'dark' (tối hiện đại), 'clean' (trắng tối giản)
  const HERO_STYLE = 'dark';

  const bgStyle = (() => {
    if (HERO_STYLE === 'dark') {
      return {
        background:
          'radial-gradient(circle at 20% 30%, rgba(255,206,35,0.2) 0%, rgba(255,206,35,0) 45%), linear-gradient(120deg, #0F172A 0%, #1F2937 55%, #FFD44D 120%)',
        backgroundSize: '200% 200%',
      };
    }
    if (HERO_STYLE === 'clean') {
      return {
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8DC 100%)',
        backgroundSize: '200% 200%',
      };
    }
    return {
      background:
        'radial-gradient(circle at 50% 20%, rgba(255, 214, 64, 0.35) 0%, rgba(255, 214, 64, 0) 60%), linear-gradient(120deg, #FFE680 0%, #FFD44D 100%)',
      backgroundSize: '200% 200%'
    };
  })();

  const isDark = HERO_STYLE === 'dark';

  const onSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    navigate(`/kham-pha${params.toString() ? `?${params.toString()}` : ''}`);
  };
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-16 md:py-28 border-b px-3 relative overflow-hidden"
      aria-label="Hero Khởi nghiệp - Khởi đầu ý tưởng của bạn"
      style={bgStyle}
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
              <text x="16" y="20" textAnchor="middle" fontSize="20" fill={isDark ? '#FFFFFF' : '#FFC107'} opacity={isDark ? '0.08' : '0.45'}>+</text>
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#plusGrid)" />
        </svg>
      </div>
      {/* Nội dung Hero hiển thị trên grid */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <header className="w-full text-center mb-2 md:mb-4">
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="block">Pack idea,</span>
            <span className={`block ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>launch startup</span>
          </h1>
          <meta name="description" content="Pack idea, launch startup. Phóng ý tưởng hướng tương lai." />
        </header>
        <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-base md:text-xl font-medium text-center max-w-2xl mb-5 md:mb-7 leading-snug`}>
          Phóng ý tưởng hướng tương lai
        </p>

        {/* Inline Search in Hero */}
        <form onSubmit={onSearch} className="w-full max-w-2xl mb-5 px-3">
          <div className={`rounded-full border ${isDark ? 'border-gray-600 bg-white/95' : 'border-gray-200 bg-white'} shadow-sm focus-within:ring-2 focus-within:ring-amber-300 transition`}>
            <div className="flex items-center">
              <span className="pl-4 text-gray-400" aria-hidden="true">
                {/* Magnifier icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke={isDark ? '#475569' : '#9CA3AF'} strokeWidth="2" />
                  <path d="M20 20L16.65 16.65" stroke={isDark ? '#475569' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm kiếm startup, ngành, giai đoạn…"
                aria-label="Tìm kiếm"
                className={`flex-1 px-3 py-3.5 bg-transparent outline-none ${isDark ? 'text-gray-900 placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-500'}`}
              />
              <button
                type="submit"
                className="mr-1 my-1 px-5 py-2.5 rounded-full bg-[#FFCE23] text-black font-semibold hover:bg-yellow-400 shadow-sm"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
        <a
          href={joinHref}
          className={`font-bold px-5 py-3 md:px-7 md:py-3.5 rounded-lg text-base md:text-lg inline-flex items-center gap-2 shadow-md transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-[#FFCE23] text-black hover:bg-[#FFD600]'}`}
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
          <path fill={isDark ? '#FFFFFF' : '#FFCE23'} fillOpacity={isDark ? '0.12' : '0.35'} d="M0,0 C480,120 960,0 1440,120 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
