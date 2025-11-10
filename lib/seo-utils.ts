import { Metadata } from "next";
import { constructMetadata } from "./metadata";

// Page-specific SEO configurations
export const pageMetadata = {
  home: constructMetadata({
    title: "Z3 RADAR - Track Your BMW Z3 with Confidence",
    description:
      "The ultimate BMW Z3 tracking platform in the Netherlands. Access real-time RDW data, vehicle statistics, registration trends, and comprehensive analytics dashboard.",
    keywords: [
      "BMW Z3 dashboard",
      "vehicle tracking homepage",
      "BMW statistics Netherlands",
      "RDW data platform",
      "automotive analytics dashboard",
      "BMW tracking Netherlands",
      "vehicle insights homepage",
      "car statistics platform",
      // Dutch keywords
      "BMW Z3 dashboard",
      "voertuig volgen homepage",
      "BMW statistieken Nederland",
      "RDW data platform",
      "automotive analytics dashboard",
      "auto inzichten Nederland",
      "voertuiggegevens dashboard",
      "BMW tracker homepage",
      "BMW volgen Nederland",
      "voertuig inzichten homepage",
      "auto statistieken platform",
      "RDW gegevens platform",
      "Nederlandse auto tracker",
      "voertuig dashboard Nederland",
      "auto monitoring platform",
      "BMW cabrio tracker",
      "kenteken informatie platform",
      "auto gegevens dashboard",
    ],
    canonical: "https://Z3radar.com/",
  }),

  search: constructMetadata({
    title: "Vehicle Search - Find Any BMW Z3 in Netherlands Database",
    description:
      "Search through comprehensive BMW Z3 database using official RDW data. Find vehicle registration details, insurance status, specifications, and complete history.",
    keywords: [
      "BMW vehicle search",
      "RDW database lookup",
      "vehicle registration search",
      "BMW Z3 finder",
      "Netherlands car database",
      "license plate lookup",
      "vehicle history search",
      "car database search",
      // Dutch keywords
      "BMW voertuig zoeken",
      "RDW database opzoeken",
      "voertuigregistratie zoeken",
      "BMW Z3 vinder",
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
    canonical: "https://Z3radar.com/search",
  }),

  about: constructMetadata({
    title: "About Z3 RADAR - Technology, Mission & Platform Details",
    description:
      "Learn about Z3 RADAR's cutting-edge technology stack, data sources, and mission to provide comprehensive BMW Z3 insights using official RDW data.",
    keywords: [
      "Z3 RADAR technology",
      "about automotive platform",
      "RDW data integration",
      "vehicle tracking technology",
      "Next.js automotive app",
      "automotive platform architecture",
      "vehicle data platform",
      "car tracking technology",
      // Dutch keywords
      "Z3 RADAR technologie",
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
    canonical: "https://Z3radar.com/about",
  }),

  photos: constructMetadata({
    title: "BMW Z3 Photo Gallery - Stunning Vehicle Images",
    description:
      "Explore beautiful BMW Z3 photographs and visual content. High-quality images showcasing the elegance and design of BMW convertible vehicles.",
    keywords: [
      "BMW Z3 photos",
      "BMW convertible gallery",
      "automotive photography",
      "BMW vehicle images",
      "car photo gallery",
      "vehicle image gallery",
      "BMW Z3 pictures",
      "convertible car photos",
      // Dutch keywords
      "BMW Z3 foto's",
      "BMW cabrio gallerij",
      "automotive fotografie",
      "BMW voertuig afbeeldingen",
      "auto foto gallerij",
      "BMW Z3 beelden",
      "cabrio foto's Nederland",
      "auto fotografie",
      "voertuig afbeelding gallerij",
      "BMW Z3 plaatjes",
      "cabrio auto foto's",
      "Nederlandse auto foto's",
      "BMW beelden gallerij",
      "voertuig fotografie",
      "auto afbeeldingen Nederland",
      "BMW cabrio beelden",
    ],
    canonical: "https://Z3radar.com/photos",
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
      name: "Z3 RADAR",
      logo: {
        "@type": "ImageObject",
        url: "https://Z3radar.com/logo.png",
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
    name: "BMW Z3 Vehicle Tracking",
    description:
      "Comprehensive vehicle tracking and analytics service for BMW Z3 owners in the Netherlands",
    provider: {
      "@type": "Organization",
      name: "Z3 RADAR",
      url: "https://Z3radar.com",
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
            description: "Search through complete BMW Z3 database",
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
    name: "Z3 RADAR",
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
