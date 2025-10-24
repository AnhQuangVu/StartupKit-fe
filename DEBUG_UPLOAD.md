# 🐛 Hướng dẫn Debug Upload Ảnh Logo & Banner

## ✅ Các bước để upload ảnh thành công

### 1️⃣ Kiểm tra Cloudinary Configuration
```
File: src/utils/cloudinary.js
- CLOUDINARY_UPLOAD_PRESET = "startupkit_unsigned"
- CLOUDINARY_CLOUD_NAME = "dkzcttywh"
```

**Để lấy thông tin này:**
1. Đăng nhập vào Cloudinary (https://cloudinary.com)
2. Vào trang Dashboard
3. Copy **Cloud name** vào CLOUDINARY_CLOUD_NAME
4. Vào Settings → Upload (tab)
5. Tìm **Upload presets**
6. Tạo preset mới hoặc dùng preset có sẵn, chọn **Unsigned** mode
7. Copy tên preset vào CLOUDINARY_UPLOAD_PRESET

### 2️⃣ Test Upload trực tiếp
**Mở browser DevTools (F12) → Console tab**

Chạy code này để test:
```javascript
// Copy-paste vào console
const testFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
const formData = new FormData();
formData.append("file", testFile);
formData.append("upload_preset", "startupkit_unsigned");

fetch("https://api.cloudinary.com/v1_1/dkzcttywh/image/upload", {
  method: "POST",
  body: formData,
})
.then(r => r.json())
.then(d => console.log("✅ Success:", d))
.catch(e => console.error("❌ Error:", e));
```

### 3️⃣ Kiểm tra lỗi trên UI
**Trang tạo project (UploadProfile.jsx):**
1. Nhấn vào banner → chọn ảnh từ máy
2. Nhấn vào logo → chọn ảnh từ máy
3. Nhấn **"💾 Lưu hồ sơ"** để upload
4. Xem notification (toast message) ở góc phải dưới

**Các lỗi phổ biến:**

| Lỗi | Nguyên nhân | Cách fix |
|-----|-----------|--------|
| `invalid_upload_preset` | Preset name sai hoặc không tồn tại | Kiểm tra tên preset trên Cloudinary dashboard |
| `invalid_cloud_name` | Cloud name sai | Kiểm tra lại Cloud name từ Dashboard |
| `Not Authenticated` | Preset không phải Unsigned | Tạo preset mới ở Settings → Upload → Unsigned mode |
| `Request failed` | CORS hoặc network issue | Kiểm tra network tab, ensure Cloudinary CORS enabled |
| `No secure_url` | Response không hợp lệ | Xem console.log để debug response |

### 4️⃣ Xem chi tiết error
**Mở DevTools → Console tab:**
- Khi upload, sẽ có log chi tiết:
  ```
  🔄 Uploading to Cloudinary: { fileName, fileSize, fileType }
  ✅ Upload thành công: <secure_url>
  ❌ Cloudinary error: { ... }
  ```

### 5️⃣ Test flow hoàn chỉnh

**Trang "Hồ sơ dự án" (UploadProfile.jsx):**
```
1. Scroll đến section "Thông tin cơ bản"
2. Hover vào banner → nhấn "Tải lên ảnh banner"
3. Chọn ảnh từ máy (JPG/PNG)
4. Hover vào logo → nhấn chọn ảnh logo
5. Nhấn button "💾 Lưu hồ sơ" (có icon lưu khi có ảnh chờ upload)
6. Xem toast notification
   - ✅ "✓ Logo upload thành công" = OK
   - ❌ "⚠️ Upload logo thất bại: ..." = Có lỗi
```

### 6️⃣ Fallback behavior
Nếu upload Cloudinary fail:
- UI sẽ show warning toast nhưng vẫn lưu project
- Base64 ảnh được lưu tạm thời (preview sẽ hoạt động)
- Khi sửa lại upload thành công, URL Cloudinary sẽ thay thế base64

---

## 🔧 Cấu hình Cloudinary chi tiết

### Tạo Unsigned Upload Preset (bắt buộc):
1. Cloudinary Dashboard → Settings → Upload
2. Scroll đến "Upload presets"
3. Click "Add upload preset"
4. Điền:
   - **Name**: `startupkit_unsigned`
   - **Unsigned**: ✅ Check
   - Click "Save"

### (Optional) CORS Setup:
1. Settings → Security
2. Enabled CORS: Add domain của bạn
   - Localhost: `http://localhost:5173`
   - Production: `https://yourapp.com`

---

## 📱 Kiểm tra trên các trình duyệt
- Chrome ✅
- Firefox ✅
- Safari ✅ (ensure CORS enabled)
- Edge ✅

---

## 💡 Mẹo Debug
1. **Kiểm tra Network tab:**
   - DevTools → Network
   - Filter by "api.cloudinary.com"
   - Xem request/response detail

2. **Kiểm tra Console log:**
   - Filter by "Uploading" hoặc "Upload"
   - Sẽ thấy chi tiết từng step

3. **Test với ảnh khác:**
   - Đảm bảo file < 10MB
   - Format: JPG, PNG, WebP, GIF

---

## ✨ Khi upload thành công
- Logo hiển thị trong preview
- Banner hiển thị full width
- Data được lưu vào backend API
- Notification: "✓ Lưu project thành công!"

**Nếu vẫn gặp sự cố, lên console.log và share thông tin lỗi! 🚀**
