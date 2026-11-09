"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import MentorCard from "@/components/cards/MentorCard";

const MENTORS = [
    { id: "m1", name: "Phạm Chí Nhu", title: "Co-founder & CEO · Coolmate", expertise: ["Go-to-Market", "Marketing", "Operations", "D2C"], score: 98, sessions: 165, rate: "$90/hr", bio: "Xây dựng Coolmate từ con số 0 đạt $26M ARR. Cố vấn chiến lược D2C, quản trị hàng tồn kho và gọi vốn Series A/B.", avatarSeed: "/images/mentors/phamchinhu.jpg" },
    { id: "m2", name: "Trần Trung Hiếu", title: "Founder & CEO · TopCV Vietnam", expertise: ["Product", "Tech", "SaaS", "Operations"], score: 97, sessions: 182, rate: "$95/hr", bio: "Hơn 10 năm xây dựng hệ sinh thái HRTech phục vụ 6M+ người dùng. Cố vấn chiến lược B2B SaaS, văn hóa doanh nghiệp và tuyển dụng nhân tài.", avatarSeed: "/images/mentors/trantrunghieu.png" },
    { id: "m3", name: "Lê Hàn Tuệ Lâm", title: "General Partner · Do Ventures", expertise: ["Finance", "Fundraising", "SaaS"], score: 98, sessions: 240, rate: "$120/hr", bio: "Thẩm định hơn 500+ hồ sơ công nghệ Đông Nam Á. Cố vấn định giá công ty, đàm phán Term Sheet và chiến lược gọi vốn quốc tế.", avatarSeed: "/images/mentors/lehantuelam.jpg" },
    { id: "m4", name: "Bùi Thành Đô", title: "Founding Partner & CEO · ThinkZone", expertise: ["Finance", "Go-to-Market", "Operations"], score: 96, sessions: 210, rate: "$110/hr", bio: "Kinh nghiệm 12+ năm đầu tư mạo hiểm và tăng tốc khởi nghiệp. Cố vấn thiết kế mô hình kinh doanh, chiến lược Go-to-Market và thẩm định chỉ số PMF.", avatarSeed: "/images/mentors/buithanhdo.png" },
    { id: "m5", name: "Nguyễn Bá Cảnh Sơn", title: "Founder & CEO · Dat Bike", expertise: ["Tech", "Operations", "CleanTech"], score: 96, sessions: 125, rate: "$100/hr", bio: "Cựu kỹ sư phần mềm Thung lũng Silicon. Cố vấn R&D sản phẩm phần cứng, quản trị chuỗi cung ứng linh kiện và mở rộng nhà máy sản xuất.", avatarSeed: "/images/mentors/nguyenbacanhson.jpg" },
    { id: "m6", name: "Văn Đinh Hồng Vũ", title: "Co-founder & CEO · ELSA Speak", expertise: ["Product", "AI/ML", "Go-to-Market", "Edtech"], score: 98, sessions: 145, rate: "$130/hr", bio: "Thạc sĩ MBA Stanford. Cố vấn chiến lược sản phẩm AI, mở rộng thị trường toàn cầu (US, Nhật, Đông Nam Á) và gọi vốn từ quỹ Tier 1.", avatarSeed: "/images/mentors/vandinhhongvu.jpg" },
    { id: "m7", name: "TS. Nguyễn Hữu Phước Nguyên", title: "Co-founder & CEO · Selex Motors", expertise: ["Tech", "Logistics", "Operations"], score: 95, sessions: 98, rate: "$85/hr", bio: "Tiến sĩ Cơ khí ĐH Michigan. Cố vấn nghiên cứu phát triển Deeptech, đăng ký bằng sáng chế và triển khai hợp tác với các tập đoàn logistics lớn.", avatarSeed: "/images/mentors/nguyenhuuphuocnguyen.png" },
    { id: "m8", name: "Taku Tanaka", title: "Founder & CEO · Kamereo", expertise: ["Operations", "Agritech", "Go-to-Market"], score: 94, sessions: 112, rate: "$80/hr", bio: "Cựu COO Pizza 4P's. Cố vấn tối ưu chuỗi cung ứng thực phẩm B2B, quản trị thu mua nông sản sạch và logistics chuỗi lạnh.", avatarSeed: "/images/mentors/takutanaka.jpg" },
    { id: "m9", name: "Nguyễn Anh Quân", title: "Co-founder & CEO · Gimo", expertise: ["Fintech", "Product", "Go-to-Market"], score: 95, sessions: 134, rate: "$85/hr", bio: "Xây dựng nền tảng EWA phục vụ 500k+ công nhân. Cố vấn mô hình Fintech B2B2C, tiếp cận khối nhà máy FDI và tuân thủ pháp lý tài chính.", avatarSeed: "/images/mentors/anhquan.jpg" },
    { id: "m10", name: "Huỳnh Lâm Hồ", title: "Co-founder & CEO · Haravan", expertise: ["SaaS", "Product", "Marketing", "Tech"], score: 97, sessions: 175, rate: "$95/hr", bio: "Hơn 12 năm kinh nghiệm dẫn dắt Haravan phục vụ 50,000+ thương hiệu bán lẻ. Cố vấn kiến trúc đa kênh Omnichannel và quan hệ đối tác Big Tech.", avatarSeed: "/images/mentors/huynhlamho.jpg" },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-6 animate-pulse">
            <div className="flex gap-4 mb-4"><div className="w-14 h-14 bg-[#EBEBEB] rounded-full" /><div className="flex-1 pt-1 space-y-2"><div className="h-4 bg-[#EBEBEB] rounded w-1/2" /><div className="h-3 bg-[#EBEBEB] rounded w-1/3" /></div></div>
            <div className="flex gap-2 mb-4">{[40, 52, 46].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}</div>
            <div className="space-y-1.5 mb-5"><div className="h-3 bg-[#EBEBEB] rounded w-full" /><div className="h-3 bg-[#EBEBEB] rounded w-4/5" /></div>
            <div className="h-9 bg-[#EBEBEB] rounded" />
        </div>
    );
}

export default function MentorMarketPage() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    const ALL_EXP = dict.filters.allExpertise;
    const ALL_IND = dict.filters.allIndustries;
    const ANY_SCR = dict.filters.anyScore;
    const EXPERTISE = [ALL_EXP, "Product", "Marketing", "Finance", "Tech", "Operations", "Legal", "Go-to-Market"];
    const INDUSTRIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS"];
    const SCORES = [ANY_SCR, dict.filters.scoreTop, dict.filters.scoreMid, dict.filters.scoreLow];

    const [search, setSearch] = useState("");
    const [expertise, setExpertise] = useState(() => ALL_EXP);
    const [industryF, setIndustryF] = useState(() => ALL_IND);
    const [scoreFilter, setScoreF] = useState(() => ANY_SCR);
    const [isLoading] = useState(false);

    const filtered = MENTORS.filter(m => {
        const q = search.toLowerCase();
        return (
            (m.name.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q) || m.expertise.some(e => e.toLowerCase().includes(q))) &&
            (expertise === ALL_EXP || m.expertise.includes(expertise)) &&
            (industryF === ALL_IND || m.expertise.some(e => e === industryF)) &&
            (scoreFilter === ANY_SCR
                || (scoreFilter === dict.filters.scoreTop && m.score >= 90)
                || (scoreFilter === dict.filters.scoreMid && m.score >= 80 && m.score < 90)
                || (scoreFilter === dict.filters.scoreLow && m.score < 80))
        );
    });

    const resetFilters = () => { setSearch(""); setExpertise(ALL_EXP); setIndustryF(ALL_IND); setScoreF(ANY_SCR); };
    const hasFilters = !!(search || expertise !== ALL_EXP || industryF !== ALL_IND || scoreFilter !== ANY_SCR);

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.mentors.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.mentors.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
                <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 mb-8">
                    <div className="flex flex-col gap-3">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.market.mentors.searchPlaceholder}
                            className="w-full border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-[#111111] transition-colors" />
                        <div className="flex flex-wrap gap-2">
                            {[{ value: expertise, onChange: setExpertise, opts: EXPERTISE }, { value: industryF, onChange: setIndustryF, opts: INDUSTRIES }, { value: scoreFilter, onChange: setScoreF, opts: SCORES }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-3 py-2 text-[13px] font-medium outline-none focus:border-[#111111] text-[#111111] cursor-pointer">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#111111] px-3 py-2">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[13px] text-[#888888] mb-5">{filtered.length} {dict.nav.mentors} {dict.card.available.toLowerCase()}</p>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <div className="text-[48px] mb-4">🔍</div>
                        <h3 className="text-[18px] font-bold text-[#111111] mb-2">{dict.common.noResults}</h3>
                        <p className="text-[14px] text-[#888888] mb-6">{dict.common.noResultsSub}</p>
                        <button onClick={resetFilters} className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors">{dict.common.resetFilters}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(m => <MentorCard key={m.id} {...m} locale={locale} />)}
                    </div>
                )}
            </div>
        </div>
    );
}
