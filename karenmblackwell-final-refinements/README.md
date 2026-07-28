# KarenMBlackwell.com — Final Refinements 1–8

This package applies the approved final website refinements:

1. Replaces the generic homepage title.
2. Improves required/optional form communication.
3. Keeps visitors on the website after Formspree submission and displays an accessible success or error message.
4. Adds `WebSite` structured data and `og:site_name`.
5. Adds a dedicated 1200 × 630 social-sharing card and points page Open Graph metadata to it.
6. Adds `noindex` to the custom 404 page.
7. Adds a proper `h2` heading to the Recognition timeline.
8. Consolidates the overlapping responsive portrait CSS into one maintainable responsive section.

## Install

1. Download and unzip this package.
2. Copy the unzipped folder into your local `karenmblackwell-site` repository folder.
3. Open Terminal in the repository folder.
4. Run:

```bash
python3 karenmblackwell-final-refinements/apply_final_refinements.py
```

The script creates `.bak` backups of changed text files.

## Test before committing

- Open the homepage and confirm the portrait behavior at desktop, tablet, and phone widths.
- Submit one collaboration-form test.
- Confirm the success message appears on the same page.
- Confirm `404.html` contains `<meta name="robots" content="noindex">`.
- After deployment, refresh the homepage preview in LinkedIn Post Inspector.

## Commit

```bash
git add index.html research.html teaching.html experience.html recognition.html collaborate.html 404.html assets/css/styles.css assets/js/main.js assets/images/karen-blackwell-social-card.png
git commit -m "Apply final website audit refinements"
git push
```
