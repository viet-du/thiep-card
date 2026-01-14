// Tự động lướt ảnh với hiệu suất tốt hơn
document.addEventListener('DOMContentLoaded', function() {
    let isAutoSliding = true;
    let autoSlideTimer;
    let isMobile = window.innerWidth <= 768;
    const slideDuration = isMobile ? 5000 : 4000; // Mobile chậm hơn
    
    // Kiểm tra xem album đã sẵn sàng chưa
    function initAutoSlide() {
        const albumItems = document.querySelectorAll('.photo-item');
        if (albumItems.length > 0) {
            setupEventListeners();
            
            // Chỉ bắt đầu auto slide nếu không phải mobile hoặc user đã tương tác
            if (!isMobile) {
                startAutoSlide();
            }
        } else {
            setTimeout(initAutoSlide, 500);
        }
    }
    
    function startAutoSlide() {
        clearTimeout(autoSlideTimer);
        
        if (!isAutoSliding) return;
        
        autoSlideTimer = setTimeout(() => {
            const nextBtn = document.querySelector('.right-control');
            if (nextBtn && isAutoSliding) {
                // Kích hoạt sự kiện click
                nextBtn.click();
                startAutoSlide();
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
        const albumContainer = document.querySelector('.photo-album');
        const photoItems = document.querySelectorAll('.photo-item');
        const controls = document.querySelectorAll('.album-control');
        
        if (albumContainer) {
            // Mobile: bắt đầu auto slide khi user chạm vào
            if (isMobile) {
                albumContainer.addEventListener('touchstart', function startOnTouch() {
                    if (!isAutoSliding) {
                        resumeAutoSlide();
                    }
                    albumContainer.removeEventListener('touchstart', startOnTouch);
                });
            }
            
            albumContainer.addEventListener('touchstart', pauseAutoSlide);
            albumContainer.addEventListener('mousedown', pauseAutoSlide);
        }
        
        photoItems.forEach(item => {
            item.addEventListener('click', pauseAutoSlide);
            item.addEventListener('touchstart', pauseAutoSlide);
        });
        
        controls.forEach(control => {
            control.addEventListener('click', pauseAutoSlide);
            control.addEventListener('touchstart', pauseAutoSlide);
        });
        
        // Tiếp tục auto slide sau khi không tương tác
        const resumeEvents = ['touchend', 'mouseup'];
        resumeEvents.forEach(event => {
            if (albumContainer) {
                albumContainer.addEventListener(event, () => {
                    setTimeout(() => {
                        if (isMobile) {
                            resumeAutoSlide();
                        }
                    }, 3000);
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
