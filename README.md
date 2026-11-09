# 🚀 StartupKit Platform — Hệ Sinh Thái Khởi Nghiệp & Kết Nối Đầu Tư (Next.js 16)

**StartupKit** là nền tảng số hóa hệ sinh thái khởi nghiệp đổi mới sáng tạo tại Việt Nam & Đông Nam Á, kết nối **Startups (Founders)**, **Nhà Đầu Tư (Investors / VCs)**, **Cố Vấn Chuyên Gia (Mentors)** và **Ban Quản Trị Hệ Sinh Thái (Admin)** thông qua công nghệ **AI Pitch Builder**, **AI Credibility Scoring**, **Phòng Đàm Phán Ảo (Confidential Deal Room + e-NDA)** và **Thanh Toán VietQR (PayOS)**.

---

## 🌐 Link Truy Cập Web (Web & API Links)

### 1. Giao diện mới Next.js 16 (`D:\STK\fe` — Đang chạy trực tiếp)
- **Trang chủ (Tiếng Việt):** [http://localhost:3000/vi](http://localhost:3000/vi)
- **Trang chủ (English):** [http://localhost:3000/en](http://localhost:3000/en)
- **Chuyển nhanh vai trò (Dev Role Switcher):** [http://localhost:3000/vi/dev-role](http://localhost:3000/vi/dev-role)
- **Đăng nhập (Email / Google / LinkedIn):** [http://localhost:3000/vi/login](http://localhost:3000/vi/login)
- **Đăng ký tài khoản mới:** [http://localhost:3000/vi/register](http://localhost:3000/vi/register)

### 2. Khám phá Sàn Giao Dịch (Public Marketplace)
- **Sàn Startup (12+ Dự án):** [http://localhost:3000/vi/market/startups](http://localhost:3000/vi/market/startups)
- **Sàn Gọi Vốn (Active Deals):** [http://localhost:3000/vi/deals](http://localhost:3000/vi/deals)
- **Danh bạ Quỹ Đầu Tư (10+ VCs):** [http://localhost:3000/vi/market/investments](http://localhost:3000/vi/market/investments)
- **Danh bạ Cố Vấn (10+ Mentors):** [http://localhost:3000/vi/market/mentors](http://localhost:3000/vi/market/mentors)

### 3. Không gian làm việc theo Vai trò (Role Workspaces)
- **Startup Founder Workspace:** [http://localhost:3000/vi/workspace/startup](http://localhost:3000/vi/workspace/startup)
- **Tạo Dự Án + ✨ AI Tự Động Viết Mô Tả:** [http://localhost:3000/vi/workspace/startup/projects/create](http://localhost:3000/vi/workspace/startup/projects/create)
- **Investor / VC Workspace:** [http://localhost:3000/vi/workspace/investor](http://localhost:3000/vi/workspace/investor)
- **Mentor Workspace:** [http://localhost:3000/vi/workspace/mentor](http://localhost:3000/vi/workspace/mentor)
- **Phòng Đàm Phán Bảo Mật (Deal Room + NDA):** [http://localhost:3000/vi/workspace/deal-room/deal-agribot-1](http://localhost:3000/vi/workspace/deal-room/deal-agribot-1)
- **Admin Dashboard:** [http://localhost:3000/vi/workspace/admin](http://localhost:3000/vi/workspace/admin)
- **Quản lý Báo Cáo Vi Phạm (`qqa_ManageReport`):** [http://localhost:3000/vi/workspace/admin/reports](http://localhost:3000/vi/workspace/admin/reports)
- **Kiểm duyệt Nội Dung (Moderation):** [http://localhost:3000/vi/workspace/admin/moderation](http://localhost:3000/vi/workspace/admin/moderation)
- **Quản lý Thanh Toán & VietQR (Billing):** [http://localhost:3000/vi/workspace/admin/payments](http://localhost:3000/vi/workspace/admin/payments)
- **Nâng cấp Gói Hội Viên qua VietQR:** [http://localhost:3000/vi/workspace/startup/settings](http://localhost:3000/vi/workspace/startup/settings)

### 4. Liên kết Production, GitHub & Tài liệu
- **GitHub Repository (Giao diện mới):** [https://github.com/startupkit-team/fe](https://github.com/startupkit-team/fe)
- **Vercel Deployment:** [https://startup-kit-fe.vercel.app](https://startup-kit-fe.vercel.app)
- **Backend API & Swagger Docs (Render):** [https://startup-kit-be.onrender.com/docs](https://startup-kit-be.onrender.com/docs)
- **Tài liệu Đặc tả Dự án (Google Docs):** [Xem tài liệu](https://docs.google.com/document/d/1kDQ3UUiZsJvk4931_OkbV3yjxJAAs_z-/edit?usp=sharing&ouid=110333927040690664017&rtpof=true&sd=true)

---

## 🔑 Tài Khoản Demo & Đăng Nhập Nhanh (Google / LinkedIn OAuth)

Bạn có thể bấm **"Tiếp tục với Google"** hoặc **"Tiếp tục với LinkedIn"** tại trang `/vi/login` hoặc `/vi/register` để đăng nhập 1-click, hoặc dùng các tài khoản mẫu sau:

| Vai trò | Email | Mật khẩu | Hồ sơ đại diện |
|---|---|---|---|
| **Startup Founder** | `founder@agribot.vn` | `123456` | Nguyễn Văn Minh (CEO AgriBot Vietnam) |
| **Investor / VC** | `investor@mekong.vc` | `123456` | Trần Bảo Ngọc (Partner @ Mekong Tech Ventures) |
| **Mentor / Chuyên gia** | `mentor@startupkit.vn` | `123456` | TS. Lê Hoàng An (Ex-VP Product VNPay) |
| **Admin Hệ thống** | `admin@startupkit.vn` | `123456` | Ban Quản Trị StartupKit |

---

## 🌿 Danh Sách Các Nhánh Chức Năng (Git Branches)

Toàn bộ chức năng của nền tảng đã được phát triển, kiểm thử (`npm run build` 0 lỗi) và đồng bộ trên các nhánh:

- `main` / `develop`: Nhánh tích hợp chính chứa đầy đủ toàn bộ tính năng.
- `qqa_ManageReport`: Trung tâm xử lý báo cáo vi phạm (Fake Startup, Scam, Plagiarized Deck, Spam, Harassment), kiểm duyệt nội dung AI và xác thực KYC người dùng.
- `feat/billing-vietqr-subscription`: Hệ thống gói hội viên (`Starter Free`, `Founder Pro 499.000đ`, `VC VIP 999.000đ`), cổng thanh toán mã QR ngân hàng **PayOS / VietQR Napas247** và bảng đối soát doanh thu Admin.
- `feat/deal-room-nda-and-matching`: Phòng đàm phán đầu tư bảo mật (Deal Room), ký thỏa thuận bảo mật điện tử (**Mutual e-NDA**), thanh tiến độ 5 bước (**Deal Pipeline**) và API chấm điểm tín nhiệm AI (`/api/ai/evaluate-pitch`).
- `feat/ai-pitch-generator`: Động cơ AI tự động viết nội dung dự án (Problem, Solution, Value Proposition, Product Description) hỗ trợ OpenAI API và Smart Fallback song ngữ Việt/Anh (`/api/ai/generate-description`).
- `feat/oauth-google-linkedin`: Đăng nhập và đăng ký tài khoản bằng **Google** và **LinkedIn** hỗ trợ chọn vai trò (`STARTUP`, `INVESTOR`, `MENTOR`) và đăng nhập nhanh 1-click.
- `feat/ecosystem-seed-data`: Bộ dữ liệu hệ sinh thái khởi nghiệp Việt Nam phong phú (12 Startups, 10 Quỹ đầu tư VC, 10 Mentors, 10 Active Deals, lịch sử tin nhắn, phiên cố vấn và thông báo).

---

## 🛠️ Hướng Dẫn Chạy Dự Án Tại Máy Cục Bộ (Local Setup)

```bash
# 1. Di chuyển vào thư mục giao diện mới
cd D:\STK\fe

# 2. Cài đặt thư viện
npm install

# 3. Chạy máy chủ phát triển (Mặc định cổng 3000)
npm run dev

# 4. Kiểm tra bản dựng Production
npm run build
```
