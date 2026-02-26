"use client";

import { useState } from "react";
import {
  X, Phone, User, Mail, Calendar, Clock,
  Users, ChevronDown, MessageCircle, MapPin, StickyNote, CheckCircle,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carCategory: string;
  transferPrice: string;
  price5hr: string;
  price10hr: string;
  maxPassengers: number;
}

type BookingType = "transfer" | "5hr" | "10hr" | "point" | "weekly" | "monthly";

const bookingTypes: { value: BookingType; label: string; desc: string }[] = [
  { value: "transfer", label: "Airport Transfer",  desc: "One-way or return transfer"  },
  { value: "5hr",      label: "5 Hour Package",    desc: "Half day with chauffeur"     },
  { value: "10hr",     label: "10 Hour Package",   desc: "Full day with chauffeur"     },
  { value: "point",    label: "Point to Point",    desc: "Custom route, fixed price"   },
  { value: "weekly",   label: "Weekly Package",    desc: "7 days dedicated chauffeur"  },
  { value: "monthly",  label: "Monthly Package",   desc: "Dedicated monthly driver"    },
];

export default function BookingModal({
  isOpen,
  onClose,
  carName,
  carCategory,
  transferPrice,
  price5hr,
  price10hr,
  maxPassengers,
}: BookingModalProps) {
  const [step, setStep]                       = useState<1 | 2>(1);
  const [sent, setSent]                       = useState(false);
  const [bookingType, setBookingType]         = useState<BookingType>("transfer");
  const [selectedDate, setSelectedDate]       = useState<Date | undefined>();
  const [endDate, setEndDate]                 = useState<Date | undefined>();
  const [showCalendar, setShowCalendar]       = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", passengers: "1",
    pickup: "", dropoff: "", time: "", notes: "",
  });

  if (!isOpen) return null;

  const seatCount = typeof maxPassengers === "number" && maxPassengers > 0 ? maxPassengers : 4;
  const passengerOptions = Array.from({ length: seatCount }, (_, i) => i + 1);

  const priceMap: Record<BookingType, string> = {
    transfer: transferPrice,
    "5hr":    price5hr,
    "10hr":   price10hr,
    point:    transferPrice,
    weekly:   "Contact for Rate",
    monthly:  "Contact for Rate",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isMultiDay = bookingType === "weekly" || bookingType === "monthly";

  const buildWhatsAppMessage = () => {
    const dateStr    = selectedDate ? format(selectedDate, "dd MMM yyyy") : "Not specified";
    const endDateStr = isMultiDay && endDate ? format(endDate, "dd MMM yyyy") : null;

    return [
      `*New Booking Request - Chauffeur Dubai*`,
      ``,
      `*Vehicle:* ${carName} (${carCategory})`,
      `*Booking Type:* ${bookingTypes.find((b) => b.value === bookingType)?.label}`,
      `*Price:* ${priceMap[bookingType]}`,
      ``,
      `*Client Details*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Passengers: ${form.passengers}`,
      ``,
      `*Journey Details*`,
      `Date: ${dateStr}`,
      endDateStr   ? `End Date: ${endDateStr}`   : null,
      form.time    ? `Time: ${form.time}`        : null,
      form.pickup  ? `Pickup: ${form.pickup}`    : null,
      form.dropoff ? `Drop-off: ${form.dropoff}` : null,
      form.notes   ? `\nNotes: ${form.notes}`    : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const encoded = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/971509200818?text=${encoded}`, "_blank");
    setTimeout(() => setSent(true), 2500);
  };

  const inputClass =
    "w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300";
  const labelClass =
    "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

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
              <span className="font-semibold text-zinc-700">{carName}</span> has
              been sent via WhatsApp. Our team will confirm your booking shortly.
            </p>

            <a
              href="/"
              className="w-full max-w-xs py-3 rounded-xl text-white text-sm font-bold text-center shadow-md hover:opacity-90 transition-opacity block"
              style={{ background: roseGoldGradient }}
            >
              Back to Home
            </a>
          </div>

        ) : (
          <>
            {/* ── HEADER ─────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-rose-50"
              style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-400">
                  Reserve This Vehicle
                </p>
                <h2 className="text-lg font-bold text-zinc-800">{carName}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <X size={16} className="text-zinc-400" />
              </button>
            </div>

            {/* ── STEP INDICATOR ─────────────────────────────── */}
            <div className="flex gap-2 px-6 pt-4">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{ background: step >= s ? roseGoldGradient : "#f0e8e8" }}
                />
              ))}
            </div>

            {/* ── SCROLLABLE BODY ────────────────────────────── */}
            <div className="overflow-y-auto flex-1 px-6 py-4 space-y-5">

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  {/* Booking Type */}
                  <div>
                    <label className={labelClass}>Booking Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {bookingTypes.map((bt) => (
                        <button
                          key={bt.value}
                          onClick={() => setBookingType(bt.value)}
                          className="text-left p-3 rounded-xl border-2 transition-all"
                          style={{
                            borderColor: bookingType === bt.value ? "#b76e79" : "#f0e8e8",
                            background:  bookingType === bt.value ? "#fdf2f4" : "white",
                          }}
                        >
                          <p
                            className="text-sm font-semibold"
                            style={{ color: bookingType === bt.value ? "#b76e79" : "#3f3f46" }}
                          >
                            {bt.label}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">{bt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Preview */}
                  <div
                    className="rounded-xl px-4 py-3 flex items-center justify-between"
                    style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}
                  >
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Estimated Price
                    </span>
                    <span className="font-bold text-base" style={{ color: "#b76e79" }}>
                      {priceMap[bookingType]}
                    </span>
                  </div>

                  {/* Start / Journey Date */}
                  <div>
                    <label className={labelClass}>
                      {isMultiDay ? "Start Date" : "Journey Date"}
                    </label>
                    <button
                      onClick={() => { setShowCalendar((v) => !v); setShowEndCalendar(false); }}
                      className="w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-xl border border-rose-100 text-sm bg-white"
                    >
                      <Calendar size={16} className="text-rose-300 shrink-0" />
                      <span className={selectedDate ? "text-zinc-700" : "text-zinc-400"}>
                        {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Select a date"}
                      </span>
                    </button>
                    {showCalendar && (
                      <div className="mt-2 rounded-2xl border border-rose-100 overflow-hidden">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={(d) => { setSelectedDate(d); setShowCalendar(false); }}
                          disabled={{ before: new Date() }}
                          className="!font-sans"
                        />
                      </div>
                    )}
                  </div>

                  {/* End Date — weekly/monthly only */}
                  {isMultiDay && (
                    <div>
                      <label className={labelClass}>End Date</label>
                      <button
                        onClick={() => { setShowEndCalendar((v) => !v); setShowCalendar(false); }}
                        className="w-full flex items-center gap-3 pl-3 pr-4 py-3 rounded-xl border border-rose-100 text-sm bg-white"
                      >
                        <Calendar size={16} className="text-rose-300 shrink-0" />
                        <span className={endDate ? "text-zinc-700" : "text-zinc-400"}>
                          {endDate ? format(endDate, "dd MMM yyyy") : "Select end date"}
                        </span>
                      </button>
                      {showEndCalendar && (
                        <div className="mt-2 rounded-2xl border border-rose-100 overflow-hidden">
                          <DayPicker
                            mode="single"
                            selected={endDate}
                            onSelect={(d) => { setEndDate(d); setShowEndCalendar(false); }}
                            disabled={{ before: selectedDate ?? new Date() }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pickup Time */}
                  <div>
                    <label className={labelClass}>Pickup Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="text" name="name" placeholder="Your full name"
                        value={form.name} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="tel" name="phone" placeholder="+971 50 XXX XXXX"
                        value={form.phone} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="email" name="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className={labelClass}>Number of Passengers</label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <select
                        name="passengers"
                        value={form.passengers}
                        onChange={handleChange}
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
                    <p className="text-xs text-zinc-400 mt-1.5">
                      Vehicle capacity:{" "}
                      <span className="font-semibold" style={{ color: "#b76e79" }}>
                        {seatCount} passenger{seatCount > 1 ? "s" : ""}
                      </span>
                    </p>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className={labelClass}>Pickup Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="text" name="pickup" placeholder="Hotel, address or landmark"
                        value={form.pickup} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Drop-off */}
                  <div>
                    <label className={labelClass}>Drop-off Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="text" name="dropoff" placeholder="Destination address"
                        value={form.dropoff} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={labelClass}>Additional Notes</label>
                    <div className="relative">
                      <StickyNote size={16} className="absolute left-3 top-3.5 text-rose-300" />
                      <textarea
                        name="notes"
                        placeholder="Special requests, flight number, luggage details..."
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div
                    className="rounded-2xl p-4 space-y-1.5 text-sm"
                    style={{ background: "linear-gradient(135deg, #fdf2f4, #fef9f5)" }}
                  >
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Booking Summary
                    </p>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Vehicle</span>
                      <span className="text-zinc-700 font-medium">{carName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Type</span>
                      <span className="text-zinc-700 font-medium">
                        {bookingTypes.find((b) => b.value === bookingType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Date</span>
                      <span className="text-zinc-700 font-medium">
                        {selectedDate ? format(selectedDate, "dd MMM yyyy") : "-"}
                      </span>
                    </div>
                    {isMultiDay && endDate && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">End Date</span>
                        <span className="text-zinc-700 font-medium">
                          {format(endDate, "dd MMM yyyy")}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Time</span>
                      <span className="text-zinc-700 font-medium">{form.time || "-"}</span>
                    </div>
                    <div className="flex justify-between border-t border-rose-100 pt-1.5 mt-1">
                      <span className="text-zinc-400">Est. Price</span>
                      <span className="font-bold" style={{ color: "#b76e79" }}>
                        {priceMap[bookingType]}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── FOOTER ─────────────────────────────────────── */}
            <div className="px-6 py-4 border-t border-rose-50 flex gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-rose-200 text-sm font-semibold text-rose-400 hover:bg-rose-50 transition-colors"
                >
                  Back
                </button>
              )}

              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
                  style={{ background: roseGoldGradient }}
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.phone}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: roseGoldGradient }}
                >
                  <MessageCircle size={16} />
                  Send Enquiry via WhatsApp
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
