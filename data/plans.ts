// Single source of truth for maintenance plans (§5.3, §9).
// Pricing is intentionally omitted (§11). The card component reads the optional
// `price` field, so pricing can be flipped on later with no redesign.

export type Plan = {
  slug: "monthly" | "quarterly" | "bi-annual";
  name: string;
  frequency: string;
  whoFor: string;
  benefits: string[];
  // Optional — withheld for v1. Flip on later without touching the layout.
  price?: string;
  // Discount off one-time pricing (e.g., "$100 off").
  discount?: string;
  // Quarterly is the typical sweet spot for Southern Utah homes.
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "monthly",
    name: "Monthly",
    frequency: "Every month",
    whoFor:
      "Storefronts, restaurants, and homes that want glass that's always guest-ready.",
    benefits: [
      "Windows never get a chance to look dirty",
      "Top priority on the schedule",
      "Best per-visit rate of any plan",
      "Consistent crew that knows your property",
    ],
    discount: "$100 off",
  },
  {
    slug: "quarterly",
    name: "Quarterly",
    frequency: "Every 3 months",
    whoFor:
      "The most popular choice for Southern Utah homes — keeps up with our dust and hard water.",
    benefits: [
      "Stays ahead of dust and hard-water buildup",
      "Priority scheduling over one-time jobs",
      "Discounted plan-member rate",
      "We track your visits so you never have to",
    ],
    discount: "$75 off",
    featured: true,
  },
  {
    slug: "bi-annual",
    name: "Bi-Annual",
    frequency: "Twice a year",
    whoFor:
      "Homeowners who want a reliable spring and fall refresh without thinking about it.",
    benefits: [
      "Spring and fall deep cleans, handled for you",
      "Plan-member rate over one-time pricing",
      "Easy to upgrade if you want more visits",
      "A standing reminder so it never slips",
    ],
    discount: "$50 off",
  },
];

export const getPlan = (slug: string): Plan | undefined =>
  plans.find((plan) => plan.slug === slug);
