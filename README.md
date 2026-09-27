# mindbridge.ngo

Website for MindBridge NGO — mental wellness for immigrant and international youth.
Single-page React + Vite + Tailwind CSS + TypeScript site. See `SPEC.md` for the full specification.

## Run it

```bash
npm install        # first time, or after dependencies change
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
npm run preview    # serve the built files locally
```

Requires Node 20+.

## Edit content

All wording, contact details, links, the hero video URL and the donation link live in
`src/content.ts`. Page order is in `src/App.tsx`.

## Deploy

Pushing to `main` on GitHub deploys to production on Vercel:

```bash
git add .
git commit -m "Describe the change"
git push
```

Vercel settings: Framework **Vite**, Root Directory empty, build `npm run build`, output `dist`.

## Before launch

See the "Open items" table in `SPEC.md`.
