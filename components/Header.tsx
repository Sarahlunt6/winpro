"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { primaryNav, site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

/** Sticky header with a Services dropdown and an always-visible quote CTA (§3). */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // Close the desktop dropdown on outside click / Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close the mobile menu whenever the route changes (§ mobile nav).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open (§ mobile nav).
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Use white text on homepage (over dark hero), dark text on other pages
  const isHome = pathname === "/";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 lg:px-6 lg:pt-5">
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-2xl border backdrop-blur-sm",
          isHome
            ? "border-ink bg-white/10"
            : "border-ink/20 bg-white/90"
        )}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4 lg:h-16 lg:px-6">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center"
            aria-label="WinPro — home"
          >
            <Logo priority className="h-8 w-auto sm:h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                item.hasDropdown ? (
                  <li key={item.href} ref={servicesRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={cn(
                        "flex min-h-[44px] items-center gap-1 rounded-full px-4 text-lg font-medium transition-colors",
                        isHome
                          ? "text-white hover:bg-white/20"
                          : "text-ink/80 hover:bg-cloud hover:text-ink"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="absolute left-0 top-full pt-2">
                        <ul className="w-64 overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-xl">
                          <li>
                            <Link
                              href="/services"
                              className="block rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-cloud"
                            >
                              All services
                            </Link>
                          </li>
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-base text-ink/80 hover:bg-cloud hover:text-ink"
                              >
                                {service.navLabel}
                                {service.seasonal && <SeasonalTag />}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-[44px] items-center rounded-full px-4 text-lg font-medium transition-colors",
                        isHome
                          ? "text-white hover:bg-white/20"
                          : "text-ink/80 hover:bg-cloud hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phoneHref}
              className={cn(
                "flex min-h-[44px] items-center text-base font-medium transition-colors",
                isHome
                  ? "text-white hover:text-white/80"
                  : "text-ink/80 hover:text-ink"
              )}
            >
              {site.phone}
            </a>
            <Button href="/quote" size="md">
              Get free quote
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button href="/quote" size="md">
              Free quote
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                isHome
                  ? "text-white hover:bg-white/20"
                  : "text-ink hover:bg-cloud"
              )}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-ink/20 bg-white px-4 py-4 lg:hidden rounded-b-2xl">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/services"
                    className="flex min-h-[44px] items-center rounded-xl px-3 text-base font-semibold text-ink hover:bg-cloud"
                  >
                    Services
                  </Link>
                  <ul className="mb-1 ml-3 border-l border-ink/10 pl-3">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-base text-ink/75 hover:bg-cloud hover:text-ink"
                        >
                          {service.navLabel}
                          {service.seasonal && <SeasonalTag />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {primaryNav
                  .filter((i) => !i.hasDropdown)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex min-h-[44px] items-center rounded-xl px-3 text-base font-medium text-ink/80 hover:bg-cloud hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-4">
              <Button href="/quote" size="lg" className="w-full">
                Get free quote
              </Button>
              <a
                href={site.phoneHref}
                className="flex min-h-[44px] items-center justify-center text-base font-medium text-ink/80"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function SeasonalTag() {
  return (
    <span className="rounded-full bg-sky-light px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
      Seasonal
    </span>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
