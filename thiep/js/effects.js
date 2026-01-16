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
    const container = document.createElement('div');
    container.id = 'fireworks-temp';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '3';
    document.body.appendChild(container);
    
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
    
    // Xóa container sau khi pháo hoa kết thúc
    setTimeout(() => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 8000);
}

// Tạo hiệu ứng chim bay
function createBirdsEffect() {
    const container = document.getElementById('birds-effect');
    if (!container) return;
    
    // Xóa chim cũ nếu có
    container.innerHTML = '';
    
    const birdCount = 100; // Số lượng chim
    
    for (let i = 0; i < birdCount; i++) {
        const bird = document.createElement('div');
        bird.classList.add('bird');
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 30 + 15; // 15-45px
        
        // Sử dụng icon chim từ FontAwesome
        bird.innerHTML = '<i class="fas fa-dove"></i>';
        bird.style.fontSize = `${size}px`;
        
        // Màu sắc (trắng, xám, nâu)
        const colors = [
            '#FFFFFF', // Trắng
            '#D3D3D3', // Xám nhạt
            '#A9A9A9', // Xám
            '#8B7355', // Nâu nhạt
            '#DAA520'  // Vàng nâu
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        bird.style.color = color;
        
        // Vị trí bắt đầu (bên ngoài màn hình)
        const startSide = Math.random() > 0.5 ? 'left' : 'right';
        const startY = Math.random() * 100;
        
        if (startSide === 'left') {
            bird.style.left = '-50px';
            bird.style.top = `${startY}vh`;
        } else {
            bird.style.right = '-50px';
            bird.style.top = `${startY}vh`;
        }
        
        // Hiệu ứng bay - tốc độ và hướng ngẫu nhiên
        const duration = Math.random() * 20 + 15; // 15-35s
        const delay = Math.random() * 5;
        const curveY = Math.random() * 100 - 50;
        
        // Tạo animation riêng cho mỗi chim
        const animationName = `birdFly${i}`;
        
        // Thêm keyframes động
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${animationName} {
                0% {
                    transform: translateX(0) translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.9;
                }
                90% {
                    opacity: 0.9;
                }
                100% {
                    transform: translateX(${startSide === 'left' ? 'calc(100vw + 100px)' : 'calc(-100vw - 100px)'}) 
                               translateY(${curveY}px) 
                               rotate(${startSide === 'left' ? '10' : '-10'}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        bird.style.animation = `${animationName} ${duration}s linear ${delay}s infinite`;
        
        // Hiệu ứng vỗ cánh
        bird.style.animation += `, birdFlap 0.3s ease-in-out ${delay}s infinite alternate`;
        
        container.appendChild(bird);
    }
}

// Thêm CSS cho hiệu ứng chim bay
function addBirdsStyles() {
    const styleId = 'birds-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        #birds-effect {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .bird {
            position: absolute;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
        
        @keyframes birdFlap {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-5px);
            }
        }
        
        /* Thêm hiệu ứng cho các loại chim khác nhau */
        .bird:nth-child(3n) i {
            /* Chim lớn hơn */
            transform: scale(1.2);
        }
        
        .bird:nth-child(3n+1) i {
            /* Chim nhỏ hơn */
            transform: scale(0.9);
        }
        
        .bird:nth-child(5n) {
            /* Một số chim bay cao hơn */
            filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.7));
        }
    `;
    document.head.appendChild(style);
}

// Mở phong bì
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    
    // Thêm class mở
    envelope.classList.add('open');
    
    // PHÁT NHẠC NGAY KHI MỞ THIỆP - GỌI HÀM TỪ music.js
    setTimeout(() => {
        if (window.playMusicOnEnvelopeOpen) {
            window.playMusicOnEnvelopeOpen();
        }
    }, 300);
    
    // Tạo hiệu ứng kim tuyến khi mở thiệp
    createGoldenFireworks();
    
    // Tạo hiệu ứng chim bay
    createBirdsEffect();
    addBirdsStyles();
    
    // Ẩn phong bì và hiện nội dung sau 1 giây
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Tạo hiệu ứng kim tuyến bay
            createGlitterEffect();
            addGlitterStyles();
            
            // Tạo hiệu ứng chim bay
            createBirdsEffect();
            addBirdsStyles();
            
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
    
    // Tạo hiệu ứng chim bay ban đầu
    createBirdsEffect();
    addBirdsStyles();
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
// Thêm vào đầu file effects.js (sau các import và khai báo biến)

// ========== HIỆU ỨNG ĐẬP TIM VÀ BẮN TIM ==========

// Thêm hiệu ứng đập tim cho envelope
function addHeartbeatEffect() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('heartbeat');
    }
}

// Tạo hiệu ứng bắn tim khi click
// Thêm vào effects.js sau các hàm hiện có

// ========== HIỆU ỨNG CỤM TIM XUNG QUANH THIỆP ==========

// Tạo tim quay xung quanh envelope
// Thêm vào effects.js sau các hàm hiện có

// ========== HIỆU ỨNG CỤM TIM XUNG QUANH THIỆP ==========

// Tạo tim quay xung quanh envelope
function createOrbitalHearts() {
    const envelope = document.querySelector('.envelope');
    if (!envelope) return;
    
    // Thêm lớp cho envelope
    envelope.classList.add('envelope-surround-hearts');
    
    // Tạo các tim quỹ đạo
    const heartCount = 8;
    const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-orbital';
            heart.textContent = heartEmojis[i];
            
            // Thời gian animation khác nhau
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationTimingFunction = 'linear';
            
            // Màu sắc
            const colors = ['#ff4081', '#e91e63', '#c2185b', '#f06292', '#f8bbd0'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Thêm vào envelope
            envelope.appendChild(heart);
        }, i * 200);
    }
}

// Tạo vòng tròn tim xung quanh envelope
function createHeartCircleAroundEnvelope() {
    const envelope = document.querySelector('.envelope');
    if (!envelope) return;
    
    const heartCircle = document.createElement('div');
    heartCircle.className = 'heart-circle';
    
    const heartCount = 12;
    const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-circle-particle';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Vị trí trên vòng tròn
        const angle = (i / heartCount) * Math.PI * 2;
        const radius = 80;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        heart.style.left = `calc(50% + ${x}px)`;
        heart.style.top = `calc(50% + ${y}px)`;
        
        // Animation delay
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        heartCircle.appendChild(heart);
    }
    
    envelope.appendChild(heartCircle);
}

// Tạo hiệu ứng tỏa sáng xung quanh envelope
function createEnvelopeGlow() {
    const envelope = document.querySelector('.envelope');
    if (!envelope) return;
    
    const glow = document.createElement('div');
    glow.className = 'envelope-glow';
    envelope.appendChild(glow);
}

// Tạo các hạt nhỏ xung quanh envelope
function createEnvelopeParticles() {
    const envelope = document.querySelector('.envelope');
    if (!envelope) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'envelope-particles';
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-dot';
        
        // Random vị trí
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        // Random animation
        const tx = (Math.random() - 0.5) * 20;
        const ty = (Math.random() - 0.5) * 20;
        const delay = Math.random() * 3;
        const duration = 2 + Math.random() * 2;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    envelope.appendChild(particlesContainer);
}

// Tạo hiệu ứng bắn tim từ envelope ra xung quanh (hình vòng tròn)
function createCircleHeartsBurst(centerX, centerY, count = 24) {
    const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
    const colors = ['#ff4081', '#e91e63', '#c2185b', '#f06292', '#f8bbd0'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-burst';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Kích thước
            const size = Math.random() * 20 + 15;
            heart.style.fontSize = `${size}px`;
            
            // Màu sắc
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Tính toán vị trí bắt đầu và kết thúc trên vòng tròn
            const startAngle = Math.random() * Math.PI * 2;
            const endAngle = startAngle + (Math.random() - 0.5) * Math.PI;
            
            const startRadius = 50 + Math.random() * 30;
            const endRadius = 200 + Math.random() * 100;
            
            const startX = Math.cos(startAngle) * startRadius;
            const startY = Math.sin(startAngle) * startRadius;
            const endX = Math.cos(endAngle) * endRadius;
            const endY = Math.sin(endAngle) * endRadius;
            
            // Set CSS variables cho animation
            heart.style.setProperty('--start-x', `${startX}px`);
            heart.style.setProperty('--start-y', `${startY}px`);
            heart.style.setProperty('--end-x', `${endX}px`);
            heart.style.setProperty('--end-y', `${endY}px`);
            
            // Random positions for mid animation
            const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 50;
            const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 50;
            const midX2 = (startX + endX) / 2 + (Math.random() - 0.5) * 30;
            const midY2 = (startY + endY) / 2 + (Math.random() - 0.5) * 30;
            
            heart.style.setProperty('--mid-x', `${midX}px`);
            heart.style.setProperty('--mid-y', `${midY}px`);
            heart.style.setProperty('--mid-x2', `${midX2}px`);
            heart.style.setProperty('--mid-y2', `${midY2}px`);
            
            // Random rotation
            const startRotate = Math.random() * 360;
            const midRotate = startRotate + 180;
            const endRotate = startRotate + 360;
            
            heart.style.setProperty('--start-rotate', `${startRotate}deg`);
            heart.style.setProperty('--mid-rotate', `${midRotate}deg`);
            heart.style.setProperty('--mid-rotate2', `${midRotate + 90}deg`);
            heart.style.setProperty('--end-rotate', `${endRotate}deg`);
            
            // Vị trí gốc
            heart.style.left = `${centerX}px`;
            heart.style.top = `${centerY}px`;
            
            // Random duration và delay
            const duration = Math.random() * 0.5 + 1.5;
            const delay = Math.random() * 0.3;
            
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            document.body.appendChild(heart);
            
            // Xóa sau animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, (duration + delay) * 1000);
            
        }, i * 30);
    }
}

// Tạo hiệu ứng vòng tròn tỏa ra khi click
function createCircleExplosion(x, y, layers = 3) {
    for (let i = 0; i < layers; i++) {
        setTimeout(() => {
            const circle = document.createElement('div');
            circle.className = 'heart-explosion-circle';
            circle.innerHTML = '💖💗💓💞💕💘💝';
            
            // Styling
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            circle.style.fontSize = `${24 + i * 8}px`;
            circle.style.color = '#ff4081';
            
            // Animation
            const duration = 1.5 + i * 0.3;
            circle.style.animationDuration = `${duration}s`;
            circle.style.animationDelay = `${i * 0.2}s`;
            
            document.body.appendChild(circle);
            
            // Xóa sau animation
            setTimeout(() => {
                if (circle.parentNode) {
                    circle.parentNode.removeChild(circle);
                }
            }, (duration + i * 0.2) * 1000);
            
        }, i * 200);
    }
}

// Cập nhật hàm openEnvelope để sử dụng hiệu ứng mới
// Trong effects.js, đảm bảo hàm openEnvelope được định nghĩa đúng
function openEnvelope(e) {
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    
    if (!envelope || envelope.classList.contains('open')) return;
    
    // Thêm class mở
    envelope.classList.add('open');
    envelope.classList.remove('heartbeat');
    
    // PHÁT NHẠC NGAY KHI MỞ THIỆP
    setTimeout(() => {
        if (window.playMusicOnEnvelopeOpen) {
            window.playMusicOnEnvelopeOpen();
        }
    }, 300);
    
    // Ẩn phong bì và hiện nội dung sau 1 giây
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Tạo hiệu ứng kim tuyến bay
            if (typeof createGlitterEffect === 'function') {
                createGlitterEffect();
            }
            
            // Tạo hiệu ứng hạt bay
            if (typeof createParticlesEffect === 'function') {
                createParticlesEffect();
            }
        }, 1000);
    }, 1000);
}

// Thêm sự kiện cho envelope
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.querySelector('.envelope');
    
    if (envelope) {
        // Thêm hiệu ứng đập tim
        setTimeout(() => {
            envelope.classList.add('heartbeat');
        }, 1000);
        
        // Thêm sự kiện click
        envelope.addEventListener('click', openEnvelope);
    }
});
