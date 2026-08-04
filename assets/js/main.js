(() => {
  const BRAND_VERSION = '20260803-2030';

  const ensureHeadLink = (rel, href, options = {}) => {
    const existing = [...document.head.querySelectorAll(`link[rel="${rel}"]`)]
      .find((link) => link.getAttribute('href') === href);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  };

  ensureHeadLink('stylesheet', `/assets/css/brand.css?v=${BRAND_VERSION}`);

  document.head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach((link) => link.remove());
  ensureHeadLink('icon', `/favicon.svg?v=${BRAND_VERSION}`, { sizes: 'any', type: 'image/svg+xml' });
  ensureHeadLink('icon', `/assets/images/favicon-16x16.png?v=${BRAND_VERSION}`, { sizes: '16x16', type: 'image/png' });
  ensureHeadLink('shortcut icon', `/favicon.svg?v=${BRAND_VERSION}`);
  ensureHeadLink('apple-touch-icon', `/assets/images/apple-touch-icon.png?v=${BRAND_VERSION}`, { sizes: '180x180' });
  ensureHeadLink('manifest', `/site.webmanifest?v=${BRAND_VERSION}`);

  if (window.location.pathname === '/index.html') {
    window.history.replaceState(null, '', `/${window.location.search}${window.location.hash}`);
  }

  document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a[href="/index.html"]').forEach((link) => {
    link.setAttribute('href', '/');
  });

  const phase2Blocks = {
    '/': {
      anchor: '.section.section-white',
      position: 'afterend',
      html: `<section class="section section-blush aeo-answer" id="what-karen-studies" aria-labelledby="what-karen-studies-heading">
        <div class="container grid-2">
          <div><p class="eyebrow">Research focus</p><h2 id="what-karen-studies-heading">What does Karen M. Blackwell study?</h2></div>
          <div><p class="lede">Karen M. Blackwell studies consumer behavior across the healthcare ecosystem, including how people experience and navigate healthcare professionals, organizations, systems, information, digital tools, and emerging technologies.</p><p><a href="research.html">Explore her healthcare consumer behavior research →</a></p></div>
        </div>
      </section>`
    },
    '/research.html': {
      anchor: '.page-hero',
      position: 'afterend',
      html: `<section class="section section-white aeo-answer" id="what-is-medical-dismissal" aria-labelledby="medical-dismissal-answer-heading">
        <div class="container grid-2">
          <div><p class="eyebrow">Research question</p><h2 id="medical-dismissal-answer-heading">What is medical dismissal?</h2></div>
          <div><p class="lede">Medical dismissal is a patient-perceived healthcare experience in which a person does not feel adequately heard, believed, understood, or taken seriously during an encounter.</p><p>Karen M. Blackwell’s doctoral research examines this experience from a consumer-behavior perspective while protecting unpublished theory, measurement development, study design, and future research plans.</p><p><a href="experience.html">See the healthcare experience informing this research →</a></p></div>
        </div>
      </section>`
    },
    '/teaching.html': {
      anchor: '.page-hero',
      position: 'afterend',
      html: `<section class="section section-white aeo-answer" id="teaching-approach" aria-labelledby="teaching-approach-heading">
        <div class="container">
          <div class="section-head"><div><p class="eyebrow">Teaching approach</p><h2 id="teaching-approach-heading">How does Karen M. Blackwell approach marketing education?</h2><p class="lede">Karen M. Blackwell’s teaching combines applied learning, inclusive and transparent course design, ethical AI integration, current research, and real-world marketing decision-making.</p></div></div>
          <div class="metric-row" aria-label="Teaching at a glance"><span class="metric-chip">Applied and experiential learning</span><span class="metric-chip">Inclusive course design</span><span class="metric-chip">Ethical AI integration</span><span class="metric-chip">Research literacy</span><span class="metric-chip">Professional skill development</span></div>
          <p><a href="recognition.html">View teaching recognition and evidence →</a></p>
        </div>
      </section>`
    },
    '/experience.html': {
      anchor: '.page-hero',
      position: 'afterend',
      html: `<section class="section section-white aeo-answer" id="professional-experience-summary" aria-labelledby="professional-experience-heading">
        <div class="container">
          <div class="section-head"><div><p class="eyebrow">Experience at a glance</p><h2 id="professional-experience-heading">What professional experience informs Karen M. Blackwell’s work?</h2><p class="lede">Karen M. Blackwell brings more than a decade of healthcare marketing, market-access, strategic-program, and innovation leadership, alongside university teaching, entrepreneurship, and research-informed consulting.</p></div></div>
          <div class="grid-3">
            <div class="card"><h3>Healthcare marketing and strategy</h3></div>
            <div class="card"><h3>Market access and payer relationships</h3></div>
            <div class="card"><h3>Value-based care</h3></div>
            <div class="card"><h3>Digital health and AI-enabled healthcare</h3></div>
            <div class="card"><h3><a href="teaching.html">University marketing education</a></h3></div>
            <div class="card"><h3>Entrepreneurship and strategic consulting</h3></div>
          </div>
          <p><a href="research.html">Explore how this experience informs her research →</a></p>
        </div>
      </section>`
    },
    '/recognition.html': {
      anchor: '.page-hero',
      position: 'afterend',
      html: `<section class="section section-white aeo-answer" id="recognition-summary" aria-labelledby="recognition-summary-heading">
        <div class="container grid-2">
          <div><p class="eyebrow">Recognition summary</p><h2 id="recognition-summary-heading">What recognition has Karen M. Blackwell received?</h2></div>
          <div><p class="lede">Karen M. Blackwell’s research, teaching, and doctoral development have been recognized through the American Marketing Association Foundation Valuing Diversity PhD Scholarship, the California State University Chancellor’s Doctoral Incentive Program, Quality Matters course review, and university teaching recognition.</p><div class="aeo-cta-stack"><a class="button button-primary" href="research.html">Explore the research</a><a class="button button-secondary" href="teaching.html">See her teaching approach</a></div></div>
        </div>
      </section>`
    },
    '/collaborate.html': {
      anchor: '.page-hero',
      position: 'afterend',
      html: `<section class="section section-white aeo-answer" id="collaboration-types" aria-labelledby="collaboration-types-heading">
        <div class="container grid-2">
          <div><p class="eyebrow">Collaboration fit</p><h2 id="collaboration-types-heading">What types of collaboration is Karen M. Blackwell considering?</h2></div>
          <div><p class="lede">Karen M. Blackwell welcomes defined opportunities involving research, grants, appropriate datasets or participant populations, healthcare settings, complementary methodological expertise, scholarly presentations, faculty opportunities, and selected professional-practice engagements.</p><p><a href="research.html">Review the research platform →</a> &nbsp; <a href="experience.html">Review relevant experience →</a></p></div>
        </div>
      </section>`
    }
  };

  const normalizedPath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
  const phase2 = phase2Blocks[normalizedPath];
  if (phase2 && !document.querySelector('.aeo-answer')) {
    const anchor = document.querySelector(phase2.anchor);
    if (anchor) anchor.insertAdjacentHTML(phase2.position, phase2.html);
  }

  const headerBrand = document.querySelector('.site-header .brand');
  if (headerBrand) {
    headerBrand.className = 'brand brand-compact';
    headerBrand.removeAttribute('style');
    headerBrand.setAttribute('href', '/');

    const mark = document.createElement('img');
    mark.src = `/assets/images/kmb-circle.svg?v=${BRAND_VERSION}`;
    mark.alt = '';
    mark.className = 'brand-logo';
    mark.width = 42;
    mark.height = 42;
    mark.decoding = 'async';
    mark.setAttribute('aria-hidden', 'true');
    mark.addEventListener('error', () => mark.remove(), { once: true });

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
