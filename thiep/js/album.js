// Danh sách ảnh mẫu với chú thích
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
const graduationPhotos = [
    { 
        src: 'assets/image/03e19505-e644-4bb5-b492-e938a586c093.jpg', 
        alt: 'Ngày đầu nhập học',
        caption: 'Ngày đầu tiên bước vào THPT'
    },
    { 
        src: 'assets/image/80b17d7a-0cf3-4d7f-92c7-cde0673326cd.jpg', 
        alt: 'Hoạt động ngoại khóa',
        caption: null
    },
    { 
        src: 'assets/image/9713db97-5fa6-4146-8904-4ce3dd843664.jpg', 
        alt: 'Giờ học trên lớp',
        caption: null
    },
    { 
        src: 'assets/image/a9d9dea5-db7c-4b69-8da3-e6fcd370dfb4.jpg', 
        alt: 'Kỷ yếu lớp',
        caption: null
    }
];

// Tạo album ảnh
function createPhotoAlbum() {
    const track = document.getElementById('photo-track');
    
    // Xóa nội dung cũ nếu có
    track.innerHTML = '';
    
    // Thêm ảnh vào album
    graduationPhotos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.title = photo.caption;
        
        // Nếu ảnh không tải được, dùng ảnh placeholder
        img.onerror = function() {
            const color = 'DAA520';
            const bgColor = 'f5f0e6';
            this.src = `https://via.placeholder.com/220x280/${bgColor}/${color}?text=${encodeURIComponent(photo.caption)}`;
        };
        
        // Thêm caption
        const caption = document.createElement('div');
        caption.classList.add('photo-caption');
        caption.textContent = photo.caption;
        
        photoItem.appendChild(img);
        photoItem.appendChild(caption);
        track.appendChild(photoItem);
    });
}

// Cuộn album
let currentPhotoIndex = 0;
const photosPerView = 3;

function scrollAlbum(direction) {
    const track = document.getElementById('photo-track');
    const totalPhotos = graduationPhotos.length;
    
    // Cập nhật chỉ số ảnh hiện tại
    currentPhotoIndex += direction;
    
    // Giới hạn chỉ số
    if (currentPhotoIndex < 0) currentPhotoIndex = 0;
    if (currentPhotoIndex > totalPhotos - photosPerView) {
        currentPhotoIndex = totalPhotos - photosPerView;
    }
    
    // Tính toán vị trí cuộn
    const scrollPosition = currentPhotoIndex * 245; // 220px + 25px gap
    track.style.transform = `translateX(-${scrollPosition}px)`;
    
    // Cập nhật indicator
    updateAlbumIndicator();
}

// Cập nhật indicator album
function updateAlbumIndicator() {
    const indicators = document.querySelectorAll('.indicator');
    const totalPhotos = graduationPhotos.length;
    const totalIndicators = Math.ceil(totalPhotos / photosPerView);
    const currentIndicator = Math.floor(currentPhotoIndex / photosPerView);
    
    indicators.forEach((indicator, index) => {
        if (index < totalIndicators) {
            indicator.style.display = 'inline-block';
            if (index === currentIndicator) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        } else {
            indicator.style.display = 'none';
        }
    });
}

// Khởi tạo album khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    createPhotoAlbum();
    updateAlbumIndicator();
    
    // Thêm CSS cho caption ảnh
    const style = document.createElement('style');
    style.textContent = `
        .photo-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
            color: white;
            padding: 15px 10px 10px;
            font-size: 14px;
            text-align: center;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.3s ease;
            transform: translateY(10px);
        }
        
        .photo-item:hover .photo-caption {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
// Thêm hàm xử lý touch/swipe
function setupTouchEvents() {
    const track = document.getElementById('photo-track');
    
    // Touch events cho mobile
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);
    
    // Mouse events cho desktop
    track.addEventListener('mousedown', mouseDown);
    track.addEventListener('mousemove', mouseMove);
    track.addEventListener('mouseup', mouseUp);
    track.addEventListener('mouseleave', mouseLeave);
}

function touchStart(event) {
    touchStartX = event.touches[0].clientX;
    startPosition = touchStartX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    track.classList.add('grabbing');
}

function touchMove(event) {
    if (!isDragging) return;
    touchEndX = event.touches[0].clientX;
    const diff = touchEndX - touchStartX;
    touchStartX = touchEndX;
    
    // Di chuyển ảnh theo swipe
    currentTranslate += diff * 0.5;
    updateTrackPosition();
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.classList.remove('grabbing');
    
    // Tính toán swipe để chuyển ảnh
    const diff = touchEndX - startPosition;
    if (Math.abs(diff) > 50) { // Ngưỡng swipe
        if (diff > 0) {
            scrollAlbum(-1); // Swipe sang phải -> lùi
        } else {
            scrollAlbum(1); // Swipe sang trái -> tiến
        }
    } else {
        // Nếu swipe ngắn, quay về vị trí cũ
        currentTranslate = prevTranslate;
        updateTrackPosition();
    }
}

// Tương tự cho mouse events
function mouseDown(event) {
    startPosition = event.clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    track.classList.add('grabbing');
}

function mouseMove(event) {
    if (!isDragging) return;
    const currentPosition = event.clientX;
    const diff = currentPosition - startPosition;
    startPosition = currentPosition;
    
    currentTranslate += diff * 0.5;
    updateTrackPosition();
}

function mouseUp(event) {
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.classList.remove('grabbing');
    
    const diff = event.clientX - startPosition;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            scrollAlbum(-1);
        } else {
            scrollAlbum(1);
        }
    } else {
        currentTranslate = prevTranslate;
        updateTrackPosition();
    }
}

function mouseLeave() {
    if (isDragging) {
        isDragging = false;
        cancelAnimationFrame(animationID);
        currentTranslate = prevTranslate;
        updateTrackPosition();
        track.classList.remove('grabbing');
    }
}

function animation() {
    if (isDragging) {
        updateTrackPosition();
        requestAnimationFrame(animation);
    }
}

function updateTrackPosition() {
    const track = document.getElementById('photo-track');
    track.style.transform = `translateX(${currentTranslate}px)`;
}

// Sửa lại hàm scrollAlbum để cập nhật currentTranslate
function scrollAlbum(direction) {
    const totalPhotos = graduationPhotos.length;
    
    // Cập nhật chỉ số ảnh hiện tại
    currentPhotoIndex += direction;
    
    // Giới hạn chỉ số
    if (currentPhotoIndex < 0) currentPhotoIndex = 0;
    if (currentPhotoIndex > totalPhotos - photosPerView) {
        currentPhotoIndex = totalPhotos - photosPerView;
    }
    
    // Tính toán vị trí cuộn
    const scrollPosition = currentPhotoIndex * 245; // 220px + 25px gap
    currentTranslate = -scrollPosition;
    prevTranslate = currentTranslate;
    
    updateTrackPosition();
    updateAlbumIndicator();
}

// Cập nhật DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    createPhotoAlbum();
    updateAlbumIndicator();
    setupTouchEvents(); // Thêm dòng này
    
    // Thêm CSS cho touch/swipe
    const style = document.createElement('style');
    style.textContent = `
        .photo-track {
            cursor: grab;
            user-select: none;
        }
        
        .photo-track.grabbing {
            cursor: grabbing;
        }
        
        @media (max-width: 768px) {
            .photo-track {
                cursor: grab;
            }
            
            .photo-track.grabbing {
                cursor: grabbing;
            }
        }
    `;
    document.head.appendChild(style);
});
