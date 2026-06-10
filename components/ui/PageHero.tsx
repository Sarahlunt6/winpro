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
    <section className="border-b border-ink/10 bg-cloud py-14 lg:py-20">
      <Container>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-sky">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-ink/70">{description}</p>
        )}
      </Container>
    </section>
  );
}
