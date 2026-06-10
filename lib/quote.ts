// Shared contract for the quote form and the /api/quote route (§6).
// Importing the same types + validators on both sides keeps client and server in sync.

import { services } from "@/data/services";
import { plans } from "@/data/plans";

export const propertyTypes = ["Residential", "Commercial"] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const windowCounts = [
  "1–10 windows",
  "11–20 windows",
  "21–30 windows",
  "31–50 windows",
  "50+ windows",
  "Not sure",
] as const;
export type WindowCount = (typeof windowCounts)[number];

// Plan interest: "None" plus the three plan names. Prefilled from /quote?plan=… (§5.3, §6).
export const planInterests = ["None", ...plans.map((p) => p.name)] as const;
export type PlanInterest = (typeof planInterests)[number];

// Service options for the multi-select cards — derived from the single source of truth.
export const serviceOptions = services.map((s) => ({
  slug: s.slug,
  name: s.name,
  seasonal: Boolean(s.seasonal),
}));

export type QuoteData = {
  services: string[]; // service slugs
  propertyType: PropertyType | "";
  windowCount: WindowCount | "";
  planInterest: PlanInterest;
  address: string;
  city: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  // Honeypot — must stay empty. Bots fill it; real users never see it (§6 spam).
  company: string;
};

export const emptyQuote: QuoteData = {
  services: [],
  propertyType: "",
  windowCount: "",
  planInterest: "None",
  address: "",
  city: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
  company: "",
};

/** Map a ?plan= query value to a PlanInterest, or "None" if unrecognized. */
export function planSlugToInterest(slug: string | undefined | null): PlanInterest {
  if (!slug) return "None";
  const match = plans.find((p) => p.slug === slug);
  return (match?.name as PlanInterest) ?? "None";
}

export const PHONE_RE = /^[0-9+()\-.\s]{10,}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Partial<Record<keyof QuoteData, string>>;

// Validate a single step (0-indexed). Returns field-keyed messages for inline display.
export function validateStep(step: number, data: QuoteData): FieldErrors {
  const e: FieldErrors = {};
  switch (step) {
    case 0:
      if (data.services.length === 0) e.services = "Pick at least one service.";
      if (!data.propertyType) e.propertyType = "Choose residential or commercial.";
      break;
    case 1:
      if (!data.windowCount) e.windowCount = "Give us a rough count.";
      break;
    case 2:
      if (!data.address.trim()) e.address = "Enter the street address.";
      if (!data.city.trim()) e.city = "Enter the city.";
      break;
    case 3:
      if (!data.name.trim()) e.name = "Tell us your name.";
      if (!PHONE_RE.test(data.phone.trim())) e.phone = "Enter a valid phone number.";
      break;
    case 4:
      if (!EMAIL_RE.test(data.email.trim())) e.email = "Enter a valid email.";
      break;
  }
  return e;
}

export const TOTAL_STEPS = 5;

// Full-payload validation for the server — runs every step's rules.
export function validateAll(data: QuoteData): FieldErrors {
  return Array.from({ length: TOTAL_STEPS }).reduce<FieldErrors>(
    (acc, _, step) => ({ ...acc, ...validateStep(step, data) }),
    {},
  );
}

/** Resolve service slugs to display names for the email summary. */
export function serviceNames(slugs: string[]): string[] {
  return slugs.map((slug) => services.find((s) => s.slug === slug)?.name ?? slug);
}
