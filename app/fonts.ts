import { Bricolage_Grotesque, Inter } from "next/font/google";

// Display: a confident grotesque with character — weights 600–800, tight tracking (§4).
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

// Body: Inter, weights 400/500/600, generous line-height (§4).
export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});
