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

## Donations (Stripe)

The donate form sends donors to Stripe's hosted payment page. No server code is needed.

- `stripe.donateLink` in `src/content.ts` is a live Payment Link set to **Customers choose what to pay**.
  Choosing $10/$50/$100/$200 opens it with that amount pre-filled (`?prefilled_amount=<cents>`);
  "Other amount" opens it empty. Donors can still change the amount on Stripe.
- In the link's settings on Stripe: **After payment → Don't show confirmation page → redirect to**
  `https://mindbridge.ngo/?donation=success#donate` so donors land on the thank-you message.
- Turn on **Settings → Customer emails → Successful payments** so donors get receipts.
- Monthly giving: create fixed-price monthly Payment Links and paste them into `stripe.monthlyLinks`.
  The Monthly option appears on the form automatically once one is filled in; until then the form
  invites monthly donors to email.

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
