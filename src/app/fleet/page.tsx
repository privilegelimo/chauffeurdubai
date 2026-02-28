"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Users, Luggage, ChevronRight, Phone,
  MessageCircle, ChevronDown, Check,
} from "lucide-react";
import allVehiclesData from "@/data/vehicles.json";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

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
  desc: string;
  features: string[];
  specs: { label: string; value: string }[];
};

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
  "luxury-coach-bus":             "Luxury Coach Bus",
};

const CLASS_ORDER = [
  "business-class",
  "first-class",
  "business-van",
  "mercedes-sprinter-luxury-van",
  "mercedes-sprinter-luxury-vip",
  "luxury-suv",
  "rolls-royce",
  "stretch-limousine",
  "standard-bus",
  "luxury-coach-bus",
];

const allVehicles = allVehiclesData as Vehicle[];

const grouped = CLASS_ORDER.reduce<Record<string, Vehicle[]>>((acc, cls) => {
  const vehicles = allVehicles.filter((v) => v.classSlug === cls);
  if (vehicles.length > 0) acc[cls] = vehicles;
  return acc;
}, {});

const availableClasses = CLASS_ORDER.filter((c) => grouped[c]);

export default function FleetPage() {
  const [open, setOpen]               = useState(false);
  const [activeClass, setActiveClass] = useState<string | null>(null);

  const handleSelect = (cls: string) => {
    setActiveClass(cls);
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(cls);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleClear = () => {
    setActiveClass(null);
    setOpen(false);
  };

  const visibleClasses = activeClass ? [activeClass] : availableClasses;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1600&q=85"
          alt="Luxury chauffeur fleet Dubai Abu Dhabi Sharjah UAE"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(183,110,121,0.4) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#e8a4a0" }}
          >
            Chauffeur Dubai Luxury Travel
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8a4a0, #f0c4a0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Luxury Fleet
            </span>{" "}
            in Dubai, Abu Dhabi & Sharjah
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            From executive sedans and luxury SUVs to Rolls-Royce, stretch
            limousines and luxury coaches — every vehicle comes with a
            professional chauffeur, fixed pricing and 24/7 availability
            across Dubai, Abu Dhabi, and Sharjah.
          </p>
        </div>
      </section>

      {/* ── STATS + FILTER BAR ────────────────────────────────────────── */}
      <div
        className="py-8 px-4 sm:px-6 lg:px-8 border-b border-rose-100"
        style={{ background: roseGoldGradientSubtle }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 text-center mb-8">
            {[
              { value: `${allVehicles.length}+`, label: "Vehicles Available"       },
              { value: `${availableClasses.length}`,  label: "Fleet Classes"        },
              { value: "24/7",                         label: "UAE-Wide Availability" },
              { value: "AED 350",                      label: "Starting From"        },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold" style={{ color: "#b76e79" }}>{value}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-rose-200 mb-6" />

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0">
              <p className="text-sm font-bold text-zinc-700">Filter by Fleet Class</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {activeClass
                  ? `Showing: ${CLASS_LABELS[activeClass]} — ${grouped[activeClass]?.length} vehicle${grouped[activeClass]?.length > 1 ? "s" : ""}`
                  : `Showing all ${allVehicles.length} vehicles across ${availableClasses.length} classes`}
              </p>
            </div>

            <div className="sm:ml-auto flex items-center gap-3">
              {activeClass && (
                <button
                  onClick={handleClear}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-600 underline underline-offset-2 transition-colors whitespace-nowrap"
                >
                  Clear filter
                </button>
              )}

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl border-2 bg-white text-sm font-bold transition-all min-w-[220px]"
                  style={{
                    borderColor: activeClass ? "#b76e79" : "#f3d5d5",
                    color:       activeClass ? "#b76e79" : "#52525b",
                  }}
                >
                  <span>
                    {activeClass ? CLASS_LABELS[activeClass] : "All Fleet Classes"}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color:     activeClass ? "#b76e79" : "#d4a0a0",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Dropdown List */}
                {open && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl border border-rose-100 shadow-2xl overflow-hidden z-50">

                    {/* All option */}
                    <button
                      onClick={handleClear}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between gap-2 transition-all ${
                        !activeClass
                          ? "font-bold text-white"
                          : "font-medium text-zinc-600 hover:bg-rose-50"
                      }`}
                      style={!activeClass ? { background: roseGoldGradient } : {}}
                    >
                      <span className="flex items-center gap-2">
                        All Fleet Classes
                        <span className="text-xs opacity-70">({allVehicles.length})</span>
                      </span>
                      {!activeClass && <Check size={14} className="text-white shrink-0" />}
                    </button>

                    <div className="border-t border-rose-100" />

                    {availableClasses.map((cls, i) => (
                      <button
                        key={cls}
                        onClick={() => handleSelect(cls)}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between gap-2 transition-all ${
                          activeClass === cls
                            ? "font-bold text-white"
                            : "font-medium text-zinc-600 hover:bg-rose-50"
                        } ${i !== 0 ? "border-t border-rose-50" : ""}`}
                        style={activeClass === cls ? { background: roseGoldGradient } : {}}
                      >
                        <span className="flex items-center gap-2">
                          {CLASS_LABELS[cls] ?? cls}
                          <span className="text-xs opacity-70">
                            ({grouped[cls].length})
                          </span>
                        </span>
                        {activeClass === cls && <Check size={14} className="text-white shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Click outside to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      {/* ── FLEET BY CLASS ────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto space-y-20">
          {visibleClasses.map((cls) => (
            <div key={cls} id={cls}>

              {/* Class Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "#b76e79" }}
                  >
                    {grouped[cls].length} vehicle{grouped[cls].length > 1 ? "s" : ""} — Dubai, Abu Dhabi & Sharjah
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                    {CLASS_LABELS[cls] ?? cls}
                  </h2>
                </div>
                <Link
                  href={`/fleet/${cls}`}
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity shrink-0"
                  style={{ color: "#b76e79" }}
                >
                  View All
                  <ChevronRight size={15} />
                </Link>
              </div>

              {/* Vehicle Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[cls].map((vehicle) => (
                  <div
                    key={vehicle.slug}
                    className="bg-white rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.name} chauffeur hire Dubai Abu Dhabi Sharjah`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: roseGoldGradient }}
                        >
                          {vehicle.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white/70 text-[10px] uppercase tracking-wider">
                          Transfer from
                        </p>
                        <p className="text-white font-bold text-lg leading-tight">
                          {vehicle.transferPrice}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-zinc-900 text-base mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-2">
                        {vehicle.desc}
                      </p>

                      {/* Pax & Luggage */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Users size={13} style={{ color: "#b76e79" }} />
                          Up to {vehicle.passengers} passengers
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Luggage size={13} style={{ color: "#b76e79" }} />
                          {vehicle.luggage} bags
                        </div>
                      </div>

                      {/* Pricing Row */}
                      <div
                        className="rounded-xl p-3 mb-4 grid grid-cols-3 gap-2 text-center text-xs"
                        style={{ background: roseGoldGradientSubtle }}
                      >
                        <div>
                          <p className="text-zinc-400 text-[10px] uppercase tracking-wider">Transfer</p>
                          <p className="font-bold text-zinc-800 mt-0.5">{vehicle.transferPrice}</p>
                        </div>
                        <div className="border-x border-rose-100">
                          <p className="text-zinc-400 text-[10px] uppercase tracking-wider">5 Hours</p>
                          <p className="font-bold text-zinc-800 mt-0.5">
                            {vehicle.price5hr.replace(" / 5 Hr", "")}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-400 text-[10px] uppercase tracking-wider">10 Hours</p>
                          <p className="font-bold text-zinc-800 mt-0.5">
                            {vehicle.price10hr.replace(" / 10 Hr", "")}
                          </p>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/fleet/${vehicle.classSlug}/${vehicle.slug}`}
                          className="flex-1 flex items-center justify-center gap-1.5 text-white font-bold text-xs py-2.5 rounded-xl hover:opacity-90 transition-all"
                          style={{ background: roseGoldGradient }}
                        >
                          <ChevronRight size={13} />
                          View & Book
                        </Link>
                        <a
                          href={`https://wa.me/971509852818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}%20in%20Dubai`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-500 hover:bg-green-600 transition-colors shrink-0"
                        >
                          <MessageCircle size={15} className="text-white" />
                        </a>
                        <a
                          href="tel:+971509852818"
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-rose-200 text-rose-400 hover:bg-rose-50 transition-colors shrink-0"
                        >
                          <Phone size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile — View Class link */}
              <div className="mt-6 sm:hidden text-center">
                <Link
                  href={`/fleet/${cls}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "#b76e79" }}
                >
                  View all {CLASS_LABELS[cls]} vehicles
                  <ChevronRight size={15} />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Not Sure Which Vehicle to Choose?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Our team is available 24/7 to recommend the perfect vehicle for your
          journey across Dubai, Abu Dhabi, and Sharjah — whatever your group size or occasion.
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
