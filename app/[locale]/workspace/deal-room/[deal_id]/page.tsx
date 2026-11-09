"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { useAuth } from "@/lib/auth-context";
import {
  addDealRoomQuestion,
  getDealRoomById,
  loadDeals,
  upsertDealRoom,
} from "@/lib/investment-store";
import type { Locale } from "@/lib/i18n";

const STAGES = [
  "Inquiry",
  "NDA Signed",
  "Due Diligence",
  "Term Sheet",
  "Committed",
] as const;

export default function DealRoomPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "vi";
  const dealId = (params?.deal_id as string) || "deal-agribot-1";
  const allDeals = loadDeals();
  const deal = allDeals.find((item) => item.id === dealId) ?? allDeals[0];

  const [room, setRoom] = useState(() => getDealRoomById(deal?.id ?? dealId));
  const [questionText, setQuestionText] = useState("");
  const [ndaSigned, setNdaSigned] = useState(true);
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [pipelineStage, setPipelineStage] = useState<(typeof STAGES)[number]>("Due Diligence");
  const [savedToast, setSavedToast] = useState(false);

  const isFounder = user?.role === "STARTUP" || user?.role === "ADMIN" || !user;

  const handleSaveDocs = () => {
    upsertDealRoom(room);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleAsk = () => {
    const text = questionText.trim();
    if (!text) return;
    const from = user?.role === "INVESTOR" ? "investor" : "founder";
    const targetId = deal?.id ?? dealId;
    addDealRoomQuestion(targetId, from, text);
    setRoom(getDealRoomById(targetId));
    setQuestionText("");
  };

  if (!deal) {
    return (
      <WorkspaceLayout title="Deal Room" subtitle="No active deal">
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 text-sm text-[#666666]">
          Chưa có Deal nào được khởi tạo.
        </div>
      </WorkspaceLayout>
    );
  }

  return (
    <WorkspaceLayout
      title={`Deal Room: ${deal.startup_name ?? "AgriBot Vietnam"}`}
      subtitle={`Nhà đầu tư: ${deal.investor_name ?? "Mekong Tech Ventures"} • Trạng thái: ${pipelineStage}`}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNdaModal(true)}
            className="px-3 py-1.5 border border-[#EAEAEA] bg-white text-[#111111] text-xs font-bold rounded-lg hover:border-[#111111] cursor-pointer"
          >
            {ndaSigned ? "✓ Đã ký NDA bảo mật" : "Ký NDA điện tử"}
          </button>
          <Link
            href={`/${locale}/workspace/messages`}
            className="px-3 py-1.5 bg-[#111111] text-[#F4B400] text-xs font-bold rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors"
          >
            Nhắn tin trực tiếp →
          </Link>
        </div>
      }
    >
      <div className="space-y-5">
        {savedToast && (
          <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-2.5 rounded-xl text-xs font-bold">
            ✓ Đã cập nhật tài liệu thẩm định (Data Room) thành công!
          </div>
        )}

        {/* Deal Stage Pipeline */}
        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-bold text-[#111111] uppercase tracking-wider">
              Tiến độ thẩm định & Đàm phán (Deal Pipeline)
            </h2>
            <span className="text-xs font-semibold text-[#888888]">
              Phí thành công nền tảng khi giải ngân: <strong className="text-[#111111]">10% Success Fee</strong>
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {STAGES.map((st, idx) => {
              const activeIdx = STAGES.indexOf(pipelineStage);
              const done = idx <= activeIdx;
              return (
                <button
                  key={st}
                  onClick={() => setPipelineStage(st)}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer text-left ${
                    idx === activeIdx
                      ? "border-[#F4B400] bg-[#111111] text-[#F4B400]"
                      : done
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-[#EAEAEA] bg-[#FAFAFA] text-[#888888]"
                  }`}
                >
                  <span className="block text-[10px] opacity-75">Bước {idx + 1}</span>
                  {st}
                </button>
              );
            })}
          </div>
        </section>

        {/* Data Room Documents */}
        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#111111]">Hồ sơ thẩm định (Confidential Data Room)</h2>
            <span className="text-[11px] font-bold bg-[#FFFBF0] border border-[#F4B400] text-[#111111] px-2.5 py-0.5 rounded-full">
              Bảo vệ bởi NDA Điện Tử
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="text-[12px] font-semibold text-[#555555]">Financial Model & Cap Table (URL)</label>
              <input
                value={room.financial_docs_url ?? ""}
                onChange={(e) => setRoom((prev) => ({ ...prev, financial_docs_url: e.target.value }))}
                disabled={!isFounder}
                className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm"
                placeholder="https://.../financials.xlsx"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Chỉ số Traction & Unit Economics</label>
            <textarea
              value={room.traction_data ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, traction_data: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm min-h-[96px]"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#555555]">Hồ sơ Đội ngũ sáng lập & Cố vấn</label>
            <textarea
              value={room.team_notes ?? ""}
              onChange={(e) => setRoom((prev) => ({ ...prev, team_notes: e.target.value }))}
              disabled={!isFounder}
              className="w-full mt-1 px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm min-h-[90px]"
            />
          </div>

          {isFounder ? (
            <button
              onClick={handleSaveDocs}
              className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Lưu cập nhật Data Room
            </button>
          ) : null}
        </section>

        {/* Due Diligence Q&A */}
        <section className="bg-white border border-[#EAEAEA] rounded-xl p-5">
          <h2 className="text-[14px] font-bold text-[#111111] mb-3">
            Hỏi đáp thẩm định chuyên sâu (Due Diligence Q&A)
          </h2>
          <div className="space-y-2.5 mb-4">
            {room.questions.length === 0 ? (
              <p className="text-sm text-[#888888]">Chưa có câu hỏi thẩm định nào.</p>
            ) : (
              room.questions.map((question) => (
                <div
                  key={question.id}
                  className={`p-3.5 rounded-xl border ${
                    question.from === "investor"
                      ? "bg-[#FFFDF5] border-[#F4B400]/40"
                      : "bg-[#F8F8F8] border-[#EAEAEA]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                      {question.from === "founder" ? "🚀 Founder (Startup)" : "💼 Investor (VC Due Diligence)"}
                    </span>
                    <span className="text-[11px] text-[#888888]">
                      {new Date(question.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <p className="text-sm text-[#333333] leading-relaxed">{question.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="Nhập câu hỏi thẩm định hoặc câu trả lời cho nhà đầu tư..."
              className="flex-1 px-3.5 py-2.5 border border-[#EAEAEA] rounded-lg text-sm outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleAsk}
              className="px-5 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Gửi phản hồi
            </button>
          </div>
        </section>
      </div>

      {showNdaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3">
              <h3 className="text-base font-bold text-[#111111]">
                Thỏa thuận Bảo mật Thông tin Điện tử (Mutual NDA)
              </h3>
              <button onClick={() => setShowNdaModal(false)} className="text-[#888888] font-bold">
                ✕
              </button>
            </div>
            <div className="p-4 bg-[#F9F9F9] border border-[#EAEAEA] rounded-lg text-xs text-[#444444] space-y-2 leading-relaxed max-h-60 overflow-y-auto">
              <p>
                <strong>Bên tiết lộ (Startup):</strong> {deal.startup_name}
              </p>
              <p>
                <strong>Bên nhận thông tin (Investor):</strong> {deal.investor_name}
              </p>
              <p>
                1. Toàn bộ tài liệu tài chính, danh sách khách hàng, kiến trúc công nghệ và điều khoản gọi vốn trong
                Deal Room này được bảo mật tuyệt đối trong thời hạn 36 tháng.
              </p>
              <p>
                2. Không bên nào được phép sao chép hoặc tiết lộ cho bên thứ ba nếu chưa có sự đồng ý bằng văn bản.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNdaModal(false)}
                className="px-4 py-2 text-xs font-semibold border border-[#EAEAEA] rounded-lg"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setNdaSigned(true);
                  setShowNdaModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#111111] text-[#F4B400] rounded-lg cursor-pointer"
              >
                ✓ Xác nhận chữ ký số NDA
              </button>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
