// mobile-album.js - FIX SẠCH, KHÔNG XUNG ĐỘT album.js
// Chỉ tối ưu trải nghiệm mobile, KHÔNG can thiệp logic album

(function () {
    // Kiểm tra mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    // Kiểm tra iOS
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // Tối ưu ảnh cho mobile (KHÔNG ghi đè CSS)
    function optimizeImagesForMobile() {
        if (!isMobileDevice()) return;

        const images = document.querySelectorAll('.photo-item img');
        images.forEach(img => {
            img.style.webkitUserDrag = 'none';
            img.style.userSelect = 'none';
        });
    }

    // Tối ưu riêng cho iPhone
    function optimizeForIPhone() {
        if (!isMobileDevice() || !isIOS()) return;

        const albumWrapper = document.querySelector('.album-wrapper');
        const photoItems = document.querySelectorAll('.photo-item');

        if (albumWrapper) {
            albumWrapper.style.webkitOverflowScrolling = 'touch';
            albumWrapper.style.touchAction = 'pan-x';
        }

        photoItems.forEach(item => {
            item.style.webkitTapHighlightColor = 'transparent';
        });

        // Đảm bảo nút điều hướng luôn hiện
        const left = document.querySelector('.left-control');
        const right = document.querySelector('.right-control');
        if (left) left.style.display = 'flex';
        if (right) right.style.display = 'flex';
    }

    // Khởi tạo sau khi album đã render
    function initMobileAlbumFix() {
        optimizeImagesForMobile();
        optimizeForIPhone();
    }

    // DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initMobileAlbumFix, 800);
    });

    // Resize
    window.addEventListener('resize', () => {
        clearTimeout(window.__albumResizeTimer);
        window.__albumResizeTimer = setTimeout(initMobileAlbumFix, 300);
    });
})();
