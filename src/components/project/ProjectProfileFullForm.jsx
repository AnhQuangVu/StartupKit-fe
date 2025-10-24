import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadToCloudinary } from "../../utils/cloudinary";
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
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.mainIdea || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Sản phẩm, dịch vụ & Giá trị</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.productValue || "")}
        </Text>
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
        <Text style={pdfStyles.value}>{stripHtmlTags(data.mission || "")}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tầm nhìn</Text>
        <Text style={pdfStyles.value}>{stripHtmlTags(data.vision || "")}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Giá trị sản phẩm</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.productCoreValue || "")}
        </Text>
      </View>
      <View style={pdfStyles.subheader}>
        <Text>B. THÔNG TIN VỀ SẢN PHẨM, DỊCH VỤ</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Khách hàng mục tiêu</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.targetCustomer || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Lợi thế cạnh tranh</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.advantage || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>
          Giá trị mang lại cho cộng đồng và xã hội
        </Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.communityValue || "")}
        </Text>
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
        <Text style={pdfStyles.value}>{stripHtmlTags(data.finance || "")}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tính khả thi</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.feasibility || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Sản phẩm & Dịch vụ</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.products || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Phân tích SWOT</Text>
        <Text style={pdfStyles.value}>{stripHtmlTags(data.swot || "")}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Thuận lợi/Khó khăn</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.prosCons || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Tính độc đáo, sáng tạo</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.creativity || "")}
        </Text>
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
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.businessPlan || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Kênh phân phối</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.distribution || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Phát triển, mở rộng thị trường</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.marketDevelopment || "")}
        </Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.label}>Kết quả tiềm năng</Text>
        <Text style={pdfStyles.value}>
          {stripHtmlTags(data.potentialResult || "")}
        </Text>
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
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\n/g, " ")
    .trim();
}
// Cấu trúc các section và trường theo khung hồ sơ dự án
const FORM_SECTIONS = [
  {
    title: "THÔNG TIN CHUNG DỰ ÁN",
    fields: [
      {
        label: "Tên Dự án",
        key: "projectName",
        type: "input",
        placeholder: "VD: GFU – GERMAN FOR U",
      },
      { label: "Logo dự án", key: "logo", type: "image", placeholder: "" },
      {
        label: "Lĩnh vực",
        key: "field",
        type: "input",
        placeholder: "Giáo dục, Dịch vụ, Tài chính, Du lịch",
      },
      {
        label: "Đơn vị thực hiện",
        key: "organization",
        type: "input",
        placeholder: "TRƯỜNG ĐẠI HỌC MỞ HÀ NỘI",
      },
      {
        label: "Thời gian thực hiện",
        key: "time",
        type: "input",
        placeholder: "Hà Nội, Tháng 12/2023",
      },
      {
        label: "Nhóm thực hiện & Giảng viên hướng dẫn",
        key: "teamInfo",
        type: "rich",
        placeholder: "Nhập thông tin các thành viên",
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
        placeholder: "Nhập ý tưởng chính...",
      },
      {
        label: "Sản phẩm, dịch vụ & Giá trị",
        key: "productValue",
        type: "rich",
        placeholder: "Nhập sản phẩm, dịch vụ, giá trị...",
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
        placeholder: "Nhập sứ mệnh...",
      },
      {
        label: "Tầm nhìn",
        key: "vision",
        type: "rich",
        placeholder: "Nhập tầm nhìn...",
      },
      {
        label: "Giá trị sản phẩm",
        key: "productCoreValue",
        type: "rich",
        placeholder: "Nhập giá trị sản phẩm...",
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
        placeholder: "Nhập khách hàng mục tiêu...",
      },
      {
        label: "Lợi thế cạnh tranh",
        key: "advantage",
        type: "rich",
        placeholder: "Nhập lợi thế cạnh tranh...",
      },
      {
        label: "Giá trị mang lại cho cộng đồng và xã hội",
        key: "communityValue",
        type: "rich",
        placeholder: "Nhập giá trị cộng đồng...",
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
        placeholder: "Nhập quy mô thị trường...",
      },
      {
        label: "Đối tác & Nguồn nhân lực",
        key: "partners",
        type: "rich",
        placeholder: "Nhập đối tác, nguồn lực...",
      },
      {
        label: "Tài chính (Khởi đầu)",
        key: "finance",
        type: "rich",
        placeholder: "Nhập tài chính...",
      },
      {
        label: "Tính khả thi",
        key: "feasibility",
        type: "rich",
        placeholder: "Nhập tính khả thi...",
      },
      {
        label: "Sản phẩm & Dịch vụ",
        key: "products",
        type: "rich",
        placeholder: "Nhập sản phẩm & dịch vụ...",
      },
      {
        label: "Phân tích SWOT",
        key: "swot",
        type: "rich",
        placeholder: "Nhập phân tích SWOT...",
      },
      {
        label: "Thuận lợi/Khó khăn",
        key: "prosCons",
        type: "rich",
        placeholder: "Nhập thuận lợi/khó khăn...",
      },
      {
        label: "Tính độc đáo, sáng tạo",
        key: "creativity",
        type: "rich",
        placeholder: "Nhập tính độc đáo, sáng tạo...",
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
        placeholder: "Nhập kế hoạch kinh doanh...",
      },
      {
        label: "Kênh phân phối",
        key: "distribution",
        type: "rich",
        placeholder: "Nhập kênh phân phối...",
      },
      {
        label: "Phát triển, mở rộng thị trường",
        key: "marketDevelopment",
        type: "rich",
        placeholder: "Nhập phát triển, mở rộng thị trường...",
      },
      {
        label: "Kết quả tiềm năng",
        key: "potentialResult",
        type: "rich",
        placeholder: "Nhập kết quả tiềm năng...",
      },
      {
        label: "Khả năng tăng trưởng, tác động xã hội",
        key: "growthImpact",
        type: "rich",
        placeholder: "Nhập khả năng tăng trưởng, tác động xã hội...",
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
        placeholder: "Nhập cơ cấu nhân sự...",
      },
      {
        label: "Đánh giá nguồn nhân lực",
        key: "hrEvaluation",
        type: "rich",
        placeholder: "Nhập đánh giá nguồn nhân lực...",
      },
      {
        label: "Đối tác hợp tác",
        key: "cooperation",
        type: "rich",
        placeholder: "Nhập đối tác hợp tác...",
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
        placeholder: "Nhập mục tiêu truyền thông...",
      },
      {
        label: "Đối tượng mục tiêu",
        key: "mediaTarget",
        type: "rich",
        placeholder: "Nhập đối tượng mục tiêu...",
      },
      {
        label: "Kênh truyền thông",
        key: "mediaChannel",
        type: "rich",
        placeholder: "Nhập kênh truyền thông...",
      },
      {
        label: "Chiến dịch Marketing (Quý)",
        key: "marketingCampaign",
        type: "rich",
        placeholder: "Nhập chiến dịch Marketing...",
      },
      {
        label: "Công cụ truyền thông",
        key: "mediaTool",
        type: "rich",
        placeholder: "Nhập công cụ truyền thông...",
      },
      {
        label: "Đo lường và đánh giá",
        key: "mediaMeasure",
        type: "rich",
        placeholder: "Nhập đo lường và đánh giá...",
      },
    ],
  },
];
export default function ProjectProfileFullForm({
  initialData = {},
  onChange,
  onPublish,
  onSave, // Thêm prop cho lưu dữ liệu
}) {
  // Toolbar background can be changed here
  const TOOLBAR_BG = "linear-gradient(180deg, rgba(255,255,255,0.99), #ececec)";
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
  // Function để tải PDF và báo thành công bằng jQuery toast
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
  const handlePublishClick = () => {
    if (onPublish) onPublish(); // Chuyển sang giao diện Đăng hồ sơ
  };
  const handleSaveClick = () => {
    // Tạm thời: console.log dữ liệu, sau này lưu vào DB
    console.log("Lưu dữ liệu:", form);
    if (onSave) onSave(form); // Gọi prop onSave nếu có
    // Có thể thêm toast thông báo lưu thành công tương tự
    if (window.$) {
      window
        .$('<div class="my-toast">Lưu thành công!</div>')
        .appendTo("body")
        .fadeIn()
        .delay(2000)
        .fadeOut(function () {
          $(this).remove();
        });
    } else {
      alert("Lưu thành công!");
    }
  };
  return (
    <>
      <form className="space-y-10 -mt-24">
        {FORM_SECTIONS.map((section, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            {(section.title || idx === 0) && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 relative z-10">
                {section.title && (
                  <h2 className="text-lg font-bold text-blue-900 uppercase">
                    {section.title}
                  </h2>
                )}
                {idx === 0 && (
                  <div className="flex gap-3 order-2 sm:order-1">
                    {/* Nút Xem trước - Cải thiện style */}
                    <button
                      type="button"
                      className="px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 z-20 flex items-center gap-2"
                      onClick={handleViewPdf}
                    >
                      <svg
                        className="w-4 h-4"
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
                    {/* Nút Tải xuống - Cải thiện style */}
                    <PDFDownloadLink
                      document={<MyDocument data={form} />}
                      fileName="ho-so-du-an.pdf"
                      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 no-underline z-20 flex items-center gap-2"
                      onClick={handleDownload}
                    >
                      {({ loading }) => (
                        <>
                          <svg
                            className="w-4 h-4"
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
                    {/* Nút Đăng đa nền tảng - Cải thiện style */}
                    <button
                      type="button"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 z-20 flex items-center gap-2"
                      onClick={handlePublishClick}
                    >
                      <svg
                        className="w-4 h-4"
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
                      Đăng đa nền tảng
                    </button>
                    {/* Nút Lưu - Cải thiện style */}
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 z-20 flex items-center gap-2"
                      onClick={handleSaveClick}
                    >
                      <svg
                        className="w-4 h-4"
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
                )}
              </div>
            )}
            {section.subtitle && (
              <h3 className="text-base font-semibold mb-2 text-blue-700">
                {section.subtitle}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label className="font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "input" && (
                    <input
                      type="text"
                      className="border rounded p-2 bg-gray-50"
                      value={form[field.key]}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      className={
                        field.key === "teamInfo"
                          ? "border rounded p-2 bg-gray-50 min-h-[120px] w-full md:w-[600px]"
                          : "border rounded p-2 bg-gray-50 min-h-[48px]"
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
                                maxWidth: 600,
                                minHeight: 120,
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
                                  minHeight: 100,
                                  width: "100%",
                                  background: "transparent",
                                  border: "none",
                                  fontSize: 15,
                                  padding: 12,
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
                              font-size: 15px !important;
                              font-family: inherit !important;
                              min-height: 100px;
                              padding: 0 !important;
                            }
                            .ql-editor {
                              min-height: 100px;
                              padding: 12px !important;
                              background: transparent !important;
                              font-size: 15px !important;
                              font-family: inherit !important;
                              color: #222;
                            }
                            .ql-editor.ql-blank::before {
                              color: #888 !important;
                              font-style: italic;
                              opacity: 1;
                              font-size: 15px;
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
