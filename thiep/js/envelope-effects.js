// Hiệu ứng envelope riêng biệt
(function() {
    'use strict';
    
    // Biến toàn cục
    let isEffectsInitialized = false;
    
    // Khởi tạo hiệu ứng xung quanh envelope
    function initEnvelopeSurroundEffects() {
        if (isEffectsInitialized) return;
        
        const envelope = document.querySelector('.envelope');
        if (!envelope) return;
        
        // Thêm lớp wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'envelope-effects-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        
        // Wrap envelope
        envelope.parentNode.insertBefore(wrapper, envelope);
        wrapper.appendChild(envelope);
        
        // Thêm các hiệu ứng
        addOrbitalHearts(envelope);
        addParticles(envelope);
        addGlow(envelope);
        
        isEffectsInitialized = true;
    }
    
    // Thêm tim quay xung quanh
    function addOrbitalHearts(envelope) {
        const heartCount = 6;
        const heartTypes = ['❤️', '💖', '💗', '💓', '💞', '💕'];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'orbital-heart';
            heart.textContent = heartTypes[i];
            
            // Styling
            heart.style.cssText = `
                position: absolute;
                font-size: 18px;
                animation: orbitalMove 3s linear infinite;
                animation-delay: ${i * 0.5}s;
                z-index: 1;
                pointer-events: none;
                filter: drop-shadow(0 2px 4px rgba(255, 20, 147, 0.3));
            `;
            
            // Thêm vào wrapper
            envelope.parentNode.appendChild(heart);
        }
        
        // Thêm CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes orbitalMove {
                0% {
                    transform: rotate(0deg) translateX(100px) rotate(0deg) scale(1);
                    opacity: 0.7;
                }
                25% {
                    transform: rotate(90deg) translateX(100px) rotate(-90deg) scale(1.2);
                    opacity: 1;
                }
                50% {
                    transform: rotate(180deg) translateX(100px) rotate(-180deg) scale(1);
                    opacity: 0.7;
                }
                75% {
                    transform: rotate(270deg) translateX(100px) rotate(-270deg) scale(0.8);
                    opacity: 1;
                }
                100% {
                    transform: rotate(360deg) translateX(100px) rotate(-360deg) scale(1);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Thêm hạt nhỏ xung quanh
    function addParticles(envelope) {
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'envelope-particle';
            
            // Styling
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #ff4081, #e91e63);
                border-radius: 50%;
                animation: particleFloat 3s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                z-index: 1;
                pointer-events: none;
            `;
            
            // Vị trí ngẫu nhiên
            const angle = Math.random() * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            
            envelope.parentNode.appendChild(particle);
        }
        
        // Thêm CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.5);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Thêm ánh sáng xung quanh
    function addGlow(envelope) {
        const glow = document.createElement('div');
        glow.className = 'envelope-aura';
        
        // Styling
        glow.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 140%;
            height: 140%;
            background: radial-gradient(circle, 
                rgba(255, 20, 147, 0.15) 0%,
                rgba(255, 105, 180, 0.08) 40%,
                transparent 70%);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            animation: auraPulse 2s infinite alternate;
            z-index: 0;
            pointer-events: none;
        `;
        
        envelope.parentNode.appendChild(glow);
        
        // Thêm CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes auraPulse {
                0% {
                    opacity: 0.2;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                100% {
                    opacity: 0.4;
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Tạo hiệu ứng bắn tim vòng tròn khi click
    function createSurroundHeartExplosion(x, y) {
        const heartTypes = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
        const layerCount = 3;
        const heartsPerLayer = 12;
        
        for (let layer = 0; layer < layerCount; layer++) {
            for (let i = 0; i < heartsPerLayer; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'surround-heart';
                    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                    
                    // Styling
                    const size = 20 + layer * 5;
                    heart.style.cssText = `
                        position: fixed;
                        font-size: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        z-index: 1000;
                        pointer-events: none;
                        animation: surroundExplode 1.5s ease-out forwards;
                        animation-delay: ${layer * 0.1}s;
                    `;
                    
                    // Tính toán hướng
                    const angle = (i / heartsPerLayer) * Math.PI * 2;
                    const distance = 100 + layer * 50;
                    
                    // Thêm custom properties
                    heart.style.setProperty('--angle', angle);
                    heart.style.setProperty('--distance', distance);
                    
                    document.body.appendChild(heart);
                    
                    // Xóa sau animation
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.parentNode.removeChild(heart);
                        }
                    }, 1500);
                    
                }, layer * 50 + i * 10);
            }
        }
        
        // Thêm CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes surroundExplode {
                0% {
                    transform: translate(0, 0) rotate(0deg) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(
                        calc(cos(var(--angle)) * var(--distance) * 0.7px),
                        calc(sin(var(--angle)) * var(--distance) * 0.7px)
                    ) rotate(180deg) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        calc(cos(var(--angle)) * var(--distance) * 1.5px),
                        calc(sin(var(--angle)) * var(--distance) * 1.5px)
                    ) rotate(360deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Xóa style sau 2 giây
        setTimeout(() => {
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 2000);
    }
    
    // Khởi tạo khi trang tải
    document.addEventListener('DOMContentLoaded', function() {
        // Bắt đầu hiệu ứng sau 1.5 giây
        setTimeout(initEnvelopeSurroundEffects, 1500);
        
        // Thêm sự kiện click cho envelope
        const envelope = document.querySelector('.envelope');
        if (envelope) {
            envelope.addEventListener('click', function(e) {
                // Tạo hiệu ứng bắn tim vòng tròn
                createSurroundHeartExplosion(e.clientX, e.clientY);
            });
        }
    });
    
    // Xuất hàm ra global nếu cần
    window.envelopeEffects = {
        initEnvelopeSurroundEffects,
        createSurroundHeartExplosion
    };
})();