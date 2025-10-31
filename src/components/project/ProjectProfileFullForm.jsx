import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { API_BASE, authHeaders } from "../../config/api";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import styles from "./styles/ProjectProfileForm.module.css";
// Register font hỗ trợ tiếng Việt (giả sử bạn đã tải Roboto-Regular.ttf và đặt trong src/fonts/)
import RobotoRegular from "../../config/Roboto-VariableFont_wdth,wght.ttf";
import Logo from "../../assets/images/logo.png";
// Đăng ký font một lần
Font.register({
  family: "Roboto",
  src: RobotoRegular,
  fontWeight: 400,
});
// Styles cho PDF với font Roboto - Cải thiện để chuyên nghiệp hơn
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 50, // Tăng padding cho không gian thoáng hơn
    fontSize: 11, // Giảm nhẹ font size để vừa trang hơn
    lineHeight: 1.6, // Tăng line height cho dễ đọc
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 28, // Tăng size cho header chính
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#1E40AF", // Màu xanh đậm chuyên nghiệp
    letterSpacing: 0.5,
  },
  subheader: {
    fontSize: 16, // Giảm size subheader
    marginTop: 25,
    marginBottom: 15,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#374151", // Màu xám đậm
    borderBottom: "2pt solid #E5E7EB", // Thêm đường viền dưới cho subheader
    paddingBottom: 5,
  },

  section: {
    marginBottom: 15, // Giảm margin để tiết kiệm không gian
    borderLeft: "3pt solid #3B82F6", // Thêm border trái màu xanh để highlight
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#F9FAFB", // Nền xám nhạt cho section
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#1F2937",
    fontFamily: "Roboto",
    textTransform: "uppercase", // Chữ hoa cho label
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 11,
    marginBottom: 5,
    color: "#4B5563",
    paddingLeft: 5,
    fontFamily: "Roboto",
    lineHeight: 1.4,
  },
  image: {
    width: 80, // Giảm size ảnh để vừa trang hơn
    height: 80,
    margin: 5,
    borderRadius: 4, // Bo góc ảnh
    border: "1pt solid #D1D5DB",
  },
  logoSite: {
    position: "absolute",
    top: 20,
    left: 50,
    width: 80, // Giảm size logo site
    height: 80,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 50,
    fontSize: 10,
    color: "#9CA3AF",
    fontFamily: "Roboto",
  },
  boldText: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  underlineText: {
    textDecoration: "underline",
  },
});
// Component PDF Document với nhiều trang - Giữ nguyên cấu trúc nhưng áp dụng styles mới
const MyDocument = ({ data }) => {
  const sections = [
    // Trang 1: Thông tin chung và Tóm tắt
    <Page key="page1" size="A4" style={pdfStyles.page}>
      <Image style={pdfStyles.logoSite} source={Logo} />
      <View style={pdfStyles.header}>
        <Text>{data.projectName || "Tên dự án"}</Text>
      </View>
      <View style={pdfStyles.subheader}>
        <Text>THÔNG TIN CHUNG DỰ ÁN</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tên Dự án</Text>
        <Text style={pdfStyles.value}>{data.projectName || ""}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Logo dự án</Text>
        {data.logo && <Image style={pdfStyles.image} source={data.logo} />}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Lĩnh vực</Text>
        <Text style={pdfStyles.value}>{data.field || ""}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đơn vị thực hiện</Text>
        <Text style={pdfStyles.value}>{data.organization || ""}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Thời gian thực hiện</Text>
        <Text style={pdfStyles.value}>{data.time || ""}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>
          Nhóm thực hiện & Giảng viên hướng dẫn
        </Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.teamInfo || "")}
        </Text>
      </View>
      <View style={pdfStyles.subheader}>
        <Text>PHẦN 1: TÓM TẮT DỰ ÁN</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Ý tưởng chính</Text>
        {renderRichTextToPDF(data.mainIdea || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Sản phẩm, dịch vụ & Giá trị</Text>
        {renderRichTextToPDF(data.productValue || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Hình ảnh sản phẩm (nhiều)</Text>
        {Array.isArray(data.productImages) &&
          data.productImages
            .slice(0, 4)
            .map((img, idx) => (
              <Image key={idx} style={pdfStyles.image} source={img} />
            ))}
      </View>
      <Text style={pdfStyles.pageNumber}>Trang 1/5</Text>
    </Page>,
    // Trang 2: Phần 2 A và B
    <Page key="page2" size="A4" style={pdfStyles.page}>
      <Image style={pdfStyles.logoSite} source={Logo} />
      <View style={pdfStyles.subheader}>
        <Text>PHẦN 2: NỘI DUNG CHÍNH CỦA DỰ ÁN</Text>
      </View>
      <View style={pdfStyles.subheader}>
        <Text>A. TỔNG QUAN DỰ ÁN</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Sứ mệnh</Text>
        {renderRichTextToPDF(data.mission || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tầm nhìn</Text>
        {renderRichTextToPDF(data.vision || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Giá trị sản phẩm</Text>
        {renderRichTextToPDF(data.productCoreValue || "")}
      </View>
      <View style={pdfStyles.subheader}>
        <Text>B. THÔNG TIN VỀ SẢN PHẨM, DỊCH VỤ</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Khách hàng mục tiêu</Text>
        {renderRichTextToPDF(data.targetCustomer || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Lợi thế cạnh tranh</Text>
        {renderRichTextToPDF(data.advantage || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>
          Giá trị mang lại cho cộng đồng và xã hội
        </Text>
        {renderRichTextToPDF(data.communityValue || "")}
      </View>
      <Text style={pdfStyles.pageNumber}>Trang 2/5</Text>
    </Page>,
    // Trang 3: Phần 2 C
    <Page key="page3" size="A4" style={pdfStyles.page}>
      <Image style={pdfStyles.logoSite} source={Logo} />
      <View style={pdfStyles.subheader}>
        <Text>C. PHÂN TÍCH TÍNH KHẢ THI</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Quy mô thị trường</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.marketSize || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đối tác & Nguồn nhân lực</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.partners || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tài chính (Khởi đầu)</Text>
        {renderRichTextToPDF(data.finance || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tính khả thi</Text>
        {renderRichTextToPDF(data.feasibility || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Sản phẩm & Dịch vụ</Text>
        {renderRichTextToPDF(data.products || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Phân tích SWOT</Text>
        {renderRichTextToPDF(data.swot || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Thuận lợi/Khó khăn</Text>
        {renderRichTextToPDF(data.prosCons || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tính độc đáo, sáng tạo</Text>
        {renderRichTextToPDF(data.creativity || "")}
      </View>
      <Text style={pdfStyles.pageNumber}>Trang 3/5</Text>
    </Page>,
    // Trang 4: Phần D
    <Page key="page4" size="A4" style={pdfStyles.page}>
      <Image style={pdfStyles.logoSite} source={Logo} />
      <View style={pdfStyles.subheader}>
        <Text>D. KẾ HOẠCH SẢN XUẤT, KINH DOANH & PHÁT TRIỂN</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>
          Kế hoạch kinh doanh (theo giai đoạn)
        </Text>
        {renderRichTextToPDF(data.businessPlan || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Kênh phân phối</Text>
        {renderRichTextToPDF(data.distribution || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Phát triển, mở rộng thị trường</Text>
        {renderRichTextToPDF(data.marketDevelopment || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Kết quả tiềm năng</Text>
        {renderRichTextToPDF(data.potentialResult || "")}
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>
          Khả năng tăng trưởng, tác động xã hội
        </Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.growthImpact || "")}
        </Text>
      </View>
      <Text style={pdfStyles.pageNumber}>Trang 4/5</Text>
    </Page>,
    // Trang 5: Phần E và F
    <Page key="page5" size="A4" style={pdfStyles.page}>
      <Image style={pdfStyles.logoSite} source={Logo} />
      <View style={pdfStyles.subheader}>
        <Text>E. NGUỒN LỰC THỰC HIỆN</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Cơ cấu nhân sự (Team)</Text>
        <Text style={pdfStyles.value}>{stripHtmlTags(data.team || "")}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đánh giá nguồn nhân lực</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.hrEvaluation || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đối tác hợp tác</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.cooperation || "")}
        </Text>
      </View>
      <View style={pdfStyles.subheader}>
        <Text>F. KÊNH TRUYỀN THÔNG VÀ TIẾP THỊ</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Mục tiêu truyền thông</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mediaGoal || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đối tượng mục tiêu</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mediaTarget || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Kênh truyền thông</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mediaChannel || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Chiến dịch Marketing (Quý)</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.marketingCampaign || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Công cụ truyền thông</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mediaTool || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Đo lường và đánh giá</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mediaMeasure || "")}
        </Text>
      </View>
      {Array.isArray(data.productImages) &&
        data.productImages.length > 4 &&
        data.productImages
          .slice(4)
          .map((img, idx) => (
            <Image key={`img-${idx}`} style={pdfStyles.image} source={img} />
          ))}
      <Text style={pdfStyles.pageNumber}>Trang 5/5</Text>
    </Page>,
  ];
  return <Document>{sections}</Document>;
};
// Helper để strip HTML tags từ rich text
function stripHtmlTags(html) {
  if (!html) return "";

  let text = html;

  // Chuyển <li> thành dấu bullet
  text = text.replace(/<li[^>]*>/gi, "• ").replace(/<\/li>/gi, "\n");

  // Chuyển <br> và </p> thành dòng mới
  text = text.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n");

  // Xóa các tags khác NHƯNG giữ nội dung
  text = text.replace(/<[^>]*>/g, "");

  // Giải mã HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");

  // Loại bỏ nhiều dòng trống liên tiếp
  text = text.replace(/\n\n+/g, "\n");

  return text.trim();
}

// Hàm chuyển đổi HTML rich text thành PDF elements với định dạng đầy đủ
function renderRichTextToPDF(html) {
  if (!html || typeof html !== "string") {
    return null;
  }

  const trimmedHtml = html.trim();
  if (!trimmedHtml) {
    return null;
  }

  // Parse HTML thành cấu trúc có định dạng
  const parseFormattedText = (text) => {
    const result = [];

    // Regex để nhận diện: tags, links, hoặc text content
    const regex =
      /(<b>|<strong>|<i>|<em>|<u>|<a[^>]*>|<\/b>|<\/strong>|<\/i>|<\/em>|<\/u>|<\/a>|[^<]+)/gi;
    let match;
    let isBold = false;
    let isItalic = false;
    let isUnderline = false;
    let linkHref = null;

    while ((match = regex.exec(text)) !== null) {
      const token = match[0];

      // Xử lý opening tags
      if (token === "<b>" || token === "<strong>") {
        isBold = true;
      } else if (token === "<i>" || token === "<em>") {
        isItalic = true;
      } else if (token === "<u>") {
        isUnderline = true;
      } else if (token.match(/^<a\s+/i)) {
        // Extract href từ <a href="...">
        const hrefMatch = token.match(/href=["']([^"']*)["']/i);
        linkHref = hrefMatch ? hrefMatch[1] : null;
      }
      // Xử lý closing tags
      else if (token === "</b>" || token === "</strong>") {
        isBold = false;
      } else if (token === "</i>" || token === "</em>") {
        isItalic = false;
      } else if (token === "</u>") {
        isUnderline = false;
      } else if (token === "</a>") {
        linkHref = null;
      }
      // Xử lý text content
      else if (token && !token.match(/^</)) {
        // Decode HTML entities
        let decoded = token
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&amp;/g, "&");

        if (decoded.trim()) {
          result.push({
            text: decoded,
            isBold,
            isItalic,
            isUnderline,
            linkHref,
          });
        }
      }
    }

    return result;
  };

  // Xử lý lists
  const hasLists = /<(ul|ol)/i.test(trimmedHtml);

  if (hasLists) {
    const parts = [];
    const listRegex = /<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;
    let lastIndex = 0;

    while ((match = listRegex.exec(trimmedHtml)) !== null) {
      // Thêm nội dung trước list
      if (match.index > lastIndex) {
        const beforeText = trimmedHtml
          .substring(lastIndex, match.index)
          .replace(/<p[^>]*>/gi, "")
          .replace(/<\/p>/gi, "")
          .replace(/<[^>]*>/g, "")
          .trim();
        if (beforeText) {
          parts.push({ type: "text", content: beforeText });
        }
      }

      // Parse list items
      const listContent = match[2];
      const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      const listType = match[1].toLowerCase();

      if (items.length > 0) {
        parts.push({
          type: "list",
          listType,
          items: items.map((item, idx) => {
            let text = item.replace(/<\/?li[^>]*>/gi, "").trim();
            const bullet = listType === "ol" ? `${idx + 1}. ` : "• ";
            return { text: bullet + text };
          }),
        });
      }

      lastIndex = match.index + match[0].length;
    }

    // Thêm phần còn lại
    if (lastIndex < trimmedHtml.length) {
      const remaining = trimmedHtml
        .substring(lastIndex)
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/p>/gi, "")
        .replace(/<[^>]*>/g, "")
        .trim();
      if (remaining) {
        parts.push({ type: "text", content: remaining });
      }
    }

    // Render các phần
    const views = [];
    for (const part of parts) {
      if (part.type === "text" && part.content) {
        const lines = part.content.split("\n").filter((l) => l);
        for (const line of lines) {
          if (line) {
            const formattedParts = parseFormattedText(line);
            views.push(
              <View key={`text-${views.length}`} style={{ marginBottom: 8 }}>
                <Text style={pdfStyles.value}>
                  {formattedParts.map((part, idx) => {
                    const textStyle = { ...pdfStyles.value };
                    if (part.isBold) textStyle.fontWeight = "bold";
                    if (part.isUnderline)
                      textStyle.textDecoration = "underline";
                    if (part.linkHref) textStyle.color = "#0066CC"; // Màu xanh cho link
                    return (
                      <Text key={idx} style={textStyle}>
                        {part.text}
                        {part.linkHref && ` [${part.linkHref}]`}
                      </Text>
                    );
                  })}
                </Text>
              </View>
            );
          }
        }
      } else if (part.type === "list") {
        for (const item of part.items) {
          if (item.text) {
            const formattedParts = parseFormattedText(item.text);
            views.push(
              <View key={`item-${views.length}`} style={{ marginBottom: 4 }}>
                <Text style={pdfStyles.value}>
                  {formattedParts.map((part, idx) => {
                    const textStyle = { ...pdfStyles.value };
                    if (part.isBold) textStyle.fontWeight = "bold";
                    if (part.isUnderline)
                      textStyle.textDecoration = "underline";
                    if (part.linkHref) textStyle.color = "#0066CC"; // Màu xanh cho link
                    return (
                      <Text key={idx} style={textStyle}>
                        {part.text}
                        {part.linkHref && ` [${part.linkHref}]`}
                      </Text>
                    );
                  })}
                </Text>
              </View>
            );
          }
        }
      }
    }

    return views.length > 0 ? <View>{views}</View> : null;
  }

  // Nếu không có list, xử lý paragraphs
  const paragraphs = trimmedHtml
    .split(/<\/p>/i)
    .map((p) => p.replace(/<p[^>]*>/i, "").trim())
    .filter((p) => p);

  if (paragraphs.length === 0) {
    return null;
  }

  const views = [];
  for (const para of paragraphs) {
    if (para) {
      const formattedParts = parseFormattedText(para);
      if (formattedParts.length > 0) {
        views.push(
          <View key={`para-${views.length}`} style={{ marginBottom: 8 }}>
            <Text style={pdfStyles.value}>
              {formattedParts.map((part, idx) => {
                const textStyle = { ...pdfStyles.value };
                if (part.isBold) textStyle.fontWeight = "bold";
                if (part.isUnderline) textStyle.textDecoration = "underline";
                if (part.linkHref) textStyle.color = "#0066CC"; // Màu xanh cho link
                return (
                  <Text key={idx} style={textStyle}>
                    {part.text}
                    {part.linkHref && ` [${part.linkHref}]`}
                  </Text>
                );
              })}
            </Text>
          </View>
        );
      }
    }
  }

  return views.length > 0 ? <View>{views}</View> : null;
}
// Cấu trúc các section và trường theo khung hồ sơ dự án
export const FORM_SECTIONS = [
  {
    title: "THÔNG TIN CHUNG DỰ ÁN",
    fields: [
      {
        label: "Tên Dự án",
        key: "projectName",
        type: "input",
        placeholder: "VD: EcoMart - Ứng dụng mua sắm xanh",
      },
      { label: "Logo dự án", key: "logo", type: "image", placeholder: "" },
      {
        label: "Lĩnh vực",
        key: "field",
        type: "input",
        placeholder: "VD: Công nghệ, E-commerce, Bền vững",
      },
      {
        label: "Đơn vị thực hiện",
        key: "organization",
        type: "input",
        placeholder: "VD: TRƯỜNG ĐH KINH TẾ QUỐC DÂN",
      },
      {
        label: "Thời gian thực hiện",
        key: "time",
        type: "input",
        placeholder: "VD: Hà Nội, Tháng 9/2024 - Tháng 3/2025",
      },
      {
        label: "Nhóm thực hiện & Giảng viên hướng dẫn",
        key: "teamInfo",
        type: "rich",
        placeholder:
          "VD: Phạm Thị A (Trưởng nhóm), Trần Văn B, Lê Thị C... GV hướng dẫn: ThS. Nguyễn Văn D",
      },
    ],
  },
  {
    title: "PHẦN 1: TÓM TẮT DỰ ÁN",
    fields: [
      {
        label: "Ý tưởng chính",
        key: "mainIdea",
        type: "rich",
        placeholder:
          "VD: Tạo nền tảng kết nối người tiêu dùng với cửa hàng bán hàng hóa sinh thái bền vững...",
      },
      {
        label: "Sản phẩm, dịch vụ & Giá trị",
        key: "productValue",
        type: "rich",
        placeholder:
          "VD: Ứng dụng mobile giúp người dùng tìm kiếm, mua sắm sản phẩm eco-friendly với giá tốt. Lợi ích: tiết kiệm thời gian, giá cạnh tranh 10-20% so với cửa hàng...",
      },
      {
        label: "Hình ảnh sản phẩm (nhiều)",
        key: "productImages",
        type: "images",
        placeholder: "",
      },
    ],
  },
  {
    title: "PHẦN 2: NỘI DUNG CHÍNH CỦA DỰ ÁN",
    subtitle: "A. TỔNG QUAN DỰ ÁN",
    fields: [
      {
        label: "Sứ mệnh",
        key: "mission",
        type: "rich",
        placeholder:
          "VD: Giảm thiểu lãng phí thực phẩm bằng cách kết nối nhà hàng với người tiêu dùng để bán đồ ăn thừa...",
      },
      {
        label: "Tầm nhìn",
        key: "vision",
        type: "rich",
        placeholder:
          "VD: Trở thành nền tảng số 1 tại Việt Nam trong lĩnh vực kinh tế chia sẻ (sharing economy) cho thực phẩm...",
      },
      {
        label: "Giá trị sản phẩm",
        key: "productCoreValue",
        type: "rich",
        placeholder:
          "VD: Tiết kiệm chi phí cho quán ăn 30-40%, giá rẻ 50% cho khách hàng, bảo vệ môi trường...",
      },
    ],
  },
  {
    title: "",
    subtitle: "B. THÔNG TIN VỀ SẢN PHẨM, DỊCH VỤ",
    fields: [
      {
        label: "Khách hàng mục tiêu",
        key: "targetCustomer",
        type: "rich",
        placeholder:
          "VD: Quán ăn, nhà hàng, cafeteria có 50-500 nhân viên. Khách hàng là người trẻ 18-35 tuổi, yêu thích ăn uống bền vững...",
      },
      {
        label: "Lợi thế cạnh tranh",
        key: "advantage",
        type: "rich",
        placeholder:
          "VD: Công nghệ AI dự đoán lượng hàng thừa, giao diện thân thiện, độ phủ sóng rộng, hỗ trợ 24/7...",
      },
      {
        label: "Giá trị mang lại cho cộng đồng và xã hội",
        key: "communityValue",
        type: "rich",
        placeholder:
          "VD: Giảm lãng phí thực phẩm 50%, tạo việc làm cho 100+ người, giảm phát thải CO2 100 tấn/năm...",
      },
    ],
  },
  {
    title: "",
    subtitle: "C. PHÂN TÍCH TÍNH KHẢ THI",
    fields: [
      {
        label: "Quy mô thị trường",
        key: "marketSize",
        type: "rich",
        placeholder:
          "VD: Thị trường thực phẩm Việt Nam: 80 tỷ USD, tăng 5%/năm. Segment sharing economy: 2 tỷ USD, tăng 20%/năm...",
      },
      {
        label: "Đối tác & Nguồn nhân lực",
        key: "partners",
        type: "rich",
        placeholder:
          "VD: Đối tác: Grab, 100+ quán ăn lớn. Nguồn lực: 5 dev, 2 designer, 1 PM, hỗ trợ từ Trường ĐH...",
      },
      {
        label: "Tài chính (Khởi đầu)",
        key: "finance",
        type: "rich",
        placeholder:
          "VD: Chi phí khởi động: 2 tỷ (server, hosting, marketing). ROI: 8 tháng. Cần vốn: 1 tỷ...",
      },
      {
        label: "Tính khả thi",
        key: "feasibility",
        type: "rich",
        placeholder:
          "VD: Công nghệ sẵn có (React, Node.js), đội ngũ có kinh nghiệm, pháp luật ủng hộ...",
      },
      {
        label: "Sản phẩm & Dịch vụ",
        key: "products",
        type: "rich",
        placeholder:
          "VD: Ứng dụng mobile (iOS/Android), web dashboard quản lý, API tích hợp POS, AI dự đoán...",
      },
      {
        label: "Phân tích SWOT",
        key: "swot",
        type: "rich",
        placeholder:
          "VD: Mạnh: nhu cầu cao, tăng trưởng nhanh; Yếu: cạnh tranh lớn; Cơ hội: mở rộng sang Lào, Campuchia; Thách: quy định thực phẩm...",
      },
      {
        label: "Thuận lợi/Khó khăn",
        key: "prosCons",
        type: "rich",
        placeholder:
          "VD: Ưu: mô hình bền vững, thị trường lớn, tăng trưởng nhanh. Nhược: yêu cầu tuân thủ pháp luật phức tạp, chi phí vận hành cao...",
      },
      {
        label: "Tính độc đáo, sáng tạo",
        key: "creativity",
        type: "rich",
        placeholder:
          "VD: AI dự đoán lãng phí, gamification (tích điểm xanh), blockchain cho transparency, tích hợp carbon tracking...",
      },
    ],
  },
  {
    title: "",
    subtitle: "D. KẾ HOẠCH SẢN XUẤT, KINH DOANH & PHÁT TRIỂN",
    fields: [
      {
        label: "Kế hoạch kinh doanh (theo giai đoạn)",
        key: "businessPlan",
        type: "rich",
        placeholder:
          "VD: Q1: MVP, testing với 10 quán ăn. Q2: Launch chính thức, 50 quán ăn. Q3-Q4: Mở rộng 200+ quán. Năm 2: mở rộng sang 3 tỉnh...",
      },
      {
        label: "Kênh phân phối",
        key: "distribution",
        type: "rich",
        placeholder:
          "VD: Ứng dụng mobile (App Store, Google Play), web, phối hợp với Grab, quảng cáo Facebook/TikTok, PR...",
      },
      {
        label: "Phát triển, mở rộng thị trường",
        key: "marketDevelopment",
        type: "rich",
        placeholder:
          "VD: Năm 1: chiếm lĩnh Hà Nội (200 quán ăn). Năm 2: mở rộng TP.HCM (300 quán ăn). Năm 3: Lào, Campuchia (500+ quán). Năm 4: Thái Lan...",
      },
      {
        label: "Kết quả tiềm năng",
        key: "potentialResult",
        type: "rich",
        placeholder:
          "VD: Năm 1: 10,000 đơn/tháng, doanh thu 10 tỷ. Năm 2: 50,000 đơn/tháng, doanh thu 60 tỷ. Lợi nhuận 20-30%...",
      },
      {
        label: "Khả năng tăng trưởng, tác động xã hội",
        key: "growthImpact",
        type: "rich",
        placeholder:
          "VD: Tăng trưởng 300% hàng năm. Tác động: giảm lãng phí 50%, tạo 500 việc làm, tiết kiệm 5 tỷ cho người dùng/năm...",
      },
    ],
  },
  {
    title: "",
    subtitle: "E. NGUỒN LỰC THỰC HIỆN",
    fields: [
      {
        label: "Cơ cấu nhân sự (Team)",
        key: "team",
        type: "rich",
        placeholder:
          "VD: PM (1): Phạm Thị A. Dev (2): Trần Văn B, Lê Thị C. Designer (1): Ngô Minh D. Tư vấn: ThS. Nguyễn Văn E...",
      },
      {
        label: "Đánh giá nguồn nhân lực",
        key: "hrEvaluation",
        type: "rich",
        placeholder:
          "VD: PM có 2 năm kinh nghiệm startup. Dev: 3+ năm React/Node.js. Designer: 1+ năm UX/UI. Tư vấn có 10 năm kinh doanh...",
      },
      {
        label: "Đối tác hợp tác",
        key: "cooperation",
        type: "rich",
        placeholder:
          "VD: Công nghệ: AWS, Firebase. Logistics: Grab, Ahamove. Marketing: Facebook, TikTok. Tài chính: Techcombank...",
      },
    ],
  },
  {
    title: "",
    subtitle: "F. KÊNH TRUYỀN THÔNG VÀ TIẾP THỊ",
    fields: [
      {
        label: "Mục tiêu truyền thông",
        key: "mediaGoal",
        type: "rich",
        placeholder:
          "VD: Nâng cao nhận diện thương hiệu, tăng tải ứng dụng 10,000/tháng, xây dựng cộng đồng 100,000 followers...",
      },
      {
        label: "Đối tượng mục tiêu",
        key: "mediaTarget",
        type: "rich",
        placeholder:
          "VD: Chính: quán ăn, nhà hàng (25-50 tuổi). Phụ: khách hàng cá nhân (18-35 tuổi), yêu thích ăn uống bền vững, thu nhập 10M+/tháng...",
      },
      {
        label: "Kênh truyền thông",
        key: "mediaChannel",
        type: "rich",
        placeholder:
          "VD: TikTok (target trẻ), Facebook (target chủ quán), Instagram, YouTube, PR lên báo, Podcast, LinkedIn...",
      },
      {
        label: "Chiến dịch Marketing (Quý)",
        key: "marketingCampaign",
        type: "rich",
        placeholder:
          "VD: Q1: Soft launch + PR. Q2: TikTok challenge #EcoMart. Q3: Influencer collaboration. Q4: Holiday campaign, big sale...",
      },
      {
        label: "Công cụ truyền thông",
        key: "mediaTool",
        type: "rich",
        placeholder:
          "VD: Facebook Ads, TikTok Ads, Google SEO/SEM, Email marketing, SMS, Zalo, Chatbot, video content...",
      },
      {
        label: "Đo lường và đánh giá",
        key: "mediaMeasure",
        type: "rich",
        placeholder:
          "VD: KPI: 10,000 download, 50% retention sau 30 ngày, 100 quán ăn đăng ký. Tool: Google Analytics, Mixpanel, Facebook Pixel...",
      },
    ],
  },
];
export default function ProjectProfileFullForm({
  initialData = {},
  onChange,
  onPublish,
  onSave, // Thêm prop cho lưu dữ liệu
  compact = false, // Chế độ giao diện gọn (nhỏ lại)
  sectionIdPrefix = "ppf", // Prefix id cho từng section để tạo anchor
}) {
  // Toolbar background can be changed here
  const TOOLBAR_BG = "linear-gradient(180deg, rgba(255,255,255,0.99), #ececec)";
  const navigate = useNavigate();
  const [form, setForm] = useState(() => {
    const obj = {};
    FORM_SECTIONS.forEach((sec) =>
      sec.fields.forEach((f) => {
        obj[f.key] = initialData[f.key] || "";
      })
    );
    return obj;
  });
  const [focusKey, setFocusKey] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const editorRefs = useRef({});
  const [uploading, setUploading] = useState({}); // { fieldKey: boolean }
  // helpers for image uploads/previews
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  async function handleSingleImageChange(key, file) {
    if (!file) return;
    // show immediate preview using object URL
    const temp = URL.createObjectURL(file);
    handleChange(key, temp);
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const url = await uploadToCloudinary(file);
      // replace preview with returned URL
      handleChange(key, url);
    } catch (err) {
      console.error("Upload failed", err);
      // keep preview but optionally notify user
      // Could set an error state here
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  }
  async function handleMultipleImagesChange(key, filesList) {
    const files = Array.from(filesList || []);
    if (files.length === 0) return;
    const existing =
      form[key] && Array.isArray(form[key]) ? form[key].slice() : [];
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      for (const file of files) {
        // append temporary preview first
        const temp = URL.createObjectURL(file);
        existing.push(temp);
        handleChange(key, existing.slice());
        // upload and replace temp with final url
        try {
          const url = await uploadToCloudinary(file);
          const idx = existing.indexOf(temp);
          if (idx !== -1) {
            existing[idx] = url;
            handleChange(key, existing.slice());
            // revoke temp object url
            try {
              URL.revokeObjectURL(temp);
            } catch (e) {}
          } else {
            // fallback: push url
            existing.push(url);
            handleChange(key, existing.slice());
          }
        } catch (uploadErr) {
          console.error("Upload failed for one file", uploadErr);
          // leave temp preview so user can retry or remove
        }
      }
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  }
  function removeImageAt(key, idx) {
    const arr = (form[key] || []).slice();
    arr.splice(idx, 1);
    handleChange(key, arr);
  }
  function handleChange(key, value) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (onChange) onChange(next);
      return next;
    });
  }
  const handleDownload = () => {
    setTimeout(() => {
      if (window.$) {
        window
          .$('<div class="my-toast">Tải thành công!</div>')
          .appendTo("body")
          .fadeIn()
          .delay(2000)
          .fadeOut(function () {
            $(this).remove();
          });
      } else {
        alert("Tải thành công!");
      }
    }, 1000);
  };
  const handleViewPdf = () => {
    setShowPdfModal(true);
  };
  const handlePublishClick = async () => {
    // Trước tiên lưu project, sau đó navigate sang UploadProfile
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      alert("Bạn cần đăng nhập để đăng hồ sơ");
      return;
    }

    // Chuẩn bị payload để gửi lên backend
    const payload = {
      name: form.projectName || "Dự án chưa có tên",
      tagline: form.mainIdea ? form.mainIdea.substring(0, 150) : "",
      description: form.productValue || "",
      industry: form.field || "",
      stage: "y-tuong", // Default stage
      pain_point: form.mainIdea || "",
      solution: form.productValue || "",
      product: form.productValue || "",
      customer_segment: form.targetCustomer || "",
      customer_features: form.advantage || "",
      market_size: form.marketSize || "",
      market_area: "",
      business_model: form.businessPlan || "",
      revenue_method: form.businessPlan || "",
      distribution_channel: form.distribution || "",
      partners: form.partners || "",
      cost_estimate: form.finance || "",
      capital_source: "",
      revenue_goal: form.potentialResult || "",
      member_skills: form.team || "",
      resources: form.cooperation || "",
      deployment_location: form.deploymentLocation || "",
    };

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          ...authHeaders(token),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(payload)
              .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
              .filter(
                ([_, v]) =>
                  v !== undefined &&
                  v !== null &&
                  !(typeof v === "string" && v.length === 0)
              )
          )
        ),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(
          "Lỗi: " +
            (errorData.detail || errorData.message || "Vui lòng thử lại")
        );
        return;
      }

      const data = await res.json();
      console.log("✓ Project created:", data);

      // Navigate sang UploadProfile với projectId
      navigate("/profile/upload", {
        state: {
          projectId: data.id,
          project: data,
        },
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Lỗi khi đăng hồ sơ: " + err.message);
    }
  };
  const handleSaveClick = async () => {
    // Lưu dữ liệu qua API
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      alert("Bạn cần đăng nhập để lưu hồ sơ");
      return;
    }

    // Chuẩn bị payload để gửi lên backend
    const payload = {
      name: form.projectName || "Dự án chưa có tên",
      tagline: form.mainIdea ? form.mainIdea.substring(0, 150) : "",
      description: form.productValue || "",
      industry: form.field || "",
      stage: "y-tuong", // Default stage
      pain_point: form.mainIdea || "",
      solution: form.productValue || "",
      product: form.productValue || "",
      customer_segment: form.targetCustomer || "",
      customer_features: form.advantage || "",
      market_size: form.marketSize || "",
      market_area: "",
      business_model: form.businessPlan || "",
      revenue_method: form.businessPlan || "",
      distribution_channel: form.distribution || "",
      partners: form.partners || "",
      cost_estimate: form.finance || "",
      capital_source: "",
      revenue_goal: form.potentialResult || "",
      member_skills: form.team || "",
      resources: form.cooperation || "",
      deployment_location: form.deploymentLocation || "",
    };

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          ...authHeaders(token),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(payload)
              .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
              .filter(
                ([_, v]) =>
                  v !== undefined &&
                  v !== null &&
                  !(typeof v === "string" && v.length === 0)
              )
          )
        ),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(
          "Lỗi lưu hồ sơ: " +
            (errorData.detail || errorData.message || "Vui lòng thử lại")
        );
        return;
      }

      const data = await res.json();
      console.log("✓ Project created:", data);

      if (window.$) {
        window
          .$('<div class="my-toast">Lưu hồ sơ thành công!</div>')
          .appendTo("body")
          .fadeIn()
          .delay(2000)
          .fadeOut(function () {
            $(this).remove();
          });
      } else {
        alert("Lưu hồ sơ thành công!");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Lỗi khi lưu hồ sơ: " + err.message);
    }
  };
  // Kích thước chữ cho editor khi chế độ compact
  const editorFontSize = compact ? 14 : 15;
  return (
    // -mt-24: điện thoại(không thêm)
    // -mt-24: máy tính(thêm)
    <>
      <form className={`${compact ? "space-y-6" : "space-y-10"}`}>
        {FORM_SECTIONS.map((section, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-lg shadow ${
              compact ? "p-3 md:p-4" : "p-6"
            }`}
            id={`${sectionIdPrefix}-sec-${idx}`}
          >
            {(section.title || idx === 0) && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 relative z-10">
                {section.title && (
                  <h2
                    className={`${
                      compact ? "text-base" : "text-lg"
                    } font-bold text-blue-900 uppercase`}
                  >
                    {section.title}
                  </h2>
                )}
                {idx === 0 && (
                  <div className="order-2 sm:order-1 flex flex-col gap-2 sm:flex-row sm:gap-1.5 w-full sm:w-auto">
                    <div className="flex gap-1.5 justify-between sm:justify-start">
                      {/* Nút Xem trước - Nhỏ gọn chuyên nghiệp */}
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-150 z-20 flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={handleViewPdf}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Xem trước
                      </button>
                      {/* Nút Tải xuống - Nhỏ gọn chuyên nghiệp */}
                      <PDFDownloadLink
                        document={<MyDocument data={form} />}
                        fileName="ho-so-du-an.pdf"
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-md shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-all duration-150 no-underline z-20 flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={handleDownload}
                      >
                        {({ loading }) => (
                          <>
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {loading ? "Đang tạo..." : "Tải xuống"}
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                    <div className="flex gap-1.5 justify-between sm:justify-start">
                      {/* Nút Đăng đa nền tảng - Cải thiện style */}
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 z-20 flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={handlePublishClick}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Đăng bài
                      </button>
                      {/* Nút Lưu - Nhỏ gọn chuyên nghiệp */}
                      <button
                        type="button"
                        className="px-4 py-2 bg-slate-600 text-white text-sm font-semibold rounded-md shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 transition-all duration-150 z-20 flex items-center gap-1 flex-1 sm:flex-none"
                        onClick={handleSaveClick}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Lưu
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {section.subtitle && (
              <h3
                className={`${
                  compact ? "text-sm" : "text-base"
                } font-semibold mb-2 text-blue-700`}
              >
                {section.subtitle}
              </h3>
            )}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${
                compact ? "gap-4" : "gap-6"
              }`}
            >
              {section.fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "input" && (
                    <input
                      type="text"
                      className={`border rounded ${
                        compact ? "p-1.5 text-sm" : "p-2"
                      } bg-gray-50`}
                      value={form[field.key]}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      className={
                        field.key === "teamInfo"
                          ? `border rounded ${
                              compact ? "p-1.5 text-sm" : "p-2"
                            } bg-gray-50 min-h-[110px] w-full md:w-[560px]`
                          : `border rounded ${
                              compact ? "p-1.5 text-sm" : "p-2"
                            } bg-gray-50 min-h-[40px]`
                      }
                      value={form[field.key]}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                  {field.type === "image" && (
                    <div>
                      <input
                        id={`file-${field.key}`}
                        className={styles["file-input-hidden"]}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSingleImageChange(
                            field.key,
                            e.target.files && e.target.files[0]
                          )
                        }
                      />
                      <label
                        htmlFor={`file-${field.key}`}
                        className={styles["file-picker-btn"]}
                      >
                        {uploading[field.key] ? "Đang tải..." : "Chọn ảnh"}
                      </label>
                      {form[field.key] && (
                        <div className="mt-2">
                          <div className={styles.thumb}>
                            <img src={form[field.key]} alt="preview" />
                          </div>
                          <div>
                            <button
                              type="button"
                              className="text-sm text-red-500 mt-1"
                              onClick={() => handleChange(field.key, "")}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {field.type === "images" && (
                    <div>
                      <input
                        id={`file-${field.key}`}
                        className={styles["file-input-hidden"]}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleMultipleImagesChange(field.key, e.target.files)
                        }
                      />
                      <label
                        htmlFor={`file-${field.key}`}
                        className={styles["file-picker-btn"]}
                      >
                        {uploading[field.key]
                          ? "Đang tải..."
                          : "Chọn nhiều ảnh"}
                      </label>
                      {Array.isArray(form[field.key]) &&
                        form[field.key].length > 0 && (
                          <div className={styles.thumbnails}>
                            {form[field.key].map((src, i) => (
                              <div key={i} className={styles.thumb}>
                                <img src={src} alt={`preview-${i}`} />
                                {src && src.startsWith("blob:") && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 8,
                                      bottom: 6,
                                      background: "rgba(255,255,255,0.88)",
                                      padding: "2px 6px",
                                      borderRadius: 6,
                                      fontSize: 11,
                                    }}
                                  >
                                    Tạm xem
                                  </div>
                                )}
                                <button
                                  type="button"
                                  className={styles.removeBtn}
                                  onClick={() => removeImageAt(field.key, i)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  )}
                  {field.type === "rich" && (
                    <div className="relative">
                      {/* Always render the toolbar DOM element, only show when focused */}
                      <div
                        id={`quill-custom-toolbar-${field.key}`}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: field.key === "teamInfo" ? "-44px" : "-44px",
                          transform: "translateX(-50%)",
                          display: focusKey === field.key ? "flex" : "none",
                          alignItems: "center",
                          pointerEvents: "auto",
                          zIndex: 70,
                          // stronger shadow and darker gradient so toolbar doesn't blend into card background
                          boxShadow:
                            "0 22px 50px -22px rgba(15,23,42,0.22), 0 10px 30px -12px rgba(15,23,42,0.12)",
                          borderRadius: 10,
                          // subtle two-step gray gradient (top white -> bottom #ececec) for clearer separation
                          background: TOOLBAR_BG,
                          padding: "6px 10px",
                          minWidth: 0,
                          width: "auto",
                          gap: 8,
                          border: "1px solid #cfe3ff",
                          transition:
                            "transform 0.14s cubic-bezier(.2,.9,.3,1), box-shadow 0.14s ease, border-color 0.14s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateX(-50%) translateY(-6px) scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 28px 80px -28px rgba(15,23,42,0.28), 0 12px 36px -16px rgba(15,23,42,0.14)";
                          e.currentTarget.style.borderColor = "#8bc6ff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateX(-50%)";
                          e.currentTarget.style.boxShadow =
                            "0 22px 50px -22px rgba(15,23,42,0.22), 0 10px 30px -12px rgba(15,23,42,0.12)";
                          e.currentTarget.style.borderColor = "#cfe3ff";
                        }}
                      >
                        <span
                          className="ql-formats"
                          style={{ display: "flex", gap: 2 }}
                        >
                          <button
                            className="ql-bold quill-btn-beauty"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                          <button
                            className="ql-italic quill-btn-beauty"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                          <button
                            className="ql-underline quill-btn-beauty"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                        </span>
                        <span
                          className="ql-formats"
                          style={{ display: "flex", gap: 2 }}
                        >
                          <button
                            className="ql-list quill-btn-beauty"
                            value="ordered"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                          <button
                            className="ql-list quill-btn-beauty"
                            value="bullet"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                        </span>
                        <span
                          className="ql-formats"
                          style={{ display: "flex", gap: 2 }}
                        >
                          <button
                            className="ql-link quill-btn-beauty"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "none",
                              border: "none",
                              transition: "background 0.15s",
                            }}
                          />
                        </span>
                        <style>{`
                          /* Buttons */
                          .quill-btn-beauty:hover {
                            background: #eef2ff;
                            transform: translateY(-1px);
                          }
                          .quill-btn-beauty:focus {
                            outline: 2px solid #2563eb;
                            background: #eef2ff;
                          }
                          .quill-btn-beauty {
                            transition: transform 0.12s ease, background 0.12s ease;
                          }
                          /* Keep default Quill toolbars visually transparent, but exclude our custom toolbars by id prefix */
                          .ql-toolbar.ql-snow:not([id^="quill-custom-toolbar-"]) {
                            border: none !important;
                            padding: 0 !important;
                            background: transparent !important;
                          }
                          /* Force our custom toolbar id to use the configured background (important to override generic rules) */
                          #quill-custom-toolbar-${field.key} {
                            background: ${TOOLBAR_BG} !important;
                            border-radius: 10px;
                          }
                        `}</style>
                      </div>
                      <div
                        ref={(el) => (editorRefs.current[field.key] = el)}
                        style={
                          field.key === "teamInfo"
                            ? {
                                position: "relative",
                                width: "100%",
                                maxWidth: compact ? 560 : 600,
                                minHeight: compact ? 110 : 120,
                                background: "#f9fafb",
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                padding: 0,
                                boxSizing: "border-box",
                              }
                            : { position: "relative" }
                        }
                      >
                        <ReactQuill
                          value={form[field.key]}
                          onChange={(val) => handleChange(field.key, val)}
                          onFocus={() => setFocusKey(field.key)}
                          onBlur={() => setFocusKey(null)}
                          theme="snow"
                          placeholder={field.placeholder}
                          modules={{
                            toolbar: {
                              container: `#quill-custom-toolbar-${field.key}`,
                            },
                          }}
                          style={
                            field.key === "teamInfo"
                              ? {
                                  minHeight: compact ? 90 : 100,
                                  width: "100%",
                                  background: "transparent",
                                  border: "none",
                                  fontSize: editorFontSize,
                                  padding: compact ? 10 : 12,
                                  boxSizing: "border-box",
                                }
                              : undefined
                          }
                        />
                        {field.key === "teamInfo" && (
                          <style>{`
                            .ql-container.ql-snow {
                              border: none !important;
                              background: transparent !important;
                              border-radius: 8px !important;
                              font-size: ${editorFontSize}px !important;
                              font-family: inherit !important;
                              min-height: ${compact ? 90 : 100}px;
                              padding: 0 !important;
                            }
                            .ql-editor {
                              min-height: ${compact ? 90 : 100}px;
                              padding: ${compact ? 10 : 12}px !important;
                              background: transparent !important;
                              font-size: ${editorFontSize}px !important;
                              font-family: inherit !important;
                              color: #222;
                            }
                            .ql-editor.ql-blank::before {
                              color: #888 !important;
                              font-style: italic;
                              opacity: 1;
                              font-size: ${editorFontSize}px;
                            }
                          `}</style>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
      {/* Modal cho Xem trước PDF - Cải thiện modal để chuyên nghiệp hơn */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-stretch bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full flex flex-col border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Xem trước hồ sơ dự án (PDF)
              </h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <PDFViewer width="100%" height="100%" className="rounded-b-xl">
                <MyDocument data={form} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
