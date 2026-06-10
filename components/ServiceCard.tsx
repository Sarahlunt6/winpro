import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Service } from "@/data/services";

/**
 * Service photo card (§5.1 #3): 4:5 image with the service name overlaid, hover lift,
 * links to its service page. Christmas Lights gets a subtle "Seasonal" tag.
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

      {/* legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      {service.seasonal && (
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
          Seasonal
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold text-white">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/80">{service.valueProp}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sky-light">
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
