import type { Metadata } from "next";
import "./globals.css";
import { display, body } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "WinPro — Window cleaning in St. George & Southern Utah",
    template: "%s · WinPro",
  },
  description:
    "Professional window cleaning for St. George and Southern Utah. Streak-free exterior and interior glass, screens, protective coating, and Christmas lights. Get a free quote.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
