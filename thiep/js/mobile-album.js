// mobile-album.js - Tối ưu album trên mobile
function optimizeAlbumForMobile() {
    if (!isMobile) return;
    
    const photoItems = document.querySelectorAll('.photo-item img');
    
    photoItems.forEach(img => {
        // Kiểm tra kích thước ảnh
        img.onload = function() {
            const naturalWidth = this.naturalWidth;
            const naturalHeight = this.naturalHeight;
            const aspectRatio = naturalWidth / naturalHeight;
            
            // Nếu ảnh rộng hơn cao, điều chỉnh để hiển thị đầy đủ
            if (aspectRatio > 1) {
                this.style.objectFit = 'contain';
                this.style.backgroundColor = '#f5f0e6';
            } else {
                // Ảnh dọc, vẫn dùng contain
                this.style.objectFit = 'contain';
                this.style.backgroundColor = '#f5f0e6';
            }
        };
        
        // Nếu ảnh đã load
        if (img.complete) {
            img.onload();
        }
    });
    
    // Điều chỉnh swipe sensitivity
    setupMobileTouchSwipe();
}

function setupMobileTouchSwipe() {
    if (!isMobile) return;
    
    const albumContainer = document.querySelector('.photo-album');
    const track = document.getElementById('photo-track');
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = null;
    
    albumContainer.addEventListener('touchstart', touchStart);
    albumContainer.addEventListener('touchend', touchEnd);
    albumContainer.addEventListener('touchmove', touchMove);
    
    function touchStart(event) {
        touchStartX = event.touches[0].clientX;
        startPosition = getPositionX(event);
        isDragging = true;
        
        // Tạm dừng auto slide
        pauseAutoSlide();
        
        // Bắt đầu animation
        animationID = requestAnimationFrame(animation);
        
        // Reset transition
        track.style.transition = 'none';
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
        
        // Giới hạn swipe
        const maxTranslate = track.scrollWidth - albumContainer.clientWidth;
        currentTranslate = Math.min(Math.max(currentTranslate, 0), maxTranslate);
    }
    
    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - previousTranslate;
        
        // Nếu swipe đủ xa thì chuyển ảnh
        if (Math.abs(movedBy) > 50) {
            if (movedBy < 0 && currentPhotoIndex < graduationPhotos.length - 1) {
                // Swipe trái -> ảnh tiếp theo
                scrollToPhoto(currentPhotoIndex + 1);
            } else if (movedBy > 0 && currentPhotoIndex > 0) {
                // Swipe phải -> ảnh trước
                scrollToPhoto(currentPhotoIndex - 1);
            }
        } else {
            // Quay về vị trí cũ
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translateX(-${currentPhotoIndex * (track.querySelector('.photo-item').offsetWidth + 10)}px)`;
        }
        
        previousTranslate = currentTranslate;
        
        // Tiếp tục auto slide sau 3 giây
        setTimeout(() => {
            if (isAutoSliding) {
                startAutoSlide();
            }
        }, 3000);
    }
    
    function getPositionX(event) {
        return event.touches[0].clientX;
    }
    
    function animation() {
        track.style.transform = `translateX(-${currentTranslate}px)`;
        
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }
}

// Gọi hàm khi DOM ready
document.addEventListener('DOMContentLoaded', function() {
    if (isMobile) {
        setTimeout(optimizeAlbumForMobile, 1000); // Chờ 1 giây để đảm bảo ảnh load
    }
});

// Cập nhật khi resize
window.addEventListener('resize', function() {
    if (checkMobileDevice() && isMobile) {
        setTimeout(optimizeAlbumForMobile, 500);
    }
});
// Tối ưu ảnh cho iPhone
function optimizeForIPhone() {
    if (!isMobile) return;
    
    // Kiểm tra nếu là iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) return;
    
    const photoItems = document.querySelectorAll('.photo-item');
    const albumContainer = document.querySelector('.photo-album');
    
    // Điều chỉnh kích thước cho iOS
    photoItems.forEach(item => {
        item.style.cssText = `
            min-width: 85vw !important;
            height: 220px !important;
            margin: 0 8px !important;
            flex-shrink: 0;
            scroll-snap-align: center;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        `;
        
        const img = item.querySelector('img');
        if (img) {
            img.style.cssText = `
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                display: block !important;
                pointer-events: none;
            `;
        }
    });
    
    // Điều chỉnh container
    if (albumContainer) {
        albumContainer.style.cssText = `
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            padding: 10px 5px;
            margin: 0 -5px;
        `;
    }
}

// Gọi hàm khi load và resize
document.addEventListener('DOMContentLoaded', function() {
    if (isMobile) {
        setTimeout(optimizeForIPhone, 500);
    }
});

window.addEventListener('resize', function() {
    if (checkMobileDevice() && isMobile) {
        setTimeout(optimizeForIPhone, 300);
    }
});
