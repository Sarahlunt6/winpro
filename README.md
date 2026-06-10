# WinPro Window Cleaning — Website

Custom Next.js 14 (App Router) + Tailwind rebuild of dirtywinpro.com. Deployed on
Vercel, versioned on GitHub. See `winpro-redesign-prd.md` for the full spec — it is
the source of truth. Section references below (e.g. §4) point into that PRD.

## Status: Phase 1 (Foundation) complete

Built: design system, shared Header/Footer, full Home page with the placeholder
system, the working before/after slider, and the services/plans data sources.
Interior routes exist as lightweight stubs so navigation never dead-ends.

| Phase | What it adds |
|---|---|
| **1 ✅** | Scaffold, design tokens, Header/Footer, Home, before/after slider, data |
| 2 | Multi-step quote form, `/api/quote` → Resend, `/thank-you`, `/plans` |
| 3 | 5 service pages, About, Gallery, Instagram (Behold) |
| 4 | Real photos, copy sign-off, SEO/schema, 301 redirects, Lighthouse |
| 5 | DNS cutover |

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
| `RESEND_API_KEY` | 2 | Resend API key for quote-email delivery (§6) |
| `QUOTE_TO_EMAIL` | 2 | Owner inbox for quote requests — confirm `winpro363@gmail.com` (§6, §12) |
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

To swap: add files under `public/`, replace the `<Placeholder … />` with `next/image`
at the same aspect ratio, and mark the hero image `priority` (§8). The before/after
slider's two `SlideFill` placeholders become two `<Image>`s — markup is otherwise ready.

## What the client still needs to provide

See PRD §12. Short list: confirm the quote destination email, final job photos, logo
files (SVG), connect Instagram to Behold, approve the homepage headline + plan copy,
confirm Christmas Lights inclusions, and grant Resend domain-verification access.
