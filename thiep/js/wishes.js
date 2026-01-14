// Danh sách lời chúc mẫu
const sampleWishes = [
    { 
        sender: "Anh Việt", 
        message: "Chúc em sắp bước vào kỳ thi chuẩn bị tinh thần thật tốt dù khó khăn nào cũng sẽ vượt qua chúc em sẽ bước đầu vào con đường mới sau,càng thành công,hãy luôn nở nụ cười trên môi dù gặp khó khăn như nào nhé.", 
        relationship: "family",
        time: "2 ngày trước"
    }
];

// Hiển thị lời chúc
function displayWishes() {
    const container = document.getElementById('wishes-container');
    
    // Xóa nội dung cũ
    container.innerHTML = '';
    
    // Hiển thị lời chúc mẫu
    sampleWishes.forEach(wish => {
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
    
    wishElement.innerHTML = `
        <div class="wish-sender">
            <i class="fas fa-user-circle"></i>
            ${wish.sender}
            <span class="wish-relationship">${relationshipText[wish.relationship] || wish.relationship}</span>
        </div>
        <div class="wish-message">${wish.message}</div>
        <div class="wish-time">${wish.time}</div>
    `;
    
    return wishElement;
}

// Xử lý form gửi lời chúc
document.addEventListener('DOMContentLoaded', function() {
    displayWishes();
    
    const form = document.querySelector('form[name="wishes"]');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Chỉ preventDefault nếu không dùng Netlify
            // e.preventDefault();
            
            // Lấy dữ liệu form
            const sender = this.querySelector('[name="sender"]').value;
            const message = this.querySelector('[name="message"]').value;
            const relationship = this.querySelector('[name="relationship"]').value;
            
            // Kiểm tra dữ liệu
            if (!sender || !message) {
                showWishNotification('Vui lòng điền đầy đủ thông tin', 'error');
                return;
            }
            
            // Tạo lời chúc mới
            const newWish = { 
                sender, 
                message, 
                relationship: relationship || 'other',
                time: 'Vừa xong'
            };
            
            // Thêm vào đầu danh sách
            sampleWishes.unshift(newWish);
            
            // Hiển thị lại danh sách (chỉ hiển thị 6 lời chúc mới nhất)
            if (sampleWishes.length > 6) {
                sampleWishes.pop();
            }
            displayWishes();
            
            // Thông báo
            showWishNotification('Cảm ơn bạn đã gửi lời chúc! Lời chúc của bạn đã được ghi nhận.');
            
            // Reset form
            this.reset();
        });
    }
});

// Hiển thị thông báo cho lời chúc
function showWishNotification(message, type = 'success') {
    // Xóa thông báo cũ nếu có
    const oldNotification = document.querySelector('.wish-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.classList.add('wish-notification', type);
    notification.textContent = message;
    
    // Thêm vào form
    const form = document.querySelector('.wishes-form');
    if (form) {
        form.appendChild(notification);
    }
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Thêm CSS cho thông báo lời chúc
function addWishNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .wish-notification {
            background: linear-gradient(135deg, #FFD700, #DAA520);
            color: #5a4a42;
            padding: 12px 20px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            font-weight: 500;
            opacity: 1;
            transition: opacity 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .wish-notification.error {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    addWishNotificationStyles();
});
