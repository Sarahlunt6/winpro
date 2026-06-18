import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

/** Services grid (§5.1 #3): 4 photo cards, hover lift, each links to its page. */
export function ServicesGrid() {
  return (
    <section className="bg-cloud py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="What we do"
          title="Everything your glass needs, one local crew"
          description="Four services, inside and out — pick what you need or bundle them on a plan."
        />

        {/* 2x2 grid: all cards at 50% width */}
        <div className="mt-10 grid grid-cols-1 justify-center gap-4 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} size="large" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
