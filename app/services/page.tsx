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
    "Exterior & interior window cleaning, screens, and Christmas lights for St. George, Cedar City & Southern Utah. See all WinPro services.",
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
            "Exterior & interior window cleaning, screens, and Christmas lights for St. George, Cedar City & Southern Utah.",
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
        description="Four services, inside and out — pick what you need or bundle them on a maintenance plan."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <h2 className="sr-only">All services</h2>
          {/* 2x2 grid: all cards at 50% width */}
          <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.slug}>
                <ServiceCard service={service} size="large" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
