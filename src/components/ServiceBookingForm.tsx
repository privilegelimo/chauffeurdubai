"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, Phone, CheckCircle,
  User, Calendar, Clock, Users, MapPin, StickyNote, Mail, Car, ChevronDown,
} from "lucide-react";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const vehicleSuggestions = [
  {
    slug: "first-class",
    label: "First Class",
    vehicles: [
      { name: "Mercedes S 500",  seats: 3 },
      { name: "BMW 7 Series",    seats: 3 },
    ],
    maxPassengers: 3,
    priceFrom: "AED 550",
  },
  {
    slug: "rolls-royce",
    label: "Rolls-Royce",
    vehicles: [
      { name: "Rolls-Royce Ghost",    seats: 4 },
      { name: "Rolls-Royce Cullinan", seats: 4 },
    ],
    maxPassengers: 4,
    priceFrom: "AED 2,500",
  },
  {
    slug: "business-class",
    label: "Business Class",
    vehicles: [
      { name: "Lexus ES 300",           seats: 3 },
      { name: "Audi A6",                seats: 3 },
      { name: "BYD Han EV",             seats: 3 },
      { name: "Citroën Space Tourer",   seats: 7 },
      { name: "Toyota Granvia",         seats: 7 },
    ],
    maxPassengers: 7,
    priceFrom: "AED 350",
  },
  {
    slug: "luxury-suv",
    label: "Luxury SUV",
    vehicles: [
      { name: "GMC Yukon Denali",         seats: 7 },
      { name: "Cadillac Escalade 7 Seater", seats: 7 },
      { name: "Range Rover Sport",        seats: 5 },
    ],
    maxPassengers: 7,
    priceFrom: "AED 350",
  },
  {
    slug: "business-van",
    label: "Business Van",
    vehicles: [
      { name: "Mercedes Vito Tourer", seats: 7 },
      { name: "V 300 Tiffany",        seats: 7 },
      { name: "VIP Trend 250",        seats: 7 },
    ],
    maxPassengers: 7,
    priceFrom: "AED 350",
  },
  {
    slug: "mercedes-sprinter-luxury-vip",
    label: "Sprinter Luxury VIP",
    vehicles: [
      { name: "Mercedes Sprinter Avant Garde VIP",      seats: 13 },
      { name: "Mercedes Sprinter Business Class VIP",   seats: 13 },
    ],
    maxPassengers: 13,
    priceFrom: "AED 1,000",
  },
  {
    slug: "stretch-limousine",
    label: "Stretch Limousine",
    vehicles: [
      { name: "GMC Yukon Limousine",      seats: 18 },
      { name: "GMC Yukon Diamond",        seats: 18 },
      { name: "Chevy Suburban Titanium",  seats: 18 },
      { name: "Chrysler Emerald",         seats: 18 },
    ],
    maxPassengers: 18,
    priceFrom: "AED 800",
  },
  {
    slug: "mercedes-sprinter-luxury-van",
    label: "Sprinter Luxury Van",
    vehicles: [
      { name: "Mercedes Sprinter Ultra Luxury Van", seats: 14 },
      { name: "Mercedes Sprinter 19 Seater",        seats: 19 },
    ],
    maxPassengers: 19,
    priceFrom: "AED 1,000",
  },
  {
    slug: "standard-bus",
    label: "Standard Bus",
    vehicles: [
      { name: "Toyota Coaster 21 Seater", seats: 21 },
      { name: "Toyota Hiace 11 Seater",   seats: 11 },
    ],
    maxPassengers: 21,
    priceFrom: "AED 350",
  },
  {
    slug: "luxury-coach-bus",
    label: "Luxury Coach Bus",
    vehicles: [
      { name: "35 Seater Luxury Coach", seats: 35 },
      { name: "50 Seater Luxury Coach", seats: 50 },
    ],
    maxPassengers: 50,
    priceFrom: "AED 650",
  },
];

type Props = {
  service: string;
  ctaLabel: string;
};

export default function ServiceBookingForm({ service, ctaLabel }: Props) {
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [email, setEmail]           = useState("");
  const [date, setDate]             = useState("");
  const [time, setTime]             = useState("");
  const [passengers, setPassengers] = useState(1);
  const [pickup, setPickup]         = useState("");
  const [dropoff, setDropoff]       = useState("");
  const [notes, setNotes]           = useState("");
  const [sent, setSent]             = useState(false);

  const [classOpen, setClassOpen]         = useState(false);
  const [vehicleOpen, setVehicleOpen]     = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof vehicleSuggestions[0] | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const classRef   = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (classRef.current && !classRef.current.contains(e.target as Node))
        setClassOpen(false);
      if (vehicleRef.current && !vehicleRef.current.contains(e.target as Node))
        setVehicleOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Classes whose maxPassengers >= selected passengers ─────────────────
  const compatibleClasses = vehicleSuggestions
    .filter((v) => v.maxPassengers >= passengers)
    .sort((a, b) => a.maxPassengers - b.maxPassengers);

  // ── Within the selected class, only show vehicles whose seats >= passengers
  const compatibleVehiclesInClass = selectedClass
    ? selectedClass.vehicles.filter((v) => v.seats >= passengers)
    : [];

  function handlePassengerChange(n: number) {
    setPassengers(n);
    if (selectedClass && selectedClass.maxPassengers < n) {
      setSelectedClass(null);
      setSelectedVehicle(null);
    } else if (selectedClass) {
      // Keep class but drop vehicle if it no longer fits
      const vehicleStillFits = selectedClass.vehicles.find(
        (v) => v.name === selectedVehicle && v.seats >= n
      );
      if (!vehicleStillFits) setSelectedVehicle(null);
    }
  }

  function handleSelectClass(v: typeof vehicleSuggestions[0]) {
    setSelectedClass(v);
    setSelectedVehicle(null);
    setClassOpen(false);
    setVehicleOpen(false);
  }

  function handleSelectVehicle(car: string) {
    setSelectedVehicle(car);
    setVehicleOpen(false);
  }

  function buildMessage() {
    return [
      `🚘 *New Booking Request - Chauffeur Dubai*`,
      ``,
      `*Service:* ${service}`,
      selectedClass
        ? `*Vehicle Class:* ${selectedClass.label} (from ${selectedClass.priceFrom})`
        : null,
      selectedVehicle
        ? `*Preferred Vehicle:* ${selectedVehicle}`
        : null,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email   ? `*Email:* ${email}`      : null,
      `*Passengers:* ${passengers}`,
      ``,
      `*Date:* ${date || "Not specified"}`,
      time    ? `*Time:* ${time}`        : null,
      pickup  ? `*Pickup:* ${pickup}`    : null,
      dropoff ? `*Drop-off:* ${dropoff}` : null,
      notes   ? `*Notes:* ${notes}`      : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !date || !pickup) return;
    const url = `https://wa.me/971509852818?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
    setTimeout(() => setSent(true), 2500);
  }

  function resetForm() {
    setName(""); setPhone(""); setEmail(""); setDate("");
    setTime(""); setPassengers(1); setPickup("");
    setDropoff(""); setNotes(""); setSent(false);
    setSelectedClass(null); setSelectedVehicle(null);
    setClassOpen(false); setVehicleOpen(false);
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm rounded-xl border border-rose-100 bg-rose-50/30 text-zinc-700 " +
    "placeholder:text-zinc-300 focus:outline-none focus:border-rose-300 focus:ring-2 " +
    "focus:ring-rose-100 transition-all";
  const labelClass =
    "block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5";

  // ── SUCCESS SCREEN ────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          />
          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          >
            <CheckCircle size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <p className="font-bold text-zinc-900 text-base mb-1">Booking Sent!</p>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-[220px]">
            Your request has been sent via WhatsApp. Our team will confirm within minutes.
          </p>
        </div>
        <a
          href={`https://wa.me/971509852818?text=${encodeURIComponent(buildMessage())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm py-3 rounded-xl transition-all"
        >
          <MessageCircle size={15} />
          Open WhatsApp
        </a>
        <a
          href="tel:+971509852818"
          className="w-full flex items-center justify-center gap-2 border-2 border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm py-2.5 rounded-xl transition-all"
        >
          <Phone size={15} />
          Call to Confirm
        </a>
        <button
          onClick={resetForm}
          className="text-xs text-zinc-400 hover:text-zinc-600 underline underline-offset-2 transition-colors"
        >
          Start a new booking
        </button>
      </div>
    );
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">

      {/* Name + Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Name *</label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
            <input
              type="text" required placeholder="John Smith"
              value={name} onChange={(e) => setName(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
            <input
              type="tel" required placeholder="+971 50 000 0000"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email (optional)</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
          <input
            type="email" placeholder="your@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className={`${inputClass} pl-8`}
          />
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Date *</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
            <input
              type="date" required
              value={date} min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Time *</label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
            <input
              type="time" required
              value={time} onChange={(e) => setTime(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div>
        <label className={labelClass}>Number of Passengers</label>
        <div className="relative">
          <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
          <select
            value={passengers}
            onChange={(e) => handlePassengerChange(Number(e.target.value))}
            className={`${inputClass} pl-8 appearance-none`}
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} passenger{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── VEHICLE CLASS DROPDOWN ─────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>
          <span className="flex items-center gap-1.5">
            <Car size={12} style={{ color: "#b76e79" }} />
            Vehicle Class (optional)
          </span>
        </label>

        {compatibleClasses.length === 0 ? (
          <div className="text-xs text-zinc-500 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 leading-relaxed">
            For groups over 50 please{" "}
            <a href="tel:+971509852818" className="font-semibold underline" style={{ color: "#b76e79" }}>
              call us
            </a>{" "}
            or{" "}
            <a href="https://wa.me/971509852818" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: "#b76e79" }}>
              WhatsApp
            </a>{" "}
            for a custom quote.
          </div>
        ) : (
          <div ref={classRef} className="relative">
            <button
              type="button"
              onClick={() => { setClassOpen((o) => !o); setVehicleOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all"
              style={{
                borderColor: classOpen || selectedClass ? "#b76e79" : "#f0e0e0",
                background:  selectedClass
                  ? "linear-gradient(135deg, #fdf2f4, #fef9f5)"
                  : "white",
              }}
            >
              <span className={selectedClass ? "font-semibold text-zinc-800" : "text-zinc-300"}>
                {selectedClass
                  ? `${selectedClass.label} — from ${selectedClass.priceFrom}`
                  : "Select a vehicle class…"}
              </span>
              <ChevronDown
                size={15}
                className="shrink-0 text-zinc-400 transition-transform duration-200"
                style={{ transform: classOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {classOpen && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-rose-100 rounded-2xl shadow-xl overflow-hidden">
                <div className="max-h-56 overflow-y-auto">
                  {compatibleClasses.map((v) => {
                    const isActive = selectedClass?.slug === v.slug;
                    return (
                      <button
                        key={v.slug}
                        type="button"
                        onClick={() => handleSelectClass(v)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-rose-50 transition-colors border-b border-rose-50 last:border-0"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, #fdf2f4, #fef9f5)"
                            : undefined,
                        }}
                      >
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: isActive ? "#b76e79" : "#3f3f46" }}
                          >
                            {v.label}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Up to {v.maxPassengers} pax
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold" style={{ color: "#b76e79" }}>
                            {v.priceFrom}
                          </p>
                          {isActive && (
                            <p className="text-[10px] text-rose-300 mt-0.5">✓ Selected</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── SPECIFIC VEHICLE DROPDOWN ─────────────────────────────────────── */}
      {selectedClass && compatibleVehiclesInClass.length > 0 && (
        <div>
          <label className={labelClass}>Preferred Vehicle (optional)</label>
          <div ref={vehicleRef} className="relative">
            <button
              type="button"
              onClick={() => { setVehicleOpen((o) => !o); setClassOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all"
              style={{
                borderColor: vehicleOpen || selectedVehicle ? "#b76e79" : "#f0e0e0",
                background:  selectedVehicle
                  ? "linear-gradient(135deg, #fdf2f4, #fef9f5)"
                  : "white",
              }}
            >
              <span className={selectedVehicle ? "font-semibold text-zinc-800" : "text-zinc-300"}>
                {selectedVehicle ?? "Any available vehicle…"}
              </span>
              <ChevronDown
                size={15}
                className="shrink-0 text-zinc-400 transition-transform duration-200"
                style={{ transform: vehicleOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {vehicleOpen && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-rose-100 rounded-2xl shadow-xl overflow-hidden">
                {/* "Any" option */}
                <button
                  type="button"
                  onClick={() => { setSelectedVehicle(null); setVehicleOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-zinc-400 hover:bg-rose-50 border-b border-rose-50 transition-colors italic"
                >
                  Any available vehicle
                </button>
                {/* Only vehicles whose seats >= passengers */}
                {compatibleVehiclesInClass.map((car) => {
                  const isActive = selectedVehicle === car.name;
                  return (
                    <button
                      key={car.name}
                      type="button"
                      onClick={() => handleSelectVehicle(car.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-rose-50 transition-colors border-b border-rose-50 last:border-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #fdf2f4, #fef9f5)"
                          : undefined,
                      }}
                    >
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: isActive ? "#b76e79" : "#3f3f46" }}
                        >
                          {car.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {car.seats} seats
                        </p>
                      </div>
                      {isActive && (
                        <span className="text-xs font-bold" style={{ color: "#b76e79" }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pickup */}
      <div>
        <label className={labelClass}>Pickup Location *</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
          <input
            type="text" required placeholder="Hotel, airport terminal, address…"
            value={pickup} onChange={(e) => setPickup(e.target.value)}
            className={`${inputClass} pl-8`}
          />
        </div>
      </div>

      {/* Drop-off */}
      <div>
        <label className={labelClass}>Drop-off Location</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
          <input
            type="text" placeholder="Destination address…"
            value={dropoff} onChange={(e) => setDropoff(e.target.value)}
            className={`${inputClass} pl-8`}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Special Requests</label>
        <div className="relative">
          <StickyNote size={14} className="absolute left-3 top-3 text-rose-300" />
          <textarea
            rows={2}
            placeholder="Flight number, child seat, meet & greet, luggage details…"
            value={notes} onChange={(e) => setNotes(e.target.value)}
            className={`${inputClass} pl-8 resize-none`}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!name || !phone || !date || !pickup}
        className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: roseGoldGradient }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        {ctaLabel}
      </button>

      <p className="text-center text-[11px] text-zinc-400">
        Opens WhatsApp · Confirmed within minutes
      </p>
    </form>
  );
}
