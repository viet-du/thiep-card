// Biến toàn cục
let currentMusic = null;
let currentVolume = 0.3;

// Phát nhạc đã chọn
function playSelectedMusic() {
    const musicSelector = document.getElementById('music-selector');
    const selectedFile = musicSelector.value;
    
    // Dừng nhạc hiện tại nếu có
    if (currentMusic) {
        currentMusic.pause();
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
    currentMusic.play().then(() => {
        showNotification('Nhạc nền đang phát: ' + musicSelector.options[musicSelector.selectedIndex].text);
    }).catch(error => {
        console.log('Lỗi phát nhạc:', error);
        showNotification('Không thể phát nhạc. Vui lòng kiểm tra đường dẫn file nhạc.', 'error');
    });
}

// Tạm dừng nhạc
function pauseMusic() {
    if (currentMusic) {
        currentMusic.pause();
        showNotification('Nhạc đã tạm dừng');
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
        
        showNotification(`Âm lượng: ${Math.round(currentVolume * 100)}%`);
    }
}

// Thay đổi âm lượng từ slider
function changeVolume(value) {
    currentVolume = parseFloat(value);
    
    if (currentMusic) {
        currentMusic.volume = currentVolume;
    }
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
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Thêm CSS cho thông báo
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700, #DAA520);
            color: #5a4a42;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(218, 165, 32, 0.3);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(0);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 300px;
            text-align: center;
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }
        
        .notification::before {
            content: '🎵';
            margin-right: 10px;
        }
        
        .notification.error::before {
            content: '⚠️';
        }
    `;
    document.head.appendChild(style);
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    addNotificationStyles();
    
    // Thiết lập âm lượng mặc định
    document.getElementById('volume-slider').value = currentVolume;
    
    // Thêm hiệu ứng cho slider
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', function() {
        const value = (this.value - this.min) / (this.max - this.min);
        const percent = Math.round(value * 100);
        this.style.background = `linear-gradient(to right, #DAA520 0%, #DAA520 ${percent}%, #e0d6c2 ${percent}%, #e0d6c2 100%)`;
    });
    
    // Kích hoạt sự kiện input để cập nhật background ban đầu
    volumeSlider.dispatchEvent(new Event('input'));
});