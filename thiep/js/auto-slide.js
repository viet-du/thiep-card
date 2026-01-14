// auto-slide.js - Tự động lướt ảnh
document.addEventListener('DOMContentLoaded', function() {
    let autoSlideInterval;
    let isAutoSliding = true;
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.photo-item').length;
    const slideDuration = 3000; // 3 giây mỗi ảnh
    
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        
        autoSlideInterval = setInterval(() => {
            if (isAutoSliding && totalSlides > 0) {
                currentSlide = (currentSlide + 1) % totalSlides;
                scrollToSlide(currentSlide);
            }
        }, slideDuration);
    }
    
    function scrollToSlide(slideIndex) {
        const track = document.getElementById('photo-track');
        if (!track) return;
        
        const photoWidth = 220 + 25; // width + gap
        const scrollPosition = slideIndex * photoWidth;
        
        // Sử dụng transform để cuộn mượt
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${scrollPosition}px)`;
        
        // Cập nhật indicator
        updateSlideIndicator(slideIndex);
    }
    
    function updateSlideIndicator(index) {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Dừng auto slide khi user tương tác
    function stopAutoSlideTemporarily() {
        isAutoSliding = false;
        clearInterval(autoSlideInterval);
        
        // Tiếp tục sau 5 giây không tương tác
        setTimeout(() => {
            isAutoSliding = true;
            startAutoSlide();
        }, 5000);
    }
    
    // Khởi động auto slide khi album được tạo
    function initAutoSlide() {
        const checkAlbum = setInterval(() => {
            if (document.querySelectorAll('.photo-item').length > 0) {
                clearInterval(checkAlbum);
                startAutoSlide();
                
                // Thêm sự kiện dừng khi user tương tác
                const track = document.getElementById('photo-track');
                if (track) {
                    track.addEventListener('touchstart', stopAutoSlideTemporarily);
                    track.addEventListener('mousedown', stopAutoSlideTemporarily);
                    track.addEventListener('wheel', stopAutoSlideTemporarily);
                }
                
                // Các nút điều khiển
                const controls = document.querySelectorAll('.album-control');
                controls.forEach(control => {
                    control.addEventListener('click', stopAutoSlideTemporarily);
                });
            }
        }, 500);
    }
    
    // Bắt đầu khi trang tải xong
    setTimeout(initAutoSlide, 2000);
    
    // Dừng auto slide khi tab không active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(autoSlideInterval);
        } else {
            startAutoSlide();
        }
    });
});