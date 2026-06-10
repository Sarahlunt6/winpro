# WinPro Window Cleaning — Website

Custom Next.js 14 (App Router) + Tailwind rebuild of dirtywinpro.com. Deployed on
Vercel, versioned on GitHub. See `winpro-redesign-prd.md` for the full spec — it is
the source of truth. Section references below (e.g. §4) point into that PRD.

## Status: Phase 3 (Content pages) complete

Built so far: design system, shared Header/Footer, full Home page with the
placeholder system, the working before/after slider, the multi-step quote form +
`/api/quote` → Resend delivery + `/thank-you`, the `/plans` page, **all 5 service
pages, the About page, the filterable Gallery, and the Behold-powered Instagram
section**. Every route is live with placeholder imagery. The Home hero plays a
client-supplied background video (reduced-motion aware).

| Phase | What it adds |
|---|---|
| **1 ✅** | Scaffold, design tokens, Header/Footer, Home, before/after slider, data |
| **2 ✅** | Multi-step quote form, `/api/quote` → Resend, `/thank-you`, `/plans` |
| **3 ✅** | 5 service pages, About, Gallery, Instagram (Behold) |
| 4 ◑ | **SEO/schema, sitemap/robots, 301 redirects, mobile + a11y pass, logos — done.** Remaining: real photos, copy sign-off, Lighthouse run on prod. |
| 5 | DNS cutover |

### SEO & mobile pass (Phase 4)

- **Metadata** — per-route titles (`%s | WinPro Window Cleaning`, service pages use a
  shorter `… · St. George, UT | WinPro` to stay <60 chars) and <155-char descriptions
  via `lib/seo.ts`; canonical URLs; OpenGraph + Twitter cards with a generated OG image
  (`app/opengraph-image.tsx`).
- **Structured data** (`lib/schema.ts`) — `LocalBusiness` sitewide (phone, areas, geo
  for St. George), `Service` + `FAQPage` on each service page.
- **`sitemap.ts`** (indexable routes, excludes `/thank-you`) and **`robots.ts`**.
- **301 redirects** for old WordPress URLs in `next.config.mjs` — crawl the live site
  for the full list before cutover.
- **Logos** — `public/logo-wordmark.png` in the header, `public/logo-icon.png` in the
  footer and as the favicon (`app/icon.png` / `app/apple-icon.png`).
- **Mobile/a11y** — 16px+ inputs (no iOS zoom), 44px+ tap targets, mobile nav closes
  on route change + locks body scroll, skip-link, one H1/page, descriptive alt text,
  `prefers-reduced-motion` respected everywhere (incl. the hero video & slider).

### Content pages (Phase 3)

- **Service pages** — one shared template at `app/services/[slug]/page.tsx`, statically
  generated for all 5 services from `data/services.ts` (§5.2): hero, 2-col "what's
  included", "How it works", FAQ accordion (native `<details>`), CTA band. Christmas
  Lights additionally renders a seasonal install/takedown callout with the Oct–Jan
  booking note. Per-page metadata targets "{service} in St. George" naturally (§8).
  Service-page CTAs deep-link `/quote?service=<slug>` to preselect that service.
- **About** (`/about`) — story, values (Quality/Reliability/Integrity), team
  placeholders, areas-served list (§5.5).
- **Gallery** (`/gallery`) — client-side filter (All / Residential / Commercial /
  Before & After) + lightbox, no reload. Items in `data/gallery.ts` (§5.4).
- **Instagram** (`components/InstagramFeed.tsx`) — async server component that pulls
  Behold's JSON feed when `BEHOLD_FEED_URL` is set, rendering the latest 4 with our
  own card markup. No URL → placeholder grid; configured-but-failing → the section
  collapses (never a broken embed, §7).

### Quote form & email (Phase 2)

- `components/quote/QuoteForm.tsx` — 5-step form (§6): progress bar, back button,
  Enter-advances, autofocus per step, inline validation, honeypot, 48px+ targets,
  state preserved on back. Embedded on Home and at `/quote`. Plan preselects via
  `/quote?plan=quarterly` (the `/plans` cards link this way).
- `app/api/quote/route.ts` — validates (server-side mirror of the client), drops
  honeypot hits silently, rate-limits by IP, sends the owner email via Resend, and
  fires an optional auto-reply to the lead. **Without `RESEND_API_KEY` it logs the
  payload and returns success**, so the whole flow is testable locally with no keys.
- Rate limiting is in-memory (`lib/rateLimit.ts`) — a best-effort speed bump that
  resets per serverless instance. Swap for Upstash Redis if real abuse appears.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before pushing)
```

Requires Node 18.17+ (built on Node 24).

## Tech & conventions

- **Next.js 14 App Router**, TypeScript, **Tailwind** (hand-built — no component library).
- **Fonts** (`next/font`, self-hosted, no FOUT): Bricolage Grotesque (display) + Inter
  (body), exposed as the `--font-display` / `--font-body` CSS variables → Tailwind
  `font-display` / `font-sans`. See `app/fonts.ts`.
- **Design tokens** live in `tailwind.config.ts` (palette from §4): `ink`, `sky`,
  `sky-light`, `cloud`, `glass`. One accent (sky). No gradients.
- **Primitives** in `components/ui/`: `Button`, `Container`, `SectionHeading`,
  `Placeholder`, `Reveal`, `Logo`, `PageHero`.
- **Motion** (§4): one scroll-reveal pattern (`Reveal`, fade-up 300ms once) + card
  hover lift + the slider. Everything respects `prefers-reduced-motion`.

## Project structure

```
app/                  Routes (App Router). Home is fully built; interior pages are stubs.
  fonts.ts            next/font setup
components/           Header, Footer, BeforeAfterSlider, ServiceCard, PlanCard, stubs…
  home/               Home page sections (Hero, ServicesGrid, PlansTeaser, …)
  ui/                 Shared primitives
data/services.ts      Single source of truth — 5 services (§9)
data/plans.ts         Single source of truth — 3 plans (pricing omitted, §11)
data/site.ts          NAP, nav, areas served, social, trust points
lib/cn.ts             className joiner
```

## Environment variables

None are required to run Phase 1. The following are added in later phases — set them
in Vercel (Project → Settings → Environment Variables), never commit them. A template
lives in `.env.example`.

| Var | Phase | Purpose |
|---|---|---|
| `RESEND_API_KEY` | 2 | Resend API key for quote-email delivery (§6). Unset = dev mode (logs, no send). |
| `QUOTE_TO_EMAIL` | 2 | Owner inbox for quote requests — `winprollc363@gmail.com` (client-confirmed) |
| `QUOTE_FROM_EMAIL` | 2 | Optional. Sender address. Defaults to Resend's `onboarding@resend.dev` until the `dirtywinpro.com` domain is verified (§6). |
| `BEHOLD_FEED_URL` | 3 | Behold.so JSON feed URL for the @winprollc Instagram section (§7) |

## One-time setup (before later phases)

- **Resend (Phase 2):** create a Resend account, verify the `dirtywinpro.com` sending
  domain for deliverability. Until verified, use Resend's onboarding domain in dev (§6).
- **Behold / Instagram (Phase 3):** in Behold.so, connect the WinPro Instagram account
  (@winprollc) — ~5 min — and copy the feed's JSON URL into `BEHOLD_FEED_URL` (§7).

## Swapping in real photos

The site ships with a placeholder system (§4): solid `cloud`-colored blocks with a
camera icon and a "… — photo TK" label (`components/ui/Placeholder.tsx`). **No stock
photos, no external placeholder URLs.** Each slot already has its final aspect ratio,
so dropping in real images is **zero layout shift**:

- Service cards: **4:5** (`aspect-card`)
- Hero / before-after: **16:9** (`aspect-hero`)
- Gallery / Instagram: **1:1** (`aspect-square`)

**`Placeholder` is the swap point** — pass it a `src` and it renders an optimized
`next/image` (object-cover) filling the identical box; no markup changes needed.
The easiest path is data-driven:

- **Service photos:** add a file to `public/` and set `image` on the service in
  `data/services.ts` (e.g. `image: "/photos/exterior.jpg"`). Used by the card, the
  service-page hero (already `priority`), and the 2-col section.
- **Gallery photos:** set `image` on items in `data/gallery.ts`.
- Local files in `public/` need no config. For a remote CDN, add the host to
  `images.remotePatterns` in `next.config.mjs`.

### Hero video

`public/video/hero.mp4` is a 720p, ~4 MB H.264 encode (down from the 13 MB original)
with a poster frame at `public/video/hero-poster.jpg`. The poster paints instantly and
is the still shown to `prefers-reduced-motion` users (who never trigger autoplay, so
they don't download the video). To replace the footage, drop in a new 720p MP4 at the
same path and regenerate the poster:
`ffmpeg -i new.mp4 -vf scale=1280:-2 -crf 28 -an -movflags +faststart hero.mp4`
and `ffmpeg -ss 0 -i hero.mp4 -frames:v 1 -vf scale=1280:-2 hero-poster.jpg`.

## Analytics (§8)

Vercel Analytics is always on (`@vercel/analytics`, no env var). An optional Google
tag loads **only** when you set one of `NEXT_PUBLIC_GA_ID` (GA4) or `NEXT_PUBLIC_GTM_ID`
(GTM wins if both set) — in `.env` and Vercel. See `components/Analytics.tsx`.

## What the client still needs to provide

See PRD §12. Quote destination email is confirmed: **`winprollc363@gmail.com`**.
Still needed: final job photos, logo files (SVG), connect Instagram to Behold, approve
the homepage headline + plan copy, confirm Christmas Lights inclusions, and grant
Resend domain-verification access.
