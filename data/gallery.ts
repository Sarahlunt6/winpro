// Gallery items (§5.4). All job photos displayed in a single grid.

export type GalleryItem = {
  id: string;
  label: string;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", label: "Indoor window cleaning", image: "/photos/indoor-1.jpg" },
  { id: "g2", label: "Outdoor window cleaning", image: "/photos/outdoor-1.jpg" },
  { id: "g3", label: "Indoor window cleaning", image: "/photos/indoor-2.jpg" },
  { id: "g4", label: "Indoor window cleaning", image: "/photos/indoor-3.jpg" },
  { id: "g5", label: "Outdoor window cleaning", image: "/photos/outdoor-2.jpg" },
  { id: "g6", label: "Branded truck in front of home", image: "/photos/truck-home.jpg" },
  { id: "g7", label: "Outdoor window cleaning", image: "/photos/outdoor-3.jpg" },
  { id: "g8", label: "Action shot of two employees cleaning exterior of window with water pole", image: "/photos/action-water-pole.png" },
  { id: "g9", label: "Drone shot of branded truck outside of home", image: "/photos/drone-truck.jpg" },
  { id: "g10", label: "Further away drone shot of outside of nice home", image: "/photos/drone-home.jpg" },
  { id: "g11", label: "Outside window cleaning in hard to reach place", image: "/photos/outdoor-hard-reach.jpg" },
  { id: "g12", label: "Another action shot of water pole and 2 employees", image: "/photos/action-employees.jpg" },
  { id: "g13", label: "Exterior window cleaning", image: "/photos/exterior-1.jpg" },
  { id: "g14", label: "Far away shot of exterior window cleaning with pool in shot", image: "/photos/exterior-pool.jpg" },
  { id: "g15", label: "Another drone shot of branded truck and home", image: "/photos/drone-truck-2.jpg" },
  { id: "g16", label: "Exterior window cleaning with water pole", image: "/photos/exterior-water-pole.jpg" },
  { id: "g17", label: "Exterior window cleaning", image: "/photos/exterior-2.jpg" },
  { id: "g18", label: "Exterior window cleaning", image: "/photos/exterior-3.jpg" },
  { id: "g19", label: "Exterior window cleaning", image: "/photos/exterior-4.jpg" },
  { id: "g20", label: "Christmas lights", image: "/photos/christmas-lights.jpg" },
];
