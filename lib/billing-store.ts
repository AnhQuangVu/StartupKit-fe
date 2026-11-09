export const BILLING_TRANSACTIONS_KEY = "startupkit_billing_transactions";
export const BILLING_SUBSCRIPTION_KEY = "startupkit_active_subscription";

export type PlanTier = "FREE" | "FOUNDER_PRO" | "VC_ENTERPRISE";

export interface BillingTransaction {
  id: string;
  orderCode: number;
  user: string;
  paymentType: "Subscription" | "Featured Startup" | "Mentorship Booking" | "Deal Success Fee (10%)";
  planTier?: PlanTier;
  amount: string;
  amountVnd: number;
  method: "VietQR (PayOS)" | "VNPay" | "Visa/Mastercard";
  date: string;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
}

export interface UserSubscriptionState {
  tier: PlanTier;
  planName: string;
  priceDisplay: string;
  renewsAt: string;
  aiCreditsRemaining: string;
  maxProjects: string;
}

export const DEFAULT_SUBSCRIPTION: UserSubscriptionState = {
  tier: "FOUNDER_PRO",
  planName: "Founder Pro (Gói Tăng Trưởng)",
  priceDisplay: "499.000đ / tháng ($19/mo)",
  renewsAt: "2026-12-10",
  aiCreditsRemaining: "Không giới hạn (Unlimited AI Pitch)",
  maxProjects: "Không giới hạn dự án & Deal Room",
};

export const DEFAULT_TRANSACTIONS: BillingTransaction[] = [
  {
    id: "TXN-9001",
    orderCode: 26110901,
    user: "AgriBot Vietnam (Nguyễn Văn Minh)",
    paymentType: "Subscription",
    planTier: "FOUNDER_PRO",
    amount: "499.000đ ($19)",
    amountVnd: 499000,
    method: "VietQR (PayOS)",
    date: "2026-11-09",
    status: "Paid",
  },
  {
    id: "TXN-9002",
    orderCode: 26110804,
    user: "Mekong Tech Ventures (Trần Bảo Ngọc)",
    paymentType: "Subscription",
    planTier: "VC_ENTERPRISE",
    amount: "999.000đ ($39)",
    amountVnd: 999000,
    method: "VietQR (PayOS)",
    date: "2026-11-08",
    status: "Paid",
  },
  {
    id: "TXN-9003",
    orderCode: 26110712,
    user: "PayEase (Trần Thị Lan)",
    paymentType: "Featured Startup",
    amount: "2.990.000đ ($120)",
    amountVnd: 2990000,
    method: "VNPay",
    date: "2026-11-07",
    status: "Paid",
  },
  {
    id: "TXN-9004",
    orderCode: 26110619,
    user: "MediConnect (BS. Lê Hoàng)",
    paymentType: "Mentorship Booking",
    amount: "1.990.000đ ($80)",
    amountVnd: 1990000,
    method: "VietQR (PayOS)",
    date: "2026-11-06",
    status: "Paid",
  },
  {
    id: "TXN-9005",
    orderCode: 26110909,
    user: "LogiSmart Green (Đặng Quốc Khánh)",
    paymentType: "Featured Startup",
    amount: "2.990.000đ ($120)",
    amountVnd: 2990000,
    method: "VietQR (PayOS)",
    date: "2026-11-09",
    status: "Pending",
  },
];

export function loadBillingTransactions(): BillingTransaction[] {
  if (typeof window === "undefined") return DEFAULT_TRANSACTIONS;
  const raw = window.localStorage.getItem(BILLING_TRANSACTIONS_KEY);
  if (!raw) {
    window.localStorage.setItem(BILLING_TRANSACTIONS_KEY, JSON.stringify(DEFAULT_TRANSACTIONS));
    return DEFAULT_TRANSACTIONS;
  }
  try {
    const parsed = JSON.parse(raw) as BillingTransaction[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_TRANSACTIONS;
  } catch {
    return DEFAULT_TRANSACTIONS;
  }
}

export function saveBillingTransactions(items: BillingTransaction[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BILLING_TRANSACTIONS_KEY, JSON.stringify(items));
}

export function addBillingTransaction(tx: Omit<BillingTransaction, "id" | "orderCode" | "date">) {
  const all = loadBillingTransactions();
  const next: BillingTransaction = {
    ...tx,
    id: `TXN-${9000 + all.length + 1}`,
    orderCode: Math.floor(10000000 + Math.random() * 89999999),
    date: new Date().toISOString().slice(0, 10),
  };
  saveBillingTransactions([next, ...all]);
  return next;
}

export function loadUserSubscription(): UserSubscriptionState {
  if (typeof window === "undefined") return DEFAULT_SUBSCRIPTION;
  const raw = window.localStorage.getItem(BILLING_SUBSCRIPTION_KEY);
  if (!raw) {
    window.localStorage.setItem(BILLING_SUBSCRIPTION_KEY, JSON.stringify(DEFAULT_SUBSCRIPTION));
    return DEFAULT_SUBSCRIPTION;
  }
  try {
    return JSON.parse(raw) as UserSubscriptionState;
  } catch {
    return DEFAULT_SUBSCRIPTION;
  }
}

export function saveUserSubscription(sub: UserSubscriptionState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BILLING_SUBSCRIPTION_KEY, JSON.stringify(sub));
}
