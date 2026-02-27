import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  UserRound,
  Luggage,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import allVehiclesData from "@/data/vehicles.json";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── Type ──────────────────────────────────────────────────────────────────
type Vehicle = {
  slug: string;
  classSlug: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  transferPrice: string;
  price5hr: string;
  price10hr: string;
  images: string[];
  desc: string;
  features: string[];
  specs: { label: string; value: string }[];
};

const allVehicles = allVehiclesData as Vehicle[];

// ─── Class Info ────────────────────────────────────────────────────────────
const classInfo: Record<string, { label: string; description: string; image: string }> = {
  "business-class": {
    label: "Business Class",
    description:
      "Executive sedans and MPVs offering premium comfort and style. Perfect for corporate transfers, business meetings, and airport pickups across Dubai.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85",
  },
  "first-class": {
    label: "First Class",
    description:
      "The absolute pinnacle of chauffeur-driven luxury. Mercedes S 500 and BMW 7 Series - reserved for clients who accept nothing but the finest.",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1400&q=85",
  },
  "business-van": {
    label: "Business Van",
    description:
      "Spacious luxury MPVs for groups, families, and travellers with extra luggage. Comfort and class for up to 7 passengers.",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1400&q=85",
  },
  "mercedes-sprinter-luxury-van": {
    label: "Mercedes Sprinter Luxury Van",
    description:
      "Premium Mercedes Sprinter vans for large groups - Ultra Luxury Van and 19 Seater. The benchmark for group airport transfers and corporate events.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=85",
  },
  "mercedes-sprinter-luxury-vip": {
    label: "Mercedes Sprinter Luxury VIP",
    description:
      "Bespoke VIP Sprinter interiors handcrafted for the most discerning clients - Avant Garde VIP and Business Class VIP with starlight ceilings and champagne fridges.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=85",
  },
  "luxury-suv": {
    label: "Luxury SUV",
    description:
      "Bold, spacious, and commanding - GMC Yukon Denali, Cadillac Escalade, and Range Rover Sport for families and executive groups who need presence and practicality.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&q=85",
  },
  "rolls-royce": {
    label: "Rolls-Royce",
    description:
      "The ultimate expression of automotive prestige. Rolls-Royce Ghost and Cullinan with a professional chauffeur - for occasions that demand nothing less than perfection.",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1400&q=85",
  },
  "stretch-limousine": {
    label: "Stretch Limousine",
    description:
      "Make the grandest of entrances. Our stretch limousines - GMC Yukon, Diamond, Chevy Suburban, and Chrysler Emerald - are the ultimate statement for weddings, VIP events, and celebrations.",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1400&q=85",
  },
  "standard-bus": {
    label: "Standard Bus",
    description:
      "Reliable group transport for every occasion - Toyota Coaster 21 Seater and Hiace 11 Seater for corporate events, airport transfers, and tours.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&q=85",
  },
  "luxury-coach-bus": {
    label: "Luxury Coach Bus",
    description:
      "Premium luxury coaches for large group travel - 35 Seater and 50 Seater Luxury Coaches with underfloor luggage bays, onboard Wi-Fi, and reclining seats for corporate events, exhibitions, and airport runs.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&q=85",
  },
};

// ─── Static Params ─────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(classInfo).map((slug) => ({ slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const info = classInfo[slug];
  if (!info) return {};
  return {
    title: `${info.label} Chauffeur Dubai | Luxury Car Hire Dubai`,
    description: info.description,
    alternates: { canonical: `https://chauffeurdubai.ae/fleet/${slug}` },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function FleetClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = classInfo[slug];
  if (!info) notFound();

  const vehicles = allVehicles.filter((v) => v.classSlug === slug);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden pt-16">
        <Image
          src={info.image}
          alt={`${info.label} chauffeur Dubai`}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(183,110,121,0.35) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={15} />
            All Classes
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            {info.label}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chauffeur Dubai
            </span>
          </h1>
          <p className="text-white/70 mt-2 max-w-xl">{info.description}</p>
        </div>
      </section>

      {/* ── VEHICLES ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map(
              ({ slug: vSlug, name, category, passengers, luggage, transferPrice, price5hr, price10hr, images, desc }) => (
                <div
                  key={vSlug}
                  className="bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden group">
                    <Image
                      src={images[0]}
                      alt={`${name} chauffeur hire Dubai`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: roseGoldGradient }}
                    >
                      {category}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-zinc-900 font-bold text-xl mb-1">{name}</h2>
                    <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{desc}</p>

                    {/* Passengers & Luggage */}
                    <div className="flex gap-4 mb-5">
                      <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                        <UserRound size={15} style={{ color: "#b76e79" }} />
                        {passengers} Passengers
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                        <Luggage size={15} style={{ color: "#b76e79" }} />
                        {luggage} Bags
                      </div>
                    </div>

                    {/* Pricing */}
                    <div
                      className="rounded-xl p-4 mb-5 space-y-2"
                      style={{ background: roseGoldGradientSubtle }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">Transfer / Point to Point</span>
                        <span className="font-bold text-sm" style={{ color: "#b76e79" }}>
                          {transferPrice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">5 Hour Package</span>
                        <span className="font-semibold text-sm text-zinc-700">{price5hr}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">10 Hour Package</span>
                        <span className="font-semibold text-sm text-zinc-700">{price10hr}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/fleet/${slug}/${vSlug}`}
                        className="flex-1 flex items-center justify-center gap-2 text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-all"
                        style={{ background: roseGoldGradient }}
                      >
                        View & Book
                      </Link>
                      <a
                        href="tel:+971509852818"
                        className="flex items-center justify-center border border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm px-4 py-3 rounded-xl transition-all"
                      >
                        <Phone size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: roseGoldGradient }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Need Help Choosing?
        </h2>
        <p className="text-white/80 mb-8">
          Our team is available 24/7 to help you pick the perfect vehicle.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://wa.me/971509852818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
          <a
            href="tel:+971509852818"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-rose-400 font-bold px-8 py-4 rounded-full transition-all"
          >
            <Phone size={18} />
            +971 50 985 2818
          </a>
        </div>
      </section>
    </>
  );
}
