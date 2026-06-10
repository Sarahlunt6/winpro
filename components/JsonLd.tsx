/**
 * Renders a JSON-LD <script>. Server component — the data is serialized at build
 * time, no client JS. Used for LocalBusiness (sitewide), Service, and FAQPage (§8).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Data is our own static content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
