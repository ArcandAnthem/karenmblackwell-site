(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const form = document.querySelector('[data-inquiry-form]');
  const status = document.querySelector('[data-form-status]');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      if (form.action.includes('REPLACE_WITH_FORM_ID')) {
        event.preventDefault();
        status.textContent = 'This inquiry form is ready for review and will be activated before the website is published.';
        status.className = 'form-status is-error';
        return;
      }
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
