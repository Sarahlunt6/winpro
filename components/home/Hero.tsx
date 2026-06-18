import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/home/HeroBackground";
import { site } from "@/data/site";

/**
 * Home hero (§5.1 #1): full-bleed photo placeholder, Google rating pill,
 * H1, one primary CTA → /quote, phone link secondary. No two-pill-button cliché.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background video (client-supplied footage), reduced-motion aware. */}
      <HeroBackground />
      {/* glass overlay for text legibility over the video (§4) */}
      <div className="absolute inset-0 -z-10 bg-glass" />

      <Container className="flex min-h-[85vh] flex-col justify-center py-24 sm:min-h-[90vh] lg:py-32">
        <div className="max-w-3xl">
          <RatingPill />

          <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Crystal clear windows. Every time.
          </h1>

          <p className="mt-6 max-w-xl text-xl text-white/85 sm:text-2xl lg:text-3xl">
            Streak-free window cleaning for St. George, Cedar City, and all of
            Southern Utah. Book a free quote and get back your view.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/quote" size="lg" className="w-full sm:w-auto">
              Get your free quote
            </Button>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-ink bg-white/10 px-5 text-base font-medium text-ink backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              or call {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Google rating badge linking to the GBP reviews page.
function RatingPill() {
  const { url, label } = site.googleRating;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-ink bg-white/10 px-3.5 py-1.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:bg-white/20"
    >
      <Stars />
      <span>{label}</span>
    </a>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5 text-sky" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}
