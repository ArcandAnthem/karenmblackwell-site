#!/usr/bin/env python3
from pathlib import Path
import re
import shutil
import sys

ROOT = Path.cwd()
HTML_FILES = [
    'index.html', 'research.html', 'teaching.html', 'experience.html',
    'recognition.html', 'collaborate.html', '404.html'
]
SOCIAL_IMAGE_URL = 'https://karenmblackwell.com/assets/images/karen-blackwell-social-card.png'


def require(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f'Required file not found: {path}')
    return path.read_text(encoding='utf-8')


def backup(path: Path) -> None:
    backup_path = path.with_suffix(path.suffix + '.bak')
    if not backup_path.exists():
        shutil.copy2(path, backup_path)


def write(path: Path, content: str) -> None:
    backup(path)
    path.write_text(content, encoding='utf-8')


def add_og_site_name(html: str) -> str:
    if 'property="og:site_name"' in html:
        return html
    marker = '<meta property="og:type" content="website">'
    return html.replace(marker, marker + '\n  <meta property="og:site_name" content="Karen M. Blackwell">', 1)


def update_social_image(html: str) -> str:
    return re.sub(r'<meta property="og:image" content="[^"]+">',
                  f'<meta property="og:image" content="{SOCIAL_IMAGE_URL}">',
                  html, count=1)


def update_all_html_metadata() -> None:
    for filename in HTML_FILES:
        path = ROOT / filename
        html = add_og_site_name(update_social_image(require(path)))
        write(path, html)


def update_homepage() -> None:
    path = ROOT / 'index.html'
    html = require(path)
    html = html.replace('<title>Home | Karen M. Blackwell</title>',
                        '<title>Karen M. Blackwell | Marketing Researcher &amp; Educator</title>', 1)
    html = html.replace('<meta property="og:title" content="Home | Karen M. Blackwell">',
                        '<meta property="og:title" content="Karen M. Blackwell | Marketing Researcher &amp; Educator">', 1)
    if '"@type":"WebSite"' not in html:
        schema = '''  <script type="application/ld+json">{
    "@context":"https://schema.org",
    "@type":"WebSite",
    "name":"Karen M. Blackwell",
    "alternateName":"KarenMBlackwell.com",
    "url":"https://karenmblackwell.com/"
  }</script>
'''
        html = html.replace('</head>', schema + '</head>', 1)
    write(path, html)


def update_collaboration_form() -> None:
    path = ROOT / 'collaborate.html'
    html = require(path)
    old = '<form class="inquiry-form" action="https://formspree.io/f/mbdnwdzo" method="post" data-inquiry-form novalidate>'
    new = '<form class="inquiry-form" action="https://formspree.io/f/mbdnwdzo" method="post" data-inquiry-form>'
    html = html.replace(old, new, 1)
    if 'class="form-instructions"' not in html:
        html = html.replace(new, new + '\n    <p class="form-instructions">All fields are required unless marked optional.</p>', 1)
    html = html.replace('<label for="organization">Organization</label>',
                        '<label for="organization">Organization <span class="optional">(optional)</span></label>', 1)
    write(path, html)


def update_recognition_heading() -> None:
    path = ROOT / 'recognition.html'
    html = require(path)
    if 'id="recognition-timeline-heading"' not in html:
        marker = '  <article>\n    <div class="timeline">'
        replacement = ('  <article aria-labelledby="recognition-timeline-heading">\n'
                       '    <h2 id="recognition-timeline-heading">Recognition timeline</h2>\n'
                       '    <div class="timeline">')
        html = html.replace(marker, replacement, 1)
    write(path, html)


def update_404() -> None:
    path = ROOT / '404.html'
    html = require(path)
    if 'name="robots" content="noindex"' not in html:
        marker = '<meta name="description" content="The requested page could not be found.">'
        html = html.replace(marker, marker + '\n  <meta name="robots" content="noindex">', 1)
    write(path, html)


def update_javascript() -> None:
    path = ROOT / 'assets' / 'js' / 'main.js'
    require(path)
    content = r'''(() => {
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
'''
    write(path, content)


def consolidate_responsive_css() -> None:
    path = ROOT / 'assets' / 'css' / 'styles.css'
    css = require(path)
    start = css.find('@media (max-width: 960px)')
    if start == -1:
        raise RuntimeError('Could not locate the responsive CSS section.')
    base = css[:start].rstrip()
    responsive = r'''

.form-instructions {
  margin: 0 0 1rem;
  color: var(--muted) !important;
  font-size: .9rem;
}

.optional {
  color: var(--muted);
  font-weight: 500;
}

.inquiry-form button:disabled {
  cursor: wait;
  opacity: .7;
  transform: none;
}

@media (min-width: 1025px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr) clamp(230px, 21vw, 292px); }
  .portrait-frame { width: 100%; max-width: 292px; margin-left: -3.5rem; }
  .portrait-card img { aspect-ratio: .86; object-position: center 20%; }
}

@media (max-width: 1024px) {
  .hero { min-height: auto; padding: 3.7rem 0 3.5rem; }
  .hero-grid { grid-template-columns: 1fr; gap: 2rem; }
  .hero-copy { padding-right: 0; }
  .hero-name { max-width: none; margin-right: 0; padding-right: 0; white-space: normal; }
  .portrait-frame {
    position: static; display: block; grid-column: 1; justify-self: center;
    align-self: auto; width: clamp(210px, 30vw, 275px); max-width: 275px;
    margin: .25rem auto 0;
  }
  .portrait-card { padding: .45rem; border-radius: 24px; box-shadow: 0 14px 32px rgba(62,25,39,.10); }
  .portrait-card img {
    display: block; width: 100%; aspect-ratio: .92; object-fit: cover;
    object-position: center 18%; border-radius: 18px;
  }
  .portrait-ring { display: block; width: 70px; height: 70px; inset: -12px -12px auto auto; }
}

@media (max-width: 960px) {
  .nav-toggle { display: block; }
  .site-nav {
    position: absolute; left: 1rem; right: 1rem; top: 68px; display: none;
    flex-direction: column; align-items: stretch; padding: .85rem;
    background: var(--ivory); border: 1px solid var(--line); border-radius: 16px;
    box-shadow: var(--shadow);
  }
  .site-nav.open { display: flex; }
  .site-nav a { text-align: center; }
  .flagship, .content-grid, .contact-panel { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sidebar { position: static; order: -1; }
  .experience-band { grid-template-columns: 1fr; gap: 1rem; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-grid > :first-child { grid-column: 1 / -1; }
}

@media (max-width: 760px) {
  .hero-copy { text-align: center; }
  .hero-copy .lede { margin-inline: auto; }
  .hero-actions, .hero-meta { justify-content: center; }
  .portrait-frame { width: clamp(185px, 46vw, 225px); max-width: 225px; margin-top: .4rem; }
  .portrait-card { border-radius: 22px; }
  .portrait-card img { aspect-ratio: .94; border-radius: 16px; }
  .portrait-ring { width: 60px; height: 60px; inset: -10px -10px auto auto; }
}

@media (max-width: 680px) {
  .container { width: min(calc(100% - 1.25rem), var(--max)); }
  .brand-name { font-size: .95rem; }
  .hero { padding-top: 3.2rem; }
  h1 { font-size: clamp(2.75rem, 14vw, 4rem); }
  .hero-grid { gap: 1.65rem; }
  .section { padding: 4.5rem 0; }
  .section-head { display: block; }
  .grid-2, .grid-3, .grid-4, .collab-grid { grid-template-columns: 1fr; }
  .page-hero { padding: 4rem 0 3rem; }
  .footer-grid { grid-template-columns: 1fr; }
  .footer-grid > :first-child { grid-column: auto; }
  .button { width: 100%; }
  .hero-actions { flex-direction: column; }
  .contact-panel { padding: 1.6rem; }
  .form-grid { grid-template-columns: 1fr; }
  .form-field-full { grid-column: auto; }
  .research-summary-panel { min-height: auto; padding: 1.5rem; }
}

@media (max-width: 480px) {
  .portrait-frame { width: clamp(160px, 52vw, 190px); max-width: 190px; margin-top: .2rem; }
  .portrait-card { padding: .38rem; border-radius: 20px; }
  .portrait-card img { aspect-ratio: .96; object-position: center 18%; border-radius: 15px; }
  .portrait-ring { display: none; }
}

@media (prefers-reduced-motion: no-preference) {
  .button, .card { transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
  .card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(45,28,34,.08); }
}
'''
    write(path, base + responsive)


def install_social_image() -> None:
    source = Path(__file__).resolve().parent / 'assets' / 'images' / 'karen-blackwell-social-card.png'
    destination = ROOT / 'assets' / 'images' / 'karen-blackwell-social-card.png'
    if not source.exists():
        raise FileNotFoundError(f'Social image not found in package: {source}')
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        backup(destination)
    shutil.copy2(source, destination)


def main() -> None:
    try:
        update_all_html_metadata()
        update_homepage()
        update_collaboration_form()
        update_recognition_heading()
        update_404()
        update_javascript()
        consolidate_responsive_css()
        install_social_image()
    except Exception as exc:
        print(f'Update stopped: {exc}', file=sys.stderr)
        sys.exit(1)
    print('Final website refinements 1–8 were applied successfully.')
    print('Review the changes, test the collaboration form, and commit the updated files.')


if __name__ == '__main__':
    main()
