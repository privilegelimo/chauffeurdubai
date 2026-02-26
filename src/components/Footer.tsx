import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
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
              Dubai's premier luxury chauffeur service. Professional, punctual,
              and discreet private drivers available 24/7 for airport transfers,
              corporate travel, and VIP events across Dubai and the UAE.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-zinc-500 hover:text-rose-300 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-rose-300 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</p>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {[
                "Airport Transfer Dubai",
                "Corporate Chauffeur Dubai",
                "VIP Chauffeur Service",
                "Hourly Car Hire Dubai",
                "Monthly Chauffeur Package",
                "Wedding Chauffeur Dubai",
              ].map((s) => (
                <li key={s}>
                  <Link href="#services" className="hover:text-rose-300 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</p>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-rose-300" />
                <a href="tel:+971XXXXXXXXX" className="hover:text-rose-300 transition-colors">+971-XX-XXX-XXXX</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-rose-300" />
                <a href="mailto:info@chauffeurdubai.ae" className="hover:text-rose-300 transition-colors">info@chauffeurdubai.ae</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-rose-300 mt-0.5 shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} ChauffeurDubai.ae - All rights reserved.</p>
          <p>Luxury Chauffeur Service Dubai | Private Driver Dubai | Airport Transfer Dubai</p>
        </div>
      </div>
    </footer>
  );
}
