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
playMusicOnEnvelopeOpen();
// Thêm hàm tạo hiệu ứng hạt bay
// Tạo hiệu ứng hạt bay (cập nhật)
function createParticlesEffect() {
    const container = document.getElementById('particles-effect');
    if (!container) return;
    
    // Xóa hạt cũ nếu có
    container.innerHTML = '';
    
    const particleCount = 60; // Tăng số lượng hạt
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Kích thước và hình dạng ngẫu nhiên
        const size = Math.random() * 8 + 3; // Tăng kích thước
        const isCircle = Math.random() > 0.5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = isCircle ? '50%' : '2px';
        
        // Vị trí ngẫu nhiên
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Màu sắc (vàng, trắng, nâu nhạt) - Tăng độ đậm
        const colors = [
            'rgba(255, 215, 0, 0.9)',    // Vàng đậm
            'rgba(255, 255, 255, 1)',    // Trắng
            'rgba(218, 165, 32, 0.9)',   // Vàng nâu đậm
            'rgba(255, 223, 0, 0.9)',    // Vàng sáng
            'rgba(255, 248, 220, 0.9)'   // Vàng nhạt
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Hiệu ứng bay - Tăng độ rõ
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const directionX = Math.random() * 200 - 100;
        
        particle.style.animation = `
            particleFloat ${duration}s linear ${delay}s infinite,
            particlePulse ${duration/3}s ease-in-out ${delay}s infinite alternate
        `;
        
        // Thêm custom property cho hiệu ứng
        particle.style.setProperty('--direction-x', `${directionX}px`);
        
        // Hiệu ứng xoay
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(particle);
    }
}

// Thêm CSS cho hiệu ứng hạt bay (cập nhật)
function addParticlesStyles() {
    const styleId = 'particles-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        #particles-effect {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
        }
        
        @keyframes particleFloat {
            0% {
                transform: translateY(110vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.9;
            }
            90% {
                opacity: 0.9;
            }
            100% {
                transform: translateY(-100px) translateX(var(--direction-x, 100px)) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes particlePulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.3);
            }
        }
    `;
    document.head.appendChild(style);
}

// Sửa hàm openEnvelope để phát nhạc ngay khi mở
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    
    // Thêm class mở
    envelope.classList.add('open');
    
    // PHÁT NHẠC NGAY KHI MỞ THIỆP
    setTimeout(() => {
        if (window.playMusicOnEnvelopeOpen) {
            window.playMusicOnEnvelopeOpen();
        }
    }, 300);
    
    // Tạo hiệu ứng kim tuyến khi mở thiệp
    createGoldenFireworks();
    
    // Tạo hiệu ứng hạt bay
    createParticlesEffect();
    addParticlesStyles();
    
    // Ẩn phong bì và hiện nội dung sau 1 giây
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Tạo hiệu ứng kim tuyến bay
            createGlitterEffect();
            addGlitterStyles();
            
            // Tạo hiệu ứng hạt bay
            createParticlesEffect();
            addParticlesStyles();
            
            // Tạo pháo hoa định kỳ
            setInterval(createGoldenFireworks, 8000);
        }, 1000);
    }, 1000);
}

// Khởi tạo hiệu ứng khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Tạo hiệu ứng kim tuyến ban đầu
    createGlitterEffect();
    addGlitterStyles();
    
    // Tạo hiệu ứng hạt bay ban đầu
    createParticlesEffect();
    addParticlesStyles();
});
