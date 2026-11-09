import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const startupName = (body.startupName || "Startup").trim();
    const industry = (body.industry || "SaaS").trim();
    const stage = (body.stage || "Seed").trim();
    const monthlyRevenue = (body.monthlyRevenue || "").trim();

    const hasRevenue = Boolean(monthlyRevenue && !monthlyRevenue.startsWith("0"));
    const credibilityScore = hasRevenue ? 94 : 88;
    const readinessScore = hasRevenue ? 92 : 85;

    return NextResponse.json({
      startupName,
      industry,
      stage,
      credibilityScore,
      readinessScore,
      swot: {
        strengths: [
          `Giải quyết trực tiếp bài toán hiệu suất trong ngành ${industry} tại Việt Nam.`,
          "Mô hình doanh thu định kỳ có biên lợi nhuận gộp cao (>70%).",
        ],
        weaknesses: [
          "Cần chuẩn hóa thêm báo cáo Cohort Retention 12 tháng cho vòng gọi vốn tiếp theo.",
        ],
        opportunities: [
          "Khả năng mở rộng nhanh sang các thị trường Đông Nam Á (Thái Lan, Philippines, Indonesia).",
        ],
        threats: [
          "Cạnh tranh về tốc độ chiếm lĩnh kênh phân phối B2B tại địa phương.",
        ],
      },
      recommendedInvestors: [
        { id: "i1", firmName: "Mekong Capital", matchScore: 96, stage, focus: industry },
        { id: "i2", firmName: "Do Ventures", matchScore: 93, stage, focus: industry },
        { id: "i6", firmName: "Touchstone Partners", matchScore: 91, stage, focus: industry },
      ],
      recommendedMentors: [
        { id: "m1", name: "Dr. An Nguyen", matchScore: 95, expertise: "Product & Growth" },
        { id: "m3", name: "Hung Le", matchScore: 94, expertise: "Fundraising & Unit Economics" },
      ],
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
