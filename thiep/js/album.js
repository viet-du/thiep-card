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