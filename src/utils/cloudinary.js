// src/utils/cloudinary.js

const CLOUDINARY_UPLOAD_PRESET = "startupkit_unsigned";
const CLOUDINARY_CLOUD_NAME = "dkzcttywh"; // Thay bằng cloud_name của bạn

// Nén ảnh client-side để giảm dung lượng upload, tăng tốc & tiết kiệm băng thông
async function compressImage(file, { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        // Giữ tỉ lệ khi thu nhỏ
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Xuất JPEG chất lượng tốt; PNG lớn sẽ được chuyển sang JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Không thể nén ảnh.'));
            // Tạo File mới để giữ tên tương tự với đuôi .jpg
            const outFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
            resolve(outFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Không thể đọc ảnh để nén.'));
      const reader = new FileReader();
      reader.onload = () => { img.src = reader.result; };
      reader.onerror = () => reject(new Error('Không thể đọc file ảnh.'));
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
}

export async function uploadToCloudinary(file) {
  console.log('🔄 Uploading to Cloudinary:', { fileName: file.name, fileSize: file.size, fileType: file.type });

  let uploadFile = file;
  // Điều kiện nén: file > 1.2MB hoặc không phải vector và không quá nhỏ
  const SHOULD_COMPRESS = (file.size > 1_200_000) && /^image\//.test(file.type);
  if (SHOULD_COMPRESS) {
    try {
      const t0 = performance.now();
      uploadFile = await compressImage(file);
      const t1 = performance.now();
      console.log(`🗜️ Nén ảnh: ${Math.round(file.size/1024)}KB -> ${Math.round(uploadFile.size/1024)}KB in ${Math.round(t1 - t0)}ms`);
    } catch (e) {
      console.warn('⚠️ Không nén được ảnh, dùng file gốc. Lý do:', e?.message || e);
      uploadFile = file;
    }
  }

  const formData = new FormData();
  formData.append("file", uploadFile);
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
