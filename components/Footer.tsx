import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoIcon } from "@/components/ui/Logo";
import { areasServed, primaryNav, site } from "@/data/site";
import { services } from "@/data/services";

/** Long footer: brand + social, Services column, Areas Served column, phone (§3). */
export function Footer() {
  const year = 2026; // Build-time constant; bump or derive at render if desired.

  // Footer links: plain crawlable anchors with a 44px min tap target (§8, mobile).
  const linkCls =
    "flex min-h-[44px] items-center text-[15px] transition-colors hover:text-white";

  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand + social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <LogoIcon className="h-14 w-14" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/60">
              {site.tagline}. Licensed, insured, and local.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-white/80 transition-colors hover:text-white"
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
            <ul className="mt-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={linkCls}>
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
            <ul className="mt-3 space-y-2.5 text-[15px]">
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
            <ul className="mt-3">
              {primaryNav
                .filter((i) => !i.hasDropdown)
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkCls}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/quote" className={linkCls}>
                  Get a free quote
                </Link>
              </li>
            </ul>
            <a
              href={site.phoneHref}
              className="mt-3 flex min-h-[44px] items-center text-lg font-semibold text-white transition-colors hover:text-sky-light"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
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
