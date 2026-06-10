import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { areasServed, primaryNav, site } from "@/data/site";
import { services } from "@/data/services";

/** Long footer: brand + social, Services column, Areas Served column, phone (§3). */
export function Footer() {
  const year = 2026; // Build-time constant; bump or derive at render if desired.

  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="text-white [&_span]:text-sky" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline}. Licensed, insured, and local.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <InstagramIcon />
              {site.instagram.handle}
            </a>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas served */}
          <nav aria-label="Areas served">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Areas served
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {areasServed.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </nav>

          {/* Company + contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryNav
                .filter((i) => !i.hasDropdown)
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/quote" className="transition-colors hover:text-white">
                  Get a free quote
                </Link>
              </li>
            </ul>
            <a
              href={site.phoneHref}
              className="mt-5 inline-block text-lg font-semibold text-white transition-colors hover:text-sky-light"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>St. George &amp; Southern Utah</p>
        </div>
      </Container>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
