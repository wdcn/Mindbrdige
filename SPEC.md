# mindbridge.ngo — Site Specification

Last updated: 2026-10-02 (logo, favicons and live Stripe donations added)
Status: pre-launch. Single-page React site, hosted on Vercel from GitHub (`wdcn/Mindbrdige`, branch `main`).

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
├── SPEC.md                        This file
├── README.md                      Run, build, deploy
├── index.html                     Page shell, meta tags
├── package.json  package-lock.json  vite.config.ts  tsconfig.json
├── public/                        Copied as-is into the build
│   ├── brand/                     Logo files used by the site (horizontal, horizontal-dark, mark)
│   ├── favicon.ico  favicon.svg   Browser-tab icons
│   ├── apple-touch-icon.png       iPhone home-screen icon (180px)
│   ├── icon-192.png  icon-512.png Android / PWA icons
│   ├── robots.txt
│   └── sitemap.xml
├── Design/                        Brand kits (not used by the build)
│   ├── MindBridge-logo(.zip)      Full logo kit: SVG, PNG, favicons, README with usage rules
│   └── MindBridge-icons(.zip)     Square 1:1 symbol icons in 7 styles, 16–1024px
└── src/
    ├── content.ts                 ALL copy, contact details, links, video URL
    ├── App.tsx                    Page order
    ├── main.tsx
    ├── components/
    │   ├── BackgroundVideo.tsx    Hero video with fade-in/out manual loop
    │   ├── Constellation.tsx      Triangle-particle brain / bridge animation
    │   ├── DonateForm.tsx         Amount picker → Stripe Payment Link
    │   ├── Nav.tsx                Logo, menu, Donate pill, mobile menu
    │   ├── Hero.tsx  ui.tsx
    ├── sections/Sections.tsx      All content sections + footer
    └── styles/fonts.css  theme.css
```

Stack: React 19, Vite 7, Tailwind CSS 4, TypeScript. No backend; payments run on Stripe-hosted pages.

---

## 3. Page structure (single page, top to bottom)

| # | Section | Anchor | Content | Visual |
|---|---------|--------|---------|--------|
| 0 | Crisis line | — | "In crisis? Call or text 988 any time. In an emergency, call 911. More help" | Small grey text above nav |
| 1 | Nav | — | **Logo** (`public/brand/mindbridge-logo-horizontal.svg`, 48px tall desktop / 32px mobile, links to top); Home, Our Mission, Contact, Support Us; **Donate today** pill | Mobile: "Menu" toggle with frosted panel |
| 2 | Hero | `#top` | H1 "Mental wellness for *youth,* in words that *make sense.*" + description + **Donate today** | Looping background video, white gradient overlay, fade-rise entrance |
| 3 | Our story | — | Title + 2 paragraphs | **Brain** constellation, left; text right |
| 4 | Our mission | `#mission` | Title, italic subtitle "We recognize the difficulties of reaching out.", 2 paragraphs | **Bridge** constellation, right; text left |
| 5 | Our growing impact | — | 500+ Youth supported · 12 Languages · 5 Organizations · AI Therapy | Large serif figures, 4 columns |
| 6 | Be part of the bridge | `#support` | Intro; Join our team; Have space to share?; Support MindBridge (Donate / Visit us / Contact us / Drop us a message); **Donate online** form (`#donate`, Stripe) + mail-a-check address | Frosted form card |
| 7 | Get help now | `#help` | Intro + 988 Lifeline, Crisis Text Line, Teen Link (WA), Emergency 911 — each with tap-to-call/text links | Same heading size as "Get in touch" for emphasis |
| 8 | Get in touch | `#contact` | Intro; Phone, Email, Founder email, Mailing address; "based in Washington state" note | Hairline-divided list |
| 9 | Footer | — | "No translation *needed.*" · "© 2026 MindBridge NGO. MindBridge is a nonprofit based in Washington state." · "MindBridge is not a crisis service. If you are in danger, call 911." | — |

Parked (code kept, easy to restore):
- **AI service section** ("Use our AI therapeutic service today") — hidden until a chatbot exists. Re-add `<AiService />` in `App.tsx`.
- **Experiences** — removed from page and nav. Copy remains in `content.ts`.

---

## 4. Visual system

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

---

## 5. Brand: logo and icons

**Logo (chosen option "6B"):** a symbol of two overlapping speech bubbles (left gold, right grey, black where they overlap: two languages meeting) beside the wordmark **"MındBridge"** in Instrument Serif. "Mind" is roman black with a small gold triangle as the dot on the i; "Bridge" is italic grey. No tagline in the logo.

| Color | Hex | Use |
|-------|-----|-----|
| Gold | `#C8B48A` | Left bubble, triangle dot on the i |
| Grey | `#A6A6A6` | Right bubble on light backgrounds |
| Grey, dark | `#8A8A8A` | Right bubble on dark backgrounds |
| Text grey | `#6F6F6F` | "Bridge" on light backgrounds |
| Light grey | `#BDBDBD` | "Bridge" on dark backgrounds |
| Black / White | `#000000` / `#FFFFFF` | "Mind", bubble overlap (white on dark) |

- **Versions:** horizontal, stacked, wordmark only, symbol only, app icon; each in a light and a `-dark` variant. Text is converted to outlines, so no font is needed.
- **Square icons (1:1):** symbol, symbol-dark, icon-white, icon-black, icon-rounded, avatar-white, avatar-black (circle-safe for social profiles). SVG plus PNG at 16–1024px.
- **On the site:** the horizontal logo in the nav; favicons and the iPhone/Android icons use the black rounded icon with an enlarged symbol so it stays legible at 16px.
- **Usage:** don't stretch, recolor or add effects; below 120px wide use the symbol instead of the full logo. Full rules are in the logo kit's `README.txt`.

---

## 6. Interactive components

**BackgroundVideo** — `requestAnimationFrame` watches `currentTime`/`duration`; fades in over 0.5s at the start and out over 0.5s before the end. On `ended`: opacity 0 → wait 100ms → rewind → play. Positioned `inset: auto 0 0 0; top: 300px` (inset set first so `top` wins). Reduced motion: paused still frame.

**Constellation** (`shape="brain" | "bridge"`) — canvas of outlined triangles.
- Assembles from scattered positions over 2.2s when first ≥15% visible.
- Pointer (mouse or touch) pushes particles away within 90px.
- Pauses when offscreen (IntersectionObserver); resizes with its container (ResizeObserver).
- Reduced motion: drawn fully formed and still; pointer push still works.
- Brain: 10:9 frame, scale 0.5. Bridge: 4:3 frame, scale 0.64, 75% particle density.

**DonateForm** — Amount: $10, $50 (default), $100, $200, Other amount. The button ("Donate $50") opens the live Stripe Payment Link `https://buy.stripe.com/aFa9AMb4EfSUdYHblYeQM00` (`content.ts → stripe.donateLink`, "customers choose what to pay") with `prefilled_amount` set from the chosen amount; "Other amount" opens it empty. No server, no card data on this site. Monthly appears only when `stripe.monthlyLinks` has links; until then donors are invited to email. Stripe redirects back to `/?donation=success#donate`, which shows a thank-you message in place of the form. Verified 2026-10-02: the link opens with the chosen amount pre-filled; Stripe's page shows the business name "Mindbridge foundation", product "Mental wellness for youth" and the MindBridge logo.

---

## 7. Contact details (single source: `src/content.ts`)

- Phone: (425) 969-9989
- Email: info@mindbridge.ngo · Founder: Kunqi.wang@mindbridge.ngo
- Mailing address: MindBridge NGO, 522 W Riverside Ave, Ste N, Spokane, WA 99201 (labelled "mailing address", not an office)
- Location statement: "MindBridge is a nonprofit based in Washington state."

---

## 8. Safety, privacy and accessibility requirements

- Crisis line visible at the top of the page; "Get help now" section reachable from it.
- Site states it is **not a crisis service** (contact section and footer).
- No trackers, analytics, cookies or third-party font requests. The only third-party request is the hero video (see open items). Payments happen on Stripe's own pages.
- Skip link, visible focus rings, semantic headings, `aria-current` on nav, `aria-hidden` on decorative canvases and video.
- `prefers-reduced-motion` respected by hero animations, video and constellations.
- Text contrast: body `#6F6F6F` on white (about 5:1, passes WCAG AA).

---

## 9. Open items before launch

| Priority | Item | Where |
|----------|------|-------|
| High | Replace the sample hero video with one MindBridge owns/licenses (current file is on a third party's CDN) | `content.ts → site.heroVideo` |
| High | Remove or rewrite the **"AI / Therapy"** impact stat and "AI-driven support" in Our story — no AI service exists yet | `content.ts → impact`, `story` |
| High | Verify impact figures (500+, 12, 5) against records | `content.ts → impact` |
| High | Verify every crisis line number | `content.ts → help` |
| High | Stripe link settings: after-payment redirect to `https://mindbridge.ngo/?donation=success#donate`; button text "Donate"; email receipts on | Stripe Dashboard |
| High | Run one real $1 gift through the live link, check the receipt email, then refund it | Stripe Dashboard |
| Medium | Name mismatch: Stripe shows "Mindbridge foundation", site says "MindBridge NGO" — align them (Stripe → Settings → Public details) | Stripe Dashboard |
| Medium | Klarna (buy now, pay later) is enabled on the donation page — consider turning it off | Stripe → Payment methods |
| Medium | Monthly giving: add monthly Payment Links (`content.ts → stripe.monthlyLinks`) and a way for donors to cancel (Stripe customer portal) | Stripe Dashboard |
| Medium | Add 501(c)(3) status and EIN (footer, donate area) | `Sections.tsx` |
| Medium | Decide whether to present justice-involved youth programming | `Sections.tsx` (TODO in Our mission) |
| Medium | Nav order (Contact before Support Us) vs page order (Support before Contact) | `content.ts → nav` |
| Low | Check no other organization uses a similar name or mark before printing or registering; add ® only if registered | — |
| Low | Use the logo in the footer and Stripe branding settings for consistency | `Sections.tsx → Footer`; Stripe → Branding |
| Low | Social share image (`og:image`, 1200×630) built from the logo | `index.html` |
| Low | Analytics, if wanted: choose a cookie-free option (e.g. Plausible, Vercel Web Analytics) | `index.html` |

---

## 10. Deployment

- Host: **Vercel**, connected to GitHub `wdcn/Mindbrdige`. Every push to `main` deploys to production.
- Vercel project settings: Framework **Vite**, Root Directory **empty (repo root)**, build `npm run build`, output `dist`, Node 20+.
- Domain: add `mindbridge.ngo` and `www.mindbridge.ngo` under Vercel → Settings → Domains and set the DNS records Vercel shows. Leave MX records untouched so @mindbridge.ngo email keeps working.
