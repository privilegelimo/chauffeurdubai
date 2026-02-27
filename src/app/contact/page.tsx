import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Book Chauffeur Service Dubai - Chauffeur Dubai Luxury Travel",
  description:
    "Contact Chauffeur Dubai Luxury Travel to book your luxury chauffeur service in Dubai. Call, WhatsApp, or email us 24/7. Airport transfers, corporate chauffeur, wedding limo, and more.",
  alternates: { canonical: "https://chauffeurdubai.ae/contact" },
};

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+971 50 985 2818",
    sub: "+971 50 985 2818",
    href: "tel:+971509852818",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+971 50 985 2818",
    sub: "Available 24/7",
    href: "https://wa.me/971509852818",
  },
  {
    icon: Mail,
    label: "Email",
    value: "booking@chauffeurdubai.ae.com",
    sub: "We reply within the hour",
    href: "mailto:booking@chauffeurdubai.ae.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Shraifi One Building, Suite 45",
    sub: "Zaa'beel St, Dubai, UAE",
    href: "https://goo.gl/maps/21XXcACyGnB7fVXe7",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24 Hours / 7 Days",
    sub: "365 days a year",
    href: null,
  },
];

const services = [
  "Airport Transfer Dubai",
  "Corporate Chauffeur Service Dubai",
  "Wedding Limo Dubai",
  "Full Day Chauffeur Dubai",
  "Private Driver for Sightseeing Dubai",
  "Chauffeur Service Dubai to Abu Dhabi",
  "Monthly Driver Dubai",
  "Mercedes Sprinter Rent with Driver",
  "Luxury Van Rental with Driver Dubai",
  "VIP Airport Pick-up Dubai",
  "Bus Rental Dubai",
  "Rolls-Royce Rental with Driver Dubai",
];

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-64 sm:h-80 flex items-end overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=85"
          alt="Contact Chauffeur Dubai Luxury Travel - book chauffeur service Dubai"
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Contact{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Us
            </span>
          </h1>
          <p className="text-white/70 max-w-xl text-sm sm:text-base">
            Book your luxury chauffeur service in Dubai - we're available
            24/7 via WhatsApp, phone, or email.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-5">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#b76e79" }}>
                Get in Touch
              </p>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                We're Available 24/7
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Reach us any time for bookings, quotes, or enquiries. Our team
                responds within minutes.
              </p>
            </div>

            {contactDetails.map(({ icon: Icon, label, value, sub, href }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm hover:border-rose-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <Icon size={18} style={{ color: "#b76e79" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-bold text-zinc-900 text-sm hover:text-rose-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-bold text-zinc-900 text-sm">{value}</p>
                    )}
                    <p className="text-zinc-400 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/privilegeluxurylimo/", label: "Instagram" },
                  { icon: Facebook, href: "https://www.facebook.com/chauffeurdubai.ae", label: "Facebook" },
                  { icon: Youtube, href: "https://www.youtube.com/@privilegechauffeurandlimousine", label: "YouTube" },
                ].map(({ icon: SocialIcon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-rose-100 hover:border-rose-300 text-zinc-400 hover:text-rose-400 transition-all"
                  >
                    <SocialIcon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Booking Panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* WhatsApp CTA - big prominent block */}
            <div
              className="rounded-3xl p-8 text-white shadow-xl"
              style={{ background: roseGoldGradient }}
            >
              <h3 className="text-2xl font-bold mb-2">
                Fastest Way to Book
              </h3>
              <p className="opacity-80 mb-6 text-sm leading-relaxed">
                WhatsApp us your journey details - date, pickup, destination,
                and number of passengers - and we'll confirm your{" "}
                <strong>luxury chauffeur service Dubai</strong> booking within
                minutes.
              </p>
              <a
                href="https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20a%20chauffeur%20service%20in%20Dubai.%20Here%20are%20my%20details:"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                style={{ color: "#b76e79" }}
              >
                <MessageCircle size={20} />
                Open WhatsApp Chat
              </a>
            </div>

            {/* Services we cover */}
            <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Services We Cover
              </h3>
              <p className="text-zinc-500 text-sm mb-6">
                Mention which service you need when you contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-zinc-600 text-sm">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: roseGoldGradient }}
                    />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178864083396!2d55.29256731500943!3d25.204849983895996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4345b3e2b9cf%3A0x28a8be3f3fcb1ee9!2sZa%27abeel%20St%20-%20Dubai!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chauffeur Luxury Travel Dubai Office Location"
              />
              <div className="p-5">
                <p className="font-bold text-zinc-900 text-sm">
                  Chauffeur Luxury Travel
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  Shraifi One Building, Suite 45, Zaa'beel St, Dubai, UAE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center bg-white border-t border-rose-100">
        <p className="text-zinc-500 text-sm mb-4">
          Looking for a <strong className="text-zinc-700">chauffeur service near me</strong> in Dubai?
          We cover all areas - Downtown, JBR, Business Bay, DIFC, Palm Jumeirah, and more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+971509852818"
            className="inline-flex items-center justify-center gap-2 font-bold text-white px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition-all"
            style={{ background: roseGoldGradient }}
          >
            <Phone size={18} />
            +971 50 985 2818
          </a>
          <a
            href="tel:+971509852818"
            className="inline-flex items-center justify-center gap-2 font-semibold border-2 border-rose-300 text-rose-400 hover:bg-rose-50 px-8 py-4 rounded-full transition-all"
          >
            <Phone size={18} />
            +971 50 985 2818
          </a>
        </div>
      </section>
    </>
  );
}
