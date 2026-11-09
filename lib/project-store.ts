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
    slug: "coolmate-vietnam",
    status: "Published",
    score: 98,
    hasLandingPage: true,
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-11-08T10:30:00.000Z",
    basicInfo: {
      startupName: "Coolmate",
      foundedYear: "2019",
      headquarters: "Hà Nội, Việt Nam",
      website: "https://coolmate.me",
      industry: "E-commerce",
      teamSize: "180 người",
      founderName: "Phạm Chí Nhu",
      founderEmail: "nhu.pham@coolmate.me",
      linkedin: "https://linkedin.com/in/nhuphamcoolmate",
    },
    problemSolution: {
      problem:
        "Thị trường thời trang nam giới Việt Nam gặp nhiều bất cập: chuỗi bán lẻ truyền thống qua nhiều trung gian đẩy giá thành lên cao, chất lượng không đồng đều và trải nghiệm đổi trả phức tạp.",
      solution:
        "Coolmate áp dụng mô hình D2C (Direct-to-Consumer) số hóa chuỗi cung ứng dệt may tại Việt Nam, bán trực tiếp đến tay người tiêu dùng kèm chính sách đổi trả 60 ngày miễn phí bất kể lý do.",
      valueProposition:
        "Thời trang cơ bản chất lượng cao, giá thành hợp lý bằng 50% hàng ngoại nhập, chăm sóc khách hàng 100% hài lòng.",
    },
    product: {
      stage: "Expansion / Series B",
      description:
        "Nền tảng thương mại điện tử đa kênh tích hợp ERP chuỗi cung ứng thông minh, tự động hóa đóng gói theo nhu cầu và quản lý dữ liệu hơn 1.5 triệu khách hàng.",
      techStack: "Next.js, Node.js, GraphQL, PostgreSQL, Redis, AWS, Shopify Plus Custom Engine",
      demoLink: "https://coolmate.me",
      screenshots: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Việt Nam và khu vực Đông Nam Á (Thái Lan, Indonesia)",
      marketSize: "TAM $6.5B thị trường thời trang Việt Nam · SAM $1.2B thời trang nam trực tuyến",
      customerSegment: "Nam giới hiện đại độ tuổi 18-35, nhân viên văn phòng và người yêu thích thể thao",
      competitors: "Các chuỗi thời trang ngoại (Uniqlo, H&M) và hàng chợ truyền thống",
      competitiveAdvantage:
        "Tối ưu 100% chuỗi cung ứng sản xuất tại các nhà máy dệt may Việt Nam, biên lợi nhuận tốt và văn hóa phục vụ vượt trội.",
    },
    business: {
      revenueModel: "Bán lẻ D2C trực tuyến, đăng ký định kỳ (CoolClub Subscription) và hợp đồng quà tặng B2B",
      pricingStrategy: "Value-based pricing, thấp hơn 40% so với thương hiệu quốc tế cùng chất lượng vải",
      monthlyRevenue: "$2.16M / tháng ($26M ARR)",
      activeUsers: "1,500,000+ khách hàng",
      growthRate: "+120% YoY",
    },
    funding: {
      fundingStage: "Series B",
      totalFunding: "$12.3M",
      investmentNeeded: "$5,000,000",
      equityOffered: "10%",
      pitchDeck: "https://pitch.coolmate.me/deck-series-b.pdf",
      financials: "https://pitch.coolmate.me/financials-audited.pdf",
    },
  },
  {
    id: "s2",
    slug: "dat-bike",
    status: "Published",
    score: 97,
    hasLandingPage: true,
    createdAt: "2026-08-20T08:00:00.000Z",
    updatedAt: "2026-11-05T14:20:00.000Z",
    basicInfo: {
      startupName: "Dat Bike",
      foundedYear: "2019",
      headquarters: "TP. Hồ Chí Minh, Việt Nam",
      website: "https://dat.bike",
      industry: "CleanTech",
      teamSize: "220 người",
      founderName: "Nguyễn Bá Cảnh Sơn",
      founderEmail: "son@dat.bike",
      linkedin: "https://linkedin.com/in/canhson",
    },
    problemSolution: {
      problem:
        "Khu vực Đông Nam Á có 250 triệu xe máy xăng xả thải 70% khói bụi đô thị; xe điện trước đây vận hành yếu, quãng đường ngắn dưới 60km và pin mau chai.",
      solution:
        "Dat Bike tự nghiên cứu và chế tạo xe máy điện công suất tương đương xe xăng 125cc, tầm hoạt động 200km/lần sạc và sạc nhanh 20 phút đi được 100km.",
      valueProposition:
        "Tiết kiệm 80% chi phí nhiên liệu so với xe xăng, gia tốc mạnh mẽ 0-50km/h trong 3 giây và độ bền trên 10 năm.",
    },
    product: {
      stage: "Commercial Production / Series B",
      description:
        "Dòng xe máy điện thông minh thế hệ mới (Weaver++ và Quantum) kết nối ứng dụng di động quản lý định vị, chẩn đoán lỗi qua OTA và trạm sạc nhanh Dat Charge.",
      techStack: "Embedded C/C++, FreeRTOS, Flutter, Python, AWS IoT Core, CAN Bus",
      demoLink: "https://dat.bike/pages/quantum",
      screenshots: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&fit=crop",
    },
    market: {
      targetMarket: "Việt Nam, Indonesia, Thái Lan, Malaysia",
      marketSize: "TAM $25B tại Đông Nam Á · SAM $4B tại Việt Nam (65 triệu xe máy)",
      customerSegment: "Người tiêu dùng trẻ đô thị, tài xế công nghệ và dịch vụ giao hàng chặng cuối",
      competitors: "Xe máy xăng truyền thống (Honda, Yamaha) và xe máy điện ngoại nhập",
      competitiveAdvantage:
        "Tự chủ 80% thiết kế phần cứng, pin xe và phần mềm; tốc độ sạc nhanh số 1 thị trường hiện nay.",
    },
    business: {
      revenueModel: "Bán xe máy điện, gói pin dự phòng, phụ kiện và dịch vụ sạc siêu nhanh Dat Charge",
      pricingStrategy: "Cạnh tranh trực tiếp với phân khúc xe tay ga tầm trung (39 - 49 triệu VNĐ)",
      monthlyRevenue: "$1.8M / tháng",
      activeUsers: "15,000+ xe đang lưu hành",
      growthRate: "+150% YoY",
    },
    funding: {
      fundingStage: "Series B",
      totalFunding: "$15.5M",
      investmentNeeded: "$8,000,000",
      equityOffered: "12%",
      pitchDeck: "https://dat.bike/investor/deck-2026.pdf",
      financials: "https://dat.bike/investor/financial-audit.pdf",
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
