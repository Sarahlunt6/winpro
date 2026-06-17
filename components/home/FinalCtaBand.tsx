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
              className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white px-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              <PhoneIcon />
              Call {site.phone}
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

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
