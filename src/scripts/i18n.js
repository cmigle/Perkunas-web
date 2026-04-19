/* ============================================
   I18N SYSTEM - INTERNATIONALIZATION
   Language switcher and translation management
   ============================================ */

(function() {
  'use strict';
  
  // Available languages
  const LANGUAGES = {
    lt: { name: 'LT', flag: '🇱🇹', file: '/i18n/lt.json' },
    en: { name: 'EN', flag: '🇬🇧', file: '/i18n/en.json' }
  };
  
  // Default language
  const DEFAULT_LANG = 'lt';
  
  // Current language and translations
  let currentLang = DEFAULT_LANG;
  let translations = {};
  
  // Initialize i18n system
  function init() {
    // Set HTML lang attribute immediately to prevent flash
    const stored = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    currentLang = stored || (LANGUAGES[browserLang] ? browserLang : DEFAULT_LANG);
    document.documentElement.lang = currentLang;
    
    // Load translations
    loadTranslations(currentLang).then(() => {
      // Create language switcher
      createLanguageSwitcher();
      
      // Apply translations to page
      translatePage();
    });
  }
  
  // Load translations from JSON file
  async function loadTranslations(lang) {
    try {
      const response = await fetch(LANGUAGES[lang].file);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      translations = await response.json();
      console.log(`Translations loaded for ${lang}`);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to default language if current fails
      if (lang !== DEFAULT_LANG) {
        console.log(`Falling back to ${DEFAULT_LANG}`);
        return loadTranslations(DEFAULT_LANG);
      }
    }
  }
  
  // Get translation by key path (e.g., "nav.home")
  function t(keyPath, replacements = {}) {
    const keys = keyPath.split('.');
    let value = translations;
    
    // Navigate through nested keys
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${keyPath}`);
        return keyPath; // Return key if translation not found
      }
    }
    
    // Replace placeholders like {current}, {total}
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return replacements[key] !== undefined ? replacements[key] : match;
      });
    }
    
    return value;
  }
  
  // Create language switcher UI
  function createLanguageSwitcher() {
    const navbar = document.querySelector('.pill-menu');
    if (!navbar) return;
    
    // Check if switcher already exists
    if (document.getElementById('lang-switcher')) return;
    
    // Create switcher button
    const switcher = document.createElement('button');
    switcher.id = 'lang-switcher';
    switcher.className = 'lang-switcher';
    switcher.setAttribute('aria-label', 'Change language');
    switcher.title = 'Change language';
    
    // Set initial text
    updateSwitcherText(switcher);
    
    // Add click handler
    switcher.addEventListener('click', () => {
      // Toggle language
      const newLang = currentLang === 'lt' ? 'en' : 'lt';
      switchLanguage(newLang);
    });
    
    // Add to navbar
    navbar.appendChild(switcher);
  }
  
  // Update switcher button text - show CURRENT language
  function updateSwitcherText(switcher) {
    switcher.innerHTML = `
      <span class="lang-flag">${LANGUAGES[currentLang].flag}</span>
      <span class="lang-name">${LANGUAGES[currentLang].name}</span>
    `;
  }
  
  // Switch to a different language
  async function switchLanguage(lang) {
    if (!LANGUAGES[lang]) {
      console.error(`Language not supported: ${lang}`);
      return;
    }
    
    // Update current language
    currentLang = lang;
    
    // Save preference
    localStorage.setItem('language', lang);
    
    // Load new translations
    await loadTranslations(lang);
    
    // Update page
    translatePage();
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update switcher button
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
      updateSwitcherText(switcher);
    }
    
    // Dispatch custom event for other scripts to react
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
  
  // Translate all elements on the page
  function translatePage() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = t(key);
      
      // Update text content
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.tagName === 'OPTION') {
        // Handle select options specifically
        element.textContent = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // Translate placeholder attributes separately
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      element.placeholder = translation;
    });
    
    // Translate elements with data-i18n-html (allows HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = t(key);
      element.innerHTML = translation;
    });
    
    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = t(key);
      element.title = translation;
    });
    
    // Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = t(key);
      element.setAttribute('aria-label', translation);
    });
    
    // Remove loading class after translations are applied
    document.body.classList.remove('i18n-loading');
  }
  
  // Export functions for global use
  window.i18n = {
    t: t,
    switchLanguage: switchLanguage,
    getCurrentLanguage: () => currentLang,
    getAvailableLanguages: () => LANGUAGES,
    translatePage: translatePage
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();

/* ============================================
   USAGE EXAMPLES:
   
   HTML:
   <h1 data-i18n="hero.title"></h1>
   <p data-i18n="hero.description"></p>
   <button data-i18n-title="ui.close" data-i18n="ui.close"></button>
   <input data-i18n="contact.name" placeholder="Name">
   
   JavaScript:
   const text = window.i18n.t('nav.home');
   const dynamicText = window.i18n.t('gallery.imageOf', { current: 1, total: 10 });
   window.i18n.switchLanguage('en');
   
   ============================================ */
