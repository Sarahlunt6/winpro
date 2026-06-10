"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  emptyQuote,
  planInterests,
  propertyTypes,
  serviceOptions,
  windowCounts,
  validateStep,
  TOTAL_STEPS,
  type FieldErrors,
  type QuoteData,
} from "@/lib/quote";

const STEP_TITLES = [
  "What do you need?",
  "About the job",
  "Where are we headed?",
  "Who should we contact?",
  "Last step",
];

type QuoteFormProps = {
  /** Preselected plan interest (from /quote?plan=…). */
  defaultPlanInterest?: QuoteData["planInterest"];
};

/**
 * Multi-step quote form (§6). Custom-built, no third-party plugin.
 * Progress bar · back button · Enter advances · autofocus per step · inline
 * validation (never alerts) · state preserved on back · honeypot · 48px+ targets.
 * On success: redirect to /thank-you.
 */
export function QuoteForm({ defaultPlanInterest = "None" }: QuoteFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({
    ...emptyQuote,
    planInterest: defaultPlanInterest,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const autofocusRef = useRef<HTMLElement | null>(null);

  // Autofocus the first field of each step (§6 UX).
  useEffect(() => {
    autofocusRef.current?.focus();
  }, [step]);

  const update = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (slug: string) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(slug)
        ? d.services.filter((s) => s !== slug)
        : [...d.services, slug],
    }));
    if (errors.services) setErrors((e) => ({ ...e, services: undefined }));
  };

  const goBack = () => {
    setSubmitError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const advance = async () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      await submit();
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      router.push("/thank-you");
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  // Enter advances — except inside the multiline notes field (§6 UX).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !(e.target as HTMLElement).matches("textarea")) {
      e.preventDefault();
      if (!submitting) advance();
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink/60">
          <span>
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          <span>{STEP_TITLES[step]}</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-cloud"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          aria-label="Quote progress"
        >
          <div
            className="h-full rounded-full bg-sky transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form
        onKeyDown={onKeyDown}
        onSubmit={(e) => {
          e.preventDefault();
          if (!submitting) advance();
        }}
        noValidate
      >
        {/* Honeypot: off-screen, not announced, not tabbable (§6 spam). */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <h2 className="font-display text-2xl font-bold text-ink">{STEP_TITLES[step]}</h2>

        <div className="mt-6 min-h-[18rem]">
          {step === 0 && (
            <div className="space-y-6">
              <Field label="Which services?" error={errors.services}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {serviceOptions.map((opt, i) => {
                    const selected = data.services.includes(opt.slug);
                    return (
                      <button
                        key={opt.slug}
                        type="button"
                        ref={i === 0 ? (autofocusRef as React.Ref<HTMLButtonElement>) : undefined}
                        aria-pressed={selected}
                        onClick={() => toggleService(opt.slug)}
                        className={cn(
                          "flex min-h-[52px] items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-colors",
                          selected
                            ? "border-sky bg-sky-light/40 text-ink"
                            : "border-ink/15 text-ink/80 hover:border-ink/30",
                        )}
                      >
                        <span>{opt.name}</span>
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                            selected ? "border-sky bg-sky text-white" : "border-ink/25",
                          )}
                        >
                          {selected && <CheckMini />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Property type" error={errors.propertyType}>
                <div className="flex flex-wrap gap-3">
                  {propertyTypes.map((type) => (
                    <Chip
                      key={type}
                      selected={data.propertyType === type}
                      onClick={() => update("propertyType", type)}
                    >
                      {type}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Roughly how many windows?" error={errors.windowCount}>
                <select
                  ref={autofocusRef as React.Ref<HTMLSelectElement>}
                  value={data.windowCount}
                  onChange={(e) => update("windowCount", e.target.value as QuoteData["windowCount"])}
                  className="h-[52px] w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] text-ink focus:border-sky"
                >
                  <option value="" disabled>
                    Select a range…
                  </option>
                  {windowCounts.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Interested in a recurring plan?"
                hint="Optional — plan members get priority scheduling and a better rate."
              >
                <div className="flex flex-wrap gap-3">
                  {planInterests.map((p) => (
                    <Chip
                      key={p}
                      selected={data.planInterest === p}
                      onClick={() => update("planInterest", p)}
                    >
                      {p}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="Street address" error={errors.address}>
                <TextInput
                  inputRef={autofocusRef as React.Ref<HTMLInputElement>}
                  value={data.address}
                  onChange={(v) => update("address", v)}
                  autoComplete="street-address"
                  placeholder="123 Red Rock Dr"
                />
              </Field>
              <Field label="City" error={errors.city}>
                <TextInput
                  value={data.city}
                  onChange={(v) => update("city", v)}
                  autoComplete="address-level2"
                  placeholder="St. George"
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label="Your name" error={errors.name}>
                <TextInput
                  inputRef={autofocusRef as React.Ref<HTMLInputElement>}
                  value={data.name}
                  onChange={(v) => update("name", v)}
                  autoComplete="name"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <TextInput
                  value={data.phone}
                  onChange={(v) => update("phone", v)}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(435) 555-0123"
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <Field label="Email" error={errors.email}>
                <TextInput
                  inputRef={autofocusRef as React.Ref<HTMLInputElement>}
                  value={data.email}
                  onChange={(v) => update("email", v)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                />
              </Field>
              <Field label="Anything else?" hint="Optional — gate codes, pets, timing, etc.">
                <textarea
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink focus:border-sky"
                  placeholder="Tell us anything that helps us quote accurately."
                />
              </Field>
            </div>
          )}
        </div>

        {submitError && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {submitError}
          </p>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={submitting}
              className="inline-flex min-h-[48px] items-center gap-1 rounded-full px-4 text-[15px] font-medium text-ink/70 hover:text-ink disabled:opacity-50"
            >
              <ArrowLeft />
              Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-sky px-7 text-base font-medium text-white transition-colors hover:bg-[#3D93C2] disabled:opacity-60"
          >
            {step < TOTAL_STEPS - 1 ? "Continue" : submitting ? "Sending…" : "Get my quote"}
            {step < TOTAL_STEPS - 1 && <ArrowRight />}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- small field primitives, local to the form ---------- */

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink">{label}</label>
      {hint && <p className="mt-0.5 text-sm text-ink/55">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  inputRef,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <input
      ref={inputRef}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[52px] w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] text-ink placeholder:text-ink/35 focus:border-sky"
    />
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-[48px] rounded-full border px-5 text-[15px] font-medium transition-colors",
        selected
          ? "border-sky bg-sky text-white"
          : "border-ink/15 text-ink/80 hover:border-ink/30",
      )}
    >
      {children}
    </button>
  );
}

function CheckMini() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
