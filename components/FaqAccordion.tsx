import type { ServiceFaq } from "@/data/services";

/**
 * FAQ accordion (§5.2). Built on native <details>/<summary>: accessible and fully
 * functional with no JS, and the marker rotation respects prefers-reduced-motion
 * via the global CSS (transitions disabled under the reduce query).
 */
export function FaqAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[17px] font-semibold text-ink marker:content-none">
            {faq.question}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cloud text-ink/60 transition-transform duration-200 group-open:rotate-45">
              <PlusIcon />
            </span>
          </summary>
          <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink/70">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
