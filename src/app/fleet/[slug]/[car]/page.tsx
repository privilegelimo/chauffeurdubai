import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserRound, Luggage, CheckCircle, Phone, MessageCircle, Star } from "lucide-react";
import BookingButton from "@/components/BookingButton";
import allVehiclesData from "@/data/vehicles.json";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── Type ──────────────────────────────────────────────────────────────────────
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
  metaDesc: string;
  seoKeywords: string;
  desc: string;
  longDesc: string;
  features: string[];
  specs: { label: string; value: string }[];
};

const allVehicles = allVehiclesData as Vehicle[];

// ─── Static Params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return allVehicles.map((v) => ({ slug: v.classSlug, car: v.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}): Promise<Metadata> {
  const { car, slug } = await params;
  const vehicle = allVehicles.find((v) => v.slug === car && v.classSlug === slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} Chauffeur Dubai | Hire with Driver from ${vehicle.transferPrice}`,
    description: vehicle.metaDesc,
    keywords: vehicle.seoKeywords,
    alternates: {
      canonical: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
    },
    openGraph: {
      title: `${vehicle.name} - Luxury Chauffeur Dubai`,
      description: vehicle.metaDesc,
      url: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
      images: [{ url: vehicle.images[0], alt: `${vehicle.name} chauffeur hire Dubai` }],
      type: "website",
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}) {
  const { car, slug } = await params;
  const vehicle = allVehicles.find((v) => v.slug === car && v.classSlug === slug);
  if (!vehicle) notFound();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${vehicle.name} Chauffeur Dubai`,
            description: vehicle.metaDesc,
            image: vehicle.images[0],
            url: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
            brand: { "@type": "Brand", name: "Chauffeur Luxury Travel" },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "AED",
              lowPrice: vehicle.transferPrice.replace(/[^0-9]/g, ""),
              offerCount: 3,
              offers: [
                { "@type": "Offer", name: "Airport Transfer Dubai", price: vehicle.transferPrice.replace(/[^0-9]/g, ""), priceCurrency: "AED" },
                { "@type": "Offer", name: "5 Hour Package", price: vehicle.price5hr.replace(/[^0-9]/g, "").slice(0, 4), priceCurrency: "AED" },
                { "@type": "Offer", name: "10 Hour Package", price: vehicle.price10hr.replace(/[^0-9]/g, "").slice(0, 5), priceCurrency: "AED" },
              ],
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "47", bestRating: "5" },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden pt-16">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.name} chauffeur hire Dubai`}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(183,110,121,0.2) 60%, transparent 100%)" }}
        />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/fleet/${vehicle.classSlug}`}
              className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to {vehicle.classSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3 inline-block"
                  style={{ background: roseGoldGradient }}
                >
                  {vehicle.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-white">{vehicle.name}</h1>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="#e8a4a0" className="text-rose-300" />
                ))}
                <span className="ml-1">5.0 - Luxury Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2 space-y-10">

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                {vehicle.name} Chauffeur Service in Dubai
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-4">{vehicle.desc}</p>
              <p className="text-zinc-400 leading-relaxed text-sm">{vehicle.longDesc}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                What&apos;s Included with Your {vehicle.name} Hire
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#b76e79" }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                {vehicle.name} Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {vehicle.specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 border border-rose-100 text-center"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-zinc-900 font-bold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-rose-100 flex-1 shadow-sm">
                <UserRound size={28} style={{ color: "#b76e79" }} />
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Passengers</p>
                  <p className="text-zinc-900 font-bold">Up to {vehicle.passengers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-rose-100 flex-1 shadow-sm">
                <Luggage size={28} style={{ color: "#b76e79" }} />
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Luggage</p>
                  <p className="text-zinc-900 font-bold">{vehicle.luggage} Standard Bags</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-rose-100 shadow-lg overflow-hidden">
                <div className="p-6" style={{ background: roseGoldGradient }}>
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Starting From</p>
                  <p className="text-white font-bold text-3xl">{vehicle.transferPrice}</p>
                  <p className="text-white/70 text-xs mt-1">Airport Transfer in Dubai</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">Transfer in Dubai</span>
                    <span className="font-bold" style={{ color: "#b76e79" }}>{vehicle.transferPrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">5 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price5hr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-zinc-500">10 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price10hr}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <BookingButton
                    carName={vehicle.name}
                    carCategory={vehicle.category}
                    transferPrice={vehicle.transferPrice}
                    price5hr={vehicle.price5hr}
                    price10hr={vehicle.price10hr}
                    maxPassengers={vehicle.passengers}
                  />
                  <a
                    href="tel:+971509852818"
                    className="flex items-center justify-center gap-2 w-full border-2 border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <Phone size={16} />
                    Call to Book
                  </a>
                  <a
                    href={`https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}%20in%20Dubai`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Directly
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-3 text-sm text-zinc-500">
                {[
                  "Professional licensed chauffeur included",
                  "Fixed price - no hidden charges",
                  "Free cancellation (24h notice)",
                  "Confirmed within minutes",
                  "Available 24/7 across Dubai",
                ].map((t) => (
                  <p key={t} className="font-medium">&#10003; {t}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Book the {vehicle.name} in Dubai?
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Available 24/7 - airport transfers, corporate hire and special occasions across Dubai and UAE.
        </p>
        <BookingButton
          carName={vehicle.name}
          carCategory={vehicle.category}
          transferPrice={vehicle.transferPrice}
          price5hr={vehicle.price5hr}
          price10hr={vehicle.price10hr}
          maxPassengers={vehicle.passengers}
        />
      </section>
    </>
  );
}
