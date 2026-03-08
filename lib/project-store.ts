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

let projectIdCounter = 0;

export const createProjectId = () => `p-${Date.now()}-${projectIdCounter++}`;

export function loadFounderProjects(): FounderProject[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as FounderProject[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
