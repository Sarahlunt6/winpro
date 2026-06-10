import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Before-and-after window cleaning results and recent projects across St. George and Southern Utah.",
};

// Gallery (§5.4): filterable grid + lightbox. Placeholder slots until real photos land.
export default function GalleryPage() {
  return (
    <>
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
