# Sudeep Reddy — Portfolio

Multi-page portfolio for Sudeep Reddy (SRE / DevOps / Cloud Platform), built as a
dependency-free static site: hand-written HTML, one stylesheet, and one script.
No build step, no framework, no bundler.

## Pages

| File | Route | Contents |
| --- | --- | --- |
| `index.html` | `/` | Hero, reliability console, impact metrics, section links |
| `about.html` | `/about` | Approach, four engineering principles, core strengths |
| `projects.html` | `/projects` | Six projects with discipline filters |
| `experience.html` | `/experience` | Scroll-linked timeline, skill groups, education |
| `contact.html` | `/contact` | Client-side compose form, contact details, security note |

## Features

**Motion** — staggered scroll reveals, word-by-word headline reveals, pointer-tracked
3D card tilt with a cursor-following glow, magnetic buttons, animated counters, radial
SLO gauges, a live canvas sparkline, an infinite tech marquee, and a scroll-linked
timeline rail. Cross-document view transitions are enabled where supported.

**Interface** — a `⌘K` / `Ctrl+K` command palette with fuzzy search over every page and
action, a persisted light/dark theme, a sliding nav pill indicator, a section rail with
hover labels, copy-to-clipboard with toasts, scroll progress, and back-to-top.

**Accessibility** — skip link, visible focus rings, `aria-current` on the active page,
live regions for filter results and toasts, and a full `prefers-reduced-motion` path
that disables animation and reveals all content immediately. Every page also reads and
navigates correctly with JavaScript disabled.

## Files

```
index.html about.html projects.html experience.html contact.html
styles.css          design tokens, components, responsive rules
theme.js            synchronous theme bootstrap (prevents a flash of the wrong theme)
main.js             all interaction modules
assets/             optimised portrait, banner, favicon
vercel.json         security headers, cleanUrls, cache policy
.devserver.py       local preview that replays the production headers
```

## Local preview

```bash
# Plain static serve
python3 -m http.server 4321 --bind 127.0.0.1

# Or serve with the production CSP and clean URLs, so header-related
# breakage shows up locally instead of after deploying
python3 .devserver.py     # http://127.0.0.1:4322
```

## Constraints worth knowing before editing

The site ships a strict Content Security Policy (see `vercel.json`) with no
`'unsafe-inline'`. That means:

- **No `style` attributes and no `<style>` blocks in the HTML.** Dynamic styling goes
  through CSS custom properties written with `element.style.setProperty(...)`, which is
  a CSSOM write and is not covered by `style-src`.
- **No inline `<script>`.** `theme.js` exists as a separate synchronous file purely so
  the stored theme can be applied before the first paint.
- Images are limited to `'self'` and `data:` URIs.

Large source images (`Concept-Banner.png` and friends) stay in the repo but are listed
in `.vercelignore`; the site serves the optimised copies in `assets/` instead.

## Deployment

Deploy the folder to Vercel. `cleanUrls` is on, so link to `/about` rather than
`/about.html`. To use a custom domain:

1. Add the domain in the Vercel project settings.
2. Point the DNS records at Vercel from your registrar.
3. Update the absolute URLs in the `og:*`, `canonical`, `sitemap.xml`, and `robots.txt`
   entries, which currently reference `https://sudeepreddy.vercel.app`.

## Notes

- Public résumé contact details are intentionally visible. Never commit private keys,
  API tokens, `.env` files, or cloud credentials.
- The contact form has no backend: it composes a `mailto:` link in the visitor's own
  mail client, so nothing is transmitted or stored.
- The hero's reliability console is labelled as illustrative — the values are generated
  in the browser to show the shape of the dashboards, not real production telemetry.
