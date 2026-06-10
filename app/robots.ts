import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const BASE_URL = `https://${site.domain}`;

// robots.txt (§8). Allow crawling; keep API + the noindex thank-you page out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
