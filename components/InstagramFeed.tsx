import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * "Latest from Instagram" — STUB for Phase 1 (§5.1 #6, §7).
 *
 * TODO (Phase 3): Wire to Behold.so's JSON feed for @winprollc.
 *   - Read BEHOLD_FEED_URL from env (set in Vercel; document Behold connection in README).
 *   - Fetch latest 4 posts, render with our own card markup (not their widget) so it
 *     matches the site (§7).
 *   - Graceful fallback: if the feed fails to load, collapse the section entirely —
 *     never render a broken embed (§7). For now we show styled placeholders.
 *   - Behold manages Meta token refresh, avoiding silent token expiry (§7 rationale).
 */
export function InstagramFeed() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Follow our work"
            title="Latest from Instagram"
            description="See recent jobs across Southern Utah. Follow along on Instagram."
          />
          <Button
            href={site.instagram.url}
            variant="ghost"
            className="hidden shrink-0 sm:inline-flex"
          >
            {site.instagram.handle}
          </Button>
        </div>

        {/* Placeholder grid stands in for the latest 4 Behold posts. */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Placeholder
              key={i}
              label={`Instagram post ${i + 1} — feed TK`}
              ratio="square"
              className="rounded-2xl"
            />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button href={site.instagram.url} variant="ghost" className="w-full">
            Follow {site.instagram.handle}
          </Button>
        </div>
      </Container>
    </section>
  );
}
