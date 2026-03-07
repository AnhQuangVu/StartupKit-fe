"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/lib/dict-context";
import { getFounderProjectById, type FounderProject } from "@/lib/project-store";

const FALLBACK_PREVIEW: Record<string, FounderProject> = {
  s1: {
    id: "s1",
    slug: "agribot",
    status: "Published",
    score: 94,
    hasLandingPage: false,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
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
      revenueModel: "Subscription",
      pricingStrategy: "Per farm subscription",
      monthlyRevenue: "24000",
      activeUsers: "3200",
      growthRate: "18% MoM",
    },
    funding: {
      fundingStage: "Seed",
      totalFunding: "300000",
      investmentNeeded: "700000",
      equityOffered: "12",
      pitchDeck: "",
      financials: "",
    },
  },
  s6: {
    id: "s6",
    slug: "healthscore",
    status: "Draft",
    score: 82,
    hasLandingPage: false,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
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
      revenueModel: "Subscription",
      pricingStrategy: "Freemium + premium plan",
      monthlyRevenue: "0",
      activeUsers: "1200",
      growthRate: "12% MoM",
    },
    funding: {
      fundingStage: "Pre-seed",
      totalFunding: "0",
      investmentNeeded: "250000",
      equityOffered: "10",
      pitchDeck: "",
      financials: "",
    },
  },
};

export default function ProjectPreviewPage() {
  const dict = useDictionary();
  const { locale, id } = useParams() as { locale: string; id: string };
  const [project, setProject] = useState<FounderProject | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const item = getFounderProjectById(id) ?? FALLBACK_PREVIEW[id] ?? null;
    setProject(item);
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="min-h-screen bg-[#F5F5F5] pt-24 px-6" />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] pt-24 px-6">
        <div className="max-w-3xl mx-auto bg-white border border-[#EAEAEA] rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-[#111111] mb-2">Project not found</h1>
          <p className="text-[#666666] mb-5">The selected project does not exist or was removed.</p>
          <Link href={`/${locale}/workspace/projects`}>
            <Button className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-24 pb-10 px-6">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-[#111111]">{project.basicInfo.startupName || "-"}</h1>
            <p className="text-[#666666] mt-1">{project.problemSolution.valueProposition || "-"}</p>
          </div>
          <Link href={`/${locale}/workspace/projects/${project.id}/edit`}>
            <Button className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">{dict.common.edit}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="border border-[#EAEAEA] rounded-xl shadow-md md:col-span-2">
            <CardHeader><CardTitle>Problem</CardTitle></CardHeader>
            <CardContent><p className="text-[#555555] whitespace-pre-wrap">{project.problemSolution.problem || "-"}</p></CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
            <CardHeader><CardTitle>Solution</CardTitle></CardHeader>
            <CardContent><p className="text-[#555555] whitespace-pre-wrap">{project.problemSolution.solution || "-"}</p></CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
            <CardHeader><CardTitle>Product</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[#555555] whitespace-pre-wrap mb-2">{project.product.description || "-"}</p>
              {project.product.demoLink ? (
                <a href={project.product.demoLink} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">
                  Demo Link
                </a>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
            <CardHeader><CardTitle>Market</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[#555555]">
              <p><span className="font-semibold text-[#111111]">Target:</span> {project.market.targetMarket || "-"}</p>
              <p><span className="font-semibold text-[#111111]">Size:</span> {project.market.marketSize || "-"}</p>
            </CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
            <CardHeader><CardTitle>Business Model</CardTitle></CardHeader>
            <CardContent><p className="text-[#555555] whitespace-pre-wrap">{project.business.revenueModel || "-"}</p></CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
            <CardHeader><CardTitle>Traction</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[#555555]">
              <p><span className="font-semibold text-[#111111]">Users:</span> {project.business.activeUsers || "-"}</p>
              <p><span className="font-semibold text-[#111111]">Revenue:</span> {project.business.monthlyRevenue || "-"}</p>
            </CardContent>
          </Card>

          <Card className="border border-[#EAEAEA] rounded-xl shadow-md md:col-span-2">
            <CardHeader><CardTitle>Funding</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[#555555]">
              <p><span className="font-semibold text-[#111111]">Stage:</span> {project.funding.fundingStage || "-"}</p>
              <p><span className="font-semibold text-[#111111]">Investment Needed:</span> {project.funding.investmentNeeded || "-"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
