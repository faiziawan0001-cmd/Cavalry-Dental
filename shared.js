/* =============================================
   CAVALRY DENTAL CARE — shared.js
   Nav scroll effect + mobile menu + scroll animations + accordions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ——— Nav scroll effect ——— */
  const header = document.getElementById('site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        if (header.dataset.transparent === 'true') {
          header.classList.add('transparent');
          header.classList.remove('scrolled');
        } else {
          header.classList.add('scrolled');
        }
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ——— Mobile menu toggle ——— */
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
      })
    );
  }

  /* ——— Scroll animations ——— */
  const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => observer.observe(el));
  }

  /* ——— Active nav link ——— */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ——— Filter tabs (work page) ——— */
  const tabs = document.querySelectorAll('.filter-tab');
  const workCards = document.querySelectorAll('.work-card[data-cat]');
  if (tabs.length && workCards.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        workCards.forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ——— Counter animation ——— */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObserver.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals || 0;
    const duration = 1600;
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = (target * ease).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ——— Service Accordions ——— */
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  /* ——— ANTI-INSPECT & COPY PROTECTION SCRIPT ——— */
  // Disable Right-Click Context Menu
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable F12, Ctrl+U (View Source), Ctrl+S (Save Page), Ctrl+Shift+I, Ctrl+Shift+C (Inspect)
  document.addEventListener('keydown', e => {
    if (
      e.keyCode === 123 || 
      (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83)) || 
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67))
    ) {
      e.preventDefault();
    }
  });

});