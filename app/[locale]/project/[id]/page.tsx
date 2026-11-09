"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import AIScoreBadge from "@/components/ui/AIScoreBadge";

const PROJECTS: Record<string, {
    name: string; founder: string; industry: string; stage: string;
    score: number; location: string; teamSize: string; coverSeed: string; logoColor: string;
    coverImage?: string;
    tagline: string; description: string; vision: string;
    problem: string; solution: string; market: string; traction: string;
    team: { name: string; role: string; bg: string; avatarSeed: string }[];
    reviews: { mentor: string; score: number; comment: string; seed: string }[];
}> = {
    s1: {
        name: "Coolmate", founder: "Phạm Chí Nhu", industry: "E-commerce", stage: "Series B",
        score: 98, location: "Hà Nội", teamSize: "180 people", coverSeed: "/images/startups/coolmate.jpg", logoColor: "#111111",
        coverImage: "/images/startups/coolmate.jpg",
        tagline: "Nền tảng mua sắm thời trang D2C ứng dụng công nghệ hàng đầu cho nam giới.",
        description: "Coolmate tiên phong mô hình thời trang D2C ứng dụng công nghệ tại Việt Nam, cung cấp tủ đồ cơ bản chất lượng cao, dịch vụ đổi trả 60 ngày miễn phí và trải nghiệm mua sắm trực tuyến vượt trội.",
        vision: "Trở thành thương hiệu thời trang công nghệ bền vững đại diện cho Việt Nam vươn ra khu vực Đông Nam Á.",
        problem: "Nam giới Việt Nam gặp khó khăn khi tìm kiếm trang phục cơ bản chất lượng tốt với giá hợp lý; các chuỗi bán lẻ truyền thống đội chi phí mặt bằng và trung gian lên tới 60%.",
        solution: "Mô hình D2C cắt bỏ toàn bộ khâu trung gian, ứng dụng hệ thống quản trị dữ liệu chuỗi cung ứng ERP tự động và dịch vụ khách hàng 100% hài lòng.",
        market: "Thị trường thời trang Việt Nam đạt quy mô $6.5 tỷ, trong đó phân khúc trực tuyến tăng trưởng hơn 25%/năm.",
        traction: "$26M ARR, hơn 1.5 triệu khách hàng thân thiết, tỷ lệ mua lại đạt 48%. Đã gọi vốn thành công từ Vertex Ventures & Kairous Capital.",
        team: [
            { name: "Phạm Chí Nhu", role: "CEO & Co-founder", bg: "Kinh nghiệm 10 năm ngành dệt may & D2C", avatarSeed: "/images/founders/phamchinhu.jpg" },
            { name: "Nguyễn Hoài Xuân Lan", role: "CMO & Co-founder", bg: "Chuyên gia tiếp thị số & xây dựng thương hiệu", avatarSeed: "/images/mentors/lehantuelam.jpg" },
            { name: "Nguyễn Văn Hiệp", role: "CTO", bg: "Kỹ sư kiến trúc hệ thống E-commerce & Supply Chain", avatarSeed: "/images/mentors/buithanhdo.png" },
        ],
        reviews: [
            { mentor: "Trần Trung Hiếu", score: 98, comment: "Khả năng tối ưu chuỗi cung ứng và giữ chân khách hàng của Coolmate là hình mẫu lý tưởng cho startup Việt Nam.", seed: "/images/mentors/trantrunghieu.png" },
            { mentor: "Lê Hàn Tuệ Lâm", score: 98, comment: "Hiệu quả tài chính xuất sắc, unit economics bền vững và đội ngũ sáng lập có năng lực thực thi cực kỳ quyết liệt.", seed: "/images/mentors/lehantuelam.jpg" },
        ],
    },
    s2: {
        name: "Dat Bike", founder: "Nguyễn Bá Cảnh Sơn", industry: "CleanTech", stage: "Series B",
        score: 97, location: "TP. Hồ Chí Minh", teamSize: "220 people", coverSeed: "/images/startups/datbike.jpg", logoColor: "#FF5722",
        coverImage: "/images/startups/datbike.jpg",
        tagline: "Xe máy điện công nghệ cao hiệu suất vượt trội thay thế xe xăng tại Đông Nam Á.",
        description: "Dat Bike là công ty công nghệ sản xuất xe máy điện hiệu suất cao với tầm hoạt động 200km/lần sạc và sạc nhanh 20 phút đi được 100km.",
        vision: "Chuyển đổi toàn bộ 250 triệu xe máy xăng tại Đông Nam Á sang xe máy điện thông minh.",
        problem: "Xe máy xăng là nguồn phát thải 70% khói bụi đô thị; các dòng xe điện truyền thống yếu, quãng đường ngắn dưới 60km và pin mau chai.",
        solution: "Tự nghiên cứu và làm chủ 80% công nghệ lõi (Pin, Bộ điều khiển động cơ Controller, Khung gầm) tại Việt Nam với công suất tương đương xe xăng 125cc.",
        market: "Việt Nam là thị trường xe máy lớn thứ 4 thế giới với 65 triệu xe đang lưu hành, doanh số hàng năm đạt $4 tỷ.",
        traction: "Đã gọi vốn hơn $15M từ Jungle Ventures & GSR Ventures; sở hữu nhà máy sản xuất hiện đại tại Bình Dương.",
        team: [
            { name: "Nguyễn Bá Cảnh Sơn", role: "Founder & CEO", bg: "Cựu kỹ sư phần mềm Silicon Valley, giải quốc tế tin học", avatarSeed: "/images/founders/nguyenbacanhson.jpg" },
            { name: "Minh Tran", role: "VP Manufacturing", bg: "15 năm quản lý sản xuất ô tô xe máy", avatarSeed: "/images/mentors/nguyenhuuphuocnguyen.png" },
        ],
        reviews: [
            { mentor: "TS. Nguyễn Hữu Phước Nguyên", score: 97, comment: "Dat Bike là niềm tự hào về năng lực R&D phần cứng và sản xuất công nghệ cao của kỹ sư Việt Nam.", seed: "/images/mentors/nguyenhuuphuocnguyen.png" },
            { mentor: "Bùi Thành Đô", score: 96, comment: "Tốc độ cải tiến sản phẩm qua từng thế hệ rất ấn tượng, bắt đầu đạt điểm hòa vốn sản xuất.", seed: "/images/mentors/buithanhdo.png" },
        ],
    },
    s3: {
        name: "BuyMed (Thuocsi.vn)", founder: "Hoàng Nguyễn", industry: "Healthtech", stage: "Series B",
        score: 98, location: "TP. Hồ Chí Minh", teamSize: "450 people", coverSeed: "/images/startups/buymed.jpg", logoColor: "#0F766E",
        coverImage: "/images/startups/buymed.jpg",
        tagline: "Sàn thương mại điện tử phân phối dược phẩm B2B minh bạch lớn nhất Việt Nam.",
        description: "BuyMed giải quyết bài toán phân phối dược phẩm truyền thống phân mảnh bằng nền tảng thương mại điện tử B2B kết nối trực tiếp nhà sản xuất với nhà thuốc và phòng khám.",
        vision: "Xây dựng hạ tầng y tế số minh bạch và đáng tin cậy nhất Đông Nam Á.",
        problem: "Nhà thuốc truyền thống phải nhập hàng qua 3-5 tầng trung gian, nguy cơ thuốc giả và giá cả không minh bạch.",
        solution: "Sàn thương mại B2B với kho dược đạt chuẩn GSP, đảm bảo 100% nguồn gốc xuất xứ, giao hàng trong 24 giờ trên 63 tỉnh thành.",
        market: "Quy mô thị trường dược phẩm Việt Nam đạt $8 tỷ, tăng trưởng 11% hàng năm.",
        traction: "Phục vụ hơn 35,000 nhà thuốc (hơn 50% tổng số nhà thuốc toàn quốc), gọi vốn $51.5M Series B dẫn dắt bởi Smilegate Investment.",
        team: [
            { name: "Hoàng Nguyễn", role: "Co-founder & CEO", bg: "Forbes 30 Under 30 Asia, chuyên gia dược B2B", avatarSeed: "/images/founders/hoangnguyen.jpg" },
            { name: "Peter Nguyễn", role: "Co-founder & Chairman", bg: "Chuyên gia tài chính & đầu tư y tế", avatarSeed: "/images/mentors/takutanaka.jpg" },
        ],
        reviews: [
            { mentor: "Lê Hàn Tuệ Lâm", score: 98, comment: "Một trong những case study B2B Marketplace hiếm hoi đạt quy mô hàng chục triệu đô và tạo tác động xã hội lớn.", seed: "/images/mentors/lehantuelam.jpg" },
        ],
    },
    s4: {
        name: "TopCV Vietnam", founder: "Trần Trung Hiếu", industry: "SaaS", stage: "Growth",
        score: 97, location: "Hà Nội", teamSize: "310 people", coverSeed: "/images/startups/topcv.jpg", logoColor: "#00B14F",
        coverImage: "/images/startups/topcv.jpg",
        tagline: "Hệ sinh thái nhân sự và nền tảng tuyển dụng thông minh ứng dụng AI số 1.",
        description: "TopCV cung cấp giải pháp toàn diện cho vòng đời nhân sự: từ tạo CV chuyên nghiệp, tuyển dụng ứng dụng AI matching đến quản trị nhân sự và đánh giá năng lực.",
        vision: "Trở thành đối tác đồng hành phát triển sự nghiệp trọn đời cho mọi nhân tài Việt Nam.",
        problem: "Doanh nghiệp tốn hàng tuần sàng lọc hàng nghìn CV thủ công; ứng viên khó tìm được công việc phù hợp với năng lực và văn hóa.",
        solution: "Thuật toán AI Resume Parser và Smart Matching chấm điểm độ tương thích giữa ứng viên và yêu cầu tuyển dụng với độ chính xác cao.",
        market: "Thị trường tuyển dụng và HR Tech tại Việt Nam trị giá hơn $400M với tốc độ số hóa mạnh mẽ.",
        traction: "Hơn 6 triệu người dùng, 200,000+ doanh nghiệp trả phí, Top 1 nền tảng tuyển dụng được yêu thích nhất.",
        team: [
            { name: "Trần Trung Hiếu", role: "Founder & CEO", bg: "Nhân tài Đất Việt, Forbes 30 Under 30", avatarSeed: "/images/founders/trantrunghieu.png" },
            { name: "Nguyễn Khắc Nhật", role: "CTO", bg: "Kiến trúc sư phần mềm & Big Data", avatarSeed: "/images/mentors/buithanhdo.png" },
        ],
        reviews: [
            { mentor: "Phạm Chí Nhu", score: 98, comment: "TopCV là đối tác nhân sự số 1 của Coolmate và hàng nghìn startup công nghệ tại Việt Nam.", seed: "/images/mentors/phamchinhu.jpg" },
        ],
    },
    s5: {
        name: "Kamereo", founder: "Taku Tanaka", industry: "Agritech", stage: "Series A",
        score: 94, location: "TP. Hồ Chí Minh", teamSize: "135 people", coverSeed: "/images/startups/kamereo.jpg", logoColor: "#3D6B35",
        coverImage: "/images/startups/kamereo.jpg",
        tagline: "Nền tảng cung ứng thực phẩm và nông sản B2B từ nông trại đến nhà hàng.",
        description: "Chuỗi cung ứng thực phẩm B2B đầu tiên tại Việt Nam, phục vụ hơn 3,000 nhà hàng, khách sạn và siêu thị với 1,500+ SKU nông sản sạch từ Đà Lạt.",
        vision: "Tái cấu trúc chuỗi cung ứng thực phẩm bền vững số 1 khu vực.",
        problem: "Nhà hàng mất 3 giờ mỗi ngày đặt hàng từ 20 nhà cung cấp riêng lẻ, giá cả biến động thất thường và tỷ lệ hỏng dập cao.",
        solution: "Nền tảng tập trung đặt hàng một chạm, quản lý kho lạnh thông minh và giao hàng trước 8:00 sáng mỗi ngày.",
        market: "Thị trường F&B Việt Nam tiêu thụ $12 tỷ nguyên liệu thực phẩm mỗi năm.",
        traction: "3,000+ nhà hàng khách sạn, gọi vốn $5.2M Series A từ các quỹ Nhật Bản và Đông Nam Á.",
        team: [
            { name: "Taku Tanaka", role: "Founder & CEO", bg: "Cựu COO Pizza 4P's, chuyên gia chuỗi cung ứng ẩm thực", avatarSeed: "/images/founders/takutanaka.jpg" },
        ],
        reviews: [
            { mentor: "TS. Nguyễn Hữu Phước Nguyên", score: 94, comment: "Mô hình vận hành logistics lạnh chuẩn chỉ và năng lực quản lý hàng tươi sống đáng tin cậy.", seed: "/images/mentors/nguyenhuuphuocnguyen.png" },
        ],
    },
    s6: {
        name: "Selex Motors", founder: "TS. Nguyễn Hữu Phước Nguyên", industry: "CleanTech", stage: "Series A",
        score: 96, location: "Hà Nội", teamSize: "115 people", coverSeed: "/images/startups/selex.jpg", logoColor: "#2563EB",
        coverImage: "/images/startups/selex.jpg",
        tagline: "Hệ sinh thái xe máy điện thông minh & trạm đổi pin tự động 2 phút cho logistics.",
        description: "Giải pháp giao vận xanh toàn diện với trạm đổi pin thông minh độc quyền cho tài xế công nghệ (Grab, ShopeeFood, Lazada).",
        vision: "Điện hóa toàn bộ phương tiện giao vận thương mại tại Việt Nam và Đông Nam Á.",
        problem: "Tài xế giao hàng chạy 150km-200km/ngày, mất hàng giờ sạc pin khiến việc dùng xe điện trở nên bất khả thi.",
        solution: "Mạng lưới trạm đổi pin thông minh tự động 2 phút, người dùng đổi pin nhanh hơn đổ xăng truyền thống.",
        market: "Thị trường logistics chặng cuối (last-mile delivery) tại Việt Nam tăng trưởng 35%/năm.",
        traction: "Hơn 80 trạm đổi pin tại Hà Nội và TP.HCM, đối tác chiến lược của Grab, Lazada và Viettel Post.",
        team: [
            { name: "TS. Nguyễn Hữu Phước Nguyên", role: "Co-founder & CEO", bg: "Tiến sĩ Cơ khí ĐH Michigan, 15 năm kinh nghiệm R&D", avatarSeed: "/images/founders/nguyenhuuphuocnguyen.png" },
        ],
        reviews: [
            { mentor: "Nguyễn Bá Cảnh Sơn", score: 97, comment: "Giải pháp đổi pin của Selex bổ trợ hoàn hảo cho hệ sinh thái xe máy điện tương lai.", seed: "/images/mentors/nguyenbacanhson.jpg" },
        ],
    },
    s7: {
        name: "Gimo", founder: "Nguyễn Anh Quân", industry: "Fintech", stage: "Series A",
        score: 95, location: "Hà Nội", teamSize: "90 people", coverSeed: "/images/startups/gimo.png", logoColor: "#7C3AED",
        coverImage: "/images/startups/gimo.png",
        tagline: "Nền tảng nhận lương linh hoạt và an sinh tài chính cho người lao động.",
        description: "Tiên phong giải pháp Earned Wage Access (EWA) tại Việt Nam, phục vụ hơn 500,000 công nhân tại 100+ nhà máy FDI lớn.",
        vision: "Trao quyền an sinh tài chính và xóa bỏ tín dụng đen cho hàng chục triệu người lao động thu nhập trung bình thấp.",
        problem: "Người lao động có nhu cầu chi tiêu đột xuất trước ngày trả lương nhưng không tiếp cận được vốn ngân hàng, dễ rơi vào bẫy tín dụng đen lãi suất cắt cổ.",
        solution: "Ứng dụng di động cho phép công nhân nhận trước phần lương đã làm theo thời gian thực mà không phát sinh lãi suất vay.",
        market: "Hơn 20 triệu người lao động phổ thông và công nhân nhà máy tại Việt Nam.",
        traction: "Hơn 500,000 người lao động, gọi vốn thành công $17.1M Series A do TNB Aura dẫn dắt.",
        team: [
            { name: "Nguyễn Anh Quân", role: "Co-founder & CEO", bg: "Cựu Phó Chủ tịch Leadvisors Capital, 10 năm tài chính ngân hàng", avatarSeed: "/images/founders/anhquan.jpg" },
        ],
        reviews: [
            { mentor: "Bùi Thành Đô", score: 96, comment: "GIMO có tác động xã hội lớn, giải quyết tận gốc rễ vấn nạn vay nóng cho công nhân.", seed: "/images/mentors/buithanhdo.png" },
        ],
    },
    s8: {
        name: "MindX Technology School", founder: "Nguyễn Thị Thu Hà", industry: "Edtech", stage: "Series B",
        score: 95, location: "Hà Nội", teamSize: "380 people", coverSeed: "/images/startups/mindx.jpg", logoColor: "#EA580C",
        coverImage: "/images/startups/mindx.jpg",
        tagline: "Hệ sinh thái đào tạo công nghệ và lập trình quy mô hàng đầu Việt Nam.",
        description: "Mạng lưới hơn 40 cơ sở đào tạo STEAM và kỹ sư công nghệ chuẩn quốc tế từ lứa tuổi K-12 đến đại học.",
        vision: "Đưa thế hệ trẻ Việt Nam làm chủ kỷ nguyên AI và xuất khẩu chất xám công nghệ ra toàn cầu.",
        problem: "Chương trình giáo dục truyền thống thiếu kỹ năng thực chiến và công nghệ tương lai (Lập trình, AI, Robotics).",
        solution: "Lộ trình học theo dự án thực tế (Project-based learning) từ 9 tuổi đến đi làm tại các tập đoàn công nghệ lớn.",
        market: "Chi tiêu cho giáo dục ngoài trường học tại Việt Nam chiếm 47% tổng chi tiêu gia đình.",
        traction: "40+ cơ sở toàn quốc, 50,000+ học viên, gọi vốn $15M Series B từ quỹ Kaizenvest.",
        team: [
            { name: "Nguyễn Thị Thu Hà", role: "Co-founder & CEO", bg: "Forbes 30 Under 30 Asia, 10 năm tiên phong giáo dục công nghệ", avatarSeed: "/images/founders/thuha.jpg" },
        ],
        reviews: [
            { mentor: "Trần Trung Hiếu", score: 96, comment: "MindX là nguồn cung ứng kỹ sư lập trình chất lượng cao liên tục cho TopCV và hệ sinh thái tech Việt Nam.", seed: "/images/mentors/trantrunghieu.png" },
        ],
    },
    s9: {
        name: "Cricket One", founder: "Đặng Cao Nam", industry: "Agritech", stage: "Series A",
        score: 93, location: "Bình Phước", teamSize: "65 people", coverSeed: "/images/startups/cricketone.jpg", logoColor: "#854D0E",
        coverImage: "/images/startups/cricketone.jpg",
        tagline: "Sản xuất protein bền vững từ dế đạt chứng nhận an toàn thực phẩm EFSA Châu Âu.",
        description: "Nhà sản xuất đạm bền vững từ dế quy mô lớn nhất Đông Nam Á tại Bình Phước, đối tác của các tập đoàn thực phẩm toàn cầu.",
        vision: "Cung cấp nguồn dinh dưỡng tương lai thân thiện với môi trường, giảm 90% lượng nước và khí thải carbon.",
        problem: "Chăn nuôi gia súc truyền thống gây cạn kiệt tài nguyên nước và phát thải 15% khí nhà kính toàn cầu.",
        solution: "Trang trại dế công nghệ cao khép kín, ứng dụng phụ phẩm nông nghiệp làm thức ăn và chiết xuất đạm tinh khiết đạt chuẩn EFSA.",
        market: "Thị trường protein thay thế toàn cầu dự kiến chạm mốc $28 tỷ vào năm 2030.",
        traction: "Được cấp phép lưu hành toàn Châu Âu (EFSA Novel Food), xuất khẩu sang 12 quốc gia.",
        team: [
            { name: "Đặng Cao Nam", role: "Co-founder & CEO", bg: "Kỹ sư nông nghiệp công nghệ cao, giải thưởng YSE Global", avatarSeed: "/images/founders/caonam.jpg" },
        ],
        reviews: [
            { mentor: "Taku Tanaka", score: 95, comment: "Chuẩn mực an toàn thực phẩm cực cao và quy trình kiểm soát vi sinh vượt trội.", seed: "/images/mentors/takutanaka.jpg" },
        ],
    },
    s10: {
        name: "ELSA Speak", founder: "Văn Đinh Hồng Vũ", industry: "Edtech", stage: "Series C",
        score: 98, location: "TP. Hồ Chí Minh", teamSize: "160 people", coverSeed: "/images/startups/elsa.jpg", logoColor: "#0284C7",
        coverImage: "/images/startups/elsa.jpg",
        tagline: "Ứng dụng gia sư AI luyện phát âm tiếng Anh chuẩn xác theo thời gian thực.",
        description: "Ứng dụng nhận diện giọng nói AI độc quyền lọt Top 5 thế giới, phục vụ hơn 54 triệu người học tại 101 quốc gia.",
        vision: "Xóa bỏ rào cản ngôn ngữ và giúp 1.5 tỷ người học tiếng Anh trên thế giới nói tiếng Anh tự tin.",
        problem: "Người học tiếng Anh nói sai nhưng không có ai chỉnh lỗi phát âm trực tiếp từng âm tiết một cách khách quan.",
        solution: "Mô hình học sâu AI nhận diện giọng nói chuẩn xác đến từng âm tiết (phoneme) và đưa ra bài luyện tập khắc phục tức thì.",
        market: "Thị trường EdTech học ngoại ngữ toàn cầu đạt $25 tỷ.",
        traction: "54 triệu lượt tải, gọi vốn $23M Series C từ UOB Venture Management và Gradient Ventures (Google).",
        team: [
            { name: "Văn Đinh Hồng Vũ", role: "Co-founder & CEO", bg: "Thạc sĩ MBA Stanford, giải nhất SXSWedu Austin Texas", avatarSeed: "/images/founders/vandinhhongvu.jpg" },
        ],
        reviews: [
            { mentor: "Lê Hàn Tuệ Lâm", score: 99, comment: "Startup Deeptech AI tầm cỡ toàn cầu xuất phát từ bàn tay người Việt.", seed: "/images/mentors/lehantuelam.jpg" },
        ],
    },
    s11: {
        name: "Finhay", founder: "Nghiêm Xuân Huy", industry: "Fintech", stage: "Series B",
        score: 96, location: "Hà Nội", teamSize: "140 people", coverSeed: "/images/startups/finhay.jpg", logoColor: "#16A34A",
        coverImage: "/images/startups/finhay.jpg",
        tagline: "Nền tảng đầu tư và tích lũy tài chính cá nhân thông minh cho thế hệ trẻ.",
        description: "Ứng dụng quản lý gia sản số 1 Việt Nam kết nối 2.7 triệu người dùng với các quỹ đầu tư tài chính và ngân hàng.",
        vision: "Bình dân hóa đầu tư tài chính cho mọi người dân Việt Nam bắt đầu từ số vốn chỉ 50,000đ.",
        problem: "Người trẻ có tiền nhàn rỗi nhưng thiếu kiến thức tài chính và bị rào cản vốn tối thiểu lớn khi tham gia thị trường chứng khoán.",
        solution: "Nền tảng đầu tư tự động phân bổ tài sản thông minh dựa trên khẩu vị rủi ro vào các chứng chỉ quỹ mở uy tín.",
        market: "Tỷ lệ người dân tham gia đầu tư tài chính tại Việt Nam đang tăng vọt từ 3% lên 10%.",
        traction: "2.7 triệu người dùng, mua lại CTCK Vina Securities, huy động $25M Series B từ Insignia Ventures.",
        team: [
            { name: "Nghiêm Xuân Huy", role: "Founder & CEO", bg: "Cựu chuyên gia tư vấn tài chính tại Sydney Úc, Forbes 30 Under 30", avatarSeed: "/images/founders/nghiemxuanhuy.png" },
        ],
        reviews: [
            { mentor: "Huỳnh Lâm Hồ", score: 96, comment: "Năng lực xây dựng sản phẩm tài chính mượt mà và khả năng giữ chân người dùng rất cao.", seed: "/images/mentors/huynhlamho.jpg" },
        ],
    },
    s12: {
        name: "Haravan", founder: "Huỳnh Lâm Hồ", industry: "SaaS", stage: "Growth",
        score: 97, location: "TP. Hồ Chí Minh", teamSize: "290 people", coverSeed: "/images/startups/haravan.jpg", logoColor: "#2563EB",
        coverImage: "/images/startups/haravan.jpg",
        tagline: "Giải pháp quản lý bán hàng đa kênh (Omnichannel) toàn diện cho doanh nghiệp bán lẻ.",
        description: "Nền tảng thương mại điện tử và bán hàng đa kênh phục vụ hơn 50,000 người kinh doanh và thương hiệu lớn tại Việt Nam.",
        vision: "Cung cấp hệ điều hành thương mại số giúp mọi doanh nghiệp bán lẻ kinh doanh thành công trên mọi điểm chạm.",
        problem: "Nhà bán hàng bị quá tải khi quản lý đơn hàng rời rạc giữa cửa hàng offline, Shopee, Lazada, TikTok Shop và Facebook.",
        solution: "Hệ thống quản lý tồn kho, đơn hàng và khách hàng CRM tập trung đồng bộ thời gian thực trên mọi nền tảng bán hàng.",
        market: "Thương mại điện tử và bán lẻ đa kênh Việt Nam tăng trưởng trên 20%/năm.",
        traction: "50,000+ người kinh doanh, đối tác công nghệ chiến lược cao cấp của Google, Meta và TikTok.",
        team: [
            { name: "Huỳnh Lâm Hồ", role: "Co-founder & CEO", bg: "12 năm dẫn dắt Haravan, chuyên gia bán lẻ đa kênh hàng đầu", avatarSeed: "/images/founders/huynhlamho.jpg" },
        ],
        reviews: [
            { mentor: "Phạm Chí Nhu", score: 98, comment: "Hệ thống quản trị bán hàng của Haravan là xương sống cho hàng loạt chuỗi bán lẻ tại Việt Nam.", seed: "/images/mentors/phamchinhu.jpg" },
        ],
    },
};

const FALLBACK = PROJECTS.s1;

export default function ProjectDetail() {
    const { locale, id } = useParams() as { locale: Locale; id: string };
    const isVi = locale === "vi";
    const p = PROJECTS[id] ?? FALLBACK;
    const initials = p.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const ui = {
        back: isVi ? "Duyệt Startup" : "Browse Startups",
        by: isVi ? "bởi" : "by",
        connectStartup: isVi ? "Kết nối với Startup" : "Connect with Startup",
        requestIntro: isVi ? "Yêu cầu giới thiệu" : "Request Intro",
        overview: isVi ? "Tổng quan" : "Overview",
        vision: isVi ? "Tầm nhìn" : "Vision",
        problemSolution: isVi ? "Vấn đề & Giải pháp" : "Problem & Solution",
        problem: isVi ? "Vấn đề" : "Problem",
        solution: isVi ? "Giải pháp" : "Solution",
        marketTraction: isVi ? "Thị trường & Traction" : "Market & Traction",
        targetMarket: isVi ? "Thị trường mục tiêu" : "Target Market",
        traction: "Traction",
        team: isVi ? "Đội ngũ" : "Team",
        mentorEvals: isVi ? "Đánh giá từ Mentor" : "Mentor Evaluations",
        aiCredibility: isVi ? "Điểm tín nhiệm AI" : "AI Credibility Score",
        evaluatedBy: isVi ? "Được đánh giá bởi" : "Evaluated by",
        mentor: isVi ? "mentor" : "mentor",
        quickFacts: isVi ? "Thông tin nhanh" : "Quick Facts",
        industry: isVi ? "Ngành" : "Industry",
        stage: isVi ? "Giai đoạn" : "Stage",
        location: isVi ? "Địa điểm" : "Location",
        teamSize: isVi ? "Quy mô đội ngũ" : "Team Size",
        founder: isVi ? "Nhà sáng lập" : "Founder",
        interested: isVi ? "Quan tâm startup này?" : "Interested in this startup?",
        interestedSub: isVi ? "Kết nối trực tiếp hoặc yêu cầu giới thiệu qua mạng lưới của chúng tôi." : "Connect directly or request an introduction through our network.",
        connectNow: isVi ? "Kết nối ngay" : "Connect now",
    };

    return (
        <div className="pt-[72px] min-h-screen bg-white">
            {/* ── HERO ──────────────────────────────────────────────── */}
            <div className="relative w-full bg-[#F0F0F0]" style={{ paddingTop: "40%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={p.coverImage || (p.coverSeed.startsWith("/") || p.coverSeed.startsWith("http") ? p.coverSeed : `https://picsum.photos/seed/${p.coverSeed}proj/1200/480`)}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-[960px] mx-auto px-6 md:px-12 pb-8">
                    <div className="flex items-end gap-4">
                        <div className="w-14 h-14 rounded-[10px] border-2 border-white flex items-center justify-center text-white text-[18px] font-black shrink-0 shadow-lg"
                            style={{ backgroundColor: p.logoColor }}>
                            {initials}
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h1 className="text-[28px] md:text-[36px] font-black text-white leading-tight">{p.name}</h1>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">{p.stage}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">{p.industry}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">📍 {p.location}</span>
                                <span className="text-[11px] font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">👥 {p.teamSize}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CONTENT ───────────────────────────────────────────── */}
            <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
                <Link href={`/${locale}/market/startups`}
                    className="text-[13px] text-[#888888] hover:text-[#111111] transition-colors mb-8 inline-flex items-center gap-1">
                    ← {ui.back}
                </Link>

                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10 mt-4 border border-[#EAEAEA] rounded-[10px] p-6">
                    <div className="flex-1">
                        <p className="text-[18px] font-semibold text-[#111111] leading-snug mb-3">{p.tagline}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <AIScoreBadge score={p.score} />
                            <span className="text-[12px] text-[#888888]">{ui.by} {p.founder}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <Link href={`/${locale}/deals/${id}`} className="bg-[#111111] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:bg-[#F4B400] hover:text-[#111111] transition-colors whitespace-nowrap text-center">
                            {ui.connectStartup} →
                        </Link>
                        <button className="border border-[#EAEAEA] text-[#111111] px-6 py-2.5 rounded-[8px] text-[14px] font-semibold hover:border-[#111111] transition-colors whitespace-nowrap">
                            {ui.requestIntro}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-3">{ui.overview}</h2>
                            <p className="text-[15px] text-[#444444] leading-relaxed mb-4">{p.description}</p>
                            <div className="bg-[#FFFBF0] border border-[#F4B400]/30 rounded-[8px] p-4">
                                <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-1">{ui.vision}</p>
                                <p className="text-[14px] text-[#444444] italic">{p.vision}</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.problemSolution}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.problem}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.problem}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5 bg-[#F9F9F9]">
                                    <p className="text-[11px] font-bold text-[#111111] uppercase tracking-wide mb-2">{ui.solution}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.solution}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.marketTraction}</h2>
                            <div className="space-y-4">
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.targetMarket}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.market}</p>
                                </div>
                                <div className="border border-[#EAEAEA] rounded-[8px] p-5">
                                    <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-2">{ui.traction}</p>
                                    <p className="text-[14px] text-[#444444] leading-relaxed">{p.traction}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.team}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {p.team.map(member => (
                                    <div key={member.name} className="border border-[#EAEAEA] rounded-[8px] p-5 flex items-start gap-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={member.avatarSeed.startsWith("/") || member.avatarSeed.startsWith("http") ? member.avatarSeed : `https://i.pravatar.cc/80?u=${member.avatarSeed}`}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover border border-[#EAEAEA] shrink-0"
                                        />
                                        <div>
                                            <h3 className="text-[15px] font-bold text-[#111111] mb-0.5">{member.name}</h3>
                                            <p className="text-[12px] font-semibold text-[#F4B400] mb-1">{member.role}</p>
                                            <p className="text-[12px] text-[#666666]">{member.bg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{ui.mentorEvals}</h2>
                            <div className="flex flex-col gap-4">
                                {p.reviews.map(r => (
                                    <div key={r.mentor} className="border border-[#EAEAEA] rounded-[8px] p-5 flex gap-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={r.seed.startsWith("/") || r.seed.startsWith("http") ? r.seed : `https://i.pravatar.cc/64?u=${r.seed}`} alt={r.mentor}
                                            className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#EAEAEA]" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[14px] font-bold text-[#111111]">{r.mentor}</span>
                                                <span className="bg-[#FFFBF0] border border-[#F4B400] text-[#F4B400] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{r.score}/100</span>
                                            </div>
                                            <p className="text-[13px] text-[#555555] italic">&ldquo;{r.comment}&rdquo;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-5">
                        <div className="border border-[#EAEAEA] rounded-[10px] p-5">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide mb-3">{ui.aiCredibility}</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[48px] font-black text-[#F4B400] leading-none">{p.score}</span>
                                <span className="text-[16px] text-[#AAAAAA]">/ 100</span>
                            </div>
                            <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${p.score}%` }} />
                            </div>
                            <p className="text-[12px] text-[#888888]">{ui.evaluatedBy} {p.reviews.length} {ui.mentor}{p.reviews.length !== 1 ? "s" : ""}</p>
                        </div>

                        <div className="border border-[#EAEAEA] rounded-[10px] p-5 space-y-3">
                            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">{ui.quickFacts}</p>
                            {[
                                { label: ui.industry, value: p.industry },
                                { label: ui.stage, value: p.stage },
                                { label: ui.location, value: p.location },
                                { label: ui.teamSize, value: p.teamSize },
                                { label: ui.founder, value: p.founder },
                            ].map(f => (
                                <div key={f.label} className="flex justify-between items-center text-[13px] border-t border-[#F5F5F5] pt-2">
                                    <span className="text-[#888888] font-medium">{f.label}</span>
                                    <span className="font-semibold text-[#111111]">{f.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#111111] rounded-[10px] p-5">
                            <p className="text-[13px] font-bold text-white mb-1">{ui.interested}</p>
                            <p className="text-[12px] text-white/60 mb-4">{ui.interestedSub}</p>
                            <Link href={`/${locale}/deals/${id}`} className="block text-center w-full bg-[#F4B400] text-[#111111] px-4 py-2.5 rounded-[8px] text-[13px] font-bold hover:bg-white transition-colors">
                                {ui.connectNow} →
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
