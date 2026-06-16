"use client";

import { useEffect, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { galleryItems, type GalleryItem } from "@/data/gallery";

/**
 * Gallery grid with a lightbox (§5.4). Lightbox traps focus lightly, closes on
 * Escape / backdrop click, and restores scroll.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<GalleryItem | null>(null);

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
      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative overflow-hidden rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            aria-label={`View ${item.label}`}
          >
            <Placeholder
              label={item.label}
              alt={item.label}
              ratio="square"
              src={item.image}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
          </button>
        ))}
      </div>


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
              alt={active.label}
              ratio="wide"
              className="rounded-2xl"
              src={active.image}
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="mt-3 flex items-center justify-between text-white">
              <p className="text-sm font-medium">
                {active.label}
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
