(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-navigation]');
  if (!toggle || !nav) return;

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setMenu(false);
  });

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
      if (formNote) formNote.textContent = 'Opening your email application. The recipient address is a placeholder for this demo.';
      window.location.href = mailto;
    });
  }
})();
