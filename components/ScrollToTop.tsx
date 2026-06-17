"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to top on initial page load and route changes.
 * Fixes browser scroll restoration keeping position mid-page on reload.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Only scroll if there's no hash in the URL (allow anchor links to work)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
