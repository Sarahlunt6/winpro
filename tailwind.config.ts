import type { Config } from "tailwindcss";

// Palette + type tokens are the single source of truth for the design system.
// See winpro-redesign-prd.md §4. One accent only (sky). No gradients.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16202E", // Headlines, footer bg
        sky: {
          DEFAULT: "#4FA8D8", // Primary actions, links
          light: "#BFE3F5", // Tints, hover states, section accents
        },
        cloud: "#F6F9FB", // Alternating section backgrounds
        glass: "rgba(22,32,46,0.55)", // Photo overlays for text legibility
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      // Exact aspect ratios so swapping in final photos is zero-layout-shift (§4).
      aspectRatio: {
        card: "4 / 5", // service cards
        hero: "16 / 9", // hero
        square: "1 / 1", // gallery
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 300ms ease-out both",
        "fade-in": "fade-in 400ms ease-out both",
      },
      maxWidth: {
        container: "80rem", // 1280px content cap
      },
    },
  },
  plugins: [],
};
export default config;
