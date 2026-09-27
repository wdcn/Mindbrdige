# mindbridge.ngo

Static website for MindBridge NGO: mental wellness for immigrant and international youth.
Plain HTML, CSS and a little JavaScript. No build step.

## Structure

```
mindbridge/
├── index.html               Home: hero, Our story, AI service, Support our mission, Our growing impact
├── our-mission/index.html   Mission statement
├── contact/index.html       Phone, email, mailing address
├── support-us/index.html    Join our team, Have space to share?, Support MindBridge, Donate online (#donate)
├── experiences/index.html   Empty state until events exist
├── get-help/index.html      Crisis resources (linked from the top bar and footer, not the main nav)
├── 404.html
├── about/ programs/ get-involved/ donate/   Redirects from the first draft; safe to delete
├── assets/
│   ├── css/main.css         Design tokens at the top
│   ├── css/fonts.css        Self-hosted Inter @font-face rules
│   ├── fonts/               Inter woff2 files + license
│   ├── js/main.js           Mobile nav, footer year, constellations, donate form
│   └── img/                 Logo, favicon, photos (see img/README.md)
├── DESIGN.md                Visual design spec
├── CNAME                    mindbridge.ngo (GitHub Pages custom domain)
├── .nojekyll                Serve files as-is on GitHub Pages
├── robots.txt
└── sitemap.xml
```

Page order, headlines and module sequence mirror the original Wix site
(kunqiwang.wixsite.com/mysite-1).

Each folder uses `index.html` so URLs are clean (`/about/`).
Links are root-relative (`/assets/...`), so preview with a local server, not by double-clicking.

## Preview locally

```bash
cd ~/Documents/GitHub/mindbridge
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to a GitHub repo (e.g. `mindbridge`).
2. Settings → Pages → Deploy from branch → `main` / root.
3. Custom domain: `mindbridge.ngo` (already in `CNAME`). Tick "Enforce HTTPS" once the certificate is issued.
4. At your domain registrar, point DNS at GitHub Pages:
   - Apex `mindbridge.ngo`: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `www`: CNAME to `<your-github-username>.github.io`
   Check GitHub's docs for the current IPs before changing DNS.
5. Keep your existing email (MX) records untouched so info@mindbridge.ngo keeps working.

## Design

The visual system follows `DESIGN.md` (dark "void" style): pure black canvas, white type,
one violet (#8052ff) filled button per view, amber (#ffb829) labels and links, headlines at
weight 400 with -0.04em tracking, body at weight 200. No cards, borders or shadows.

- Font: Inter, self-hosted in `assets/fonts/` (OFL license included) as the stand-in for
  PP Neue Montreal. If you license PP Neue Montreal, add its @font-face rules to
  `assets/css/fonts.css` and put its name first in `--font-ppneuemontreal` in `main.css`.
  Chinese, Korean and Arabic text fall back to system fonts.
- Constellations: `<div class="constellation" data-shape="mind|bridge|voices">` draws the
  animated triangle-particle visual (in `main.js`). Optional `data-scale`, `data-density`,
  `data-assemble="true"` (particles fly in on load; used in the home hero only).
  Animation pauses offscreen and is static for visitors who prefer reduced motion.
  Section visuals are hidden on phones; only the hero one shows.
- The crisis line at the top of every page is deliberate and stays, even though the
  design spec has no equivalent.
- On /get-help/, "Call 988" is the one violet button; the header Donate becomes a text link.
- Rotating multilingual phrase styles remain in main.css but are unused.

## Editing

Header, crisis bar and footer are repeated in every page. If you change one, change them all
(search the repo for the text). Colors and fonts live in the `:root` block of `main.css`.

## Before launch — open TODOs

Search the repo for `TODO`:

- [ ] Verify the impact figures on the home page (500+ youth, 12 languages, 5 organizations)
- [ ] Verify every crisis line number on /get-help/
- [ ] Donation processor: set `data-processor-url` on the form in /support-us/ (button emails info@ until then)
- [ ] 501(c)(3) status / EIN in footer and donate page
- [ ] AI service: "Converse now" needs the tool's real URL; review the "AI therapeutic service" / "AI Therapy" wording before launch
- [ ] Decide whether to add the justice-involved youth program (note on /our-mission/)
- [ ] og-image.jpg for social sharing
