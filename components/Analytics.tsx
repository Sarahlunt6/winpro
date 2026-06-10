import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

/**
 * Site analytics (§8): Vercel Analytics always-on, plus an optional GA4 / GTM slot
 * that only loads when its env var is set — so there's no third-party JS until the
 * client decides to add a tag (the PRD notes they may want call tracking later).
 *
 *   NEXT_PUBLIC_GA_ID   e.g. "G-XXXXXXXXXX"   → Google Analytics 4
 *   NEXT_PUBLIC_GTM_ID  e.g. "GTM-XXXXXXX"    → Google Tag Manager (takes precedence)
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <VercelAnalytics />

      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {!gtmId && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}
