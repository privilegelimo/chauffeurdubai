// src/app/fleet/[slug]/[car]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserRound, Luggage, CheckCircle, Phone, MessageCircle, Star } from "lucide-react";
import BookingButton from "@/components/BookingButton";
import VehicleImageCarousel from "@/components/VehicleImageCarousel";
import { generateSEO } from "@/lib/seo";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// ── Single module-level client — no args bug ─────────────────────────────────
const supabase = supabaseCreateClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

type Spec = { label: string; value: string };
type Vehicle = {
  slug:             string;
  class_slug:       string;
  name:             string;
  title:            string;
  category:         string;
  passengers:       number;
  luggage:          number;
  transfer_price:   string;
  price_5hr:        string;
  price_10hr:       string;
  images:           string[];
  cover_image:      string;
  meta_desc:        string;
  seo_keywords:     string;
  description:      string;
  long_description: string;
  features:         string[];
  specs:            Spec[];
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}): Promise<Metadata> {
  const { car, slug } = await params;

  const { data: vehicle } = await supabase
    .from("fleet")
    .select("name, title, meta_desc, seo_keywords, images, cover_image, class_slug, slug")
    .eq("slug", car)
    .eq("class_slug", slug)
    .single();

  if (!vehicle) return {};

  const seo = await generateSEO(`/fleet/${slug}/${car}`);
  if (Object.keys(seo).length > 0) return seo;

  const heroImage = vehicle.cover_image || vehicle.images?.[0] || "";

  return {
    title:       vehicle.title,
    description: vehicle.meta_desc,
    keywords:    vehicle.seo_keywords,
    alternates: {
      canonical: `https://www.chauffeurdubai.ae/fleet/${slug}/${car}`,
    },
    openGraph: {
      title:       vehicle.title,
      description: vehicle.meta_desc,
      url:         `https://www.chauffeurdubai.ae/fleet/${slug}/${car}`,
      images:      heroImage ? [{ url: heroImage, alt: `${vehicle.name} chauffeur hire Dubai` }] : [],
      type:        "website",
    },
    twitter: {
      card:        "summary_large_image",
      title:       vehicle.title,
      description: vehicle.meta_desc,
      images:      heroImage ? [heroImage] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}) {
  const { car, slug } = await params;

  const { data: vehicle } = await supabase
    .from("fleet")
    .select("*")
    .eq("slug", car)
    .eq("class_slug", slug)
    .eq("available", true)
    .single<Vehicle>();

  if (!vehicle) notFound();

  const heroImage  = vehicle.cover_image || vehicle.images?.[0] || "";
  const allImages  = vehicle.images?.filter(Boolean) ?? [];
  const classLabel = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name:        `${vehicle.name} Chauffeur Dubai Abu Dhabi Sharjah`,
            description: vehicle.meta_desc,
            image:       heroImage,
            url:         `https://www.chauffeurdubai.ae/fleet/${slug}/${car}`,
            brand:       { "@type": "Brand", name: "Chauffeur Luxury Travel" },
            offers: {
              "@type":       "AggregateOffer",
              priceCurrency: "AED",
              lowPrice:      vehicle.transfer_price.replace(/[^0-9]/g, ""),
              offerCount:    3,
              offers: [
                { "@type": "Offer", name: "Airport Transfer", price: vehicle.transfer_price.replace(/[^0-9]/g, ""),         priceCurrency: "AED" },
                { "@type": "Offer", name: "5 Hour Package",   price: vehicle.price_5hr.replace(/[^0-9]/g, "").slice(0, 4),  priceCurrency: "AED" },
                { "@type": "Offer", name: "10 Hour Package",  price: vehicle.price_10hr.replace(/[^0-9]/g, "").slice(0, 5), priceCurrency: "AED" },
              ],
            },
            areaServed:      ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "47", bestRating: "5" },
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative pt-16">
        <VehicleImageCarousel images={allImages} name={vehicle.name} />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 z-30">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/fleet/${slug}`}
              className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={15} /> Back to {classLabel}
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
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} fill="#e8a4a0" className="text-rose-300" />
                ))}
                <span className="ml-1">5.0 - Luxury Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                {vehicle.name} Chauffeur Service in Dubai, Abu Dhabi & Sharjah
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-4">{vehicle.description}</p>
              <p className="text-zinc-400 leading-relaxed text-sm">{vehicle.long_description}</p>
            </div>

            {vehicle.features?.length > 0 && (
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
            )}

            {vehicle.specs?.length > 0 && (
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
            )}

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

          {/* RIGHT - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-rose-100 shadow-lg overflow-hidden">
                <div className="p-6" style={{ background: roseGoldGradient }}>
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Starting From</p>
                  <p className="text-white font-bold text-3xl">{vehicle.transfer_price}</p>
                  <p className="text-white/70 text-xs mt-1">Airport Transfer - Dubai, Abu Dhabi & Sharjah</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">Transfer Within Dubai</span>
                    <span className="font-bold" style={{ color: "#b76e79" }}>{vehicle.transfer_price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">5 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price_5hr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-zinc-500">10 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price_10hr}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <BookingButton
                    carName={vehicle.name}
                    carCategory={vehicle.category}
                    transferPrice={vehicle.transfer_price}
                    price5hr={vehicle.price_5hr}
                    price10hr={vehicle.price_10hr}
                    maxPassengers={vehicle.passengers}
                  />
                  <a
                    href="tel:+971509852818"
                    className="flex items-center justify-center gap-2 w-full border-2 border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <Phone size={16} /> Call to Book
                  </a>
                  <a
                    href={`https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}%20in%20Dubai`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} /> WhatsApp Directly
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-3 text-sm text-zinc-500">
                {[
                  "Professional licensed chauffeur included",
                  "Fixed price - no hidden charges",
                  "Free cancellation (24h notice)",
                  "Confirmed within minutes",
                  "Available 24/7 across Dubai, Abu Dhabi & Sharjah",
                ].map((t) => (
                  <p key={t} className="font-medium">&#10003; {t}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Book the {vehicle.name} in Dubai, Abu Dhabi or Sharjah?
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Available 24/7 - airport transfers, corporate hire and special occasions across Dubai, Abu Dhabi, Sharjah, and the UAE.
        </p>
        <BookingButton
          carName={vehicle.name}
          carCategory={vehicle.category}
          transferPrice={vehicle.transfer_price}
          price5hr={vehicle.price_5hr}
          price10hr={vehicle.price_10hr}
          maxPassengers={vehicle.passengers}
        />
      </section>
    </>
  );
}