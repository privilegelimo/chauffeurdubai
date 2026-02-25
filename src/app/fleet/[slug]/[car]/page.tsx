import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserRound, Luggage, CheckCircle, Phone, MessageCircle, Star } from "lucide-react";
import BookingButton from "@/components/BookingButton";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const allVehicles = [
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
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85",
      "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=85",
    ],
    desc: "The BMW 7 Series represents the pinnacle of executive driving. With its powerful engine, state-of-the-art technology, and sumptuous interior, this flagship sedan delivers an unrivalled experience for business travellers and discerning clients in Dubai.",
    features: [
      "Leather executive seating with heating & ventilation",
      "Panoramic sunroof and ambient mood lighting",
      "Advanced noise insulation for a whisper-quiet cabin",
      "Rear entertainment screens and USB charging",
      "Wi-Fi connectivity for productive journeys",
      "Professional, uniformed chauffeur included",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"         },
      { label: "Luggage",      value: "3 standard bags" },
      { label: "Class",        value: "Business Class"  },
      { label: "Fuel Type",    value: "Petrol"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "Full Climate"    },
    ],
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
    images: [
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=85",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85",
    ],
    desc: "The Mercedes-Benz S 450 defines the modern executive saloon. With signature Mercedes craftsmanship, advanced MBUX technology, and a serene cabin, every journey in the S 450 is an experience in effortless luxury.",
    features: [
      "MBUX infotainment with voice control",
      "Burmester® surround sound system",
      "Massage seats with memory function",
      "Executive rear package with extended legroom",
      "Ambient lighting with 64 colour options",
      "Wi-Fi hotspot and wireless charging",
      "Complimentary water and refreshments",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"            },
      { label: "Luggage",      value: "3 standard bags"    },
      { label: "Class",        value: "Business Class"     },
      { label: "Fuel Type",    value: "Petrol/Mild Hybrid" },
      { label: "Transmission", value: "Automatic 9G"       },
      { label: "A/C",          value: "4-Zone Climate"     },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=85",
    ],
    desc: "The Mercedes S 500 is the undisputed pinnacle of luxury motoring. Featuring the most advanced driver assistance, unrivalled cabin silence, and first-class appointments, this is the vehicle of choice for Dubai's most discerning travellers.",
    features: [
      "First-class rear cabin with electrically reclining seats",
      "Rear-axle steering for effortless city manoeuvring",
      "ENERGIZING massage and wellness system",
      "Augmented reality Head-Up Display",
      "Burmester® 4D high-end surround sound",
      "Chauffeur partition available on request",
      "Champagne service and premium refreshments",
      "White-glove meet & greet included",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"         },
      { label: "Luggage",      value: "3 standard bags" },
      { label: "Class",        value: "First Class"     },
      { label: "Fuel Type",    value: "Petrol V8"       },
      { label: "Transmission", value: "Automatic 9G"    },
      { label: "A/C",          value: "4-Zone Climate"  },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85",
    ],
    desc: "The Mercedes Vito Tourer is the ideal group chauffeur vehicle — combining generous space for up to 7 passengers with the quality and comfort expected from Mercedes-Benz. A favourite for airport group transfers and family journeys.",
    features: [
      "Flexible seating for up to 7 passengers",
      "Individual captain-style seats",
      "Panoramic windows for scenic journeys",
      "Generous luggage space at the rear",
      "USB charging ports at every seat",
      "Dual-zone climate control",
      "Professional chauffeur included",
      "Ideal for family and group airport runs",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"         },
      { label: "Luggage",      value: "7 standard bags" },
      { label: "Class",        value: "Business Van"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "Dual Zone"       },
    ],
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
    images: [
      "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85",
    ],
    desc: "The Mercedes V 300 Tiffany Edition elevates group travel to an art form. Featuring custom Tiffany-grade VIP interior upgrades, individual reclining seats, and a premium sound system — this is group luxury redefined.",
    features: [
      "Custom Tiffany VIP interior conversion",
      "Individual reclining luxury seats",
      "Starlight LED ceiling effect",
      "Premium entertainment system",
      "Refrigerator and refreshment station",
      "Mood lighting with multiple presets",
      "Privacy blinds on all windows",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"         },
      { label: "Luggage",      value: "7 standard bags" },
      { label: "Class",        value: "Business Van"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic 9G"    },
      { label: "A/C",          value: "Multi-Zone"      },
    ],
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
    images: [
      "https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85",
    ],
    desc: "The Mercedes VIP Trend 250 is the ultimate executive MPV for groups. Every detail of the interior has been curated for VIP comfort — from the individual climate zones to the premium Nappa leather seating.",
    features: [
      "Nappa leather individual VIP seating",
      "Full-length centre console with storage",
      "4-zone independent climate control",
      "Rear mini-bar with chilled compartment",
      "42-inch fold-out display screen",
      "Soundproofed cabin for private conversations",
      "Separate luggage compartment",
      "White-glove chauffeur service included",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"         },
      { label: "Luggage",      value: "7 standard bags" },
      { label: "Class",        value: "Business Van"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "4-Zone VIP"      },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85",
    ],
    desc: "The Mercedes Sprinter Ultra Luxury Van is the benchmark for large group luxury transport in Dubai. With premium captain seats, full entertainment setup, and generous luggage capacity, this van handles every detail of your group's comfort.",
    features: [
      "16 premium captain seats with recline",
      "Individual entertainment screens per row",
      "USB-C and wireless charging at every seat",
      "Onboard Wi-Fi for all passengers",
      "Temperature-controlled drink storage",
      "Premium sound system throughout",
      "Large luggage bay at the rear",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 16"        },
      { label: "Luggage",      value: "9 standard bags" },
      { label: "Class",        value: "VIP Sprinter"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "Full Van A/C"    },
    ],
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
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85",
    ],
    desc: "The Sprinter Avant Garde VIP is the gold standard in luxury group transport. Lavish handcrafted interiors, ambient starlight ceilings, and exclusive captain chairs make every group journey feel like a first-class flight.",
    features: [
      "Handcrafted Avant Garde VIP interior",
      "Starlight LED ceiling throughout",
      "Electric recline captain seats",
      "Central LED display and entertainment hub",
      "Champagne-style refrigerator unit",
      "Mood lighting with preset scenes",
      "Separate driver cabin with partition",
      "White-glove group concierge service",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 11"        },
      { label: "Luggage",      value: "6 standard bags" },
      { label: "Class",        value: "VIP Sprinter"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "Multi-Zone VIP"  },
    ],
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
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85",
    ],
    desc: "The Mercedes Sprinter 19-Seater is the perfect solution for large group transfers in Dubai. Premium seating, generous luggage capacity, and a professional chauffeur make it the top choice for corporate shuttles, events, and airport runs.",
    features: [
      "19 premium fabric/leather seats",
      "Overhead luggage racks",
      "USB charging ports throughout",
      "Onboard Wi-Fi available",
      "Full-length cabin air conditioning",
      "PA system for tour groups",
      "Step-assist entry for easy boarding",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 19"        },
      { label: "Luggage",      value: "9 standard bags" },
      { label: "Class",        value: "VIP Sprinter"    },
      { label: "Fuel Type",    value: "Diesel"          },
      { label: "Transmission", value: "Automatic"       },
      { label: "A/C",          value: "Full Van A/C"    },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85",
    ],
    desc: "The GMC Yukon Denali commands attention on every road in Dubai. Combining full-size SUV presence with premium Denali luxury appointments, this is the preferred choice for executive families and groups who refuse to compromise on space or style.",
    features: [
      "Denali Premium leather-trimmed interior",
      "Tri-zone climate control",
      "Power-folding third row for extra luggage",
      "Rear-seat entertainment system",
      "Bose premium audio throughout",
      "Magnetic Ride Control suspension",
      "USB charging at all three rows",
      "Professional chauffeur service included",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"          },
      { label: "Luggage",      value: "7 standard bags"  },
      { label: "Class",        value: "Luxury SUV"       },
      { label: "Fuel Type",    value: "Petrol V8"        },
      { label: "Transmission", value: "Automatic 10-Spd" },
      { label: "A/C",          value: "Tri-Zone Climate" },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85",
    ],
    desc: "The GMC Yukon Stretch Limousine is the ultimate party and event vehicle in Dubai. With a full entertainment bar, LED mood lighting, and seating for up to 18 guests, this iconic limousine turns every occasion into an unforgettable event.",
    features: [
      "Stretch limousine with seating for 18",
      "Full built-in entertainment bar",
      "LED colour-changing mood lighting",
      "Surround sound premium audio system",
      "Multiple flat-screen displays",
      "Champagne/drinks cooler included",
      "Starlight ceiling and mirror panels",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 18"         },
      { label: "Luggage",      value: "2 bags"            },
      { label: "Class",        value: "Limousine"         },
      { label: "Fuel Type",    value: "Petrol V8"         },
      { label: "Transmission", value: "Automatic"         },
      { label: "A/C",          value: "Full Limo Climate" },
    ],
  },
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
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=85",
    ],
    desc: "Our 50-Seater Luxury Coach is Dubai's premier solution for large group transport. Whether it's a corporate event, airport shuttle, or guided tour, this premium coach delivers comfort, reliability, and style for every passenger.",
    features: [
      "50 premium reclining seats with armrests",
      "Full-length underfloor luggage storage",
      "Onboard Wi-Fi for all passengers",
      "Individual USB charging at every seat",
      "PA and microphone system for guides",
      "Overhead storage racks throughout",
      "Full climate-controlled cabin",
      "Professional licensed coach driver",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 50"        },
      { label: "Luggage",      value: "Full luggage bay" },
      { label: "Class",        value: "Luxury Bus"       },
      { label: "Fuel Type",    value: "Diesel"           },
      { label: "Transmission", value: "Automatic"        },
      { label: "A/C",          value: "Full Coach A/C"   },
    ],
  },
];

export async function generateStaticParams() {
  return allVehicles.map((v) => ({ slug: v.classSlug, car: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}): Promise<Metadata> {
  const { car } = await params;
  const vehicle = allVehicles.find((v) => v.slug === car);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} Chauffeur Dubai | Luxury Car Hire with Driver`,
    description: `Book ${vehicle.name} with professional chauffeur in Dubai. ${vehicle.category}. From ${vehicle.transferPrice} for airport transfers. Available 24/7 across Dubai and UAE.`,
    alternates: {
      canonical: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
    },
  };
}

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
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(183,110,121,0.2) 60%, transparent 100%)",
          }}
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
                <h1 className="text-3xl sm:text-5xl font-bold text-white">
                  {vehicle.name}
                </h1>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="#e8a4a0" className="text-rose-300" />
                ))}
                <span className="ml-1">5.0 — Luxury Fleet</span>
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

          {/* Left — Details */}
          <div className="lg:col-span-2 space-y-10">

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                About the {vehicle.name}
              </h2>
              <p className="text-zinc-500 leading-relaxed">{vehicle.desc}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                What's Included
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
                Vehicle Specifications
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

          {/* Right — Booking Card */}
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
                    href="tel:+971509200818"
                    className="flex items-center justify-center gap-2 w-full border-2 border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <Phone size={16} />
                    Call to Book
                  </a>
                  <a
                    href={`https://wa.me/971509200818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}%20in%20Dubai`}
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
                  "Fixed price — no hidden charges",
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
          Ready to Book the {vehicle.name}?
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Available 24/7 across Dubai — airport transfers, corporate hire, and more.
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
