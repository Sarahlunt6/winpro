import type { Metadata } from "next";

// The sitewide generated OG image (app/opengraph-image.tsx). Next does NOT merge the
// file-convention image into a page that exports its own `openGraph`, so we reference
// it explicitly here and reuse it everywhere. metadataBase resolves it to absolute.
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "WinPro Window Cleaning — St. George & Southern Utah",
};

/**
 * Per-route metadata builder (§8). Keeps titles/descriptions consistent and adds
 * a canonical URL + OpenGraph/Twitter tags. The root layout supplies the title
 * template ("%s | WinPro Window Cleaning") and the sitewide OG image, so passing a
 * short `title` here is enough. Use `absoluteTitle` for pages (service pages) whose
 * full title would exceed ~60 chars with the brand template appended.
 */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
