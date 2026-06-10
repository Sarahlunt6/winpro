"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for sequential items. */
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * The one and only scroll-reveal pattern (§4 Motion): fade-up, 300ms, once.
 * Uses IntersectionObserver and unobserves after the first reveal. CSS handles
 * the prefers-reduced-motion case (see globals.css) — content is always present.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: cn("reveal", visible && "is-visible", className),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
