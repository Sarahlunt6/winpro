import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  // Heading level for correct document outline (§8 a11y). Visual size stays constant.
  as?: "h2" | "h3";
};

/** Consistent section header: optional eyebrow, headline, optional lede. Sentence case (§4). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-sky">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl font-bold leading-[1.1] sm:text-4xl">{title}</Tag>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-ink/70">{description}</p>
      )}
    </div>
  );
}
