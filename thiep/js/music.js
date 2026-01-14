// Biến toàn cục
let currentMusic = null;
let currentVolume = 0.3;
let hasOpenedEnvelope = false;

// Phát nhạc khi mở thiệp
function playMusicOnEnvelopeOpen() {
    if (hasOpenedEnvelope) return;
    
    hasOpenedEnvelope = true;
    
    // Phát nhạc ngay lập tức
    setTimeout(() => {
        const musicSelector = document.getElementById('music-selector');
        if (musicSelector && musicSelector.value) {
            playSelectedMusic();
            showNotification('🎵 Nhạc nền đã tự động phát');
        }
    }, 300);
}

// Phát nhạc đã chọn
function playSelectedMusic() {
    const musicSelector = document.getElementById('music-selector');
    const selectedFile = musicSelector.value;
    
    // Dừng nhạc hiện tại nếu có
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }
    
    // Nếu chọn "Tắt nhạc"
    if (!selectedFile) {
        showNotification('Đã tắt nhạc nền');
        return;
    }
    
    // Tạo phần tử audio mới
    currentMusic = new Audio(selectedFile);
    currentMusic.volume = currentVolume;
    currentMusic.loop = true;
    
    // Phát nhạc
    const playPromise = currentMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            showNotification('🎵 Nhạc nền đang phát');
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
            showNotification('Không thể phát nhạc. Vui lòng thử lại.', 'error');
            
            // Thử phát lại khi user tương tác
            document.addEventListener('click', function tryPlayOnce() {
                if (currentMusic && currentMusic.paused) {
                    currentMusic.play().catch(() => {});
                }
                document.removeEventListener('click', tryPlayOnce);
            });
        });
    }
}

// Tạm dừng nhạc
function pauseMusic() {
    if (currentMusic && !currentMusic.paused) {
        currentMusic.pause();
        showNotification('⏸️ Nhạc đã tạm dừng');
    } else {
        showNotification('Không có nhạc đang phát', 'error');
    }
}

// Điều chỉnh âm lượng
function adjustVolume(amount) {
    if (currentMusic) {
        currentVolume += amount;
        
        // Giới hạn âm lượng từ 0 đến 1
        if (currentVolume < 0) currentVolume = 0;
        if (currentVolume > 1) currentVolume = 1;
        
        currentMusic.volume = currentVolume;
        
        // Cập nhật slider
        document.getElementById('volume-slider').value = currentVolume;
        
        showNotification(`🔊 Âm lượng: ${Math.round(currentVolume * 100)}%`);
    }
}

// Thay đổi âm lượng từ slider
function changeVolume(value) {
    currentVolume = parseFloat(value);
    
    if (currentMusic) {
        currentMusic.volume = currentVolume;
    }
    
    // Cập nhật hiển thị slider
    const volumeSlider = document.getElementById('volume-slider');
    const percent = Math.round(currentVolume * 100);
    volumeSlider.style.background = `linear-gradient(to right, #DAA520 0%, #DAA520 ${percent}%, #e0d6c2 ${percent}%, #e0d6c2 100%)`;
}

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    // Xóa thông báo cũ nếu có
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #DAA520);
        color: #5a4a42;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(218, 165, 32, 0.4);
        z-index: 10000;
        font-weight: 500;
        font-size: 14px;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 250px;
        text-align: center;
    `;
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Tự động ẩn sau 2.5 giây
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2500);
}

// Thêm CSS animation cho thông báo
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52) !important;
        color: white !important;
    }
`;
document.head.appendChild(notificationStyle);

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Thiết lập âm lượng mặc định
    document.getElementById('volume-slider').value = currentVolume;
    
    // Cập nhật hiển thị slider ban đầu
    changeVolume(currentVolume);
    
    // Chọn bài nhạc đầu tiên làm mặc định
    const musicSelector = document.getElementById('music-selector');
    if (musicSelector && musicSelector.options.length > 0) {
        musicSelector.selectedIndex = 0;
    }
    
    // Thêm sự kiện cho slider
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', function() {
        changeVolume(this.value);
    });
});

// Xuất hàm ra global để effects.js gọi được
window.playMusicOnEnvelopeOpen = playMusicOnEnvelopeOpen;
// Thêm vào đầu file music.js


// Phát nhạc khi mở thiệp
function playMusicOnEnvelopeOpen() {
    if (hasOpenedEnvelope) return;
    
    hasOpenedEnvelope = true;
    
    // Phát nhạc ngay lập tức
    setTimeout(() => {
        const musicSelector = document.getElementById('music-selector');
        if (musicSelector && musicSelector.value) {
            playSelectedMusic();
        }
    }, 300);
}

// Xuất hàm ra global để effects.js gọi được
window.playMusicOnEnvelopeOpen = playMusicOnEnvelopeOpen;
