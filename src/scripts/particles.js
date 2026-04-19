/* ============================================
   INTERACTIVE PARTICLES BACKGROUND
   React Bits inspired mouse-reactive particles
   RESPONSIVE & DEVICE-AWARE VERSION
   ============================================ */

(function() {
  'use strict';
  
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  let animationId;
  let canvasBounds = { x: 0, y: 0, width: 0, height: 0 };
  let resizeTimeout;
  
  // Device breakpoints and particle counts
  const DEVICE_CONFIG = {
    mobile: { maxWidth: 768, particleCount: 20, connectionDistance: 80 },
    tablet: { maxWidth: 1024, particleCount: 60, connectionDistance: 120 },
    desktop: { maxWidth: Infinity, particleCount: 120, connectionDistance: 150 }
  };
  
  // Get current device type
  function getDeviceType() {
    const width = window.innerWidth;
    if (width <= DEVICE_CONFIG.mobile.maxWidth) return 'mobile';
    if (width <= DEVICE_CONFIG.tablet.maxWidth) return 'tablet';
    return 'desktop';
  }
  
  // Configuration
  let CONFIG = {
    particleCount: 100,
    particleSize: 2,
    connectionDistance: 150,
    mouseInfluence: 100,
    colors: {
      particle: '#FA8F31',
      connection: '#F16D26',
      mouseGlow: '#AA1811'
    },
    speed: 0.5,
    opacity: {
      particle: 0.8,
      connection: 0.3
    }
  };
  
  // Update config based on device
  function updateConfig() {
    const deviceType = getDeviceType();
    const deviceSettings = DEVICE_CONFIG[deviceType];
    CONFIG.particleCount = deviceSettings.particleCount;
    CONFIG.connectionDistance = deviceSettings.connectionDistance;
    CONFIG.mouseInfluence = Math.min(100, deviceSettings.connectionDistance * 0.8);
    mouse.radius = CONFIG.mouseInfluence;
  }
  
  // Resize canvas with devicePixelRatio awareness
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const rect = canvas.getBoundingClientRect();
    
    // Store bounds for particle emission
    canvasBounds = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
    
    // Set display size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    // Set actual size in memory (scaled by DPR)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale context to account for DPR
    ctx.scale(dpr, dpr);
  }
  
  // Particle class
  class Particle {
    constructor() {
      // Emit within bounded rectangle
      this.x = Math.random() * canvasBounds.width;
      this.y = Math.random() * canvasBounds.height;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.size = Math.random() * CONFIG.particleSize + 1;
      this.originalSize = this.size;
    }
    
    update() {
      // Move particle
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off edges (constrain to visible bounds)
      if (this.x < 0 || this.x > canvasBounds.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvasBounds.height) this.vy *= -1;
      
      // Clamp position to bounds
      this.x = Math.max(0, Math.min(this.x, canvasBounds.width));
      this.y = Math.max(0, Math.min(this.y, canvasBounds.height));
      
      // Mouse interaction - use relative mouse position
      if (mouse.x !== null && mouse.y !== null) {
        const mouseRelX = mouse.x - canvasBounds.x;
        const mouseRelY = mouse.y - canvasBounds.y;
        
        const dx = mouseRelX - this.x;
        const dy = mouseRelY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Move away from mouse
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.5;
          this.vy -= Math.sin(angle) * force * 0.5;
          
          // Increase size near mouse
          this.size = this.originalSize + force * 3;
        } else {
          // Return to original size
          this.size = this.originalSize;
        }
      }
      
      // Limit velocity
      const maxSpeed = 2;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }
    
    draw() {
      // Draw particle
      ctx.fillStyle = CONFIG.colors.particle;
      ctx.globalAlpha = CONFIG.opacity.particle;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw glow near mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mouseRelX = mouse.x - canvasBounds.x;
        const mouseRelY = mouse.y - canvasBounds.y;
        
        const dx = mouseRelX - this.x;
        const dy = mouseRelY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
          );
          gradient.addColorStop(0, CONFIG.colors.mouseGlow);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = (1 - distance / mouse.radius) * 0.5;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  
  // Initialize particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Draw connections between nearby particles
  function drawConnections() {
    ctx.globalAlpha = CONFIG.opacity.connection;
    ctx.strokeStyle = CONFIG.colors.connection;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONFIG.connectionDistance) {
          ctx.globalAlpha = 
            CONFIG.opacity.connection * 
            (1 - distance / CONFIG.connectionDistance);
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Draw mouse influence area
  function drawMouseArea() {
    if (mouse.x === null || mouse.y === null) return;
    
    const mouseRelX = mouse.x - canvasBounds.x;
    const mouseRelY = mouse.y - canvasBounds.y;
    
    // Only draw if mouse is within bounds
    if (mouseRelX < 0 || mouseRelX > canvasBounds.width || 
        mouseRelY < 0 || mouseRelY > canvasBounds.height) return;
    
    const gradient = ctx.createRadialGradient(
      mouseRelX, mouseRelY, 0,
      mouseRelX, mouseRelY, mouse.radius
    );
    gradient.addColorStop(0, 'rgba(250, 143, 49, 0.1)');
    gradient.addColorStop(0.5, 'rgba(241, 109, 38, 0.05)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(mouseRelX, mouseRelY, mouse.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Animation loop
  function animate() {
    // Clear canvas with slight trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvasBounds.width, canvasBounds.height);
    
    // Draw mouse influence area
    drawMouseArea();
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connections
    drawConnections();
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Mouse move handler
  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  
  // Mouse leave handler
  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }
  
  // Touch handlers for mobile
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }
  
  function handleTouchEnd() {
    mouse.x = null;
    mouse.y = null;
  }
  
  // Throttled resize handler
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateConfig();
      resizeCanvas();
      initParticles();
    }, 250); // Throttle to 250ms
  }
  
  // Initialize
  function init() {
    updateConfig();
    resizeCanvas();
    initParticles();
    animate();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
    clearTimeout(resizeTimeout);
  });
  
})();
