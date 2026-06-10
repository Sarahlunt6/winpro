"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background video (client-supplied job footage).
 * - Autoplays muted/looping/inline so mobile browsers allow it.
 * - Respects prefers-reduced-motion (§4): if the user opts out of motion, we never
 *   autoplay — we show the first frame as a still via a paused, poster-less video,
 *   falling back to a solid ink wash so hero text stays legible.
 * The glass overlay for text contrast (§4) is rendered by the parent Hero.
 */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      const v = videoRef.current;
      if (!v) return;
      if (e.matches) v.pause();
      else void v.play().catch(() => {});
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-ink">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
