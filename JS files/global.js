document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
      
      // Update icon (assuming Phosphor or similar class toggle, or just CSS content)
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (!isExpanded) {
          icon.classList.remove('ph-list');
          icon.classList.add('ph-x');
        } else {
          icon.classList.remove('ph-x');
          icon.classList.add('ph-list');
        }
      }
    });
  }

  // Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // Dark Mode Toggle (Optional, can be added to header)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Check local storage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isNowDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
      updateThemeIcon(isNowDark);
    });

    function updateThemeIcon(isDark) {
      const icon = themeToggle.querySelector('i');
      if (!icon) return;
      if (isDark) {
        icon.classList.remove('ph-moon');
        icon.classList.add('ph-sun');
      } else {
        icon.classList.remove('ph-sun');
        icon.classList.add('ph-moon');
      }
    }
  }
});
