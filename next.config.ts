import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  trailingSlash: false,

  async redirects() {
    return [

      // ── Common typo / old URL patterns ──────────────────────────────────
      { source: "/home",       destination: "/",     permanent: true },
      { source: "/index",      destination: "/",     permanent: true },
      { source: "/index.html", destination: "/",     permanent: true },
      { source: "/home.html",  destination: "/",     permanent: true },

      // ── Services ─────────────────────────────────────────────────────────
      { source: "/service",                 destination: "/services",                          permanent: true },
      { source: "/our-services",            destination: "/services",                          permanent: true },
      { source: "/services/airport",        destination: "/services/airport-transfer",         permanent: true },
      { source: "/airport-transfer",        destination: "/services/airport-transfer",         permanent: true },
      { source: "/airport-transfers",       destination: "/services/airport-transfer",         permanent: true },
      { source: "/corporate",               destination: "/services/corporate-chauffeur",      permanent: true },
      { source: "/corporate-chauffeur",     destination: "/services/corporate-chauffeur",      permanent: true },
      { source: "/wedding",                 destination: "/services/wedding-chauffeur",        permanent: true },
      { source: "/wedding-car",             destination: "/services/wedding-chauffeur",        permanent: true },
      { source: "/wedding-chauffeur",       destination: "/services/wedding-chauffeur",        permanent: true },
      { source: "/vip",                     destination: "/services/vip-chauffeur",            permanent: true },
      { source: "/vip-transfer",            destination: "/services/vip-chauffeur",            permanent: true },
      { source: "/hourly",                  destination: "/services/hourly-chauffeur",         permanent: true },
      { source: "/hourly-hire",             destination: "/services/hourly-chauffeur",         permanent: true },
      { source: "/city-tour",               destination: "/services/city-tours",               permanent: true },
      { source: "/tours",                   destination: "/services/city-tours",               permanent: true },
      { source: "/group",                   destination: "/services/group-transfer",           permanent: true },
      { source: "/group-transfer",          destination: "/services/group-transfer",           permanent: true },
      { source: "/uae-oman",                destination: "/services/uae-to-oman-chauffeur",    permanent: true },
      { source: "/oman-transfer",           destination: "/services/uae-to-oman-chauffeur",    permanent: true },
      { source: "/dubai-to-oman",           destination: "/services/uae-to-oman-chauffeur",    permanent: true },
      { source: "/uae-to-oman",             destination: "/services/uae-to-oman-chauffeur",    permanent: true },

      // ── Fleet index ───────────────────────────────────────────────────────
      { source: "/cars",        destination: "/fleet", permanent: true },
      { source: "/vehicles",    destination: "/fleet", permanent: true },
      { source: "/our-fleet",   destination: "/fleet", permanent: true },
      { source: "/luxury-cars", destination: "/fleet", permanent: true },

      // ─────────────────────────────────────────────────────────────────────
      // ── FLEET VEHICLES — old flat URLs → /fleet/[classSlug]/[slug] ───────
      // ─────────────────────────────────────────────────────────────────────

      // Business Class
      { source: "/lexus-es300",              destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/fleet/lexus-es300",        destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/audi-a6",                  destination: "/fleet/business-class/audi-a6",                  permanent: true },
      { source: "/fleet/audi-a6",            destination: "/fleet/business-class/audi-a6",                  permanent: true },
      { source: "/byd-han",                  destination: "/fleet/business-class/byd-han",                  permanent: true },
      { source: "/fleet/byd-han",            destination: "/fleet/business-class/byd-han",                  permanent: true },
      { source: "/citroen-space-tourer",     destination: "/fleet/business-class/citroen-space-tourer",     permanent: true },
      { source: "/fleet/citroen-space-tourer", destination: "/fleet/business-class/citroen-space-tourer",   permanent: true },
      { source: "/toyota-granvia",           destination: "/fleet/business-class/toyota-granvia",           permanent: true },
      { source: "/fleet/toyota-granvia",     destination: "/fleet/business-class/toyota-granvia",           permanent: true },

      // First Class
      { source: "/mercedes-s500",            destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/fleet/mercedes-s500",      destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/mercedes-s-class",         destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/fleet/mercedes-s-class",   destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/bmw-7-series",             destination: "/fleet/first-class/bmw-7-series",                permanent: true },
      { source: "/fleet/bmw-7-series",       destination: "/fleet/first-class/bmw-7-series",                permanent: true },

      // Business Van
      { source: "/mercedes-vito-tourer",         destination: "/fleet/business-van/mercedes-vito-tourer",       permanent: true },
      { source: "/fleet/mercedes-vito-tourer",   destination: "/fleet/business-van/mercedes-vito-tourer",       permanent: true },
      { source: "/mercedes-vito",                destination: "/fleet/business-van/mercedes-vito-tourer",       permanent: true },
      { source: "/fleet/mercedes-vito",          destination: "/fleet/business-van/mercedes-vito-tourer",       permanent: true },
      { source: "/mercedes-v300-tiffany",        destination: "/fleet/business-van/mercedes-v300-tiffany",      permanent: true },
      { source: "/fleet/mercedes-v300-tiffany",  destination: "/fleet/business-van/mercedes-v300-tiffany",      permanent: true },
      { source: "/mercedes-vip-trend",           destination: "/fleet/business-van/mercedes-vip-trend",         permanent: true },
      { source: "/fleet/mercedes-vip-trend",     destination: "/fleet/business-van/mercedes-vip-trend",         permanent: true },
      { source: "/mercedes-v-class",             destination: "/fleet/business-van/mercedes-v-class",           permanent: true },
      { source: "/fleet/mercedes-v-class",       destination: "/fleet/business-van/mercedes-v-class",           permanent: true },
      { source: "/v-class",                      destination: "/fleet/business-van/mercedes-v-class",           permanent: true },

      // Mercedes Sprinter Luxury Van
      { source: "/mercedes-sprinter-ultra-luxury",       destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",      permanent: true },
      { source: "/fleet/mercedes-sprinter-ultra-luxury", destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",      permanent: true },
      { source: "/mercedes-sprinter-19",                 destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                permanent: true },
      { source: "/fleet/mercedes-sprinter-19",           destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                permanent: true },
      { source: "/mercedes-sprinter",                    destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                permanent: true },
      { source: "/fleet/mercedes-sprinter",              destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                permanent: true },
      { source: "/sprinter",                             destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                permanent: true },

      // Mercedes Sprinter Luxury VIP
      { source: "/mercedes-sprinter-avant-garde",        destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-avant-garde",       permanent: true },
      { source: "/fleet/mercedes-sprinter-avant-garde",  destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-avant-garde",       permanent: true },
      { source: "/mercedes-sprinter-business-vip",       destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-business-vip",      permanent: true },
      { source: "/fleet/mercedes-sprinter-business-vip", destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-business-vip",      permanent: true },

      // Luxury SUV
      { source: "/gmc-yukon-denali",          destination: "/fleet/luxury-suv/gmc-yukon-denali",             permanent: true },
      { source: "/fleet/gmc-yukon-denali",    destination: "/fleet/luxury-suv/gmc-yukon-denali",             permanent: true },
      { source: "/cadillac-escalade",         destination: "/fleet/luxury-suv/cadillac-escalade",            permanent: true },
      { source: "/fleet/cadillac-escalade",   destination: "/fleet/luxury-suv/cadillac-escalade",            permanent: true },
      { source: "/range-rover-sport",         destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/fleet/range-rover-sport",   destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/range-rover",               destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/fleet/range-rover",         destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },

      // Rolls-Royce
      { source: "/rolls-royce-ghost",          destination: "/fleet/rolls-royce/rolls-royce-ghost",          permanent: true },
      { source: "/fleet/rolls-royce-ghost",    destination: "/fleet/rolls-royce/rolls-royce-ghost",          permanent: true },
      { source: "/rolls-royce-cullinan",       destination: "/fleet/rolls-royce/rolls-royce-cullinan",       permanent: true },
      { source: "/fleet/rolls-royce-cullinan", destination: "/fleet/rolls-royce/rolls-royce-cullinan",       permanent: true },
      { source: "/rolls-royce",                destination: "/fleet/rolls-royce/rolls-royce-ghost",          permanent: true },

      // Stretch Limousine
      { source: "/gmc-yukon-limousine",                   destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                  permanent: true },
      { source: "/fleet/gmc-yukon-limousine",             destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                  permanent: true },
      { source: "/chevy-suburban-titanium-limousine",     destination: "/fleet/stretch-limousine/chevy-suburban-titanium-limousine",    permanent: true },
      { source: "/fleet/chevy-suburban-titanium-limousine", destination: "/fleet/stretch-limousine/chevy-suburban-titanium-limousine",  permanent: true },
      { source: "/gmc-yukon-diamond-limousine",           destination: "/fleet/stretch-limousine/gmc-yukon-diamond-limousine",          permanent: true },
      { source: "/fleet/gmc-yukon-diamond-limousine",     destination: "/fleet/stretch-limousine/gmc-yukon-diamond-limousine",          permanent: true },
      { source: "/chrysler-emerald-limousine",            destination: "/fleet/stretch-limousine/chrysler-emerald-limousine",           permanent: true },
      { source: "/fleet/chrysler-emerald-limousine",      destination: "/fleet/stretch-limousine/chrysler-emerald-limousine",           permanent: true },
      { source: "/limousine",                             destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                  permanent: true },
      { source: "/limo",                                  destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                  permanent: true },

      // Standard Bus
      { source: "/toyota-coaster-21",       destination: "/fleet/standard-bus/toyota-coaster-21",            permanent: true },
      { source: "/fleet/toyota-coaster-21", destination: "/fleet/standard-bus/toyota-coaster-21",            permanent: true },
      { source: "/toyota-coaster",          destination: "/fleet/standard-bus/toyota-coaster-21",            permanent: true },
      { source: "/toyota-hiace-11",         destination: "/fleet/standard-bus/toyota-hiace-11",              permanent: true },
      { source: "/fleet/toyota-hiace-11",   destination: "/fleet/standard-bus/toyota-hiace-11",              permanent: true },
      { source: "/toyota-hiace",            destination: "/fleet/standard-bus/toyota-hiace-11",              permanent: true },

      // Luxury Coach Bus
      { source: "/50-seater-luxury-coach",        destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",   permanent: true },
      { source: "/fleet/50-seater-luxury-coach",  destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",   permanent: true },
      { source: "/35-seater-luxury-coach",        destination: "/fleet/luxury-coach-bus/35-seater-luxury-coach",   permanent: true },
      { source: "/fleet/35-seater-luxury-coach",  destination: "/fleet/luxury-coach-bus/35-seater-luxury-coach",   permanent: true },
      { source: "/luxury-coach",                  destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",   permanent: true },
      { source: "/coach-bus",                     destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",   permanent: true },

      // ── Locations ─────────────────────────────────────────────────────────
      { source: "/location",              destination: "/locations",                  permanent: true },
      { source: "/areas",                 destination: "/locations",                  permanent: true },
      { source: "/chauffeur-dubai",       destination: "/locations/dubai",            permanent: true },
      { source: "/chauffeur-abu-dhabi",   destination: "/locations/abu-dhabi",        permanent: true },
      { source: "/chauffeur-sharjah",     destination: "/locations/sharjah",          permanent: true },
      { source: "/chauffeur-ajman",       destination: "/locations/ajman",            permanent: true },
      { source: "/chauffeur-rak",         destination: "/locations/ras-al-khaimah",   permanent: true },
      { source: "/chauffeur-fujairah",    destination: "/locations/fujairah",         permanent: true },

      // ── Routes ────────────────────────────────────────────────────────────
      { source: "/dubai-muscat",          destination: "/routes/dubai-to-muscat",         permanent: true },
      { source: "/abudhabi-muscat",       destination: "/routes/abu-dhabi-to-muscat",     permanent: true },
      { source: "/sharjah-muscat",        destination: "/routes/sharjah-to-muscat",       permanent: true },

      // ── About / Contact / Blog ────────────────────────────────────────────
      { source: "/about-us",      destination: "/about",   permanent: true },
      { source: "/who-we-are",    destination: "/about",   permanent: true },
      { source: "/contact-us",    destination: "/contact", permanent: true },
      { source: "/get-in-touch",  destination: "/contact", permanent: true },
      { source: "/reach-us",      destination: "/contact", permanent: true },
      { source: "/blogs",         destination: "/blog",    permanent: true },
      { source: "/news",          destination: "/blog",    permanent: true },
      { source: "/articles",      destination: "/blog",    permanent: true },

      // ── Booking ───────────────────────────────────────────────────────────
      { source: "/book",      destination: "/contact", permanent: true },
      { source: "/booking",   destination: "/contact", permanent: true },
      { source: "/reserve",   destination: "/contact", permanent: true },
      { source: "/quote",     destination: "/contact", permanent: true },
      { source: "/get-quote", destination: "/contact", permanent: true },

      // ── Trailing slash cleanup ────────────────────────────────────────────
      { source: "/services/",   destination: "/services",   permanent: true },
      { source: "/fleet/",      destination: "/fleet",      permanent: true },
      { source: "/locations/",  destination: "/locations",  permanent: true },
      { source: "/blog/",       destination: "/blog",       permanent: true },
      { source: "/about/",      destination: "/about",      permanent: true },
      { source: "/contact/",    destination: "/contact",    permanent: true },
    ];
  },
};

export default nextConfig;
