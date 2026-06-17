import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

/** Signature element section (§5.1 #2): the draggable before/after slider. */
export function BeforeAfterSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="See the difference"
          title="Drag to see what spotless really looks like"
          description="Real St. George windows, before and after. Slide the divider — this is the kind of clean we leave behind."
        />
        <Reveal className="mt-10">
          <BeforeAfterSlider
            before={{ label: "Dirty window with hard-water spotting", tone: "dirty", image: "/photos/before-dirty-window.png", objectPosition: "40% center" }}
            after={{ label: "Clean streak-free glass", tone: "clean", image: "/photos/after-clean-window.png", objectPosition: "60% center" }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
