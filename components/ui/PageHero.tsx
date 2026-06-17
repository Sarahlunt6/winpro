import { Container } from "@/components/ui/Container";

/** Compact page header used by interior route stubs in Phase 1. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-ink/10 bg-cloud pb-14 pt-28 lg:pb-20 lg:pt-36">
      <Container>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-sky">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-ink/70 sm:text-xl">{description}</p>
        )}
      </Container>
    </section>
  );
}
