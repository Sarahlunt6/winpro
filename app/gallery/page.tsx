import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { imageGallerySchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Project Gallery",
  description:
    "Before-and-after window cleaning results and recent projects across St. George & Southern Utah. See the WinPro difference.",
  path: "/gallery",
});

// Gallery (§5.4): filterable grid + lightbox. Placeholder slots until real photos land.
export default function GalleryPage() {
  return (
    <>
      <JsonLd data={imageGallerySchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <PageHero
        eyebrow="Our work"
        title="See the results for yourself"
        description="Filter by project type and tap any tile for a closer look. Real job photos drop into these slots with zero layout shift."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
      <FinalCtaBand />
    </>
  );
}
