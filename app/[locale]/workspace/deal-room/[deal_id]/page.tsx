"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useAuth } from "@/lib/auth-context";
import { addDealRoomQuestion, getDealRoomById, loadDeals, upsertDealRoom } from "@/lib/investment-store";
import type { Locale } from "@/lib/i18n";

export default function DealRoomPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "vi";
  const dealId = params?.deal_id as string;
  const deal = loadDeals().find((item) => item.id === dealId);

  const [room, setRoom] = useState(() => getDealRoomById(dealId));
  const [questionText, setQuestionText] = useState("");

  const isFounder = user?.role === "STARTUP";

  const canAccess = useMemo(() => {
    if (!user || !deal) return false;
    if (user.role === "STARTUP") return user.id === deal.startup_id;
    if (user.role === "INVESTOR") return user.id === deal.investor_id;
    return false;
  }, [deal, user]);

  const handleSaveDocs = () => {
    upsertDealRoom(room);
  };

  const handleAsk = () => {
    const text = questionText.trim();
    if (!text || !user) return;
    const from = user.role === "STARTUP" ? "founder" : "investor";
    addDealRoomQuestion(dealId, from, text);
    setRoom(getDealRoomById(dealId));
    setQuestionText("");
  };

  if (!deal || !canAccess) {
    return (
      <WorkspaceLayout title="Deal Room" subtitle="Access restricted">
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 text-sm text-[#666666]">
          Deal not found or you do not have access.
        </div>
      </WorkspaceLayout>
    );
  }

  return (
    <WorkspaceLayout
      title="Deal Room"
      subtitle={`${deal.startup_name ?? deal.startup_id} • ${deal.status}`}
      actions={
        <Link
          href={`/${locale}/workspace/messages`}
          className="px-3 py-1.5 bg-[#111111] text-white text-sm rounded-lg"
        >
          Message Founder
        </Link>
      }
    >
      <div className="space-y-5">
        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h2 className="text-[14px] font-bold text-[#111111] mb-3">Startup Overview</h2>
          <p className="text-sm text-[#555555]">Deal created at {new Date(deal.created_at).toLocaleString()}</p>
        </section>

        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5 space-y-4">
          <h2 className="text-[14px] font-bold text-[#111111]">Documents</h2>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Pitch Deck (PDF URL)</label>
            <input
              value={room.pitch_deck_url ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, pitch_deck_url: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
              placeholder="https://.../pitch-deck.pdf"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Financials (Document URL)</label>
            <input
              value={room.financial_docs_url ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, financial_docs_url: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
              placeholder="https://.../financials.pdf"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Traction</label>
            <textarea
              value={room.traction_data ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, traction_data: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm min-h-[90px]"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Team</label>
            <textarea
              value={room.team_notes ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, team_notes: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm min-h-[90px]"
            />
          </div>

          {isFounder ? (
            <button onClick={handleSaveDocs} className="px-4 py-2 bg-[#111111] text-white text-sm rounded-lg">
              Save Documents
            </button>
          ) : null}
        </section>

        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h2 className="text-[14px] font-bold text-[#111111] mb-3">Discussion</h2>
          <div className="space-y-2 mb-3">
            {room.questions.length === 0 ? (
              <p className="text-sm text-[#888888]">No questions yet.</p>
            ) : (
              room.questions.map((question) => (
                <div key={question.id} className="p-3 rounded-lg bg-[#F8F8F8]">
                  <p className="text-[12px] font-semibold text-[#111111] mb-1">{question.from === "founder" ? "Founder" : "Investor"}</p>
                  <p className="text-sm text-[#555555]">{question.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ask a due diligence question..."
              className="flex-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
            />
            <button onClick={handleAsk} className="px-4 py-2 border border-[#111111] text-[#111111] text-sm rounded-lg">
              Send
            </button>
          </div>
        </section>
      </div>
    </WorkspaceLayout>
  );
}
