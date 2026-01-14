// wishes.js
import { db, ref, push, set, onValue } from './firebase-config.js';

// Biến lưu trữ lời chúc
let wishesData = [];

// Tạo hoặc lấy userID từ localStorage
function getOrCreateUserId() {
    let userId = localStorage.getItem('wish_user_id');
    if (!userId) {
        // Tạo ID ngẫu nhiên
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('wish_user_id', userId);
    }
    return userId;
}

const currentUserId = getOrCreateUserId();

// Hiển thị lời chúc từ Firebase
function loadWishesFromFirebase() {
    const wishesRef = ref(db, 'wishes');
    
    onValue(wishesRef, (snapshot) => {
        wishesData = [];
        const data = snapshot.val();
        
        if (data) {
            // Lọc chỉ lấy lời chúc của user hiện tại
            Object.keys(data).forEach(key => {
                const wish = data[key];
                if (wish.userId === currentUserId) {
                    wishesData.unshift({
                        id: key,
                        ...wish
                    });
                }
            });
            
            // Sắp xếp theo thời gian (mới nhất lên đầu)
            wishesData.sort((a, b) => b.createdAt - a.createdAt);
            
            // Giới hạn hiển thị 5 lời chúc mới nhất
            const displayWishes = wishesData.slice(0, 5);
            displayWishesInContainer(displayWishes);
        }
        
        // Nếu không có lời chúc nào, hiển thị lời chúc mẫu
        if (wishesData.length === 0) {
            displaySampleWishes();
        }
    });
}

// Hiển thị lời chúc mẫu
function displaySampleWishes() {
    const sampleWishes = [
        { 
            sender: "Anh Việt", 
            message: "Chúc em sắp bước vào kỳ thi chuẩn bị tinh thần thật tốt dù khó khăn nào cũng sẽ vượt qua chúc em sẽ bước đầu vào con đường mới sau,càng thành công,hãy luôn nở nụ cười trên môi dù gặp khó khăn như nào nhé.", 
            relationship: "family",
            time: "2 ngày trước",
            isSample: true
        }
    ];
    
    displayWishesInContainer(sampleWishes);
}

// Hiển thị lời chúc vào container
function displayWishesInContainer(wishes) {
    const container = document.getElementById('wishes-container');
    container.innerHTML = '';
    
    if (wishes.length === 0) {
        container.innerHTML = `
            <div class="no-wishes-message">
                <i class="fas fa-comment-slash"></i>
                <p>Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!</p>
            </div>
        `;
        return;
    }
    
    wishes.forEach(wish => {
        const wishElement = createWishElement(wish);
        container.appendChild(wishElement);
    });
}

// Tạo phần tử lời chúc
function createWishElement(wish) {
    const wishElement = document.createElement('div');
    wishElement.classList.add('wish-item');
    
    // Map relationship to display text
    const relationshipText = {
        'family': 'Gia đình',
        'friend': 'Bạn bè',
        'teacher': 'Thầy cô',
        'alumni': 'Cựu học sinh',
        'other': 'Khác'
    };
    
    // Format thời gian
    let timeText = wish.time || 'Vừa xong';
    if (wish.createdAt && !wish.isSample) {
        const now = Date.now();
        const diff = now - wish.createdAt;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (diff < 60000) {
            timeText = 'Vừa xong';
        } else if (diff < 3600000) {
            const minutes = Math.floor(diff / (1000 * 60));
            timeText = `${minutes} phút trước`;
        } else if (diff < 86400000) {
            timeText = `${hours} giờ trước`;
        } else {
            timeText = `${days} ngày trước`;
        }
    }
    
    wishElement.innerHTML = `
        <div class="wish-sender">
            <i class="fas fa-user-circle"></i>
            ${wish.sender}
            <span class="wish-relationship">${relationshipText[wish.relationship] || wish.relationship}</span>
        </div>
        <div class="wish-message">${wish.message}</div>
        <div class="wish-time">
            <i class="far fa-clock"></i>
            ${timeText}
            ${wish.isSample ? '<span class="sample-badge">Mẫu</span>' : ''}
        </div>
    `;
    
    return wishElement;
}

// Xử lý gửi lời chúc
function setupWishForm() {
    const form = document.getElementById('wish-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Lấy dữ liệu form
            const sender = this.querySelector('[name="sender"]').value;
            const message = this.querySelector('[name="message"]').value;
            const relationship = this.querySelector('[name="relationship"]').value;
            
            // Kiểm tra dữ liệu
            if (!sender || !message) {
                showWishNotification('Vui lòng điền đầy đủ thông tin', 'error');
                return;
            }
            
            // Chuẩn bị dữ liệu gửi lên Firebase
            const wishData = {
                sender: sender.trim(),
                message: message.trim(),
                relationship: relationship || 'other',
                createdAt: Date.now(),
                time: 'Vừa xong',
                userId: currentUserId  // Thêm userID để phân biệt
            };
            
            try {
                // Hiển thị loading
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
                submitBtn.disabled = true;
                
                // Gửi lên Firebase
                const newWishRef = push(ref(db, 'wishes'));
                await set(newWishRef, wishData);
                
                // Thành công
                showWishNotification('🎉 Cảm ơn bạn đã gửi lời chúc!');
                form.reset();
                
            } catch (error) {
                console.error('Lỗi khi gửi lời chúc:', error);
                showWishNotification('❌ Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
            } finally {
                // Khôi phục nút submit
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ... (phần còn lại giữ nguyên)

// Hiển thị thông báo
function showWishNotification(message, type = 'success') {
    // Xóa thông báo cũ
    const oldNotification = document.querySelector('.wish-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.className = `wish-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${type === 'error' ? '#ff6b6b, #ee5a52' : '#FFD700, #DAA520'});
        color: ${type === 'error' ? 'white' : '#5a4a42'};
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(218, 165, 32, 0.4);
        z-index: 10000;
        font-weight: 500;
        font-size: 14px;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s ease';
        
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
        
        .wish-notification.error {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52) !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    addNotificationStyles();
    setupWishForm();
    loadWishesFromFirebase();
});
