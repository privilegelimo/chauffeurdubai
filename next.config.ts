import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prlwwmtibaszzyvmciyu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  trailingSlash: false,

  async redirects() {
    return [

      // ── Common typo / old URL patterns ──────────────────────────────────
      { source: "/home",       destination: "/",  permanent: true },
      { source: "/index",      destination: "/",  permanent: true },
      { source: "/index.html", destination: "/",  permanent: true },
      { source: "/home.html",  destination: "/",  permanent: true },

      // ── Old WordPress flat vehicle pages (new 404s) ──────────────────────
      { source: "/mercedes-benz-s450",                      destination: "/fleet/first-class/mercedes-s500",                                          permanent: true },
      { source: "/mercedes-s-500",                          destination: "/fleet/first-class/mercedes-s500",                                          permanent: true },
      { source: "/mercedes-v-300-tiffany",                  destination: "/fleet/business-van/mercedes-v300-tiffany",                                 permanent: true },
      { source: "/chauffeur-service-in-dubai",              destination: "/services",                                                                 permanent: true },
      { source: "/50-seater-luxury-bus",                    destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",                            permanent: true },
      { source: "/luxury-bus-rental-in-uae",                destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach",                            permanent: true },
      { source: "/mercedes-sprinter-ultra-luxury-van",      destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",        permanent: true },
      { source: "/mercedes-benz-sprinter-19-seats",         destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",                  permanent: true },
      { source: "/mercedes-sprinter-avant-garde-vip",       destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-avant-garde",         permanent: true },
      { source: "/luxury-van-rental-in-uae",                destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",        permanent: true },
      { source: "/rent-a-car-with-driver-in-dubai-chauffeur-service-dubai",                                               destination: "/services/corporate-chauffeur-dubai",  permanent: true },
      { source: "/mercedes-sprinter-rental-in-dubai-experience-the-luxury-with-privilege-travel-llc",                    destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury", permanent: true },
      { source: "/airport-transfers-in-uae-a-convenient-and-reliable-service-by-privilege-travel-llc-dubai",             destination: "/services/airport-transfer-dubai",     permanent: true },
      { source: "/mercedes-v-class-rent-with-driver-in-dubai-uae",  destination: "/fleet/business-van/mercedes-v-class",          permanent: true },
      { source: "/corporate-event-transportation-in-uae",           destination: "/services/event-transport-dubai",               permanent: true },

      // ── Services — old indexed Google URLs → actual current slugs ────────
      { source: "/services/airport-transfer",       destination: "/services/airport-transfer-dubai",            permanent: true },
      { source: "/services/corporate-chauffeur",    destination: "/services/corporate-chauffeur-dubai",         permanent: true },
      { source: "/services/vip-chauffeur",          destination: "/services/vip-chauffeur-dubai",               permanent: true },
      { source: "/services/hourly-chauffeur",       destination: "/services/full-day-chauffeur-dubai",          permanent: true },
      { source: "/services/event-transfers",        destination: "/services/event-transport-dubai",             permanent: true },
      { source: "/services/group-transfer",         destination: "/services/luxury-van-rental-dubai",           permanent: true },
      { source: "/services/wedding-chauffeur",      destination: "/services/wedding-limo-dubai",                permanent: true },
      { source: "/services/city-tours",             destination: "/services/private-driver-sightseeing-dubai",  permanent: true },
      { source: "/services/shopping-chauffeur",     destination: "/services/private-driver-sightseeing-dubai",  permanent: true },
      { source: "/services/uae-to-oman-chauffeur",  destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },

      // ── Services — old flat WordPress URLs ──────────────────────────────
      { source: "/service",              destination: "/services",                              permanent: true },
      { source: "/our-services",         destination: "/services",                              permanent: true },
      { source: "/chauffeur-service",    destination: "/services",                              permanent: true },
      { source: "/chauffeur-services",   destination: "/services",                              permanent: true },
      { source: "/airport-transfer",     destination: "/services/airport-transfer-dubai",       permanent: true },
      { source: "/airport-transfers",    destination: "/services/airport-transfer-dubai",       permanent: true },
      { source: "/corporate",            destination: "/services/corporate-chauffeur-dubai",    permanent: true },
      { source: "/corporate-chauffeur",  destination: "/services/corporate-chauffeur-dubai",    permanent: true },
      { source: "/wedding",              destination: "/services/wedding-limo-dubai",           permanent: true },
      { source: "/wedding-car",          destination: "/services/wedding-limo-dubai",           permanent: true },
      { source: "/wedding-chauffeur",    destination: "/services/wedding-limo-dubai",           permanent: true },
      { source: "/vip",                  destination: "/services/vip-chauffeur-dubai",          permanent: true },
      { source: "/vip-transfer",         destination: "/services/vip-chauffeur-dubai",          permanent: true },
      { source: "/hourly",               destination: "/services/full-day-chauffeur-dubai",     permanent: true },
      { source: "/hourly-hire",          destination: "/services/full-day-chauffeur-dubai",     permanent: true },
      { source: "/city-tour",            destination: "/services/private-driver-sightseeing-dubai", permanent: true },
      { source: "/tours",                destination: "/services/private-driver-sightseeing-dubai", permanent: true },
      { source: "/group",                destination: "/services/luxury-van-rental-dubai",      permanent: true },
      { source: "/group-transfer",       destination: "/services/luxury-van-rental-dubai",      permanent: true },
      { source: "/uae-oman",             destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/oman-transfer",        destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/dubai-to-oman",        destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/uae-to-oman",          destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },

      // ── Locations ────────────────────────────────────────────────────────
      { source: "/locations",              destination: "/",  permanent: false },
      { source: "/locations/:path*",       destination: "/",  permanent: false },
      { source: "/location",               destination: "/",  permanent: false },
      { source: "/areas",                  destination: "/",  permanent: false },
      { source: "/chauffeur-dubai",        destination: "/",  permanent: false },
      { source: "/chauffeur-abu-dhabi",    destination: "/",  permanent: false },
      { source: "/chauffeur-sharjah",      destination: "/",  permanent: false },
      { source: "/chauffeur-ajman",        destination: "/",  permanent: false },
      { source: "/chauffeur-rak",          destination: "/",  permanent: false },
      { source: "/chauffeur-fujairah",     destination: "/",  permanent: false },

      // ── Routes ───────────────────────────────────────────────────────────
      { source: "/routes/dubai-to-muscat",          destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/abu-dhabi-to-muscat",      destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/sharjah-to-muscat",        destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/dubai-to-salalah",         destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/abu-dhabi-to-sohar",       destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/dubai-to-nizwa",           destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/ras-al-khaimah-to-muscat", destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/dubai-to-sur",             destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/routes/dubai-to-abu-dhabi",       destination: "/services/airport-transfer-dubai",             permanent: true },
      { source: "/routes/dubai-to-sharjah",         destination: "/services/airport-transfer-dubai",             permanent: true },
      { source: "/routes/:path*",                   destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/dubai-muscat",                    destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/abudhabi-muscat",                 destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },
      { source: "/sharjah-muscat",                  destination: "/landing-page/uae-to-oman-chauffeur-services", permanent: true },

      // ── Blog ─────────────────────────────────────────────────────────────
      { source: "/blogs",    destination: "/blog", permanent: false },
      { source: "/news",     destination: "/blog", permanent: false },
      { source: "/articles", destination: "/blog", permanent: false },

      // ── Fleet index ──────────────────────────────────────────────────────
      { source: "/cars",        destination: "/fleet", permanent: true },
      { source: "/vehicles",    destination: "/fleet", permanent: true },
      { source: "/our-fleet",   destination: "/fleet", permanent: true },
      { source: "/luxury-cars", destination: "/fleet", permanent: true },

      // ── FLEET VEHICLES ───────────────────────────────────────────────────

      // Business Class
      { source: "/lexus-es300",                  destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/fleet/lexus-es300",            destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/lexus-es300h",                 destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/fleet/lexus-es300h",           destination: "/fleet/business-class/lexus-es300",              permanent: true },
      { source: "/audi-a6",                      destination: "/fleet/business-class/audi-a6",                  permanent: true },
      { source: "/fleet/audi-a6",                destination: "/fleet/business-class/audi-a6",                  permanent: true },
      { source: "/byd-han",                      destination: "/fleet/business-class/byd-han",                  permanent: true },
      { source: "/fleet/byd-han",                destination: "/fleet/business-class/byd-han",                  permanent: true },
      { source: "/citroen-space-tourer",         destination: "/fleet/business-class/citroen-space-tourer",     permanent: true },
      { source: "/fleet/citroen-space-tourer",   destination: "/fleet/business-class/citroen-space-tourer",     permanent: true },
      { source: "/toyota-granvia",               destination: "/fleet/business-class/toyota-granvia",           permanent: true },
      { source: "/fleet/toyota-granvia",         destination: "/fleet/business-class/toyota-granvia",           permanent: true },

      // First Class
      { source: "/mercedes-s500",                destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/fleet/mercedes-s500",          destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/mercedes-s-class",             destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/fleet/mercedes-s-class",       destination: "/fleet/first-class/mercedes-s500",               permanent: true },
      { source: "/bmw-7-series",                 destination: "/fleet/first-class/bmw-7-series",                permanent: true },
      { source: "/fleet/bmw-7-series",           destination: "/fleet/first-class/bmw-7-series",                permanent: true },

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
      { source: "/mercedes-sprinter-ultra-luxury",        destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",  permanent: true },
      { source: "/fleet/mercedes-sprinter-ultra-luxury",  destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-ultra-luxury",  permanent: true },
      { source: "/mercedes-sprinter-19",                  destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",            permanent: true },
      { source: "/fleet/mercedes-sprinter-19",            destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",            permanent: true },
      { source: "/mercedes-sprinter",                     destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",            permanent: true },
      { source: "/fleet/mercedes-sprinter",               destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",            permanent: true },
      { source: "/sprinter",                              destination: "/fleet/mercedes-sprinter-luxury-van/mercedes-sprinter-19",            permanent: true },

      // Mercedes Sprinter Luxury VIP
      { source: "/mercedes-sprinter-avant-garde",         destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-avant-garde",   permanent: true },
      { source: "/fleet/mercedes-sprinter-avant-garde",   destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-avant-garde",   permanent: true },
      { source: "/mercedes-sprinter-business-vip",        destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-business-vip",  permanent: true },
      { source: "/fleet/mercedes-sprinter-business-vip",  destination: "/fleet/mercedes-sprinter-luxury-vip/mercedes-sprinter-business-vip",  permanent: true },

      // Luxury SUV
      { source: "/gmc-yukon-denali",             destination: "/fleet/luxury-suv/gmc-yukon-denali",             permanent: true },
      { source: "/fleet/gmc-yukon-denali",       destination: "/fleet/luxury-suv/gmc-yukon-denali",             permanent: true },
      { source: "/cadillac-escalade",            destination: "/fleet/luxury-suv/cadillac-escalade",            permanent: true },
      { source: "/fleet/cadillac-escalade",      destination: "/fleet/luxury-suv/cadillac-escalade",            permanent: true },
      { source: "/range-rover-sport",            destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/fleet/range-rover-sport",      destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/range-rover",                  destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },
      { source: "/fleet/range-rover",            destination: "/fleet/luxury-suv/range-rover-sport",            permanent: true },

      // Rolls-Royce
      { source: "/rolls-royce-ghost",            destination: "/fleet/rolls-royce/rolls-royce-ghost",           permanent: true },
      { source: "/fleet/rolls-royce-ghost",      destination: "/fleet/rolls-royce/rolls-royce-ghost",           permanent: true },
      { source: "/rolls-royce-cullinan",         destination: "/fleet/rolls-royce/rolls-royce-cullinan",        permanent: true },
      { source: "/fleet/rolls-royce-cullinan",   destination: "/fleet/rolls-royce/rolls-royce-cullinan",        permanent: true },
      { source: "/rolls-royce",                  destination: "/fleet/rolls-royce/rolls-royce-ghost",           permanent: true },

      // Stretch Limousine
      { source: "/gmc-yukon-limousine",                     destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                permanent: true },
      { source: "/fleet/gmc-yukon-limousine",               destination: "/fleet/stretch-limousine/gmc-yukon-limousine",                permanent: true },
      { source: "/chevy-suburban-titanium-limousine",        destination: "/fleet/stretch-limousine/chevy-suburban-titanium-limousine", permanent: true },
      { source: "/fleet/chevy-suburban-titanium-limousine",  destination: "/fleet/stretch-limousine/chevy-suburban-titanium-limousine", permanent: true },
      { source: "/gmc-yukon-diamond-limousine",              destination: "/fleet/stretch-limousine/gmc-yukon-diamond-limousine",       permanent: true },
      { source: "/fleet/gmc-yukon-diamond-limousine",        destination: "/fleet/stretch-limousine/gmc-yukon-diamond-limousine",       permanent: true },
      { source: "/chrysler-emerald-limousine",               destination: "/fleet/stretch-limousine/chrysler-emerald-limousine",        permanent: true },
      { source: "/fleet/chrysler-emerald-limousine",         destination: "/fleet/stretch-limousine/chrysler-emerald-limousine",        permanent: true },
      { source: "/limousine",                                destination: "/fleet/stretch-limousine/gmc-yukon-limousine",               permanent: true },
      { source: "/limo",                                     destination: "/fleet/stretch-limousine/gmc-yukon-limousine",               permanent: true },

      // Standard Bus
      { source: "/toyota-coaster-21",            destination: "/fleet/standard-bus/toyota-coaster-21",          permanent: true },
      { source: "/fleet/toyota-coaster-21",      destination: "/fleet/standard-bus/toyota-coaster-21",          permanent: true },
      { source: "/toyota-coaster",               destination: "/fleet/standard-bus/toyota-coaster-21",          permanent: true },
      { source: "/toyota-hiace-11",              destination: "/fleet/standard-bus/toyota-hiace-11",            permanent: true },
      { source: "/fleet/toyota-hiace-11",        destination: "/fleet/standard-bus/toyota-hiace-11",            permanent: true },
      { source: "/toyota-hiace",                 destination: "/fleet/standard-bus/toyota-hiace-11",            permanent: true },

      // Luxury Coach Bus
      { source: "/50-seater-luxury-coach",        destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach", permanent: true },
      { source: "/fleet/50-seater-luxury-coach",  destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach", permanent: true },
      { source: "/35-seater-luxury-coach",        destination: "/fleet/luxury-coach-bus/35-seater-luxury-coach", permanent: true },
      { source: "/fleet/35-seater-luxury-coach",  destination: "/fleet/luxury-coach-bus/35-seater-luxury-coach", permanent: true },
      { source: "/luxury-coach",                  destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach", permanent: true },
      { source: "/coach-bus",                     destination: "/fleet/luxury-coach-bus/50-seater-luxury-coach", permanent: true },

      // ── About / Contact ──────────────────────────────────────────────────
      { source: "/about-us",     destination: "/about",   permanent: true },
      { source: "/who-we-are",   destination: "/about",   permanent: true },
      { source: "/contact-us",   destination: "/contact", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/reach-us",     destination: "/contact", permanent: true },

      // ── Booking ──────────────────────────────────────────────────────────
      { source: "/book",      destination: "/contact", permanent: true },
      { source: "/booking",   destination: "/contact", permanent: true },
      { source: "/reserve",   destination: "/contact", permanent: true },
      { source: "/quote",     destination: "/contact", permanent: true },
      { source: "/get-quote", destination: "/contact", permanent: true },

      // ── Trailing slash cleanup ───────────────────────────────────────────
      { source: "/services/", destination: "/services", permanent: true },
      { source: "/fleet/",    destination: "/fleet",    permanent: true },
      { source: "/about/",    destination: "/about",    permanent: true },
      { source: "/contact/",  destination: "/contact",  permanent: true },
    ];
  },
};

export default withPWA({
  dest:        "public",
  register:    true,
  skipWaiting: true,
  disable:     false,
})(nextConfig);