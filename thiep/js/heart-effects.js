// Hiệu ứng tim riêng biệt
(function() {
    'use strict';
    
    // Biến toàn cục
    let isEnvelopeOpen = false;
    
    // Thêm hiệu ứng đập tim cho envelope
    function initHeartbeatEffect() {
        const envelope = document.querySelector('.envelope');
        if (envelope) {
            // Đợi 1 giây rồi bắt đầu đập
            setTimeout(() => {
                envelope.classList.add('heartbeat');
            }, 1000);
        }
    }
    
    // Tạo hiệu ứng bắn tim
    function createHeartExplosion(x, y, count = 20) {
        const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-explosion';
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${Math.random() * 20 + 15}px;
                    z-index: 1000;
                    pointer-events: none;
                    animation: heartFloat ${Math.random() * 0.5 + 1.5}s ease-out forwards;
                    opacity: 0;
                `;
                
                document.body.appendChild(heart);
                
                // Xóa sau animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
                
            }, i * 30);
        }
    }
    
    // Thêm CSS động cho hiệu ứng tim
    function addHeartStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .heart-explosion {
                animation: heartExplode 1.5s ease-out forwards;
            }
            
            @keyframes heartExplode {
                0% {
                    transform: translate(0, 0) scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, -50px) scale(1) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Khởi tạo
    document.addEventListener('DOMContentLoaded', function() {
        initHeartbeatEffect();
        addHeartStyles();
        
        // Thêm sự kiện click cho envelope
        const envelope = document.querySelector('.envelope');
        if (envelope) {
            envelope.addEventListener('click', function(e) {
                if (!isEnvelopeOpen) {
                    isEnvelopeOpen = true;
                    this.classList.remove('heartbeat');
                    
                    // Bắn tim từ vị trí click
                    createHeartExplosion(e.clientX, e.clientY, 30);
                }
            });
        }
    });
    
    // Xuất hàm ra global nếu cần
    window.heartEffects = {
        createHeartExplosion,
        initHeartbeatEffect
    };
})();