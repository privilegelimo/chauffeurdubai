import { MetadataRoute } from "next";
import vehicles from "@/data/vehicles.json";

const BASE_URL = "https://chauffeurdubai.ae";

export default function sitemap(): MetadataRoute.Sitemap {

  // ── Static pages — only folders that exist in src/app ─────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/fleet`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    // Landing pages
    {
      url: `${BASE_URL}/landing-page/uae-to-oman-chauffeur-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // ── Service pages — exact slugs from services/[slug]/page.tsx ─────────
  const services = [
    "airport-transfer-dubai",
    "corporate-chauffeur-dubai",
    "vip-chauffeur-dubai",
    "full-day-chauffeur-dubai",
    "event-transport-dubai",
    "luxury-van-rental-dubai",
    "wedding-limo-dubai",
    "private-driver-sightseeing-dubai",
    "monthly-car-with-driver-dubai",
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // ── Fleet vehicle pages — from vehicles.json ───────────────────────────
  const fleetPages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${BASE_URL}/fleet/${v.classSlug}/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Fleet class index pages — unique classSlug values ─────────────────
  const classSlugs = [...new Set(vehicles.map((v) => v.classSlug))];
  const fleetClassPages: MetadataRoute.Sitemap = classSlugs.map((slug) => ({
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
