import jsPDF from 'jspdf';
import { RobotoRegular } from './Roboto-Regular';

export function exportProjectPDF(form) {
  const doc = new jsPDF();
  // Thêm font Roboto
  doc.addFileToVFS('Roboto-Regular.ttf', RobotoRegular);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  doc.setFontSize(16);
  doc.text("Hồ sơ dự án khởi nghiệp", 10, 16);
  doc.setFontSize(12);
  doc.text("Tên dự án: " + (form.name || ""), 10, 30);
  doc.text("Slogan: " + (form.slogan || ""), 10, 38);
  doc.text("Lĩnh vực/ngành nghề: " + (form.industry || ""), 10, 46);
  doc.text("Địa điểm triển khai: " + (form.location || ""), 10, 54);
  doc.text("Giai đoạn: " + (form.stage || ""), 10, 62);
  doc.text("Mô tả ý tưởng: " + (form.idea || ""), 10, 70);
  doc.text("Mô tả sản phẩm/dịch vụ: " + (form.product || ""), 10, 78);
  doc.text("Vấn đề khách hàng: " + (form.painPoint || ""), 10, 86);
  doc.text("Giải pháp: " + (form.solution || ""), 10, 94);
  doc.text("Phân khúc khách hàng mục tiêu: " + (form.customerSegment || ""), 10, 102);
  doc.text("Đặc điểm khách hàng: " + (form.customerFeatures || ""), 10, 110);
  doc.text("Quy mô thị trường: " + (form.marketSize || ""), 10, 118);
  doc.text("Khu vực thị trường nhắm tới: " + (form.marketArea || ""), 10, 126);
  doc.text("Mô hình kinh doanh: " + (form.businessModel || ""), 10, 134);
  doc.text("Cách thức tạo doanh thu: " + (form.revenueMethod || ""), 10, 142);
  doc.text("Kênh phân phối / tiếp cận khách hàng: " + (form.distributionChannel || ""), 10, 150);
  doc.text("Đối tác chính: " + (form.partners || ""), 10, 158);
  doc.text("Số lượng thành viên: " + (form.memberCount || ""), 10, 166);
  doc.text("Vai trò chính / kỹ năng: " + (form.memberSkills || ""), 10, 174);
  doc.text("Nguồn lực hiện có: " + (form.resources || ""), 10, 182);
  doc.text("Chi phí lớn nhất dự kiến: " + (form.costEstimate || ""), 10, 190);
  doc.text("Nguồn vốn hiện tại: " + (form.capitalSource || ""), 10, 198);
  doc.text("Mục tiêu doanh thu ngắn hạn: " + (form.revenueGoal || ""), 10, 206);
  doc.save("ho-so-du-an.pdf");
}
