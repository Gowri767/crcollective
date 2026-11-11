# CR Collective website

Next.js 14 (App Router) + TypeScript. Static pages, one serverless route (`/api/contact`).

## Deploy to Vercel
1. Push this folder to a GitHub repo (or use `vercel` CLI / drag-and-drop import).
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected as Next.js. No build settings needed.
3. **Settings → Environment Variables** (all environments):
   - `RESEND_API_KEY` – from resend.com (needed for the quote form to deliver email)
   - `CONTACT_TO_EMAIL` – where quote requests go
   - `CONTACT_FROM_EMAIL` – a sender on a domain verified in Resend
   - `NEXT_PUBLIC_SITE_URL` – e.g. `https://www.crcollective.com`
   - `NEXT_PUBLIC_GTM_ID` – optional, Google Tag Manager container (GTM-XXXX)
4. Deploy, check the preview URL, then **Settings → Domains** to add the domain and update DNS.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

Without the three email variables the form shows "not connected, please call" rather than faking a send.

## Replace placeholders with real product images
Product visuals are grey placeholders until real files exist. Add, per product slug:
`public/products/<slug>/hero.webp` (transparent background, square) and optionally `hover.webp` (card hover image).
Slugs: airtight-hemp, airtight-pod, tins, bio-boxes, aluminum-cans, concentrate-jars, leaning-jars, ovals, topicals, vacusnap-caps, wine-caps.
The build picks them up automatically and removes the "placeholder" labels.

## Edit content
All product text lives in `src/data/products.ts`. Page copy is in `src/app/**/page.tsx`.

## Local development
`npm install && npm run dev` (http://localhost:3000). `npm run build && npm start` for production mode.
