"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Code, Database, Smartphone, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * About page component displaying technology stack and platform information
 * @returns {JSX.Element} The about page component
 */
export default function About() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title =
      "About Z3 RADAR - Technology, Mission & Platform Details | Netherlands";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about Z3 RADAR's cutting-edge technology stack, data sources, and mission to provide comprehensive BMW Z3 insights using official RDW data in the Netherlands."
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      const currentKeywords = metaKeywords.getAttribute("content") || "";
      const additionalKeywords =
        ", Z3 RADAR technology, about automotive platform, RDW data integration, vehicle tracking technology, Next.js automotive app, React vehicle platform, Z3 RADAR technologie, over automotive platform, RDW data integratie, voertuig volgen technologie, Next.js automotive app, React voertuig platform, auto platform technologie, voertuig tracking systeem, automotive platform architectuur, voertuig data platform, auto tracking technologie, Nederlandse auto platform, voertuig informatie systeem, auto gegevens technologie, RDW integratie platform, automotive technologie Nederland, over Z3 RADAR, bedrijfsinformatie automotive, auto platform details, voertuig platform informatie";
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
    canonical.setAttribute("href", "https://Z3 RADAR.com/about");

    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Z3 RADAR",
      description: "Learn about Z3 RADAR's technology and mission",
      url: "https://Z3 RADAR.com/about",
      mainEntity: {
        "@type": "Organization",
        name: "Z3 RADAR",
        description:
          "Leading platform for BMW Z3 vehicle tracking and analytics in the Netherlands",
        url: "https://Z3 RADAR.com",
        foundingDate: "2024",
        industry: "Automotive Technology",
        speciality: "Vehicle tracking and analytics",
        knowsAbout: [
          "BMW Z3 vehicles",
          "RDW vehicle data",
          "Automotive analytics",
          "Vehicle registration tracking",
          "Insurance status monitoring",
        ],
        areaServed: {
          "@type": "Country",
          name: "Netherlands",
        },
      },
    });
    document.head.appendChild(orgScript);

    return () => {
      if (document.head.contains(orgScript)) {
        document.head.removeChild(orgScript);
      }
    };
  }, []);

  return (
    <>
      <div className="space-y-8">
        <header className="ml-12 lg:ml-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-500" />
            {t("about.title")}
          </h1>
          <p className="text-gray-400 text-lg">{t("about.subtitle")}</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="main">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="card-gradient h-full border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-2 bg-gradient-to-br rounded-lg border from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Code className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-white text-xl">
                    {t("about.technologyStack")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {t("about.frontend")}
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.technologies.nextjs")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.technologies.react")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.technologies.tailwind")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.technologies.recharts")}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="card-gradient h-full border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-2 bg-gradient-to-br rounded-lg border from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Database className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-white text-xl">
                    {t("about.dataSource")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">
                    RDW Open Data API
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.apiList.rdwData")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.processingList.insurance")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.apiList.realTime")}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t("about.processingList.importExport")}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="card-gradient h-full border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-2 bg-gradient-to-br rounded-lg border from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Smartphone className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-white text-xl">
                    {t("about.purposeAndDesign")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {t("about.whyThisDashboard")}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t("about.dashboardDescription")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {t("about.designPhilosophy")}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t("about.designPhilosophyDescription")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </>
  );
}
