import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Service } from "@/data/services";

/**
 * Service photo card (§5.1 #3): 4:5 image with the service name centered,
 * on hover reveals description and learn more arrow. Links to service page.
 * Christmas Lights gets a subtle "Seasonal" tag.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Decorative: the visible service name (h3 below) is the accessible label. */}
      <Placeholder
        label={service.placeholderLabel}
        ratio="card"
        decorative
        src={service.image}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* legibility overlay - darker on hover */}
      <div className="absolute inset-0 bg-ink/40 transition-colors duration-300 group-hover:bg-ink/60" />

      {service.seasonal && (
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
          Seasonal
        </span>
      )}

      {/* Default state: title centered */}
      <div className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-center font-display text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
          {service.name}
        </h3>
      </div>

      {/* Hover state: title + description + arrow at bottom */}
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
        <h3 className="font-display text-lg font-bold text-white">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/90">{service.valueProp}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-light">
          Learn more
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
