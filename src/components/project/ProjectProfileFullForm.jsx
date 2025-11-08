import React, { useState, useRef, useEffect } from "react";
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
// Register font hỗ trợ tiếng Việt (giả sử bạn đã tải Inter-VariableFont_opsz,wght.ttf và đặt trong src/fonts/)
import Inter from "../../config/Inter-VariableFont_opsz,wght.ttf";
import Logo from "../../assets/images/logo.png";
// Đăng ký font một lần
Font.register({
  family: "Inter",
  src: Inter,
});
// Styles cho PDF với thiết kế mới
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Inter",
    color: "#000000",
  },
  // Header với tên dự án và logo web
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#000000",
  },
  logoHeader: {
    width: 120,
    height: 30,
    objectFit: "contain",
  },
  // Đường kẻ ngang đen đậm dưới header
  headerDivider: {
    borderBottom: "2pt solid #000000",
    marginBottom: 20,
    width: "100%",
  },
  // Container cho logo dự án và thông tin chung
  projectInfoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 16,
    alignItems: "flex-start",
  },

  // Wrapper cho logo + tên dự án (căn giữa)
  projectLogoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },

  // Logo dự án
  projectLogoContainer: {
    width: 120,
    height: 120,
    // borderRadius: 8,
    // border: "2pt solid #E5E7EB",
    overflow: "hidden",
    flexShrink: 0,
  },
  projectLogo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  // Tên dự án dưới logo
  projectNameUnderLogo: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#374151",
    textAlign: "center",
    maxWidth: 120,
  },

  // Container cho thanh dọc + thông tin (wrap lại)
  infoWithDividerContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 16,
  },

  // Thanh màu dọc ngăn cách
  verticalDivider: {
    width: 10,
    backgroundColor: "#F59E0B",
    flexShrink: 0,
    alignSelf: "stretch",
  },
  // Container thông tin (không có background)
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "column",
    marginBottom: 3,
  },
  infoRowLabel: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#000000",
  },
  infoRowValue: {
    fontSize: 12,
    fontFamily: "Inter",
    color: "#374151", // Thay đổi từ #6B7280 sang #374151 (đậm hơn)
  },
  // Section với số to màu vàng cam
  sectionContainer: {
    marginBottom: 16,
  },
  sectionNumberRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  sectionNumber: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#F59E0B",
    marginRight: 12,
    lineHeight: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#F59E0B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingBottom: 4,
  },
  // Subsection title với bullet
  subsectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
    marginBottom: 12,
  },
  subsectionBullet: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#F59E0B",
    marginRight: 8,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#F59E0B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  // Info item với bullet tam giác
  infoItem: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 4,
  },
  infoBullet: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 7,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#F59E0B",
    marginRight: 8,
    marginTop: 6,
    flexShrink: 0,
    background: "white",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#000000",
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 11,
    fontFamily: "Inter",
    color: "#374151", // Thay đổi từ #6B7280 sang #374151 (đồng nhất)
    lineHeight: 1.6,
    marginTop: 2,
  },
  // Container cho hình ảnh sản phẩm
  imagesContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 4,
    border: "1pt solid #E5E7EB",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 9,
    color: "#6B7280",
    fontFamily: "Inter",
  },
  // Info box cho thông tin chung (trang 1)
  infoBox: {
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    borderLeft: "3pt solid #F59E0B",
  },
  infoBoxItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  infoBoxLabel: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#000000",
    width: 140,
  },
  infoBoxValue: {
    fontSize: 12,
    fontFamily: "Inter",
    color: "#6B7280",
    flex: 1,
  },
});

// Component PDF Document với layout mới
const MyDocument = ({ data }) => {
  const allProductImages = Array.isArray(data.productImages)
    ? data.productImages
    : [];

  const logoSource = Logo;
  const projectLogoSource = data.logo;

  // Helper để render info item với bullet
  const InfoItemWithBullet = ({ label, value, isRich = false }) => (
    <View style={pdfStyles.infoItem}>
      <View style={pdfStyles.infoBullet} />
      <View style={pdfStyles.infoContent}>
        <Text style={pdfStyles.infoLabel}>{label}</Text>
        {isRich ? (
          <View style={{ marginTop: 2 }}>
            {renderRichTextToPDF(value || "")}
          </View>
        ) : (
          <Text style={pdfStyles.infoValue}>{stripHtmlTags(value || "")}</Text>
        )}
      </View>
    </View>
  );

  const sections = [
    // Trang 1: Thông tin chung và Tóm tắt
    <Page key="page1" size="A4" style={pdfStyles.page}>
      {/* Header với logo web */}
      <View style={pdfStyles.pageHeader}>
        <Text style={pdfStyles.projectTitle}>
          {data.projectName || "[TÊN DỰ ÁN]"}
        </Text>
        <Image style={pdfStyles.logoHeader} source={logoSource} />
      </View>
      <View style={pdfStyles.headerDivider} />

      {/* Logo dự án + Tên dự án + Thanh dọc + Thông tin chung */}
      <View style={pdfStyles.projectInfoContainer}>
        {projectLogoSource && (
          <View style={pdfStyles.projectLogoWrapper}>
            <View style={pdfStyles.projectLogoContainer}>
              <Image style={pdfStyles.projectLogo} source={projectLogoSource} />
            </View>
            {data.projectName && (
              <Text style={pdfStyles.projectNameUnderLogo}>
                {data.projectName}
              </Text>
            )}
          </View>
        )}

        {projectLogoSource && (
          <View style={pdfStyles.infoWithDividerContainer}>
            <View style={pdfStyles.verticalDivider} />
            <View style={pdfStyles.infoContainer}>
              <View style={pdfStyles.infoRow}>
                <Text style={pdfStyles.infoRowLabel}>Lĩnh vực</Text>
                <Text style={pdfStyles.infoRowValue}>
                  {stripHtmlTags(data.field || "")}
                </Text>
              </View>
              <View style={pdfStyles.infoRow}>
                <Text style={pdfStyles.infoRowLabel}>Thời gian thực hiện</Text>
                <Text style={pdfStyles.infoRowValue}>
                  {stripHtmlTags(data.time || "")}
                </Text>
              </View>
              <View style={pdfStyles.infoRow}>
                <Text style={pdfStyles.infoRowLabel}>Đơn vị thực hiện</Text>
                <Text style={pdfStyles.infoRowValue}>
                  {stripHtmlTags(data.organization || "")}
                </Text>
              </View>
              <View style={pdfStyles.infoRow}>
                <Text style={pdfStyles.infoRowLabel}>
                  Nhóm thực hiện & Giảng viên hướng dẫn
                </Text>
                <Text style={pdfStyles.infoRowValue}>
                  {stripHtmlTags(data.teamInfo || "")}
                </Text>
              </View>
            </View>
          </View>
        )}

        {!projectLogoSource && (
          <View style={pdfStyles.infoContainer}>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoRowLabel}>Lĩnh vực</Text>
              <Text style={pdfStyles.infoRowValue}>
                {stripHtmlTags(data.field || "")}
              </Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoRowLabel}>Thời gian thực hiện</Text>
              <Text style={pdfStyles.infoRowValue}>
                {stripHtmlTags(data.time || "")}
              </Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoRowLabel}>Đơn vị thực hiện</Text>
              <Text style={pdfStyles.infoRowValue}>
                {stripHtmlTags(data.organization || "")}
              </Text>
            </View>
            <View style={pdfStyles.infoRow}>
              <Text style={pdfStyles.infoRowLabel}>
                Nhóm thực hiện & Giảng viên hướng dẫn
              </Text>
              <Text style={pdfStyles.infoRowValue}>
                {stripHtmlTags(data.teamInfo || "")}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Section 01: Tóm tắt dự án */}
      <View style={pdfStyles.sectionContainer}>
        <View style={pdfStyles.sectionNumberRow}>
          <Text style={pdfStyles.sectionNumber}>01</Text>
          <Text style={pdfStyles.sectionTitle}>TÓM TẮT DỰ ÁN</Text>
        </View>
      </View>

      <InfoItemWithBullet label="Ý tưởng chính" value={data.mainIdea} isRich />
      <InfoItemWithBullet
        label="Sản phẩm dịch vụ & Giá trị"
        value={data.productValue}
        isRich
      />

      {/* Hình ảnh sản phẩm */}
      {allProductImages.length > 0 && (
        <View style={pdfStyles.imagesContainer}>
          <Text style={{ ...pdfStyles.infoLabel, marginBottom: 8 }}>
            Hình ảnh sản phẩm
          </Text>
          <View style={pdfStyles.imagesGrid}>
            {allProductImages.slice(0, 6).map((img, idx) => (
              <Image key={idx} style={pdfStyles.productImage} source={img} />
            ))}
          </View>
        </View>
      )}

      {/* Số trang tự động */}
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Trang ${pageNumber}/${totalPages}`
        }
        fixed
      />
    </Page>,

    // Trang 2: Phần 02 - Nội dung chính
    <Page key="page2" size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.pageHeader}>
        <Text style={pdfStyles.projectTitle}>
          {data.projectName || "[TÊN DỰ ÁN]"}
        </Text>
        <Image style={pdfStyles.logoHeader} source={logoSource} />
      </View>
      <View style={pdfStyles.headerDivider} />

      {/* Section 02 */}
      <View style={pdfStyles.sectionContainer}>
        <View style={pdfStyles.sectionNumberRow}>
          <Text style={pdfStyles.sectionNumber}>02</Text>
          <Text style={pdfStyles.sectionTitle}>NỘI DUNG CHÍNH CỦA DỰ ÁN</Text>
        </View>
      </View>

      {/* A. Tổng quan dự án */}
      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>A. TỔNG QUAN DỰ ÁN</Text>
      </View>

      <InfoItemWithBullet label="Sứ mệnh" value={data.mission} isRich />
      <InfoItemWithBullet label="Tầm nhìn" value={data.vision} isRich />
      <InfoItemWithBullet
        label="Giá trị sản phẩm"
        value={data.productCoreValue}
        isRich
      />

      {/* B. Thông tin về sản phẩm */}
      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>
          B. THÔNG TIN VỀ SẢN PHẨM, DỊCH VỤ
        </Text>
      </View>

      <InfoItemWithBullet
        label="Khách hàng mục tiêu"
        value={data.targetCustomer}
        isRich
      />
      <InfoItemWithBullet
        label="Lợi thế cạnh tranh"
        value={data.advantage}
        isRich
      />
      <InfoItemWithBullet
        label="Giá trị mang lại cho cộng đồng và xã hội"
        value={data.communityValue}
        isRich
      />

      {/* Số trang tự động */}
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Trang ${pageNumber}/${totalPages}`
        }
        fixed
      />
    </Page>,

    // Trang 3: Phần C - Phân tích tính khả thi
    <Page key="page3" size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.pageHeader}>
        <Text style={pdfStyles.projectTitle}>
          {data.projectName || "[TÊN DỰ ÁN]"}
        </Text>
        <Image style={pdfStyles.logoHeader} source={logoSource} />
      </View>
      <View style={pdfStyles.headerDivider} />

      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>C. PHÂN TÍCH TÍNH KHẢ THI</Text>
      </View>

      <InfoItemWithBullet
        label="Quy mô thị trường"
        value={data.marketSize}
        isRich
      />
      <InfoItemWithBullet
        label="Đối tác và nguồn nhân lực"
        value={data.partners}
        isRich
      />
      <InfoItemWithBullet
        label="Tài chính (Khởi đầu)"
        value={data.finance}
        isRich
      />
      <InfoItemWithBullet
        label="Tính khả thi"
        value={data.feasibility}
        isRich
      />
      <InfoItemWithBullet
        label="Sản phẩm & Dịch vụ"
        value={data.products}
        isRich
      />
      <InfoItemWithBullet label="Phân tích SWOT" value={data.swot} isRich />
      <InfoItemWithBullet
        label="Thuận lợi/Khó khăn"
        value={data.prosCons}
        isRich
      />
      <InfoItemWithBullet
        label="Tính độc đáo, sáng tạo"
        value={data.creativity}
        isRich
      />

      {/* Số trang tự động */}
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Trang ${pageNumber}/${totalPages}`
        }
        fixed
      />
    </Page>,

    // Trang 4: Phần D
    <Page key="page4" size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.pageHeader}>
        <Text style={pdfStyles.projectTitle}>
          {data.projectName || "[TÊN DỰ ÁN]"}
        </Text>
        <Image style={pdfStyles.logoHeader} source={logoSource} />
      </View>
      <View style={pdfStyles.headerDivider} />

      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>
          D. KẾ HOẠCH SẢN XUẤT, KINH DOANH, PHÁT TRIỂN
        </Text>
      </View>

      <InfoItemWithBullet
        label="Kế hoạch kinh doanh (theo giai đoạn)"
        value={data.businessPlan}
        isRich
      />
      <InfoItemWithBullet
        label="Kênh phân phối"
        value={data.distribution}
        isRich
      />
      <InfoItemWithBullet
        label="Phát triển, mở rộng thị trường"
        value={data.marketDevelopment}
        isRich
      />
      <InfoItemWithBullet
        label="Kết quả tiềm năng"
        value={data.potentialResult}
        isRich
      />
      <InfoItemWithBullet
        label="Khả năng tăng trưởng, tác động xã hội"
        value={data.growthImpact}
        isRich
      />

      {/* Số trang tự động */}
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Trang ${pageNumber}/${totalPages}`
        }
        fixed
      />
    </Page>,

    // Trang 5: Phần E và F
    <Page key="page5" size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.pageHeader}>
        <Text style={pdfStyles.projectTitle}>
          {data.projectName || "[TÊN DỰ ÁN]"}
        </Text>
        <Image style={pdfStyles.logoHeader} source={logoSource} />
      </View>
      <View style={pdfStyles.headerDivider} />

      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>E. NGUỒN LỰC THỰC HIỆN</Text>
      </View>

      <InfoItemWithBullet
        label="Cơ cấu nhân sự (Team)"
        value={data.team}
        isRich
      />
      <InfoItemWithBullet
        label="Đánh giá nguồn nhân lực"
        value={data.hrEvaluation}
        isRich
      />
      <InfoItemWithBullet
        label="Đối tác hợp tác"
        value={data.cooperation}
        isRich
      />

      <View style={pdfStyles.subsectionContainer}>
        <Text style={pdfStyles.subsectionTitle}>
          F. KÊNH TRUYỀN THÔNG VÀ TIẾP THỊ
        </Text>
      </View>

      <InfoItemWithBullet
        label="Mục tiêu truyền thông"
        value={data.mediaGoal}
        isRich
      />
      <InfoItemWithBullet
        label="Đối tượng mục tiêu"
        value={data.mediaTarget}
        isRich
      />
      <InfoItemWithBullet
        label="Kênh truyền thông"
        value={data.mediaChannel}
        isRich
      />
      <InfoItemWithBullet
        label="Chiến dịch Marketing (quý)"
        value={data.marketingCampaign}
        isRich
      />
      <InfoItemWithBullet
        label="Công cụ truyền thông"
        value={data.mediaTool}
        isRich
      />
      <InfoItemWithBullet
        label="Đo lường và đánh giá"
        value={data.mediaMeasure}
        isRich
      />

      {/* Số trang tự động */}
      <Text
        style={pdfStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Trang ${pageNumber}/${totalPages}`
        }
        fixed
      />
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

    // Regex để nhận diện: tags, links, span, hoặc text content
    const regex =
      /(<b>|<strong>|<i>|<em>|<u>|<span[^>]*>|<a[^>]*>|<\/b>|<\/strong>|<\/i>|<\/em>|<\/u>|<\/span>|<\/a>|[^<]+)/gi;
    let match;
    let isBold = false;
    let isItalic = false;
    let isUnderline = false;
    let linkHref = null;
    let spanColor = null;

    while ((match = regex.exec(text)) !== null) {
      const token = match[0];

      // Xử lý opening tags
      if (token === "<b>" || token === "<strong>") {
        isBold = true;
      } else if (token === "<i>" || token === "<em>") {
        isItalic = true;
      } else if (token === "<u>") {
        isUnderline = true;
      } else if (token.match(/^<span\s+/i)) {
        // Extract color từ style attribute
        const styleMatch = token.match(/style=["']([^"']*)["']/i);
        if (styleMatch) {
          const styleContent = styleMatch[1];
          const colorMatch = styleContent.match(/color:\s*([^;]+)/i);
          if (colorMatch) {
            spanColor = colorMatch[1].trim();
          }
        }
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
      } else if (token === "</span>") {
        spanColor = null;
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
            color: spanColor,
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
                <Text style={pdfStyles.infoValue}>
                  {formattedParts.map((part, idx) => {
                    const textStyle = { ...pdfStyles.infoValue };
                    if (part.isBold) textStyle.fontWeight = "bold";
                    if (part.isUnderline)
                      textStyle.textDecoration = "underline";
                    if (part.color) textStyle.color = part.color;
                    if (part.linkHref) textStyle.color = "#0066CC";
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
                <Text style={pdfStyles.infoValue}>
                  {formattedParts.map((part, idx) => {
                    const textStyle = { ...pdfStyles.infoValue };
                    if (part.isBold) textStyle.fontWeight = "bold";
                    if (part.isUnderline)
                      textStyle.textDecoration = "underline";
                    if (part.color) textStyle.color = part.color;
                    if (part.linkHref) textStyle.color = "#0066CC";
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
            <Text style={pdfStyles.infoValue}>
              {formattedParts.map((part, idx) => {
                const textStyle = { ...pdfStyles.infoValue };
                if (part.isBold) textStyle.fontWeight = "bold";
                if (part.isUnderline) textStyle.textDecoration = "underline";
                if (part.color) textStyle.color = part.color;
                if (part.linkHref) textStyle.color = "#0066CC";
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
        label: "Hình ảnh sản phẩm (tối đa 6 hình)",
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
  onSave,
  compact = false,
  sectionIdPrefix = "ppf",
}) {
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
  const [uploading, setUploading] = useState({});
  const lastScrollPosition = useRef(0);
  const isUpdatingFromChatbot = useRef(false);

  // Thêm state và ref cho toast (thêm vào đầu component, sau các state hiện có)
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });
  const toastTimerRef = useRef(null);

  // Thêm hàm showToast
  const showToast = (message, type = "info", ms = 3500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: "", type: "info" });
      toastTimerRef.current = null;
    }, ms);
  };

  const closeToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
    setToast({ visible: false, message: "", type: "info" });
  };

  // Lưu vị trí scroll trước khi update
  useEffect(() => {
    const handleScroll = () => {
      if (!isUpdatingFromChatbot.current) {
        lastScrollPosition.current = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ngăn scroll khi form update từ chatbot
  useEffect(() => {
    if (isUpdatingFromChatbot.current) {
      const scrollPos = lastScrollPosition.current;
      // Khôi phục vị trí scroll
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPos,
          behavior: "instant",
        });
        isUpdatingFromChatbot.current = false;
      });
    }
  }, [form]);

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

  // Cập nhật hàm handleDownload
  const handleDownload = () => {
    showToast("✓ Tải xuống thành công!", "success");
  };

  // Cập nhật PDFDownloadLink với tên file động
  const pdfDownloadLinkProps = {
    document: <MyDocument data={form} />,
    fileName: `Hồ sơ dự án - ${form.projectName || "Chưa có tên"}.pdf`,
    className:
      "px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-md shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-all duration-150 no-underline z-20 flex items-center gap-1 flex-1 sm:flex-none",
    onClick: handleDownload,
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
      const res = await fetch(`${API_BASE}/projects/`, {
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
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    if (!token) {
      showToast("Bạn cần đăng nhập để lưu hồ sơ", "warning");
      return;
    }

    // Validation
    if (!form.projectName || form.projectName.trim().length < 3) {
      showToast("Tên dự án phải có ít nhất 3 ký tự", "warning");
      return;
    }

    // Lưu dữ liệu qua API
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
      const res = await fetch(`${API_BASE}/projects/`, {
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
        showToast(
          "❌ Lỗi lưu hồ sơ: " +
            (errorData.detail || errorData.message || "Vui lòng thử lại"),
          "error"
        );
        return;
      }

      const data = await res.json();
      console.log("✓ Project created:", data);

      showToast("✓ Lưu hồ sơ thành công!", "success");
    } catch (err) {
      console.error("Save error:", err);
      showToast("❌ Lỗi khi lưu hồ sơ: " + err.message, "error");
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
                        fileName={`Hồ sơ dự án - ${
                          form.projectName || "Chưa có tên"
                        }.pdf`}
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
                      {/* Nút Đăng đa nền tảng - Cải thiện style
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
                      </button> */}
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

      {/* Toast notification */}
      {toast.visible && (
        <div className="fixed right-4 bottom-6 z-50">
          <div
            className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${
              toast.type === "error"
                ? "bg-red-600"
                : toast.type === "success"
                ? "bg-green-600"
                : toast.type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800"
            }`}
          >
            <div className="flex-1">{toast.message}</div>
            <button
              onClick={closeToast}
              className="ml-2 opacity-90 hover:opacity-100 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
