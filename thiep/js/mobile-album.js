// mobile-album.js - Tối ưu album trên mobile
// Lưu ý: Đây là phiên bản hoàn chỉnh, KHÔNG có xung đột với album.js

// Kiểm tra biến toàn cục từ album.js
let isMobile = false;
let currentPhotoIndex = 0;
let isAutoSliding = true;

// Kiểm tra thiết bị mobile
function checkMobileDevice() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Tối ưu ảnh cho mobile (ĐÃ SỬA)
function optimizeAlbumForMobile() {
    if (!isMobile) return;
    
    const photoItems = document.querySelectorAll('.photo-item img');
    
    photoItems.forEach(img => {
        // XÓA phần kiểm tra kích thước ảnh - để CSS kiểm soát
        // Đảm bảo ảnh luôn dùng object-fit: cover
        img.style.objectFit = 'cover';
        img.style.backgroundColor = 'transparent';
    });
}

// Tối ưu ảnh cho iPhone (ĐÃ SỬA)
function optimizeForIPhone() {
    if (!isMobile) return;
    
    // Kiểm tra nếu là iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return;
    
    const photoItems = document.querySelectorAll('.photo-item');
    const albumContainer = document.querySelector('.photo-album');
    
    // Điều chỉnh tối thiểu cho iOS - KHÔNG ghi đè CSS
    photoItems.forEach(item => {
        // Chỉ thêm styles cần thiết
        item.style.webkitTapHighlightColor = 'transparent';
        item.style.webkitUserSelect = 'none';
        item.style.userSelect = 'none';
        
        const img = item.querySelector('img');
        if (img) {
            img.style.objectFit = 'cover';
            img.style.webkitUserDrag = 'none';
        }
    });
    
    // Điều chỉnh container cho iOS
    if (albumContainer) {
        albumContainer.style.webkitOverflowScrolling = 'touch';
        albumContainer.style.touchAction = 'pan-x';
    }
}

// Hàm chính để tối ưu mobile
function optimizeForMobile() {
    checkMobileDevice();
    
    if (!isMobile) return;
    
    // Tối ưu chung cho mobile
    optimizeAlbumForMobile();
    
    // Tối ưu riêng cho iPhone
    optimizeForIPhone();
    
    console.log('Mobile album đã được tối ưu');
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Chờ 1 giây để đảm bảo album.js đã chạy xong
    setTimeout(() => {
        optimizeForMobile();
    }, 1000);
    
    // Thêm sự kiện resize
    window.addEventListener('resize', function() {
        // Debounce resize
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            optimizeForMobile();
        }, 250);
    });
});

// Export các hàm nếu cần
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        optimizeForMobile,
        optimizeForIPhone,
        optimizeAlbumForMobile
    };
}
