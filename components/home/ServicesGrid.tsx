import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

/** Services grid (§5.1 #3): 5 photo cards, hover lift, each links to its page. */
export function ServicesGrid() {
  return (
    <section className="bg-cloud py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Everything your glass needs, one local crew"
            description="Five services, inside and out — pick what you need or bundle them on a plan."
          />
          <Button href="/services" variant="ghost" className="hidden shrink-0 sm:inline-flex">
            All services
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
