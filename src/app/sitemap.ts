import { MetadataRoute } from "next";

const BASE_URL = "https://chauffeurdubai.ae";

// ─── Static Pages ──────────────────────────────────────────────────────────
const staticPages: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/fleet`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  },
];

// ─── Service Pages ─────────────────────────────────────────────────────────
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

// ─── Location Pages ────────────────────────────────────────────────────────
const locations = [
  "dubai",
  "abu-dhabi",
  "sharjah",
  "ajman",
  "ras-al-khaimah",
  "fujairah",
  "umm-al-quwain",
  "al-ain",
];

const locationPages: MetadataRoute.Sitemap = locations.map((slug) => ({
  url: `${BASE_URL}/locations/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

// ─── Route Pages (UAE to Oman etc.) ───────────────────────────────────────
const routes = [
  "dubai-to-muscat",
  "abu-dhabi-to-muscat",
  "sharjah-to-muscat",
  "dubai-to-salalah",
  "abu-dhabi-to-sohar",
  "dubai-to-nizwa",
  "ras-al-khaimah-to-muscat",
  "dubai-to-sur",
  "dubai-to-abu-dhabi",
  "dubai-to-sharjah",
];

const routePages: MetadataRoute.Sitemap = routes.map((slug) => ({
  url: `${BASE_URL}/routes/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.85,
}));

// ─── Fleet Pages ───────────────────────────────────────────────────────────
const fleet = [
  "mercedes-s-class",
  "bmw-7-series",
  "mercedes-v-class",
  "mercedes-sprinter",
  "mercedes-vito",
  "range-rover",
  "gmc-yukon-denali",
  "lexus-es300h",
];

const fleetPages: MetadataRoute.Sitemap = fleet.map((slug) => ({
  url: `${BASE_URL}/fleet/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.75,
}));

// ─── Sitemap Export ────────────────────────────────────────────────────────
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...routePages,
    ...fleetPages,
  ];
}
