import { Container } from "@/components/ui/Container";

// Featured testimonial (§5.1 #5). One real Google review at a time.
// TODO: replace with verbatim reviews pulled from the current site / GBP before launch.
const featured = {
  quote:
    "They showed up on time, were professional, and our windows have never looked better. You can tell they actually care about doing it right. Highly recommend WinPro to anyone in the area.",
  name: "Google review",
  city: "St. George, UT",
};

/** Full-width pulled quote between sections (§5.1 #5). */
export function FeaturedTestimonial() {
  return (
    <section className="bg-cloud py-16 lg:py-24">
      <Container>
        <figure className="mx-auto max-w-3xl text-center">
          <QuoteMark />
          <blockquote className="mt-6 text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-6 text-sm font-medium text-ink/60">
            {featured.name} · {featured.city}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg className="mx-auto h-9 w-9 text-sky" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2-1.5 3-3 3.5l.8 1.5C8.5 19 10 16.5 10 13V10.5C10 8 8 6 7.5 6zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c0 2-1.5 3-3 3.5l.8 1.5C17.5 19 19 16.5 19 13V10.5C19 8 17 6 16.5 6z" />
    </svg>
  );
}
