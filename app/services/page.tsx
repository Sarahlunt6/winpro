import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
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
      <JsonLd
        data={webPageSchema({
          name: "Window Cleaning Services",
          description:
            "Exterior & interior window cleaning, screens, protective coating, and Christmas lights for St. George & Southern Utah.",
          path: "/services",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="What we do"
        title="Window cleaning services for St. George"
        description="Five services, inside and out — pick what you need or bundle them on a maintenance plan."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="sr-only">All services</h2>
          {/* Bento grid: 2 large cards (50% each) on top, 3 smaller (33% each) below */}
          <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {/* First row: 2 large cards, each 50% (3 cols of 6) */}
            {services.slice(0, 2).map((service) => (
              <div key={service.slug} className="sm:col-span-1 lg:col-span-3">
                <ServiceCard service={service} size="large" />
              </div>
            ))}
            {/* Second row: 3 smaller cards, each 33% (2 cols of 6) */}
            {services.slice(2, 5).map((service) => (
              <div key={service.slug} className="sm:col-span-1 lg:col-span-2">
                <ServiceCard service={service} size="small" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
