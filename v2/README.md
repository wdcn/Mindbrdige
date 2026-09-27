# MindBridge — version 2

Single-page React + Vite + Tailwind CSS (v4) + TypeScript build of mindbridge.ngo,
with a cinematic hero (looping background video with manual fade in/out).
Content and section order match version 1 (the static site in the repo root).

## Run it

```bash
cd ~/Documents/GitHub/Mindbridge/v2
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # production files in v2/dist
npm run preview    # serve the built files
```

Requires Node 20+.

## Where things are

```
v2/
├── index.html                  Page shell, meta tags
├── src/
│   ├── content.ts              ALL copy, contact details, video URL, donation link
│   ├── App.tsx                 Page order
│   ├── components/
│   │   ├── BackgroundVideo.tsx rAF fade loop (0.5s in/out, 100ms restart on ended)
│   │   ├── Nav.tsx             Logo, menu, Donate pill, mobile menu
│   │   ├── Hero.tsx            Headline, description, CTA with fade-rise animations
│   │   ├── DonateForm.tsx      One-time/monthly, $10/$50/$100/$200/Other
│   │   └── ui.tsx              Section, Heading, Body, PillLink, TextLink
│   ├── sections/Sections.tsx   Story, AI service, Support, Impact, Mission, Support us,
│   │                           Experiences, Contact, Get help, Footer
│   └── styles/
│       ├── fonts.css           Instrument Serif + Inter (self-hosted via Fontsource)
│       └── theme.css           Tailwind theme tokens + fade-rise animations
└── public/favicon.svg
```

Menu items scroll to sections on the page (#mission, #contact, #support, #experiences).

## Before launch

- [ ] **Hero video**: the current URL is the sample from the design prompt, hosted on someone
      else's CDN. Replace `site.heroVideo` in `src/content.ts` with a video MindBridge owns or
      has licensed (put the file in `public/` and use `"./hero.mp4"`). Keep it short, muted,
      and under ~5 MB.
- [ ] Trademark: the design used "Aethera®". MindBridge is shown without ® — add it only if
      the name is actually registered.
- [ ] Donation processor: set `site.donationUrl` in `src/content.ts` (the button emails
      info@mindbridge.ngo until then).
- [ ] Same content TODOs as version 1: impact figures, crisis numbers, AI service wording and
      link, 501(c)(3)/EIN.

## Deploying

`npm run build` produces static files in `v2/dist` with relative paths, so they work at the
domain root or in a subfolder. To make v2 the live site, publish `v2/dist` instead of the
repo root (e.g. a GitHub Actions Pages workflow, Netlify or Cloudflare Pages with
build command `npm run build` and output `v2/dist`, base directory `v2`).
