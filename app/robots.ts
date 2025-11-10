import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/cache/",
          "/*.json$",
          "/api/*",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
        crawlDelay: 2,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Bad bots
      {
        userAgent: ["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot", "BLEXBot"],
        disallow: "/",
      },
    ],
    sitemap: [
      "https://lexustracker.nl/sitemap.xml",
      "https://lexustracker.nl/sitemap-images.xml",
    ],
    host: "https://lexustracker.nl",
  };
}
