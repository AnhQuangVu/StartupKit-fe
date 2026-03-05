# StartupKit Platform — Design & Architecture History

> Tài liệu tổng hợp toàn bộ quyết định thiết kế, kiến trúc và thay đổi kỹ thuật theo thứ tự thời gian.

---

## Phase 1 — Hero Section & Map

### Vấn đề ban đầu
- Bản đồ Đông Nam Á quá nhỏ, trông như blob vùng miền
- Vietnam highlight quá lớn, chồng lên heading
- Không có bối cảnh thế giới

### Thay đổi
- Chuyển từ bản đồ SEA sang **flat SVG world map** toàn cầu
- Vietnam màu `#F4B400`, highlighted với scale 1.1
- Thêm **pulsing dot tại Hà Nội** (8px, gold, ring animation 2s infinite)
- Hero section: `height: 85–90vh`, map `absolute inset-0`, không giới hạn max-width
- Nội dung text giới hạn `max-w-[600px]`, căn giữa bên trái

---

## Phase 2 — Global Language Switcher & Chat Widget

### Language Switcher
- Đặt bên trong `Header`, phía phải
- Text-based: `EN | VI`
- Active color: `#F4B400`
- Không dùng dropdown
- Persist bằng localStorage

### Chat Widget
- Fixed `bottom-right` (24px margins)
- 52px round button, black background, white chat icon
- Hover: thin yellow border
- Click: slide-in panel bên phải (360px desktop, full-width mobile)
- Global — inject vào Layout component

---

## Phase 3 — Auth Pages: Login, Register, 2FA

### Design
- Split-screen layout: Map panel trái (55–60% width) + Form bên phải
- Map panel dùng `AuthMapPanel` component với vietnam highlight
- Form area: white background, căn giữa

### Entities (theo system document)
- `NGUOI_DUNG`: MaNguoiDung, HoTen, Email, MatKhau, VaiTro, NgayGiaNhap, TrangThai
- Register flow: chọn Role → tạo NGUOI_DUNG → tạo profile tương ứng
- Roles: Startup → `STARTUP` profile | Mentor → `MENTOR` profile | Investor → `INVESTOR` profile
- Investor accounts → bắt buộc 2FA sau khi đăng ký

### Pages tạo
- `app/[locale]/(auth)/login/page.tsx`
- `app/[locale]/(auth)/register/page.tsx`
- `app/[locale]/(auth)/2fa/page.tsx`

---

## Phase 4 — Landing Page Upgrade (Platform v3)

Giữ nguyên layout Hero + Map. Bổ sung các section mới:

| Section | Nội dung |
|---|---|
| Hero | World map, Vietnam highlight, AI tagline |
| EcosystemStats | 7 loại thành viên, số lượng |
| RoleEcosystem | Startup / Mentor / Investor cards |
| AIPitchBuilder | 4-step flow: Input → AI Engine → Profile → Dashboard |
| MatchingEngine | Node diagram: Startup ↔ AI Engine ↔ Mentor/Investor |
| CredibilityScore | Live score gauge 0-100, 3 signals |
| BusinessModel | Free plan + 10% Success Fee model |
| HowItWorks | 3 steps: Build → Connect → Raise |
| CTASection | Join 500+ founders CTA |

---

## Phase 5 — i18n Architecture (Next.js App Router)

### Vấn đề cũ
- `lang-context.tsx` dùng `localStorage` → Hydration mismatch, SSR không work, SEO kém
- Text không đổi khi chuyển ngôn ngữ

### Giải pháp mới

```
app/
  [locale]/                 ← Dynamic locale route
    layout.tsx              ← Loads dictionary, wraps DictionaryProvider
    page.tsx
    (auth)/                 ← Auth group
      login/page.tsx
      register/page.tsx
      2fa/page.tsx
dictionaries/
  en.json
  vi.json
lib/
  i18n.ts                   ← LOCALES = ['vi', 'en'], DEFAULT_LOCALE = 'vi'
  getDictionary.ts          ← Dynamic import JSON by locale
  dict-context.tsx          ← DictionaryProvider + useDictionary() hook
proxy.ts                    ← Renamed từ middleware.ts (Next.js 16 convention)
components/
  LanguageSwitcher.tsx      ← URL-based locale switching via usePathname + useRouter
```

### Tại sao URL-first (không dùng localStorage)
| | localStorage | URL-based |
|---|---|---|
| SSR | ❌ Hydration mismatch | ✅ Server biết locale từ URL |
| SEO | ❌ Không index được | ✅ `/vi/...` vs `/en/...` đều indexable |
| Shareable | ❌ | ✅ Link giữ nguyên ngôn ngữ |
| Middleware | ❌ Không đọc được | ✅ Đọc URL segment |

### Hydration Error Fix
Root cause: `app/layout.tsx` + `app/[locale]/layout.tsx` đều render `<html><body>` → trình duyệt strip tags → React hydration fail.

Fix: **Xóa `app/layout.tsx`**, gộp toàn bộ vào `app/[locale]/layout.tsx` là root layout duy nhất.

---

## Phase 6 — Marketplace Architecture Refactor

### Chiến lược: Marketplace-First (không phải Dashboard-first)

| | Dashboard-first | Marketplace-first |
|---|---|---|
| Trang chủ | Màn hình riêng tư | Public discovery hub |
| Network effect | Không có | Mạnh (users thấy nhau) |
| Chuyển đổi | Thấp | Cao (guest thấy ecosystem ngay) |
| SEO | Kém | Tốt (`/market/startups` indexable) |

### 3-Layer Architecture

```
/ (Landing)      → Marketing page thuần, không role-aware
/market          → Role-based discovery hub (switchboard)
/workspace       → Private working area, redirect by role
```

### Role-Based Marketplace Home (`/market`)
```tsx
role === "GUEST"    → GuestMarketplaceFeed    (Landing sections)
role === "STARTUP"  → StartupMarketplaceFeed  (Mentors + Investors)
role === "MENTOR"   → MentorMarketplaceFeed   (Startups seeking sessions)
role === "INVESTOR" → InvestorMarketplaceFeed (AI deal flow)
role === "ADMIN"    → AdminOverviewFeed       (System stats)
```

### Workspace Routing (`/workspace/page.tsx`)
```tsx
// Traffic controller — redirects user to their isolated workspace
switch (role) {
  case "STARTUP":  redirect(`/workspace/startup`);
  case "MENTOR":   redirect(`/workspace/mentor`);
  case "INVESTOR": redirect(`/workspace/investor`);
  case "ADMIN":    redirect(`/workspace/admin`);
  default:         redirect(`/login`);
}
```

---

## Phase 7 — Full Page Structure

### Route Tree hoàn chỉnh

```
app/[locale]/
  page.tsx                        → Marketing Landing Page
  market/
    page.tsx                      → Role-aware Marketplace Home
    startups/page.tsx             → Startup Discovery (Search + Filter)
    mentors/page.tsx              → Mentor Marketplace (Book Session)
    investments/page.tsx          → Deal Flow (AI Score + Progress Bar)
  project/[id]/page.tsx           → Project Detail (Pitch + Funding + Reviews)
  profile/[id]/page.tsx           → Public Profile (Mentor/Founder)
  workspace/
    page.tsx                      → Auth guard + role redirect
    startup/page.tsx              → Startup tools
    mentor/page.tsx               → Mentor tools
    investor/page.tsx             → Investor tools
    admin/page.tsx                → Admin console
  (auth)/
    login/page.tsx
    register/page.tsx
    2fa/page.tsx
```

### Market Sub-pages
- **`/market/startups`**: Search, Category filter, Stage filter, Startup cards với funding amount
- **`/market/mentors`**: Expertise filter, Industry filter, Credibility score, Book Session CTA
- **`/market/investments`**: AI Score badge, Funding progress bar, Deal detail CTA

---

## Phase 8 — Layout Architecture Fix

### Root Cause
Mỗi page tự import `<Navbar>` và `<Footer>` → sub-pages không có header/footer → UI broken.

### Fix: Single Source of Truth

**`app/[locale]/layout.tsx`** là nơi duy nhất inject global UI:

```tsx
<DictionaryProvider dict={dict}>
    <Navbar />              ← Global (tất cả pages)
    <main>{children}</main>
    <Footer />              ← Global (tất cả pages)
    <ChatWidget />          ← Floating, global
</DictionaryProvider>
```

**Individual pages** chỉ render nội dung thuần — không được import Navbar/Footer.

### Navbar Improvements
- Xóa `locale` prop → dùng `useParams()` nội bộ
- Full marketplace navigation: `Explore · Startups · Mentors · Investments · Workspace`
- Active route highlight: màu `#F4B400`
- Language Switcher tích hợp bên phải
- Tự ẩn trên auth pages (`/login`, `/register`, `/2fa`)
- Mobile hamburger menu với slide-down panel

---

## Design System Summary

### Colors
| Token | Value | Usage |
|---|---|---|
| Primary | `#111111` | Text, buttons, logo |
| Background | `#FFFFFF` | Page, cards |
| Accent | `#F4B400` | Active nav, CTAs, AI Score, highlights |
| Border | `#EAEAEA` | Card borders, dividers |
| Subtle bg | `#F9F9F9` | Banner backgrounds |
| Muted text | `#555555` | Subtitles, descriptions |

### Typography
- Font: `Inter` (Google Fonts, subsets: latin + vietnamese)
- Headings: `font-bold`, size 28–48px
- Body: 14–16px, `text-[#555555]`
- Labels: 12–13px, uppercase, `tracking-widest`, `font-semibold`

### Border Radius
- Cards: `rounded-[8px]` – `rounded-[10px]`
- Buttons: `rounded-[8px]`
- Badges: `rounded-full`
- Avatars: `rounded-full`, logo squares: `rounded-[6px]`

### Spacing
- Container: `max-w-[1200px] mx-auto px-6 md:px-12`
- Section padding: `py-16` – `py-24`
- Card padding: `p-6`
- Navbar height: `h-[72px]`, fixed top

---

## Dictionary Keys (i18n)

```
nav.market, nav.startups, nav.mentors, nav.investments, nav.workspace
hero.title1, hero.title2, hero.ai, hero.sub, hero.cta1, hero.cta2
marketplace.startup.*, marketplace.mentor.*, marketplace.investor.*, marketplace.admin.*
market.startups.*, market.mentors.*, market.investments.*
roles.startup.*, roles.mentor.*, roles.investor.*
ai.*, matching.*, credibility.*, business.*, how.*, cta.*, footer.*, chat.*, auth.*
```

---

## Tech Stack

- **Framework**: Next.js 16.1.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS + Tailwind utility classes
- **Font**: `next/font/google` — Inter
- **i18n**: Custom JSON dictionary + DictionaryProvider context
- **Routing**: `proxy.ts` (renamed từ middleware.ts per Next.js 16)
- **Map**: `react-simple-maps` (dynamic import with `ssr: false`)

---

## Phase 9 — Investments Page Refactor (`/market/investments`)

### Vấn đề cũ
- Dùng thuật ngữ crowdfunding: "funded", "backers", "raised"
- Không phản ánh đúng mô hình B2B deal flow
- Filter bar thiếu: chỉ có search cơ bản

### Thay đổi
- **Thuật ngữ mới** (không phải crowdfunding):
  - "Funded → X%" → **"Commitment Progress"**
  - "X investors" → **"Lead Investor"**
  - "Raised" → **"Committed"**
- **Tiêu đề trang**: "Luồng Deal Hiện tại" → **"Cơ hội đầu tư"**
- **Subtitle**: "Khám phá các startup đang gọi vốn, được đánh giá bởi AI."
- **Filter bar đầy đủ**: Search + Industry + Stage + AI Score filter
- **Card layout**: 2-col grid → 3-col grid
- **Empty state**: thêm message + Reset CTA khi không có kết quả
- **Skeleton loading**: `animate-pulse` cards khi đang load

---

## Phase 10 — Card Component System

### Vấn đề
- Card markup bị lặp lại ở 3 pages khác nhau
- Logo startup bị overlap bởi cover image (dùng `mt-8` negative margin trick → bị ẩn)
- 3 pages không nhất quán về layout

### Giải pháp: Reusable Component System

```
components/
  cards/
    StartupCard.tsx      ← cover → logo+name → tags → desc → badges → CTA
    MentorCard.tsx       ← portrait → name → chips → bio → score → CTA
    InvestorCard.tsx     ← cover → firmName → focus → stages → ticket → CTA
  ui/
    AIScoreBadge.tsx     ← gold star + "AI {score}" pill
    FundingProgress.tsx  ← bar + committed/target/% labels
```

### DOM hierarchy Fix (StartupCard)
```
WRONG (trước): cover image → (-mt-8) logo overlap
CORRECT (sau):
<article>
  <div class="cover">     ← 16:9 image, sibling của content
  </div>
  <div class="content">   ← logo luôn hiển thị, không bao giờ overlap
    logo + name
    tags
    description
    badges
    CTA
  </div>
</article>
```

### Card Design Rules
- Border radius: `10px`
- Hover: `shadow-lg` + `-translate-y-0.5` (lift effect)
- Cover image: 16:9 (`paddingTop: 56.25%` + `position: absolute inset-0`)
- Grid: `1 col mobile` → `2 col tablet` → `3 col desktop`
- Gap: `gap-8`

### Startup Cards — Không phải crowdfunding
Loại bỏ hoàn toàn:
- ❌ Funding progress bar
- ❌ Money raised counters
- ❌ Backer counts

Thay bằng startup ecosystem data:
- ✅ **AI Score badge** (gold, rounded-full)
- ✅ **Stage badge** (gray pill)
- ✅ **Industry badge** (gray pill)
- ✅ Location (`📍 Hà Nội`)
- ✅ Team size (`👥 8 people`)

### Investor Page Redesign
`/market/investments` đổi concept: **không phải deal cards → Investor Directory**

```tsx
// Dữ liệu mới cho mỗi investor card
{
  firmName: "Mekong Capital",
  focus: ["Fintech", "Consumer"],     // gold chips
  stages: ["Seed", "Series A"],       // gray chips
  ticketMin: "$500k",
  ticketMax: "$3M",
  portfolio: 48,
  avatarSeed: "mekong"                // picsum cover
}
```

### Image Sources
| Component | URL |
|---|---|
| StartupCard cover | `picsum.photos/seed/{seed}/600/338` |
| MentorCard photo | `i.pravatar.cc/600?u={seed}` (object-top) |
| InvestorCard cover | `picsum.photos/seed/{seed}vc/600/338` |

---

## Phase 11 — Logo Fix

### Vấn đề
- Logo render bé vì file JPG có **nền trắng viền lớn** xung quanh logo thực
- Path sai: `src="/branding/Logo.jpg"` — thư mục `branding/` không nằm trong `public/`

### Fix 1 — Đúng path
```
public/Logo.jpg     → src="/Logo.jpg"   ✅
branding/Logo.jpg   → src="/branding/Logo.jpg"  ❌ (không serve được)
```

### Fix 2 — Ẩn nền trắng JPG
```tsx
<div className="overflow-hidden h-8 w-[130px]">
  <Image
    src="/Logo.jpg"
    style={{ mixBlendMode: "multiply" }}
    // mix-blend-mode: multiply → nền trắng trong JPG
    // trở nên transparent trên nền trắng navbar
  />
</div>
```

| Thuộc tính | Giá trị |
|---|---|
| Container | `h-8 w-[130px] overflow-hidden` |
| mixBlendMode | `multiply` |
| Image size | `width={160} height={44}` |

---

## Cấu trúc File Hiện tại (05/03/2026)

```
d:\STK\fe\
├── app\
│   ├── [locale]\
│   │   ├── layout.tsx               ← Root layout: DictionaryProvider + Navbar + Footer + ChatWidget
│   │   ├── page.tsx                 ← Landing page (Marketing)
│   │   ├── (auth)\
│   │   │   ├── layout.tsx           ← Auth layout (no Navbar)
│   │   │   ├── login\page.tsx
│   │   │   ├── register\page.tsx
│   │   │   └── 2fa\page.tsx
│   │   ├── market\
│   │   │   ├── page.tsx             ← Role-aware marketplace home
│   │   │   ├── startups\page.tsx    ← Startup discovery (filter + StartupCard grid)
│   │   │   ├── mentors\page.tsx     ← Mentor marketplace (filter + MentorCard grid)
│   │   │   └── investments\page.tsx ← Investor directory (filter + InvestorCard grid)
│   │   ├── deals\
│   │   │   ├── page.tsx             ← Deal marketplace (alias/redirect candidate)
│   │   │   └── [id]\page.tsx        ← Deal detail
│   │   ├── project\[id]\page.tsx    ← Startup project detail
│   │   ├── profile\[id]\page.tsx    ← Public user profile
│   │   ├── explore\page.tsx         ← Global explore
│   │   └── workspace\
│   │       ├── page.tsx             ← Auth guard + role redirect
│   │       ├── startup\page.tsx
│   │       ├── mentor\page.tsx
│   │       ├── investor\page.tsx
│   │       └── admin\page.tsx
│
├── components\
│   ├── Navbar.tsx                   ← Fixed 72px, logo mixBlendMode, active gold, mobile menu
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx         ← URL-based, gold active state
│   ├── ChatWidget.tsx               ← Fixed bottom-right, slide panel
│   ├── cards\                       ← Reusable marketplace cards
│   │   ├── StartupCard.tsx          ← 16:9 cover, ecosystem badges, no crowdfunding
│   │   ├── MentorCard.tsx           ← Portrait photo, expertise chips, AI score
│   │   └── InvestorCard.tsx         ← VC firm profile, focus/stages/ticket size
│   ├── ui\
│   │   ├── AIScoreBadge.tsx         ← Gold badge "AI {score}"
│   │   ├── FundingProgress.tsx      ← Progress bar (used only in deal contexts)
│   │   └── [shadcn components...]   ← accordion, dialog, select, tabs, etc.
│   ├── marketplace\                 ← Role-based feed sections
│   ├── auth\                        ← AuthMapPanel, etc.
│   └── [landing sections]           ← EcosystemMapHero, RoleEcosystem, AIPitchBuilder, etc.
│
├── dictionaries\
│   ├── en.json                      ← English strings (nav, hero, market, deals, auth, ...)
│   └── vi.json                      ← Vietnamese strings
│
├── lib\
│   ├── i18n.ts                      ← LOCALES = ['vi', 'en'], DEFAULT_LOCALE = 'vi'
│   ├── getDictionary.ts             ← Dynamic import JSON by locale
│   └── dict-context.tsx             ← DictionaryProvider + useDictionary() hook
│
├── public\
│   └── Logo.jpg                     ← Platform logo (src="/Logo.jpg")
│
├── branding\
│   ├── Logo.jpg                     ← Bản gốc (không serve được bởi Next.js)
│   └── logo_rule.md
│
├── proxy.ts                         ← Middleware (locale redirect, auth guard)
├── next.config.ts
├── tailwind.config.ts
└── design-history.md                ← Tài liệu này
```

---

## Design System Summary (Cập nhật)

### Colors
| Token | Value | Usage |
|---|---|---|
| Primary | `#111111` | Text, buttons, logo |
| Background | `#FFFFFF` | Page, cards |
| Accent | `#F4B400` | Active nav, CTAs, AI Score, gold badges |
| Border | `#EAEAEA` | Card borders, dividers |
| Page bg | `#F9F9F9` | Marketplace page background |
| Muted | `#555555` / `#888888` | Subtitles, metadata |

### Card Design Rules
| Rule | Value |
|---|---|
| Border radius | `rounded-[10px]` |
| Cover ratio | 16:9 (`paddingTop: 56.25%`) |
| Hover | `shadow-lg -translate-y-0.5` |
| Grid desktop | 3 columns (`lg:grid-cols-3`) |
| Grid tablet | 2 columns (`md:grid-cols-2`) |
| Grid mobile | 1 column |
| Gap | `gap-8` |
| Padding | `p-6` |

### Platform Philosophy
> StartupKit là **Startup Ecosystem Marketplace** — KHÔNG phải crowdfunding platform.
>
> Cards thể hiện **ecosystem data** (AI Score, Stage, Industry, Location, Team) — không phải funding metrics (progress bar, backer count, deadline).

---

*Cập nhật lần cuối: 05/03/2026*
