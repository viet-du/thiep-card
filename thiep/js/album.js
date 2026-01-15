// album.js - Phiên bản hoàn chỉnh cho iPhone
// Danh sách ảnh dùng ảnh đại diện
const graduationPhotos = [
    { 
        src: 'assets/image/3.jpg', // Ảnh đại diện đầu trang
        alt: 'Học sinh tốt nghiệp',
        caption: 
    },
    { 
        src: 'assets/image/7.jpg', 
        alt: 'Tốt nghiệp THPT',
        caption: 
    },
    { 
        src: 'assets/image/4.jpg', 
        alt: 'Thành tích học tập',
        caption: 
    },
    { 
        src: 'assets/image/5.jpg', 
        alt: 'Tương lai rộng mở',
        caption: 
    }
];

// Biến toàn cục
let currentPhotoIndex = 0;
let isAutoSliding = true;
let autoSlideInterval;
let isMobile = false;

// Kiểm tra thiết bị mobile
function checkMobileDevice() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Tạo album ảnh với responsive - ĐÃ SỬA CHO IPHONE
function createPhotoAlbum() {
    const track = document.getElementById('photo-track');
    if (!track) return;
    
    track.innerHTML = '';
    track.style.width = '100%';

    
    graduationPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.flex = '0 0 100%';
        photoItem.style.maxWidth = '100%';
        photoItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // Xử lý lỗi ảnh
        img.onerror = function() {
            console.log('Không thể tải ảnh:', photo.src);
             // Tạo placeholder khi ảnh lỗi
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #f5f0e6, #e0d6c2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #8B7355;
        font-size: 14px;
        text-align: center;
        padding: 20px;
        border-radius: 12px;
    `;
    
    placeholder.innerHTML = `
        <i class="fas fa-image" style="font-size: 40px; margin-bottom: 10px; opacity: 0.5;"></i>
        <div>${photo.alt}</div>
        <div style="font-size: 12px; margin-top: 5px;">(Không thể tải ảnh)</div>
    `;
    
    // Thay thế ảnh bằng placeholder
    this.parentNode.replaceChild(placeholder, this);
            this.style.backgroundColor = '#f5f0e6';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = `<span style="color: #8B7355; font-size: 14px;">${photo.alt}</span>`;
        };
        
        // Thêm caption
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = photo.caption || photo.alt;
        
        // Thêm sự kiện
        photoItem.addEventListener('click', () => handlePhotoClick(index));
        
        photoItem.appendChild(img);
        photoItem.appendChild(caption);
        track.appendChild(photoItem);
    });
    
    // Khởi tạo vị trí đầu tiên
    scrollToPhoto(currentPhotoIndex);
}

// Thiết lập swipe cho iPhone - QUAN TRỌNG
function setupiPhoneSwipe() {
    if (!isMobile) return;
    
    const albumContainer = document.querySelector('.photo-album');
    const track = document.getElementById('photo-track');
    
    if (!albumContainer || !track) return;
    
    let startX = 0;
    let isSwiping = false;
    let startTime = 0;
    
    // Touch start
    albumContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        isSwiping = true;
        pauseAutoSlide();
        
        // Tắt transition tạm thời
        track.style.transition = 'none';
    }, { passive: true });
    
    // Touch move
    albumContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        e.preventDefault();
        
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Di chuyển track theo ngón tay
        const photoWidth = track.querySelector('.photo-item')?.offsetWidth || 280;
        const gap = 15;
        const totalWidth = photoWidth + gap;
        const currentPosition = -currentPhotoIndex * totalWidth;
        
        track.style.transform = `translateX(${currentPosition + diffX}px)`;
    }, { passive: false });
    
    // Touch end - QUAN TRỌNG: Xử lý chuyển ảnh
    albumContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        isSwiping = false;
        const endTime = Date.now();
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        const diffTime = endTime - startTime;
        
        // Bật lại transition
        track.style.transition = 'transform 0.3s ease';
        
        // Tính toán xem có nên chuyển ảnh không
        const velocity = Math.abs(diffX) / diffTime;
        const threshold = 50; // Ngưỡng pixel để chuyển ảnh
        const velocityThreshold = 0.3; // Ngưỡng tốc độ
        
        // Nếu swipe đủ xa hoặc nhanh
        if (Math.abs(diffX) > threshold || velocity > velocityThreshold) {
            if (diffX < 0 && currentPhotoIndex < graduationPhotos.length - 1) {
                // Swipe trái -> ảnh tiếp theo
                scrollToPhoto(currentPhotoIndex + 1);
            } else if (diffX > 0 && currentPhotoIndex > 0) {
                // Swipe phải -> ảnh trước
                scrollToPhoto(currentPhotoIndex - 1);
            } else {
                // Quay về vị trí cũ
                scrollToPhoto(currentPhotoIndex);
            }
        } else {
            // Nếu swipe nhẹ, quay về vị trí cũ
            scrollToPhoto(currentPhotoIndex);
        }
        
        // Tiếp tục auto slide sau 3 giây
        setTimeout(() => {
            if (isAutoSliding) {
                startAutoSlide();
            }
        }, 3000);
    }, { passive: true });
}

// Xử lý click ảnh
function handlePhotoClick(clickedIndex) {
    pauseAutoSlide();
    
    if (clickedIndex === currentPhotoIndex) {
        // Nếu click vào ảnh đang xem, chuyển tiếp
        const nextIndex = (currentPhotoIndex + 1) % graduationPhotos.length;
        scrollToPhoto(nextIndex);
    } else {
        scrollToPhoto(clickedIndex);
    }
    
    // Tiếp tục auto slide sau 3 giây
    setTimeout(() => {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }, 3000);
}

// Cuộn đến ảnh cụ thể - ĐÃ SỬA CHO IPHONE
function scrollToPhoto(index) {
    const track = document.getElementById('photo-track');
    const photoItems = document.querySelectorAll('.photo-item');
    
    if (!track || photoItems.length === 0) return;
    
    // Đảm bảo index hợp lệ
    currentPhotoIndex = Math.max(0, Math.min(index, graduationPhotos.length - 1));
    
    // Tính toán vị trí cuộn
    const albumWrapper = document.querySelector('.album-wrapper');
    if (!albumWrapper) return;
    
    const photoWidth = photoItems[0].offsetWidth;
    const scrollPosition = currentPhotoIndex * photoWidth;

    
    // Sử dụng transform để cuộn
    track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(-${scrollPosition}px)`;
    
    // Cập nhật indicator
    updateAlbumIndicator();
    
    // Dispatch event
    const event = new CustomEvent('albumScroll', { detail: { index: currentPhotoIndex } });
    window.dispatchEvent(event);
}

// Cuộn album bằng nút - ĐÃ SỬA CHO IPHONE
function scrollAlbum(direction) {
    pauseAutoSlide();
    
    const newIndex = currentPhotoIndex + direction;
    
    // Đảm bảo không vượt quá giới hạn
    if (newIndex >= 0 && newIndex < graduationPhotos.length) {
        scrollToPhoto(newIndex);
    }
    
    // Tiếp tục auto slide sau 3 giây
    setTimeout(() => {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }, 3000);
}

// Cập nhật indicator album
function updateAlbumIndicator() {
    const indicators = document.querySelectorAll('.indicator');
    if (!indicators.length) return;
    
    // Tính toán trang hiện tại
    const photosPerView = getPhotosPerView();
    const currentPage = Math.floor(currentPhotoIndex / photosPerView);
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
    });
}

// Lấy số lượng ảnh hiển thị
function getPhotosPerView() {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 1; // iPhone luôn hiển thị 1 ảnh
    return 3;
}

// Auto slide functions
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    
    // iPhone: chậm hơn để dễ xem
    const slideDuration = isMobile ? 5000 : 4000;
    
    autoSlideInterval = setInterval(() => {
        if (isAutoSliding && graduationPhotos.length > 0) {
            const nextIndex = (currentPhotoIndex + 1) % graduationPhotos.length;
            scrollToPhoto(nextIndex);
        }
    }, slideDuration);
}

function pauseAutoSlide() {
    isAutoSliding = false;
    clearInterval(autoSlideInterval);
}

function resumeAutoSlide() {
    isAutoSliding = true;
    startAutoSlide();
}

// Khởi tạo album khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra thiết bị
    checkMobileDevice();
    
    // Tạo album
    createPhotoAlbum();
    
    // Bắt đầu auto slide sau 2 giây
    setTimeout(() => {
        startAutoSlide();
    }, 2000);
    
    // Xử lý resize window
    window.addEventListener('resize', function() {
        const wasMobile = isMobile;
        checkMobileDevice();
        
        if (wasMobile !== isMobile) {
            // Nếu chuyển đổi giữa mobile/desktop, tạo lại album
            createPhotoAlbum();
        }
        
        updateAlbumIndicator();
        
        // Điều chỉnh lại vị trí sau khi resize
        setTimeout(() => {
            scrollToPhoto(currentPhotoIndex);
        }, 100);
    });
    
    // Dừng auto slide khi tab không active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });
});

// Export hàm scrollAlbum để gọi từ HTML
window.scrollAlbum = scrollAlbum;

// Debug helper
if (window.location.search.includes('debug=album')) {
    window.albumDebug = {
        currentPhotoIndex: () => currentPhotoIndex,
        isMobile: () => isMobile,
        isAutoSliding: () => isAutoSliding,
        scrollToPhoto: (index) => scrollToPhoto(index)
    };
    console.log('Album debug mode enabled');
}


