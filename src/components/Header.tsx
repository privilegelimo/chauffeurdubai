"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",     href: "/"         },
  { label: "Fleet",    href: "/#fleet"   },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-bold text-xl tracking-wider uppercase"
              style={{
                background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur<span className="text-zinc-800" style={{ WebkitTextFillColor: "#1f2937" }}>Dubai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-600 hover:text-rose-400 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+971XXXXXXXXX"
              className="flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #b76e79, #c9956c)",
              }}
            >
              <Phone size={14} />
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-zinc-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-rose-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-2 text-zinc-600 hover:text-rose-400 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+971XXXXXXXXX"
              className="mt-3 inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #b76e79, #c9956c)" }}
            >
              <Phone size={14} />
              Book Now
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
