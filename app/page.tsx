import { Hero } from "@/components/home/Hero";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { PlansTeaser } from "@/components/home/PlansTeaser";
import { FeaturedTestimonial } from "@/components/home/FeaturedTestimonial";
import { InstagramFeed } from "@/components/InstagramFeed";
import { QuoteForm } from "@/components/QuoteForm";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";

// Home page — sections per §5.1, in order. Alternating cloud/white backgrounds.
export default function Home() {
  return (
    <>
      <Hero /> {/* 1 */}
      <BeforeAfterSection /> {/* 2 — signature element */}
      <ServicesGrid /> {/* 3 */}
      <PlansTeaser /> {/* 4 */}
      <FeaturedTestimonial /> {/* 5 */}
      <InstagramFeed /> {/* 6 — stub (§7) */}
      <QuoteForm /> {/* embedded quote form (§6) — stub */}
      <FinalCtaBand /> {/* 7 + trust strip (8) */}
    </>
  );
}
