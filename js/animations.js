/**
 * ANTONY DEEPAK - ULTRA-MODERN PORTFOLIO ANIMATION ENGINE
 * Powered by GSAP 3.12 & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
    // Ensure all elements remain visible
    document.querySelectorAll('.service-card, .project-item-card, .flagship-card, .skill-category-box, .section-head').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lucide Icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================================================
     1. AMBIENT MOUSE GLOW TRACKER
     ========================================================================== */
  const glow1 = document.querySelector('.ambient-glow-1');
  const glow2 = document.querySelector('.ambient-glow-2');

  if (window.innerWidth > 992 && glow1 && glow2) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      gsap.set(glow1, {
        x: (currentX - window.innerWidth / 2) * 0.15,
        y: (currentY - window.innerHeight / 2) * 0.15,
      });

      gsap.set(glow2, {
        x: -(currentX - window.innerWidth / 2) * 0.1,
        y: -(currentY - window.innerHeight / 2) * 0.1,
      });
    });
  }

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT
     ========================================================================== */
  const navbarInner = document.querySelector('.navbar-inner');
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbarInner) {
      if (window.scrollY > 50) {
        navbarInner.style.padding = '10px 24px';
        navbarInner.style.background = 'rgba(7, 10, 18, 0.94)';
        navbarInner.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.6)';
      } else {
        navbarInner.style.padding = '14px 24px';
        navbarInner.style.background = 'rgba(12, 17, 29, 0.82)';
        navbarInner.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
      }
    }

    // ScrollSpy for Nav Links
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     3. MOBILE DRAWER TOGGLE
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-links a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
      } else {
        mobileDrawer.classList.add('active');
        mobileToggle.innerHTML = '<i data-lucide="x"></i>';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    });
  }

  /* ==========================================================================
     4. HERO SECTION ENTRANCE TIMELINE
     ========================================================================== */
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .from('.badge-tag', {
      y: -20,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
    })
    .from(
      '.hero-title',
      {
        y: 40,
        opacity: 0,
        duration: 0.9,
      },
      '-=0.4'
    )
    .from(
      '.hero-description',
      {
        y: 25,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.6'
    )
    .from(
      '.hero-cta-group .btn',
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      },
      '-=0.5'
    )
    .from(
      '.hero-metrics-bar .metric-item',
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      '-=0.4'
    )
    .from(
      '.hero-avatar-frame',
      {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.4)',
      },
      '-=1.0'
    )
    .from(
      '.floating-chip',
      {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '-=0.6'
    );

  // Floating micro-animation for chips
  gsap.to('.chip-1', {
    y: '-=12',
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.chip-2', {
    y: '+=10',
    duration: 3.0,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5,
  });

  gsap.to('.chip-3', {
    y: '-=8',
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.0,
  });

  /* ==========================================================================
     5. SECTION HEADERS SCROLL REVEALS
     ========================================================================== */
  gsap.utils.toArray('.section-head').forEach((head) => {
    gsap.fromTo(
      head,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: head,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });

  /* ==========================================================================
     6. FLAGSHIP PROJECT SHOWCASE ANIMATION
     ========================================================================== */
  const flagshipCard = document.querySelector('.flagship-card');
  if (flagshipCard) {
    gsap.fromTo(
      flagshipCard,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: flagshipCard,
          start: 'top 92%',
          once: true,
        },
      }
    );
  }

  /* ==========================================================================
     7. SERVICES CARDS STAGGER REVEAL (SAFE FROMTO)
     ========================================================================== */
  const serviceCards = gsap.utils.toArray('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(
      serviceCards,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 92%',
          once: true,
        },
      }
    );
  }

  /* ==========================================================================
     8. PROJECT CARDS STAGGER REVEAL (SAFE FROMTO)
     ========================================================================== */
  const projectCards = gsap.utils.toArray('.project-item-card');
  if (projectCards.length > 0) {
    gsap.fromTo(
      projectCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 92%',
          once: true,
        },
      }
    );
  }

  /* ==========================================================================
     9. SKILLS PROGRESS BARS FILL ON SCROLL
     ========================================================================== */
  const skillCategories = gsap.utils.toArray('.skill-category-box');
  skillCategories.forEach((cat) => {
    const bars = cat.querySelectorAll('.skill-progress');
    ScrollTrigger.create({
      trigger: cat,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        bars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-target') || '85%';
          bar.style.width = targetWidth;
        });
      },
    });

    gsap.fromTo(
      cat,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: cat,
          start: 'top 92%',
          once: true,
        },
      }
    );
  });

  /* ==========================================================================
     10. TIMELINE ENTRIES SCROLL REVEAL
     ========================================================================== */
  const timelineEntries = gsap.utils.toArray('.timeline-entry-modern');
  timelineEntries.forEach((entry, i) => {
    gsap.fromTo(
      entry,
      { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: entry,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  /* ==========================================================================
     11. ANIMATED NUMERIC COUNTERS
     ========================================================================== */
  const counterElements = document.querySelectorAll('.counter-anim');
  counterElements.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-count') || '0');
    const suffix = counter.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val) + suffix;
          },
        });
      },
    });
  });

  /* ==========================================================================
     12. PROJECT FILTERING INTERACTION
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allProjects = document.querySelectorAll('.project-item-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      allProjects.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            display: 'flex',
            ease: 'power2.out',
          });
        } else {
          gsap.to(card, {
            scale: 0.85,
            opacity: 0,
            duration: 0.25,
            display: 'none',
            ease: 'power2.in',
          });
        }
      });
    });
  });

  /* ==========================================================================
     13. CONTACT FORM INTERACTION
     ========================================================================== */
  const contactForm = document.getElementById('modernContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Message Sent! Thank You</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

  /* ==========================================================================
     14. UNIVERSAL VISIBILITY SAFETY FALLBACK
     ========================================================================== */
  setTimeout(() => {
    ScrollTrigger.refresh();
    document.querySelectorAll('.service-card, .project-item-card, .flagship-card, .skill-category-box, .section-head').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
  }, 600);
});
