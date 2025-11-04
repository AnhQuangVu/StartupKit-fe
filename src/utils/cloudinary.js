// src/utils/cloudinary.js

// Đọc cấu hình từ biến môi trường (Vite) với fallback an toàn
const CLOUDINARY_UPLOAD_PRESET = (import.meta?.env?.VITE_CLOUDINARY_UPLOAD_PRESET) || "startupkit_unsigned";
const CLOUDINARY_CLOUD_NAME = (import.meta?.env?.VITE_CLOUDINARY_CLOUD_NAME) || "dkzcttywh"; // Thay bằng cloud_name của bạn

function createAbortError() {
  const err = new Error('Operation aborted');
  // Giữ tương thích với AbortError của trình duyệt
  err.name = 'AbortError';
  return err;
}

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

export async function uploadToCloudinary(file, options = {}) {
  const { onProgress, signal } = options;
  let uploadFile = file;
  // Điều kiện nén: file > 1.2MB hoặc không phải vector và không quá nhỏ
  const SHOULD_COMPRESS = (file.size > 1_200_000)
    && /^image\//.test(file.type)
    && file.type !== 'image/svg+xml'
    && file.type !== 'image/gif';
  if (signal?.aborted) {
    throw createAbortError();
  }
  if (SHOULD_COMPRESS) {
    try {
      const t0 = performance.now();
      uploadFile = await compressImage(file);
      if (signal?.aborted) {
        throw createAbortError();
      }
      const t1 = performance.now();
    } catch (e) {
      uploadFile = file;
    }
  }

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // Use XMLHttpRequest to track upload progress if callback provided; fallback to fetch otherwise
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  if (typeof onProgress === 'function' && typeof XMLHttpRequest !== 'undefined') {
    try {
      const xhr = new XMLHttpRequest();
      const p = new Promise((resolve, reject) => {
        xhr.open('POST', endpoint);
        // Wire AbortController -> XHR
        let abortHandler;
        if (signal) {
          abortHandler = () => {
            try { xhr.abort(); } catch {}
          };
          if (signal.aborted) {
            abortHandler();
          } else {
            try { signal.addEventListener('abort', abortHandler, { once: true }); } catch {}
          }
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            try {
              const data = JSON.parse(xhr.responseText || '{}');
              if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
                if (signal && abortHandler) try { signal.removeEventListener('abort', abortHandler); } catch {}
                resolve(data.secure_url);
              } else {
                let msg = 'Lỗi upload ảnh lên Cloudinary.';
                if (data?.error?.message) msg += "\n" + data.error.message;
                if (signal && abortHandler) try { signal.removeEventListener('abort', abortHandler); } catch {}
                reject(new Error(msg));
              }
            } catch (e) {
              if (signal && abortHandler) try { signal.removeEventListener('abort', abortHandler); } catch {}
              reject(new Error('Không thể đọc phản hồi từ Cloudinary.'));
            }
          }
        };
        if (xhr.upload && onProgress) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / event.total) * 100);
              try { onProgress(percent); } catch {}
            }
          };
        }
        xhr.onerror = () => {
          if (signal && abortHandler) try { signal.removeEventListener('abort', abortHandler); } catch {}
          reject(new Error('Lỗi mạng khi upload ảnh.'));
        };
        xhr.onabort = () => {
          if (signal && abortHandler) try { signal.removeEventListener('abort', abortHandler); } catch {}
          reject(createAbortError());
        };
        xhr.send(formData);
      });
      return await p;
    } catch (err) {
      // fallthrough to fetch
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      // Truyền signal để có thể hủy với AbortController
      signal,
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      throw new Error("Không thể đọc phản hồi từ Cloudinary. Kiểm tra kết nối mạng hoặc cấu hình.");
    }

    if (data.error) {
      let msg = "Lỗi upload ảnh lên Cloudinary.";
      if (data.error.message) msg += "\n" + data.error.message;
      if (data.error.http_code) msg += ` (HTTP ${data.error.http_code})`;
      if (data.error.name) msg += `\n${data.error.name}`;
      throw new Error(msg);
    }

    if (!data.secure_url) {
      throw new Error("Upload thành công nhưng không nhận được URL ảnh. Kiểm tra lại preset và cloud_name.");
    }

    return data.secure_url;
  } catch (err) {
    throw err;
  }
}
