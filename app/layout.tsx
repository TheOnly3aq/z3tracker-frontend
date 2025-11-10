import "./globals.css";
import { ReactNode, Suspense } from "react";
import Sidebar from "@/components/sidebar";
import { LanguageProvider } from "@/lib/i18n";
import { defaultMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

const safeJsonLd = (data: unknown) =>
  JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
    .replace(/<\/script/gi, "<\\/script");

export function generateMetadata(): Metadata {
  return {
    ...defaultMetadata,
    other: {
      ...(defaultMetadata.other as Record<string, string> | undefined),
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }: Props) {
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BMWTracker",
    url: "https://BMWtracker.nl",
    description:
      "Geavanceerde RDW Data - Uitgebreide inzichten in BMW Z3 voertuigen in Nederland met officiële RDW gegevens",
    applicationCategory: "Automotive",
    operatingSystem: "Web",
    browserRequirements: "Moderne browser met JavaScript ingeschakeld",
    softwareVersion: "1.0",
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: ["en", "nl"],
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Real-time voertuigregistratiegegevens",
      "Verzekeringsstatusvolging",
      "Voertuigstatistiekendashboard",
      "Meertalige ondersteuning",
      "Responsief ontwerp",
      "Datavisualisatie",
    ],
    downloadUrl: "https://BMWtracker.nl",
    author: {
      "@type": "Organization",
      name: "BMWTracker",
      url: "https://BMWtracker.nl",
      logo: {
        "@type": "ImageObject",
        url: "https://BMWtracker.nl/logo.png",
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "klantenservice",
        availableLanguage: ["Nederlands", "Engels"],
      },
    },
    publisher: {
      "@type": "Organization",
      name: "BMWTracker",
      logo: {
        "@type": "ImageObject",
        url: "https://BMWtracker.nl/logo.png",
        width: 512,
        height: 512,
      },
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "BMWTracker Dashboard",
      applicationCategory: "Automotive Analytics",
      operatingSystem: "Webbrowser",
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        target: "https://BMWtracker.nl/dashboard",
        name: "Dashboard bekijken",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Anonieme gebruiker",
        },
        reviewBody:
          "Uitstekend platform voor het volgen van BMW voertuiggegevens met uitgebreide inzichten.",
      },
    ],
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BMWTracker",
    url: "https://BMWtracker.nl",
    description:
      "Toonaangevend platform voor BMW Z3 voertuigvolging en analyses in Nederland",
    foundingDate: "2024",
    industry: "Automotieve Technologie",
    numberOfEmployees: "1-10",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressRegion: "Nederland",
    },
    sameAs: ["https://github.com/TheOnly3aq/BMWtracker"],
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BMWTracker",
    url: "https://BMWtracker.nl",
    description:
      "Uitgebreid BMW Z3 voertuigvolgingsplatform met officiële RDW gegevens",
    inLanguage: ["en", "nl"],
    isPartOf: {
      "@type": "WebSite",
      name: "BMWTracker",
      url: "https://BMWtracker.nl",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Dashboard",
          url: "https://BMWtracker.nl/",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Zoeken",
          url: "https://BMWtracker.nl/search",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Foto's",
          url: "https://BMWtracker.nl/photos",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Over ons",
          url: "https://BMWtracker.nl/about",
        },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BMWTracker - Track Your BMW Z3 with Confidence</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(webAppLd) }}
        />
        <link rel="icon" href="/logo1.png?v=3" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(siteLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6491312,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
          }}
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 lg:ml-64">
                <div className="p-4 lg:p-8">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </div>
              </main>
            </div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}

