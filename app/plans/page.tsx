import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlanCard } from "@/components/PlanCard";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";
import { buildMetadata } from "@/lib/seo";
import { plans } from "@/data/plans";

export const metadata = buildMetadata({
  title: "Maintenance Plans",
  description:
    "Monthly, quarterly, and bi-annual window cleaning plans for St. George homes & businesses. Priority scheduling and member rates.",
  path: "/plans",
});

// Plans page (§5.3). Pricing intentionally omitted (§11) — card supports an optional price.
export default function PlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance plans"
        title="Pick a rhythm and keep your windows clear"
        description="Every plan includes priority scheduling and a member rate. Tell us your home and we'll recommend the right frequency — no pricing surprises."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="sr-only">Our maintenance plans</h2>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink/55">
            Not sure which fits? Start a quote and we&apos;ll recommend the right plan
            for your home.
          </p>
        </Container>
      </section>
      <FinalCtaBand />
    </>
  );
}
