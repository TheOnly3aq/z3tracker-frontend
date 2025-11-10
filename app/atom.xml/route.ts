import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://lexustracker.nl";
  const currentDate = new Date().toISOString();

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>LexusTracker - Lexus IS250C Insights</title>
  <subtitle>Latest updates and insights about Lexus IS250C vehicles in the Netherlands</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self"/>
  <link href="${baseUrl}"/>
  <id>${baseUrl}/</id>
  <author>
    <name>LexusTracker Team</name>
    <email>team@lexustracker.nl</email>
  </author>
  <updated>${currentDate}</updated>
  <rights>© 2025 LexusTracker. All rights reserved.</rights>
  <icon>${baseUrl}/favicon.ico</icon>
  <logo>${baseUrl}/logo.png</logo>

  <entry>
    <title>LexusTracker Platform Launch</title>
    <link href="${baseUrl}/about"/>
    <id>${baseUrl}/about</id>
    <updated>${currentDate}</updated>
    <summary>Comprehensive Lexus IS250C tracking platform now available with real-time RDW data integration</summary>
    <content type="html"><![CDATA[
      <p>LexusTracker provides comprehensive insights into Lexus IS250C vehicles in the Netherlands using official RDW data sources.</p>
      <p>Features include:</p>
      <ul>
        <li>Real-time vehicle registration data</li>
        <li>Insurance status tracking</li>
        <li>Comprehensive analytics dashboard</li>
        <li>Advanced vehicle search capabilities</li>
      </ul>
    ]]></content>
    <author>
      <name>LexusTracker Team</name>
    </author>
    <category term="Platform Updates"/>
  </entry>

  <entry>
    <title>Real-time Vehicle Search</title>
    <link href="${baseUrl}/search"/>
    <id>${baseUrl}/search</id>
    <updated>${currentDate}</updated>
    <summary>Search through comprehensive Lexus IS250C database with advanced filtering options</summary>
    <content type="html"><![CDATA[
      <p>Our advanced search functionality allows you to explore the complete Lexus IS250C database with sophisticated filtering options.</p>
      <p>Search capabilities include:</p>
      <ul>
        <li>License plate lookup</li>
        <li>Vehicle specification filtering</li>
        <li>Insurance status verification</li>
        <li>Registration history access</li>
      </ul>
    ]]></content>
    <author>
      <name>LexusTracker Team</name>
    </author>
    <category term="Features"/>
  </entry>

</feed>`;

  return new Response(atomXml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
