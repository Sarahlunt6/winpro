import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Multi-step quote form — STUB for Phase 1 (§6). The real component is the core
 * lead-gen feature and is built in Phase 2.
 *
 * TODO (Phase 2): Build the custom multi-step form (no third-party plugin, §6).
 *   Steps (1–2 questions each):
 *     1. What do you need?  — service multi-select (5 service cards) + property type
 *     2. About the job      — window count range + recurring plan (prefill from ?plan=)
 *     3. Where?             — street address + city
 *     4. Who?               — name + phone
 *     5. Last step          — email + optional notes → Submit
 *   UX: progress bar, back button, Enter advances, autofocus first field per step,
 *       48px+ touch targets, numeric keyboard for phone, inline validation (no alerts),
 *       state preserved on back, honeypot + rate limiting, optimistic redirect to /thank-you.
 *   Delivery: POST /api/quote → Resend. Owner email QUOTE_TO_EMAIL (confirm winpro363@gmail.com),
 *       subject "New Quote Request — {Name} ({City})". Env: RESEND_API_KEY, QUOTE_TO_EMAIL.
 *
 * This stub renders the section shell so the Home layout and CTAs are complete now.
 */
export function QuoteForm() {
  return (
    <section id="quote" className="scroll-mt-24 bg-cloud py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <SectionHeading
            align="center"
            eyebrow="Free quote"
            title="Get your free quote in under a minute"
            description="A few quick questions about your windows and we'll get you a price. No pressure, no spam."
          />
          {/* Placeholder for the multi-step form built in Phase 2. */}
          <div className="mt-8 rounded-2xl border border-dashed border-ink/15 bg-cloud px-6 py-10 text-sm font-medium text-ink/50">
            Multi-step quote form — built in Phase 2 (§6)
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/quote" size="lg" className="w-full sm:w-auto">
              Start your quote
            </Button>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-[52px] items-center justify-center px-2 text-base font-medium text-ink/70 underline-offset-4 hover:text-ink hover:underline"
            >
              or call {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
