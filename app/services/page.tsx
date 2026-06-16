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
          <div className="flex flex-wrap justify-center gap-5">
            {services.map((service) => (
              <div key={service.slug} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
