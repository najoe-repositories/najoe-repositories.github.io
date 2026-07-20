# najoe-repositories.github.io

Personal / professional portfolio for **Jo (Najoe)** — Site Reliability Engineer, DevOps, security research, fullstack, and WordPress. Built with Jekyll on GitHub Pages.

**Live:** [https://najoe-repositories.github.io](https://najoe-repositories.github.io)

## Sections (single-page anchors)

- `#home` — Hero + portrait  
- `#about` — Profile & skills  
- `#portfolio` — Selected work (Najoe Solutions)  
- `#contact` — Hire / project form (mailto with details)

## Content sources

| Area | Source |
|------|--------|
| About / skills | `_data/profile.yml` (from [harimau99/myprofile](https://github.com/harimau99/myprofile)) |
| Portfolio cards | `_data/portfolio.yml` (Najoe Solutions / @najoesolutions.os) |
| Nav / footer | `_data/menus.yml` |
| Contact email | `_data/profile.yml` → `contact_email` |

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000`.

## Key files

- `index.md` — home page content (layout: `portfolio`)
- `_layouts/portfolio.html` — shell (nav, footer, CSS/JS)
- `assets/css/portfolio.scss` — cyberpunk theme
- `assets/js/portfolio.js` — scroll spy + contact form
- `images/jo-portrait.png` — hero portrait
