// Tạo hiệu ứng kim tuyến bay
function createGlitterEffect() {
    const container = document.getElementById('glitter-effect');
    const glitterCount = 30;
    
    for (let i = 0; i < glitterCount; i++) {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 8 + 4;
        glitter.style.width = `${size}px`;
        glitter.style.height = `${size}px`;
        
        // Vị trí ngẫu nhiên
        glitter.style.left = `${Math.random() * 100}vw`;
        glitter.style.top = `${Math.random() * 100}vh`;
        
        // Màu sắc kim tuyến (vàng, trắng, ánh kim)
        const colors = [
            'rgba(255, 215, 0, 0.8)', // Gold
            'rgba(255, 255, 255, 0.9)', // White
            'rgba(255, 223, 0, 0.7)', // Light Gold
            'rgba(255, 248, 220, 0.8)' // Cornsilk
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        glitter.style.backgroundColor = color;
        
        // Hiệu ứng sáng lấp lánh
        glitter.style.boxShadow = `0 0 ${size}px ${color}`;
        
        // Tốc độ bay ngẫu nhiên
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        glitter.style.animationDuration = `${duration}s`;
        glitter.style.animationDelay = `${delay}s`;
        
        container.appendChild(glitter);
    }
}

// Thêm CSS cho hiệu ứng kim tuyến
function addGlitterStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .glitter {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            opacity: 0;
            animation: glitterFloat linear infinite;
        }
        
        @keyframes glitterFloat {
            0% {
                transform: translateY(100vh) rotate(0deg) scale(0.5);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px) rotate(360deg) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Hiệu ứng pháo hoa vàng
function createGoldenFireworks() {
    const container = document.getElementById('fireworks');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('golden-firework');
            
            // Vị trí ngẫu nhiên
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            
            // Kích thước ngẫu nhiên
            const size = Math.random() * 15 + 8;
            firework.style.width = size + 'px';
            firework.style.height = size + 'px';
            
            // Màu vàng với độ trong suốt khác nhau
            const opacity = Math.random() * 0.6 + 0.4;
            firework.style.backgroundColor = `rgba(255, 215, 0, ${opacity})`;
            firework.style.boxShadow = `0 0 ${size * 2}px rgba(255, 215, 0, ${opacity})`;
            
            container.appendChild(firework);
            
            // Hiệu ứng nổ
            setTimeout(() => {
                firework.style.transform = 'scale(2)';
                firework.style.opacity = '0';
                
                // Xóa sau khi hiệu ứng kết thúc
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 1000);
            }, 300);
        }, i * 400);
    }
}

// Mở phong bì
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    
    // Thêm class mở
    envelope.classList.add('open');
    
    // Tạo hiệu ứng kim tuyến khi mở thiệp
    createGoldenFireworks();
    
    // Ẩn phong bì và hiện nội dung sau 1 giây
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Tạo hiệu ứng kim tuyến bay
            createGlitterEffect();
            addGlitterStyles();
            
            // Tạo pháo hoa định kỳ
            setInterval(createGoldenFireworks, 5000);
        }, 1000);
    }, 1000);
}

// Khởi tạo hiệu ứng khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Tạo hiệu ứng kim tuyến ban đầu
    createGlitterEffect();
    addGlitterStyles();
});