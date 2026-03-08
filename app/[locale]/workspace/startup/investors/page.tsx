"use client";

import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useDictionary } from "@/lib/dict-context";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { loadFounderProjects } from "@/lib/project-store";
import {
  createDeal,
  findDeal,
  getStartupRequests,
  updateInvestmentRequestStatus,
  type InvestmentRequest,
} from "@/lib/investment-store";
import { createNotification } from "@/lib/notification-store";

const RECOMMENDED = [
  { id: "i1", firmName: "Mekong Capital", focus: ["Fintech", "Consumer"], stages: ["Seed", "Series A"], ticket: "$500k–$3M", portfolio: 48, seed: "mekong", why: "Matched to your Fintech profile" },
  { id: "i2", firmName: "Do Ventures", focus: ["SaaS", "Deep Tech"], stages: ["Pre-seed", "Seed"], ticket: "$100k–$1M", portfolio: 31, seed: "doventures", why: "Active in your industry & stage" },
  { id: "i5", firmName: "Vertex Ventures", focus: ["SaaS", "Fintech"], stages: ["Seed", "Series A"], ticket: "$500k–$5M", portfolio: 44, seed: "vertex", why: "Strong regional fintech thesis" },
];

const INTERESTED = [
  { id: "i3", firmName: "Monk's Hill", focus: ["Fintech"], stages: ["Series A"], ticket: "$1M–$8M", portfolio: 27, seed: "monkshill", viewedAt: "Yesterday" },
];

const SAVED = [
  { id: "i4", firmName: "500 Startups VN", focus: ["Agritech", "Logistics"], stages: ["Pre-seed", "Seed"], ticket: "$50k–$500k", portfolio: 62, seed: "500startups", savedAt: "3d ago" },
];

interface InvData {
  id: string; firmName: string; focus: string[]; stages: string[];
  ticket: string; portfolio: number; seed: string;
  why?: string; viewedAt?: string; savedAt?: string;
}

function InvestorCard({ inv, badge, cta }: {
  inv: InvData;
  badge?: React.ReactNode;
  cta: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-[10px] p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[14px] font-bold text-[#111111]">{inv.firmName}</p>
          <p className="text-[11px] text-[#888888] mt-0.5">{inv.portfolio} portfolio co. · {inv.ticket}</p>
        </div>
        {badge}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {inv.focus.map(f => (
          <span key={f} className="text-[10px] font-semibold bg-[#FFFBF0] border border-[#F4B400]/40 text-[#B88A00] px-2 py-0.5 rounded-full">{f}</span>
        ))}
        {inv.stages.map(s => (
          <span key={s} className="text-[10px] font-semibold bg-[#F5F5F5] text-[#555555] px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
      {inv.why && <p className="text-[11px] text-[#888888] italic">{inv.why}</p>}
      {inv.viewedAt && <p className="text-[11px] text-green-600 font-semibold">👁 Viewed your pitch · {inv.viewedAt}</p>}
      {inv.savedAt && <p className="text-[11px] text-[#AAAAAA]">Saved {inv.savedAt}</p>}
      {cta}
    </div>
  );
}

export default function StartupInvestorsPage() {
  const dict = useDictionary();
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "vi";
  const [tab, setTab] = useState<"suggested" | "requests">("suggested");
  const [refreshAt, setRefreshAt] = useState(0);

  const requests = useMemo(() => {
    const startupIds = loadFounderProjects().map((project) => project.id);
    return getStartupRequests(startupIds);
  }, [refreshAt]);

  const handleDecision = (item: InvestmentRequest, decision: "accepted" | "rejected") => {
    updateInvestmentRequestStatus(item.id, decision);

    if (decision === "accepted") {
      const existing = findDeal(item.startup_id, item.investor_id);
      const deal = existing ?? createDeal({
        startup_id: item.startup_id,
        startup_name: item.startup_name,
        investor_id: item.investor_id,
        investor_name: item.investor_name,
      });

      createNotification({
        recipient_role: "INVESTOR",
        recipient_id: item.investor_id,
        type: "deal_update",
        title: "Your investment request was accepted",
        description: `Founder accepted your request for ${item.startup_name ?? "this startup"}.`,
        link: `/${locale}/workspace/deal-room/${deal.id}`,
        avatar: "deal",
      });
    }

    setRefreshAt(Date.now());
  };

  return (
    <WorkspaceLayout title={dict.workspace.startup.investors} subtitle={dict.workspace.startup.investorsSub}>
      <div className="space-y-5">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("suggested")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "suggested" ? "bg-[#111111] text-white" : "bg-white border border-[#EAEAEA] text-[#555555]"}`}
          >
            Suggested Investors
          </button>
          <button
            onClick={() => setTab("requests")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "requests" ? "bg-[#111111] text-white" : "bg-white border border-[#EAEAEA] text-[#555555]"}`}
          >
            Investment Requests
          </button>
        </div>

        {tab === "suggested" ? (
          <div className="space-y-10">
            <section>
              <h2 className="text-[11px] font-bold text-[#F4B400] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.aiRecommended}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {RECOMMENDED.map(inv => (
                  <InvestorCard key={inv.id} inv={inv} cta={
                    <button className="mt-auto w-full text-[12.5px] font-semibold bg-[#111111] text-white py-2 rounded-[8px] hover:bg-[#F4B400] hover:text-[#111111] transition-colors">
                      Request Intro →
                    </button>
                  } />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-bold text-[#111111] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.interested}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {INTERESTED.map(inv => (
                  <InvestorCard key={inv.id} inv={inv}
                    badge={<span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">Interested</span>}
                    cta={
                      <button className="mt-auto w-full text-[12.5px] font-semibold border border-[#111111] text-[#111111] py-2 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors">
                        Follow Up →
                      </button>
                    }
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-bold text-[#888888] uppercase tracking-[0.14em] mb-4">{dict.workspace.startup.saved}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SAVED.map(inv => (
                  <InvestorCard key={inv.id} inv={inv} cta={
                    <button className="mt-auto w-full text-[12.5px] font-semibold border border-[#EAEAEA] text-[#888888] py-2 rounded-[8px] hover:border-[#111111] hover:text-[#111111] transition-colors">
                      View Firm Profile →
                    </button>
                  } />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <section className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EAEAEA] text-[13px] font-bold text-[#111111]">
              Founder Investment Requests
            </div>
            {requests.length === 0 ? (
              <div className="p-5 text-sm text-[#888888]">No investment requests yet.</div>
            ) : (
              <div className="divide-y divide-[#F2F2F2]">
                {requests.map((item) => {
                  const deal = findDeal(item.startup_id, item.investor_id);
                  return (
                    <div key={item.id} className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-[13px] font-bold text-[#111111]">{item.investor_name ?? item.investor_id}</p>
                        <p className="text-[12px] text-[#666666] mt-1">{item.message}</p>
                        <p className="text-[11px] text-[#888888] mt-1">Amount: {item.amount_range} • {new Date(item.created_at).toLocaleString()}</p>
                        <p className="text-[11px] mt-1 font-semibold uppercase text-[#555555]">Status: {item.status}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.status === "pending" ? (
                          <>
                            <button
                              onClick={() => handleDecision(item, "accepted")}
                              className="px-3 py-2 bg-[#111111] text-white text-sm rounded-lg"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDecision(item, "rejected")}
                              className="px-3 py-2 border border-[#EAEAEA] text-sm rounded-lg"
                            >
                              Reject
                            </button>
                          </>
                        ) : null}
                        {deal ? (
                          <Link
                            href={`/${locale}/workspace/deal-room/${deal.id}`}
                            className="px-3 py-2 border border-[#111111] text-[#111111] text-sm rounded-lg"
                          >
                            Open Deal Room
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </WorkspaceLayout>
  );
}
