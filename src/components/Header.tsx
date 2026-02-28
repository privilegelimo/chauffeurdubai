"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

const serviceLinks = [
  { label: "Airport Transfer Dubai",         href: "/services/airport-transfer-dubai"           },
  { label: "Corporate Chauffeur Dubai",      href: "/services/corporate-chauffeur-dubai"        },
  { label: "VIP Chauffeur Dubai",            href: "/services/vip-chauffeur-dubai"              },
  { label: "Luxury Van Rental Dubai",        href: "/services/luxury-van-rental-dubai"          },
  { label: "Full Day & Hourly Chauffeur",    href: "/services/full-day-chauffeur-dubai"         },
  { label: "Event Transport Dubai",          href: "/services/event-transport-dubai"            },
  { label: "Wedding Limo Dubai",             href: "/services/wedding-limo-dubai"               },
  { label: "Private Driver Sightseeing",     href: "/services/private-driver-sightseeing-dubai" },
  { label: "Monthly Car with Driver Dubai",  href: "/services/monthly-car-with-driver-dubai"    },
];

const fleetLinks = [
  { label: "First Class",          href: "/fleet/first-class"                  },
  { label: "Rolls-Royce",          href: "/fleet/rolls-royce"                  },
  { label: "Business Class",       href: "/fleet/business-class"               },
  { label: "Luxury SUV",           href: "/fleet/luxury-suv"                   },
  { label: "Business Van",         href: "/fleet/business-van"                 },
  { label: "Sprinter Luxury VIP",  href: "/fleet/mercedes-sprinter-luxury-vip" },
  { label: "Stretch Limousine",    href: "/fleet/stretch-limousine"            },
  { label: "Sprinter Luxury Van",  href: "/fleet/mercedes-sprinter-luxury-van" },
  { label: "Standard Bus",         href: "/fleet/standard-bus"                 },
  { label: "Luxury Coach Bus",     href: "/fleet/luxury-coach-bus"             },
];

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #c9956c)";

export default function Header() {
  const [menuOpen, setMenuOpen]             = useState(false);
  const [servicesOpen, setServicesOpen]     = useState(false);
  const [fleetOpen, setFleetOpen]           = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileFleet, setMobileFleet]       = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center gap-0.5 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Chauffeur Dubai Luxury Travel Logo"
              width={80}
              height={36}
              className="object-contain"
              priority
            />
            <span
              className="text-[9px] font-semibold tracking-widest uppercase leading-none"
              style={{
                background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur Dubai
            </span>
          </Link>

          {/* ── DESKTOP NAV ─────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-6">

            <Link href="/" className="text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors">
              Home
            </Link>

            {/* ── Fleet dropdown ── */}
            <div
              className="relative"
              onMouseEnter={() => setFleetOpen(true)}
              onMouseLeave={() => setFleetOpen(false)}
            >
              <button className="flex items-center gap-1 text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors py-5">
                Fleet
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: fleetOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {fleetOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50">
                  <Link
                    href="/fleet"
                    className="block px-4 py-3 text-xs font-bold text-rose-400 uppercase tracking-wider border-b border-rose-50 hover:bg-rose-50 transition-colors"
                  >
                    View All Fleet →
                  </Link>
                  <div className="max-h-72 overflow-y-auto">
                    {fleetLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-rose-400 hover:bg-rose-50 transition-colors"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Services dropdown ── */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors py-5">
                Services
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50">
                  <Link
                    href="/services"
                    className="block px-4 py-3 text-xs font-bold text-rose-400 uppercase tracking-wider border-b border-rose-50 hover:bg-rose-50 transition-colors"
                  >
                    View All Services →
                  </Link>
                  <div className="max-h-72 overflow-y-auto">
                    {serviceLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2.5 text-sm text-zinc-600 hover:text-rose-400 hover:bg-rose-50 transition-colors"
                      >
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

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+971509852818"
              className="flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:opacity-90"
              style={{ background: roseGoldGradient }}
            >
              <Phone size={14} />
              Book Now
            </a>
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

        {/* ── MOBILE MENU ───────────────────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-rose-100 space-y-1">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium"
            >
              Home
            </Link>

            {/* Fleet accordion */}
            <div>
              <button
                onClick={() => setMobileFleet((v) => !v)}
                className="w-full flex items-center justify-between py-2.5 px-2 text-zinc-600 text-sm font-medium"
              >
                Fleet
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 text-zinc-400"
                  style={{ transform: mobileFleet ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {mobileFleet && (
                <div className="pl-4 pb-1 space-y-0.5">
                  <Link
                    href="/fleet"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-2 text-xs font-bold text-rose-400 uppercase tracking-wider"
                  >
                    View All Fleet →
                  </Link>
                  {fleetLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 px-2 text-sm text-zinc-500 hover:text-rose-400"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServices((v) => !v)}
                className="w-full flex items-center justify-between py-2.5 px-2 text-zinc-600 text-sm font-medium"
              >
                Services
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 text-zinc-400"
                  style={{ transform: mobileServices ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {mobileServices && (
                <div className="pl-4 pb-1 space-y-0.5">
                  <Link
                    href="/services"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-2 text-xs font-bold text-rose-400 uppercase tracking-wider"
                  >
                    View All Services →
                  </Link>
                  {serviceLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 px-2 text-sm text-zinc-500 hover:text-rose-400"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about"   onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium">Contact</Link>

            <div className="pt-2">
              <a
                href="tel:+971509852818"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full"
                style={{ background: roseGoldGradient }}
              >
                <Phone size={14} />
                Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
