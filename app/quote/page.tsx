import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { contactPageSchema, breadcrumbSchema } from "@/lib/schema";
import { planSlugToInterest } from "@/lib/quote";
import { getService } from "@/data/services";

export const metadata = buildMetadata({
  title: "Get a Free Quote",
  description:
    "Get a free, no-pressure window cleaning quote for St. George & Southern Utah. Five quick questions and we'll get you a price.",
  path: "/quote",
});

// /quote (§6). Plan can be preselected via ?plan=quarterly (from /plans cards, §5.3).
export default function QuotePage({
  searchParams,
}: {
  searchParams: { plan?: string; service?: string };
}) {
  const defaultPlanInterest = planSlugToInterest(searchParams.plan);
  // Only honor a ?service= value that maps to a real service slug.
  const defaultServices = getService(searchParams.service ?? "")
    ? [searchParams.service as string]
    : [];

  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/quote" },
        ])}
      />
      <PageHero
        eyebrow="Free quote"
        title="Tell us about your windows"
        description="Five quick steps — most people finish in under a minute. We'll follow up with a price and a time."
      />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <QuoteForm
              defaultPlanInterest={defaultPlanInterest}
              defaultServices={defaultServices}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
