"use client";

import { useCallback, useState } from "react";
import { reviews } from "@/data/reviews";
import { cn } from "@/lib/cn";

/**
 * Reviews carousel for the reviews page: shows 3 review cards at a time on desktop,
 * 1 on mobile. Supports manual navigation with arrow buttons.
 */
export function ReviewsPageCarousel() {
  // On desktop we show 3 cards, on mobile we show 1
  // For simplicity, we'll paginate by single review and show 3 at a time
  const [startIndex, setStartIndex] = useState(0);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < reviews.length - 1;

  const prev = useCallback(() => {
    if (canGoPrev) setStartIndex((i) => i - 1);
  }, [canGoPrev]);

  const next = useCallback(() => {
    if (canGoNext) setStartIndex((i) => i + 1);
  }, [canGoNext]);

  // Get the visible reviews (up to 3 starting from startIndex)
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  return (
    <div>
      {/* Navigation header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GoogleIcon />
          <span className="text-sm font-medium text-ink/60">
            {reviews.length} Google Reviews
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={!canGoPrev}
            aria-label="Previous reviews"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 transition-colors",
              canGoPrev
                ? "text-ink hover:bg-cloud"
                : "cursor-not-allowed text-ink/30"
            )}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext}
            aria-label="Next reviews"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 transition-colors",
              canGoNext
                ? "text-ink hover:bg-cloud"
                : "cursor-not-allowed text-ink/30"
            )}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Reviews grid - 1 col on mobile, 3 on lg */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStartIndex(i)}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === startIndex ? "true" : undefined}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              i === startIndex ? "bg-sky w-4" : "bg-ink/20 hover:bg-ink/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mt-4 flex-1 text-ink/80">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <footer className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-light text-sm font-bold text-ink">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-ink">{review.name}</p>
          <p className="text-sm text-ink/50">Google Review</p>
        </div>
      </footer>
    </article>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={cn("h-4 w-4", filled ? "text-amber-400" : "text-ink/20")}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
