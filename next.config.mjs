/** @type {import('next').NextConfig} */
const nextConfig = {
  // 301 redirects from old WordPress URLs → new routes (§8), in place before DNS
  // cutover. Next auto-redirects trailing-slash variants (trailingSlash: false),
  // so e.g. /about-winpro/ → /about-winpro → /about is handled.
  //
  // NOTE: /services and /gallery keep the same path on the new site, so they need
  // no redirect. This list covers the paths that CHANGED plus common WP entry points.
  // Crawl the live WordPress site for the complete URL list before launch.
  async redirects() {
    const map = [
      ["/about-winpro", "/about"],
      ["/pricing", "/plans"],
      ["/plans-pricing", "/plans"],
      ["/contact", "/quote"],
      ["/contact-us", "/quote"],
      ["/get-a-quote", "/quote"],
      ["/free-quote", "/quote"],
      ["/book", "/quote"],
      ["/book-now", "/quote"],
      ["/home", "/"],
      // Likely old service slugs → new service routes.
      ["/services/window-cleaning", "/services/exterior-window-cleaning"],
      ["/window-cleaning", "/services/exterior-window-cleaning"],
      ["/services/window-washing", "/services/exterior-window-cleaning"],
      ["/services/screen-repair", "/services/screen-cleaning"],
      ["/services/christmas-light-installation", "/services/christmas-lights"],
      ["/christmas-lights", "/services/christmas-lights"],
    ];

    return map.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301, // explicit 301 (Next's `permanent: true` would emit a 308)
    }));
  },
};

export default nextConfig;
