(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.querySelector('[data-inquiry-form]');
  const status = document.querySelector('[data-form-status]');

  if (form && status) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton?.textContent || 'Send an inquiry';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }

      status.textContent = 'Sending your inquiry securely…';
      status.className = 'form-status';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.reset();
          status.textContent = 'Thank you. Your inquiry was submitted successfully. Karen will review it and follow up when there appears to be a strong fit.';
          status.className = 'form-status is-success';
          status.focus();
          return;
        }

        let message = 'Your inquiry could not be submitted. Please review the form and try again.';
        try {
          const data = await response.json();
          if (Array.isArray(data.errors) && data.errors.length) {
            message = data.errors.map((error) => error.message).join(' ');
          }
        } catch {
          // Keep the general error message if Formspree does not return JSON.
        }

        status.textContent = message;
        status.className = 'form-status is-error';
        status.focus();
      } catch {
        status.textContent = 'A connection problem prevented submission. Please check your connection and try again.';
        status.className = 'form-status is-error';
        status.focus();
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
