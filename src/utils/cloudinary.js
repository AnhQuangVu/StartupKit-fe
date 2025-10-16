// src/utils/cloudinary.js

const CLOUDINARY_UPLOAD_PRESET = "startupkit_unsigned";
const CLOUDINARY_CLOUD_NAME = "dkzcttywh"; // Thay bằng cloud_name của bạn

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || "Lỗi upload ảnh lên Cloudinary");
  }
  return data.secure_url;
}
