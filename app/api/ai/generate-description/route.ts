import { NextResponse } from "next/server";

interface GenerateRequest {
  startupName?: string;
  industry?: string;
  targetMarket?: string;
  keyFeatures?: string;
  currentDescription?: string;
  stage?: string;
  locale?: string;
}

function buildSmartFallback(body: GenerateRequest) {
  const isVi = (body.locale || "vi") === "vi";
  const name = body.startupName?.trim() || "Startup";
  const industryMap: Record<string, { vi: string; en: string }> = {
    ai: { vi: "Trí tuệ nhân tạo & Dữ liệu lớn", en: "Artificial Intelligence & Big Data" },
    fintech: { vi: "Công nghệ tài chính (Fintech)", en: "Financial Technology (Fintech)" },
    healthtech: { vi: "Công nghệ y tế số (Healthtech)", en: "Digital Healthcare (Healthtech)" },
    edtech: { vi: "Công nghệ giáo dục (Edtech)", en: "Education Technology (Edtech)" },
    agritech: { vi: "Nông nghiệp công nghệ cao (Agritech)", en: "Smart Agriculture (Agritech)" },
    saas: { vi: "Phần mềm doanh nghiệp B2B SaaS", en: "Enterprise B2B SaaS" },
    ecommerce: { vi: "Thương mại điện tử & Chuỗi cung ứng", en: "E-Commerce & Supply Chain" },
  };

  const rawInd = (body.industry || "saas").toLowerCase();
  const indLabel = industryMap[rawInd]?.[isVi ? "vi" : "en"] || body.industry || (isVi ? "Công nghệ đổi mới sáng tạo" : "Technology & Innovation");
  const target = body.targetMarket?.trim() || (isVi ? "các doanh nghiệp SMEs và người dùng số tại Việt Nam & Đông Nam Á" : "SMEs and digital-native consumers across Vietnam and Southeast Asia");
  const features = body.keyFeatures?.trim();

  if (isVi) {
    const problem = `Trên thị trường ${indLabel} hiện nay, ${target} đang phải đối mặt với quy trình vận hành phân mảnh, chi phí trung gian cao (chiếm 25–35% ngân sách) và thiếu hụt công cụ phân tích dữ liệu theo thời gian thực để ra quyết định chính xác.`;
    const solution = `${name} phát triển nền tảng ${indLabel} tích hợp tự động hóa thông minh, giúp chuẩn hóa toàn bộ luồng công việc trên một giao diện duy nhất.${features ? ` Các tính năng cốt lõi bao gồm: ${features}.` : " Hệ thống ứng dụng thuật toán tối ưu hóa giúp cắt giảm 60% thời gian xử lý thủ công và nâng cao hiệu suất vận hành ngay từ tuần đầu triển khai."}`;
    const valueProposition = `${name} mang lại giải pháp ${indLabel} toàn diện giúp khách hàng tiết kiệm 40% chi phí vận hành, tăng 2.5 lần tốc độ xử lý và dễ dàng mở rộng quy mô mà không cần đầu tư hạ tầng phức tạp.`;
    const productDescription = `Nền tảng ${name} được thiết kế theo kiến trúc Cloud-native hiện đại với bảng điều khiển trực quan, hệ thống phân tích dự báo thông minh và khả năng tích hợp API linh hoạt. Sản phẩm phục vụ trực tiếp ${target}, đảm bảo tính bảo mật cao, tốc độ phản hồi tức thì và trải nghiệm người dùng mượt mà trên cả Web và Mobile.`;

    return {
      problem,
      solution,
      valueProposition,
      productDescription,
      description: `${valueProposition}\n\n${productDescription}`,
    };
  }

  const problem = `Across the ${indLabel} sector, ${target} struggle with fragmented legacy workflows, high operational overhead (25–35% wasted spend), and a lack of real-time data intelligence for mission-critical decisions.`;
  const solution = `${name} delivers an end-to-end ${indLabel} platform that automates core workflows into a unified operating layer.${features ? ` Key capabilities include: ${features}.` : " Powered by intelligent automation, our solution cuts manual processing time by 60% and delivers measurable ROI within the first 14 days of deployment."}`;
  const valueProposition = `${name} empowers ${target} to reduce operational costs by 40%, accelerate execution speed by 2.5x, and scale seamlessly with enterprise-grade reliability.`;
  const productDescription = `${name} is a cloud-native platform featuring real-time analytics dashboards, automated workflow orchestration, and seamless API integrations tailored for ${target}. Built for high availability and rapid onboarding across web and mobile.`;

  return {
    problem,
    solution,
    valueProposition,
    productDescription,
    description: `${valueProposition}\n\n${productDescription}`,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateRequest;
    const apiKey = process.env.OPENAI_API_KEY || process.env.API_KEY;

    if (apiKey && apiKey.startsWith("sk-")) {
      try {
        const isVi = (body.locale || "vi") === "vi";
        const systemPrompt = isVi
          ? "Bạn là chuyên gia tư vấn gọi vốn VC hàng đầu. Hãy viết nội dung hồ sơ startup chuyên nghiệp, súc tích, thuyết phục nhà đầu tư bằng tiếng Việt. Trả về JSON gồm các trường: problem, solution, valueProposition, productDescription."
          : "You are a top-tier VC pitch consultant. Write a compelling, concise investor-ready startup pitch in English. Return JSON with keys: problem, solution, valueProposition, productDescription.";

        const userPrompt = `Startup Name: ${body.startupName || "Startup"}\nIndustry: ${body.industry || "Tech"}\nTarget Market: ${body.targetMarket || "Vietnam & SEA"}\nKey Features / Context: ${body.keyFeatures || body.currentDescription || "Innovative platform"}`;

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
          if (parsed.problem && parsed.solution) {
            return NextResponse.json({
              problem: parsed.problem,
              solution: parsed.solution,
              valueProposition: parsed.valueProposition || parsed.solution,
              productDescription: parsed.productDescription || parsed.solution,
              description: `${parsed.valueProposition || ""}\n\n${parsed.productDescription || ""}`.trim(),
            });
          }
        }
      } catch {
        // Fall through to smart fallback
      }
    }

    const fallback = buildSmartFallback(body);
    return NextResponse.json(fallback);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 400 }
    );
  }
}
