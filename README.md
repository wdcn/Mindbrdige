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

## Donations (Stripe Payment Links)

The donate form sends donors to Stripe-hosted payment pages. No server code is needed, so the
site stays fully static.

1. In the Stripe Dashboard (start in **Test mode**), go to **Payment Links → + New** and create:
   - One-time: $10, $50, $100, $200 (product "Gift to MindBridge", fixed price).
   - One-time "Other": choose **Customers choose what to pay** (set a minimum of $1).
   - Monthly: $10, $50, $100, $200 (recurring monthly price, product "Monthly gift to MindBridge").
2. For each link: **Confirmation page → Don't show confirmation page → redirect to**
   `https://mindbridge.ngo/?donation=success#donate`, and set the button to **Donate**.
3. Paste each link's URL into `stripeLinks` in `src/content.ts`. Links are public and safe to commit.
4. Test with card `4242 4242 4242 4242`, any future date, any CVC. Then recreate the links in
   **Live mode** and swap the URLs before launch.

Any amount left without a link falls back to a pre-filled email to info@mindbridge.ngo.
Turn on **Settings → Customer emails → Successful payments** in Stripe so donors get receipts.

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
