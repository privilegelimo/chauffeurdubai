"use client";

import { useState, useEffect, useRef } from "react";
import { X, MapPin, Car, Calendar, Clock, User, Phone, Mail, ChevronDown, ArrowRight, ArrowLeft, MessageCircle, Users, Luggage, CheckCircle } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

const DUBAI_LOCATIONS = [
  "Dubai International Airport (DXB)",
  "Al Maktoum International Airport (DWC)",
  "Burj Khalifa",
  "Dubai Mall",
  "Palm Jumeirah",
  "Jumeirah Beach Residence (JBR)",
  "Downtown Dubai",
  "Dubai Marina",
  "Business Bay",
  "DIFC (Dubai International Financial Centre)",
  "Deira City Centre",
  "Mall of the Emirates",
  "Dubai Hills Mall",
  "City Walk Dubai",
  "La Mer Beach",
  "Bluewaters Island",
  "Dubai Creek Harbour",
  "Emirates Towers",
  "Madinat Jumeirah",
  "The Atlantis Palm",
  "Burj Al Arab",
  "Jumeirah Hotel",
  "Four Seasons Dubai",
  "Address Downtown Hotel",
  "Ritz-Carlton DIFC",
  "Sofitel Downtown Dubai",
  "Dubai World Trade Centre",
  "Dubai Opera",
  "Museum of the Future",
  "Global Village Dubai",
  "Dubai Frame",
  "Dubai Sports City",
  "Arabian Ranches",
  "Emirates Hills",
  "Jumeirah Golf Estates",
  "Dubai Silicon Oasis",
  "Dubai Internet City",
  "Media City",
  "Knowledge Village",
  "Al Barsha",
  "Mirdif",
  "Jumeirah Village Circle (JVC)",
  "Discovery Gardens",
  "Ibn Battuta Mall",
  "Abu Dhabi International Airport",
  "Sharjah International Airport",
  "Yas Island, Abu Dhabi",
  "Ferrari World Abu Dhabi",
];

const CLASS_LABELS: Record<string, string> = {
  "business-class":               "Business Class",
  "first-class":                  "First Class",
  "business-van":                 "Business Van",
  "mercedes-sprinter-luxury-van": "Mercedes Sprinter Luxury Van",
  "mercedes-sprinter-luxury-vip": "Mercedes Sprinter Luxury VIP",
  "luxury-suv":                   "Luxury SUV",
  "rolls-royce":                  "Rolls-Royce",
  "stretch-limousine":            "Stretch Limousine",
  "standard-bus":                 "Standard Bus",
};

const BOOKING_TYPES = [
  { value: "transfer", label: "Airport Transfer", desc: "One-way or return" },
  { value: "5hr",      label: "5 Hour Package",   desc: "Half day"          },
  { value: "10hr",     label: "10 Hour Package",  desc: "Full day"          },
  { value: "point",    label: "Point to Point",   desc: "Custom route"      },
  { value: "weekly",   label: "Weekly",           desc: "7 days"            },
  { value: "monthly",  label: "Monthly",          desc: "30 days"           },
];

const allVehiclesData = [
  { slug: "lexus-es300",                    classSlug: "business-class",               name: "Lexus ES 300",                       category: "Executive Saloon / Sedan",       passengers: 3,  luggage: 3,  transferPrice: "AED 350",   price5hr: "AED 900 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"] },
  { slug: "audi-a6",                        classSlug: "business-class",               name: "Audi A6",                            category: "Executive Saloon / Sedan",       passengers: 3,  luggage: 3,  transferPrice: "AED 350",   price5hr: "AED 900 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"] },
  { slug: "byd-han",                        classSlug: "business-class",               name: "BYD Han EV",                         category: "Executive Electric Sedan",       passengers: 3,  luggage: 3,  transferPrice: "AED 350",   price5hr: "AED 900 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"] },
  { slug: "citroen-space-tourer",           classSlug: "business-class",               name: "Citroën Space Tourer 7 Pax",         category: "Executive MPV / 7 Seater",      passengers: 7,  luggage: 5,  transferPrice: "AED 350",   price5hr: "AED 950 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80"] },
  { slug: "toyota-granvia",                 classSlug: "business-class",               name: "Toyota Granvia Van 7 Pax",           category: "Premium MPV / 7 Seater",        passengers: 7,  luggage: 6,  transferPrice: "AED 350",   price5hr: "AED 950 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80"] },
  { slug: "mercedes-s500",                  classSlug: "first-class",                  name: "Mercedes S 500",                     category: "Executive VIP / First Class",    passengers: 3,  luggage: 3,  transferPrice: "AED 900",   price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,700 / 10 Hr",  images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80"] },
  { slug: "bmw-7-series",                   classSlug: "first-class",                  name: "BMW 7 Series",                       category: "Executive Saloon / First Class", passengers: 3,  luggage: 3,  transferPrice: "AED 550",   price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",  images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"] },
  { slug: "mercedes-vito-tourer",           classSlug: "business-van",                 name: "Mercedes Vito Tourer",               category: "Executive MPV",                  passengers: 7,  luggage: 7,  transferPrice: "AED 350",   price5hr: "AED 950 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80"] },
  { slug: "mercedes-v300-tiffany",          classSlug: "business-van",                 name: "Mercedes V 300 Tiffany",             category: "Luxury MPV",                     passengers: 7,  luggage: 7,  transferPrice: "AED 550",   price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80"] },
  { slug: "mercedes-vip-trend",             classSlug: "business-van",                 name: "Mercedes VIP Trend 250",             category: "Executive VIP MPV",              passengers: 7,  luggage: 7,  transferPrice: "AED 750",   price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=800&q=80"] },
  { slug: "mercedes-sprinter-ultra-luxury", classSlug: "mercedes-sprinter-luxury-van", name: "Mercedes Sprinter Ultra Luxury Van", category: "Executive Luxury Van",           passengers: 16, luggage: 9,  transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",  images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { slug: "mercedes-sprinter-19",           classSlug: "mercedes-sprinter-luxury-van", name: "Mercedes Sprinter 19 Seater",        category: "Luxury Van",                     passengers: 19, luggage: 9,  transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { slug: "mercedes-sprinter-avant-garde",  classSlug: "mercedes-sprinter-luxury-vip", name: "Mercedes Sprinter Avant Garde VIP",  category: "Executive VIP Van",              passengers: 11, luggage: 6,  transferPrice: "AED 1,100", price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,500 / 10 Hr",  images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { slug: "mercedes-sprinter-business-vip", classSlug: "mercedes-sprinter-luxury-vip", name: "Mercedes Sprinter Business Class VIP", category: "Business Class VIP Van",      passengers: 13, luggage: 7,  transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",  images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { slug: "gmc-yukon-denali",               classSlug: "luxury-suv",                   name: "GMC Yukon Denali",                   category: "Luxury SUV",                     passengers: 7,  luggage: 7,  transferPrice: "AED 350",   price5hr: "AED 950 / 5 Hr",   price10hr: "AED 1,400 / 10 Hr",  images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"] },
  { slug: "cadillac-escalade",              classSlug: "luxury-suv",                   name: "Cadillac Escalade 7 Seater",         category: "Luxury SUV",                     passengers: 7,  luggage: 7,  transferPrice: "AED 550",   price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",  images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"] },
  { slug: "range-rover-sport",              classSlug: "luxury-suv",                   name: "Range Rover Sport",                  category: "Luxury SUV",                     passengers: 5,  luggage: 4,  transferPrice: "AED 550",   price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",  images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"] },
  { slug: "rolls-royce-ghost",              classSlug: "rolls-royce",                  name: "Rolls-Royce Ghost",                  category: "Ultra Luxury Saloon",            passengers: 3,  luggage: 3,  transferPrice: "AED 2,500", price5hr: "AED 5,000 / 5 Hr", price10hr: "AED 9,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80"] },
  { slug: "rolls-royce-cullinan",           classSlug: "rolls-royce",                  name: "Rolls-Royce Cullinan",               category: "Ultra Luxury SUV",               passengers: 4,  luggage: 4,  transferPrice: "AED 3,000", price5hr: "AED 6,000 / 5 Hr", price10hr: "AED 11,000 / 10 Hr", images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"] },
  { slug: "gmc-yukon-limousine",            classSlug: "stretch-limousine",            name: "GMC Yukon Limousine",                category: "Stretch Limousine",              passengers: 18, luggage: 2,  transferPrice: "AED 850",   price5hr: "AED 4,000 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80"] },
  { slug: "chevy-suburban-titanium-limousine", classSlug: "stretch-limousine",         name: "Chevy Suburban Titanium Limousine",  category: "Stretch Limousine",              passengers: 16, luggage: 2,  transferPrice: "AED 900",   price5hr: "AED 4,200 / 5 Hr", price10hr: "AED 7,500 / 10 Hr",  images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80"] },
  { slug: "gmc-yukon-diamond-limousine",    classSlug: "stretch-limousine",            name: "GMC Yukon Diamond Limousine",        category: "Stretch Limousine",              passengers: 18, luggage: 2,  transferPrice: "AED 950",   price5hr: "AED 4,500 / 5 Hr", price10hr: "AED 8,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80"] },
  { slug: "chrysler-emerald-limousine",     classSlug: "stretch-limousine",            name: "Chrysler Emerald Limousine",         category: "Stretch Limousine",              passengers: 14, luggage: 2,  transferPrice: "AED 800",   price5hr: "AED 3,800 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",  images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80"] },
  { slug: "toyota-coaster-21",              classSlug: "standard-bus",                 name: "Toyota Coaster 21 Seater",           category: "Standard Bus",                   passengers: 21, luggage: 15, transferPrice: "AED 500",   price5hr: "AED 900 / 5 Hr",   price10hr: "AED 1,500 / 10 Hr",  images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"] },
  { slug: "toyota-hiace-11",                classSlug: "standard-bus",                 name: "Toyota Hiace 11 Seater",             category: "Standard Van / Mini Bus",        passengers: 11, luggage: 8,  transferPrice: "AED 350",   price5hr: "AED 750 / 5 Hr",   price10hr: "AED 1,200 / 10 Hr",  images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"] },
  { slug: "50-seater-luxury-bus",           classSlug: "standard-bus",                 name: "50 Seater Luxury Coach",             category: "Luxury Coach",                   passengers: 50, luggage: 50, transferPrice: "AED 800",   price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",  images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"] },
];

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
};

const STEPS = [
  { number: 1, label: "Route"    },
  { number: 2, label: "Vehicle"  },
  { number: 3, label: "Schedule" },
  { number: 4, label: "Details"  },
];

interface HeroBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LocationInput({
  value,
  onChange,
  placeholder,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value.length > 0
    ? DUBAI_LOCATIONS.filter((l) =>
        l.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : DUBAI_LOCATIONS.slice(0, 6);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300">
          {icon}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300 bg-white"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-rose-100 shadow-xl z-50 overflow-hidden">
          {filtered.map((loc) => (
            <button
              key={loc}
              onMouseDown={() => { onChange(loc); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-zinc-600 hover:bg-rose-50 hover:text-zinc-800 transition-colors flex items-center gap-2"
            >
              <MapPin size={13} className="text-rose-300 shrink-0" />
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroBookingModal({ isOpen, onClose }: HeroBookingModalProps) {
  const [step, setStep]               = useState(1);
  const [sent, setSent]               = useState(false);
  const [pickup, setPickup]           = useState("");
  const [dropoff, setDropoff]         = useState("");
  const [selectedClass, setClass]     = useState("");
  const [selectedVehicle, setVehicle] = useState<Vehicle | null>(null);
  const [bookingType, setBookingType] = useState("transfer");
  const [date, setDate]               = useState<Date | undefined>();
  const [endDate, setEndDate]         = useState<Date | undefined>();
  const [showCal, setShowCal]         = useState(false);
  const [showEndCal, setShowEndCal]   = useState(false);
  const [time, setTime]               = useState("");
  const [form, setForm]               = useState({ name: "", phone: "", email: "", passengers: "1", notes: "" });

  if (!isOpen) return null;

  const vehicles      = allVehiclesData as Vehicle[];
  const classGroups   = [...new Set(vehicles.map((v) => v.classSlug))];
  const classVehicles = selectedClass ? vehicles.filter((v) => v.classSlug === selectedClass) : [];
  const isMultiDay    = bookingType === "weekly" || bookingType === "monthly";

  const passengerOptions = selectedVehicle
    ? Array.from({ length: selectedVehicle.passengers }, (_, i) => i + 1)
    : [1];

  const canStep1 = pickup.trim().length > 0 && dropoff.trim().length > 0;
  const canStep2 = selectedVehicle !== null;
  const canStep3 = date !== undefined && time.length > 0;
  const canStep4 = form.name.trim().length > 0 && form.phone.trim().length > 0;

  const priceForType = () => {
    if (!selectedVehicle) return "";
    const m: Record<string, string> = {
      transfer: selectedVehicle.transferPrice,
      "5hr":    selectedVehicle.price5hr,
      "10hr":   selectedVehicle.price10hr,
      point:    selectedVehicle.transferPrice,
      weekly:   "Contact for Rate",
      monthly:  "Contact for Rate",
    };
    return m[bookingType] ?? "";
  };

  const handleSend = () => {
    if (!canStep4 || !selectedVehicle) return;
    const lines = [
      `*New Booking Request - Chauffeur Dubai*`,
      ``,
      `*Route*`,
      `Pickup: ${pickup}`,
      `Drop-off: ${dropoff}`,
      ``,
      `*Vehicle*`,
      `${selectedVehicle.name} (${selectedVehicle.category})`,
      `Booking Type: ${BOOKING_TYPES.find((b) => b.value === bookingType)?.label}`,
      `Price: ${priceForType()}`,
      ``,
      `*Schedule*`,
      `Date: ${date ? format(date, "dd MMM yyyy") : "Not set"}`,
      isMultiDay && endDate ? `End Date: ${format(endDate, "dd MMM yyyy")}` : null,
      `Time: ${time}`,
      ``,
      `*Client Details*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Passengers: ${form.passengers}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/971509200818?text=${encodeURIComponent(lines)}`, "_blank");
    // Show success after 2.5s
    setTimeout(() => setSent(true), 2500);
  };

  const inputClass = "w-full border border-rose-100 rounded-xl px-4 py-3 text-sm text-zinc-700 focus:outline-none focus:border-rose-300 placeholder:text-zinc-300 bg-white";
  const labelClass = "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">

        {/* ── SUCCESS SCREEN ─────────────────────────────────── */}
        {sent ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
            <div className="relative mb-6">
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-25"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              />
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                <CheckCircle size={50} color="white" strokeWidth={2.5} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Booking Sent!</h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs">
              Your request for the{" "}
              <span className="font-semibold text-zinc-700">{selectedVehicle?.name}</span> has
              been sent via WhatsApp. Our team will confirm your booking shortly.
            </p>

            <a
              href="/"
              className="w-full max-w-xs py-3 rounded-xl text-white text-sm font-bold text-center shadow-md hover:opacity-90 transition-opacity block"
              style={{ background: roseGold }}
            >
              Back to Home
            </a>
          </div>

        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-rose-50" style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-0.5">
                    Book a Chauffeur
                  </p>
                  <h2 className="text-lg font-bold text-zinc-800">
                    {step === 1 && "Where are you going?"}
                    {step === 2 && "Select your vehicle"}
                    {step === 3 && "Pick a date and time"}
                    {step === 4 && "Your details"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow mt-0.5"
                >
                  <X size={16} className="text-zinc-400" />
                </button>
              </div>

              {/* Step progress */}
              <div className="flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <div key={s.number} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          background: step >= s.number ? roseGold : "#f0e8e8",
                          color: step >= s.number ? "white" : "#b0a0a0",
                        }}
                      >
                        {s.number}
                      </div>
                      <span
                        className="text-xs font-semibold hidden sm:block"
                        style={{ color: step >= s.number ? "#b76e79" : "#c0b0b0" }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="flex-1 h-0.5 rounded-full transition-all"
                        style={{ background: step > s.number ? roseGold : "#f0e8e8" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

              {/* STEP 1: Route */}
              {step === 1 && (
                <>
                  <div>
                    <label className={labelClass}>Pickup Location</label>
                    <LocationInput
                      value={pickup}
                      onChange={setPickup}
                      placeholder="e.g. Dubai International Airport"
                      icon={<MapPin size={16} />}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-rose-100" />
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: roseGold }}
                    >
                      <ArrowRight size={13} className="text-white" />
                    </div>
                    <div className="flex-1 h-px bg-rose-100" />
                  </div>

                  <div>
                    <label className={labelClass}>Drop-off Location</label>
                    <LocationInput
                      value={dropoff}
                      onChange={setDropoff}
                      placeholder="e.g. Burj Khalifa, Downtown Dubai"
                      icon={<MapPin size={16} />}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Booking Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {BOOKING_TYPES.map((bt) => (
                        <button
                          key={bt.value}
                          onClick={() => setBookingType(bt.value)}
                          className="text-left p-3 rounded-xl border-2 transition-all"
                          style={{
                            borderColor: bookingType === bt.value ? "#b76e79" : "#f0e8e8",
                            background:  bookingType === bt.value ? "#fdf2f4" : "white",
                          }}
                        >
                          <p className="text-sm font-semibold" style={{ color: bookingType === bt.value ? "#b76e79" : "#3f3f46" }}>
                            {bt.label}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">{bt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: Vehicle */}
              {step === 2 && (
                <>
                  <div>
                    <label className={labelClass}>Fleet Class</label>
                    <div className="relative">
                      <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <select
                        value={selectedClass}
                        onChange={(e) => { setClass(e.target.value); setVehicle(null); }}
                        className="w-full pl-9 pr-10 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 appearance-none bg-white"
                      >
                        <option value="">Select a class...</option>
                        {classGroups.map((c) => (
                          <option key={c} value={c}>{CLASS_LABELS[c] ?? c}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>

                  {selectedClass && (
                    <div>
                      <label className={labelClass}>Select Vehicle</label>
                      <div className="space-y-3">
                        {classVehicles.map((v) => (
                          <button
                            key={v.slug}
                            onClick={() => {
                              setVehicle(v);
                              setForm((p) => ({ ...p, passengers: "1" }));
                            }}
                            className="w-full flex items-center gap-4 p-3 rounded-2xl border-2 text-left transition-all"
                            style={{
                              borderColor: selectedVehicle?.slug === v.slug ? "#b76e79" : "#f0e8e8",
                              background:  selectedVehicle?.slug === v.slug ? "#fdf2f4" : "white",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={v.images[0]}
                              alt={v.name}
                              className="w-20 h-14 object-cover rounded-xl shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-zinc-800 truncate">{v.name}</p>
                              <p className="text-xs text-zinc-400 mt-0.5">{v.category}</p>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-zinc-500">
                                  <Users size={11} style={{ color: "#b76e79" }} />
                                  {v.passengers} pax
                                </span>
                                <span className="flex items-center gap-1 text-xs text-zinc-500">
                                  <Luggage size={11} style={{ color: "#b76e79" }} />
                                  {v.luggage} bags
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs text-zinc-400">From</p>
                              <p className="font-bold text-sm" style={{ color: "#b76e79" }}>
                                {v.transferPrice}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!selectedClass && (
                    <div className="text-center py-8 text-zinc-300">
                      <Car size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Select a class to see available vehicles</p>
                    </div>
                  )}
                </>
              )}

              {/* STEP 3: Schedule */}
              {step === 3 && (
                <>
                  <div>
                    <label className={labelClass}>{isMultiDay ? "Start Date" : "Journey Date"}</label>
                    <button
                      onClick={() => { setShowCal((v) => !v); setShowEndCal(false); }}
                      className="w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-xl border border-rose-100 text-sm bg-white"
                    >
                      <Calendar size={16} className="text-rose-300 shrink-0" />
                      <span className={date ? "text-zinc-700" : "text-zinc-400"}>
                        {date ? format(date, "dd MMM yyyy") : "Select a date"}
                      </span>
                    </button>
                    {showCal && (
                      <div className="mt-2 rounded-2xl border border-rose-100 overflow-hidden">
                        <DayPicker
                          mode="single"
                          selected={date}
                          onSelect={(d) => { setDate(d); setShowCal(false); }}
                          disabled={{ before: new Date() }}
                          className="!font-sans"
                        />
                      </div>
                    )}
                  </div>

                  {isMultiDay && (
                    <div>
                      <label className={labelClass}>End Date</label>
                      <button
                        onClick={() => { setShowEndCal((v) => !v); setShowCal(false); }}
                        className="w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-xl border border-rose-100 text-sm bg-white"
                      >
                        <Calendar size={16} className="text-rose-300 shrink-0" />
                        <span className={endDate ? "text-zinc-700" : "text-zinc-400"}>
                          {endDate ? format(endDate, "dd MMM yyyy") : "Select end date"}
                        </span>
                      </button>
                      {showEndCal && (
                        <div className="mt-2 rounded-2xl border border-rose-100 overflow-hidden">
                          <DayPicker
                            mode="single"
                            selected={endDate}
                            onSelect={(d) => { setEndDate(d); setShowEndCal(false); }}
                            disabled={{ before: date ?? new Date() }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Pickup Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700"
                      />
                    </div>
                  </div>

                  {selectedVehicle && (
                    <div className="rounded-2xl border border-rose-100 p-4" style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Booking Summary</p>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Route</span>
                          <span className="text-zinc-700 font-medium text-right max-w-[60%] truncate">
                            {pickup} → {dropoff}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Vehicle</span>
                          <span className="text-zinc-700 font-medium">{selectedVehicle.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Type</span>
                          <span className="text-zinc-700 font-medium">
                            {BOOKING_TYPES.find((b) => b.value === bookingType)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-rose-100 pt-1.5 mt-1.5">
                          <span className="text-zinc-400">Price</span>
                          <span className="font-bold" style={{ color: "#b76e79" }}>{priceForType()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* STEP 4: Client Details */}
              {step === 4 && (
                <>
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+971 50 XXX XXXX"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Number of Passengers</label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <select
                        value={form.passengers}
                        onChange={(e) => setForm((p) => ({ ...p, passengers: e.target.value }))}
                        className="w-full pl-9 pr-10 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 appearance-none bg-white"
                      >
                        {passengerOptions.map((n) => (
                          <option key={n} value={n}>
                            {n} Passenger{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                    {selectedVehicle && (
                      <p className="text-xs text-zinc-400 mt-1.5">
                        Vehicle capacity:{" "}
                        <span className="font-semibold" style={{ color: "#b76e79" }}>
                          {selectedVehicle.passengers} passengers max
                        </span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Additional Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      placeholder="Flight number, special requests, luggage details..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="rounded-2xl border border-rose-100 p-4" style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Full Booking Summary</p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Pickup</span>
                        <span className="text-zinc-700 font-medium text-right max-w-[65%] text-xs">{pickup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Drop-off</span>
                        <span className="text-zinc-700 font-medium text-right max-w-[65%] text-xs">{dropoff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Vehicle</span>
                        <span className="text-zinc-700 font-medium">{selectedVehicle?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Type</span>
                        <span className="text-zinc-700 font-medium">
                          {BOOKING_TYPES.find((b) => b.value === bookingType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Date</span>
                        <span className="text-zinc-700 font-medium">{date ? format(date, "dd MMM yyyy") : "-"}</span>
                      </div>
                      {isMultiDay && endDate && (
                        <div className="flex justify-between">
                          <span className="text-zinc-400">End Date</span>
                          <span className="text-zinc-700 font-medium">{format(endDate, "dd MMM yyyy")}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Time</span>
                        <span className="text-zinc-700 font-medium">{time || "-"}</span>
                      </div>
                      <div className="flex justify-between border-t border-rose-100 pt-1.5 mt-1.5">
                        <span className="text-zinc-400">Est. Price</span>
                        <span className="font-bold" style={{ color: "#b76e79" }}>{priceForType()}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="px-6 py-4 border-t border-rose-50 flex gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-rose-200 text-sm font-semibold text-rose-400 hover:bg-rose-50 transition-colors"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
                  disabled={
                    (step === 1 && !canStep1) ||
                    (step === 2 && !canStep2) ||
                    (step === 3 && !canStep3)
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: roseGold }}
                >
                  Continue
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!canStep4}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: roseGold }}
                >
                  <MessageCircle size={16} />
                  Send Booking via WhatsApp
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
