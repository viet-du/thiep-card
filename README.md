🎓 Thiệp Mời Tốt Nghiệp THPT Online – Nguyễn Thị Trà My

Một trang web thiệp mời điện tử tương tác, sang trọng, được thiết kế dành riêng cho lễ tốt nghiệp THPT, tập trung vào trải nghiệm người dùng trên thiết bị di động, hiệu ứng mượt mà và tích hợp sổ lưu bút thời gian thực.

🔗 Demo:
👉 https://<link-vercel-của-bạn>.vercel.app

📸 (Bạn có thể thay dòng này bằng ảnh chụp màn hình giao diện web thực tế)

✨ Tính Năng Nổi Bật

Dự án được xây dựng theo hướng Mobile First, tối ưu cho iOS & Android.

✉️ Hiệu Ứng Mở Phong Bì

Màn hình chào mừng mô phỏng phong bì thư thật

Có tem, nắp thư và hiệu ứng mở khi chạm

🎨 Giao Diện “Golden Luxury”

Tông màu Vàng Ánh Kim (Gold) & Trắng Kem

Font chữ Cormorant Garamond sang trọng, tinh tế

📱 Album Ảnh Thông Minh (Mobile Optimized)

Vuốt ảnh mượt mà (Swipe) trên iPhone / Android

Tự động chạy slideshow (Auto-slide)

Hiệu ứng chuyển cảnh nhẹ nhàng, có caption

✍️ Sổ Lưu Bút Online (Real-time)

Khách mời gửi lời chúc kèm tên & mối quan hệ

Dữ liệu lưu trực tiếp lên Firebase Firestore

Lời chúc hiển thị ngay lập tức không cần tải lại trang

🎵 Trình Phát Nhạc Nền

Tự động phát nhạc: “Gió Nổi Lên Rồi”

Có nút bật / tắt & điều chỉnh âm lượng

✨ Hiệu Ứng Visual

Kim tuyến rơi

Chim bay

Hoa rơi

Ánh sáng vàng lung linh tạo không khí lễ tốt nghiệp

📅 Thông Tin Sự Kiện

Ngày – giờ – địa điểm rõ ràng

Sân trường THPT Phạm Văn Đồng

🛠 Công Nghệ Sử Dụng
Frontend

HTML5

CSS3 (Flexbox, Grid, Animation)

JavaScript ES6 Modules

Backend / Database

Firebase Firestore (NoSQL) – lưu trữ lời chúc

Hosting

Vercel

Có cấu hình vercel.json để bảo mật HTTP headers

Assets

Font Awesome (Icons)

Google Fonts

📂 Cấu Trúc Thư Mục
.
├── admin.html              # Trang quản trị xem danh sách lời chúc
├── index.html              # Trang chính (Thiệp mời)
├── style.css               # Toàn bộ CSS (Responsive, Effects, Layout)
├── firebase.json           # Cấu hình Firebase
├── firestore.rules         # Quy tắc bảo mật Firestore
├── vercel.json             # Cấu hình bảo mật cho Vercel
├── js/
│   ├── album.js            # Logic album ảnh (Swipe)
│   ├── auto-slide.js       # Tự động chuyển ảnh
│   ├── music.js            # Trình phát nhạc nền
│   ├── wishes.js           # Gửi & nhận lời chúc Firestore
│   ├── firebase-config.js  # Kết nối Firebase (tự tạo)
│   └── effects.js          # Hiệu ứng visual
└── assets/
    ├── image/              # Hình ảnh
    └── music/              # Nhạc nền

🚀 Hướng Dẫn Cài Đặt (Local)
1️⃣ Clone dự án
git clone https://github.com/username/project-name.git
cd project-name

2️⃣ Cấu hình Firebase

Tạo file:

js/firebase-config.js


Nội dung mẫu:

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

3️⃣ Chạy dự án

Mở index.html

Hoặc dùng Live Server trong VS Code

☁️ Triển Khai Lên Vercel

Dự án đã sẵn sàng để deploy.

Các bước:

Push code lên GitHub

Truy cập Vercel

Add New Project

Import repository

Nhấn Deploy

📌 Lưu ý:

Đảm bảo firebase-config.js đã được commit

Hoặc dùng biến môi trường nếu cần bảo mật key

🔒 Bảo Mật & Firebase Rules

File firestore.rules hiện được cấu hình:

allow read, write: if request.time < timestamp.date(2026, 2, 13);


⏳ Sau 13/02/2026, database sẽ tự động khóa để tránh spam.

📱 Tối Ưu Mobile (iOS / Safari)

Dự án đã xử lý các vấn đề phổ biến trên iOS:

Fix lỗi touch-action khi vuốt album

Ngăn zoom khi focus input

Tăng vùng chạm cho các nút điều hướng

© Bản Quyền

© 2026 Thiệp Mời Tốt Nghiệp
Developed with ❤️ by [Tên của bạn]
