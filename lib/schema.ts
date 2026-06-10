// JSON-LD structured data builders (§8). Shapes follow schema.org.
import { site, areasServed } from "@/data/site";
import type { Service, ServiceFaq } from "@/data/services";

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
