import { MetadataRoute } from "next";
import vehicles from "@/data/vehicles.json";

const BASE_URL = "https://chauffeurdubai.ae";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/fleet`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/services`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  ];

  // Service pages — only slugs that have real pages
  const services = [
    "airport-transfer",
    "corporate-chauffeur",
    "hourly-chauffeur",
    "wedding-chauffeur",
    "vip-chauffeur",
    "group-transfer",
    "uae-to-oman-chauffeur",
    "city-tours",
    "event-transfers",
    "shopping-chauffeur",
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Fleet pages — dynamically from vehicles.json
  const fleetPages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${BASE_URL}/fleet/${v.classSlug}/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Fleet class index pages
  const classslugs = [...new Set(vehicles.map((v) => v.classSlug))];
  const fleetClassPages: MetadataRoute.Sitemap = classslugs.map((slug) => ({
    url: `${BASE_URL}/fleet/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...fleetPages,
    ...fleetClassPages,
  ];
}
