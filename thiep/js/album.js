// Danh sách ảnh mẫu với chú thích
const graduationPhotos = [
    { 
        src: 'assets/image/03e19505-e644-4bb5-b492-e938a586c093.jpg', 
        alt: 'Ngày đầu nhập học',
        caption: 'Ngày đầu tiên bước vào THPT'
    },
    { 
        src: 'assets/image/80b17d7a-0cf3-4d7f-92c7-cde0673326cd.jpg', 
        alt: 'Hoạt động ngoại khóa',
        caption: 'Hoạt động ngoại khóa đáng nhớ'
    },
    { 
        src: 'assets/image/9713db97-5fa6-4146-8904-4ce3dd843664.jpg', 
        alt: 'Giờ học trên lớp',
        caption: 'Những giờ học đầy cảm hứng'
    },
    { 
        src: 'assets/image/a9d9dea5-db7c-4b69-8da3-e6fcd370dfb4.jpg', 
        alt: 'Kỷ yếu lớp',
        caption: 'Khoảnh khắc kỷ yếu'
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

// Tạo album ảnh với responsive
function createPhotoAlbum() {
    const track = document.getElementById('photo-track');
    track.innerHTML = '';
    
    graduationPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');
        photoItem.dataset.index = index;
        
        // Thêm sự kiện click
        photoItem.addEventListener('click', () => {
            handlePhotoClick(index);
        });
        
        // Thêm sự kiện touch cho mobile
        photoItem.addEventListener('touchstart', (e) => {
            if (isMobile) {
                e.preventDefault();
                handlePhotoClick(index);
            }
        });
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        
        // Sửa lỗi ảnh không tải
        img.onerror = function() {
            const color = 'DAA520';
            const bgColor = 'f5f0e6';
            this.src = `https://via.placeholder.com/300x400/${bgColor}/${color}?text=${encodeURIComponent(photo.caption || photo.alt)}`;
            this.style.objectFit = 'cover';
            this.style.width = '100%';
            this.style.height = '100%';
        };
        
        // Đảm bảo ảnh hiển thị đúng
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // Thêm caption
        const caption = document.createElement('div');
        caption.classList.add('photo-caption');
        caption.textContent = photo.caption || photo.alt;
        
        photoItem.appendChild(img);
        photoItem.appendChild(caption);
        track.appendChild(photoItem);
    });
}

// Xử lý click ảnh
function handlePhotoClick(clickedIndex) {
    pauseAutoSlide();
    
    // Nếu là mobile, chuyển đến ảnh tiếp theo
    if (isMobile) {
        const nextIndex = (clickedIndex + 1) % graduationPhotos.length;
        scrollToPhoto(nextIndex);
    } else {
        // Desktop: nếu click vào ảnh hiện tại hoặc ảnh cuối, chuyển về đầu
        if (clickedIndex === currentPhotoIndex || clickedIndex === graduationPhotos.length - 1) {
            scrollToPhoto(0);
        } else {
            scrollToPhoto(clickedIndex + 1);
        }
    }
    
    // Tiếp tục auto slide sau 5 giây
    setTimeout(() => {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }, 5000);
}

// Cuộn đến ảnh cụ thể
function scrollToPhoto(index) {
    const track = document.getElementById('photo-track');
    const photoItems = document.querySelectorAll('.photo-item');
    
    if (photoItems.length === 0) return;
    
    // Đảm bảo index hợp lệ
    currentPhotoIndex = Math.max(0, Math.min(index, graduationPhotos.length - 1));
    
    // Tính toán vị trí cuộn
    const photoWidth = photoItems[0].offsetWidth + 25;
    const scrollPosition = currentPhotoIndex * photoWidth;
    
    // Hiệu ứng smooth scroll
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${scrollPosition}px)`;
    
    // Cập nhật indicator
    updateAlbumIndicator();
}

// Cuộn album bằng nút
function scrollAlbum(direction) {
    pauseAutoSlide();
    
    const newIndex = currentPhotoIndex + direction;
    
    // Đảm bảo không vượt quá giới hạn
    if (newIndex >= 0 && newIndex < graduationPhotos.length) {
        scrollToPhoto(newIndex);
    }
    
    // Tiếp tục auto slide sau 5 giây
    setTimeout(() => {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }, 5000);
}

// Cập nhật indicator album
function updateAlbumIndicator() {
    const indicators = document.querySelectorAll('.indicator');
    const totalPhotos = graduationPhotos.length;
    const photosPerView = getPhotosPerView();
    const currentPage = Math.floor(currentPhotoIndex / photosPerView);
    const totalPages = Math.ceil(totalPhotos / photosPerView);
    
    indicators.forEach((indicator, index) => {
        if (index < totalPages) {
            indicator.style.display = 'inline-block';
            if (index === currentPage) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        } else {
            indicator.style.display = 'none';
        }
    });
}

// Lấy số lượng ảnh hiển thị dựa trên kích thước màn hình
function getPhotosPerView() {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 2;
    return 3;
}

// Auto slide functions
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    
    autoSlideInterval = setInterval(() => {
        if (isAutoSliding) {
            const nextIndex = (currentPhotoIndex + 1) % graduationPhotos.length;
            scrollToPhoto(nextIndex);
        }
    }, 4000);
}

function pauseAutoSlide() {
    isAutoSliding = false;
    clearInterval(autoSlideInterval);
}

function resumeAutoSlide() {
    isAutoSliding = true;
    startAutoSlide();
}

// Touch/swipe cho mobile
function setupMobileTouch() {
    if (!isMobile) return;
    
    const albumContainer = document.querySelector('.photo-album');
    const track = document.getElementById('photo-track');
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    albumContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
        pauseAutoSlide();
        
        // Tắt transition khi đang swipe
        track.style.transition = 'none';
    });
    
    albumContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.touches[0].clientX;
        const diff = touchEndX - touchStartX;
        
        // Di chuyển track theo swipe
        const currentPosition = -currentPhotoIndex * (track.querySelector('.photo-item').offsetWidth + 25);
        track.style.transform = `translateX(${currentPosition + diff}px)`;
    });
    
    albumContainer.addEventListener('touchend', () => {
        if (!isSwiping) return;
        
        isSwiping = false;
        const diff = touchEndX - touchStartX;
        const threshold = 50; // Ngưỡng swipe
        
        // Bật lại transition
        track.style.transition = 'transform 0.3s ease';
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentPhotoIndex > 0) {
                // Swipe phải -> ảnh trước
                scrollToPhoto(currentPhotoIndex - 1);
            } else if (diff < 0 && currentPhotoIndex < graduationPhotos.length - 1) {
                // Swipe trái -> ảnh tiếp theo
                scrollToPhoto(currentPhotoIndex + 1);
            } else {
                // Quay về vị trí cũ
                scrollToPhoto(currentPhotoIndex);
            }
        } else {
            // Quay về vị trí cũ nếu swipe ngắn
            scrollToPhoto(currentPhotoIndex);
        }
        
        // Tiếp tục auto slide sau 3 giây
        setTimeout(() => {
            if (isAutoSliding) {
                startAutoSlide();
            }
        }, 3000);
    });
}

// Khởi tạo album khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    checkMobileDevice();
    createPhotoAlbum();
    updateAlbumIndicator();
    startAutoSlide();
    
    if (isMobile) {
        setupMobileTouch();
    } else {
        // Desktop: thêm hover effect
        setupDesktopHover();
    }
    
    // Xử lý resize window
    window.addEventListener('resize', () => {
        checkMobileDevice();
        updateAlbumIndicator();
        
        // Điều chỉnh lại vị trí sau khi resize
        setTimeout(() => {
            scrollToPhoto(currentPhotoIndex);
        }, 100);
    });
});

// Desktop hover effects
function setupDesktopHover() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}
