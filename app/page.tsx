"use client";

import DashboardChart from "@/components/dashboard-chart";
import StatsCards from "@/components/stats-cards";
import { useLanguage } from "@/lib/i18n";
import { useEffect } from "react";

export default function Dashboard() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title =
      "LexusTracker - Tracking data for the Lexus IS250C| Netherlands";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The ultimate Lexus IS250C tracking platform in the Netherlands. Access real-time RDW data, vehicle statistics, registration trends, and comprehensive analytics dashboard for informed vehicle decisions."
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      const currentKeywords = metaKeywords.getAttribute("content") || "";
      const additionalKeywords =
        ", Lexus IS250C dashboard, vehicle analytics Netherlands, RDW data platform, automotive insights homepage, Lexus tracking dashboard, Lexus IS250C dashboard, voertuig analytics Nederland, RDW data platform, automotive inzichten homepage, Lexus tracking dashboard, auto gegevens Nederland, voertuig statistieken, Lexus volgen, automotive dashboard Nederland, voertuig monitoring platform, auto tracking systeem, RDW gegevens dashboard, kenteken informatie, Lexus cabrio statistieken, Nederlandse auto analytics, voertuig inzichten platform, auto data visualisatie, Lexus registratie trends, voertuig database Nederland";
      metaKeywords.setAttribute(
        "content",
        currentKeywords + additionalKeywords
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://lexustracker.nl/");

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://lexustracker.nl/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Dashboard",
          item: "https://lexustracker.nl/",
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Cleanup
      document.head.removeChild(breadcrumbScript);
    };
  }, []);

  return (
    <>
      <div className="space-y-8">
        <header className="ml-12 lg:ml-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            {t("navigation.dashboard")}
          </h1>
          <p className="text-gray-400 text-lg">{t("dashboard.subtitle")}</p>
        </header>

        <main className="space-y-8" role="main">
          <section aria-labelledby="chart-section">
            <h2 id="chart-section" className="sr-only">
              Vehicle Registration Analytics
            </h2>
            <DashboardChart />
          </section>

          <section aria-labelledby="stats-section">
            <h2 id="stats-section" className="sr-only">
              Vehicle Statistics Overview
            </h2>
            <StatsCards />
          </section>
        </main>
      </div>
    </>
  );
}
