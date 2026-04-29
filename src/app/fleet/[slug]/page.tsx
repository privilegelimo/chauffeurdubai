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
import { generateSEO } from "@/lib/seo";

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
const classInfo: Record<
  string,
  { label: string; title: string; description: string; image: string; imageAlt: string }
> = {
  "business-class": {
    label: "Business Class",
    title: "Business Class Chauffeur Dubai | Premium Car Hire Service UAE",
    description:
      "Executive sedans and MPVs offering premium comfort. Perfect for corporate transfers, business meetings, & airport pickups across Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/audi-a6-1.webp",
    imageAlt: "Business class chauffeur Dubai Abu Dhabi Sharjah - Audi A6 Lexus ES 300 executive sedan UAE",
  },
  "first-class": {
    label: "First Class",
    title: "First Class Chauffeur Dubai | Premium Car Hire Service UAE",
    description:
      "Chauffeur-driven luxury in the UAE. Mercedes S 500 and BMW 7 Series - reserved for clients in Dubai, Abu Dhabi, and Sharjah who accept nothing but the finest.",
    image: "/images/vehicles/mercedes-s500-1.webp",
    imageAlt: "First class chauffeur Dubai Abu Dhabi - Mercedes S500 BMW 7 Series luxury sedan hire UAE",
  },
  "business-van": {
    label: "Business Van",
    title: "Business Van Chauffeur Dubai | Luxury Van Hire with Driver UAE",
    description:
      "Spacious luxury MPVs for groups, families, and travellers with extra luggage. Comfort and class for up to 7 passengers across Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/mercedes-v300-tiffany-1.webp",
    imageAlt: "Business van chauffeur Dubai Sharjah - Mercedes V-Class Vito luxury van rental with driver UAE",
  },
  "mercedes-sprinter-luxury-van": {
    label: "Mercedes Sprinter Luxury Van",
    title: "Mercedes Sprinter Luxury Van Chauffeur Service Dubai UAE",
    description:
      "Premium Mercedes Sprinter rent with driver for large group airport transfers, corporate events, and tours across Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/mercedes-sprinter-19-1.webp",
    imageAlt: "Mercedes Sprinter luxury van rental Dubai Abu Dhabi - group airport transfer UAE",
  },
  "mercedes-sprinter-luxury-vip": {
    label: "Mercedes Sprinter Luxury VIP",
    title: "VIP Sprinter Chauffeur Dubai | Luxury Van Hire Service UAE",
    description:
      "VIP Sprinter handcrafted interiors for the most discerning clients in Dubai, Abu Dhabi, and Sharjah. Starlight ceilings, champagne fridges, executive seating.",
    image: "/images/vehicles/mercedes-sprinter-avant-garde-1.webp",
    imageAlt: "Mercedes Sprinter VIP luxury interior Dubai - starlight ceiling executive van UAE",
  },
  "luxury-suv": {
    label: "Luxury SUV",
    title: "Luxury SUV Chauffeur Dubai | Premium SUV Hire with Driver UAE",
    description:
      "GMC Yukon Denali, Cadillac Escalade, and Range Rover for families and executive groups across Dubai, Abu Dhabi, and Sharjah who need presence and practicality.",
    image: "/images/vehicles/cadillac-escalade-1.webp",
    imageAlt: "Luxury SUV chauffeur Dubai Abu Dhabi Sharjah - GMC Yukon Denali Cadillac Escalade Range Rover hire UAE",
  },
  "rolls-royce": {
    label: "Rolls-Royce",
    title: "Rolls-Royce Chauffeur Dubai | Rolls-Royce Rental with Driver UAE",
    description:
      "The ultimate expression of automotive prestige across the UAE. Rolls-Royce Ghost and Cullinan with a professional chauffeur in Dubai, Abu Dhabi, and Sharjah.",
    image: "/images/vehicles/rolls-royce-cullinan-1.webp",
    imageAlt: "Rolls-Royce rental with driver Dubai Abu Dhabi - Rolls-Royce Ghost Cullinan chauffeur UAE",
  },
  "stretch-limousine": {
    label: "Stretch Limousine",
    title: "Stretch Limousine Hire Dubai | Wedding Limo & VIP Limo UAE",
    description:
      "Make the grandest of entrances with our stretch limousines - GMC Yukon, Diamond, Chevy Suburban & Chrysler Emerald - for weddings, VIP events & celebrations.",
    image: "/images/vehicles/gmc-yukon-limousine-1.webp",
    imageAlt: "Stretch limousine hire Dubai Sharjah - wedding limo GMC Yukon Chrysler Emerald UAE",
  },
  "standard-bus": {
    label: "Standard Bus",
    title: "Bus Rental Dubai | Group Transport with Driver Abu Dhabi Sharjah",
    description:
      "Reliable group transport for every occasion across Dubai, Abu Dhabi, and Sharjah - Toyota Coaster and Hiace for corporate events, airport transfers, and tours.",
    image: "/images/vehicles/toyota-hiace-11-1.webp",
    imageAlt: "Standard bus rental Dubai Sharjah Abu Dhabi - Toyota Coaster Hiace group transfer UAE",
  },
  "luxury-coach-bus": {
    label: "Luxury Coach Bus",
    title: "Luxury Coach Bus Rental Dubai | Group Transport UAE",
    description:
      "Premium luxury coaches for group travel across Dubai, Abu Dhabi, and Sharjah - 35 Seater and 50 Seater Luxury Coaches with onboard Wi-Fi and reclining seats.",
    image: "/images/vehicles/50-seater-luxury-coach-1.webp",
    imageAlt: "Luxury coach bus rental Dubai Abu Dhabi Sharjah - 35 50 seater group transport UAE events",
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

  // Try DB first, fall back to classInfo static data
  const seo = await generateSEO(`/fleet/${slug}`);
  if (Object.keys(seo).length > 0) return seo;

  return {
    title: info.title,
    description: info.description,
    alternates: {
      canonical: `https://www.chauffeurdubai.ae/fleet/${slug}`,
    },
    openGraph: {
      title: info.title,
      description: info.description,
      url: `https://www.chauffeurdubai.ae/fleet/${slug}`,
      images: [
        {
          url: `https://www.chauffeurdubai.ae${info.image}`,
          alt: info.imageAlt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: info.title,
      description: info.description,
      images: [`https://www.chauffeurdubai.ae${info.image}`],
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${info.label} Chauffeur Dubai Abu Dhabi Sharjah`,
    description: info.description,
    url: `https://www.chauffeurdubai.ae/fleet/${slug}`,
    itemListElement: vehicles.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.chauffeurdubai.ae/fleet/${slug}/${v.slug}`,
      name: `${v.name} Chauffeur Dubai Abu Dhabi Sharjah`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-[500px] flex items-end overflow-hidden pt-16">
        <Image
          src={info.image}
          alt={info.imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
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
          <p className="text-white/70 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            {info.description}
          </p>
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
              ({
                slug: vSlug,
                name,
                category,
                passengers,
                luggage,
                transferPrice,
                price5hr,
                price10hr,
                images,
                desc,
              }) => (
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
                        aria-label="Call to book"
                        className="flex items-center justify-center border border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm px-4 py-3 rounded-xl transition-all"
                      >
                        <Phone size={15} />
                      </a>
                      <a
                        href={`https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(name)}%20in%20Dubai`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp to book"
                        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-all"
                      >
                        <MessageCircle size={15} />
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
        <p className="text-white/80 mb-8 max-w-xl mx-auto text-sm sm:text-base">
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