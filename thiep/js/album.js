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

// Tạo album ảnh
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
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy'; // Tối ưu tải ảnh
        
        img.onerror = function() {
            const color = 'DAA520';
            const bgColor = 'f5f0e6';
            this.src = `https://via.placeholder.com/220x280/${bgColor}/${color}?text=${encodeURIComponent(photo.caption || photo.alt)}`;
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
    // Dừng auto slide tạm thời
    pauseAutoSlide();
    
    // Nếu click vào ảnh hiện tại hoặc ảnh cuối, chuyển về đầu
    if (clickedIndex === currentPhotoIndex || clickedIndex === graduationPhotos.length - 1) {
        scrollToPhoto(0);
    } else {
        // Chuyển đến ảnh tiếp theo
        scrollToPhoto(clickedIndex + 1);
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
    const photoWidth = photoItems[0].offsetWidth + 25; // width + gap
    const scrollPosition = currentPhotoIndex * photoWidth;
    
    // Sử dụng scrollTo cho mượt mà
    track.parentElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
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
    }, 4000); // 4 giây mỗi ảnh
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
function setupTouchEvents() {
    const albumContainer = document.querySelector('.photo-album');
    let touchStartX = 0;
    let touchEndX = 0;
    
    albumContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
    });
    
    albumContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        // Tiếp tục auto slide sau 5 giây
        setTimeout(() => {
            if (isAutoSliding) {
                startAutoSlide();
            }
        }, 5000);
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Ngưỡng swipe 50px
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe trái -> ảnh tiếp theo
            if (currentPhotoIndex < graduationPhotos.length - 1) {
                scrollToPhoto(currentPhotoIndex + 1);
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe phải -> ảnh trước
            if (currentPhotoIndex > 0) {
                scrollToPhoto(currentPhotoIndex - 1);
            }
        }
    }
}

// Khởi tạo album khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    createPhotoAlbum();
    updateAlbumIndicator();
    startAutoSlide();
    setupTouchEvents();
    
    // Xử lý resize window
    window.addEventListener('resize', () => {
        updateAlbumIndicator();
    });
});
