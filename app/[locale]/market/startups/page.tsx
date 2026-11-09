"use client";

import { useDictionary } from "@/lib/dict-context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import StartupCard from "@/components/cards/StartupCard";
import { loadFounderProjects } from "@/lib/project-store";

const LOGO_COLORS: Record<string, string> = {
    s1: "#111111", // Coolmate (Black / Gold)
    s2: "#FF5722", // Dat Bike (Orange / Dark)
    s3: "#0F766E", // BuyMed / Thuocsi (Teal)
    s4: "#00B14F", // TopCV (Green)
    s5: "#3D6B35", // Kamereo (Fresh Green)
    s6: "#2563EB", // Selex Motors (Electric Blue)
    s7: "#7C3AED", // Gimo (Purple)
    s8: "#EA580C", // MindX (Orange Red)
    s9: "#854D0E", // Cricket One (Eco Earth)
    s10: "#0284C7", // ELSA Speak (Cyan Blue)
    s11: "#16A34A", // Finhay (Emerald)
    s12: "#2563EB", // Haravan (Blue)
};

const BASE_STARTUPS = [
    {
        id: "s1",
        name: "Coolmate",
        tagline: "Nền tảng mua sắm thời trang D2C ứng dụng công nghệ hàng đầu cho nam giới",
        description: "Thương hiệu thời trang nam ứng dụng công nghệ D2C đạt $26M ARR, hơn 1.5 triệu khách hàng và tốc độ tăng trưởng 120%/năm. Gọi vốn thành công từ Vertex Ventures & Kairous Capital.",
        industry: "E-commerce",
        stage: "Series B",
        score: 98,
        location: "Hà Nội",
        teamSize: "180 người",
        traction: "$26M ARR · 1.5M khách hàng",
        coverImage: "/images/startups/coolmate.jpg",
        founderName: "Phạm Chí Nhu",
        founderAvatar: "/images/founders/phamchinhu.jpg",
    },
    {
        id: "s2",
        name: "Dat Bike",
        tagline: "Xe máy điện công nghệ cao hiệu suất vượt trội thay thế xe xăng tại Đông Nam Á",
        description: "Hãng xe máy điện tiên phong do cựu kỹ sư phần mềm Thung lũng Silicon sáng lập. Tầm hoạt động 200km/lần sạc, sở hữu nhà máy sản xuất hiện đại và gọi vốn $15M+ từ Jungle Ventures & GSR Ventures.",
        industry: "CleanTech",
        stage: "Series B",
        score: 97,
        location: "TP. Hồ Chí Minh",
        teamSize: "220 người",
        traction: "$15M+ gọi vốn · 200km/lần sạc",
        coverImage: "/images/startups/datbike.jpg",
        founderName: "Nguyễn Bá Cảnh Sơn",
        founderAvatar: "/images/founders/nguyenbacanhson.jpg",
    },
    {
        id: "s3",
        name: "BuyMed (Thuocsi.vn)",
        tagline: "Sàn thương mại điện tử phân phối dược phẩm B2B minh bạch lớn nhất Việt Nam",
        description: "Nền tảng chuỗi cung ứng dược phẩm kết nối 35,000+ nhà thuốc và phòng khám với hơn 1,000 nhà sản xuất dược phẩm uy tín trên toàn quốc. Đã gọi vốn $51.5M Series B do Smilegate Investment dẫn dắt.",
        industry: "Healthtech",
        stage: "Series B",
        score: 98,
        location: "TP. Hồ Chí Minh",
        teamSize: "450 người",
        traction: "35k nhà thuốc · $51.5M Series B",
        coverImage: "/images/startups/buymed.jpg",
        founderName: "Hoàng Nguyễn",
        founderAvatar: "/images/founders/hoangnguyen.jpg",
    },
    {
        id: "s4",
        name: "TopCV Vietnam",
        tagline: "Hệ sinh thái nhân sự và nền tảng tuyển dụng thông minh ứng dụng AI số 1",
        description: "Hệ sinh thái HRTech hàng đầu Việt Nam với hơn 6 triệu người dùng và 200,000+ nhà tuyển dụng doanh nghiệp. Áp dụng AI Matching để kết nối nhân sự chất lượng cao và tối ưu quy trình phỏng vấn.",
        industry: "SaaS",
        stage: "Growth",
        score: 97,
        location: "Hà Nội",
        teamSize: "310 người",
        traction: "6M+ ứng viên · 200k nhà tuyển dụng",
        coverImage: "/images/startups/topcv.jpg",
        founderName: "Trần Trung Hiếu",
        founderAvatar: "/images/founders/trantrunghieu.png",
    },
    {
        id: "s5",
        name: "Kamereo",
        tagline: "Nền tảng cung ứng thực phẩm và nông sản B2B từ nông trại đến nhà hàng",
        description: "Chuỗi cung ứng thực phẩm B2B đầu tiên tại Việt Nam, phục vụ hơn 3,000 nhà hàng, khách sạn và siêu thị với 1,500+ SKU nông sản sạch từ Đà Lạt. Vừa khép lại vòng gọi vốn $5.2M Series A.",
        industry: "Agritech",
        stage: "Series A",
        score: 94,
        location: "TP. Hồ Chí Minh",
        teamSize: "135 người",
        traction: "3,000+ nhà hàng · $5.2M gọi vốn",
        coverImage: "/images/startups/kamereo.jpg",
        founderName: "Taku Tanaka",
        founderAvatar: "/images/founders/takutanaka.jpg",
    },
    {
        id: "s6",
        name: "Selex Motors",
        tagline: "Hệ sinh thái xe máy điện thông minh & trạm đổi pin tự động 2 phút cho logistics",
        description: "Giải pháp giao vận xanh toàn diện với trạm đổi pin thông minh độc quyền cho tài xế công nghệ (Grab, ShopeeFood, Lazada). Tiến sĩ Cơ khí ĐH Michigan sáng lập, được Touchstone & ADB đầu tư.",
        industry: "CleanTech",
        stage: "Series A",
        score: 96,
        location: "Hà Nội",
        teamSize: "115 người",
        traction: "80+ trạm đổi pin · 10M+ km xanh",
        coverImage: "/images/startups/selex.jpg",
        founderName: "TS. Nguyễn Hữu Phước Nguyên",
        founderAvatar: "/images/founders/nguyenhuuphuocnguyen.png",
    },
    {
        id: "s7",
        name: "Gimo",
        tagline: "Nền tảng nhận lương linh hoạt và an sinh tài chính cho người lao động",
        description: "Tiên phong giải pháp Earned Wage Access (EWA) tại Việt Nam, phục vụ hơn 500,000 công nhân tại 100+ nhà máy FDI lớn. Đã huy động thành công $17.1M Series A do TNB Aura dẫn dắt.",
        industry: "Fintech",
        stage: "Series A",
        score: 95,
        location: "Hà Nội",
        teamSize: "90 người",
        traction: "500k+ công nhân · $17.1M Series A",
        coverImage: "/images/startups/gimo.png",
        founderName: "Nguyễn Anh Quân",
        founderAvatar: "/images/founders/anhquan.jpg",
    },
    {
        id: "s8",
        name: "MindX Technology School",
        tagline: "Hệ sinh thái đào tạo công nghệ và lập trình quy mô hàng đầu Việt Nam",
        description: "Mạng lưới hơn 40 cơ sở đào tạo STEAM và kỹ sư công nghệ chuẩn quốc tế từ lứa tuổi K-12 đến đại học. Đã đào tạo 50,000+ học viên và gọi vốn $15M Series B từ quỹ Kaizenvest.",
        industry: "Edtech",
        stage: "Series B",
        score: 95,
        location: "Hà Nội",
        teamSize: "380 người",
        traction: "40+ cơ sở · 50k học viên tốt nghiệp",
        coverImage: "/images/startups/mindx.jpg",
        founderName: "Nguyễn Thị Thu Hà",
        founderAvatar: "/images/founders/thuha.jpg",
    },
    {
        id: "s9",
        name: "Cricket One",
        tagline: "Sản xuất protein bền vững từ dế đạt chứng nhận an toàn thực phẩm EFSA Châu Âu",
        description: "Nhà sản xuất đạm bền vững từ dế quy mô lớn nhất Đông Nam Á tại Bình Phước. Xuất khẩu sản phẩm nguyên liệu protein sang Châu Âu, Nhật Bản và Bắc Mỹ, đối tác của các tập đoàn thực phẩm toàn cầu.",
        industry: "Agritech",
        stage: "Series A",
        score: 93,
        location: "Bình Phước",
        teamSize: "65 người",
        traction: "Xuất khẩu 12 quốc gia · Chuẩn EFSA",
        coverImage: "/images/startups/cricketone.jpg",
        founderName: "Đặng Cao Nam",
        founderAvatar: "/images/founders/caonam.jpg",
    },
    {
        id: "s10",
        name: "ELSA Speak",
        tagline: "Ứng dụng gia sư AI luyện phát âm tiếng Anh chuẩn xác theo thời gian thực",
        description: "Ứng dụng nhận diện giọng nói AI độc quyền lọt Top 5 thế giới, phục vụ hơn 54 triệu người học tại 101 quốc gia. Gọi vốn $23M Series C từ quỹ đầu tư mạo hiểm UOB Venture Management.",
        industry: "Edtech",
        stage: "Series C",
        score: 98,
        location: "TP. Hồ Chí Minh",
        teamSize: "160 người",
        traction: "54M+ lượt tải · 101 quốc gia",
        coverImage: "/images/startups/elsa.jpg",
        founderName: "Văn Đinh Hồng Vũ",
        founderAvatar: "/images/founders/vandinhhongvu.jpg",
    },
    {
        id: "s11",
        name: "Finhay",
        tagline: "Nền tảng đầu tư và tích lũy tài chính cá nhân thông minh cho thế hệ trẻ",
        description: "Ứng dụng quản lý gia sản số 1 Việt Nam kết nối 2.7 triệu người dùng với các quỹ đầu tư tài chính và ngân hàng. Đã mua lại CTCK Vina Securities và huy động $25M Series B từ Insignia Ventures.",
        industry: "Fintech",
        stage: "Series B",
        score: 96,
        location: "Hà Nội",
        teamSize: "140 người",
        traction: "2.7M người dùng · $25M Series B",
        coverImage: "/images/startups/finhay.jpg",
        founderName: "Nghiêm Xuân Huy",
        founderAvatar: "/images/founders/nghiemxuanhuy.png",
    },
    {
        id: "s12",
        name: "Haravan",
        tagline: "Giải pháp quản lý bán hàng đa kênh (Omnichannel) toàn diện cho doanh nghiệp bán lẻ",
        description: "Nền tảng thương mại điện tử và bán hàng đa kênh phục vụ hơn 50,000 người kinh doanh và thương hiệu lớn tại Việt Nam. Đối tác chiến lược cao cấp chính thức của Google, Meta và TikTok.",
        industry: "SaaS",
        stage: "Growth",
        score: 97,
        location: "TP. Hồ Chí Minh",
        teamSize: "290 người",
        traction: "50,000+ thương hiệu · Đối tác Big Tech",
        coverImage: "/images/startups/haravan.jpg",
        founderName: "Huỳnh Lâm Hồ",
        founderAvatar: "/images/founders/huynhlamho.jpg",
    },
];

function Skeleton() {
    return (
        <div className="bg-white border border-[#EAEAEA] rounded-[12px] overflow-hidden animate-pulse flex flex-col">
            <div className="w-full bg-[#EBEBEB]" style={{ paddingTop: "56.25%" }} />
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#EBEBEB] rounded-full" />
                    <div className="h-3 bg-[#EBEBEB] rounded w-24" />
                </div>
                <div className="h-5 bg-[#EBEBEB] rounded w-3/4" />
                <div className="h-4 bg-[#EBEBEB] rounded w-full" />
                <div className="flex gap-2">
                    {[48, 64, 72].map(w => <div key={w} className="h-6 bg-[#EBEBEB] rounded-full" style={{ width: w }} />)}
                </div>
                <div className="h-10 bg-[#EBEBEB] rounded-[8px] w-full mt-4" />
            </div>
        </div>
    );
}

export default function StartupsDiscovery() {
    const dict = useDictionary();
    const { locale } = useParams() as { locale: Locale };

    const ALL_IND = dict.filters.allIndustries;
    const ALL_STG = dict.filters.allStages;
    const CATEGORIES = [ALL_IND, "Fintech", "Edtech", "Healthtech", "Agritech", "SaaS", "E-commerce", "Logistics", "CleanTech"];
    const STAGES = [ALL_STG, "Pre-seed", "Seed", "Series A", "Series B"];

    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState(() => ALL_IND);
    const [stage, setStage] = useState(() => ALL_STG);
    const [isLoading] = useState(false);
    const [startups, setStartups] = useState(BASE_STARTUPS);

    useEffect(() => {
        const custom = loadFounderProjects();
        const existingIds = new Set(BASE_STARTUPS.map(s => s.id));
        const extra = custom
            .filter(p => !existingIds.has(p.id) && p.basicInfo.startupName)
            .map(p => ({
                id: p.id,
                name: p.basicInfo.startupName,
                tagline: p.problemSolution.valueProposition || p.problemSolution.solution || "Innovative startup on StartupKit",
                description: p.product.description || p.problemSolution.solution || "",
                industry: p.basicInfo.industry || "SaaS",
                stage: p.funding.fundingStage || "Seed",
                score: p.score || 88,
                location: p.basicInfo.headquarters || "Việt Nam",
                teamSize: p.basicInfo.teamSize || "10 people",
                traction: p.business.monthlyRevenue || p.business.activeUsers || "Active",
                coverImage: p.product.screenshots || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
                founderName: p.basicInfo.founderName || "Founder",
                founderAvatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(p.id)}`,
            }));
        if (extra.length > 0) {
            setStartups([...extra, ...BASE_STARTUPS]);
        }
    }, []);

    const filtered = startups.filter(s => {
        const q = search.toLowerCase();
        return (
            (s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) &&
            (industry === ALL_IND || s.industry === industry) &&
            (stage === ALL_STG || s.stage === stage)
        );
    });

    const resetFilters = () => { setSearch(""); setIndustry(ALL_IND); setStage(ALL_STG); };
    const hasFilters = !!(search || industry !== ALL_IND || stage !== ALL_STG);

    return (
        <div className="pt-[72px] min-h-screen bg-[#F9F9F9]">
            <div className="bg-white border-b border-[#EAEAEA]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                    <p className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-2">{dict.nav.market}</p>
                    <h1 className="text-[38px] md:text-[48px] font-black text-[#111111] leading-tight mb-2">{dict.market.startups.title}</h1>
                    <p className="text-[15px] text-[#555555] max-w-[500px]">{dict.market.startups.sub}</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
                {/* Filter Card */}
                <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-6 mb-10 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={dict.filters.searchStartups}
                            className="w-full border border-[#EAEAEA] rounded-[10px] px-5 py-3 text-[14px] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 transition-all" />
                        <div className="flex flex-wrap gap-3">
                            {[{ value: industry, onChange: setIndustry, opts: CATEGORIES }, { value: stage, onChange: setStage, opts: STAGES }].map((f, i) => (
                                <select key={i} value={f.value} onChange={e => f.onChange(e.target.value)}
                                    className="border border-[#EAEAEA] bg-white rounded-[8px] px-4 py-2.5 text-[13px] font-medium outline-none focus:border-[#F4B400] text-[#111111] cursor-pointer hover:border-[#CCCCCC] transition-colors">
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            {hasFilters && <button onClick={resetFilters} className="text-[13px] font-semibold text-[#888888] hover:text-[#F4B400] px-4 py-2 transition-colors">✕ {dict.common.reset}</button>}
                        </div>
                    </div>
                </div>

                <p className="text-[14px] font-semibold text-[#888888] mb-8">{filtered.length} {dict.nav.startups} {dict.common.found}</p>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-24 text-center">
                        <div className="text-[56px] mb-6">🔍</div>
                        <h3 className="text-[20px] font-bold text-[#111111] mb-3">{dict.common.noResults}</h3>
                        <p className="text-[15px] text-[#888888] mb-8 max-w-[400px]">{dict.common.noResultsSub}</p>
                        <button onClick={resetFilters} className="bg-[#111111] text-white px-8 py-3 rounded-[10px] text-[14px] font-bold hover:bg-[#F4B400] hover:text-[#111111] transition-all hover:shadow-lg">{dict.common.resetFilters}</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(s => (
                            <StartupCard key={s.id} {...s} logoColor={LOGO_COLORS[s.id] ?? "#111111"} locale={locale} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
