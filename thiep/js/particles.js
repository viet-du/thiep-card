// particles.js - Hiệu ứng hạt bay nâng cao
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-effect');
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        const count = 40;
        
        for (let i = 0; i < count; i++) {
            const particle = {
                element: document.createElement('div'),
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 5 + 2,
                speed: Math.random() * 0.5 + 0.2,
                direction: Math.random() * Math.PI * 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.3
            };
            
            particle.element.className = 'particle';
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            particle.element.style.opacity = particle.opacity;
            
            // Màu sắc
            const colors = [
                'rgba(255, 215, 0, 0.8)',
                'rgba(255, 255, 255, 0.9)',
                'rgba(218, 165, 32, 0.7)',
                'rgba(255, 248, 220, 0.8)'
            ];
            particle.element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.element.style.borderRadius = Math.random() > 0.3 ? '50%' : '0';
            
            this.container.appendChild(particle.element);
            this.particles.push(particle);
        }
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Di chuyển
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            particle.rotation += particle.rotationSpeed;
            
            // Quay về khi ra khỏi màn hình
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            
            // Cập nhật vị trí
            particle.element.style.transform = `
                translate(${particle.x}px, ${particle.y}px)
                rotate(${particle.rotation}deg)
            `;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particles-effect')) {
        new ParticleSystem();
    }
});