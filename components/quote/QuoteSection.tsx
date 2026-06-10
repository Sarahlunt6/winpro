import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/quote/QuoteForm";
import type { QuoteData } from "@/lib/quote";

/** Home-embedded quote section (§6): heading + the multi-step form, anchored at #quote. */
export function QuoteSection({
  defaultPlanInterest,
}: {
  defaultPlanInterest?: QuoteData["planInterest"];
}) {
  return (
    <section id="quote" className="scroll-mt-24 bg-cloud py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            align="center"
            eyebrow="Free quote"
            title="Get your free quote in under a minute"
            description="A few quick questions about your windows and we'll get you a price. No pressure, no spam."
          />
          <div className="mt-8">
            <QuoteForm defaultPlanInterest={defaultPlanInterest} />
          </div>
        </div>
      </Container>
    </section>
  );
}
