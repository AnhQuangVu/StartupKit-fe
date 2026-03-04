export default function CTASection() {
    return (
        <section className="py-24 bg-[#111111]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
                <p className="text-[13px] font-semibold text-[#F4B400] uppercase tracking-widest">
                    Ready to start?
                </p>
                <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.2] max-w-[600px]">
                    Join 500+ Vietnamese founders building globally
                </h2>
                <p className="text-[16px] text-[#888888] max-w-[440px] leading-[1.7]">
                    Start free. No credit card required. Get access to mentors, AI tools, and investor connections today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 bg-[#F4B400] text-[#111111] text-[16px] font-semibold px-8 py-4 rounded-[8px] hover:bg-yellow-400 transition-colors"
                    >
                        Create free account
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a
                        href="#mentors"
                        className="inline-flex items-center justify-center gap-2 border border-[#333333] text-white text-[16px] font-semibold px-8 py-4 rounded-[8px] hover:border-[#555555] transition-colors"
                    >
                        Become a Mentor
                    </a>
                </div>
            </div>
        </section>
    );
}
