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
  // Final photo path (file in /public). Set it and the tile swaps to next/image.
  image?: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", label: "Hillside home exterior", category: "Residential", image: "/photos/drone-home.jpg" },
  { id: "g2", label: "Branded truck at job site", category: "Commercial", image: "/photos/truck-home.jpg" },
  { id: "g3", label: "Exterior window cleaning", category: "Before & After", image: "/photos/exterior-1.jpg" },
  { id: "g4", label: "Two-story windows", category: "Residential", image: "/photos/outdoor-2.jpg" },
  { id: "g5", label: "Drone view of service", category: "Commercial", image: "/photos/drone-truck.jpg" },
  { id: "g6", label: "Poolside windows", category: "Before & After", image: "/photos/exterior-pool.jpg" },
  { id: "g7", label: "Desert modern home", category: "Residential", image: "/photos/outdoor-3.jpg" },
  { id: "g8", label: "Branded truck arrival", category: "Commercial", image: "/photos/drone-truck-2.jpg" },
  { id: "g9", label: "Hard-to-reach cleaning", category: "Before & After", image: "/photos/outdoor-hard-reach.jpg" },
  { id: "g10", label: "Interior window detail", category: "Residential", image: "/photos/indoor-2.jpg" },
  { id: "g11", label: "Team in action", category: "Commercial", image: "/photos/action-employees.jpg" },
  { id: "g12", label: "Exterior detail work", category: "Before & After", image: "/photos/exterior-2.jpg" },
];
