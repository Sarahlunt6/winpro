import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/services";

/** Shared "How it works" — Quote → Schedule → Spotless (§5.2). */
export function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Three steps to spotless"
        />
        <ol className="mt-10 grid grid-cols-1 justify-center gap-6 sm:grid-cols-3">
          {howItWorks.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-ink/10 bg-cloud p-6 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky text-lg font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
