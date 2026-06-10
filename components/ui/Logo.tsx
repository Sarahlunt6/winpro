import { cn } from "@/lib/cn";

/**
 * Interim wordmark. Inherits text color from its parent (so it works on light and
 * dark backgrounds); the "Pro" accent is always sky. The client will supply final
 * logo files (SVG preferred, §12) — swap this component's internals then.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-2xl font-extrabold tracking-tight",
        className,
      )}
    >
      Win
      <span className="text-sky">Pro</span>
    </span>
  );
}
