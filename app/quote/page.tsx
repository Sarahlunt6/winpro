import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { planSlugToInterest } from "@/lib/quote";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Get a free, no-pressure quote for window cleaning in St. George and Southern Utah. A few quick questions and we'll get you a price.",
};

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
