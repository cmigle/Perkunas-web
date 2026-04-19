/* ============================================
   THEME TOGGLE FUNCTIONALITY
   ============================================ */

(function() {
  'use strict';
  
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme
  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    
    // Dispatch custom event for other scripts to listen to
    document.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme }
    }));
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  // Initialize theme
  applyTheme(savedTheme);
  
  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
})();
