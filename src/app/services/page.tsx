import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Briefcase, MapPin, Clock, Star, Car,
  UserRound, ChevronRight, Phone, MessageCircle, CheckCircle, PartyPopper,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chauffeur Services Dubai | Airport Transfer, Corporate, Wedding Limo",
  description:
    "Explore all luxury chauffeur services in Dubai - airport transfers, corporate chauffeur, wedding limo, VIP sightseeing, monthly car with driver service, and event transport Dubai. Available 24/7.",
  alternates: { canonical: "https://chauffeurdubai.ae/services" },
};

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const services = [
  {
    icon: Plane,
    slug: "airport-transfer-dubai",
    title: "Airport Transfer Dubai",
    keyword: "Dubai Airport Transfer Service",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80",
    imageAlt: "Luxury airport transfer Dubai - chauffeur meet and greet DXB",
    description:
      "The most reliable dubai airport transfer service covering DXB, DWC, Abu Dhabi, and Sharjah airports. VIP meet & greet, real-time flight tracking, and fixed pricing - no surprises.",
    features: [
      "Meet & greet with name board at arrivals",
      "Real-time flight tracking - we wait for delays",
      "All UAE airports: DXB, DWC, AUH, SHJ",
      "Luxury fleet - Mercedes S-Class, BMW 7 Series",
      "Fixed transparent pricing, no surge fees",
      "24/7 availability, 365 days a year",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Airport Transfer Dubai",
  },
  {
    icon: Briefcase,
    slug: "corporate-chauffeur-dubai",
    title: "Corporate Chauffeur Service Dubai",
    keyword: "Corporate Chauffeur Service Dubai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    imageAlt: "Corporate chauffeur service Dubai - executive car hire with driver",
    description:
      "Premium corporate chauffeur service Dubai for executives, roadshows, board meetings, and corporate events. Discreet, punctual, and always immaculately presented.",
    features: [
      "Dedicated corporate accounts with monthly billing",
      "Priority booking and 24/7 support",
      "Experienced, professionally dressed chauffeurs",
      "Wi-Fi enabled vehicles for working on the go",
      "Full-day chauffeur service Dubai available",
      "Serving all business districts across Dubai",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Corporate Chauffeur Dubai",
  },
  {
    icon: UserRound,
    slug: "vip-chauffeur-dubai",
    title: "VIP Chauffeur Service Dubai",
    keyword: "VIP Airport Pick-Up Dubai",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    imageAlt: "VIP chauffeur service Dubai - Rolls-Royce with driver luxury transport",
    description:
      "The ultimate VIP airport pick-up Dubai and executive transport experience. Rolls-Royce, Limousines, and the finest luxury vehicles with white-glove service.",
    features: [
      "Rolls-Royce rental with driver Dubai",
      "VIP airport pick-up Dubai with name board",
      "White-glove concierge-level service",
      "Discreet handling for celebrities & executives",
      "Luxury limousine service for events & galas",
      "Available across Dubai and the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book VIP Chauffeur Dubai",
  },
  {
    icon: Clock,
    slug: "full-day-chauffeur-dubai",
    title: "Full Day & Hourly Chauffeur Dubai",
    keyword: "Full Day Chauffeur Service Dubai",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    imageAlt: "Full day chauffeur service Dubai - hourly car hire with driver UAE",
    description:
      "Maximum flexibility - book a full day chauffeur service Dubai or hire by the hour. Perfect for shopping, meetings, events, or anything in between.",
    features: [
      "Half-day, full-day, and hourly packages",
      "No hidden extras - fixed hourly rates",
      "Wait-and-return available at any location",
      "Available across Dubai, Abu Dhabi & UAE",
      "Same professional luxury fleet",
      "Ideal for shopping trips, meetings & events",
    ],
    price: "Starting from AED 900 / 5 Hr",
    ctaLabel: "Book Full Day Chauffeur Dubai",
  },
  {
    icon: PartyPopper,
    slug: "event-transport-dubai",
    title: "Event Transport Dubai",
    keyword: "Event Transport Dubai",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80",
    imageAlt: "Event transport Dubai - luxury coach and group chauffeur hire GITEX UAE",
    description:
      "Professional event transport Dubai for corporate events, exhibitions, trade shows, conferences, and private functions. We handle all logistics so your guests arrive on time, comfortably, and in style.",
    features: [
      "Corporate events, conferences & trade shows (GITEX, Arab Health & more)",
      "Exhibitions & business summits",
      "Private functions, galas & corporate dinners",
      "Group transport with luxury vans, SUVs & coaches",
      "Multi-vehicle coordination for large-scale events",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Event Transport Dubai",
  },
  {
    icon: Star,
    slug: "wedding-limo-dubai",
    title: "Wedding Limo Dubai",
    keyword: "Wedding Limo Dubai",
    image: "https://images.unsplash.com/photo-1519741347686-c1e331ec5e89?w=700&q=80",
    imageAlt: "Wedding limo Dubai - Rolls-Royce bridal car hire with chauffeur UAE",
    description:
      "Make your wedding day unforgettable with our wedding limo Dubai service. From Rolls-Royce rental with driver Dubai to stretch limousines - arrive in absolute style.",
    features: [
      "Rolls-Royce, stretch limos & luxury sedans available",
      "Decorated vehicle options for weddings",
      "Professional, discreet chauffeurs",
      "Punctual - we work around your wedding timeline",
      "Hotel, venue & event transfers covered",
      "Available across Dubai and the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book Wedding Limo Dubai",
  },
  {
    icon: MapPin,
    slug: "private-driver-sightseeing-dubai",
    title: "Private Driver for Sightseeing Dubai",
    keyword: "Private Driver for Sightseeing Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",
    imageAlt: "Private driver sightseeing Dubai - Burj Khalifa Palm Jumeirah tour chauffeur",
    description:
      "Explore Dubai's most iconic landmarks with a private driver for sightseeing Dubai. Burj Khalifa, Palm Jumeirah, Dubai Marina, and more - at your own pace.",
    features: [
      "Customised sightseeing routes across Dubai",
      "Burj Khalifa, Palm Jumeirah, Dubai Marina & more",
      "Knowledgeable, friendly chauffeurs",
      "Flexible hourly or full-day packages",
      "Comfortable luxury vehicles with privacy",
      "Perfect for tourists, VIP guests, and families",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Sightseeing Driver Dubai",
  },
  {
    icon: Car,
    slug: "monthly-car-with-driver-dubai",
    title: "Monthly Car with Driver Service Dubai",
    keyword: "Monthly Car with Driver Service Dubai",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80",
    imageAlt: "Monthly car with driver service Dubai - dedicated chauffeur hire UAE",
    description:
      "Our monthly car with driver service gives you a dedicated professional chauffeur for daily commutes, school runs, and errands - all at a fixed monthly rate.",
    features: [
      "Dedicated assigned chauffeur each month",
      "Fixed monthly pricing - no surprises",
      "Daily commutes, school runs & errands",
      "Available mornings, evenings or full-day",
      "Trusted, background-checked drivers",
      "Flexible scheduling to suit your lifestyle",
    ],
    price: "Custom Monthly Rates",
    ctaLabel: "Enquire Monthly Driver Dubai",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
          alt="Chauffeur services Dubai - luxury car service airport transfer corporate wedding"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(183,110,121,0.4) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#e8a4a0" }}
          >
            Privilege Luxury Travel · Dubai & UAE
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur Services
            </span>{" "}
            in Dubai
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Airport transfers, corporate chauffeur, wedding limo, sightseeing,
            event transport, and more — all across Dubai and the UAE.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ─────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {services.map(
            ({ icon: Icon, title, keyword, image, imageAlt, description, features, price, slug, ctaLabel }, i) => (
              <div
                key={slug}
                className={`bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 ${
                  i % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-64 lg:h-auto overflow-hidden ${
                    i % 2 !== 0 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: roseGoldGradient }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: roseGoldGradient }}
                    >
                      {price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "#b76e79" }}
                  >
                    {keyword}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
                    {title}
                  </h2>
                  <p className="text-zinc-500 leading-relaxed mb-6 text-sm">
                    {description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-zinc-600 text-sm">
                        <CheckCircle
                          size={15}
                          className="shrink-0 mt-0.5"
                          style={{ color: "#b76e79" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Link
                      href={`/services/${slug}`}
                      className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all shadow-md"
                      style={{ background: roseGoldGradient }}
                      title={ctaLabel}
                    >
                      <ChevronRight size={15} />
                      {ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: roseGoldGradient }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Not Sure Which Service You Need?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Our team is available 24/7. Tell us your journey and we&apos;ll recommend
          the perfect vehicle and service for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/971509852818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
            title="WhatsApp Privilege Luxury Travel Dubai"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
          <a
            href="tel:+971509852818"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold px-8 py-4 rounded-full transition-all"
            title="Call Privilege Luxury Travel Dubai chauffeur service"
          >
            <Phone size={18} />
            +971 50 985 2818
          </a>
        </div>
      </section>
    </>
  );
}
