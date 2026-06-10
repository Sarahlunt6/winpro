import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Before-and-after window cleaning results and recent projects across St. George and Southern Utah.",
};

// Gallery (§5.4). Filterable grid + lightbox are built in Phase 3. Placeholder grid for now.
export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="See the results for yourself"
        description="A filterable before-and-after gallery with lightbox is coming in Phase 3. Real job photos drop into these slots with zero layout shift."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Placeholder
                key={i}
                label={`Project ${i + 1} — photo TK`}
                ratio="square"
                className="rounded-2xl"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
