// components/QuickBookingForm.tsx
"use client";

import { useState } from "react";
import { MessageCircle, Phone, MapPin, User, X } from "lucide-react";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function QuickBookingForm({ isOpen, onClose, defaultFrom = "", defaultTo = "" }: Props) {
  const [form, setForm] = useState({
    name:    "",
    pickup:  defaultFrom,
    dropoff: defaultTo,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsApp = () => {
    const message =
      `Hi, I'd like to book a chauffeur service.%0A%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Pickup: ${encodeURIComponent(form.pickup)}%0A` +
      `Drop-off: ${encodeURIComponent(form.dropoff)}`;
    window.open(`https://wa.me/971509852818?text=${message}`, "_blank");
  };

  const isValid = form.name.trim() && form.pickup.trim() && form.dropoff.trim();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
          
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 transition-colors"
          >
            <X size={16} style={{ color: "#b76e79" }} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">Book Your Transfer</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Fill in your details and we&apos;ll confirm within minutes
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-4 mb-8">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Your Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#b76e79" }}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmed Al Mansouri"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>

            {/* Pickup */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#b76e79" }}
                />
                <input
                  type="text"
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  placeholder="e.g. Dubai Marina, Hotel, Airport"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>

            {/* Drop-off */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Drop-off Location
              </label>
              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
                  style={{ color: "#b76e79" }}
                />
                <input
                  type="text"
                  name="dropoff"
                  value={form.dropoff}
                  onChange={handleChange}
                  placeholder="e.g. Muscat, Abu Dhabi, DXB Airport"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                  style={{ background: roseGoldGradientSubtle }}
                />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-4 rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: roseGoldGradient }}
            >
              <MessageCircle size={18} />
              Send Enquiry via WhatsApp
            </button>

            <a
              href="tel:+971509852818"
              className="w-full flex items-center justify-center gap-2 border-2 font-bold text-sm py-4 rounded-full transition-all hover:bg-rose-50"
              style={{ borderColor: "#b76e79", color: "#b76e79" }}
            >
              <Phone size={18} />
              Call Us Directly — +971 50 985 2818
            </a>
          </div>

          <p className="text-center text-zinc-400 text-xs mt-5">
            We confirm all bookings within minutes, 24/7
          </p>
        </div>
      </div>
    </>
  );
}
