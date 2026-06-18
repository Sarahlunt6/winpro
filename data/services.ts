// Single source of truth for service content (§9). Powers the Home services grid,
// the /services overview, and the per-service template at /services/[slug] (Phase 3).
//
// Copy here is a solid starting base written from the PRD's intent (§5.2). The PRD
// notes the current WordPress site has stronger production copy to port in during
// Phase 4 — swap `included`/`faqs`/`valueProp` then. Structure stays the same.

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string; // full service name (H1, cards)
  navLabel: string; // shorter label for the Services dropdown
  // One-line value prop, used as the card overlay subtext and the service-page hero line.
  valueProp: string;
  // Placeholder label shown in the cloud block until real photos arrive (§4).
  placeholderLabel: string;
  // Final photo for this service (hero). Drop a file in /public (e.g. "/photos/exterior.jpg")
  // and set it here — the Placeholder swaps to next/image with zero layout shift.
  image?: string;
  // Secondary image for the "What's included" section on service pages.
  sectionImage?: string;
  // Additional images for the service page gallery section.
  images?: string[];
  seasonal?: boolean; // Christmas Lights gets a "Seasonal" tag (§5.1 #3)
  // Extra framing for seasonal services (Christmas Lights install/takedown, §5.2).
  seasonalCallout?: {
    title: string;
    body: string;
    bookingNote: string;
  };
  // What's included — 3–4 benefit blocks for the 2-col service page section (§5.2).
  included: ServiceBenefit[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "exterior-window-cleaning",
    name: "Exterior window cleaning",
    navLabel: "Exterior cleaning",
    valueProp:
      "Streak-free glass, frames, and sills — washed by hand and finished spotless.",
    placeholderLabel: "Exterior cleaning — photo TK",
    image: "/photos/exterior-pool.jpg",
    sectionImage: "/photos/action-water-pole.png",
    images: [
      "/photos/outdoor-2.jpg",
      "/photos/outdoor-3.jpg",
      "/photos/exterior-1.jpg",
      "/photos/exterior-2.jpg",
      "/photos/exterior-3.jpg",
      "/photos/exterior-4.jpg",
      "/photos/exterior-pool.jpg",
      "/photos/exterior-water-pole.jpg",
      "/photos/outdoor-hard-reach.jpg",
      "/photos/action-water-pole.png",
      "/photos/action-employees.jpg",
    ],
    included: [
      {
        title: "Glass washed by hand",
        description:
          "Every pane hand-scrubbed and squeegeed — no spray-and-pray, no leftover streaks in the morning light.",
      },
      {
        title: "Frames, tracks & sills",
        description:
          "We wipe down frames and clear the sills so the whole window looks clean, not just the glass.",
      },
      {
        title: "Hard-water spot treatment",
        description:
          "Southern Utah water leaves mineral spots. We treat them so the glass actually comes clean.",
      },
      {
        title: "Safe on every story",
        description:
          "Pure-water poles and proper ladder work for second-story and hard-to-reach windows.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my exterior windows cleaned?",
        answer:
          "Most St. George homes look best on a quarterly schedule — our dust and hard water build up fast. Ask about a maintenance plan to keep them clear year-round.",
      },
      {
        question: "Do you clean screens too?",
        answer:
          "Screen cleaning is a separate service so you only pay for what you need — we can bundle it with your exterior clean.",
      },
      {
        question: "What if it rains after you clean?",
        answer:
          "Clean glass sheds rain without spotting. A normal rain won't undo the work — it's dust and sprinklers that leave marks.",
      },
    ],
  },
  {
    slug: "interior-window-cleaning",
    name: "Interior window cleaning",
    navLabel: "Interior cleaning",
    valueProp:
      "Clear glass from the inside out, with your floors and furniture protected the whole time.",
    placeholderLabel: "Interior cleaning — photo TK",
    image: "/photos/indoor-2.jpg",
    sectionImage: "/photos/indoor-1.jpg",
    images: [
      "/photos/indoor-3.jpg",
    ],
    included: [
      {
        title: "Inside glass detailed",
        description:
          "Fingerprints, pet noses, and cooking film wiped away for glass that's clear from both sides.",
      },
      {
        title: "Sills & tracks vacuumed",
        description:
          "We clear the dust, dead bugs, and grit out of the tracks — the part most cleaners skip.",
      },
      {
        title: "Floors & furniture protected",
        description:
          "Drop cloths and shoe covers come standard. We leave your home exactly as we found it, only brighter.",
      },
    ],
    faqs: [
      {
        question: "Do I need to move furniture before you arrive?",
        answer:
          "Just give us a clear path to the windows — we'll handle careful moving of anything light and put it right back.",
      },
      {
        question: "Can you do interior and exterior in one visit?",
        answer:
          "Yes, and it's the most popular option. One visit, every window clear inside and out.",
      },
    ],
  },
  {
    slug: "screen-cleaning",
    name: "Screen cleaning",
    navLabel: "Screen cleaning",
    valueProp:
      "Window screens removed, deep-cleaned, and reset so more light and air gets in.",
    placeholderLabel: "Screen cleaning — photo TK",
    image: "/photos/outdoor-2.jpg",
    sectionImage: "/photos/action-employees.jpg",
    included: [
      {
        title: "Removed & hand-cleaned",
        description:
          "Screens come out, get washed free of dust and pollen, and go back in their original openings.",
      },
      {
        title: "More light, cleaner air",
        description:
          "Clogged screens dim every room and trap allergens. Clean mesh brightens the whole window.",
      },
      {
        title: "Frames checked",
        description:
          "We flag bent frames or torn mesh while they're out, so you can repair before it gets worse.",
      },
    ],
    faqs: [
      {
        question: "Will cleaning damage old or brittle screens?",
        answer:
          "We hand-wash gently and tell you up front if a screen is too fragile to clean safely.",
      },
      {
        question: "Can you clean screens without cleaning the windows?",
        answer:
          "Absolutely — book screens on their own or add them to a window cleaning visit.",
      },
    ],
  },
  {
    slug: "christmas-lights",
    name: "Christmas light install",
    navLabel: "Christmas lights",
    valueProp:
      "We design, hang, maintain, and take down your holiday lights — lights and labor included.",
    placeholderLabel: "Christmas lights — photo TK",
    image: "/photos/christmas-lights.jpg",
    sectionImage: "/photos/christmas-lights-2.jpg",
    seasonal: true,
    seasonalCallout: {
      title: "Install, maintenance, and takedown — all handled",
      body: "We hang it, we keep it lit, and we take it all down when the season's over. Commercial-grade lights and the labor are included, so you skip the ladder, the tangled boxes, and the January cleanup. Mid-season outage? We come back and fix it.",
      bookingNote: "Booking runs October through January. Install slots fill fast through November — reserve early.",
    },
    included: [
      {
        title: "We hang, maintain & remove",
        description:
          "Full service from install to takedown. If a strand fails mid-season, we come back out and fix it.",
      },
      {
        title: "Lights & labor included",
        description:
          "Commercial-grade lights are part of the package — no buying tangled boxes or climbing ladders yourself.",
      },
      {
        title: "Custom to your rooflines",
        description:
          "We measure and design to your home so the lines look clean and intentional, not draped on.",
      },
      {
        title: "Stored for next year",
        description:
          "After takedown we label and store your lights so reinstalling next season is quick and easy.",
      },
    ],
    faqs: [
      {
        question: "When should I book Christmas lights?",
        answer:
          "Booking runs October through January. Reserve early — install slots fill up fast through November.",
      },
      {
        question: "Do I own the lights or rent them?",
        answer:
          "Confirm with us at quote time — the package is built around lights and labor included, with takedown and storage handled.",
      },
      {
        question: "What if a light goes out during the season?",
        answer:
          "Maintenance is part of the service. If something fails, we come back and make it right.",
      },
    ],
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

// Shared "How it works" steps, reused across all service pages (§5.2).
export const howItWorks = [
  { step: "1", title: "Quote", description: "Tell us about your windows. We send a fast, free quote." },
  { step: "2", title: "Schedule", description: "Pick a time that works. We confirm and show up on time." },
  { step: "3", title: "Spotless", description: "We clean, you inspect, the glass is clear. That simple." },
] as const;
