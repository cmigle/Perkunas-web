/* ============================================
   SCROLL ANIMATIONS
   React Bits inspired scroll-triggered animations
   ============================================ */

(function() {
  'use strict';
  
  // Animation observer configuration
  const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Add stagger effect for children
        const children = entry.target.querySelectorAll('[data-animate-child]');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    });
  }, observerConfig);
  
  // Observe elements
  function observeElements() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));
  }
  
  // Add data attributes to elements for animation
  function setupAnimations() {
    // Animate sections
    document.querySelectorAll('section').forEach(section => {
      section.setAttribute('data-animate', 'fade-up');
    });
    
    // Animate cards
    document.querySelectorAll('.card, .about-card, .skill-card, .innovation-card, .cta-card, .stat-card, .leadership-card, .tech-card').forEach(card => {
      card.setAttribute('data-animate', 'fade-up');
    });
    
    // Animate journey steps
    document.querySelectorAll('.journey-step').forEach((step, index) => {
      step.setAttribute('data-animate', 'fade-left');
      step.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate section titles
    document.querySelectorAll('.section-title, .section-subtitle').forEach(title => {
      title.setAttribute('data-animate', 'fade-down');
    });
    
    // Animate grid children with stagger
    document.querySelectorAll('.grid-2 > *, .grid-3 > *, .grid-4 > *, .about-grid > *, .skills-grid > *, .stats-grid > *').forEach(child => {
      child.setAttribute('data-animate-child', 'true');
    });
  }
  
  // Parallax effect for hero section
  function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      
      if (hero.querySelector('.hero-content')) {
        hero.querySelector('.hero-content').style.transform = 
          `translateY(${rate}px)`;
      }
    });
  }
  
  // Animated counter for stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
      const target = element.textContent;
      const isPercentage = target.includes('%');
      const isPlus = target.includes('+');
      const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
      
      if (isNaN(numericValue)) return;
      
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
      }, duration / steps);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          countUp(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }
  
  // Magnetic button effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // Tilt effect for cards
  function initTiltEffect() {
    const cards = document.querySelectorAll('.card, .about-card, .skill-card, .innovation-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }
  
  // Cursor trail effect
  function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(250, 143, 49, ${1 - i / trailLength});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
      `;
      document.body.appendChild(dot);
      trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateTrail() {
      let x = mouseX;
      let y = mouseY;
      
      trail.forEach((dot, index) => {
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.transform = `scale(${1 - index / trailLength})`;
        
        const nextDot = trail[index + 1] || trail[0];
        x += (parseInt(nextDot.style.left) - x) * 0.3;
        y += (parseInt(nextDot.style.top) - y) * 0.3;
      });
      
      requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
  }
  
  // Initialize all animations
  function init() {
    setupAnimations();
    observeElements();
    animateCounters();
    initMagneticButtons();
    initTiltEffect();
    initParallaxEffect();
    
    // Cursor trail only on desktop
    if (window.innerWidth > 1024) {
      initCursorTrail();
    }
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

/* Animation keyframes */
const style = document.createElement('style');
style.textContent = `
  [data-animate] {
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  [data-animate].animate-in {
    opacity: 1;
  }
  
  [data-animate="fade-up"] {
    transform: translateY(30px);
  }
  
  [data-animate="fade-up"].animate-in {
    transform: translateY(0);
  }
  
  [data-animate="fade-down"] {
    transform: translateY(-30px);
  }
  
  [data-animate="fade-down"].animate-in {
    transform: translateY(0);
  }
  
  [data-animate="fade-left"] {
    transform: translateX(-30px);
  }
  
  [data-animate="fade-left"].animate-in {
    transform: translateX(0);
  }
  
  [data-animate="fade-right"] {
    transform: translateX(30px);
  }
  
  [data-animate="fade-right"].animate-in {
    transform: translateX(0);
  }
  
  [data-animate-child] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  [data-animate-child].animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
