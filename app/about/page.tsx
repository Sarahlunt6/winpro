import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { areasServed } from "@/data/site";

export const metadata: Metadata = {
  title: "About WinPro",
  description:
    "WinPro is a locally owned window cleaning company serving St. George and Southern Utah. Quality, reliability, and integrity on every job.",
};

// About (§5.5). Full story port + values + team arrive in Phase 3; this is the foundation shell.
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Small-town window cleaners who actually show up"
        description="WinPro is locally owned and Southern Utah based. The full story, values, and team section are polished in Phase 3 — this is the foundation."
      />
      <section className="py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink/75">
            <p>
              We started WinPro in 2025 as a couple of friends who wanted to do
              honest work and do it right. No upsells, no runaround — just clean
              windows and a crew you can count on.
            </p>
            <p>
              Today we serve homes and businesses across{" "}
              {areasServed.slice(0, -1).join(", ")}, and {areasServed.at(-1)}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
