import { Metadata } from "next";
import { constructMetadata } from "./metadata";

// Page-specific SEO configurations
export const pageMetadata = {
  home: constructMetadata({
    title: "LexusTracker - Track Your Lexus IS250C with Confidence",
    description:
      "The ultimate Lexus IS250C tracking platform in the Netherlands. Access real-time RDW data, vehicle statistics, registration trends, and comprehensive analytics dashboard.",
    keywords: [
      "Lexus IS250C dashboard",
      "vehicle tracking homepage",
      "Lexus statistics Netherlands",
      "RDW data platform",
      "automotive analytics dashboard",
      "Lexus tracking Netherlands",
      "vehicle insights homepage",
      "car statistics platform",
      // Dutch keywords
      "Lexus IS250C dashboard",
      "voertuig volgen homepage",
      "Lexus statistieken Nederland",
      "RDW data platform",
      "automotive analytics dashboard",
      "auto inzichten Nederland",
      "voertuiggegevens dashboard",
      "Lexus tracker homepage",
      "Lexus volgen Nederland",
      "voertuig inzichten homepage",
      "auto statistieken platform",
      "RDW gegevens platform",
      "Nederlandse auto tracker",
      "voertuig dashboard Nederland",
      "auto monitoring platform",
      "Lexus cabrio tracker",
      "kenteken informatie platform",
      "auto gegevens dashboard",
    ],
    canonical: "https://lexustracker.nl/",
  }),

  search: constructMetadata({
    title: "Vehicle Search - Find Any Lexus IS250C in Netherlands Database",
    description:
      "Search through comprehensive Lexus IS250C database using official RDW data. Find vehicle registration details, insurance status, specifications, and complete history.",
    keywords: [
      "Lexus vehicle search",
      "RDW database lookup",
      "vehicle registration search",
      "Lexus IS250C finder",
      "Netherlands car database",
      "license plate lookup",
      "vehicle history search",
      "car database search",
      // Dutch keywords
      "Lexus voertuig zoeken",
      "RDW database opzoeken",
      "voertuigregistratie zoeken",
      "Lexus IS250C vinder",
      "Nederland auto database",
      "kenteken opzoeken",
      "auto zoeken Nederland",
      "voertuiggegevens zoeken",
      "RDW gegevens opzoeken",
      "auto database zoeken",
      "voertuig geschiedenis zoeken",
      "kenteken check",
      "auto informatie zoeken",
      "voertuig opzoeken Nederland",
      "Nederlandse auto zoeken",
      "RDW kenteken opzoeken",
      "auto registratie zoeken",
    ],
    canonical: "https://lexustracker.nl/search",
  }),

  about: constructMetadata({
    title: "About LexusTracker - Technology, Mission & Platform Details",
    description:
      "Learn about LexusTracker's cutting-edge technology stack, data sources, and mission to provide comprehensive Lexus IS250C insights using official RDW data.",
    keywords: [
      "LexusTracker technology",
      "about automotive platform",
      "RDW data integration",
      "vehicle tracking technology",
      "Next.js automotive app",
      "automotive platform architecture",
      "vehicle data platform",
      "car tracking technology",
      // Dutch keywords
      "LexusTracker technologie",
      "over automotive platform",
      "RDW data integratie",
      "voertuig volgen technologie",
      "Next.js automotive app",
      "auto platform technologie",
      "voertuig tracking systeem",
      "RDW data koppeling",
      "automotive platform architectuur",
      "voertuig data platform",
      "auto tracking technologie",
      "Nederlandse auto platform",
      "voertuig informatie systeem",
      "auto gegevens technologie",
      "RDW integratie platform",
      "automotive technologie Nederland",
    ],
    canonical: "https://lexustracker.nl/about",
  }),

  photos: constructMetadata({
    title: "Lexus IS250C Photo Gallery - Stunning Vehicle Images",
    description:
      "Explore beautiful Lexus IS250C photographs and visual content. High-quality images showcasing the elegance and design of Lexus convertible vehicles.",
    keywords: [
      "Lexus IS250C photos",
      "Lexus convertible gallery",
      "automotive photography",
      "Lexus vehicle images",
      "car photo gallery",
      "vehicle image gallery",
      "Lexus IS250C pictures",
      "convertible car photos",
      // Dutch keywords
      "Lexus IS250C foto's",
      "Lexus cabrio gallerij",
      "automotive fotografie",
      "Lexus voertuig afbeeldingen",
      "auto foto gallerij",
      "Lexus IS250C beelden",
      "cabrio foto's Nederland",
      "auto fotografie",
      "voertuig afbeelding gallerij",
      "Lexus IS250C plaatjes",
      "cabrio auto foto's",
      "Nederlandse auto foto's",
      "Lexus beelden gallerij",
      "voertuig fotografie",
      "auto afbeeldingen Nederland",
      "Lexus cabrio beelden",
    ],
    canonical: "https://lexustracker.nl/photos",
  }),
};

// Generate breadcrumb structured data
export function generateBreadcrumbLD(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Generate FAQ structured data
export function generateFAQLD(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate article structured data
export function generateArticleLD(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "LexusTracker",
      logo: {
        "@type": "ImageObject",
        url: "https://lexustracker.nl/logo.png",
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    url: article.url,
    image: {
      "@type": "ImageObject",
      url: article.imageUrl,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

// Generate product/service structured data
export function generateServiceLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lexus IS250C Vehicle Tracking",
    description:
      "Comprehensive vehicle tracking and analytics service for Lexus IS250C owners in the Netherlands",
    provider: {
      "@type": "Organization",
      name: "LexusTracker",
      url: "https://lexustracker.nl",
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vehicle Tracking Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Real-time Vehicle Data",
            description: "Access to live RDW vehicle registration data",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Analytics Dashboard",
            description: "Comprehensive statistics and trend analysis",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Search Database",
            description: "Search through complete Lexus IS250C database",
          },
        },
      ],
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

// Generate software application structured data
export function generateSoftwareLD() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LexusTracker",
    operatingSystem: "Web Browser",
    applicationCategory: "BusinessApplication",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}
