import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HowItWorks } from "@/components/HowItWorks";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";
import { services, getService } from "@/data/services";

// Pre-render all five service pages at build time (§3, §5.2).
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  // Local SEO: "{service} · St. George" in the title, under 60 chars (§8).
  // Brand shortened to "WinPro" here so the local phrase fits the length budget.
  const title = `${service.name} · St. George, UT | WinPro`;
  const description = `${service.valueProp} Serving St. George & Southern Utah — free quotes.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  // Related services for internal linking (§8 #6) — the other four services.
  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />

      {/* Hero: service name + value prop over a photo placeholder */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Placeholder
            label={service.placeholderLabel}
            ratio="hero"
            tone="ink"
            decorative
            src={service.image}
            priority
            sizes="100vw"
            className="h-full w-full !aspect-auto"
          />
          <div className="absolute inset-0 bg-glass" />
        </div>
        <Container className="flex min-h-[52vh] flex-col justify-center py-20 lg:py-28">
          <div className="max-w-2xl">
            <Link
              href="/services"
              className="text-sm font-medium text-white/80 underline-offset-4 hover:underline"
            >
              ← All services
            </Link>
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              {service.name} in St. George
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{service.valueProp}</p>
            <div className="mt-8">
              <Button href={`/quote?service=${service.slug}`} size="lg">
                Get your free quote
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Seasonal callout (Christmas Lights only, §5.2) */}
      {service.seasonalCallout && (
        <section className="bg-sky-light/40 py-12 lg:py-16">
          <Container>
            <div className="mx-auto max-w-3xl rounded-2xl border border-sky/30 bg-white p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/70">
                Seasonal service
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink">
                {service.seasonalCallout.title}
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/75">
                {service.seasonalCallout.body}
              </p>
              <p className="mt-4 rounded-xl bg-cloud px-4 py-3 text-sm font-medium text-ink/70">
                {service.seasonalCallout.bookingNote}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* 2-col: photo | what's included */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center justify-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Placeholder
              label={service.placeholderLabel}
              alt={`${service.name} by WinPro at a St. George home — project photo coming soon`}
              ratio="wide"
              className="rounded-2xl"
              src={service.sectionImage || service.image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <SectionHeading eyebrow="What's included" title="Done right, every visit" />
              <ul className="mt-6 space-y-5">
                {service.included.map((benefit) => (
                  <li key={benefit.title} className="flex gap-3">
                    <Check />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink/70">
                        {benefit.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Photo gallery (if service has multiple images) */}
      {service.images && service.images.length > 0 && (
        <section className="bg-cloud py-16 lg:py-24">
          <Container>
            <SectionHeading
              align="center"
              eyebrow="Our work"
              title="See our results"
              className="mb-10"
            />
            <div className="grid grid-cols-2 justify-center gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {service.images.map((img, idx) => (
                <Placeholder
                  key={idx}
                  label={`${service.name} project ${idx + 1}`}
                  alt={`${service.name} by WinPro — project photo ${idx + 1}`}
                  ratio="square"
                  className="rounded-2xl"
                  src={img}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <HowItWorks />

      {/* FAQ */}
      <section className="bg-cloud py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="FAQ"
              title="Questions, answered"
              className="mb-10"
            />
            <FaqAccordion faqs={service.faqs} />
          </div>
        </Container>
      </section>

      {/* Related services + plans — internal linking (§8 #6) */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Explore more"
            title="Other services you might need"
            description="Bundle services on one visit, or keep your glass clear year-round with a maintenance plan."
          />
          <ul className="mt-8 grid grid-cols-1 justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-cloud px-5 py-4 text-base font-medium text-ink transition-colors hover:border-sky hover:bg-sky-light/30"
                >
                  {s.name}
                  <ArrowRight />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/plans"
                className="flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border border-sky bg-sky-light/30 px-5 py-4 text-base font-semibold text-ink transition-colors hover:bg-sky-light/50"
              >
                See maintenance plans
                <ArrowRight />
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <FinalCtaBand />
    </>
  );
}

function ArrowRight() {
  return (
    <svg className="h-4 w-4 shrink-0 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="mt-1 h-5 w-5 shrink-0 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
