(() => {
  const BRAND_VERSION = '20260803-2013';
  const SITE_URL = 'https://karenmblackwell.com';
  const SOCIAL_IMAGE = `${SITE_URL}/assets/images/karen-blackwell-social-card.jpg`;

  const pagePath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
  const pageConfig = {
    '/': {
      title: 'Karen M. Blackwell | Healthcare Consumer Behavior Researcher',
      description: 'Karen M. Blackwell is a marketing researcher, educator, and former healthcare executive studying consumer behavior across healthcare experiences, systems, information, and technologies.',
      name: 'Home',
      type: 'ProfilePage',
      about: ['Healthcare consumer behavior', 'Patient experience', 'Healthcare systems', 'Digital health', 'AI-enabled health information']
    },
    '/research.html': {
      title: 'Healthcare Consumer Behavior & Medical Dismissal Research | Karen M. Blackwell',
      description: 'Explore Karen M. Blackwell’s research on consumer behavior across healthcare experiences, systems, information, and technologies, including her flagship work on medical dismissal.',
      name: 'Research',
      type: 'WebPage',
      about: ['Healthcare consumer behavior', 'Medical dismissal', 'Patient experience', 'Healthcare information', 'Public policy']
    },
    '/teaching.html': {
      title: 'Marketing Educator & Inclusive Teaching Practice | Karen M. Blackwell',
      description: 'Explore Karen M. Blackwell’s marketing teaching, inclusive course design, applied learning, ethical AI integration, student mentoring, and curriculum-development experience.',
      name: 'Teaching',
      type: 'WebPage',
      about: ['Marketing education', 'Inclusive course design', 'Applied learning', 'Ethical artificial intelligence', 'Curriculum development']
    },
    '/experience.html': {
      title: 'Healthcare Marketing Executive & Academic Experience | Karen M. Blackwell',
      description: 'Explore Karen M. Blackwell’s experience in healthcare marketing, market access, digital health, strategic growth, university teaching, research-informed consulting, and entrepreneurship.',
      name: 'Experience',
      type: 'WebPage',
      about: ['Healthcare marketing', 'Market access', 'Digital health', 'University teaching', 'Entrepreneurship']
    },
    '/recognition.html': {
      title: 'Awards, Fellowships & Academic Recognition | Karen M. Blackwell',
      description: 'View Karen M. Blackwell’s academic awards, doctoral fellowships, teaching recognition, research milestones, invited participation, and professional achievements.',
      name: 'Recognition',
      type: 'CollectionPage',
      about: ['Academic awards', 'Doctoral fellowships', 'Teaching recognition', 'Research milestones']
    },
    '/collaborate.html': {
      title: 'Research, Grant & Healthcare Collaboration | Karen M. Blackwell',
      description: 'Discuss research, grant, data, healthcare-setting, presentation, faculty, or selected professional-practice collaboration with Karen M. Blackwell.',
      name: 'Collaborate',
      type: 'ContactPage',
      about: ['Research collaboration', 'Grant collaboration', 'Healthcare research settings', 'Academic presentations']
    }
  };

  const config = pageConfig[pagePath];

  const ensureHeadLink = (rel, href, options = {}) => {
    const links = [...document.head.querySelectorAll(`link[rel="${rel}"]`)];
    const existing = links.find((link) => link.getAttribute('href') === href);
    if (existing) return existing;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
    return link;
  };

  const setMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };

  const setCanonical = (href) => {
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
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

  if (config) {
    const canonicalUrl = `${SITE_URL}${pagePath}`;
    document.title = config.title;
    setCanonical(canonicalUrl);
    setMeta('meta[name="description"]', { name: 'description', content: config.description });
    setMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#7b0f3d' });

    setMeta('meta[property="og:title"]', { property: 'og:title', content: config.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: config.description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Karen M. Blackwell' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: SOCIAL_IMAGE });
    setMeta('meta[property="og:image:secure_url"]', { property: 'og:image:secure_url', content: SOCIAL_IMAGE });
    setMeta('meta[property="og:image:type"]', { property: 'og:image:type', content: 'image/jpeg' });
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Karen M. Blackwell, marketing researcher and educator studying consumer behavior across the healthcare ecosystem' });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: config.title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: config.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: SOCIAL_IMAGE });
    setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: 'Karen M. Blackwell, marketing researcher and educator studying consumer behavior across the healthcare ecosystem' });

    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((script) => script.remove());

    const personId = `${SITE_URL}/#person`;
    const websiteId = `${SITE_URL}/#website`;
    const webpageId = `${canonicalUrl}#webpage`;
    const graph = [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Karen M. Blackwell',
        url: SITE_URL,
        image: `${SITE_URL}/assets/images/karen-blackwell-headshot.webp`,
        jobTitle: 'Marketing Researcher and Educator',
        description: 'Marketing researcher, educator, and former healthcare executive studying consumer behavior across healthcare experiences, systems, information, and technologies.',
        affiliation: [
          { '@type': 'CollegeOrUniversity', name: 'Virginia Tech — Pamplin College of Business' },
          { '@type': 'CollegeOrUniversity', name: 'California State University, Los Angeles' },
          { '@type': 'CollegeOrUniversity', name: 'California State University, Northridge' },
          { '@type': 'CollegeOrUniversity', name: 'San Diego State University' }
        ],
        sameAs: [
          'https://www.linkedin.com/in/karenmblackwell/',
          'https://www.instagram.com/karenmichelleblackwell/'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'Karen M. Blackwell',
        alternateName: 'KarenMBlackwell.com',
        url: `${SITE_URL}/`,
        publisher: { '@id': personId },
        inLanguage: 'en-US'
      },
      {
        '@type': config.type,
        '@id': webpageId,
        url: canonicalUrl,
        name: config.title,
        description: config.description,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        about: config.about.map((name) => ({ '@type': 'Thing', name })),
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630
        },
        inLanguage: 'en-US'
      }
    ];

    if (pagePath !== '/') {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.name,
            item: canonicalUrl
          }
        ]
      });
    }

    const structuredData = document.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(structuredData);
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
