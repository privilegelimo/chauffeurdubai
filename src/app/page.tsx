import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Plane,
  Briefcase,
  MapPin,
  Clock,
  Car,
  Shield,
  Phone,
  MessageCircle,
  CheckCircle,
  Award,
  Users,
  ThumbsUp,
  UserRound,
  Luggage,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chauffeur Service Dubai | Luxury Chauffeur & Limo Rental Dubai UAE",
  description:
    "Book the best luxury chauffeur service in Dubai. Mercedes S-Class, BMW 7 Series, Rolls-Royce, Tesla & more with professional drivers. Airport transfers, corporate, wedding & VIP chauffeur service Dubai — available 24/7.",
  keywords: [
    "chauffeur service dubai",
    "limo rental dubai",
    "dubai airport transfer",
    "luxury chauffeur dubai",
    "rolls royce rental with driver dubai",
    "mercedes s class chauffeur dubai",
    "tesla chauffeur service dubai",
    "wedding limo dubai",
    "corporate chauffeur service dubai",
    "private driver dubai",
    "vip airport pick-up dubai",
    "monthly driver dubai",
    "mercedes sprinter rent with driver",
    "mercedes v class with driver dubai",
    "bmw 7 series with driver dubai",
    "chauffeur service dubai to abu dhabi",
  ],
  alternates: { canonical: "https://chauffeurdubai.ae" },
};

// ─── JSON-LD ───────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://chauffeurdubai.ae",
  name: "Chauffeur Dubai — Privilege Luxury Travel",
  description:
    "Premium chauffeur service in Dubai. Luxury airport transfers, corporate chauffeur, wedding limo, VIP transportation across Dubai and UAE.",
  url: "https://chauffeurdubai.ae",
  telephone: "+971509200818",
  priceRange: "AED 350 - AED 7000",
  image: "https://chauffeurdubai.ae/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shraifi One Building Suite 32 - Zaa'beel St",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.2048, longitude: 55.2708 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday","Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Chauffeur Services Dubai",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Chauffeur Service Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Limo Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rolls Royce Rental with Driver Dubai" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mercedes Sprinter Rent with Driver Dubai" } },
    ],
  },
};

// ─── Constants ─────────────────────────────────────────────────────────────
const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── Vehicle Classes ────────────────────────────────────────────────────────
const vehicleClasses = [
  {
    slug: "business-class",
    label: "Business Class",
    tagline: "Executive comfort for every journey",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    vehicles: "BMW 7 Series with driver, Mercedes S 450, or similar",
    passengers: 3,
    luggage: "3 bags",
    priceFrom: "AED 350",
    description:
      "Elegant executive sedans for corporate chauffeur service Dubai, airport transfers, and business meetings.",
  },
  {
    slug: "first-class",
    label: "First Class",
    tagline: "The pinnacle of luxury travel",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    vehicles: "Mercedes S 500, Mercedes S-Class chauffeur Dubai, or similar",
    passengers: 3,
    luggage: "3 bags",
    priceFrom: "AED 900",
    description:
      "The most prestigious sedans in our fleet. Ideal for VIP airport pick-up Dubai, executives, and special occasions.",
  },
  {
    slug: "business-van",
    label: "Business Van",
    tagline: "Space and luxury for groups",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80",
    vehicles: "Mercedes V-Class with driver, Vito with driver, VIP Trend 250",
    passengers: 7,
    luggage: "7 bags",
    priceFrom: "AED 350",
    description:
      "Luxury van rental with driver Dubai — perfect for families, groups, or anyone travelling with extra luggage.",
  },
  {
    slug: "vip-sprinter",
    label: "VIP Sprinter",
    tagline: "First class on wheels for large groups",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    vehicles: "Mercedes Sprinter rent with driver — Avant Garde VIP, Ultra Luxury",
    passengers: 16,
    luggage: "9 bags",
    priceFrom: "AED 1,000",
    description:
      "Ultra-luxury Mercedes Sprinter rent with driver. Lavish interiors for large group airport transfers and events.",
  },
  {
    slug: "luxury-suv",
    label: "Luxury SUV",
    tagline: "Commanding presence on every road",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    vehicles: "GMC Yukon Denali, Cadillac Escalade limo Dubai, SUV rent with driver",
    passengers: 7,
    luggage: "7 bags",
    priceFrom: "AED 350",
    description:
      "Bold, spacious SUVs — Cadillac Escalade limo Dubai and GMC Yukon Denali for families and executive groups.",
  },
  {
    slug: "limousine",
    label: "Limousine",
    tagline: "Make your grandest entrance",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
    vehicles: "GMC Yukon Limousine, best luxury limousine service Dubai",
    passengers: 18,
    luggage: "2 bags",
    priceFrom: "AED 850",
    description:
      "Wedding limo Dubai, VIP nights out, and celebrations. The best luxury limousine service Dubai has to offer.",
  },
  {
    slug: "luxury-bus",
    label: "Luxury Bus",
    tagline: "Premium group travel, no compromise",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
    vehicles: "50 Seater Luxury Coach — bus rental Dubai",
    passengers: 50,
    luggage: "50 bags",
    priceFrom: "AED 800",
    description:
      "Bus rental Dubai for corporate events, airport group transfers, and sightseeing tours across the UAE.",
  },
];

// ─── Services ───────────────────────────────────────────────────────────────
const services = [
  {
    icon: Plane,
    title: "Airport Transfers in Dubai",
    href: "/services/airport-transfer",
    description:
      "VIP airport pick-up Dubai — punctual luxury transfers at DXB, DWC, Abu Dhabi & Sharjah airports. Real-time flight tracking included.",
  },
  {
    icon: Briefcase,
    title: "Corporate Chauffeur Service Dubai",
    href: "/services/corporate",
    description:
      "Full-day chauffeur service Dubai for business meetings, roadshows, and corporate events. Discreet, professional, always on time.",
  },
  {
    icon: MapPin,
    title: "Private Driver for Sightseeing Dubai",
    href: "/services/city-tour",
    description:
      "Explore Burj Khalifa, Palm Jumeirah, and Dubai's landmarks with a private driver for sightseeing Dubai — at your own pace.",
  },
  {
    icon: Clock,
    title: "Hourly & Full Day Chauffeur Dubai",
    href: "/services/hourly",
    description:
      "Hire a chauffeur by the hour or book full day chauffeur service Dubai for complete flexibility across the UAE.",
  },
  {
    icon: Star,
    title: "Wedding Limo Dubai",
    href: "/services/wedding",
    description:
      "Arrive in iconic style with our wedding limo Dubai service. Rolls-Royce, stretch limousines, and luxury sedans for your special day.",
  },
  {
    icon: Car,
    title: "Monthly Driver Dubai Service",
    href: "/services/monthly",
    description:
      "Monthly driver Dubai service — dedicated private chauffeur for daily commutes, school runs, and regular travel needs.",
  },
  {
    icon: Plane,
    title: "Chauffeur Service Dubai to Abu Dhabi",
    href: "/services/intercity",
    description:
      "Seamless intercity transfers — chauffeur service Dubai to Abu Dhabi, Sharjah, and all UAE emirates in premium comfort.",
  },
  {
    icon: UserRound,
    title: "Rolls-Royce Rental with Driver Dubai",
    href: "/fleet/first-class",
    description:
      "Experience the ultimate in luxury with Rolls-Royce rental with driver Dubai. Available for events, airport transfers, and city tours.",
  },
  {
    icon: Car,
    title: "Tesla Chauffeur Service Dubai",
    href: "/fleet/business-class",
    description:
      "Eco-luxury redefined. Tesla chauffeur service Dubai for the modern executive who values technology and sustainability.",
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users,    value: "10,000+",  label: "Happy Clients"    },
  { icon: Car,      value: "20+ Cars", label: "Luxury Vehicles"  },
  { icon: Award,    value: "20 Years", label: "Experience"       },
  { icon: ThumbsUp, value: "4.9★",     label: "Average Rating"   },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I book a chauffeur service in Dubai?",
    a: "Book instantly via WhatsApp at +971 50 920 0818, call us, or email booking@privilegelimo.com. We confirm within minutes, 24/7.",
  },
  {
    q: "Do you offer VIP airport pick-up in Dubai?",
    a: "Yes — our VIP airport pick-up Dubai service covers DXB, DWC, Abu Dhabi, and Sharjah airports with meet & greet and real-time flight tracking.",
  },
  {
    q: "What vehicles are available for chauffeur hire in Dubai?",
    a: "Our fleet includes Mercedes S-Class, BMW 7 Series with driver, Rolls-Royce rental with driver Dubai, Tesla chauffeur service Dubai, GMC Yukon Denali, Cadillac Escalade, Mercedes Sprinter rent with driver, and a 50-seater luxury bus.",
  },
  {
    q: "Do you offer a chauffeur service from Dubai to Abu Dhabi?",
    a: "Yes — we provide intercity chauffeur service Dubai to Abu Dhabi, Sharjah, Al Ain, and all UAE emirates at fixed rates.",
  },
  {
    q: "Can I hire a monthly driver in Dubai?",
    a: "Absolutely. Our monthly driver Dubai service provides a dedicated chauffeur for daily commutes, school runs, and regular travel.",
  },
  {
    q: "Do you offer Mercedes Sprinter rent with driver in Dubai?",
    a: "Yes — we offer Mercedes Sprinter rent with driver for group transfers, corporate events, and airport runs across Dubai and the UAE.",
  },
  {
    q: "Is your luxury chauffeur service available 24/7 in Dubai?",
    a: "Yes, our professional chauffeurs are available around the clock, 365 days a year across Dubai and the UAE.",
  },
];

// ────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1647200527435-cc6b0e91e120?w=1800&q=90"
          alt="Luxury chauffeur service Dubai — professional private driver"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(183,110,121,0.55) 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div
            className="inline-flex items-center gap-2 text-white text-xs font-semibold px-5 py-2 rounded-full mb-8 uppercase tracking-widest shadow-md"
            style={{ background: roseGoldGradient }}
          >
            <Star size={12} fill="white" />
            20 Years of Premium Chauffeur Service in Dubai
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Luxury{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur Service
            </span>
            <br />
            Dubai, UAE
          </h1>

          <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Premium{" "}
            <strong className="text-white">limo rental Dubai</strong>,{" "}
            <strong className="text-white">Dubai airport transfers</strong>,{" "}
            <strong className="text-white">corporate chauffeur service Dubai</strong>,
            and <strong className="text-white">wedding limo Dubai</strong> —
            available 24/7 with professional licensed drivers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/971509200818?text=Hi,%20I%20want%20to%20book%20a%20chauffeur%20service%20in%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-bold text-base px-9 py-4 rounded-full shadow-2xl hover:opacity-90 transition-all duration-200"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={18} />
              Book via WhatsApp
              <ChevronRight size={18} />
            </a>
            <a
              href="tel:+971509200818"
              className="flex items-center gap-2 border-2 border-white/70 text-white hover:border-white hover:bg-white/10 font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Phone size={18} />
              +971 50 920 0818
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              "✓ Licensed Professional Drivers",
              "✓ Luxury Fleet — Mercedes, BMW, Rolls-Royce",
              "✓ 24/7 Availability",
              "✓ Fixed Transparent Rates",
            ].map((b) => (
              <span key={b} className="font-medium text-white/80">{b}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="uppercase tracking-widest text-[10px]">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-rose-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: roseGoldGradientSubtle }}
              >
                <Icon size={22} style={{ color: "#b76e79" }} />
              </div>
              <p
                className="text-3xl font-bold"
                style={{
                  background: roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </p>
              <p className="text-zinc-500 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VEHICLE CLASSES ───────────────────────────────────────────── */}
      <section
        id="fleet"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
        aria-label="Luxury Chauffeur Fleet Classes Dubai"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b76e79" }}
            >
              Choose Your Class
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
              Luxury Chauffeur Fleet Dubai
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              From <strong className="text-zinc-700">Mercedes S-Class chauffeur Dubai</strong> to{" "}
              <strong className="text-zinc-700">luxury van rental with driver Dubai</strong>,{" "}
              <strong className="text-zinc-700">limo rental Dubai</strong>, and{" "}
              <strong className="text-zinc-700">bus rental</strong> — choose your class below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleClasses.map(
              ({ slug, label, tagline, image, vehicles, passengers, luggage, priceFrom, description }) => (
                <Link
                  key={slug}
                  href={`/fleet/${slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={image}
                      alt={`${label} chauffeur Dubai — ${vehicles}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <span
                        className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: roseGoldGradient }}
                      >
                        From {priceFrom}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ color: "#b76e79" }}
                    >
                      {tagline}
                    </p>
                    <h3 className="text-zinc-900 font-bold text-xl mb-2">{label}</h3>
                    <p className="text-zinc-500 text-sm mb-3 leading-relaxed">{description}</p>
                    <p className="text-zinc-400 text-xs italic mb-4">{vehicles}</p>

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-rose-50">
                      <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                        <UserRound size={14} style={{ color: "#b76e79" }} />
                        Up to {passengers} passengers
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                        <Luggage size={14} style={{ color: "#b76e79" }} />
                        {luggage}
                      </div>
                    </div>

                    <div
                      className="mt-4 flex items-center gap-1 text-sm font-semibold"
                      style={{ color: "#b76e79" }}
                    >
                      View Vehicles
                      <ChevronRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="Chauffeur Services Dubai"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b76e79" }}
            >
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
              Our Chauffeur Services in Dubai
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              From <strong className="text-zinc-700">airport transfers in Dubai</strong> to{" "}
              <strong className="text-zinc-700">chauffeur service near me</strong> searches —
              we cover every journey across Dubai and the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white rounded-2xl p-7 border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: roseGoldGradientSubtle }}
                >
                  <Icon size={22} style={{ color: "#b76e79" }} />
                </div>
                <h3 className="text-zinc-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{description}</p>
                <div
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "#b76e79" }}
                >
                  Learn More
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fdf0ef 0%, #fff 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b76e79" }}
            >
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
              The Best Luxury Chauffeur{" "}
              <span
                style={{
                  background: roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Service in Dubai
              </span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-8">
              With 20 years serving Dubai's elite, Privilege Luxury Travel is the
              most trusted name in{" "}
              <strong className="text-zinc-700">luxury chauffeur Dubai</strong>.
              Whether you need a{" "}
              <strong className="text-zinc-700">chauffeur service near me</strong>,
              a <strong className="text-zinc-700">monthly driver Dubai</strong>{" "}
              service, or a one-time{" "}
              <strong className="text-zinc-700">VIP airport pick-up Dubai</strong>{" "}
              — we handle every journey with precision and care.
            </p>
            <ul className="space-y-4">
              {[
                "Fully licensed, insured & background-checked chauffeurs",
                "Real-time flight tracking for all airport transfers in Dubai",
                "Immaculately maintained premium vehicles — Mercedes, BMW, Rolls-Royce",
                "Transparent fixed pricing — no hidden fees, no surge pricing",
                "Corporate accounts available with priority service",
                "Serving DXB, DWC, Abu Dhabi, Sharjah airports 24/7",
                "Intercity transfers — chauffeur service Dubai to Abu Dhabi & beyond",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-600 text-sm">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#b76e79" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl p-8 text-white shadow-2xl"
            style={{ background: roseGoldGradient }}
          >
            <Shield size={40} className="mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-3">Your Safety & Comfort First</h3>
            <p className="opacity-80 leading-relaxed mb-6">
              Every chauffeur at Privilege Luxury Travel undergoes rigorous background
              checks, defensive driving certification, and ongoing training — so
              every ride is safe, smooth, and truly luxurious.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "100%",     label: "Background Checked"  },
                { val: "4.9★",     label: "Client Rating"       },
                { val: "20 Years", label: "Industry Experience" },
                { val: "24/7",     label: "Customer Support"    },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold">{val}</p>
                  <p className="text-xs opacity-75 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AIRPORT TRANSFER ──────────────────────────────────────────── */}
      <section
        id="airport-transfer"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="Airport Transfer Dubai — VIP Airport Pick-up Dubai"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85"
              alt="Dubai airport transfer service — VIP airport pick-up Dubai at DXB"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-bold text-zinc-900 text-sm">
                  ✈ DXB, DWC, Abu Dhabi & Sharjah Coverage
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  All UAE airports covered 24/7 with VIP meet & greet
                </p>
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b76e79" }}
            >
              Most Booked Service
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5">
              Airport Transfers in Dubai
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-8">
              The most trusted{" "}
              <strong className="text-zinc-700">dubai airport transfer</strong> service
              in the UAE. We cover Dubai International (DXB), Al Maktoum (DWC),
              Abu Dhabi, and Sharjah airports. Your chauffeur tracks your flight live —
              if it's delayed, we adjust. Our{" "}
              <strong className="text-zinc-700">VIP airport pick-up Dubai</strong>{" "}
              service includes meet & greet, name board, and luggage assistance.
              No waiting, no surge pricing, no stress.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: "Meet & Greet",
                  desc: "Your chauffeur meets you at arrivals with a name board.",
                },
                {
                  title: "Flight Tracking",
                  desc: "Real-time flight monitoring — we adjust to every delay.",
                },
                {
                  title: "Fixed Pricing",
                  desc: "No surge pricing. Transparent rates across all airports.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl p-5 border border-rose-100"
                  style={{ background: roseGoldGradientSubtle }}
                >
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">{title}</h3>
                  <p className="text-zinc-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/971509200818?text=Hi,%20I%20need%20an%20airport%20transfer%20in%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold text-base px-9 py-4 rounded-full shadow-xl hover:opacity-90 transition-all duration-200"
              style={{ background: roseGoldGradient }}
            >
              <Plane size={18} />
              Book Airport Transfer
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fdf0ef 0%, #fff 100%)" }}
        aria-label="FAQ — Chauffeur Service Dubai"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b76e79" }}
            >
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-500 mt-3 text-sm">
              Everything you need to know about our luxury chauffeur service in Dubai.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm"
              >
                <h3 className="font-bold text-zinc-900 mb-2">{q}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: roseGoldGradient }}
        aria-label="Book Chauffeur Service Dubai"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Book Your Luxury Chauffeur in Dubai
          </h2>
          <p className="opacity-80 text-lg mb-4 max-w-2xl mx-auto">
            Whether you need a{" "}
            <strong className="text-white">limo rental Dubai</strong>, a{" "}
            <strong className="text-white">monthly driver Dubai</strong> service,
            or a last-minute{" "}
            <strong className="text-white">chauffeur service near me</strong> — we're
            available 24/7.
          </p>
          <p className="opacity-70 text-sm mb-10">
            📍 Shraifi One Building, Suite 32, Zaa'beel St, Dubai, UAE
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971509200818?text=Hi,%20I%20want%20to%20book%20a%20chauffeur%20service%20in%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white font-bold text-base px-9 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
              style={{ color: "#b76e79" }}
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            <a
              href="tel:+971509200818"
              className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold text-base px-9 py-4 rounded-full transition-all duration-200"
            >
              <Phone size={20} />
              +971 50 920 0818
            </a>
            <a
              href="mailto:booking@privilegelimo.com"
              className="flex items-center gap-3 border-2 border-white/50 text-white/80 hover:bg-white/10 font-semibold text-base px-9 py-4 rounded-full transition-all duration-200"
            >
              booking@privilegelimo.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
