"use client";

import { useEffect, useState } from "react";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import { IconUpload } from "@/components/icons/WorkspaceIcons";
import { useDictionary } from "@/lib/dict-context";
import { useAuth } from "@/lib/auth-context";
import {
  addBillingTransaction,
  loadUserSubscription,
  saveUserSubscription,
  type PlanTier,
  type UserSubscriptionState,
} from "@/lib/billing-store";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl shadow-md bg-white border border-[#EAEAEA] p-6 flex flex-col gap-5">
      <h2 className="text-[14px] font-bold text-[#111111] pb-3 border-b border-[#F0F0F0]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-[#555555] uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "border border-[#EAEAEA] rounded-[8px] px-4 py-2.5 text-[13.5px] text-[#111111] outline-none focus:border-[#111111] transition-colors w-full";

const PLANS: {
  tier: PlanTier;
  name: string;
  priceDisplay: string;
  amountVnd: number;
  features: string[];
  badge?: string;
}[] = [
  {
    tier: "FREE",
    name: "Starter (Miễn phí)",
    priceDisplay: "0đ / tháng",
    amountVnd: 0,
    features: ["Tối đa 1 dự án khởi nghiệp", "5 lượt AI tạo mô tả/tháng", "Xem danh mục Marketplace cơ bản"],
  },
  {
    tier: "FOUNDER_PRO",
    name: "Founder Pro (Gói Tăng Trưởng)",
    priceDisplay: "499.000đ / tháng ($19)",
    amountVnd: 499000,
    badge: "Phổ biến nhất",
    features: [
      "Không giới hạn số lượng dự án & Landing Page",
      "Sử dụng AI Pitch Builder & Chấm điểm AI không giới hạn",
      "Mở phòng đàm phán bảo mật Deal Room & Ký NDA điện tử",
      "Ưu tiên kết nối trực tiếp với 10+ Quỹ đầu tư mạo hiểm",
    ],
  },
  {
    tier: "VC_ENTERPRISE",
    name: "Investor / Ecosystem VIP",
    priceDisplay: "999.000đ / tháng ($39)",
    amountVnd: 999000,
    features: [
      "Truy cập toàn bộ Financial Model & Data Room trên sàn",
      "Báo cáo thẩm định AI chuyên sâu (SWOT, Unit Economics)",
      "Hỗ trợ pháp lý Term Sheet & Ưu tiên duyệt Deal",
    ],
  },
];

export default function StartupSettingsPage() {
  const dict = useDictionary();
  const { user } = useAuth();
  const profile = dict.workspace.startup.founderProfile;
  const [role, setRole] = useState("Founder");
  const [language, setLanguage] = useState("vi");
  const [notifications, setNotifications] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const [subscription, setSubscription] = useState<UserSubscriptionState | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<(typeof PLANS)[number] | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setSubscription(loadUserSubscription());
  }, []);

  const handleConfirmVietQrPayment = () => {
    if (!checkoutPlan) return;
    setIsPaying(true);
    setTimeout(() => {
      const nextSub: UserSubscriptionState = {
        tier: checkoutPlan.tier,
        planName: checkoutPlan.name,
        priceDisplay: checkoutPlan.priceDisplay,
        renewsAt: "2026-12-10",
        aiCreditsRemaining: checkoutPlan.tier === "FREE" ? "5 lượt/tháng" : "Không giới hạn (Unlimited)",
        maxProjects: checkoutPlan.tier === "FREE" ? "1 dự án" : "Không giới hạn dự án & Deal Room",
      };
      saveUserSubscription(nextSub);
      setSubscription(nextSub);

      if (checkoutPlan.amountVnd > 0) {
        addBillingTransaction({
          user: user?.name || "Nguyễn Văn Minh (AgriBot Vietnam)",
          paymentType: "Subscription",
          planTier: checkoutPlan.tier,
          amount: checkoutPlan.priceDisplay,
          amountVnd: checkoutPlan.amountVnd,
          method: "VietQR (PayOS)",
          status: "Paid",
        });
      }

      setIsPaying(false);
      setCheckoutPlan(null);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3500);
    }, 600);
  };

  return (
    <WorkspaceLayout
      title={dict.workspace.startup.settings}
      subtitle={dict.workspace.startup.settingsSub}
      actions={
        <button
          onClick={() => {
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 3000);
          }}
          className="bg-[#FFD600] text-[#111111] text-[12.5px] font-bold px-4 py-2 rounded-[8px] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
        >
          {dict.common.saveChanges}
        </button>
      }
    >
      <div className="max-w-[860px] space-y-6">
        {savedNotice && (
          <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold">
            ✓ Đã lưu thay đổi cài đặt và cập nhật gói hội viên thành công!
          </div>
        )}

        {/* Billing & Subscription Plan (PayOS / VietQR) */}
        <Section title="Gói Hội Viên & Thanh Toán (PayOS / VietQR)">
          {subscription && (
            <div className="bg-[#FFFBF0] border border-[#F4B400] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#111111] text-[#F4B400] px-2.5 py-0.5 rounded-full">
                  Đang kích hoạt
                </span>
                <h3 className="text-base font-black text-[#111111] mt-1.5">{subscription.planName}</h3>
                <p className="text-xs text-[#555555]">
                  {subscription.priceDisplay} · Gia hạn tiếp theo: {subscription.renewsAt} · Quyền lợi:{" "}
                  {subscription.aiCreditsRemaining}
                </p>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
                ✓ VietQR Auto-Pay Active
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const isCurrent = subscription?.tier === plan.tier;
              return (
                <div
                  key={plan.tier}
                  className={`border rounded-xl p-4 flex flex-col justify-between ${
                    isCurrent ? "border-[#F4B400] bg-[#FFFDF7]" : "border-[#EAEAEA] bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[#111111]">{plan.name}</h4>
                      {plan.badge && (
                        <span className="text-[10px] font-bold bg-[#F4B400] text-[#111111] px-2 py-0.5 rounded-full">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-black text-[#111111] mb-3">{plan.priceDisplay}</p>
                    <ul className="space-y-1.5 text-xs text-[#555555] mb-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <span className="text-[#F4B400] font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    disabled={isCurrent}
                    onClick={() => setCheckoutPlan(plan)}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-[#F0F0F0] text-[#888888] cursor-default"
                        : "bg-[#111111] text-white hover:bg-[#F4B400] hover:text-[#111111]"
                    }`}
                  >
                    {isCurrent ? "Gói hiện tại" : "Nâng cấp qua VietQR →"}
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title={dict.workspace.startup.startupInfo}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={profile.fullName}>
              <input className={inputCls} defaultValue={user?.name || "Nguyễn Văn Minh"} />
            </Field>
            <Field label={profile.role}>
              <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value)}>
                <option>{profile.roleFounder}</option>
                <option>{profile.roleCEO}</option>
                <option>{profile.roleCTO}</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label={profile.bio}>
                <textarea
                  className={`${inputCls} resize-none h-24`}
                  defaultValue="Founder focused on building AI-first solutions for emerging market problems in Vietnam and Southeast Asia."
                />
              </Field>
            </div>
          </div>
        </Section>

        <Section title={dict.workspace.startup.logoAndCover}>
          <Field label={profile.avatar}>
            <div className="border-2 border-dashed border-[#EAEAEA] rounded-[8px] p-6 flex flex-col items-center gap-2 hover:border-[#FFD600] transition-colors cursor-pointer group">
              <IconUpload className="text-[#111111] group-hover:text-[#FFD600] transition-colors" size={24} />
              <span className="text-[12px] text-[#888888]">PNG, JPG · min 200×200</span>
            </div>
          </Field>
        </Section>

        <Section title={dict.workspace.startup.companyDetails}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={profile.skills}>
              <input className={inputCls} defaultValue="AI, Product Strategy, Go-to-Market" />
            </Field>
            <Field label={profile.experience}>
              <input className={inputCls} defaultValue="10 years building B2B & Agritech products" />
            </Field>
            <Field label={profile.linkedin}>
              <input className={inputCls} defaultValue="https://linkedin.com/in/nguyen-van-minh" />
            </Field>
            <Field label={profile.personalWebsite}>
              <input className={inputCls} defaultValue="https://agribot.vn" />
            </Field>
            <Field label={profile.email}>
              <input className={inputCls} type="email" defaultValue={user?.email || "minh@agribot.vn"} />
            </Field>
            <Field label={profile.password}>
              <input className={inputCls} type="password" defaultValue="********" />
            </Field>
            <Field label={profile.language}>
              <select className={inputCls} value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </Field>
            <Field label={profile.notifications}>
              <label className="inline-flex items-center gap-2 text-[13px] text-[#111111]">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>{notifications ? "Enabled" : "Disabled"}</span>
              </label>
            </Field>
          </div>
        </Section>
      </div>

      {/* PayOS / VietQR Checkout Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAEAEA] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFFBF0] border border-[#F4B400] text-[#111111] px-2 py-0.5 rounded-full">
                  Cổng thanh toán PayOS · Napas247
                </span>
                <h3 className="text-base font-bold text-[#111111] mt-1">Thanh toán {checkoutPlan.name}</h3>
              </div>
              <button onClick={() => setCheckoutPlan(null)} className="text-[#888888] hover:text-[#111111] font-bold">
                ✕
              </button>
            </div>

            <div className="bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-44 h-44 bg-white border-2 border-[#111111] rounded-xl p-3 flex flex-col items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                    `STARTUPKIT_PAYOS_${checkoutPlan.tier}_${checkoutPlan.amountVnd}`
                  )}`}
                  alt="VietQR Payment"
                  className="w-36 h-36 object-contain"
                />
              </div>
              <p className="text-sm font-black text-[#111111]">{checkoutPlan.priceDisplay}</p>
              <p className="text-xs text-[#666666] mt-0.5">
                Ngân hàng: <strong>MB Bank / Vietcombank (Napas247)</strong>
              </p>
              <p className="text-xs text-[#666666]">
                Nội dung CK: <code className="font-mono font-bold text-[#111111]">STK {checkoutPlan.tier}</code>
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCheckoutPlan(null)}
                className="px-4 py-2 text-xs font-semibold border border-[#EAEAEA] rounded-lg"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isPaying}
                onClick={handleConfirmVietQrPayment}
                className="px-5 py-2 text-xs font-bold bg-[#111111] text-[#F4B400] rounded-lg hover:bg-[#F4B400] hover:text-[#111111] transition-colors cursor-pointer"
              >
                {isPaying ? "Đang xác thực Webhook..." : "Xác nhận đã chuyển khoản ✓"}
              </button>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
