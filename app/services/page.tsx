import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Window cleaning services in St. George",
  description:
    "Exterior and interior window cleaning, screen cleaning, protective glass coating, and Christmas light installs for St. George and Southern Utah.",
};

// Services overview (§3, §5.2). Per-service template pages are built in Phase 3.
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Window cleaning services for Southern Utah"
        description="Five services, inside and out. Individual service pages with full details, FAQs, and pricing context arrive in Phase 3."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
