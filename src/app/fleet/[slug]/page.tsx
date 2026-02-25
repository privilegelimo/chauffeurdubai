import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  UserRound,
  Luggage,
  ChevronRight,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── All vehicles with their class ────────────────────────────────────────
const allVehicles = [
  // Business Class
  {
    slug: "bmw-7-series",
    classSlug: "business-class",
    name: "BMW 7 Series",
    category: "Executive Saloon / Sedan",
    passengers: 3,
    luggage: 3,
    transferPrice: "AED 350",
    price5hr: "AED 900 / 5 Hr",
    price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    desc: "A sleek, modern executive sedan combining powerful performance with premium comfort. Ideal for business travellers.",
  },
  {
    slug: "mercedes-s450",
    classSlug: "business-class",
    name: "Mercedes S 450",
    category: "Executive Saloon / Sedan",
    passengers: 3,
    luggage: 3,
    transferPrice: "AED 550",
    price5hr: "AED 1,100 / 5 Hr",
    price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=700&q=80",
    desc: "A refined executive saloon with cutting-edge technology and signature Mercedes luxury — the perfect business companion.",
  },
  // First Class
  {
    slug: "mercedes-s500",
    classSlug: "first-class",
    name: "Mercedes S 500",
    category: "Executive VIP / First Class",
    passengers: 3,
    luggage: 3,
    transferPrice: "AED 900",
    price5hr: "AED 1,500 / 5 Hr",
    price10hr: "AED 2,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=700&q=80",
    desc: "The pinnacle of the Mercedes range. Unrivalled luxury, whisper-quiet cabin, and state-of-the-art comfort features.",
  },
  // Business Van
  {
    slug: "mercedes-vito-tourer",
    classSlug: "business-van",
    name: "Mercedes Vito Tourer",
    category: "Executive MPV",
    passengers: 7,
    luggage: 7,
    transferPrice: "AED 350",
    price5hr: "AED 950 / 5 Hr",
    price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "A versatile executive MPV delivering comfort for up to 7 passengers — great for airport runs and group transfers.",
  },
  {
    slug: "mercedes-v300-tiffany",
    classSlug: "business-van",
    name: "Mercedes V 300 Tiffany",
    category: "Luxury MPV",
    passengers: 7,
    luggage: 7,
    transferPrice: "AED 550",
    price5hr: "AED 1,300 / 5 Hr",
    price10hr: "AED 2,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "Premium luxury MPV with custom VIP interior upgrades. Perfect for high-end group travel.",
  },
  {
    slug: "mercedes-vip-trend",
    classSlug: "business-van",
    name: "Mercedes VIP Trend 250",
    category: "Executive VIP MPV",
    passengers: 7,
    luggage: 7,
    transferPrice: "AED 750",
    price5hr: "AED 1,300 / 5 Hr",
    price10hr: "AED 2,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "Top-tier executive MPV with VIP-grade interiors, individual seating, and premium amenities throughout.",
  },
  // VIP Sprinter
  {
    slug: "mercedes-sprinter-ultra-luxury",
    classSlug: "vip-sprinter",
    name: "Mercedes Sprinter Ultra Luxury Van",
    category: "Executive Luxury Van",
    passengers: 16,
    luggage: 9,
    transferPrice: "AED 1,000",
    price5hr: "AED 1,400 / 5 Hr",
    price10hr: "AED 2,300 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "A full-length luxury sprinter van fitted with premium seating and entertainment. Ideal for large group transfers.",
  },
  {
    slug: "mercedes-sprinter-avant-garde",
    classSlug: "vip-sprinter",
    name: "Mercedes Sprinter Avant Garde VIP",
    category: "Executive VIP / First Class Van",
    passengers: 11,
    luggage: 6,
    transferPrice: "AED 1,100",
    price5hr: "AED 1,500 / 5 Hr",
    price10hr: "AED 2,500 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "The Avant Garde VIP Sprinter is the gold standard for luxury group transport — lavish interiors, captain seats, ambient lighting.",
  },
  {
    slug: "mercedes-sprinter-19",
    classSlug: "vip-sprinter",
    name: "Mercedes Sprinter 19 Seats",
    category: "Luxury Van",
    passengers: 19,
    luggage: 9,
    transferPrice: "AED 1,000",
    price5hr: "AED 1,400 / 5 Hr",
    price10hr: "AED 2,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "Luxury 19-seater sprinter for corporate group transfers, events, and airport shuttles across Dubai and the UAE.",
  },
  // Luxury SUV
  {
    slug: "gmc-yukon-denali",
    classSlug: "luxury-suv",
    name: "GMC Yukon Denali",
    category: "Luxury SUV",
    passengers: 7,
    luggage: 7,
    transferPrice: "AED 350",
    price5hr: "AED 950 / 5 Hr",
    price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",
    desc: "Bold, commanding, and luxurious. The GMC Yukon Denali is perfect for those who want an impressive, spacious SUV experience.",
  },
  // Limousine
  {
    slug: "gmc-yukon-limousine",
    classSlug: "limousine",
    name: "GMC Yukon Limousine",
    category: "Luxury Limousine",
    passengers: 18,
    luggage: 2,
    transferPrice: "AED 850",
    price5hr: "AED 4,000 / 5 Hr",
    price10hr: "AED 7,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    desc: "The ultimate party and events limousine. Stunning stretch limo for weddings, birthdays, and VIP nights out in Dubai.",
  },
  // Luxury Bus
  {
    slug: "50-seater-luxury-bus",
    classSlug: "luxury-bus",
    name: "50 Seater Luxury Coach",
    category: "Luxury Coach",
    passengers: 50,
    luggage: 50,
    transferPrice: "AED 800",
    price5hr: "AED 1,100 / 5 Hr",
    price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
    desc: "Premium 50-seater luxury coach for corporate events, airport shuttles, and large group tours across Dubai and the UAE.",
  },
];

const classInfo: Record<
  string,
  { label: string; description: string; image: string }
> = {
  "business-class": {
    label: "Business Class",
    description:
      "Executive sedans offering premium comfort and style. Perfect for corporate transfers, business meetings, and airport pickups across Dubai.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85",
  },
  "first-class": {
    label: "First Class",
    description:
      "The absolute pinnacle of chauffeur-driven luxury. Reserved for VIP clients who accept nothing but the finest.",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1400&q=85",
  },
  "business-van": {
    label: "Business Van",
    description:
      "Spacious luxury MPVs for groups, families, and travellers with extra luggage. Comfort and class for up to 7 passengers.",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1400&q=85",
  },
  "vip-sprinter": {
    label: "VIP Sprinter",
    description:
      "Ultra-luxury sprinter vans fitted with VIP interiors. Ideal for larger groups who refuse to compromise on luxury.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=85",
  },
  "luxury-suv": {
    label: "Luxury SUV",
    description:
      "Bold, spacious, and commanding — luxury SUVs for families and executive groups who need both presence and practicality.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&q=85",
  },
  limousine: {
    label: "Limousine",
    description:
      "Make the grandest of entrances. Our stretch limousines are the ultimate statement for weddings, VIP events, and celebrations.",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1400&q=85",
  },
  "luxury-bus": {
    label: "Luxury Bus",
    description:
      "Premium coaches for large groups — corporate events, airport transfers, and sightseeing tours across Dubai and the UAE.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&q=85",
  },
};

export async function generateStaticParams() {
  return Object.keys(classInfo).map((slug) => ({ slug }));
}

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

      {/* ── VEHICLES ────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map(
              ({
                slug: vSlug,
                name,
                category,
                passengers,
                luggage,
                transferPrice,
                price5hr,
                price10hr,
                image,
                desc,
              }) => (
                <div
                  key={vSlug}
                  className="bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden group">
                    <Image
                      src={image}
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
                        <span className="text-zinc-500 text-xs">Transfer in Dubai</span>
                        <span
                          className="font-bold text-sm"
                          style={{ color: "#b76e79" }}
                        >
                          {transferPrice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">5 Hour</span>
                        <span className="font-semibold text-sm text-zinc-700">
                          {price5hr}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs">10 Hour</span>
                        <span className="font-semibold text-sm text-zinc-700">
                          {price10hr}
                        </span>
                      </div>
                    </div>

                    {/* Book Buttons */}
<div className="flex gap-3 mt-auto">
  <Link
    href={`/fleet/${slug}/${vSlug}`}
    className="flex-1 flex items-center justify-center gap-2 text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-all"
    style={{ background: roseGoldGradient }}
  >
    View & Book
  </Link>
  <a
    href="tel:+971509200818"
    className="flex items-center justify-center gap-2 border border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm px-4 py-3 rounded-xl transition-all"
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
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
            href="https://wa.me/971509200818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
          >
            <MessageCircle size={18} />
            WhatsApp Us
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
