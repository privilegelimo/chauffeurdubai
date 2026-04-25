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
  title: string;
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
const classInfo: Record<string, { label: string; title: string; description: string; image: string }> = {
  "business-class": {
    label: "Business Class",
    title: "Business Class Chauffeur Dubai | Premium Car Hire Service UAE",
    description:
      "Executive sedans and MPVs offering premium comfort. Perfect for corporate transfers, business meetings, & airport pickups across Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/audi-a6-1.webp",
  },
  "first-class": {
    label: "First Class",
    title: "First Class Chauffeur Dubai | Premium Car Hire Service UAE",
    description:
      "Chauffeur-driven luxury in the UAE. Mercedes S 500 and BMW 7 Series - reserved for clients in Dubai, Abu Dhabi, and Sharjah who accept nothing but the finest.",
    image: "/images/vehicles/mercedes-s500-1.webp",
  },
  "business-van": {
    label: "Business Van",
    title: "Business Van Chauffeur Dubai | Premium Car Hire Service UAE",
    description:
      "Spacious luxury MPVs for groups, families, and travellers with extra luggage. Comfort and class for up to 7 passengers across Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/mercedes-v300-tiffany-1.webp",
  },
  "mercedes-sprinter-luxury-van": {
    label: "Mercedes Sprinter Luxury Van",
    title: "Mercedes Sprinter Luxury Van Chauffeur Services Dubai",
    description:
      "VIP Sprinter handcrafted interiors for the most discerning clients in Dubai, Abu Dhabi, and Sharjah Premium VIP Chauffeur services. Luxurious VIP Vehicles",
    image: "/images/vehicles/mercedes-sprinter-19-1.webp",
  },
  "mercedes-sprinter-luxury-vip": {
    label: "Mercedes Sprinter Luxury VIP",
    title: "VIP Sprinter Chauffeur Dubai | Luxury Van Hire Service UAE",
    description:
      "Bespoke VIP Sprinter interiors handcrafted for the most discerning clients in Dubai, Abu Dhabi, and Sharjah - Avant Garde VIP and Business Class VIP with starlight ceilings and champagne fridges.",
    image: "/images/vehicles/mercedes-sprinter-avant-garde-1.webp",
  },
  "luxury-suv": {
    label: "Luxury SUV",
    title: "Luxury SUV Chauffeur Services Premium SUV Chauffeur Dubai",
    description:
      "GMC Yukon Denali, Cadillac Escalade, and Range Rover for families and executive groups across Dubai, Abu Dhabi, and Sharjah who need presence and practicality.",
    image: "/images/vehicles/cadillac-escalade-1.webp",
  },
  "rolls-royce": {
    label: "Rolls-Royce",
    title: "Rolls-Royce Chauffeur Dubai | Luxury Car Hire Service UAE",
    description:
      "The ultimate expression of automotive prestige across the UAE. Rolls-Royce Ghost and Cullinan with a professional chauffeur in Dubai, Abu Dhabi and all over UAE",
    image: "/images/vehicles/rolls-royce-cullinan-1.webp",
  },
  "stretch-limousine": {
    label: "Stretch Limousine",
    title: "Luxury Stretch Limousine Chauffeur Services Dubai, UAE",
    description:
      "Make the grandest of entrances with our stretch limousines - GMC Yukon, Diamond, Chevy Suburban & Chrysler Emerald - for weddings, VIP events & celebrations.",
    image: "/images/vehicles/gmc-yukon-limousine-1.webp",
  },
  "standard-bus": {
    label: "Standard Bus",
    title: "Luxury Bus Chauffeur Dubai | Group Transport Service UAE",
    description:
      "Reliable group transport for every occasion across Dubai, Abu Dhabi, and Sharjah - Toyota Coaster and Hiace for corporate events, airport transfers, and tours.",
    image: "/images/vehicles/toyota-hiace-11-1.webp",
  },
  "luxury-coach-bus": {
    label: "Luxury Coach Bus",
    title: "Luxury Coach Bus Chauffeur & Group Transport Services UAE",
    description:
      "Premium luxury coaches for group travel across Dubai, Abu Dhabi, and Sharjah - 35 Seater and 50 Seater Luxury Coaches with onboard Wi-Fi, and reclining seats.",
    image: "/images/vehicles/50-seater-luxury-coach-1.webp",
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
    title: info.title,
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
      <section className="relative h-72 sm:h-125 flex items-end overflow-hidden pt-16">
        <Image
          src={info.image}
          alt={`${info.label} chauffeur Dubai Abu Dhabi Sharjah UAE`}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(220,220,220,0) 90%, transparent 100%)",
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
              Chauffeur - Dubai, Abu Dhabi & Sharjah
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
                      alt={`${name} chauffeur hire Dubai Abu Dhabi Sharjah`}
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
                        <span className="text-zinc-500 text-xs">Transfer Within Dubai</span>
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
          Our team is available 24/7 to help you pick the perfect vehicle for your journey
          across Dubai, Abu Dhabi, and Sharjah.
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
