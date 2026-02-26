import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Shield, Award, Users, Car, ThumbsUp, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Privilege Luxury Travel - Chauffeur Service Dubai",
  description:
    "20 years of luxury chauffeur service in Dubai. Privilege Luxury Travel is Dubai's most trusted private driver and limousine company - serving airports, corporates, and VIP clients across the UAE.",
  alternates: { canonical: "https://chauffeurdubai.ae/about" },
};

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const milestones = [
  { year: "2004", event: "Privilege Luxury Travel founded in Dubai, UAE" },
  { year: "2008", event: "Expanded fleet to include Mercedes S-Class and VIP Sprinters" },
  { year: "2012", event: "Launched corporate chauffeur accounts across Dubai" },
  { year: "2016", event: "Added luxury bus and limousine services to the fleet" },
  { year: "2020", event: "Introduced real-time flight tracking for all airport transfers" },
  { year: "2024", event: "10,000+ satisfied clients and 20+ premium vehicles in fleet" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every chauffeur is background-checked, licensed, and trained in defensive driving. Your safety is our non-negotiable priority.",
  },
  {
    icon: Award,
    title: "20 Years of Excellence",
    desc: "Two decades of serving Dubai's elite, corporates, and international visitors with consistent 5-star service.",
  },
  {
    icon: Users,
    title: "Client-Centred",
    desc: "We build lasting relationships. From your first booking to your hundredth, you'll always feel like our most important client.",
  },
  {
    icon: Car,
    title: "Premium Fleet",
    desc: "Our vehicles are immaculately maintained - Mercedes, BMW, Rolls-Royce, GMC, and more. Always clean, always luxury.",
  },
  {
    icon: ThumbsUp,
    title: "Transparent Pricing",
    desc: "No hidden fees, no surge pricing. Fixed rates for every journey so you know exactly what you're paying before you book.",
  },
  {
    icon: CheckCircle,
    title: "24/7 Availability",
    desc: "Day or night, weekday or holiday - our team and fleet are always ready. We never sleep so you never wait.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1600&q=85"
          alt="About Privilege Luxury Travel - luxury chauffeur service Dubai"
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#e8a4a0" }}>
            Est. 2004 - Dubai, UAE
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Privilege Luxury Travel
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Dubai's most trusted luxury chauffeur service - 20 years of premium
            private driver and limousine services across the UAE.
          </p>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
              20 Years of{" "}
              <span
                style={{
                  background: roseGoldGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Luxury Chauffeur Service
              </span>{" "}
              in Dubai
            </h2>
            <div className="space-y-4 text-zinc-500 leading-relaxed text-sm">
              <p>
                Founded in 2004, <strong className="text-zinc-700">Privilege Luxury Travel</strong> has
                grown from a small fleet of executive sedans to Dubai's most comprehensive
                luxury chauffeur service - operating at <strong className="text-zinc-700">chauffeurdubai.ae</strong>.
              </p>
              <p>
                We serve corporate executives, international visitors, families, and VIP
                clients with a full range of services including{" "}
                <strong className="text-zinc-700">dubai airport transfer</strong>,{" "}
                <strong className="text-zinc-700">corporate chauffeur service Dubai</strong>,{" "}
                <strong className="text-zinc-700">wedding limo Dubai</strong>, and{" "}
                <strong className="text-zinc-700">monthly driver Dubai</strong> packages.
              </p>
              <p>
                Our fleet spans luxury sedans, VIP vans, Mercedes Sprinters, stretch
                limousines, and a 50-seater luxury coach - all driven by professionally
                trained, background-checked chauffeurs available 24/7 across the UAE.
              </p>
              <p>
                With over 10,000 satisfied clients and a 4.9-star average rating,
                we are proud to be the most trusted name in{" "}
                <strong className="text-zinc-700">luxury chauffeur Dubai</strong>.
              </p>
            </div>
          </div>

          {/* Stats panel */}
          <div
            className="rounded-3xl p-8 text-white shadow-2xl"
            style={{ background: roseGoldGradient }}
          >
            <h3 className="text-2xl font-bold mb-6">Privilege by Numbers</h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { val: "20+",      label: "Years in Dubai"          },
                { val: "10,000+",  label: "Happy Clients"           },
                { val: "80+",      label: "Luxury Vehicles"         },
                { val: "4.9★",     label: "Average Client Rating"   },
                { val: "24/7",     label: "Availability"            },
                { val: "4",        label: "UAE Airports Covered"    },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/10 rounded-2xl p-5 text-center">
                  <p className="text-2xl font-bold">{val}</p>
                  <p className="text-xs opacity-75 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: roseGoldGradientSubtle }}
                >
                  <Icon size={22} style={{ color: "#b76e79" }} />
                </div>
                <h3 className="text-zinc-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fdf0ef 0%, #fff 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#b76e79" }}>
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              20 Years in Dubai
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-rose-100" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="relative flex items-start gap-6 pl-14">
                  <div
                    className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md"
                    style={{ background: roseGoldGradient }}
                  >
                    {year.slice(2)}
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm flex-1">
                    <p className="text-xs font-bold mb-1" style={{ color: "#b76e79" }}>
                      {year}
                    </p>
                    <p className="text-zinc-700 text-sm font-medium">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Experience the Privilege Difference
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Join 10,000+ satisfied clients who trust Privilege Luxury Travel for
          every journey in Dubai and the UAE.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/971509200818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
          >
            <MessageCircle size={18} />
            Book Now
          </a>
          <a
            href="tel:+971509200818"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold px-8 py-4 rounded-full transition-all"
          >
            <Phone size={18} />
            +971 50 920 0818
          </a>
        </div>
      </section>
    </>
  );
}
