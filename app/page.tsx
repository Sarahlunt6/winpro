import { Hero } from "@/components/home/Hero";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { PlansTeaser } from "@/components/home/PlansTeaser";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { InstagramFeed } from "@/components/InstagramFeed";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";

// Home page — sections per §5.1, in order. Alternating cloud/white backgrounds.
export default function Home() {
  return (
    <>
      <Hero /> {/* 1 */}
      <ServicesGrid /> {/* 2 */}
      <PlansTeaser /> {/* 3 */}
      <InstagramFeed /> {/* 4 — Instagram posts */}
      <ReviewsCarousel /> {/* 5 — Google reviews */}
      <BeforeAfterSection /> {/* 6 — signature element */}
      <FinalCtaBand /> {/* CTA with embedded quote form + trust strip */}
    </>
  );
}
