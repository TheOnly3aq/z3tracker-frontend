import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://Z3radar.com";
  const currentDate = new Date().toISOString();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Z3 RADAR - BMW Z3 Insights</title>
    <description>Latest updates and insights about BMW Z3 vehicles in the Netherlands</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <managingEditor>team@z3radar.com (Z3 RADAR Team)</managingEditor>
    <webMaster>team@z3radar.com (Z3 RADAR Team)</webMaster>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Z3 RADAR</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    
    <item>
      <title>Z3 RADAR Platform Launch</title>
      <description>Comprehensive BMW Z3 tracking platform now available with real-time RDW data integration</description>
      <link>${baseUrl}/about</link>
      <guid isPermaLink="true">${baseUrl}/about</guid>
      <pubDate>${currentDate}</pubDate>
      <dc:creator>Z3 RADAR Team</dc:creator>
      <category>Platform Updates</category>
    </item>
    
    <item>
      <title>Real-time Vehicle Search</title>
      <description>Search through comprehensive BMW Z3 database with advanced filtering options</description>
      <link>${baseUrl}/search</link>
      <guid isPermaLink="true">${baseUrl}/search</guid>
      <pubDate>${currentDate}</pubDate>
      <dc:creator>Z3 RADAR Team</dc:creator>
      <category>Features</category>
    </item>
    
    <item>
      <title>Interactive Dashboard Analytics</title>
      <description>Explore vehicle statistics and trends with our comprehensive analytics dashboard</description>
      <link>${baseUrl}/</link>
      <guid isPermaLink="true">${baseUrl}/dashboard</guid>
      <pubDate>${currentDate}</pubDate>
      <dc:creator>Z3 RADAR Team</dc:creator>
      <category>Analytics</category>
    </item>
    
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
