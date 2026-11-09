export const PROJECTS_STORAGE_KEY = "startupkit_founder_projects";

export type ProjectStatus = "Draft" | "Published";

export interface BasicInfo {
  startupName: string;
  foundedYear: string;
  headquarters: string;
  website: string;
  industry: string;
  teamSize: string;
  founderName: string;
  founderEmail: string;
  linkedin: string;
}

export interface ProblemSolution {
  problem: string;
  solution: string;
  valueProposition: string;
}

export interface Product {
  stage: string;
  description: string;
  techStack: string;
  demoLink: string;
  screenshots: string;
}

export interface Market {
  targetMarket: string;
  marketSize: string;
  customerSegment: string;
  competitors: string;
  competitiveAdvantage: string;
}

export interface Business {
  revenueModel: string;
  pricingStrategy: string;
  monthlyRevenue: string;
  activeUsers: string;
  growthRate: string;
}

export interface Funding {
  fundingStage: string;
  totalFunding: string;
  investmentNeeded: string;
  equityOffered: string;
  pitchDeck: string;
  financials: string;
}

export interface FounderProject {
  id: string;
  slug: string;
  status: ProjectStatus;
  score: number;
  hasLandingPage: boolean;
  createdAt: string;
  updatedAt: string;
  basicInfo: BasicInfo;
  problemSolution: ProblemSolution;
  product: Product;
  market: Market;
  business: Business;
  funding: Funding;
}

export const slugifyStartupName = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const emptyProjectSections = {
  basicInfo: {
    startupName: "",
    foundedYear: "",
    headquarters: "",
    website: "",
    industry: "",
    teamSize: "",
    founderName: "",
    founderEmail: "",
    linkedin: "",
  },
  problemSolution: {
    problem: "",
    solution: "",
    valueProposition: "",
  },
  product: {
    stage: "",
    description: "",
    techStack: "",
    demoLink: "",
    screenshots: "",
  },
  market: {
    targetMarket: "",
    marketSize: "",
    customerSegment: "",
    competitors: "",
    competitiveAdvantage: "",
  },
  business: {
    revenueModel: "",
    pricingStrategy: "",
    monthlyRevenue: "",
    activeUsers: "",
    growthRate: "",
  },
  funding: {
    fundingStage: "",
    totalFunding: "",
    investmentNeeded: "",
    equityOffered: "",
    pitchDeck: "",
    financials: "",
  },
};

export const DEFAULT_FOUNDER_PROJECTS: FounderProject[] = [
  {
    id: "s1",
    slug: "agribot-vietnam",
    status: "Published",
    score: 94,
    hasLandingPage: true,
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-11-08T10:30:00.000Z",
    basicInfo: {
      startupName: "AgriBot Vietnam",
      foundedYear: "2024",
      headquarters: "Hà Nội, Việt Nam",
      website: "https://agribot.vn",
      industry: "Agritech",
      teamSize: "12 người",
      founderName: "Nguyễn Văn Minh",
      founderEmail: "minh@agribot.vn",
      linkedin: "https://linkedin.com/in/nguyen-van-minh-agribot",
    },
    problemSolution: {
      problem:
        "Hơn 10 triệu hộ nông dân trồng lúa và cây ăn trái tại Việt Nam đang phụ thuộc vào quan sát thủ công, dẫn đến phát hiện sâu bệnh muộn, lãng phí 35% lượng phân bón và thiệt hại mùa màng tới 30% mỗi năm.",
      solution:
        "AgriBot kết hợp trạm cảm biến IoT năng lượng mặt trời chi phí thấp với mô hình AI thị giác máy tính trên điện thoại, cảnh báo sâu bệnh sớm trước 7 ngày và khuyến nghị lượng nước - phân bón tối ưu theo thời gian thực.",
      valueProposition:
        "Tăng 24% năng suất thu hoạch, tiết kiệm 35% chi phí vật tư nông nghiệp và hoàn vốn thiết bị ngay trong vụ mùa đầu tiên.",
    },
    product: {
      stage: "Growth / Commercial",
      description:
        "Hệ sinh thái gồm bộ cảm biến đất & vi khí hậu AgriNode (Lắp đặt trong 5 phút) kết nối ứng dụng di động AgriBot AI hỗ trợ giọng nói tiếng Việt, tích hợp bản đồ dịch bệnh vệ tinh cho hợp tác xã.",
      techStack: "Python, PyTorch, FastAPI, Next.js, LoRaWAN IoT, PostgreSQL",
      demoLink: "https://demo.agribot.vn",
      screenshots: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Việt Nam & Đông Nam Á (Thái Lan, Philippines, Indonesia)",
      marketSize: "TAM $12B tại Đông Nam Á · SAM $1.8B tại Việt Nam",
      customerSegment: "Hợp tác xã nông nghiệp, trang trại quy mô vừa và doanh nghiệp xuất khẩu nông sản",
      competitors: "Canh tác truyền thống, các thiết bị ngoại nhập giá cao từ Israel/Nhật Bản",
      competitiveAdvantage:
        "Chi phí phần cứng rẻ hơn 70% so với thiết bị ngoại nhập, tập dữ liệu 500.000 mẫu bệnh cây trồng bản địa tại Đồng bằng sông Cửu Long.",
    },
    business: {
      revenueModel: "Hardware-as-a-Service (HaaS) + SaaS Subscription cho Hợp tác xã",
      pricingStrategy: "$15/tháng/ha hoặc gói Hợp tác xã $1,800/năm",
      monthlyRevenue: "$28,500 MRR",
      activeUsers: "3,450 nông hộ & 18 hợp tác xã",
      growthRate: "22% MoM",
    },
    funding: {
      fundingStage: "Seed",
      totalFunding: "$180,000 (Pre-seed)",
      investmentNeeded: "$500,000",
      equityOffered: "10%",
      pitchDeck: "https://agribot.vn/deck-seed-2026.pdf",
      financials: "Gross Margin 68% · Burn rate $14k/tháng · Runway 16 tháng",
    },
  },
  {
    id: "s4",
    slug: "payease",
    status: "Published",
    score: 97,
    hasLandingPage: true,
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-11-09T14:20:00.000Z",
    basicInfo: {
      startupName: "PayEase",
      foundedYear: "2023",
      headquarters: "TP. Hồ Chí Minh, Việt Nam",
      website: "https://payease.vn",
      industry: "Fintech",
      teamSize: "32 người",
      founderName: "Trần Thị Lan",
      founderEmail: "lan.tran@payease.vn",
      linkedin: "https://linkedin.com/in/tran-thi-lan-payease",
    },
    problemSolution: {
      problem:
        "Các doanh nghiệp SME và Mid-market tại Việt Nam mất hơn 60 giờ mỗi tháng để đối soát hóa đơn VAT, sao kê đa ngân hàng và phê duyệt thanh toán thủ công với tỷ lệ sai sót 2.3%.",
      solution:
        "Nền tảng tự động hóa thanh toán B2B kết nối trực tiếp API của 22 ngân hàng Việt Nam và hệ thống hóa đơn điện tử Tổng cục Thuế, tự động khớp lệnh 99.8% giao dịch chỉ trong 3 giây.",
      valueProposition:
        "Giảm 90% thời gian vận hành tài chính kế toán, kiểm soát dòng tiền thời gian thực và chuẩn hóa báo cáo kiểm toán chỉ với 1 cú nhấp chuột.",
    },
    product: {
      stage: "Scaling",
      description:
        "Cổng điều phối thanh toán B2B (Payment Orchestration), tự động nhận diện hóa đơn đầu vào bằng OCR AI, đối soát công nợ tự động với ERP (SAP, Odoo, MISA) và quản lý hạn mức chi tiêu theo phòng ban.",
      techStack: "Go, TypeScript, Next.js, Kafka, PostgreSQL, AWS",
      demoLink: "https://app.payease.vn/demo",
      screenshots: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Doanh nghiệp SME & chuỗi bán lẻ tại Việt Nam và Đông Nam Á",
      marketSize: "TAM $18B SEA B2B Payments · SAM $4.2B tại Việt Nam",
      customerSegment: "Doanh nghiệp có doanh thu $1M - $50M/năm (FMCG, Logistics, Chuỗi F&B)",
      competitors: "Quy trình kế toán thủ công trên Excel, phân hệ ERP truyền thống",
      competitiveAdvantage:
        "Tích hợp sâu Open Banking với 22 ngân hàng nội địa và hệ thống hóa đơn điện tử Việt Nam, triển khai trong 48 giờ thay vì 3 tháng.",
    },
    business: {
      revenueModel: "SaaS Tiered Subscription + 0.15% phí giao dịch B2B thanh toán qua cổng",
      pricingStrategy: "$199 - $899/tháng tùy quy mô giao dịch",
      monthlyRevenue: "$145,000 MRR ($1.74M ARR)",
      activeUsers: "210 doanh nghiệp B2B",
      growthRate: "18% MoM",
    },
    funding: {
      fundingStage: "Series A",
      totalFunding: "$850,000 (Seed)",
      investmentNeeded: "$2,000,000",
      equityOffered: "12%",
      pitchDeck: "https://payease.vn/series-a-deck.pdf",
      financials: "Net Revenue Retention 118% · Gross Margin 81% · CAC Payback 5 tháng",
    },
  },
  {
    id: "s3",
    slug: "mediconnect",
    status: "Published",
    score: 91,
    hasLandingPage: true,
    createdAt: "2026-09-02T11:15:00.000Z",
    updatedAt: "2026-11-07T16:45:00.000Z",
    basicInfo: {
      startupName: "MediConnect",
      foundedYear: "2024",
      headquarters: "Đà Nẵng, Việt Nam",
      website: "https://mediconnect.vn",
      industry: "Healthtech",
      teamSize: "16 người",
      founderName: "BS. Lê Hoàng",
      founderEmail: "hoang.le@mediconnect.vn",
      linkedin: "https://linkedin.com/in/dr-le-hoang-mediconnect",
    },
    problemSolution: {
      problem:
        "Bệnh nhân tại các tỉnh thành tuyến huyện phải di chuyển hàng trăm km và chờ đợi 4-6 tiếng tại bệnh viện tuyến trung ương cho các ca khám chuyên khoa và theo dõi bệnh mãn tính.",
      solution:
        "Nền tảng bệnh viện số từ xa kết nối phòng khám địa phương và bệnh nhân với hơn 450 bác sĩ chuyên khoa đầu ngành tại Hà Nội & TP.HCM kèm hồ sơ bệnh án điện tử AI.",
      valueProposition:
        "Giảm 75% chi phí đi lại cho bệnh nhân tỉnh, giúp bác sĩ tăng 3x hiệu suất tư vấn nhờ trợ lý AI tóm tắt triệu chứng và cảnh báo tương tác thuốc.",
    },
    product: {
      stage: "Commercial",
      description:
        "Ứng dụng khám từ xa chuẩn HIPAA, tích hợp thiết bị đo huyết áp/đường huyết IoT tại nhà và cổng liên thông kết quả xét nghiệm với 45 phòng khám vệ tinh.",
      techStack: "Next.js, WebRTC, Python FastAPI, Med-LLM, Redis",
      demoLink: "https://mediconnect.vn/live-demo",
      screenshots: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Thị trường y tế số và chăm sóc bệnh mãn tính tại Việt Nam",
      marketSize: "TAM $6.5B Healthtech Việt Nam",
      customerSegment: "Bệnh nhân mãn tính (tim mạch, tiểu đường), gia đình có trẻ nhỏ và người cao tuổi",
      competitors: "Đặt lịch khám truyền thống, phòng khám nhỏ lẻ",
      competitiveAdvantage:
        "Mạng lưới 45 phòng khám xét nghiệm vệ tinh tại 12 tỉnh miền Trung & miền Tây kết hợp đội ngũ bác sĩ tuyến đầu.",
    },
    business: {
      revenueModel: "Chia sẻ doanh thu ca tư vấn (25% take rate) + Gói chăm sóc bác sĩ gia đình theo năm",
      pricingStrategy: "250.000đ/lượt khám hoặc 2.400.000đ/năm cho cả gia đình",
      monthlyRevenue: "$42,000 MRR",
      activeUsers: "14,500 bệnh nhân hoạt động & 450 bác sĩ",
      growthRate: "26% MoM",
    },
    funding: {
      fundingStage: "Seed",
      totalFunding: "$200,000",
      investmentNeeded: "$800,000",
      equityOffered: "12%",
      pitchDeck: "https://mediconnect.vn/investor-deck.pdf",
      financials: "Take rate 25% · Gross Margin 72% · LTV/CAC = 4.2x",
    },
  },
  {
    id: "s2",
    slug: "edupath-ai",
    status: "Published",
    score: 88,
    hasLandingPage: true,
    createdAt: "2026-10-01T07:30:00.000Z",
    updatedAt: "2026-11-06T09:10:00.000Z",
    basicInfo: {
      startupName: "EduPath AI",
      foundedYear: "2025",
      headquarters: "Hà Nội, Việt Nam",
      website: "https://edupath.edu.vn",
      industry: "Edtech",
      teamSize: "9 người",
      founderName: "Phạm Anh Tuấn",
      founderEmail: "tuan.pham@edupath.edu.vn",
      linkedin: "https://linkedin.com/in/pham-anh-tuan-edupath",
    },
    problemSolution: {
      problem:
        "Chương trình học phổ thông K-12 đồng loạt khiến học sinh hổng kiến thức không được bù đắp kịp thời, trong khi giáo viên quá tải với sĩ số 45 học sinh/lớp.",
      solution:
        "Nền tảng gia sư AI cá nhân hóa theo khung chương trình Bộ GD&ĐT, tự động phát hiện lỗ hổng kiến thức Toán - Lý - Anh và điều chỉnh lộ trình bài tập theo năng lực từng học sinh.",
      valueProposition:
        "Cải thiện điểm số trung bình 1.8 điểm sau 8 tuần học và tiết kiệm 70% thời gian chấm chữa bài cho giáo viên nhà trường.",
    },
    product: {
      stage: "Beta / Early Commercial",
      description:
        "Hệ thống Adaptive Learning tích hợp AI Socratic Tutor (hướng dẫn tư duy thay vì giải hộ) cùng Dashboard quản lý năng lực học sinh cho nhà trường và phụ huynh.",
      techStack: "Next.js, TypeScript, OpenAI / Gemini API, Supabase, Tailwind",
      demoLink: "https://edupath.edu.vn/playground",
      screenshots: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Học sinh K-12 (Lớp 6 - Lớp 12) và trường tư thục/công lập tại Việt Nam",
      marketSize: "TAM $3.5B Edtech Việt Nam (18 triệu học sinh phổ thông)",
      customerSegment: "Phụ huynh học sinh cấp 2-3 và các trường phổ thông liên cấp",
      competitors: "Trung tâm học thêm truyền thống, ứng dụng giải bài tập đơn thuần",
      competitiveAdvantage:
        "Đang thí điểm chính thức tại 18 trường THCS & THPT tại Hà Nội với tỷ lệ học sinh duy trì học hàng tuần đạt 91%.",
    },
    business: {
      revenueModel: "B2B2C School Licensing + B2C Freemium Subscription",
      pricingStrategy: "149.000đ/tháng/học sinh hoặc gói trường học $6,000/năm",
      monthlyRevenue: "$16,400 MRR",
      activeUsers: "9,800 học sinh tại 18 trường",
      growthRate: "31% MoM",
    },
    funding: {
      fundingStage: "Pre-seed",
      totalFunding: "$60,000",
      investmentNeeded: "$250,000",
      equityOffered: "10%",
      pitchDeck: "https://edupath.edu.vn/preseed-deck.pdf",
      financials: "Gross Margin 84% · Chi phí AI tối ưu $0.32/học sinh/tháng",
    },
  },
  {
    id: "s7",
    slug: "logismart-green",
    status: "Published",
    score: 92,
    hasLandingPage: true,
    createdAt: "2026-10-12T10:00:00.000Z",
    updatedAt: "2026-11-09T08:00:00.000Z",
    basicInfo: {
      startupName: "LogiSmart Green",
      foundedYear: "2024",
      headquarters: "TP. Hồ Chí Minh, Việt Nam",
      website: "https://logismart.vn",
      industry: "Logistics",
      teamSize: "21 người",
      founderName: "Đặng Quốc Khánh",
      founderEmail: "khanh@logismart.vn",
      linkedin: "https://linkedin.com/in/dang-quoc-khanh-logismart",
    },
    problemSolution: {
      problem:
        "Chi phí logistics tại Việt Nam chiếm tới 16.8% GDP; hơn 40% xe tải chiều về chạy rỗng và việc điều phối kho lạnh nông sản/dược phẩm còn rời rạc, gây thất thoát hàng hóa cao.",
      solution:
        "Nền tảng điều phối đội xe và gom đơn kho lạnh bằng thuật toán AI Route Optimization, ghép tải chiều về tự động và giám sát nhiệt độ chuỗi cung ứng lạnh 24/7.",
      valueProposition:
        "Giảm 23% chi phí nhiên liệu vận tải, tăng tỷ lệ lấp đầy thùng xe từ 58% lên 89% và cung cấp báo cáo phát thải ESG chuẩn quốc tế.",
    },
    product: {
      stage: "Scaling",
      description:
        "Hệ thống TMS (Transport Management System) tích hợp sàn ghép chuyến B2B và cảm biến nhiệt độ chuỗi lạnh thời gian thực cho doanh nghiệp xuất nhập khẩu.",
      techStack: "Rust, Go, Next.js, OR-Tools, PostgreSQL, PostGIS",
      demoLink: "https://app.logismart.vn",
      screenshots: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Vận tải thương mại B2B và chuỗi cung ứng lạnh tại Việt Nam",
      marketSize: "TAM $45B ngành Logistics Việt Nam · SAM $4.8B",
      customerSegment: "Doanh nghiệp FMCG, chuỗi siêu thị, công ty xuất khẩu thủy hải sản",
      competitors: "Nhà xe truyền thống, điều vận thủ công qua Zalo/Excel",
      competitiveAdvantage:
        "Mạng lưới hơn 1,400 đầu xe tải và xe lạnh liên kết trên tuyến Bắc - Nam và cụm cảng Cát Lái - Cái Mép.",
    },
    business: {
      revenueModel: "SaaS TMS Subscription + 8% phí dịch vụ ghép tải chuyến về",
      pricingStrategy: "$299/tháng + hoa hồng ghép chuyến",
      monthlyRevenue: "$68,000 MRR",
      activeUsers: "85 chủ hàng doanh nghiệp & 1,400 xe tải",
      growthRate: "24% MoM",
    },
    funding: {
      fundingStage: "Seed",
      totalFunding: "$300,000",
      investmentNeeded: "$900,000",
      equityOffered: "11%",
      pitchDeck: "https://logismart.vn/seed-deck.pdf",
      financials: "GMV $620k/tháng · Net Take Rate 11% · Dương dòng tiền vận hành tại TP.HCM",
    },
  },
  {
    id: "s8",
    slug: "cybersafe-shield",
    status: "Draft",
    score: 90,
    hasLandingPage: true,
    createdAt: "2026-10-25T15:00:00.000Z",
    updatedAt: "2026-11-09T18:00:00.000Z",
    basicInfo: {
      startupName: "CyberSafe Shield",
      foundedYear: "2025",
      headquarters: "Hà Nội, Việt Nam",
      website: "https://cybersafe.vn",
      industry: "SaaS",
      teamSize: "10 người",
      founderName: "Vũ Hoàng Nam",
      founderEmail: "nam.vu@cybersafe.vn",
      linkedin: "https://linkedin.com/in/vu-hoang-nam-cyber",
    },
    problemSolution: {
      problem:
        "Các doanh nghiệp SME và Fintech tại Việt Nam đối mặt với sự gia tăng 300% các cuộc tấn công đánh cắp dữ liệu và lừa đảo phishing nhưng không đủ ngân sách thuê đội ngũ SOC 24/7.",
      solution:
        "Nền tảng AI SOC-as-a-Service tự động quét lỗ hổng bảo mật liên tục, phát hiện xâm nhập bất thường và cô lập mã độc chỉ trong 15 giây với chi phí bằng 1/10 giải pháp truyền thống.",
      valueProposition:
        "Bảo vệ toàn diện hạ tầng Cloud & Web App chuẩn Nghị định 13/2023/NĐ-CP và ISO 27001 chỉ trong 30 phút cài đặt.",
    },
    product: {
      stage: "MVP / Early Revenue",
      description:
        "Agent bảo mật nhẹ kết hợp AI Threat Intelligence chuyên biệt cho hạ tầng doanh nghiệp Việt Nam, tự động xuất báo cáo tuân thủ an toàn thông tin.",
      techStack: "Rust, Python, eBPF, Next.js, ClickHouse",
      demoLink: "https://cybersafe.vn/sandbox",
      screenshots: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Doanh nghiệp công nghệ, Fintech, E-commerce tại Đông Nam Á",
      marketSize: "TAM $5.4B Cybersecurity SEA · SAM $680M tại Việt Nam",
      customerSegment: "Startup công nghệ, Fintech, chuỗi bán lẻ có dữ liệu khách hàng lớn",
      competitors: "Các hãng bảo mật ngoại nhập đắt đỏ hoặc dịch vụ pentest định kỳ thủ công",
      competitiveAdvantage:
        "Tích hợp sẵn bộ quy tắc tuân thủ Nghị định bảo vệ dữ liệu cá nhân Việt Nam và Ngân hàng Nhà nước.",
    },
    business: {
      revenueModel: "B2B SaaS Subscription theo số lượng Server/Endpoint",
      pricingStrategy: "$250 - $1,200/tháng",
      monthlyRevenue: "$19,200 MRR",
      activeUsers: "42 doanh nghiệp",
      growthRate: "28% MoM",
    },
    funding: {
      fundingStage: "Seed",
      totalFunding: "$120,000",
      investmentNeeded: "$600,000",
      equityOffered: "10%",
      pitchDeck: "https://cybersafe.vn/deck.pdf",
      financials: "Gross Margin 86% · Churn 0% từ khi ra mắt",
    },
  },
];

let projectIdCounter = 0;

export const createProjectId = () => `p-${Date.now()}-${projectIdCounter++}`;

export function loadFounderProjects(): FounderProject[] {
  if (typeof window === "undefined") return DEFAULT_FOUNDER_PROJECTS;
  const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_FOUNDER_PROJECTS));
    return DEFAULT_FOUNDER_PROJECTS;
  }
  try {
    const parsed = JSON.parse(raw) as FounderProject[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_FOUNDER_PROJECTS));
    return DEFAULT_FOUNDER_PROJECTS;
  } catch {
    return DEFAULT_FOUNDER_PROJECTS;
  }
}

export function saveFounderProjects(projects: FounderProject[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function upsertFounderProject(project: FounderProject) {
  const all = loadFounderProjects();
  const filtered = all.filter((item) => item.id !== project.id);
  saveFounderProjects([project, ...filtered]);
}

export function getFounderProjectById(id: string) {
  return loadFounderProjects().find((item) => item.id === id);
}

export function deleteFounderProjectById(id: string) {
  const all = loadFounderProjects();
  const next = all.filter((item) => item.id !== id);
  saveFounderProjects(next);
}

export function setFounderProjectStatusById(id: string, status: ProjectStatus) {
  const all = loadFounderProjects();
  const next = all.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
  saveFounderProjects(next);
  return next.find((item) => item.id === id);
}
