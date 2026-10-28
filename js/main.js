// ================================================================
// ELINGA'S BUZZY HUB — MAIN APPLICATION & MODAL CONTROLLERS
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Dialog event handlers (data-dialog triggers)
  document.querySelectorAll('[data-dialog]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-dialog');
      const dlg = document.getElementById(id);
      if (dlg) dlg.showModal();
    });
  });

  // Mobile menu modal trigger
  const btnMobile = document.getElementById('btnMenuToggle');
  if (btnMobile) {
    btnMobile.addEventListener('click', () => {
      const mobileDlg = document.getElementById('dialogMobileMenu');
      if (mobileDlg) mobileDlg.showModal();
    });
  }

  // Close dialog on backdrop click
  document.querySelectorAll('dialog').forEach(dlg => {
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        dlg.close();
      }
    });
  });

  // Inquiry form submission handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('contactSuccessMsg');
      if (msg) msg.style.display = 'block';
      contactForm.reset();
    });
  }

  // ================================================================
  // Scroll-Triggered Staggered Entrance Animations
  // ================================================================
  const cardsToAnimate = document.querySelectorAll(
    '.program-card, .gallery-item-card, .info-tile, .garden-hero-banner, .kinder-card, .hero-lead-card, .hero-facade-card'
  );

  cardsToAnimate.forEach(el => {
    el.classList.add('scroll-reveal');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Add revealed class with smooth staggered timing
        entry.target.classList.add('revealed');
        // Clear delay after entrance finishes so hover is instantaneous
        setTimeout(() => {
          entry.target.style.transitionDelay = '0s';
        }, 900);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cardsToAnimate.forEach(card => cardObserver.observe(card));
});
