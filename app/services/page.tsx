import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/data/services";

export const metadata = buildMetadata({
  title: "Window Cleaning Services",
  description:
    "Exterior & interior window cleaning, screens, protective coating, and Christmas lights for St. George & Southern Utah. See all WinPro services.",
  path: "/services",
});

// Services overview (§3, §5.2).
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Window cleaning services for St. George"
        description="Five services, inside and out — pick what you need or bundle them on a maintenance plan."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="sr-only">All services</h2>
          {/* Bento grid: 2 large cards on top, 3 smaller below */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* First row: 2 large cards */}
            {services.slice(0, 2).map((service) => (
              <div key={service.slug} className="lg:col-span-1">
                <ServiceCard service={service} size="large" />
              </div>
            ))}
            {/* Christmas lights spans to fill row on lg */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <ServiceCard service={services[4]} size="large" />
            </div>
            {/* Second row: 2 smaller cards */}
            {services.slice(2, 4).map((service) => (
              <div key={service.slug}>
                <ServiceCard service={service} size="small" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
