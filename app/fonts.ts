import { Poppins, Inter } from "next/font/google";

// Display: rounded, friendly sans-serif with bold weights (§4).
export const display = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

// Body: Inter, weights 400/500/600, generous line-height (§4).
export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});
