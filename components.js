// Shared component configurations for the website
const siteConfig = {
  en: {
    navigation: [
      { href: 'index.html', label: 'Home' },
      { href: 'aboutme.html', label: 'About me' },
      { href: 'skills.html', label: 'My skills' },
      { href: 'contact.html', label: 'Contact me' },
      { href: 'resume.html', label: 'Resume' }
    ],
    languageFlags: [
      { href: 'index.html', src: 'pictures/flag-uk.svg', alt: 'English', lang: 'en' },
      { href: 'it/index.html', src: 'pictures/flag-italy.svg', alt: 'Italian', lang: 'it' }
    ]
  },
  it: {
    navigation: [
      { href: 'index.html', label: 'Home' },
      { href: 'aboutme.html', label: 'Su di me' },
      { href: 'skills.html', label: 'Le mie competenze' },
      { href: 'contact.html', label: 'Contattami' },
      { href: 'resume.html', label: 'Curriculum' }
    ],
    languageFlags: [
      { href: '../index.html', src: '../pictures/flag-uk.svg', alt: 'English', lang: 'en' },
      { href: 'index.html', src: '../pictures/flag-italy.svg', alt: 'Italian', lang: 'it' }
    ]
  },
  fa: {
    navigation: [
      { href: 'index.html', label: 'خانه' },
      { href: 'aboutme.html', label: 'درباره من' },
      { href: 'skills.html', label: 'مهارت‌های من' },
      { href: 'contact.html', label: 'تماس با من' },
      { href: 'resume.html', label: 'رزومه' }
    ],
    languageFlags: [
      { href: '../index.html', src: '../pictures/flag-uk.svg', alt: 'English', lang: 'en' },
      { href: '../it/index.html', src: '../pictures/flag-italy.svg', alt: 'Italian', lang: 'it' },
      { href: 'index.html', src: '../pictures/flag-iran.svg', alt: 'Persian', lang: 'fa' }
    ]
  }
};

// Get current page and language from URL
function getPageContext() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const filename = segments[segments.length - 1] || 'index.html';
  
  let lang = 'en';
  if (segments.includes('it')) lang = 'it';
  if (segments.includes('fa')) lang = 'fa';
  
  return { lang, currentPage: filename };
}

// Create language toggle component
function createLanguageToggle() {
  const { lang, currentPage } = getPageContext();
  const config = siteConfig[lang];
  
  // Update flags to match current page
  const flags = config.languageFlags.map(flag => ({
    ...flag,
    href: flag.href.replace('index.html', currentPage),
    isActive: flag.lang === lang
  }));
  
  const toggleHTML = `
    <div class="LanguageToggle" role="complementary" aria-label="Language selection">
      <div class="toggle-container">
        ${flags.map(flag => `
          <a href="${flag.href}"${flag.isActive ? ' class="active" aria-current="page"' : ''}>
            <img src="${flag.src}" alt="${flag.alt}">
          </a>
        `).join('')}
      </div>
    </div>
  `;
  
  return toggleHTML;
}

// Create navigation component
function createNavigation() {
  const { lang, currentPage } = getPageContext();
  const config = siteConfig[lang];
  
  const navHTML = `
    <header role="banner">
      <div class="HeaderContainer">
        <nav role="navigation" aria-label="Main navigation">
          <ul>
            ${config.navigation.map(item => `
              <li>
                <a href="${item.href}"><span>${item.label}</span></a>
              </li>
            `).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;
  
  return navHTML;
}

// Initialize components when DOM is ready
function initComponents() {
  try {
    // Insert language toggle
    const languageTogglePlaceholder = document.getElementById('language-toggle');
    if (languageTogglePlaceholder) {
      languageTogglePlaceholder.outerHTML = createLanguageToggle();
    } else {
      console.warn('Language toggle placeholder not found');
    }
    
    // Insert navigation
    const navigationPlaceholder = document.getElementById('navigation');
    if (navigationPlaceholder) {
      navigationPlaceholder.outerHTML = createNavigation();
    } else {
      console.warn('Navigation placeholder not found');
    }
  } catch (error) {
    console.error('Error initializing components:', error);
    // Fallback: show a basic error message for debugging
    if (typeof document !== 'undefined') {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'position:fixed;top:10px;right:10px;background:#f44;color:#fff;padding:10px;border-radius:4px;z-index:9999;font-family:monospace;font-size:12px;';
      errorDiv.textContent = 'Component initialization failed. Please refresh.';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    }
  }
}

// Run when DOM is loaded, before activePage.js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
