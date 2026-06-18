import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/data/site";

/**
 * "Latest from Instagram" (§5.1 #6, §7). Pulls the latest posts from Behold.so's
 * JSON feed for @winprollc and renders them styled like Instagram post screenshots.
 *
 * States:
 *  - BEHOLD_FEED_URL not set  → placeholder grid (build-out preview).
 *  - feed set but fails/empty → section collapses (returns null), never a broken embed.
 *  - feed ok                  → latest 3 posts styled like IG screenshots.
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
  timestamp?: string;
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
  const posts = feedUrl ? (await fetchPosts(feedUrl)).slice(0, 3) : [];

  // Feed configured but unavailable → collapse gracefully (§7).
  if (feedUrl && posts.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Follow our work"
          title="Latest from Instagram"
          description="See recent jobs across Southern Utah. Follow along on Instagram."
        />

        <div className="mt-10 grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0
            ? posts.map((post, i) => <PostCard key={post.id ?? i} post={post} />)
            : // Not connected yet — show styled placeholders (build-out preview).
              Array.from({ length: 3 }).map((_, i) => (
                <Placeholder
                  key={i}
                  label={`Instagram post ${i + 1} — feed TK`}
                  alt={`Recent WinPro window cleaning job in Southern Utah — Instagram photo ${i + 1}, coming soon`}
                  ratio="square"
                  className="rounded-2xl"
                />
              ))}
        </div>
      </Container>
    </section>
  );
}

function PostCard({ post }: { post: BeholdPost }) {
  const img = post.thumbnailUrl || post.mediaUrl;
  const alt = post.caption?.slice(0, 120) || "Instagram post from WinPro";
  const caption = post.caption || "";

  // Truncate caption to ~150 chars for display
  const displayCaption = caption.length > 150
    ? caption.slice(0, 150).trim() + "..."
    : caption;

  return (
    <a
      href={post.permalink || site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Instagram-style header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-icon.png"
              alt="WinPro"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">winprollc</p>
          <p className="text-xs text-ink/50">Southern Utah</p>
        </div>
        <InstagramLogo className="h-5 w-5 text-ink/70" />
      </div>

      {/* Post image */}
      <div className="relative aspect-square overflow-hidden bg-cloud">
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
      </div>

      {/* Instagram-style action bar */}
      <div className="flex items-center gap-4 px-4 py-3">
        <HeartIcon className="h-6 w-6 text-ink/80" />
        <CommentIcon className="h-6 w-6 text-ink/80" />
        <SendIcon className="h-6 w-6 text-ink/80" />
      </div>

      {/* Caption */}
      {displayCaption && (
        <div className="px-4 pb-4">
          <p className="text-sm text-ink">
            <span className="font-semibold">winprollc</span>{" "}
            <span className="text-ink/80">{displayCaption}</span>
          </p>
        </div>
      )}
    </a>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
