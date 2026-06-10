"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background video (client-supplied job footage, compressed to a
 * 720p ~4MB MP4 with a poster frame).
 * - Autoplays muted/looping/inline so mobile browsers allow it.
 * - `poster` (hero-poster.jpg) paints instantly and is the still shown to
 *   prefers-reduced-motion users, who never get autoplay (§4). Without autoplay the
 *   browser won't download the full video, so motion-reduced visitors save the bytes.
 * - Solid ink wash underneath as the ultimate fallback. The glass overlay for text
 *   contrast (§4) is rendered by the parent Hero.
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
        poster="/video/hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
