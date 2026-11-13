(() => {
  // Premium responsive navigation.
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-navigation]');
  const header = document.querySelector('[data-header]');

  if (toggle && nav) {
    const navLinks = [...nav.querySelectorAll('a[href]')];
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const setMenu = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');

      nav.classList.toggle('is-open', open);
      nav.setAttribute('aria-hidden', String(!open && isMobile()));

      document.body.classList.toggle('menu-open', open);

      if (header) {
        header.classList.toggle('menu-active', open);
      }

      if (open) {
        window.requestAnimationFrame(() => navLinks[0]?.focus({ preventScroll: true }));
      } else if (restoreFocus) {
        toggle.focus({ preventScroll: true });
      }
    };

    // Set the correct initial accessibility state.
    nav.setAttribute('aria-hidden', String(isMobile()));

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    // Clicking the empty overlay background closes the menu.
    nav.addEventListener('click', (event) => {
      if (event.target === nav) setMenu(false, true);
    });

    document.addEventListener('keydown', (event) => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      if (!open) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false, true);
        return;
      }

      // Keep keyboard focus inside the open menu.
      if (event.key === 'Tab') {
        const focusable = [toggle, ...navLinks];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('resize', () => {
      if (!isMobile() && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
      }

      if (!isMobile()) {
        nav.setAttribute('aria-hidden', 'false');
      }
    }, { passive: true });
  }

  // Client-side project filters.
  const filters = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-project-card]');
  const emptyState = document.querySelector('[data-empty-state]');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filters.forEach((control) => {
        const active = control === button;
        control.classList.toggle('active', active);
        control.setAttribute('aria-pressed', String(active));
      });

      projectCards.forEach((card) => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  });

  // The demo form prepares an email in the visitor's local mail application.
  const enquiryForm = document.querySelector('[data-enquiry-form]');
  const formNote = document.querySelector('[data-form-note]');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!enquiryForm.reportValidity()) return;

      const values = new FormData(enquiryForm);
      const subject = `Project enquiry — ${String(values.get('project') || 'New project')}`;

      const body = [
        `Name: ${values.get('name')}`,
        `Email: ${values.get('email')}`,
        `Project type: ${values.get('project')}`,
        '',
        'Project notes:',
        values.get('message')
      ].join('\n');

      const mailto = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formNote) {
        formNote.textContent = 'Opening your email application. The recipient address is a placeholder for this demo.';
      }

      window.location.href = mailto;
    });
  }
  // STHIRA V2 — REFINED SCROLL REVEALS
  // Small, one-time reveals that work independently of the hero sequence.
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (revealTargets.length) {
    if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      });

      revealTargets.forEach((element) => {
        element.classList.add('reveal-pending');
        revealObserver.observe(element);
      });

      window.addEventListener('pagehide', () => revealObserver.disconnect(), { once: true });
    }
  }
})();