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

        {/* Bento grid: 2 large cards on top, 3 smaller below */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* First row: 2 large cards spanning 2 columns each */}
          {services.slice(0, 2).map((service, i) => (
            <Reveal key={service.slug} delay={i * 60} className="sm:col-span-1 lg:col-span-2">
              <ServiceCard service={service} size="large" />
            </Reveal>
          ))}
          {/* Second row: 3 smaller cards + 1 taking remaining space */}
          {services.slice(2, 5).map((service, i) => (
            <Reveal key={service.slug} delay={(i + 2) * 60} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <ServiceCard service={service} size="small" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
