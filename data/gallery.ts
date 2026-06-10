// Gallery items (§5.4). Placeholder slots for now — real job photos drop in later
// at the same 1:1 ratio with zero layout shift. Categories drive the client filter.

export const galleryCategories = [
  "Residential",
  "Commercial",
  "Before & After",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  label: string;
  category: GalleryCategory;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", label: "Hillside home exterior", category: "Residential" },
  { id: "g2", label: "Storefront glass", category: "Commercial" },
  { id: "g3", label: "Hard-water removal", category: "Before & After" },
  { id: "g4", label: "Two-story windows", category: "Residential" },
  { id: "g5", label: "Office building", category: "Commercial" },
  { id: "g6", label: "Patio doors", category: "Before & After" },
  { id: "g7", label: "Desert modern home", category: "Residential" },
  { id: "g8", label: "Restaurant front", category: "Commercial" },
  { id: "g9", label: "Screen clean", category: "Before & After" },
  { id: "g10", label: "Sunroom glass", category: "Residential" },
  { id: "g11", label: "Retail entrance", category: "Commercial" },
  { id: "g12", label: "Skylight detail", category: "Before & After" },
];
