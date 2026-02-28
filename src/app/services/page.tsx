import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Briefcase, MapPin, Clock, Star, Car,
  UserRound, ChevronRight, Phone, MessageCircle, CheckCircle, PartyPopper, Van,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chauffeur Services Dubai, Abu Dhabi & Sharjah | Airport Transfer, Corporate, Wedding Limo",
  description:
    "Explore all luxury chauffeur services in Dubai, Abu Dhabi, and Sharjah — airport transfers, corporate chauffeur, wedding limo, VIP sightseeing, luxury van rental, and event transport. Available 24/7 across the UAE.",
  alternates: { canonical: "https://chauffeurdubai.ae/services" },
};

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const services = [
  {
    icon: Plane,
    slug: "airport-transfer-dubai",
    title: "Airport Transfer Dubai, Abu Dhabi & Sharjah",
    keyword: "Dubai Airport Transfer Service",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80",
    imageAlt: "Luxury airport transfer Dubai Abu Dhabi Sharjah - chauffeur meet and greet DXB AUH SHJ",
    description:
      "The most reliable airport transfer service covering DXB, DWC, Abu Dhabi International (AUH), and Sharjah (SHJ) airports. VIP meet & greet, real-time flight tracking, and fixed pricing — no surprises.",
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
    title: "Corporate Chauffeur Service Dubai, Abu Dhabi & Sharjah",
    keyword: "Corporate Chauffeur Service Dubai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    imageAlt: "Corporate chauffeur service Dubai Abu Dhabi Sharjah - executive car hire with driver UAE",
    description:
      "Premium corporate chauffeur service across Dubai, Abu Dhabi, and Sharjah for executives, roadshows, board meetings, and corporate events. Discreet, punctual, and always immaculately presented.",
    features: [
      "Dedicated corporate accounts with monthly billing",
      "Priority booking and 24/7 support",
      "Experienced, professionally dressed chauffeurs",
      "Wi-Fi enabled vehicles for working on the go",
      "Full-day chauffeur service in Dubai, Abu Dhabi & Sharjah",
      "Serving all business districts across the UAE",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Corporate Chauffeur Dubai",
  },
  {
    icon: UserRound,
    slug: "vip-chauffeur-dubai",
    title: "VIP Chauffeur Service Dubai, Abu Dhabi & Sharjah",
    keyword: "VIP Airport Pick-Up Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    imageAlt: "VIP chauffeur service Dubai Abu Dhabi - Rolls-Royce with driver luxury transport UAE",
    description:
      "The ultimate VIP airport pick-up and executive transport experience across Dubai, Abu Dhabi, and Sharjah. Rolls-Royce, limousines, and the finest luxury vehicles with white-glove service.",
    features: [
      "Rolls-Royce rental with driver in Dubai & Abu Dhabi",
      "VIP airport pick-up at DXB, DWC, AUH & SHJ with name board",
      "White-glove concierge-level service",
      "Discreet handling for celebrities & executives",
      "Luxury limousine service for events & galas",
      "Available across Dubai, Abu Dhabi, Sharjah and the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book VIP Chauffeur Dubai",
  },
  {
    icon: Van,
    slug: "luxury-van-rental-dubai",
    title: "Luxury Van Rental Dubai, Abu Dhabi & Sharjah",
    keyword: "Luxury Van Rental Dubai Abu Dhabi Sharjah with Driver",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80",
    imageAlt: "Luxury van rental Dubai Abu Dhabi Sharjah - Mercedes Sprinter VIP van hire with driver UAE",
    description:
      "Spacious, stylish, and fully equipped — our luxury van rental service is perfect for group airport transfers, corporate roadshows, family trips, and VIP events across Dubai, Abu Dhabi, and Sharjah.",
    features: [
      "Mercedes Sprinter VIP, V-Class & Toyota Granvia available",
      "7 to 19 seats — ideal for groups and families",
      "Professional chauffeur included",
      "Airport transfers, tours & corporate use across Dubai, Abu Dhabi & Sharjah",
      "Wi-Fi, leather seating & privacy glass",
      "Available 24/7 across the UAE",
    ],
    price: "Starting from AED 450",
    ctaLabel: "Book Luxury Van Dubai",
  },
  {
    icon: Clock,
    slug: "full-day-chauffeur-dubai",
    title: "Full Day & Hourly Chauffeur Dubai, Abu Dhabi & Sharjah",
    keyword: "Full Day Chauffeur Service Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    imageAlt: "Full day chauffeur service Dubai Abu Dhabi Sharjah - hourly car hire with driver UAE",
    description:
      "Maximum flexibility — book a full day chauffeur service or hire by the hour across Dubai, Abu Dhabi, and Sharjah. Perfect for shopping, meetings, events, or anything in between.",
    features: [
      "Half-day, full-day, and hourly packages",
      "No hidden extras - fixed hourly rates",
      "Wait-and-return available at any location",
      "Available across Dubai, Abu Dhabi & Sharjah",
      "Same professional luxury fleet",
      "Ideal for shopping trips, meetings & events",
    ],
    price: "Starting from AED 900 / 5 Hr",
    ctaLabel: "Book Full Day Chauffeur Dubai",
  },
  {
    icon: PartyPopper,
    slug: "event-transport-dubai",
    title: "Event Transport Dubai, Abu Dhabi & Sharjah",
    keyword: "Event Transport Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80",
    imageAlt: "Event transport Dubai Abu Dhabi Sharjah - luxury coach group chauffeur hire GITEX UAE",
    description:
      "Professional event transport for corporate events, exhibitions, trade shows, conferences, and private functions across Dubai, Abu Dhabi, and Sharjah. We handle all logistics so your guests arrive on time, comfortably, and in style.",
    features: [
      "Corporate events, conferences & trade shows (GITEX, Arab Health & more)",
      "Exhibitions & business summits across Dubai & Abu Dhabi",
      "Private functions, galas & corporate dinners",
      "Group transport with luxury vans, SUVs & coaches",
      "Multi-vehicle coordination for large-scale events across the UAE",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Event Transport Dubai",
  },
  {
    icon: Star,
    slug: "wedding-limo-dubai",
    title: "Wedding Limo Dubai, Abu Dhabi & Sharjah",
    keyword: "Wedding Limo Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1519741347686-c1e331ec5e89?w=700&q=80",
    imageAlt: "Wedding limo Dubai Abu Dhabi Sharjah - Rolls-Royce bridal car hire with chauffeur UAE",
    description:
      "Make your wedding day unforgettable with our wedding limo service in Dubai, Abu Dhabi, and Sharjah. From Rolls-Royce rental with driver to stretch limousines — arrive in absolute style.",
    features: [
      "Rolls-Royce, stretch limos & luxury sedans available",
      "Decorated vehicle options for weddings",
      "Professional, discreet chauffeurs",
      "Punctual - we work around your wedding timeline",
      "Hotel, venue & event transfers across Dubai, Abu Dhabi & Sharjah",
      "Available across the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book Wedding Limo Dubai",
  },
  {
    icon: MapPin,
    slug: "private-driver-sightseeing-dubai",
    title: "Private Driver for Sightseeing Dubai & Abu Dhabi",
    keyword: "Private Driver for Sightseeing Dubai Abu Dhabi",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",
    imageAlt: "Private driver sightseeing Dubai Abu Dhabi - Burj Khalifa Sheikh Zayed Mosque tour chauffeur",
    description:
      "Explore Dubai and Abu Dhabi's most iconic landmarks with a private sightseeing driver. Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque, and more — at your own pace.",
    features: [
      "Customised sightseeing routes across Dubai & Abu Dhabi",
      "Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque & more",
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
    title: "Monthly Car with Driver Service Dubai, Abu Dhabi & Sharjah",
    keyword: "Monthly Car with Driver Service Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80",
    imageAlt: "Monthly car with driver service Dubai Abu Dhabi Sharjah - dedicated chauffeur hire UAE",
    description:
      "Our monthly car with driver service gives you a dedicated professional chauffeur for daily commutes, school runs, and errands across Dubai, Abu Dhabi, and Sharjah — all at a fixed monthly rate.",
    features: [
      "Dedicated assigned chauffeur each month",
      "Fixed monthly pricing - no surprises",
      "Daily commutes, school runs & errands across Dubai, Abu Dhabi & Sharjah",
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
          alt="Chauffeur services Dubai Abu Dhabi Sharjah - luxury car service airport transfer corporate wedding UAE"
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
            Chauffeur Dubai Luxury Travel · Dubai, Abu Dhabi & Sharjah
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
            in Dubai, Abu Dhabi & Sharjah
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Airport transfers, corporate chauffeur, wedding limo, sightseeing,
            event transport, and more — all across Dubai, Abu Dhabi, Sharjah, and the UAE.
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
          Our team is available 24/7 across Dubai, Abu Dhabi, and Sharjah. Tell us your journey and we&apos;ll recommend
          the perfect vehicle and service for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/971509852818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
            title="WhatsApp Chauffeur Dubai Luxury Travel Dubai Abu Dhabi Sharjah"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
          <a
            href="tel:+971509852818"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold px-8 py-4 rounded-full transition-all"
            title="Call Chauffeur Dubai Luxury Travel - chauffeur service Dubai Abu Dhabi Sharjah"
          >
            <Phone size={18} />
            +971 50 985 2818
          </a>
        </div>
      </section>
    </>
  );
}
