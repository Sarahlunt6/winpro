"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SlideContent = {
  /** Label for the placeholder block (Phase 1) — replaced by a real <Image> later. */
  label: string;
  /** Background tone so the two halves read as distinct shots. */
  tone: "dirty" | "clean";
};

type BeforeAfterSliderProps = {
  before: SlideContent;
  after: SlideContent;
  className?: string;
  /** Aspect ratio of the frame. Defaults to 16:9 to match the hero (§4). */
  ratioClassName?: string;
};

/**
 * The signature element (§4): a draggable divider over a before/after window shot.
 * Custom React, no library. Works with mouse, touch, and keyboard. Respects
 * prefers-reduced-motion (the handle never auto-animates; transitions are disabled
 * globally under the reduce query). Built to work in Phase 1 with placeholder fills
 * and swap in real <Image>s later with zero markup changes.
 */
export function BeforeAfterSlider({
  before,
  after,
  className,
  ratioClassName = "aspect-hero",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percent revealed of "after"
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Pointer Events unify mouse + touch + pen and give us implicit capture.
  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const stop = () => setDragging(false);

  // Keyboard support: arrows nudge, Home/End jump (§8 a11y).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPosition(100);
      e.preventDefault();
    }
  };

  // Disable page text-selection while dragging.
  useEffect(() => {
    if (!dragging) return;
    const prev = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = prev;
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full select-none overflow-hidden rounded-2xl ring-1 ring-ink/10",
        ratioClassName,
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* AFTER layer (full, sits underneath) */}
      <SlideFill content={after} corner="bottom-left" badge="After" />

      {/* BEFORE layer, clipped to the slider position (sits on top) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <SlideFill content={before} corner="bottom-right" badge="Before" />
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(22,32,46,0.15)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg ring-1 ring-ink/10 focus-visible:ring-2 focus-visible:ring-sky"
        >
          <ChevronsIcon />
        </button>
      </div>
    </div>
  );
}

function SlideFill({
  content,
  corner,
  badge,
}: {
  content: SlideContent;
  corner: "bottom-left" | "bottom-right";
  badge: string;
}) {
  // Placeholder fills (Phase 1). "dirty" reads muted/gray, "clean" reads bright sky-tint,
  // so the comparison is legible before real photos exist.
  const tone =
    content.tone === "dirty"
      ? "bg-[#9aa6b2] text-white/80"
      : "bg-sky-light text-ink/55";

  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", tone)}>
      <span className="px-6 text-center text-sm font-medium uppercase tracking-wide">
        {content.label}
      </span>
      <span
        className={cn(
          "absolute bottom-3 rounded-full bg-glass px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm",
          corner === "bottom-left" ? "left-3" : "right-3",
        )}
      >
        {badge}
      </span>
    </div>
  );
}

function ChevronsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 7l-5 5 5 5" />
      <path d="M15 7l5 5-5 5" />
    </svg>
  );
}
