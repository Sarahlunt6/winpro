// Single source of truth for business NAP, nav, and social.
// Used by Header, Footer, metadata, and (later) LocalBusiness JSON-LD (§8).

export const site = {
  name: "WinPro",
  legalName: "WinPro LLC",
  tagline: "Window cleaning for St. George & Southern Utah",
  phone: "(435) 406-4455",
  phoneHref: "tel:+14354064455",
  // Owner inbox for quote requests — client-confirmed (§6, §12).
  quoteEmail: "winprollc363@gmail.com",
  instagram: {
    handle: "@winprollc",
    url: "https://instagram.com/winprollc",
  },
  googleRating: {
    value: "4.9",
    label: "4.9 stars on Google",
    // TODO: link to the real Google Business Profile reviews URL before launch.
    url: "#",
  },
  domain: "dirtywinpro.com",
} as const;

// Cities served — Southern Utah (§3 footer, §5.5).
export const areasServed = [
  "St. George",
  "Washington",
  "Hurricane",
  "Santa Clara",
  "Ivins",
  "Cedar City",
] as const;

// Header nav. "Services" renders as a dropdown of the service pages (§3).
export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Plans", href: "/plans" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

// Trust strip — shown once, in the CTA band only (§5.1 #8).
export const trustPoints = [
  "Licensed & Insured",
  "Eco-Friendly",
  "Southern Utah Local",
] as const;
