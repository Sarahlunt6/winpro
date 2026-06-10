import type { Metadata } from "next";
import "./globals.css";
import { display, body } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    // Home title (absolute). Other pages fill the template, e.g. "About | WinPro Window Cleaning".
    default: "WinPro Window Cleaning | St. George & Southern Utah",
    template: "%s | WinPro Window Cleaning",
  },
  description:
    "Streak-free window cleaning in St. George & Southern Utah — exterior, interior, screens, coatings, and Christmas lights. Get your free quote today.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        {/* Skip link for keyboard users (§8 a11y). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* LocalBusiness structured data, sitewide (§8). */}
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
