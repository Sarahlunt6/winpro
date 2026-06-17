import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { site, trustPoints } from "@/data/site";

/**
 * Final CTA band (§5.1 #7): dark ink section with embedded quote form.
 * The trust strip (§5.1 #8) appears once, here — not repeated on every section.
 */
export function FinalCtaBand() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: headline + trust points */}
          <div className="text-center lg:text-left">
            <h2 className="max-w-lg text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready for windows you don&apos;t notice?
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/75 lg:mx-0 mx-auto">
              Tell us about your place and we&apos;ll send a free, no-pressure quote.
              Most jobs are booked within a couple of days.
            </p>

            <a
              href={site.phoneHref}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center text-base font-medium text-white underline-offset-4 hover:underline"
            >
              Or call {site.phone}
            </a>

            {/* Trust strip */}
            <ul className="mt-10 flex flex-col items-center gap-3 text-sm font-medium text-white/70 lg:items-start">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Dot />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: quote form */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />;
}
