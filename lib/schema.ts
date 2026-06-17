// JSON-LD structured data builders (§8). Shapes follow schema.org.
import { site, areasServed } from "@/data/site";
import type { Service, ServiceFaq } from "@/data/services";
import type { Review } from "@/data/reviews";

const BASE_URL = `https://${site.domain}`;

// Stable @id so Service/FAQ nodes can reference the one business entity.
const ORG_ID = `${BASE_URL}/#localbusiness`;

/** LocalBusiness — emitted sitewide from the root layout. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: "WinPro Window Cleaning",
    image: `${BASE_URL}/logo-icon.png`,
    logo: `${BASE_URL}/logo-icon.png`,
    url: BASE_URL,
    telephone: site.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "St. George",
      addressRegion: "UT",
      addressCountry: "US",
    },
    // St. George, UT.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.0965,
      longitude: -113.5684,
    },
    areaServed: areasServed.map((city) => ({
      "@type": "City",
      name: `${city}, UT`,
    })),
    sameAs: [site.instagram.url],
  };
}

/** Service schema for a single service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.valueProp,
    serviceType: service.name,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: areasServed.map((city) => ({ "@type": "City", name: `${city}, UT` })),
  };
}

/** FAQPage schema from a service's FAQ list. */
export function faqSchema(faqs: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** AggregateRating + individual Review schema for the Reviews page. */
export function reviewsSchema(reviews: Review[]) {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: "WinPro Window Cleaning",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.quote,
    })),
  };
}

/** BreadcrumbList schema for interior pages. */
export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/** WebPage schema for generic pages (About, Gallery, etc.). */
export function webPageSchema(page: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: `${BASE_URL}${page.path}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": ORG_ID },
  };
}

/** ContactPage schema for the quote/contact page. */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Get a Free Quote",
    description:
      "Request a free window cleaning quote for St. George & Southern Utah.",
    url: `${BASE_URL}/quote`,
    mainEntity: { "@id": ORG_ID },
  };
}

/** ImageGallery schema for the gallery page. */
export function imageGallerySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "WinPro Project Gallery",
    description:
      "Before-and-after window cleaning results from St. George & Southern Utah projects.",
    url: `${BASE_URL}/gallery`,
    about: { "@id": ORG_ID },
  };
}
