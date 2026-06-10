import { cn } from "@/lib/cn";

type Ratio = "hero" | "card" | "square" | "wide";

// Exact aspect ratios defined now so dropping in final photos is zero-layout-shift (§4).
const ratioClass: Record<Ratio, string> = {
  hero: "aspect-hero", // 16:9
  card: "aspect-card", // 4:5
  square: "aspect-square", // 1:1
  wide: "aspect-[3/2]",
};

type PlaceholderProps = {
  /** Caption shown in the block, e.g. "Exterior cleaning — photo TK". */
  label: string;
  ratio?: Ratio;
  className?: string;
  /** Render darker tint for use under light overlay text. */
  tone?: "cloud" | "ink";
  /**
   * Accessible name (§8 #5). Describes what the FINAL photo will show, so swapping
   * in a real image is a no-op for screen readers. Defaults to `label`.
   */
  alt?: string;
  /** Mark purely decorative (e.g. when an adjacent heading already names it). */
  decorative?: boolean;
};

/**
 * The interim image system (§4): a solid cloud-colored block with a camera glyph
 * and a label. NOT stock photos, NOT via.placeholder.com. Every real <img> later
 * swaps into a slot with the exact same aspect ratio, so nothing shifts.
 */
export function Placeholder({
  label,
  ratio = "card",
  className,
  tone = "cloud",
  alt,
  decorative = false,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={decorative ? undefined : alt || label}
      aria-hidden={decorative || undefined}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        ratioClass[ratio],
        tone === "cloud"
          ? "bg-cloud text-ink/45 ring-1 ring-inset ring-ink/5"
          : "bg-ink text-white/45",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <CameraIcon className="h-7 w-7 opacity-70" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1.2-1.8A1 1 0 0 1 8.5 4.7h7a1 1 0 0 1 .8.5L17.5 7h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}
