"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Car,
  Shield,
  Phone,
  MessageCircle,
  CheckCircle,
  Users,
  Award,
  ThumbsUp,
  CalendarDays,
  Navigation,
  Route,
  User,
  X,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────
const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";
const WA_BASE                = "https://wa.me/971509852818";

// ─── JSON-LD ───────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://chauffeurdubai.ae/services/uae-to-oman-chauffeur",
  name: "UAE to Oman Chauffeur Service",
  description:
    "Premium chauffeur service from Dubai, Abu Dhabi, and Sharjah to Muscat, Salalah, and all Oman destinations. Luxury cars with professional drivers for intercity transfers across UAE and Oman.",
  provider: {
    "@type": "LocalBusiness",
    name: "Chauffeur Dubai Luxury Travel",
    url: "https://chauffeurdubai.ae",
    telephone: "+971509852818",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shraifi One Building Suite 45 - Zaa'beel St",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
  areaServed: [
    { "@type": "City", name: "Dubai"     },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "City", name: "Sharjah"   },
    { "@type": "City", name: "Muscat"    },
    { "@type": "City", name: "Salalah"   },
    { "@type": "City", name: "Nizwa"     },
    { "@type": "City", name: "Sur"       },
  ],
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "AED",
      price: "From AED 2000",
    },
  },
};

// ─── Routes ────────────────────────────────────────────────────────────────
const popularRoutes = [
  { from: "Dubai",          to: "Muscat",  distance: "~450 km",   duration: "~4.5–5.5 hrs",     price: "From AED 2500"},
  { from: "Abu Dhabi",      to: "Muscat",  distance: "~500 km",   duration: "~5–6 hrs", price: "From AED 3200"},
  { from: "Dubai",          to: "Sohar",   distance: "~250 km",   duration: "~3–4 hrs",     price: "From AED 2000"},
  { from: "Dubai",          to: "Salalah", distance: "~1,250 km", duration: "~12–13 hrs",   price: "From AED 6000"},
  { from: "Abu Dhabi",      to: "Sohar",   distance: "~300 km",   duration: "~3–4 hrs",   price: "From AED 3000"},
  { from: "Abu Dhabi",      to: "Salalah",  distance: "~1300 km",   duration: "~13–14 hrs",    price: "From AED 7000"},
  
];

// ─── Features ──────────────────────────────────────────────────────────────
const features = [
  {
    icon: Shield,
    title: "Licensed for UAE–Oman Border Crossings",
    desc: "Our chauffeurs are fully licensed and experienced with Hatta border, Al Wajajah border, and Al Ain–Buraimi border crossings - zero delays.",
  },
  {
    icon: Car,
    title: "Luxury Fleet for Long-Distance Comfort",
    desc: "Mercedes S-Class, BMW 7 Series, Mercedes V-Class, and Sprinter vans - all maintained to the highest standard for long UAE to Oman drives.",
  },
  {
    icon: Clock,
    title: "Fixed Pricing - No Surprises",
    desc: "One fixed rate from your pickup in Dubai, Abu Dhabi, or Sharjah to your drop-off anywhere in Oman. No meters, no surge pricing.",
  },
  {
    icon: Navigation,
    title: "Door-to-Door Service",
    desc: "We pick you up from your hotel, home, or office across the UAE and drop you directly to your destination in Muscat, Salalah, or anywhere in Oman.",
  },
  {
    icon: Users,
    title: "Ideal for Groups & Families",
    desc: "Travelling with family or a corporate group? Our Mercedes Sprinter and V-Class vans comfortably seat up to 19 passengers with luggage.",
  },
  {
    icon: CalendarDays,
    title: "24/7 Availability - 365 Days",
    desc: "Book a UAE to Oman chauffeur at any time of day or night. Early morning border runs, midnight transfers - we're always available.",
  },
];

// ─── Why Choose ────────────────────────────────────────────────────────────
const whyPoints = [
  "20 years of luxury chauffeur experience across the UAE and GCC",
  "Professional, English-speaking licensed chauffeurs",
  "All vehicles fully insured for UAE and Oman cross-border travel",
  "Comfortable, air-conditioned luxury vehicles for long journeys",
  "Experienced with all UAE–Oman border crossings (Hatta, Al Wajajah, Al Ain–Buraimi)",
  "Corporate accounts available with monthly billing",
  "WhatsApp booking - confirmed in minutes, 24/7",
  "Transparent fixed rates - same price quoted is same price charged",
];

// ─── Borders ───────────────────────────────────────────────────────────────
const borderCrossings = [
  { name: "Hatta / Al Wajajah Border", route: "Dubai to Muscat (most common)",  note: "Fastest route from Dubai to Muscat"  },
  { name: "Al Ain / Buraimi Border",   route: "Abu Dhabi to Muscat / Nizwa",    note: "Most popular from Abu Dhabi"         },
  { name: "Tibat Border",              route: "Ras Al Khaimah to Muscat",       note: "Shortest overall UAE–Oman crossing"  },
  { name: "Khatmat Malahah Border",    route: "Fujairah to Sohar / Muscat",     note: "East coast crossing, scenic route"   },
];

// ─── FAQs ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How long does the drive from Dubai to Muscat take?",
    a: "The drive from Dubai to Muscat takes approximately 5–6 hours depending on the border crossing used and traffic. Our chauffeurs use the fastest available route via the Hatta / Al Wajajah border.",
  },
  {
    q: "Do I need a visa to travel from UAE to Oman by car?",
    a: "Most GCC residents and many nationalities can enter Oman with a visit visa on arrival at the border. We recommend confirming your visa requirements before travel. Our chauffeurs are experienced with all border procedures.",
  },
  {
    q: "What vehicles are available for UAE to Oman transfers?",
    a: "We offer Mercedes S-Class, BMW 7 Series, Mercedes V-Class, Mercedes Vito Tourer, Mercedes Sprinter (up to 19 seats), Lexus ES 300, and luxury SUVs like the GMC Yukon Denali and Range Rover Sport.",
  },
  {
    q: "Can you pick me up from Abu Dhabi or Sharjah for an Oman transfer?",
    a: "Yes - we offer UAE to Oman chauffeur service from Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and all UAE emirates to any destination in Oman.",
  },
  {
    q: "Do you offer return trips from Oman to UAE?",
    a: "Absolutely. We offer both one-way and return chauffeur transfers between UAE and Oman. Book a return and we'll arrange your pickup from Muscat, Salalah, or any Oman destination.",
  },
  {
    q: "Is the vehicle insured for cross-border UAE to Oman travel?",
    a: "Yes - all our vehicles used for UAE to Oman transfers carry full cross-border insurance covering both UAE and Oman.",
  },
  {
    q: "How do I book a UAE to Oman chauffeur service?",
    a: "Book instantly via WhatsApp at +971 50 985 2818 or call us directly. We confirm your booking within minutes, 24/7.",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users,    value: "10,000+",  label: "Happy Clients"      },
  { icon: Route,    value: "500+ km",  label: "Avg. Oman Transfer" },
  { icon: Award,    value: "20 Years", label: "GCC Experience"     },
  { icon: ThumbsUp, value: "4.9★",     label: "Average Rating"     },
];

// ─── Booking Modal ─────────────────────────────────────────────────────────
function BookingModal({
  isOpen,
  onClose,
  defaultFrom = "",
  defaultTo   = "",
}: {
  isOpen:       boolean;
  onClose:      () => void;
  defaultFrom?: string;
  defaultTo?:   string;
}) {
  const [form, setForm] = useState({ name: "", pickup: defaultFrom, dropoff: defaultTo });

  // Sync defaults when they change (route card click)
  const pickup  = form.pickup  || defaultFrom;
  const dropoff = form.dropoff || defaultTo;

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleWhatsApp = () => {
    const msg =
      `Hi, I'd like to book a UAE to Oman chauffeur transfer.%0A%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Pickup: ${encodeURIComponent(pickup)}%0A` +
      `Drop-off: ${encodeURIComponent(dropoff)}`;
    window.open(`${WA_BASE}?text=${msg}`, "_blank");
  };

  const isValid = form.name.trim() && pickup.trim() && dropoff.trim();

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 transition-colors"
          >
            <X size={16} style={{ color: "#b76e79" }} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">Book Your Transfer</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Fill in your details and we&apos;ll confirm within minutes
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-8">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Your Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#b76e79" }} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmed Al Mansouri"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>

            {/* Pickup */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#b76e79" }} />
                <input
                  type="text"
                  name="pickup"
                  value={pickup}
                  onChange={handleChange}
                  placeholder="e.g. Dubai Marina, Hotel, Airport"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>

            {/* Drop-off */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Drop-off Location
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" style={{ color: "#b76e79" }} />
                <input
                  type="text"
                  name="dropoff"
                  value={dropoff}
                  onChange={handleChange}
                  placeholder="e.g. Muscat, Salalah, Nizwa"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-4 rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={18} />
              Send Enquiry via WhatsApp
            </button>
            <a
              href="tel:+971509852818"
              className="w-full flex items-center justify-center gap-2 border-2 font-bold text-sm py-4 rounded-full transition-all hover:bg-rose-50"
              style={{ borderColor: "#b76e79", color: "#b76e79" }}
            >
              <Phone size={18} />
              Call Us — +971 50 985 2818
            </a>
          </div>

          <p className="text-center text-zinc-400 text-xs mt-5">
            We confirm all bookings within minutes, 24/7
          </p>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
export default function UAEToOmanPage() {
  const [booking, setBooking] = useState({ open: false, from: "", to: "" });

  const openModal  = (from = "", to = "") => setBooking({ open: true, from, to });
  const closeModal = ()                   => setBooking({ open: false, from: "", to: "" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <Image
          src="/images/landing-pages/uae-oman-border.webp"
          alt="UAE to Oman chauffeur service - luxury car transfer Dubai Abu Dhabi Sharjah to Muscat Salalah Oman"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div
            className="inline-flex items-center gap-2 text-white text-xs font-semibold px-5 py-2 rounded-full mb-8 uppercase tracking-widest shadow-md"
            style={{ background: roseGoldGradient }}
          >
            <Star size={12} fill="white" />
            UAE to Oman - Premium Cross-Border Chauffeur Service
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            UAE to Oman{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur Service
            </span>
          </h1>

          <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
            Luxury <strong className="text-white">Dubai to Muscat chauffeur</strong>,{" "}
            <strong className="text-white">Abu Dhabi to Muscat transfer</strong>,{" "}
            <strong className="text-white">Sharjah to Oman car service</strong> - and all UAE to Oman
            routes with professional licensed drivers. Fixed pricing, door-to-door, 24/7.
          </p>

          <p className="text-white/60 text-sm mb-10">
            Serving: Dubai · Abu Dhabi · Sharjah · Ajman · RAK · Fujairah → Muscat · Salalah · Sohar · Nizwa · Sur · Buraimi
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 text-white font-bold text-base px-9 py-4 rounded-full shadow-2xl hover:opacity-90 transition-all duration-200"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={18} />
              Book UAE to Oman Transfer
              <ChevronRight size={18} />
            </button>
            <a
              href="tel:+971509852818"
              className="flex items-center gap-2 border-2 border-white/70 text-white hover:border-white hover:bg-white/10 font-semibold text-base px-9 py-4 rounded-full transition-all duration-200"
            >
              <Phone size={18} />
              +971 50 985 2818
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              "✓ Cross-Border Licensed Drivers",
              "✓ All UAE Emirates to All Oman Cities",
              "✓ Fixed Transparent Rates",
              "✓ Available 24/7",
            ].map((b) => (
              <span key={b} className="font-medium text-white/80">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────── */}
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

      {/* ── POPULAR ROUTES ──────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
        aria-label="UAE to Oman chauffeur routes - Dubai Abu Dhabi Sharjah to Muscat Salalah"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Popular Routes
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
              UAE to Oman Transfer Routes
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              From <strong className="text-zinc-700">Dubai to Muscat chauffeur service</strong> to{" "}
              <strong className="text-zinc-700">Abu Dhabi to Salalah transfer</strong> - we cover every UAE to Oman route
              with fixed pricing and luxury vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularRoutes.map(({ from, to, distance, duration, price }) => (
              <div
                key={`${from}-${to}`}
                className="bg-white rounded-2xl p-6 border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <MapPin size={14} style={{ color: "#b76e79" }} />
                  </div>
                  <div className="text-sm font-bold text-zinc-900">{from} to {to}</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Distance</span>
                    <span className="font-medium text-zinc-700">{distance}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Duration</span>
                    <span className="font-medium text-zinc-700">{duration}</span>
                  </div>
                </div>
                <div
                  className="text-sm font-bold px-3 py-2 rounded-xl text-center text-white mb-3"
                  style={{ background: roseGoldGradient }}
                >
                  {price}
                </div>

                <button
                  onClick={() => openModal(from, to)}
                  className="w-full text-xs font-semibold py-2 rounded-xl border transition-all duration-200 hover:opacity-80"
                  style={{ borderColor: "#b76e79", color: "#b76e79" }}
                >
                  Book {from} to {to}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="UAE to Oman luxury chauffeur service features"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Why Book With Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
              The Best UAE to Oman Chauffeur Service
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Whether it&apos;s a <strong className="text-zinc-700">Dubai to Muscat business transfer</strong> or a{" "}
              <strong className="text-zinc-700">family trip from Abu Dhabi to Oman</strong> - we make every
              kilometre comfortable, safe, and luxurious.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-7 border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ background: roseGoldGradientSubtle }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: roseGoldGradient }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-zinc-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BORDER CROSSINGS INFO ───────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fdf0ef 0%, #fff 100%)" }}
        aria-label="UAE Oman border crossings chauffeur service"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Border Crossings
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5">
              We Know Every UAE to Oman{" "}
              <span
                style={{
                  background: roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Border Crossing
              </span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-8">
              Our chauffeurs are experienced with all UAE to Oman border crossings, paperwork,
              and procedures - so your{" "}
              <strong className="text-zinc-700">Dubai to Muscat transfer</strong>,{" "}
              <strong className="text-zinc-700">Abu Dhabi to Oman chauffeur</strong>, or{" "}
              <strong className="text-zinc-700">Sharjah to Muscat car service</strong> crosses
              the border smoothly without unnecessary delays.
            </p>

            <div className="space-y-4">
              {borderCrossings.map(({ name, route, note }) => (
                <div key={name} className="flex items-start gap-4 p-4 rounded-2xl border border-rose-100 bg-white">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <Route size={16} style={{ color: "#b76e79" }} />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 text-sm">{name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{route}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: "#b76e79" }}>{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8 text-white shadow-2xl" style={{ background: roseGoldGradient }}>
            <MapPin size={40} className="mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-3">All UAE Emirates to All Oman Cities</h3>
            <p className="opacity-80 leading-relaxed mb-6 text-sm">
              We pick up from anywhere across the UAE and drop off anywhere in Oman - not just Muscat.
            </p>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-3">From UAE</p>
              <div className="flex flex-wrap gap-2">
                {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain"].map((city) => (
                  <span key={city} className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full font-medium">{city}</span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-3">To Oman</p>
              <div className="flex flex-wrap gap-2">
                {["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Buraimi", "Ibri", "Rustaq", "Khasab", "Bahla"].map((city) => (
                  <span key={city} className="bg-white/15 text-white text-xs px-3 py-1.5 rounded-full font-medium">{city}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => openModal()}
              className="w-full flex items-center justify-center gap-2 bg-white font-bold text-sm px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ color: "#b76e79" }}
            >
              <MessageCircle size={16} />
              Get a Quote for Your Route
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
        aria-label="Why choose Chauffeur Dubai for UAE to Oman transfer"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <Image
              src="/images/landing-pages/uae-to-oman.webp"
              alt="Luxury chauffeur car UAE to Oman transfer - Dubai to Muscat Mercedes BMW"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
              The UAE&apos;s Most Trusted{" "}
              <span
                style={{
                  background: roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Oman Transfer Service
              </span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-8">
              With 20 years of luxury chauffeur experience across the UAE and GCC, Chauffeur Dubai
              Luxury Travel is the most trusted name for{" "}
              <strong className="text-zinc-700">UAE to Oman chauffeur service</strong>.
              Every <strong className="text-zinc-700">Dubai to Muscat transfer</strong>,{" "}
              <strong className="text-zinc-700">Abu Dhabi to Oman car service</strong>, and{" "}
              <strong className="text-zinc-700">Sharjah to Muscat chauffeur</strong> is handled
              with precision, comfort, and care.
            </p>
            <ul className="space-y-3">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-zinc-600 text-sm">
                  <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: "#b76e79" }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA STRIP ───────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ background: roseGoldGradient }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <p className="text-xl font-bold mb-1">Ready to Book Your UAE to Oman Transfer?</p>
            <p className="opacity-80 text-sm">
              Dubai, Abu Dhabi, Sharjah to Muscat, Salalah & all Oman cities. Fixed rates, luxury vehicles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
              style={{ color: "#b76e79" }}
            >
              <MessageCircle size={16} />
              Book Now
            </button>
            <a
              href="tel:+971509852818"
              className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold text-sm px-7 py-3.5 rounded-full transition-all"
            >
              <Phone size={16} />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fdf0ef 0%, #fff 100%)" }}
        aria-label="FAQ UAE to Oman chauffeur service"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              UAE to Oman Chauffeur - FAQ
            </h2>
            <p className="text-zinc-500 mt-3 text-sm">
              Everything you need to know about our Dubai to Muscat and UAE to Oman chauffeur service.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm">
                <h3 className="font-bold text-zinc-900 mb-2 text-sm sm:text-base">{q}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: roseGoldGradient }}
        aria-label="Book UAE to Oman chauffeur service"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Book Your UAE to Oman Chauffeur Today
          </h2>
          <p className="opacity-80 text-lg mb-4 max-w-2xl mx-auto">
            Whether it&apos;s a{" "}
            <strong className="text-white">Dubai to Muscat chauffeur</strong>, an{" "}
            <strong className="text-white">Abu Dhabi to Oman transfer</strong>, or a{" "}
            <strong className="text-white">Sharjah to Muscat car service</strong> - we are
            available 24/7 with luxury vehicles and fixed pricing across all UAE to Oman routes.
          </p>
          <p className="opacity-60 text-sm mb-10">
            Shraifi One Building, Suite 45, Zaa&apos;beel St, Dubai, UAE
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-3 bg-white font-bold text-base px-9 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
              style={{ color: "#b76e79" }}
            >
              <MessageCircle size={20} />
              Book via WhatsApp
            </button>
            <a
              href="tel:+971509852818"
              className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold text-base px-9 py-4 rounded-full transition-all duration-200"
            >
              <Phone size={20} />
              +971 50 985 2818
            </a>
            <a
              href="mailto:booking@chauffeurdubai.ae"
              className="flex items-center gap-3 border-2 border-white/50 text-white/80 hover:bg-white/10 font-semibold text-base px-9 py-4 rounded-full transition-all duration-200"
            >
              booking@chauffeurdubai.ae
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING MODAL ───────────────────────────────────────────── */}
      <BookingModal
        isOpen={booking.open}
        onClose={closeModal}
        defaultFrom={booking.from}
        defaultTo={booking.to}
      />
    </>
  );
}
