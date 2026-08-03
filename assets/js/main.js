(() => {
  const ensureHeadLink = (rel, href, options = {}) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  };

  ensureHeadLink('icon', 'assets/images/favicon-16x16.png', { sizes: '16x16', type: 'image/png' });
  ensureHeadLink('apple-touch-icon', 'assets/images/apple-touch-icon.png', { sizes: '180x180' });
  ensureHeadLink('manifest', 'site.webmanifest');

  const headerBrand = document.querySelector('.site-header .brand');
  if (headerBrand && !headerBrand.querySelector('.header-wordmark')) {
    const wordmark = document.createElement('img');
    wordmark.src = 'assets/images/karen-blackwell-script-logo.webp';
    wordmark.alt = 'Karen M. Blackwell';
    wordmark.className = 'header-wordmark';
    wordmark.width = 320;
    wordmark.height = 52;
    wordmark.decoding = 'async';
    wordmark.style.width = 'clamp(220px, 28vw, 320px)';
    wordmark.style.height = '52px';
    wordmark.style.objectFit = 'cover';
    wordmark.style.objectPosition = 'center 46%';
    wordmark.style.display = 'block';
    headerBrand.replaceChildren(wordmark);
  }

  document.querySelectorAll('.footer-brand').forEach((brand) => {
    if (brand.querySelector('img')) return;
    const logo = document.createElement('img');
    logo.src = 'assets/images/karen-blackwell-script-logo.webp';
    logo.alt = 'Karen M. Blackwell';
    logo.width = 360;
    logo.height = 299;
    logo.loading = 'lazy';
    logo.decoding = 'async';
    logo.style.width = 'min(260px, 100%)';
    logo.style.height = 'auto';
    logo.style.marginBottom = '.5rem';
    brand.replaceChildren(logo);
  });

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
