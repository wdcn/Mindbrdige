# mindbridge.ngo — Site Specification

Last updated: 2026-09-26
Status: pre-launch. Two builds live in this repo; **version 2 is the current direction.**

---

## 1. Purpose

MindBridge NGO supports immigrant and international youth with mental health resources in
their own language and culture. Tagline: **"No translation needed."**

The site has three jobs, in priority order:

1. **Help someone in crisis find help immediately** (988, crisis lines, 911).
2. **Explain who MindBridge is** — story and mission — in plain, warm language.
3. **Invite support** — donate, volunteer, share a space, get in touch.

### Audiences
- Immigrant and international youth, and their families (often reading in a second language).
- Schools, universities and community partners.
- Donors, volunteers and funders (including grant reviewers who will check claims).

---

## 2. Repository layout

```
Mindbridge/
├── SPEC.md                 This file
├── DESIGN.md               Visual spec used for version 1 (dark "void" style)
├── README.md               Version 1: run, deploy, TODOs
├── index.html …            VERSION 1 — static HTML/CSS/JS (repo root)
│   ├── our-mission/  contact/  support-us/  experiences/  get-help/  404.html
│   ├── about/ programs/ get-involved/ donate/   Redirects from the first draft (safe to delete)
│   ├── assets/css  assets/js  assets/fonts  assets/img
│   └── CNAME  robots.txt  sitemap.xml  .nojekyll
└── v2/                     VERSION 2 — React + Vite + Tailwind + TypeScript single page
    ├── README.md
    ├── index.html  package.json  vite.config.ts  tsconfig.json
    ├── public/favicon.svg
    └── src/
        ├── content.ts                 ALL copy, contact details, links, video URL
        ├── App.tsx                    Page order
        ├── components/
        │   ├── BackgroundVideo.tsx    Hero video with fade-in/out manual loop
        │   ├── Constellation.tsx      Triangle-particle brain / bridge animation
        │   ├── DonateForm.tsx         Frequency + amount picker
        │   ├── Nav.tsx  Hero.tsx  ui.tsx
        ├── sections/Sections.tsx      All content sections + footer
        └── styles/fonts.css  theme.css
```

---

## 3. Version 2 (current)

### 3.1 Page structure (single page, top to bottom)

| # | Section | Anchor | Content | Visual |
|---|---------|--------|---------|--------|
| 0 | Crisis line | — | "In crisis? Call or text 988 any time. In an emergency, call 911. More help" | Small grey text above nav, every load |
| 1 | Nav | — | Logo "MindBridge"; Home, Our Mission, Contact, Support Us; **Donate today** pill | Mobile: "Menu" toggle with frosted panel |
| 2 | Hero | `#top` | H1 "Mental wellness for *youth,* in words that *make sense.*" + description + **Donate today** | Looping background video, white gradient overlay, fade-rise entrance |
| 3 | Our story | — | Title + 2 paragraphs | **Brain** constellation, left; text right |
| 4 | Our mission | `#mission` | Title, italic subtitle "We recognize the difficulties of reaching out.", 2 paragraphs | **Bridge** constellation, right; text left |
| 5 | Our growing impact | — | 500+ Youth supported · 12 Languages · 5 Organizations · AI Therapy | Large serif figures, 4 columns |
| 6 | Be part of the bridge | `#support` | Intro; Join our team; Have space to share?; Support MindBridge (Donate / Visit us / Contact us / Drop us a message); **Donate online** form (`#donate`) + mail-a-check address | Frosted form card |
| 7 | Get help now | `#help` | Intro + 988 Lifeline, Crisis Text Line, Teen Link (WA), Emergency 911 — each with tap-to-call/text links | Same heading size as "Get in touch" for emphasis |
| 8 | Get in touch | `#contact` | Intro; Phone, Email, Founder email, Mailing address; "based in Washington state" note | Hairline-divided list |
| 9 | Footer | — | "No translation *needed.*" · "© 2026 MindBridge NGO. MindBridge is a nonprofit based in Washington state." · "MindBridge is not a crisis service. If you are in danger, call 911." | — |

Removed for now (code kept, easy to restore):
- **AI service section** ("Use our AI therapeutic service today") — hidden until a chatbot exists. Re-add `<AiService />` in `App.tsx`.
- **Experiences** — section and nav item removed. Copy remains in `content.ts`.
- **Support our mission** CTA block — folded away; donate is reachable from nav, hero and `#donate`.

### 3.2 Visual system

| Token | Value | Use |
|-------|-------|-----|
| Background | `#FFFFFF` | Page |
| Foreground | `#000000` | Headlines, logo, buttons |
| Muted | `#6F6F6F` | Body copy, menu items, italic emphasis words |
| Hairline | `#E7E7E7` | Section dividers |
| Surface | `#F4F4F4` | Donate form card |
| Constellation ink | black → `#9A9A9A` greys | Particles |
| Constellation tones | sage `#7F9A7A`, sky `#8FA9C4`, sand `#C8B48A` (~14%) | Picked from the hero video |

- **Type:** Instrument Serif (display, logo, headings, numbers) and Inter (body, nav, buttons). Self-hosted via Fontsource — no Google requests.
- **Headline:** `text-5xl sm:text-7xl md:text-8xl`, line-height 0.95, letter-spacing −2.46px. Section headings `text-5xl md:text-7xl`.
- **Buttons:** black pill, white text, `hover:scale-[1.03]`.
- **Layout:** `max-w-7xl`, `px-8`, sections `py-24 md:py-32`, two-column on desktop, stacked on mobile. Story (visual left) and Mission (visual right) alternate sides.
- **Motion:** hero `fade-rise` (0.8s, 0 / 0.2s / 0.4s delays). Constellations assemble once on first scroll into view.

### 3.3 Interactive components

**BackgroundVideo** — `requestAnimationFrame` watches `currentTime`/`duration`; fades in over 0.5s at the start and out over 0.5s before the end. On `ended`: opacity 0 → wait 100ms → rewind → play. Positioned `inset: auto 0 0 0; top: 300px` (inset set first so `top` wins). Reduced motion: paused still frame.

**Constellation** (`shape="brain" | "bridge"`) — canvas of outlined triangles.
- Assembles from scattered positions over 2.2s when first ≥15% visible.
- Pointer (mouse or touch) pushes particles away within 90px.
- Pauses when offscreen (IntersectionObserver); resizes with its container (ResizeObserver).
- Reduced motion: drawn fully formed and still; pointer push still works.
- Brain: 10:9 frame, scale 0.5. Bridge: 4:3 frame, scale 0.64, 75% particle density.

**DonateForm** — One time / Monthly; $10, $50 (default), $100, $200, Other. Button label reflects choice ("Donate $100 monthly"). If `site.donationUrl` is set, redirects there with `amount` and `frequency` query params; otherwise opens a pre-filled email to info@mindbridge.ngo.

### 3.4 Run and build

```bash
cd v2
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in v2/dist (relative paths)
```

---

## 4. Version 1 (reference build)

Static multi-page site in the repo root, dark "void" theme from `DESIGN.md`: black canvas,
violet `#8052FF` single action, amber `#FFB829` labels, Inter 200/400/600, animated
constellations (brain, bridge, voices). Pages: Home, Our Mission, Contact, Support Us,
Experiences, Get help, 404. Preview with `python3 -m http.server 8000`.

Version 1 has **not** received the version 2 content edits (it still shows the AI service
section, Experiences, "Healthcare that feels like home", Seattle wording). Treat it as a
design reference unless it is chosen for launch.

---

## 5. Contact details (single source: `v2/src/content.ts`)

- Phone: (425) 969-9989
- Email: info@mindbridge.ngo · Founder: Kunqi.wang@mindbridge.ngo
- Mailing address: MindBridge NGO, 522 W Riverside Ave, Ste N, Spokane, WA 99201 (labelled "mailing address", not an office)
- Location statement: "MindBridge is a nonprofit based in Washington state."

---

## 6. Safety, privacy and accessibility requirements

- Crisis line visible at the top of every page; "Get help now" section reachable from it.
- Site states it is **not a crisis service** (contact section and footer).
- No trackers, analytics, cookies or third-party font requests. The only third-party request is the hero video (see open items).
- Skip link, visible focus rings, semantic headings, `aria-current` on nav, `aria-hidden` on decorative canvases and video.
- `prefers-reduced-motion` respected by hero animations, video and constellations.
- Text contrast: body `#6F6F6F` on white (about 5:1, passes WCAG AA).

---

## 7. Open items before launch

| Priority | Item | Where |
|----------|------|-------|
| High | Replace the sample hero video with one MindBridge owns/licenses (current file is on a third party's CDN) | `content.ts → site.heroVideo` |
| High | Remove or rewrite the **"AI / Therapy"** impact stat and "AI-driven support" in Our story — no AI service exists yet | `content.ts → impact`, `story` |
| High | Verify impact figures (500+, 12, 5) against records | `content.ts → impact` |
| High | Verify every crisis line number | `content.ts → help` |
| High | Connect a donation processor | `content.ts → site.donationUrl` |
| Medium | Add 501(c)(3) status and EIN (footer, donate area) | `Sections.tsx` |
| Medium | Decide whether to present justice-involved youth programming | `Sections.tsx` (TODO in Our mission) |
| Medium | Nav order (Contact before Support Us) vs page order (Support before Contact) | `content.ts → nav` |
| Low | Add ® to the logo only if the name is a registered trademark | `Nav.tsx` |
| Low | Social share image (`og:image`, 1200×630) | `v2/index.html` |
| Low | Analytics, if wanted: choose a cookie-free option (e.g. Plausible, Cloudflare Web Analytics) | `v2/index.html` |
| Low | Delete v1 redirect folders `about/ programs/ get-involved/ donate/` if v1 is retired | repo root |

---

## 8. Deployment

- Domain: `mindbridge.ngo` (`CNAME` in repo root).
- **Version 1:** serve the repo root as-is (GitHub Pages works out of the box).
- **Version 2:** build in `v2/` and publish `v2/dist` (GitHub Actions Pages workflow, Netlify, or Cloudflare Pages with base directory `v2`, build `npm run build`, output `dist`). Copy `CNAME` into `v2/public/` when switching.
- Keep the domain's existing email (MX) records unchanged so @mindbridge.ngo mail keeps working.
