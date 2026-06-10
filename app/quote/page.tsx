import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Get a free, no-pressure quote for window cleaning in St. George and Southern Utah. A few quick questions and we'll get you a price.",
};

// /quote (§6). The real multi-step form replaces the QuoteForm stub in Phase 2.
export default function QuotePage() {
  return <QuoteForm />;
}
