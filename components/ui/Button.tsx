import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

// One accent (sky), solid fills only — no gradients (§4).
const variants: Record<Variant, string> = {
  primary: "bg-sky text-white hover:bg-[#3D93C2]",
  secondary: "bg-ink text-white hover:bg-[#0F1822]",
  ghost: "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-cloud",
};

// 48px+ touch targets for the lead-gen CTAs (§6 UX).
const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-5 text-base",
  lg: "min-h-[52px] px-7 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** When provided, renders a Next <Link>; otherwise a <button>. */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

/** Shared CTA primitive. Renders a Next <Link> when given `href`, else a <button>. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
