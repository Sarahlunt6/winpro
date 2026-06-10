import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * "Latest from Instagram" (§5.1 #6, §7). Pulls the latest posts from Behold.so's
 * JSON feed for @winprollc and renders them with our own card markup (not Behold's
 * widget) so the section matches the site.
 *
 * States:
 *  - BEHOLD_FEED_URL not set  → placeholder grid (build-out preview).
 *  - feed set but fails/empty → section collapses (returns null), never a broken embed.
 *  - feed ok                  → latest 4 posts as cards.
 *
 * One-time setup: connect @winprollc to Behold and put the feed URL in BEHOLD_FEED_URL.
 */

type BeholdPost = {
  id?: string;
  permalink?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
};

async function fetchPosts(url: string): Promise<BeholdPost[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // refresh hourly
    if (!res.ok) return [];
    const data: unknown = await res.json();
    // Behold returns either a bare array or an object with a `posts` array.
    const posts = Array.isArray(data)
      ? data
      : ((data as { posts?: unknown }).posts ?? []);
    return Array.isArray(posts) ? (posts as BeholdPost[]) : [];
  } catch {
    return [];
  }
}

export async function InstagramFeed() {
  const feedUrl = process.env.BEHOLD_FEED_URL;
  const posts = feedUrl ? (await fetchPosts(feedUrl)).slice(0, 4) : [];

  // Feed configured but unavailable → collapse gracefully (§7).
  if (feedUrl && posts.length === 0) return null;

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
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 sm:inline-flex"
          >
            {site.instagram.handle}
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {posts.length > 0
            ? posts.map((post, i) => <PostCard key={post.id ?? i} post={post} />)
            : // Not connected yet — show styled placeholders (build-out preview).
              Array.from({ length: 4 }).map((_, i) => (
                <Placeholder
                  key={i}
                  label={`Instagram post ${i + 1} — feed TK`}
                  alt={`Recent WinPro window cleaning job in Southern Utah — Instagram photo ${i + 1}, coming soon`}
                  ratio="square"
                  className="rounded-2xl"
                />
              ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button
            href={site.instagram.url}
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            Follow {site.instagram.handle}
          </Button>
        </div>
      </Container>
    </section>
  );
}

function PostCard({ post }: { post: BeholdPost }) {
  const img = post.thumbnailUrl || post.mediaUrl;
  const alt = post.caption?.slice(0, 120) || "Instagram post from WinPro";

  return (
    <a
      href={post.permalink || site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-2xl bg-cloud ring-1 ring-ink/10 focus-visible:ring-2 focus-visible:ring-sky"
    >
      {img ? (
        // Remote Behold CDN host varies; plain img avoids next/image remote config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span className="flex h-full items-center justify-center text-sm text-ink/40">
          @winprollc
        </span>
      )}
    </a>
  );
}
