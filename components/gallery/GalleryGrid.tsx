"use client";

import { useEffect, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/cn";
import {
  galleryCategories,
  galleryItems,
  type GalleryItem,
} from "@/data/gallery";

const filters = ["All", ...galleryCategories] as const;
type Filter = (typeof filters)[number];

/**
 * Filterable gallery grid with a lightbox (§5.4). Filtering is client-side (no
 * page reload). Lightbox traps focus lightly, closes on Escape / backdrop click,
 * and restores scroll. Real photos swap into the same 1:1 slots later.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // Lock scroll + close on Escape while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-[44px] rounded-full border px-5 text-[15px] font-medium transition-colors",
              filter === f
                ? "border-sky bg-sky text-white"
                : "border-ink/15 text-ink/75 hover:border-ink/30",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative overflow-hidden rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            aria-label={`View ${item.label}`}
          >
            <Placeholder
              label={item.label}
              alt={`${item.label} — ${item.category} window cleaning project by WinPro, photo coming soon`}
              ratio="square"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
              {item.category}
            </span>
            <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-ink/60">Nothing here yet — check back soon.</p>
      )}

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Placeholder
              label={active.label}
              alt={`${active.label} — ${active.category} window cleaning project by WinPro, photo coming soon`}
              ratio="wide"
              className="rounded-2xl"
            />
            <div className="mt-3 flex items-center justify-between text-white">
              <p className="text-sm font-medium">
                {active.label} · {active.category}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
