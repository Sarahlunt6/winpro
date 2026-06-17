import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard } from "@/components/PlanCard";
import { plans } from "@/data/plans";

/** Plans teaser (§5.1 #4): 3 cards, benefit bullets, no pricing, custom-quote CTA. */
export function PlansTeaser() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Maintenance plans"
          title="Keep your windows clear all year"
          description="Set it once and forget it. Plan members get priority scheduling and a better rate — pick the rhythm that fits your home."
        />
        <div className="mt-10 grid grid-cols-1 justify-center gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.slug} delay={i * 60} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
