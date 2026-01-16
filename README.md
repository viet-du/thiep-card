🎓 Thiệp Mời Tốt Nghiệp THPT Online - Nguyễn Thị Trà My
Một trang web thiệp mời điện tử tương tác, sang trọng dành cho lễ tốt nghiệp THPT, được thiết kế với giao diện hiện đại, hiệu ứng đẹp mắt và tích hợp tính năng gửi lời chúc thời gian thực.

🔗 Demo: [Link Vercel dự án của bạn tại đây]

(Bạn có thể thay thế dòng này bằng ảnh chụp màn hình giao diện web thực tế)

✨ Tính Năng Nổi Bật
Dự án tập trung vào trải nghiệm người dùng trên thiết bị di động (Mobile First) với các tính năng:

✉️ Hiệu ứng Mở Phong Bì: Màn hình chào mừng mô phỏng phong bì thư thực tế với tem và hiệu ứng mở nắp khi chạm vào.

🎨 Giao diện "Golden Luxury": Tông màu chủ đạo Vàng Ánh Kim (Gold) & Trắng Kem, kết hợp font chữ Cormorant Garamond sang trọng.

📱 Album Ảnh Thông Minh (Mobile Optimized):

Hỗ trợ vuốt (swipe) mượt mà trên iPhone/Android.

Tự động chạy slideshow (Auto-slide).

Hiệu ứng chuyển cảnh và hiển thị caption tinh tế.

✍️ Sổ Lưu Bút Online (Real-time):

Cho phép khách mời gửi lời chúc mừng kèm tên và mối quan hệ.

Lưu trữ dữ liệu trực tiếp lên Google Firebase Firestore.

Hiển thị danh sách lời chúc ngay lập tức bên dưới.

🎵 Trình Phát Nhạc Nền: Tự động phát nhạc (bài Gió Nổi Lên Rồi) với nút bật/tắt và điều chỉnh âm lượng.

✨ Hiệu Ứng Visual: Kim tuyến rơi, chim bay, hoa rơi và hiệu ứng ánh sáng vàng lung linh.

📅 Lịch Sự Kiện: Hiển thị ngày giờ, địa điểm tổ chức (Sân trường THPT Phạm Văn Đồng) rõ ràng.

🛠 Công Nghệ Sử Dụng
Frontend: HTML5, CSS3 (Flexbox/Grid, Animation), JavaScript (ES6 Modules).

Backend / Database: Firebase Firestore (NoSQL) để lưu trữ lời chúc.

Hosting: Vercel (đã cấu hình vercel.json để bảo mật headers).

Assets: Font Awesome (Icons), Google Fonts.

📂 Cấu Trúc Thư Mục
.
├── admin.html             # Trang quản trị đơn giản để xem danh sách lời chúc
├── index.html             # Trang chính (Thiệp mời)
├── style.css              # Toàn bộ CSS (Responsive, Effects, Layout)
├── firebase.json          # Cấu hình Firebase Hosting/Firestore
├── firestore.rules        # Quy tắc bảo mật Database
├── vercel.json            # Cấu hình Header bảo mật cho Vercel
├── js/
│   ├── album.js           # Xử lý Logic Album ảnh (Swipe, Slide)
│   ├── auto-slide.js      # Tự động chuyển ảnh
│   ├── music.js           # Xử lý trình phát nhạc
│   ├── wishes.js          # Logic gửi/nhận lời chúc từ Firestore
│   ├── firebase-config.js # Chứa key kết nối Firebase (cần tạo file này)
│   └── effects.js         # Các hiệu ứng visual
└── assets/                # Chứa hình ảnh (image/) và nhạc (music/)
🚀 Hướng Dẫn Cài Đặt (Local)
Clone dự án:

Bash

git clone https://github.com/username/project-name.git
cd project-name
Cấu hình Firebase:

Tạo file js/firebase-config.js.

Lấy config từ Firebase Console và điền vào:

JavaScript

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
Chạy dự án:

Bạn có thể dùng Live Server của VS Code để chạy file index.html.

☁️ Triển Khai Lên Vercel
Dự án đã có sẵn file vercel.json để tối ưu hóa bảo mật.

Đẩy code lên GitHub.

Vào Vercel, chọn Add New Project.

Import repository từ GitHub.

Nhấn Deploy.

Lưu ý: Đảm bảo file js/firebase-config.js đã được commit hoặc cấu hình biến môi trường nếu cần thiết.

🔒 Bảo Mật & Firebase Rules
File firestore.rules hiện tại đang được cấu hình cho phép đọc/ghi công khai đến ngày 13/02/2026.

JavaScript

allow read, write: if request.time < timestamp.date(2026, 2, 13);
Sau ngày này, database sẽ tự động khóa để tránh spam.

📱 Tối Ưu Hóa Mobile (iOS/Safari)
Dự án đã xử lý các vấn đề đặc thù trên iOS Safari:

Fix lỗi touch-action để vuốt album mượt mà.

Ngăn chặn zoom khi focus vào ô nhập liệu (input).

Tăng vùng chạm (touch area) cho các nút điều hướng.

© 2026 Thiệp Mời Tốt Nghiệp - Developed with ❤️ by [Tên Của Bạn]
