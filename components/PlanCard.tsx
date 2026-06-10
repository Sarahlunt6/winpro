import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Plan } from "@/data/plans";

/**
 * Plan card (§5.3): who it's for, what's included, benefit bullets, CTA → /quote
 * with the plan preselected via query param. Pricing is optional and withheld for
 * v1 (§11) — pass `plan.price` later to flip it on with no layout change.
 */
export function PlanCard({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-7",
        plan.featured ? "border-sky ring-1 ring-sky" : "border-ink/10",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
        {plan.featured && (
          <span className="rounded-full bg-sky-light px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
            Most popular
          </span>
        )}
      </div>

      <p className="mt-1 text-sm font-medium text-sky">{plan.frequency}</p>

      {/* Optional pricing slot — only renders when content is flipped on later. */}
      {plan.price && (
        <p className="mt-3 text-2xl font-bold text-ink">{plan.price}</p>
      )}

      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{plan.whoFor}</p>

      {!compact && (
        <ul className="mt-5 space-y-3 text-[15px] text-ink/80">
          {plan.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2.5">
              <Check />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <Button
          href={`/quote?plan=${plan.slug}`}
          variant={plan.featured ? "primary" : "ghost"}
          className="w-full"
        >
          Get a custom quote
        </Button>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
