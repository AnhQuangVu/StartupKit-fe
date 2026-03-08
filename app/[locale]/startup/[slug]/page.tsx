"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/lib/dict-context";
import { useAuth } from "@/lib/auth-context";
import { createInvestmentRequest } from "@/lib/investment-store";
import { createNotification } from "@/lib/notification-store";

const LANDING_PROJECTS_STORAGE_KEY = "startupkit_founder_projects";

type LandingProject = {
  id?: string;
  slug: string;
  startupName: string;
  tagline?: string;
  website?: string;
  founderName?: string;
  founderEmail?: string;
  founderLinkedin?: string;
  problem?: string;
  solution?: string;
  productDescription?: string;
  demoLink?: string;
  targetMarket?: string;
  marketSize?: string;
  revenueModel?: string;
  activeUsers?: string;
  monthlyRevenue?: string;
  fundingStage?: string;
  investmentNeeded?: string;
  basicInfo?: {
    startupName?: string;
    website?: string;
    founderName?: string;
    founderEmail?: string;
    linkedin?: string;
  };
  problemSolution?: {
    problem?: string;
    solution?: string;
    valueProposition?: string;
  };
  product?: {
    description?: string;
    demoLink?: string;
  };
  market?: {
    targetMarket?: string;
    marketSize?: string;
  };
  business?: {
    revenueModel?: string;
    activeUsers?: string;
    monthlyRevenue?: string;
  };
  funding?: {
    fundingStage?: string;
    investmentNeeded?: string;
  };
};

const FALLBACK_DATA: Record<string, LandingProject> = {
  "agribot-ai": {
    id: "s1",
    slug: "agribot-ai",
    startupName: "AgriBot AI",
    tagline: "AI crop intelligence for smallholder farmers",
    website: "https://agribot.vn",
    founderName: "Nguyen Minh",
    founderEmail: "founder@agribot.vn",
    founderLinkedin: "https://linkedin.com/in/nguyenminh",
    problem: "Farmers lack real-time crop insights, leading to unpredictable yield and avoidable losses.",
    solution: "AgriBot combines lightweight sensors and predictive AI to provide timely decisions via mobile.",
    productDescription: "A mobile-first crop monitoring platform with weather risk alerts and yield forecasting.",
    demoLink: "https://demo.agribot.vn",
    targetMarket: "Rice and fruit farmers in Southeast Asia",
    marketSize: "$1.2B serviceable market",
    revenueModel: "Subscription + enterprise cooperatives",
    activeUsers: "3,200",
    monthlyRevenue: "$24,000",
    fundingStage: "Seed",
    investmentNeeded: "$700,000",
  },
};

export default function StartupLandingPage() {
  const params = useParams() as { locale: string; slug: string };
  const locale = params.locale;
  const slug = params.slug;
  const { user } = useAuth();
  const dict = useDictionary();
  const L = dict.workspace.startup.createForm.landingPage;
  const [project, setProject] = useState<LandingProject | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState("");
  const [amountRange, setAmountRange] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(LANDING_PROJECTS_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as LandingProject[];
      const found = stored.find((item) => item.slug === slug);
      if (found) {
        setProject(found);
        return;
      }
    }

    setProject(FALLBACK_DATA[slug] ?? null);
  }, [slug]);

  const startupName = project?.basicInfo?.startupName || project?.startupName || "-";
  const tagline = project?.problemSolution?.valueProposition || project?.tagline || "-";
  const website = project?.basicInfo?.website || project?.website;
  const founderName = project?.basicInfo?.founderName || project?.founderName || "Founder";
  const founderEmail = project?.basicInfo?.founderEmail || project?.founderEmail;
  const founderLinkedin = project?.basicInfo?.linkedin || project?.founderLinkedin;
  const problem = project?.problemSolution?.problem || project?.problem || "-";
  const solution = project?.problemSolution?.solution || project?.solution || "-";
  const productDescription = project?.product?.description || project?.productDescription || "-";
  const demoLink = project?.product?.demoLink || project?.demoLink;
  const targetMarket = project?.market?.targetMarket || project?.targetMarket || "-";
  const marketSize = project?.market?.marketSize || project?.marketSize || "-";
  const revenueModel = project?.business?.revenueModel || project?.revenueModel || "-";
  const activeUsers = project?.business?.activeUsers || project?.activeUsers || "-";
  const monthlyRevenue = project?.business?.monthlyRevenue || project?.monthlyRevenue || "-";
  const fundingStage = project?.funding?.fundingStage || project?.fundingStage || "-";
  const investmentNeeded = project?.funding?.investmentNeeded || project?.investmentNeeded || "-";

  const contactHref = useMemo(() => {
    if (founderLinkedin) return founderLinkedin;
    if (founderEmail) return `mailto:${founderEmail}`;
    return `/${locale}/workspace/startup/projects`;
  }, [founderEmail, founderLinkedin, locale]);

  const handleRequestInvestment = () => {
    if (!project || user?.role !== "INVESTOR") return;
    const trimmedMessage = message.trim();
    const trimmedAmount = amountRange.trim();
    if (!trimmedMessage || !trimmedAmount) return;

    const request = createInvestmentRequest({
      startup_id: project.id || project.slug,
      startup_slug: project.slug,
      startup_name: startupName,
      investor_id: user.id,
      investor_name: user.name,
      message: trimmedMessage,
      amount_range: trimmedAmount,
      notes: notes.trim(),
    });

    createNotification({
      recipient_role: "STARTUP",
      type: "deal_interest",
      title: "An investor is interested in your startup.",
      description: `${user.name} requested investment in ${startupName}.`,
      link: `/${locale}/workspace/notifications`,
      avatar: user.avatarSeed,
    });

    setShowRequestModal(false);
    setMessage("");
    setAmountRange("");
    setNotes("");
    window.alert(`Investment request submitted (${request.id}).`);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center border border-[#EAEAEA] rounded-xl p-10">
          <h1 className="text-2xl font-bold text-[#111111] mb-2">Startup page not found</h1>
          <p className="text-[#666666] mb-6">This landing page has not been generated yet.</p>
          <Link href={`/${locale}/workspace/projects`}>
            <Button className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <section className="bg-[#111111] text-white pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="inline-flex text-[11px] font-semibold bg-[#FFD600] text-black px-2.5 py-1 rounded-full mb-4">
            {dict.workspace.startup.landingPageActive}
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl">{startupName}</h1>
          <p className="text-white/80 mt-4 max-w-2xl text-lg">{tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contactHref} target="_blank" rel="noreferrer">
              <Button className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black font-semibold">{L.cta}</Button>
            </a>
            {user?.role === "INVESTOR" ? (
              <Button
                onClick={() => setShowRequestModal(true)}
                className="bg-white text-[#111111] hover:bg-[#F5F5F5]"
              >
                Request Investment
              </Button>
            ) : null}
            {website ? (
              <a href={website} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Website</Button>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="border border-[#EAEAEA] rounded-xl shadow-md md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3">{L.problem}</h2>
            <p className="text-[#555555] leading-relaxed">{problem}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.solution}</h3>
            <p className="text-[#555555] leading-relaxed">{solution}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.product}</h3>
            <p className="text-[#555555] leading-relaxed mb-3">{productDescription}</p>
            {demoLink ? (
              <a href={demoLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#111111] underline underline-offset-4">
                {L.demo}
              </a>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.market}</h3>
            <p className="text-sm text-[#666666]">{L.targetMarket}</p>
            <p className="font-semibold mb-3">{targetMarket}</p>
            <p className="text-sm text-[#666666]">{L.marketSize}</p>
            <p className="font-semibold">{marketSize}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.businessModel}</h3>
            <p className="text-sm text-[#666666]">{L.revenueModel}</p>
            <p className="font-semibold">{revenueModel}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.traction}</h3>
            <p className="text-sm text-[#666666]">{L.activeUsers}</p>
            <p className="font-semibold mb-3">{activeUsers}</p>
            <p className="text-sm text-[#666666]">{L.monthlyRevenue}</p>
            <p className="font-semibold">{monthlyRevenue}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-3">{L.funding}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#666666]">{L.fundingStage}</p>
                <p className="font-semibold">{fundingStage}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666]">{L.investmentOpportunity}</p>
                <p className="font-semibold">{investmentNeeded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#EAEAEA] rounded-xl shadow-md md:col-span-2">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold mb-1">{L.contact}</h3>
              <p className="text-[#555555]">{founderName}</p>
            </div>
            <a href={contactHref} target="_blank" rel="noreferrer">
              <Button className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-black">{L.contactFounder}</Button>
            </a>
          </CardContent>
        </Card>
      </main>

      {showRequestModal ? (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl border border-[#EAEAEA] p-6">
            <h3 className="text-[18px] font-bold text-[#111111] mb-1">Request Investment</h3>
            <p className="text-[12px] text-[#666666] mb-4">Send your interest and amount range to the founder.</p>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-semibold text-[#555555]">Investor message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 min-h-[96px] border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm"
                  placeholder="Tell the founder why you're interested..."
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#555555]">Estimated investment amount</label>
                <input
                  value={amountRange}
                  onChange={(e) => setAmountRange(e.target.value)}
                  className="w-full mt-1 border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm"
                  placeholder="$100,000 - $300,000"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#555555]">Optional note</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-1 min-h-[72px] border border-[#EAEAEA] rounded-lg px-3 py-2 text-sm"
                  placeholder="Due diligence focus, timeline, or meeting preference"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 border border-[#EAEAEA] rounded-lg text-sm text-[#111111]"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestInvestment}
                className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
