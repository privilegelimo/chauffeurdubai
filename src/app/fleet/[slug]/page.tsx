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

const roseGoldGradient        = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle  = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── All Vehicles ──────────────────────────────────────────────────────────
const allVehicles = [
  // ── Business Class ────────────────────────────────────────────────────
  {
    slug: "lexus-es300",
    classSlug: "business-class",
    name: "Lexus ES 300",
    category: "Executive Saloon / Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    desc: "The Lexus ES 300h combines refined luxury with exceptional fuel efficiency, offering a serene and sophisticated ride.",
  },
  {
    slug: "audi-a6",
    classSlug: "business-class",
    name: "Audi A6",
    category: "Executive Saloon / Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    desc: "A masterpiece of German engineering - sleek, sporty and supremely comfortable for business travel across Dubai.",
  },
  {
    slug: "byd-han",
    classSlug: "business-class",
    name: "BYD Han EV",
    category: "Executive Electric Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    desc: "A premium all-electric sedan blending cutting-edge technology with executive comfort for the eco-conscious traveller.",
  },
  {
    slug: "citroen-space-tourer",
    classSlug: "business-class",
    name: "Citroën Space Tourer 7 Pax",
    category: "Executive MPV / 7 Seater",
    passengers: 7, luggage: 5,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "Flexible, comfortable seating for up to 7 passengers - ideal for family or group airport transfers across Dubai.",
  },
  {
    slug: "toyota-granvia",
    classSlug: "business-class",
    name: "Toyota Granvia Van 7 Pax",
    category: "Premium MPV / 7 Seater",
    passengers: 7, luggage: 6,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "A premium 7-seater MPV with captain chairs, delivering outstanding comfort for families and groups across Dubai.",
  },

  // ── First Class ───────────────────────────────────────────────────────
  {
    slug: "mercedes-s500",
    classSlug: "first-class",
    name: "Mercedes S 500",
    category: "Executive VIP / First Class",
    passengers: 3, luggage: 3,
    transferPrice: "AED 900", price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=700&q=80",
    desc: "The undisputed pinnacle of executive motoring - a rolling sanctuary of refinement, technology and prestige.",
  },
  {
    slug: "bmw-7-series",
    classSlug: "first-class",
    name: "BMW 7 Series",
    category: "Executive Saloon / First Class",
    passengers: 3, luggage: 3,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
    desc: "Redefines what it means to travel first class - opulent rear cabin, Sky Lounge roof, and Bowers & Wilkins Diamond sound.",
  },

  // ── Business Van ──────────────────────────────────────────────────────
  {
    slug: "mercedes-vito-tourer",
    classSlug: "business-van",
    name: "Mercedes Vito Tourer",
    category: "Executive MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "A versatile executive MPV delivering comfort for up to 7 passengers - ideal for airport runs and group transfers.",
  },
  {
    slug: "mercedes-v300-tiffany",
    classSlug: "business-van",
    name: "Mercedes V 300 Tiffany",
    category: "Luxury MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 550", price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "The Tiffany Edition elevates group travel to an art form with its bespoke interior and whisper-quiet ride.",
  },
  {
    slug: "mercedes-vip-trend",
    classSlug: "business-van",
    name: "Mercedes VIP Trend 250",
    category: "Executive VIP MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 750", price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=700&q=80",
    desc: "The ultimate executive MPV - Nappa leather, 4-zone climate, mini-bar, and a 42-inch rear display.",
  },

  // ── Mercedes Sprinter Luxury Van ──────────────────────────────────────
  {
    slug: "mercedes-sprinter-ultra-luxury",
    classSlug: "mercedes-sprinter-luxury-van",
    name: "Mercedes Sprinter Ultra Luxury Van",
    category: "Executive Luxury Van",
    passengers: 16, luggage: 9,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "Sets the benchmark for large group transport with a lavish custom interior and state-of-the-art facilities.",
  },
  {
    slug: "mercedes-sprinter-19",
    classSlug: "mercedes-sprinter-luxury-van",
    name: "Mercedes Sprinter 19 Seater",
    category: "Luxury Van",
    passengers: 19, luggage: 9,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "The perfect solution for large group airport transfers and corporate events - 19 premium seats across Dubai and the UAE.",
  },

  // ── Mercedes Sprinter Luxury VIP ──────────────────────────────────────
  {
    slug: "mercedes-sprinter-avant-garde",
    classSlug: "mercedes-sprinter-luxury-vip",
    name: "Mercedes Sprinter Avant Garde VIP",
    category: "Executive VIP Van",
    passengers: 11, luggage: 6,
    transferPrice: "AED 1,100", price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,500 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "The gold standard in luxury group transport - handcrafted interiors, starlight ceiling and champagne fridge included.",
  },
  {
    slug: "mercedes-sprinter-business-vip",
    classSlug: "mercedes-sprinter-luxury-vip",
    name: "Mercedes Sprinter Business Class VIP",
    category: "Business Class VIP Van",
    passengers: 13, luggage: 7,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80",
    desc: "An elevated group travel experience with premium leather seating, fold-out tables and executive amenities throughout.",
  },

  // ── Luxury SUV ────────────────────────────────────────────────────────
  {
    slug: "gmc-yukon-denali",
    classSlug: "luxury-suv",
    name: "GMC Yukon Denali",
    category: "Luxury SUV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",
    desc: "Bold, commanding, and luxurious - the GMC Yukon Denali is perfect for those who demand presence and space.",
  },
  {
    slug: "cadillac-escalade",
    classSlug: "luxury-suv",
    name: "Cadillac Escalade 7 Seater",
    category: "Luxury SUV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",
    desc: "The ultimate American luxury SUV - imposing, spacious and loaded with a 38-inch curved OLED display and AKG Studio audio.",
  },
  {
    slug: "range-rover-sport",
    classSlug: "luxury-suv",
    name: "Range Rover Sport",
    category: "Luxury SUV",
    passengers: 5, luggage: 4,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",
    desc: "The definitive luxury performance SUV - iconic British design with Meridian surround sound and unmatched on-road refinement.",
  },

  // ── Rolls-Royce ───────────────────────────────────────────────────────
  {
    slug: "rolls-royce-ghost",
    classSlug: "rolls-royce",
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury Saloon",
    passengers: 3, luggage: 3,
    transferPrice: "AED 2,500", price5hr: "AED 5,000 / 5 Hr", price10hr: "AED 9,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=700&q=80",
    desc: "The definitive expression of effortless luxury - a silent, serene cabin wrapped in hand-stitched leather and real wood veneers.",
  },
  {
    slug: "rolls-royce-cullinan",
    classSlug: "rolls-royce",
    name: "Rolls-Royce Cullinan",
    category: "Ultra Luxury SUV",
    passengers: 4, luggage: 4,
    transferPrice: "AED 3,000", price5hr: "AED 6,000 / 5 Hr", price10hr: "AED 11,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",
    desc: "The world's most luxurious SUV - Magic Carpet Ride, starlight headliner, and bespoke Rolls-Royce craftsmanship throughout.",
  },

  // ── Stretch Limousine ─────────────────────────────────────────────────
  {
    slug: "gmc-yukon-limousine",
    classSlug: "stretch-limousine",
    name: "GMC Yukon Limousine",
    category: "Stretch Limousine",
    passengers: 18, luggage: 2,
    transferPrice: "AED 850", price5hr: "AED 4,000 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    desc: "The ultimate party and events limousine - stunning stretch for weddings, birthdays, and VIP nights out in Dubai.",
  },
  {
    slug: "chevy-suburban-titanium-limousine",
    classSlug: "stretch-limousine",
    name: "Chevy Suburban Titanium Limousine",
    category: "Stretch Limousine",
    passengers: 16, luggage: 2,
    transferPrice: "AED 900", price5hr: "AED 4,200 / 5 Hr", price10hr: "AED 7,500 / 10 Hr",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    desc: "Bold American stretch luxury - perfect for weddings, VIP events and unforgettable nights out across Dubai.",
  },
  {
    slug: "gmc-yukon-diamond-limousine",
    classSlug: "stretch-limousine",
    name: "GMC Yukon Diamond Limousine",
    category: "Stretch Limousine",
    passengers: 18, luggage: 2,
    transferPrice: "AED 950", price5hr: "AED 4,500 / 5 Hr", price10hr: "AED 8,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    desc: "The crown jewel of our stretch fleet - diamond-stitched interiors and a full entertainment suite for the most exclusive occasions.",
  },
  {
    slug: "chrysler-emerald-limousine",
    classSlug: "stretch-limousine",
    name: "Chrysler Emerald Limousine",
    category: "Stretch Limousine",
    passengers: 14, luggage: 2,
    transferPrice: "AED 800", price5hr: "AED 3,800 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",
    desc: "An iconic classic stretch - elegant, spacious and an unforgettable statement for weddings and special events in Dubai.",
  },

  // ── Standard Bus ──────────────────────────────────────────────────────
  {
    slug: "toyota-coaster-21",
    classSlug: "standard-bus",
    name: "Toyota Coaster 21 Seater",
    category: "Standard Bus",
    passengers: 21, luggage: 15,
    transferPrice: "AED 500", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,500 / 10 Hr",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
    desc: "A reliable, comfortable mini-bus ideal for corporate shuttles, school runs and group airport transfers across Dubai.",
  },
  {
    slug: "toyota-hiace-11",
    classSlug: "standard-bus",
    name: "Toyota Hiace 11 Seater",
    category: "Standard Van / Mini Bus",
    passengers: 11, luggage: 8,
    transferPrice: "AED 350", price5hr: "AED 750 / 5 Hr", price10hr: "AED 1,200 / 10 Hr",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
    desc: "The go-to solution for mid-size group transfers - dependable, spacious and available 24/7 across Dubai.",
  },
  {
    slug: "50-seater-luxury-bus",
    classSlug: "standard-bus",
    name: "50 Seater Luxury Coach",
    category: "Luxury Coach",
    passengers: 50, luggage: 50,
    transferPrice: "AED 800", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
    desc: "Dubai's premier solution for large corporate group transport, event shuttles and airport runs - 50 reclining seats.",
  },
];

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
      "Reliable group transport for every occasion - Toyota Coaster 21 Seater, Hiace 11 Seater, and 50-Seater Luxury Coach for corporate events, airport transfers, and tours.",
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
              ({ slug: vSlug, name, category, passengers, luggage, transferPrice, price5hr, price10hr, image, desc }) => (
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
                        href="tel:+971509200818"
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
