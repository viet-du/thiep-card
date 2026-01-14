// Tự động lướt ảnh với hiệu suất tốt hơn
document.addEventListener('DOMContentLoaded', function() {
    let isAutoSliding = true;
    let autoSlideTimer;
    const slideDuration = 4000; // 4 giây
    
    // Kiểm tra xem album đã sẵn sàng chưa
    function initAutoSlide() {
        const albumItems = document.querySelectorAll('.photo-item');
        if (albumItems.length > 0) {
            startAutoSlide();
            setupEventListeners();
        } else {
            // Thử lại sau 500ms nếu album chưa sẵn sàng
            setTimeout(initAutoSlide, 500);
        }
    }
    
    function startAutoSlide() {
        clearTimeout(autoSlideTimer);
        
        if (!isAutoSliding) return;
        
        autoSlideTimer = setTimeout(() => {
            const nextBtn = document.querySelector('.right-control');
            if (nextBtn && isAutoSliding) {
                // Kích hoạt sự kiện click của nút next
                nextBtn.click();
                startAutoSlide(); // Lặp lại
            }
        }, slideDuration);
    }
    
    function pauseAutoSlide() {
        isAutoSliding = false;
        clearTimeout(autoSlideTimer);
    }
    
    function resumeAutoSlide() {
        isAutoSliding = true;
        startAutoSlide();
    }
    
    function setupEventListeners() {
        // Dừng auto slide khi user tương tác
        const albumContainer = document.querySelector('.photo-album');
        const photoItems = document.querySelectorAll('.photo-item');
        const controls = document.querySelectorAll('.album-control');
        
        if (albumContainer) {
            albumContainer.addEventListener('touchstart', pauseAutoSlide);
            albumContainer.addEventListener('mousedown', pauseAutoSlide);
            albumContainer.addEventListener('wheel', pauseAutoSlide);
        }
        
        photoItems.forEach(item => {
            item.addEventListener('click', pauseAutoSlide);
            item.addEventListener('mouseenter', pauseAutoSlide);
        });
        
        controls.forEach(control => {
            control.addEventListener('click', pauseAutoSlide);
        });
        
        // Tiếp tục auto slide sau khi không tương tác
        const resumeEvents = ['touchend', 'mouseup', 'mouseleave'];
        resumeEvents.forEach(event => {
            if (albumContainer) {
                albumContainer.addEventListener(event, () => {
                    setTimeout(resumeAutoSlide, 3000); // Đợi 3 giây rồi tiếp tục
                });
            }
        });
    }
    
    // Dừng auto slide khi tab không active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });
    
    // Bắt đầu auto slide
    setTimeout(initAutoSlide, 2000);
});
