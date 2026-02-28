import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Plane, Briefcase, MapPin, Clock, Star, Car,
  UserRound, Phone, MessageCircle, CheckCircle,
  PartyPopper, ArrowLeft, Van,
} from "lucide-react";
import ServiceBookingForm from "@/components/ServiceBookingForm";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

// ─── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Plane,
    slug: "airport-transfer-dubai",
    title: "Airport Transfer Dubai, Abu Dhabi & Sharjah",
    keyword: "Dubai Airport Transfer Service",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85",
    imageAlt: "Luxury airport transfer Dubai Abu Dhabi Sharjah - chauffeur meet and greet DXB AUH SHJ",
    description:
      "The most reliable airport transfer service covering DXB, DWC, Abu Dhabi International (AUH), and Sharjah (SHJ) airports. VIP meet & greet, real-time flight tracking, and fixed pricing — no surprises.",
    longDesc:
      "Whether you're arriving on a business trip in Dubai, connecting through Abu Dhabi, or departing from Sharjah, our airport transfer service ensures you travel in complete comfort and style. Our professional chauffeurs monitor your flight in real time and adjust pickup times accordingly — so even if your flight is delayed, we'll be there. No meter running, no surge pricing — just a fixed, transparent rate from the moment you book.",
    features: [
      "Meet & greet with name board at arrivals",
      "Real-time flight tracking - we wait for delays",
      "All UAE airports: DXB, DWC, AUH, SHJ",
      "Luxury fleet - Mercedes S-Class, BMW 7 Series",
      "Fixed transparent pricing, no surge fees",
      "24/7 availability, 365 days a year",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Airport Transfer Dubai",
    metaTitle: "Airport Transfer Dubai, Abu Dhabi & Sharjah | Luxury Chauffeur - From AED 350",
    metaDesc:
      "Book a professional airport transfer in Dubai, Abu Dhabi, or Sharjah with meet & greet, flight tracking and fixed pricing. Covering DXB, DWC, AUH & SHJ. Available 24/7.",
    faq: [
      { q: "Which airports do you cover?", a: "We cover all UAE airports including Dubai International (DXB), Al Maktoum (DWC), Abu Dhabi International (AUH), and Sharjah (SHJ)." },
      { q: "What if my flight is delayed?", a: "We track your flight in real time and adjust your pickup time automatically — no extra charge for waiting." },
      { q: "Is the price fixed?", a: "Yes, all our airport transfer prices are fixed and agreed at the time of booking. No hidden fees or surge pricing across Dubai, Abu Dhabi, and Sharjah." },
    ],
  },
  {
    icon: Briefcase,
    slug: "corporate-chauffeur-dubai",
    title: "Corporate Chauffeur Service Dubai, Abu Dhabi & Sharjah",
    keyword: "Corporate Chauffeur Service Dubai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
    imageAlt: "Corporate chauffeur service Dubai Abu Dhabi Sharjah - executive car hire with driver UAE",
    description:
      "Premium corporate chauffeur service across Dubai, Abu Dhabi, and Sharjah for executives, roadshows, board meetings, and corporate events. Discreet, punctual, and always immaculately presented.",
    longDesc:
      "From DIFC to Business Bay in Dubai, and from Abu Dhabi's financial district to Sharjah's business hubs, our corporate chauffeur service is trusted by multinationals, law firms, and C-suite executives who demand reliability and discretion. Whether it's a daily commute, a roadshow across the UAE, or ferrying clients from the airport to a board meeting, our fleet and professional drivers deliver every time.",
    features: [
      "Dedicated corporate accounts with monthly billing",
      "Priority booking and 24/7 support",
      "Experienced, professionally dressed chauffeurs",
      "Wi-Fi enabled vehicles for working on the go",
      "Full-day chauffeur service in Dubai, Abu Dhabi & Sharjah",
      "Serving all business districts across the UAE",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Corporate Chauffeur Dubai",
    metaTitle: "Corporate Chauffeur Service Dubai, Abu Dhabi & Sharjah | Executive Car Hire UAE",
    metaDesc:
      "Professional corporate chauffeur service in Dubai, Abu Dhabi, and Sharjah for executives and business travel. Discreet, punctual, Wi-Fi enabled vehicles. Corporate accounts available.",
    faq: [
      { q: "Do you offer corporate accounts?", a: "Yes, we offer dedicated corporate accounts with consolidated monthly billing, priority booking, and a dedicated account manager." },
      { q: "Can we book multiple vehicles at once?", a: "Absolutely. We can coordinate multi-vehicle bookings for large delegations, roadshows, or corporate events across Dubai, Abu Dhabi, and Sharjah." },
      { q: "Are the vehicles Wi-Fi enabled?", a: "Yes, all our corporate fleet vehicles are equipped with Wi-Fi so you can stay productive on the move." },
    ],
  },
  {
    icon: UserRound,
    slug: "vip-chauffeur-dubai",
    title: "VIP Chauffeur Service Dubai, Abu Dhabi & Sharjah",
    keyword: "VIP Airport Pick-Up Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85",
    imageAlt: "VIP chauffeur service Dubai Abu Dhabi Sharjah - Rolls-Royce with driver luxury transport UAE",
    description:
      "The ultimate VIP airport pick-up and executive transport experience across Dubai, Abu Dhabi, and Sharjah. Rolls-Royce, limousines, and the finest luxury vehicles with white-glove service.",
    longDesc:
      "For those who expect nothing but the best, our VIP chauffeur service across Dubai, Abu Dhabi, and Sharjah delivers an unmatched experience from the moment you land. Our Rolls-Royce fleet with dedicated drivers, stretch limousines, and ultra-luxury sedans are available for airport pickups, private events, galas, and high-profile occasions across the UAE.",
    features: [
      "Rolls-Royce rental with driver in Dubai & Abu Dhabi",
      "VIP airport pick-up at DXB, DWC, AUH & SHJ with name board",
      "White-glove concierge-level service",
      "Discreet handling for celebrities & executives",
      "Luxury limousine service for events & galas",
      "Available across Dubai, Abu Dhabi, Sharjah and the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book VIP Chauffeur Dubai",
    metaTitle: "VIP Chauffeur Service Dubai, Abu Dhabi & Sharjah | Rolls-Royce & Limo Hire UAE",
    metaDesc:
      "VIP chauffeur service in Dubai, Abu Dhabi, and Sharjah with Rolls-Royce, stretch limousines and white-glove service. Perfect for executives, celebrities and special occasions.",
    faq: [
      { q: "Which VIP vehicles are available?", a: "We offer Rolls-Royce Ghost, Rolls-Royce Cullinan, GMC Yukon Limousine, Chrysler Emerald Limousine, and more from our ultra-luxury fleet — available across Dubai, Abu Dhabi, and Sharjah." },
      { q: "Is the service discreet?", a: "Absolutely. We specialise in discreet, private transport for high-profile clients including executives, celebrities and dignitaries across the UAE." },
      { q: "Can I book a Rolls-Royce for an event?", a: "Yes. Our Rolls-Royce fleet is available for airport pickups, weddings, galas, corporate events and private occasions across Dubai and Abu Dhabi." },
    ],
  },
  {
    icon: Clock,
    slug: "full-day-chauffeur-dubai",
    title: "Full Day & Hourly Chauffeur Dubai, Abu Dhabi & Sharjah",
    keyword: "Full Day Chauffeur Service Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    imageAlt: "Full day chauffeur service Dubai Abu Dhabi Sharjah - hourly car hire with driver UAE",
    description:
      "Maximum flexibility — book a full day chauffeur service or hire by the hour across Dubai, Abu Dhabi, and Sharjah. Perfect for shopping, meetings, events, or anything in between.",
    longDesc:
      "Our hourly and full-day chauffeur packages give you complete flexibility over your schedule across Dubai, Abu Dhabi, and Sharjah. Have a luxury vehicle and professional driver at your disposal for as long as you need — whether that's 5 hours for a half-day of meetings or 10 hours for a full day of appointments, shopping, and events.",
    features: [
      "Half-day, full-day, and hourly packages",
      "No hidden extras - fixed hourly rates",
      "Wait-and-return available at any location",
      "Available across Dubai, Abu Dhabi & Sharjah",
      "Same professional luxury fleet",
      "Ideal for shopping trips, meetings & events",
    ],
    price: "Starting from AED 900 / 5 Hr",
    ctaLabel: "Book Full Day Chauffeur Dubai",
    metaTitle: "Hourly & Full Day Chauffeur Dubai, Abu Dhabi & Sharjah | Car with Driver by the Hour",
    metaDesc:
      "Book a full day or hourly chauffeur service in Dubai, Abu Dhabi, or Sharjah. Fixed rates, luxury vehicles, professional drivers. 5 hour and 10 hour packages available.",
    faq: [
      { q: "What is included in the hourly package?", a: "All packages include a professional chauffeur, fuel, and the vehicle — fully at your disposal for the duration booked across Dubai, Abu Dhabi, or Sharjah." },
      { q: "Can I add hours during the booking?", a: "Yes, subject to availability. Simply let your chauffeur know and we'll arrange the extension." },
      { q: "Is wait time included?", a: "Yes — waiting time within your booked hours is included. The chauffeur remains with you throughout." },
    ],
  },
  {
    icon: PartyPopper,
    slug: "event-transport-dubai",
    title: "Event Transport Dubai, Abu Dhabi & Sharjah",
    keyword: "Event Transport Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85",
    imageAlt: "Event transport Dubai Abu Dhabi Sharjah - luxury coach group chauffeur hire GITEX UAE",
    description:
      "Professional event transport for corporate events, exhibitions, trade shows, conferences, and private functions across Dubai, Abu Dhabi, and Sharjah. We handle all logistics so your guests arrive on time, comfortably, and in style.",
    longDesc:
      "From GITEX to Arab Health in Dubai, Abu Dhabi ADNEC events to Sharjah Expo Centre — our event transport team specialises in seamless multi-vehicle coordination across the UAE. We work directly with event organisers to ensure every delegate, guest, or executive is collected and delivered on schedule, in the right vehicle, every time.",
    features: [
      "Corporate events, conferences & trade shows (GITEX, Arab Health, ADIPEC & more)",
      "Exhibitions & business summits across Dubai, Abu Dhabi & Sharjah",
      "Private functions, galas & corporate dinners",
      "Group transport with luxury vans, SUVs & coaches",
      "Multi-vehicle coordination for large-scale events across the UAE",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Event Transport Dubai",
    metaTitle: "Event Transport Dubai, Abu Dhabi & Sharjah | Corporate & Private Event Chauffeur UAE",
    metaDesc:
      "Professional event transport in Dubai, Abu Dhabi, and Sharjah for GITEX, Arab Health, ADIPEC, corporate dinners and private functions. Multi-vehicle coordination, luxury fleet.",
    faq: [
      { q: "Can you handle large-scale events?", a: "Yes. We have a large fleet including luxury coaches, Sprinter vans, and SUVs — capable of managing events with hundreds of guests across Dubai, Abu Dhabi, and Sharjah." },
      { q: "Do you work with event planners?", a: "Absolutely. We regularly collaborate with event management companies and venue coordinators across the UAE to ensure smooth logistics." },
      { q: "How far in advance should I book?", a: "For major events, we recommend booking at least 2 weeks in advance to ensure vehicle and chauffeur availability." },
    ],
  },
  {
    icon: Van,
    slug: "luxury-van-rental-dubai",
    title: "Luxury Van Rental Dubai, Abu Dhabi & Sharjah",
    keyword: "Luxury Van Rental Dubai Abu Dhabi Sharjah with Driver",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85",
    imageAlt: "Luxury van rental Dubai Abu Dhabi Sharjah - Mercedes Sprinter VIP van hire with driver UAE",
    description:
      "Spacious, stylish, and fully equipped — our luxury van rental service is perfect for group airport transfers, corporate roadshows, family trips, and VIP events across Dubai, Abu Dhabi, and Sharjah.",
    longDesc:
      "Whether you're moving a corporate team between meetings in Dubai, transferring a family group from Abu Dhabi International Airport, or organising guest transport for a private event in Sharjah, our luxury van rental service delivers comfort and style for groups of all sizes. Choose from our Mercedes Sprinter VIP, Mercedes V-Class, or Toyota Granvia — all chauffeured by professionally trained drivers available around the clock.",
    features: [
      "Mercedes Sprinter VIP, V-Class & Toyota Granvia available",
      "7 to 19 seats — ideal for groups and families",
      "Professional chauffeur included",
      "Airport transfers, tours & corporate use across Dubai, Abu Dhabi & Sharjah",
      "Wi-Fi, leather seating & privacy glass",
      "Available 24/7 across the UAE",
    ],
    price: "Starting from AED 450",
    ctaLabel: "Book Luxury Van Dubai",
    metaTitle: "Luxury Van Rental Dubai, Abu Dhabi & Sharjah | Mercedes Sprinter & V-Class with Driver",
    metaDesc:
      "Book a luxury van rental in Dubai, Abu Dhabi, or Sharjah with professional chauffeur. Mercedes Sprinter VIP, V-Class & Toyota Granvia. 7–19 seats, airport transfers, corporate & events.",
    faq: [
      { q: "How many passengers can the vans accommodate?", a: "Our luxury vans seat between 7 and 19 passengers depending on the model — perfect for families, corporate groups, and event transport across Dubai, Abu Dhabi, and Sharjah." },
      { q: "Which van models are available?", a: "We offer the Mercedes Sprinter VIP, Mercedes V-Class, and Toyota Granvia — all fully equipped with leather seating, Wi-Fi, and privacy glass." },
      { q: "Can I book a luxury van for an airport transfer?", a: "Absolutely. Our luxury vans are a popular choice for group airport pickups and drop-offs at DXB, DWC, AUH, and SHJ, complete with meet & greet and flight tracking." },
    ],
  },
  {
    icon: Star,
    slug: "wedding-limo-dubai",
    title: "Wedding Limo Dubai, Abu Dhabi & Sharjah",
    keyword: "Wedding Limo Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1519741347686-c1e331ec5e89?w=1200&q=85",
    imageAlt: "Wedding limo Dubai Abu Dhabi Sharjah - Rolls-Royce bridal car hire with chauffeur UAE",
    description:
      "Make your wedding day unforgettable with our wedding limo service in Dubai, Abu Dhabi, and Sharjah. From Rolls-Royce rental with driver to stretch limousines — arrive in absolute style.",
    longDesc:
      "Your wedding day deserves perfection — and that includes the journey, whether you're celebrating in Dubai, Abu Dhabi, or Sharjah. Our wedding limo service offers a handpicked selection of ultra-luxury vehicles including Rolls-Royce, Chrysler Emerald Limousine, and GMC Yukon Limousine, all with immaculately dressed chauffeurs. We work around your wedding timeline so you never have to worry about being late.",
    features: [
      "Rolls-Royce, stretch limos & luxury sedans available",
      "Decorated vehicle options for weddings",
      "Professional, discreet chauffeurs",
      "Punctual - we work around your wedding timeline",
      "Hotel, venue & event transfers across Dubai, Abu Dhabi & Sharjah",
      "Available across the UAE",
    ],
    price: "Starting from AED 850",
    ctaLabel: "Book Wedding Limo Dubai",
    metaTitle: "Wedding Limo Dubai, Abu Dhabi & Sharjah | Rolls-Royce & Stretch Limousine Hire UAE",
    metaDesc:
      "Wedding limo in Dubai, Abu Dhabi, and Sharjah with Rolls-Royce, stretch limousines and luxury sedans. Professionally decorated vehicles, discreet chauffeurs. Book your wedding car today.",
    faq: [
      { q: "Can the vehicle be decorated?", a: "Yes, we offer decorated vehicle options with floral arrangements and ribbons. Please request this at the time of booking." },
      { q: "How early should I book for a wedding?", a: "We recommend booking at least 4–6 weeks before your wedding date to secure your preferred vehicle." },
      { q: "Do you cover just the bride or the whole wedding party?", a: "We can arrange transport for the entire wedding party across Dubai, Abu Dhabi, and Sharjah — from the bridal car to guest shuttles — all coordinated seamlessly." },
    ],
  },
  {
    icon: MapPin,
    slug: "private-driver-sightseeing-dubai",
    title: "Private Driver for Sightseeing Dubai & Abu Dhabi",
    keyword: "Private Driver for Sightseeing Dubai Abu Dhabi",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85",
    imageAlt: "Private driver sightseeing Dubai Abu Dhabi - Burj Khalifa Sheikh Zayed Mosque tour chauffeur",
    description:
      "Explore Dubai and Abu Dhabi's most iconic landmarks with a private sightseeing driver. Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque, and more — at your own pace.",
    longDesc:
      "Dubai and Abu Dhabi are two of the world's most spectacular cities — and the best way to experience them is with your own private driver. Our sightseeing chauffeur service lets you explore at your own pace, stopping wherever you wish. Our knowledgeable drivers can suggest the best spots, photo opportunities, and hidden gems across both cities.",
    features: [
      "Customised sightseeing routes across Dubai & Abu Dhabi",
      "Burj Khalifa, Palm Jumeirah, Dubai Marina, Sheikh Zayed Grand Mosque & more",
      "Knowledgeable, friendly chauffeurs",
      "Flexible hourly or full-day packages",
      "Comfortable luxury vehicles with privacy",
      "Perfect for tourists, VIP guests, and families",
    ],
    price: "Starting from AED 350",
    ctaLabel: "Book Sightseeing Driver Dubai",
    metaTitle: "Private Driver for Sightseeing Dubai & Abu Dhabi | City Tour Chauffeur UAE",
    metaDesc:
      "Explore Dubai and Abu Dhabi with a private sightseeing driver. Burj Khalifa, Palm Jumeirah, Sheikh Zayed Grand Mosque and more at your own pace. Hourly and full-day packages.",
    faq: [
      { q: "Can I customise my sightseeing route?", a: "Absolutely. We'll plan the route around your interests — or you can leave it to our knowledgeable drivers to show you the best of Dubai and Abu Dhabi." },
      { q: "Is this suitable for families?", a: "Yes. We have spacious SUVs and vans that comfortably accommodate families with children and luggage across Dubai and Abu Dhabi." },
      { q: "Do you cover Abu Dhabi sightseeing too?", a: "Yes, we arrange full-day Abu Dhabi city tours from Dubai, covering Sheikh Zayed Grand Mosque, Ferrari World, Yas Island, the Corniche, and more." },
    ],
  },
  {
    icon: Car,
    slug: "monthly-car-with-driver-dubai",
    title: "Monthly Car with Driver Service Dubai, Abu Dhabi & Sharjah",
    keyword: "Monthly Car with Driver Service Dubai Abu Dhabi Sharjah",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85",
    imageAlt: "Monthly car with driver service Dubai Abu Dhabi Sharjah - dedicated chauffeur hire UAE",
    description:
      "Our monthly car with driver service gives you a dedicated professional chauffeur for daily commutes, school runs, and errands across Dubai, Abu Dhabi, and Sharjah — all at a fixed monthly rate.",
    longDesc:
      "For residents and long-term visitors in Dubai, Abu Dhabi, or Sharjah who need a reliable, professional driver on a daily basis, our monthly car with driver service is the ideal solution. One dedicated chauffeur, one fixed monthly rate — no hassle, no hidden costs. Available mornings, evenings, or full-day depending on your schedule.",
    features: [
      "Dedicated assigned chauffeur each month",
      "Fixed monthly pricing - no surprises",
      "Daily commutes, school runs & errands across Dubai, Abu Dhabi & Sharjah",
      "Available mornings, evenings or full-day",
      "Trusted, background-checked drivers",
      "Flexible scheduling to suit your lifestyle",
    ],
    price: "Custom Monthly Rates",
    ctaLabel: "Enquire Monthly Driver Dubai",
    metaTitle: "Monthly Car with Driver Dubai, Abu Dhabi & Sharjah | Dedicated Chauffeur Service UAE",
    metaDesc:
      "Hire a dedicated monthly car with driver in Dubai, Abu Dhabi, or Sharjah. Fixed monthly rates, background-checked chauffeurs, flexible schedules for commutes, school runs and errands.",
    faq: [
      { q: "How does the monthly package work?", a: "You'll be assigned a dedicated chauffeur for the month across Dubai, Abu Dhabi, or Sharjah. We agree on your schedule upfront and the driver is available as needed." },
      { q: "Can I change my schedule mid-month?", a: "Yes, we're flexible. Just let us know in advance and we'll adjust your chauffeur's schedule accordingly." },
      { q: "Is there a minimum contract length?", a: "We offer monthly packages with no long-term lock-in. Many clients across Dubai, Abu Dhabi, and Sharjah start with one month and continue as needed." },
    ],
  },
];

// ─── Static Params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDesc,
    alternates: {
      canonical: `https://chauffeurdubai.ae/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDesc,
      url: `https://chauffeurdubai.ae/services/${service.slug}`,
      images: [{ url: service.image, alt: service.imageAlt }],
      type: "website",
    },
  };
}

// ─── Reusable sidebar blocks ───────────────────────────────────────────────────
function SidebarContent({
  title, price, ctaLabel, roseGoldGradient, roseGoldGradientSubtle,
}: {
  title: string;
  price: string;
  ctaLabel: string;
  roseGoldGradient: string;
  roseGoldGradientSubtle: string;
}) {
  return (
    <div className="space-y-4">
      {/* Booking Form Card */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-lg overflow-hidden">
        <div className="p-5" style={{ background: roseGoldGradient }}>
          <p className="text-white/80 text-xs uppercase tracking-widest mb-0.5">
            Quick Booking
          </p>
          <p className="text-white font-bold text-xl">{title}</p>
          <p className="text-white/70 text-xs mt-1">{price}</p>
        </div>
        <ServiceBookingForm service={title} ctaLabel={ctaLabel} />
      </div>

      {/* Trust Bullets */}
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

      {/* Browse Fleet CTA */}
      <div className="rounded-2xl p-5 text-center" style={{ background: roseGoldGradientSubtle }}>
        <p className="text-zinc-700 font-semibold text-sm mb-1">Browse Our Fleet</p>
        <p className="text-zinc-400 text-xs mb-4">
          Choose from Mercedes, Rolls-Royce, SUVs, Sprinters & more — available across Dubai, Abu Dhabi & Sharjah.
        </p>
        <Link
          href="/fleet"
          title="View luxury chauffeur fleet Dubai Abu Dhabi Sharjah"
          className="inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all"
          style={{ background: roseGoldGradient }}
        >
          View All Vehicles
        </Link>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const {
    icon: Icon, title, keyword, image, imageAlt,
    description, longDesc, features, price, ctaLabel, faq,
  } = service;

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description: service.metaDesc,
            url: `https://chauffeurdubai.ae/services/${slug}`,
            provider: {
              "@type": "LocalBusiness",
              name: "Chauffeur Dubai Luxury Travel",
              telephone: "+971509852818",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
            },
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "UAE"],
            offers: {
              "@type": "Offer",
              price: price.replace(/[^0-9]/g, "") || "0",
              priceCurrency: "AED",
              description: price,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "47",
              bestRating: "5",
            },
          }),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden pt-16">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(183,110,121,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Services
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: roseGoldGradient }}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ background: "rgba(183,110,121,0.5)" }}
                >
                  {keyword}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white">{title}</h1>
            </div>
            <div
              className="shrink-0 px-5 py-3 rounded-2xl text-white font-bold text-lg"
              style={{ background: roseGoldGradient }}
            >
              {price}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">{title}</h2>
              <p className="text-zinc-500 leading-relaxed mb-4">{description}</p>
              <p className="text-zinc-400 leading-relaxed text-sm">{longDesc}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <CheckCircle
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "#b76e79" }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* ── MOBILE ONLY — booking form sits between Features and FAQ ── */}
            <div className="block lg:hidden">
              <SidebarContent
                title={title}
                price={price}
                ctaLabel={ctaLabel}
                roseGoldGradient={roseGoldGradient}
                roseGoldGradientSubtle={roseGoldGradientSubtle}
              />
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faq.map(({ q, a }) => (
                  <div
                    key={q}
                    className="rounded-2xl border border-rose-100 p-5"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <p className="font-semibold text-zinc-800 text-sm mb-2">{q}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — desktop sticky sidebar only ────────────────── */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
              <SidebarContent
                title={title}
                price={price}
                ctaLabel={ctaLabel}
                roseGoldGradient={roseGoldGradient}
                roseGoldGradientSubtle={roseGoldGradientSubtle}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "#fdf0ef" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => {
              const RelIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  title={s.ctaLabel}
                  className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-3 left-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: roseGoldGradient }}
                      >
                        <RelIcon size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-zinc-800 text-sm group-hover:text-rose-400 transition-colors">
                      {s.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">{s.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Book {title}?
        </h2>
        <p className="text-white/80 text-sm mb-8">
          Available 24/7 across Dubai, Abu Dhabi, and Sharjah. Confirmed within minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20${encodeURIComponent(title)}%20in%20Dubai`}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp to book ${title} Dubai Abu Dhabi Sharjah`}
            className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ color: "#b76e79" }}
          >
            <MessageCircle size={18} />
            {ctaLabel}
          </a>
          <a
            href="tel:+971509852818"
            title="Call Chauffeur Dubai Luxury Travel - chauffeur service Dubai Abu Dhabi Sharjah"
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
