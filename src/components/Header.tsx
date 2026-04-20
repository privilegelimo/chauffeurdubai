"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown, MessageCircle } from "lucide-react";

const serviceLinks = [
  { label: "Airport Transfer Dubai",        href: "/services/airport-transfer-dubai"           },
  { label: "Corporate Chauffeur Dubai",     href: "/services/corporate-chauffeur-dubai"        },
  { label: "Luxury Van Rental Dubai",       href: "/services/luxury-van-rental-dubai"          },
  { label: "Full Day & Hourly Chauffeur",   href: "/services/full-day-chauffeur-dubai"         },
  { label: "VIP Chauffeur Dubai",           href: "/services/vip-chauffeur-dubai"              },
  { label: "UAE to Oman Chauffeur",         href: "/services/uae-to-oman-chauffeur-services"   },
  { label: "Event Transport Dubai",         href: "/services/event-transport-dubai"            },
  { label: "Wedding Limo Dubai",            href: "/services/wedding-limo-dubai"               },
  { label: "Private Driver Sightseeing",    href: "/services/private-driver-sightseeing-dubai" },
  { label: "Monthly Car with Driver Dubai", href: "/services/monthly-car-with-driver-dubai"    },
];

const fleetLinks = [
  { label: "First Class",         href: "/fleet/first-class"                  },
  { label: "Business Van",        href: "/fleet/business-van"                 },
  { label: "Sprinter Luxury Van", href: "/fleet/mercedes-sprinter-luxury-van" },
  { label: "Sprinter Luxury VIP", href: "/fleet/mercedes-sprinter-luxury-vip" },
  { label: "Rolls-Royce",         href: "/fleet/rolls-royce"                  },
  { label: "Business Class",      href: "/fleet/business-class"               },
  { label: "Luxury SUV",          href: "/fleet/luxury-suv"                   },
  { label: "Luxury Coach Bus",    href: "/fleet/luxury-coach-bus"             },
  { label: "Stretch Limousine",   href: "/fleet/stretch-limousine"            },
  { label: "Standard Bus",        href: "/fleet/standard-bus"                 },
];

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #c9956c)";

/* ─── WhatsApp form field type ─── */
interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  pickup: string;
  dropoff: string;
  notes: string;
}

const emptyForm: BookingForm = {
  name: "", phone: "", service: "", date: "", pickup: "", dropoff: "", notes: "",
};

/* ─── BookNow Modal ─────────────────────────────────────────────────────── */
function BookNowModal({ onClose }: { onClose: () => void }) {
  const [showWAForm, setShowWAForm] = useState(false);
  const [form, setForm] = useState<BookingForm>(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `*New Booking Request*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Date: ${form.date}`,
      `Pickup: ${form.pickup}`,
      `Drop-off: ${form.dropoff}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/971509852818?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 pt-6 pb-4 border-b border-rose-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X size={20} />
          </button>
          <h2
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Book Your Ride
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">Choose how you'd like to book</p>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* ── Option 1 — Call ── */}
          <a
            href="tel:+971509852818"
            className="flex items-center gap-4 w-full rounded-2xl border border-rose-100 px-5 py-4 hover:bg-rose-50 transition-colors group"
          >
            <span
              className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
              style={{ background: roseGoldGradient }}
            >
              <Phone size={18} className="text-white" />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-700 group-hover:text-rose-500 transition-colors">
                Call &amp; Book
              </p>
              <p className="text-xs text-zinc-400">Speak directly with our team</p>
            </div>
          </a>

          {/* ── Option 2 — WhatsApp ── */}
          {!showWAForm ? (
            <button
              onClick={() => setShowWAForm(true)}
              className="flex items-center gap-4 w-full rounded-2xl border border-green-100 px-5 py-4 hover:bg-green-50 transition-colors group"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-green-500 shrink-0">
                <MessageCircle size={18} className="text-white" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-zinc-700 group-hover:text-green-600 transition-colors">
                  Send Booking on WhatsApp
                </p>
                <p className="text-xs text-zinc-400">Fill a quick form, we'll get it instantly</p>
              </div>
            </button>
          ) : (
            /* ── WhatsApp form ── */
            <form onSubmit={handleWhatsApp} className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input
                    name="name"
                    required
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 placeholder:text-zinc-400"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    name="phone"
                    required
                    placeholder="Phone Number (e.g. +971...)"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 placeholder:text-zinc-400"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 text-zinc-600"
                  >
                    <option value="" disabled>Select a Service</option>
                    {serviceLinks.map((s) => (
                      <option key={s.href} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="col-span-2 text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 text-zinc-600"
                />
                <input
                  name="pickup"
                  required
                  placeholder="Pickup Location"
                  value={form.pickup}
                  onChange={handleChange}
                  className="text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 placeholder:text-zinc-400"
                />
                <input
                  name="dropoff"
                  required
                  placeholder="Drop-off Location"
                  value={form.dropoff}
                  onChange={handleChange}
                  className="text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 placeholder:text-zinc-400"
                />
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Any special requests? (optional)"
                  value={form.notes}
                  onChange={handleChange}
                  className="col-span-2 text-sm border border-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 placeholder:text-zinc-400 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowWAForm(false)}
                  className="flex-1 text-sm text-zinc-500 border border-zinc-200 rounded-xl py-2.5 hover:bg-zinc-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl py-2.5 bg-green-500 hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={15} />
                  Send on WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────────────────── */
export default function Header() {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [servicesOpen, setServicesOpen]     = useState(false);
  const [fleetOpen, setFleetOpen]           = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileFleet, setMobileFleet]       = useState(false);
  const [bookModal, setBookModal]           = useState(false);   // ← new

  return (
    <>
      {/* ── Book Now Modal ── */}
      {bookModal && <BookNowModal onClose={() => setBookModal(false)} />}

      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center gap-0.5 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Chauffeur Dubai Luxury Travel Logo"
                width={140}
                height={60}
                className="object-contain"
                priority
              />
              <span
                className="text-[15px] font-bold tracking-widest uppercase leading-none"
                style={{
                  background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Chauffeur Dubai
              </span>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors">
                Home
              </Link>

              {/* Fleet dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setFleetOpen(true)}
                onMouseLeave={() => setFleetOpen(false)}
              >
                <button className="flex items-center gap-1 text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors py-5">
                  Fleet
                  <ChevronDown size={14} className="transition-transform duration-200" style={{ transform: fleetOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {fleetOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50">
                    <Link href="/fleet" className="block px-4 py-3 text-xs font-bold text-rose-400 uppercase tracking-wider border-b border-rose-50 hover:bg-rose-50 transition-colors">
                      View All Fleet →
                    </Link>
                    <div className="max-h-72 overflow-y-auto">
                      {fleetLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-rose-400 hover:bg-rose-50 transition-colors">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors py-5">
                  Services
                  <ChevronDown size={14} className="transition-transform duration-200" style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50">
                    <Link href="/services" className="block px-4 py-3 text-xs font-bold text-rose-400 uppercase tracking-wider border-b border-rose-50 hover:bg-rose-50 transition-colors">
                      View All Services →
                    </Link>
                    <div className="max-h-72 overflow-y-auto">
                      {serviceLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-rose-400 hover:bg-rose-50 transition-colors">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about"   className="text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors">About</Link>
              <Link href="/contact" className="text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors">Contact</Link>
            </nav>

            {/* CTA - desktop — now opens modal */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setBookModal(true)}
                className="flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:opacity-90"
                style={{ background: roseGoldGradient }}
              >
                <Phone size={14} />
                Book Now
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-zinc-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* ── MOBILE MENU ── */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-rose-100 space-y-1">
              <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium">
                Home
              </Link>

              {/* Fleet accordion */}
              <div>
                <button onClick={() => setMobileFleet((v) => !v)} className="w-full flex items-center justify-between py-2.5 px-2 text-zinc-600 text-sm font-medium">
                  Fleet
                  <ChevronDown size={14} className="transition-transform duration-200 text-zinc-400" style={{ transform: mobileFleet ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {mobileFleet && (
                  <div className="pl-4 pb-1 space-y-0.5">
                    <Link href="/fleet" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-rose-400 uppercase tracking-wider">View All Fleet →</Link>
                    {fleetLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm text-zinc-500 hover:text-rose-400">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services accordion */}
              <div>
                <button onClick={() => setMobileServices((v) => !v)} className="w-full flex items-center justify-between py-2.5 px-2 text-zinc-600 text-sm font-medium">
                  Services
                  <ChevronDown size={14} className="transition-transform duration-200 text-zinc-400" style={{ transform: mobileServices ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {mobileServices && (
                  <div className="pl-4 pb-1 space-y-0.5">
                    <Link href="/services" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-rose-400 uppercase tracking-wider">View All Services →</Link>
                    {serviceLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm text-zinc-500 hover:text-rose-400">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about"   onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium">About</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium">Contact</Link>

              {/* Mobile Book Now → opens modal */}
              <div className="pt-2">
                <button
                  onClick={() => { setMenuOpen(false); setBookModal(true); }}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full"
                  style={{ background: roseGoldGradient }}
                >
                  <Phone size={14} />
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
        </header>
    </>
  );
}