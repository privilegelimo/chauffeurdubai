import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const serviceLinks = [
  { label: "Airport Transfer Dubai",       href: "/services/airport-transfer-dubai"          },
  { label: "Corporate Chauffeur Dubai",     href: "/services/corporate-chauffeur-dubai"        },
  { label: "VIP Chauffeur Dubai",           href: "/services/vip-chauffeur-dubai"              },
  { label: "Full Day & Hourly Chauffeur",   href: "/services/full-day-chauffeur-dubai"         },
  { label: "Event Transport Dubai",         href: "/services/event-transport-dubai"            },
  { label: "Wedding Limo Dubai",            href: "/services/wedding-limo-dubai"               },
  { label: "Private Driver Sightseeing",    href: "/services/private-driver-sightseeing-dubai" },
  { label: "Monthly Car with Driver Dubai", href: "/services/monthly-car-with-driver-dubai"    },
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

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── TOP GRID ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="font-bold text-2xl uppercase tracking-wider mb-4"
              style={{
                background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ChauffeurDubai.ae
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Dubai&apos;s premier luxury chauffeur service. Professional, punctual,
              and discreet private drivers available 24/7 for airport transfers,
              corporate travel, and VIP events across Dubai and the UAE.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-zinc-500 hover:text-rose-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-zinc-500 hover:text-rose-300 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Services
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-rose-300 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Our Fleet
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {fleetLinks.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="hover:text-rose-300 transition-colors">
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-rose-300 shrink-0" />
                <a href="tel:+971509852818" className="hover:text-rose-300 transition-colors">
                  +971 50 985 2818
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-rose-300 shrink-0" />
                <a href="mailto:info@chauffeurdubai.ae" className="hover:text-rose-300 transition-colors">
                  info@chauffeurdubai.ae
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-rose-300 mt-0.5 shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </li>
            </ul>

            {/* Quick links */}
            <div className="mt-6">
              <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
                Quick Links
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                {[
                  { label: "Home",     href: "/"        },
                  { label: "Fleet",    href: "/fleet"   },
                  { label: "Services", href: "/services"},
                  { label: "About",    href: "/about"   },
                  { label: "Contact",  href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-rose-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────────────────── */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} ChauffeurDubai.ae — All rights reserved.</p>
          <p>Luxury Chauffeur Service Dubai | Private Driver Dubai | Airport Transfer Dubai</p>
        </div>

      </div>
    </footer>
  );
}
