// album.js - Phiên bản hoàn chỉnh
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
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Kiểm tra thiết bị mobile
function checkMobileDevice() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Tạo album ảnh với responsive (ĐÃ SỬA)
function createPhotoAlbum() {
    const track = document.getElementById('photo-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    graduationPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');
        photoItem.dataset.index = index;
        
        // XÓA phần set style inline - để CSS kiểm soát
        // if (isMobile) {
        //     photoItem.style.minWidth = '85vw';
        //     photoItem.style.height = '220px';
        // }
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        
        // XÓA phần set style inline cho ảnh - để CSS kiểm soát
        // if (isMobile) {
        //     img.style.cssText = `
        //         width: 100%;
        //         height: 100%;
        //         object-fit: cover;
        //         display: block;
        //         -webkit-touch-callout: none;
        //     `;
        // }
        
        // Xử lý lỗi ảnh
        img.onerror = function() {
            console.error(`Không thể tải ảnh: ${photo.src}`);
            const color = 'DAA520';
            const bgColor = 'f5f0e6';
            this.src = `https://via.placeholder.com/300x400/${bgColor}/${color}?text=${encodeURIComponent(photo.caption || photo.alt)}`;
            this.style.objectFit = 'cover';
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
    
    // Thêm sự kiện sau khi tạo xong
    setupAlbumEvents();
}

// Thiết lập sự kiện cho album
function setupAlbumEvents() {
    const photoItems = document.querySelectorAll('.photo-item');
    const track = document.getElementById('photo-track');
    const albumContainer = document.querySelector('.photo-album');
    
    if (!photoItems.length || !track || !albumContainer) return;
    
    // Sự kiện click cho từng ảnh
    photoItems.forEach((item, index) => {
        // Xóa sự kiện cũ nếu có
        item.replaceWith(item.cloneNode(true));
        const newItem = track.children[index];
        
        // Thêm sự kiện click
        newItem.addEventListener('click', (e) => {
            if (!isMobile) {
                e.preventDefault();
                handlePhotoClick(index);
            }
        });
        
        // Thêm sự kiện touch cho mobile
        newItem.addEventListener('touchstart', (e) => {
            if (isMobile) {
                e.preventDefault();
                // Trên mobile, touch sẽ kích hoạt swipe
                // Click sẽ xử lý riêng
                const touch = e.touches[0];
                startX = touch.clientX;
                scrollLeft = track.scrollLeft;
                isDragging = true;
                pauseAutoSlide();
            }
        });
        
        newItem.addEventListener('touchend', () => {
            if (isMobile) {
                isDragging = false;
                // Nếu không drag nhiều thì xem như click
                const diff = Math.abs(startX - track.scrollLeft);
                if (diff < 10) {
                    handlePhotoClick(index);
                }
            }
        });
    });
    
    // Thiết lập swipe/drag
    setupSwipeEvents(albumContainer, track);
}

// Thiết lập sự kiện swipe
function setupSwipeEvents(container, track) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    
    // Desktop mouse events
    container.addEventListener('mousedown', (e) => {
        if (!isMobile) {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = track.scrollLeft;
            pauseAutoSlide();
        }
    });
    
    container.addEventListener('mouseleave', () => {
        if (!isMobile) {
            isDown = false;
            container.classList.remove('active');
        }
    });
    
    container.addEventListener('mouseup', () => {
        if (!isMobile) {
            isDown = false;
            container.classList.remove('active');
            setTimeout(() => {
                if (isAutoSliding) {
                    startAutoSlide();
                }
            }, 3000);
        }
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown || isMobile) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
    
    // Mobile touch events
    container.addEventListener('touchstart', (e) => {
        if (isMobile) {
            isDown = true;
            const touch = e.touches[0];
            startX = touch.pageX - container.offsetLeft;
            scrollLeft = track.scrollLeft;
            pauseAutoSlide();
        }
    });
    
    container.addEventListener('touchend', () => {
        if (isMobile) {
            isDown = false;
            setTimeout(() => {
                if (isAutoSliding) {
                    startAutoSlide();
                }
            }, 3000);
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDown || !isMobile) return;
        const touch = e.touches[0];
        const x = touch.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
}

// Xử lý click ảnh
function handlePhotoClick(clickedIndex) {
    pauseAutoSlide();
    
    // Nếu click vào ảnh hiện tại hoặc ảnh cuối, chuyển về đầu
    if (clickedIndex === currentPhotoIndex || clickedIndex === graduationPhotos.length - 1) {
        scrollToPhoto(0);
    } else {
        scrollToPhoto(clickedIndex + 1);
    }
    
    // Tiếp tục auto slide sau 3 giây
    setTimeout(() => {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }, 3000);
}

// Cuộn đến ảnh cụ thể (ĐÃ SỬA)
function scrollToPhoto(index) {
    const track = document.getElementById('photo-track');
    const photoItems = document.querySelectorAll('.photo-item');
    
    if (!track || photoItems.length === 0) return;
    
    // Đảm bảo index hợp lệ
    currentPhotoIndex = Math.max(0, Math.min(index, graduationPhotos.length - 1));
    
    // Tính toán vị trí cuộn
    const photoItem = photoItems[0];
    if (!photoItem) return;
    
    const photoWidth = photoItem.offsetWidth + parseInt(getComputedStyle(photoItem).marginRight || 0);
    const scrollPosition = currentPhotoIndex * photoWidth;
    
    // Sử dụng scrollTo cho mượt mà
    track.style.scrollBehavior = 'smooth';
    track.scrollLeft = scrollPosition;
    
    // Cập nhật indicator
    updateAlbumIndicator();
    
    // Reset scroll behavior
    setTimeout(() => {
        track.style.scrollBehavior = 'auto';
    }, 500);
}

// Cuộn album bằng nút
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
    if (indicators.length === 0) return;
    
    // Tính toán trang hiện tại
    const photosPerView = getPhotosPerView();
    const currentPage = Math.floor(currentPhotoIndex / photosPerView);
    const totalPages = Math.ceil(graduationPhotos.length / photosPerView);
    
    indicators.forEach((indicator, index) => {
        indicator.style.display = index < totalPages ? 'inline-block' : 'none';
        indicator.classList.toggle('active', index === currentPage);
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

// Xử lý khi resize window
function handleResize() {
    const wasMobile = isMobile;
    checkMobileDevice();
    
    // Nếu chuyển đổi giữa mobile/desktop, cần tạo lại album
    if (wasMobile !== isMobile) {
        createPhotoAlbum();
    }
    
    updateAlbumIndicator();
    
    // Điều chỉnh lại vị trí sau khi resize
    setTimeout(() => {
        scrollToPhoto(currentPhotoIndex);
    }, 100);
}

// Khởi tạo album khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra thiết bị
    checkMobileDevice();
    
    // Tạo album
    createPhotoAlbum();
    
    // Cập nhật indicator
    setTimeout(updateAlbumIndicator, 100);
    
    // Bắt đầu auto slide sau 2 giây
    setTimeout(() => {
        startAutoSlide();
    }, 2000);
    
    // Xử lý resize window
    window.addEventListener('resize', handleResize);
    
    // Dừng auto slide khi tab không active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });
});

// Thêm kiểm tra khi nhấn nút điều khiển
window.scrollAlbum = scrollAlbum;

// Hàm tiện ích để debug
function logAlbumState() {
    console.log('Album State:', {
        currentPhotoIndex,
        isMobile,
        isAutoSliding,
        totalPhotos: graduationPhotos.length
    });
}

// Gọi logAlbumState để debug nếu cần
// logAlbumState();
