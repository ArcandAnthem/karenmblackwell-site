(() => {
  const BRAND_VERSION = '20260803-1830';

  const ensureHeadLink = (rel, href, options = {}) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  };

  ensureHeadLink('stylesheet', `/assets/css/brand.css?v=${BRAND_VERSION}`);

  document.head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach((link) => link.remove());
  ensureHeadLink('icon', `/favicon-k.svg?v=${BRAND_VERSION}`, { sizes: 'any', type: 'image/svg+xml' });
  ensureHeadLink('shortcut icon', `/favicon-k.svg?v=${BRAND_VERSION}`);
  ensureHeadLink('apple-touch-icon', `/assets/images/apple-touch-icon.svg?v=${BRAND_VERSION}`, { sizes: 'any' });
  ensureHeadLink('manifest', '/site.webmanifest');

  const headerBrand = document.querySelector('.site-header .brand');
  if (headerBrand) {
    headerBrand.className = 'brand brand-compact';
    headerBrand.removeAttribute('style');

    const mark = document.createElement('img');
    mark.src = `/assets/images/kmb-circle.svg?v=${BRAND_VERSION}`;
    mark.alt = '';
    mark.className = 'brand-logo';
    mark.width = 42;
    mark.height = 42;
    mark.decoding = 'async';
    mark.setAttribute('aria-hidden', 'true');

    const name = document.createElement('span');
    name.className = 'brand-name';
    name.textContent = 'Karen M. Blackwell';

    headerBrand.replaceChildren(mark, name);
  }

  const socialIcons = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7.2 10v7M7.2 7.1v.1M11 17v-7m0 3.1c.7-2.1 5.8-2.3 5.8 1.7V17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r=".8" fill="currentColor" stroke="none"/></svg>'
  };

  document.querySelectorAll('.footer-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const type = href.includes('linkedin.com') ? 'linkedin' : href.includes('instagram.com') ? 'instagram' : null;
    if (!type || link.querySelector('.social-link-icon')) return;

    const icon = document.createElement('span');
    icon.className = 'social-link-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = socialIcons[type];
    link.classList.add('social-link');
    link.prepend(icon);
  });

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
