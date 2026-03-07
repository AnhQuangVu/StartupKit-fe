"use client";

import { useEffect, useState } from "react";
import { useDictionary } from "@/lib/dict-context";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Save, Send, Edit2, CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";
import {
  createProjectId,
  emptyProjectSections,
  getFounderProjectById,
  slugifyStartupName,
  upsertFounderProject,
  type ProjectStatus,
} from "@/lib/project-store";

interface BasicInfo {
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

interface ProblemSolution {
  problem: string;
  solution: string;
  valueProposition: string;
}

interface Product {
  stage: string;
  description: string;
  techStack: string;
  demoLink: string;
  screenshots: string;
}

interface Market {
  targetMarket: string;
  marketSize: string;
  customerSegment: string;
  competitors: string;
  competitiveAdvantage: string;
}

interface Business {
  revenueModel: string;
  pricingStrategy: string;
  monthlyRevenue: string;
  activeUsers: string;
  growthRate: string;
}

interface Funding {
  fundingStage: string;
  totalFunding: string;
  investmentNeeded: string;
  equityOffered: string;
  pitchDeck: string;
  financials: string;
}

interface ProjectFormData {
  basicInfo: BasicInfo;
  problemSolution: ProblemSolution;
  product: Product;
  market: Market;
  business: Business;
  funding: Funding;
  hasLandingPage: boolean;
}

type TemplateKey = "ideaValidation" | "mvpDevelopment" | "seedFunding" | "growthStage";

const TEMPLATE_KEYS: TemplateKey[] = ["ideaValidation", "mvpDevelopment", "seedFunding", "growthStage"];

const FALLBACK_EDIT_PROJECTS: Record<string, { status: ProjectStatus; formData: ProjectFormData }> = {
  s1: {
    status: "Published",
    formData: {
      basicInfo: {
        startupName: "AgriBot",
        foundedYear: "2023",
        headquarters: "Ha Noi, Vietnam",
        website: "https://agribot.vn",
        industry: "Agritech",
        teamSize: "8",
        founderName: "Nguyen Minh",
        founderEmail: "founder@agribot.vn",
        linkedin: "https://linkedin.com/in/nguyenminh",
      },
      problemSolution: {
        problem: "Farmers struggle to monitor crop conditions in time.",
        solution: "AI-driven crop monitoring and prediction alerts.",
        valueProposition: "AI crop intelligence for smallholder farmers",
      },
      product: {
        stage: "mvp",
        description: "Mobile platform with sensor and weather insights.",
        techStack: "React, Node.js, ML",
        demoLink: "https://demo.agribot.vn",
        screenshots: "",
      },
      market: {
        targetMarket: "Rice and fruit farmers in Vietnam",
        marketSize: "$1.2B",
        customerSegment: "Smallholder and cooperative farmers",
        competitors: "Traditional agronomy tools",
        competitiveAdvantage: "Localized AI recommendations",
      },
      business: {
        revenueModel: "subscription",
        pricingStrategy: "Per farm subscription",
        monthlyRevenue: "24000",
        activeUsers: "3200",
        growthRate: "18% MoM",
      },
      funding: {
        fundingStage: "seed",
        totalFunding: "300000",
        investmentNeeded: "700000",
        equityOffered: "12",
        pitchDeck: "",
        financials: "",
      },
      hasLandingPage: false,
    },
  },
  s6: {
    status: "Draft",
    formData: {
      basicInfo: {
        startupName: "HealthScore",
        foundedYear: "2024",
        headquarters: "Ho Chi Minh City, Vietnam",
        website: "",
        industry: "Healthtech",
        teamSize: "5",
        founderName: "Tran Linh",
        founderEmail: "linh@healthscore.vn",
        linkedin: "",
      },
      problemSolution: {
        problem: "Families lack preventive health tracking and risk alerts.",
        solution: "A health tracking app with AI risk scoring.",
        valueProposition: "Preventive health tracking for young families",
      },
      product: {
        stage: "idea",
        description: "Consumer app for health score and reminders.",
        techStack: "Next.js, Python",
        demoLink: "",
        screenshots: "",
      },
      market: {
        targetMarket: "Urban young families",
        marketSize: "$450M",
        customerSegment: "Parents with children under 10",
        competitors: "Generic wellness apps",
        competitiveAdvantage: "Localized preventive insights",
      },
      business: {
        revenueModel: "subscription",
        pricingStrategy: "Freemium + premium plan",
        monthlyRevenue: "0",
        activeUsers: "1200",
        growthRate: "12% MoM",
      },
      funding: {
        fundingStage: "preseed",
        totalFunding: "0",
        investmentNeeded: "250000",
        equityOffered: "10",
        pitchDeck: "",
        financials: "",
      },
      hasLandingPage: false,
    },
  },
};

export default function CreateProjectPage() {
  const dict = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params?.locale as string;
  const routeProjectId = (params as { id?: string } | null)?.id;
  const isEditMode = pathname?.includes("/edit") && Boolean(routeProjectId);

  const templateParam = searchParams.get("template") as TemplateKey | null;
  const selectedTemplate = TEMPLATE_KEYS.includes(templateParam as TemplateKey) ? templateParam : null;
  const T = dict.workspace.startup.createForm;

  const [currentStep, setCurrentStep] = useState(1);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [projectId] = useState(routeProjectId ?? createProjectId());
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>("Draft");
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: "assistant" | "user"; content: string }>>([
    { role: "assistant", content: T.assistant.welcome },
  ]);

  const [formData, setFormData] = useState<ProjectFormData>({
    basicInfo: emptyProjectSections.basicInfo,
    problemSolution: emptyProjectSections.problemSolution,
    product: emptyProjectSections.product,
    market: emptyProjectSections.market,
    business: emptyProjectSections.business,
    funding: emptyProjectSections.funding,
    hasLandingPage: false,
  });

  useEffect(() => {
    if (!isEditMode || !routeProjectId) return;
    const existing = getFounderProjectById(routeProjectId);
    if (existing) {
      setProjectStatus(existing.status);
      setFormData({
        basicInfo: existing.basicInfo,
        problemSolution: existing.problemSolution,
        product: existing.product,
        market: existing.market,
        business: existing.business,
        funding: existing.funding,
        hasLandingPage: existing.hasLandingPage,
      });
      return;
    }

    const fallback = FALLBACK_EDIT_PROJECTS[routeProjectId];
    if (!fallback) return;
    setProjectStatus(fallback.status);
    setFormData(fallback.formData);
  }, [isEditMode, routeProjectId]);

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const persistProject = (status: ProjectStatus, hasLandingPage?: boolean) => {
    const now = new Date().toISOString();
    const existing = getFounderProjectById(projectId);
    const startupName = formData.basicInfo.startupName.trim() || "Untitled Startup";
    const project = {
      id: projectId,
      slug: slugifyStartupName(startupName),
      status,
      score: existing?.score ?? 88,
      hasLandingPage: hasLandingPage ?? formData.hasLandingPage,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      basicInfo: formData.basicInfo,
      problemSolution: formData.problemSolution,
      product: formData.product,
      market: formData.market,
      business: formData.business,
      funding: formData.funding,
    };
    upsertFounderProject(project);
    return project;
  };

  const handleSaveDraft = () => {
    setProjectStatus("Draft");
    persistProject("Draft");
    alert(T.review.draftSaved);
  };

  const handlePublish = () => {
    if (!confirmSubmit) {
      alert(T.review.confirmSubmit);
      return;
    }
    setProjectStatus("Published");
    persistProject("Published");
    alert(T.review.submitSuccess);
    router.push(`/${locale}/workspace/projects`);
  };

  const handleCreateLandingPage = () => {
    const startupName = formData.basicInfo.startupName.trim();
    if (!startupName) {
      alert(T.review.landingRequiresName);
      return;
    }

    const saved = persistProject(projectStatus, true);
    setFormData((prev) => ({ ...prev, hasLandingPage: true }));
    alert(T.review.landingGenerated);
    router.push(`/${locale}/startup/${saved.slug}`);
  };

  const jumpToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = (section: Exclude<keyof ProjectFormData, "hasLandingPage">, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleAssistantSend = () => {
    if (!assistantInput.trim()) return;
    const message = assistantInput.trim();
    setAssistantMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: T.assistant.suggestions.market },
    ]);
    setAssistantInput("");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-24 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => router.push(`/${locale}/workspace`)} className="hover:text-black">
            {T.breadcrumb.workspace}
          </button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => router.push(`/${locale}/workspace/projects`)} className="hover:text-black">
            {T.breadcrumb.projects}
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black font-medium">{T.breadcrumb.create}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <button
              onClick={() => router.push(`/${locale}/workspace/projects`)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {T.backToProjects}
            </button>
            <h1 className="text-3xl font-bold text-black mb-2">{isEditMode ? `${dict.common.edit}: ${T.title}` : T.title}</h1>
            <p className="text-gray-600">{T.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button variant="outline" onClick={() => router.push(`/${locale}/workspace/projects/create/template`)}>
              {T.changeTemplate}
            </Button>
            {selectedTemplate ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFF8D6] text-[#111111] border border-[#FFD600]">
                {T.templates[selectedTemplate].title}
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {T.stepOf.replace("{{current}}", currentStep.toString()).replace("{{total}}", totalSteps.toString())}
            </span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#FFD600] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 overflow-x-auto gap-2">
            {[T.step1, T.step2, T.step3, T.step4, T.step5, T.step6, T.step7].map((label, idx) => (
              <button
                key={idx}
                onClick={() => jumpToStep(idx + 1)}
                className={`text-xs whitespace-nowrap ${
                  idx + 1 === currentStep
                    ? "text-black font-semibold"
                    : idx + 1 < currentStep
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Card className="rounded-xl shadow-md border-0 mb-6 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-2xl">
              {currentStep === 1 && T.basicInfo.title}
              {currentStep === 2 && T.problemSolution.title}
              {currentStep === 3 && T.product.title}
              {currentStep === 4 && T.market.title}
              {currentStep === 5 && T.business.title}
              {currentStep === 6 && T.funding.title}
              {currentStep === 7 && T.review.title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && T.basicInfo.subtitle}
              {currentStep === 2 && T.problemSolution.subtitle}
              {currentStep === 3 && T.product.subtitle}
              {currentStep === 4 && T.market.subtitle}
              {currentStep === 5 && T.business.subtitle}
              {currentStep === 6 && T.funding.subtitle}
              {currentStep === 7 && T.review.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="startupName">{T.basicInfo.startupName} *</Label>
                    <Input id="startupName" placeholder={T.basicInfo.startupNamePlaceholder} value={formData.basicInfo.startupName} onChange={(e) => updateFormData("basicInfo", "startupName", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">{T.basicInfo.foundedYear} *</Label>
                    <Input id="foundedYear" type="number" placeholder={T.basicInfo.foundedYearPlaceholder} value={formData.basicInfo.foundedYear} onChange={(e) => updateFormData("basicInfo", "foundedYear", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="teamSize">{T.basicInfo.teamSize} *</Label>
                    <Input id="teamSize" type="number" placeholder={T.basicInfo.teamSizePlaceholder} value={formData.basicInfo.teamSize} onChange={(e) => updateFormData("basicInfo", "teamSize", e.target.value)} className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="headquarters">{T.basicInfo.headquarters} *</Label>
                    <Input id="headquarters" placeholder={T.basicInfo.headquartersPlaceholder} value={formData.basicInfo.headquarters} onChange={(e) => updateFormData("basicInfo", "headquarters", e.target.value)} className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="website">{T.basicInfo.website}</Label>
                    <Input id="website" type="url" placeholder={T.basicInfo.websitePlaceholder} value={formData.basicInfo.website} onChange={(e) => updateFormData("basicInfo", "website", e.target.value)} className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="industry">{T.basicInfo.industry} *</Label>
                    <Select value={formData.basicInfo.industry} onValueChange={(value) => updateFormData("basicInfo", "industry", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={T.basicInfo.industryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">{T.industries.ai}</SelectItem>
                        <SelectItem value="fintech">{T.industries.fintech}</SelectItem>
                        <SelectItem value="healthtech">{T.industries.healthtech}</SelectItem>
                        <SelectItem value="edtech">{T.industries.edtech}</SelectItem>
                        <SelectItem value="saas">{T.industries.saas}</SelectItem>
                        <SelectItem value="ecommerce">{T.industries.ecommerce}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Founder Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="founderName">{T.basicInfo.founderName} *</Label>
                      <Input id="founderName" placeholder={T.basicInfo.founderNamePlaceholder} value={formData.basicInfo.founderName} onChange={(e) => updateFormData("basicInfo", "founderName", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="founderEmail">{T.basicInfo.founderEmail} *</Label>
                      <Input id="founderEmail" type="email" placeholder={T.basicInfo.founderEmailPlaceholder} value={formData.basicInfo.founderEmail} onChange={(e) => updateFormData("basicInfo", "founderEmail", e.target.value)} className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="linkedin">{T.basicInfo.linkedin}</Label>
                      <Input id="linkedin" type="url" placeholder={T.basicInfo.linkedinPlaceholder} value={formData.basicInfo.linkedin} onChange={(e) => updateFormData("basicInfo", "linkedin", e.target.value)} className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="problem">{T.problemSolution.problem} *</Label>
                  <Textarea id="problem" placeholder={T.problemSolution.problemPlaceholder} value={formData.problemSolution.problem} onChange={(e) => updateFormData("problemSolution", "problem", e.target.value)} className="mt-1 min-h-[120px]" />
                </div>
                <div>
                  <Label htmlFor="solution">{T.problemSolution.solution} *</Label>
                  <Textarea id="solution" placeholder={T.problemSolution.solutionPlaceholder} value={formData.problemSolution.solution} onChange={(e) => updateFormData("problemSolution", "solution", e.target.value)} className="mt-1 min-h-[120px]" />
                </div>
                <div>
                  <Label htmlFor="valueProposition">{T.problemSolution.valueProposition} *</Label>
                  <Textarea id="valueProposition" placeholder={T.problemSolution.valuePropositionPlaceholder} value={formData.problemSolution.valueProposition} onChange={(e) => updateFormData("problemSolution", "valueProposition", e.target.value)} className="mt-1 min-h-[120px]" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="stage">{T.product.stage} *</Label>
                  <Select value={formData.product.stage} onValueChange={(value) => updateFormData("product", "stage", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder={T.product.stagePlaceholder} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">{T.stages.idea}</SelectItem>
                      <SelectItem value="mvp">{T.stages.mvp}</SelectItem>
                      <SelectItem value="beta">{T.stages.beta}</SelectItem>
                      <SelectItem value="launched">{T.stages.launched}</SelectItem>
                      <SelectItem value="scaling">{T.stages.scaling}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="productDescription">{T.product.description} *</Label>
                  <Textarea id="productDescription" placeholder={T.product.descriptionPlaceholder} value={formData.product.description} onChange={(e) => updateFormData("product", "description", e.target.value)} className="mt-1 min-h-[120px]" />
                </div>
                <div>
                  <Label htmlFor="techStack">{T.product.techStack}</Label>
                  <Input id="techStack" placeholder={T.product.techStackPlaceholder} value={formData.product.techStack} onChange={(e) => updateFormData("product", "techStack", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="demoLink">{T.product.demoLink}</Label>
                  <Input id="demoLink" type="url" placeholder={T.product.demoLinkPlaceholder} value={formData.product.demoLink} onChange={(e) => updateFormData("product", "demoLink", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="screenshots">{T.product.screenshots}</Label>
                  <Input id="screenshots" placeholder="https://..." value={formData.product.screenshots} onChange={(e) => updateFormData("product", "screenshots", e.target.value)} className="mt-1" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="targetMarket">{T.market.targetMarket} *</Label>
                  <Textarea id="targetMarket" placeholder={T.market.targetMarketPlaceholder} value={formData.market.targetMarket} onChange={(e) => updateFormData("market", "targetMarket", e.target.value)} className="mt-1 min-h-[100px]" />
                </div>
                <div>
                  <Label htmlFor="marketSize">{T.market.marketSize}</Label>
                  <Input id="marketSize" placeholder={T.market.marketSizePlaceholder} value={formData.market.marketSize} onChange={(e) => updateFormData("market", "marketSize", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="customerSegment">{T.market.customerSegment} *</Label>
                  <Textarea id="customerSegment" placeholder={T.market.customerSegmentPlaceholder} value={formData.market.customerSegment} onChange={(e) => updateFormData("market", "customerSegment", e.target.value)} className="mt-1 min-h-[100px]" />
                </div>
                <div>
                  <Label htmlFor="competitors">{T.market.competitors}</Label>
                  <Textarea id="competitors" placeholder={T.market.competitorsPlaceholder} value={formData.market.competitors} onChange={(e) => updateFormData("market", "competitors", e.target.value)} className="mt-1 min-h-[100px]" />
                </div>
                <div>
                  <Label htmlFor="competitiveAdvantage">{T.market.competitiveAdvantage} *</Label>
                  <Textarea id="competitiveAdvantage" placeholder={T.market.competitiveAdvantagePlaceholder} value={formData.market.competitiveAdvantage} onChange={(e) => updateFormData("market", "competitiveAdvantage", e.target.value)} className="mt-1 min-h-[100px]" />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="revenueModel">{T.business.revenueModel} *</Label>
                  <Select value={formData.business.revenueModel} onValueChange={(value) => updateFormData("business", "revenueModel", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder={T.business.revenueModelPlaceholder} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">{T.revenueModels.subscription}</SelectItem>
                      <SelectItem value="transaction">{T.revenueModels.transaction}</SelectItem>
                      <SelectItem value="saas">{T.revenueModels.saas}</SelectItem>
                      <SelectItem value="marketplace">{T.revenueModels.marketplace}</SelectItem>
                      <SelectItem value="advertising">{T.revenueModels.advertising}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pricingStrategy">{T.business.pricingStrategy} *</Label>
                  <Textarea id="pricingStrategy" placeholder={T.business.pricingStrategyPlaceholder} value={formData.business.pricingStrategy} onChange={(e) => updateFormData("business", "pricingStrategy", e.target.value)} className="mt-1 min-h-[100px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyRevenue">{T.business.monthlyRevenue}</Label>
                    <Input id="monthlyRevenue" type="number" placeholder={T.business.monthlyRevenuePlaceholder} value={formData.business.monthlyRevenue} onChange={(e) => updateFormData("business", "monthlyRevenue", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="activeUsers">{T.business.activeUsers}</Label>
                    <Input id="activeUsers" type="number" placeholder={T.business.activeUsersPlaceholder} value={formData.business.activeUsers} onChange={(e) => updateFormData("business", "activeUsers", e.target.value)} className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fundingStage">{T.funding.fundingStage} *</Label>
                  <Select value={formData.funding.fundingStage} onValueChange={(value) => updateFormData("funding", "fundingStage", value)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder={T.funding.fundingStagePlaceholder} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bootstrapped">{T.fundingStages.bootstrapped}</SelectItem>
                      <SelectItem value="preseed">{T.fundingStages.preseed}</SelectItem>
                      <SelectItem value="seed">{T.fundingStages.seed}</SelectItem>
                      <SelectItem value="seriesA">{T.fundingStages.seriesA}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalFunding">{T.funding.totalFunding}</Label>
                    <Input id="totalFunding" type="number" placeholder={T.funding.totalFundingPlaceholder} value={formData.funding.totalFunding} onChange={(e) => updateFormData("funding", "totalFunding", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="investmentNeeded">{T.funding.investmentNeeded} *</Label>
                    <Input id="investmentNeeded" type="number" placeholder={T.funding.investmentNeededPlaceholder} value={formData.funding.investmentNeeded} onChange={(e) => updateFormData("funding", "investmentNeeded", e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pitchDeck">{T.funding.pitchDeck}</Label>
                    <Input id="pitchDeck" placeholder="https://..." value={formData.funding.pitchDeck} onChange={(e) => updateFormData("funding", "pitchDeck", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="financials">{T.funding.financials}</Label>
                    <Input id="financials" placeholder="https://..." value={formData.funding.financials} onChange={(e) => updateFormData("funding", "financials", e.target.value)} className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#FFD600]" />{T.review.sectionBasic}</h3>
                    <Button variant="ghost" size="sm" onClick={() => jumpToStep(1)}><Edit2 className="h-4 w-4 mr-1" />{T.edit}</Button>
                  </div>
                  <div className="mb-3">
                    <span className="text-xs text-gray-600 mr-2">{T.status}:</span>
                    <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border ${projectStatus === "Published"
                      ? "bg-[#FFF8D6] text-[#111111] border-[#FFD600]"
                      : "bg-white text-[#555555] border-[#EAEAEA]"
                      }`}>
                      {projectStatus === "Published" ? T.statusPublished : T.statusDraft}
                    </span>
                    {formData.hasLandingPage ? (
                      <span className="ml-2 inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full border bg-[#FFF8D6] text-[#111111] border-[#FFD600]">
                        {dict.workspace.startup.landingPageActive}
                      </span>
                    ) : null}
                  </div>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><dt className="text-gray-600">{T.basicInfo.startupName}</dt><dd className="font-medium">{formData.basicInfo.startupName || "-"}</dd></div>
                    <div><dt className="text-gray-600">{T.basicInfo.foundedYear}</dt><dd className="font-medium">{formData.basicInfo.foundedYear || "-"}</dd></div>
                    <div><dt className="text-gray-600">{T.basicInfo.headquarters}</dt><dd className="font-medium">{formData.basicInfo.headquarters || "-"}</dd></div>
                    <div><dt className="text-gray-600">{T.basicInfo.industry}</dt><dd className="font-medium">{formData.basicInfo.industry || "-"}</dd></div>
                  </dl>
                </div>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Checkbox id="confirm" checked={confirmSubmit} onCheckedChange={(checked) => setConfirmSubmit(checked as boolean)} />
                  <label htmlFor="confirm" className="text-sm cursor-pointer">{T.review.confirmSubmit}</label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {T.back}
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {T.saveDraft}
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black flex items-center gap-2">
                {T.next}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button onClick={handlePublish} disabled={!confirmSubmit} className="bg-black hover:bg-black/90 text-white flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {T.publish}
                </Button>
                <Button onClick={handleCreateLandingPage} disabled={!confirmSubmit} className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black flex items-center gap-2">
                  {T.createLandingPage}
                </Button>
              </>
            )}
          </div>
        </div>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit">
            <Card className="rounded-xl shadow-md border border-[#EAEAEA] bg-white">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-[18px] text-black flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#FFD600]" />
                  {T.assistant.title}
                </CardTitle>
                <CardDescription>{T.assistant.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-2 max-h-[280px] overflow-auto pr-1">
                  {assistantMessages.map((item, idx) => (
                    <div key={idx} className={`rounded-lg px-3 py-2 text-[13px] ${item.role === "assistant" ? "bg-[#F7F7F7] text-[#222222]" : "bg-[#111111] text-white"}`}>
                      {item.content}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-gray-700 mb-2">{T.assistant.chipTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {[T.assistant.suggestions.problem, T.assistant.suggestions.value, T.assistant.suggestions.market].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setAssistantInput(chip)}
                        className="text-[12px] px-2.5 py-1.5 rounded-full border border-[#EAEAEA] hover:border-[#FFD600] hover:bg-[#FFFBF0] transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder={T.assistant.typePlaceholder}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAssistantSend();
                    }}
                  />
                  <Button onClick={handleAssistantSend} className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">
                    {T.assistant.send}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
