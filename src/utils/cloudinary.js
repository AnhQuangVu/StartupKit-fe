// src/utils/cloudinary.js

const CLOUDINARY_UPLOAD_PRESET = "startupkit_unsigned";
const CLOUDINARY_CLOUD_NAME = "dkzcttywh"; // Thay bằng cloud_name của bạn

export async function uploadToCloudinary(file) {
  console.log('🔄 Uploading to Cloudinary:', { fileName: file.name, fileSize: file.size, fileType: file.type });
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    
    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error('❌ Cloudinary response parsing error:', err);
      throw new Error("Không thể đọc phản hồi từ Cloudinary. Kiểm tra kết nối mạng hoặc cấu hình.");
    }
    
    if (data.error) {
      console.error('❌ Cloudinary error:', data.error);
      let msg = "Lỗi upload ảnh lên Cloudinary.";
      if (data.error.message) msg += "\n" + data.error.message;
      if (data.error.http_code) msg += ` (HTTP ${data.error.http_code})`;
      if (data.error.name) msg += `\n${data.error.name}`;
      throw new Error(msg);
    }
    
    if (!data.secure_url) {
      console.error('❌ No secure_url in response:', data);
      throw new Error("Upload thành công nhưng không nhận được URL ảnh. Kiểm tra lại preset và cloud_name.");
    }
    
    console.log('✅ Upload thành công:', data.secure_url);
    return data.secure_url;
  } catch (err) {
    console.error('❌ Upload error:', err);
    throw err;
  }
}
