import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site, trustPoints } from "@/data/site";

/**
 * Final CTA band (§5.1 #7): dark ink section, headline + quote button + phone.
 * The trust strip (§5.1 #8) appears once, here — not repeated on every section.
 */
export function FinalCtaBand() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
          Ready for windows you don&apos;t notice?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
          Tell us about your place and we&apos;ll send a free, no-pressure quote.
          Most jobs are booked within a couple of days.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/quote" size="lg" className="w-full sm:w-auto">
            Get your free quote
          </Button>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full px-2 text-base font-medium text-white underline-offset-4 hover:underline"
          >
            or call {site.phone}
          </a>
        </div>

        {/* Trust strip — shown exactly once, sitewide. */}
        <ul className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-3 text-sm font-medium text-white/70 sm:flex-row sm:gap-8">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <Dot />
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />;
}
