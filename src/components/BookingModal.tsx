"use client";

import { useState } from "react";
import {
  X, Phone, User, Mail, Calendar, Clock,
  Users, ChevronDown, MessageCircle, MapPin, StickyNote,
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

type BookingType = "transfer" | "5hr" | "10hr" | "custom" | "weekly" | "monthly";

const bookingTypes: { value: BookingType; label: string; desc: string }[] = [
  { value: "transfer", label: "Airport Transfer", desc: "One-way or return transfer" },
  { value: "5hr",      label: "5 Hour Package",   desc: "Half day with chauffeur"    },
  { value: "10hr",     label: "10 Hour Package",  desc: "Full day with chauffeur"    },
  { value: "custom",   label: "Custom Hours",     desc: "Specify your own duration"  },
  { value: "weekly",   label: "Weekly Package",   desc: "7 days dedicated chauffeur" },
  { value: "monthly",  label: "Monthly Package",  desc: "Dedicated monthly driver"   },
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
  const [step, setStep] = useState<1 | 2>(1);
  const [bookingType, setBookingType] = useState<BookingType>("transfer");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    passengers: "1",
    pickup: "",
    dropoff: "",
    time: "",
    customHours: "",
    notes: "",
  });

  if (!isOpen) return null;

  // Ensure maxPassengers is a valid positive number, fallback to 4
  const seatCount = typeof maxPassengers === "number" && maxPassengers > 0
    ? maxPassengers
    : 4;

  const passengerOptions = Array.from({ length: seatCount }, (_, i) => i + 1);

  const priceMap: Record<BookingType, string> = {
    transfer: transferPrice,
    "5hr":    price5hr,
    "10hr":   price10hr,
    custom:   "Custom Rate",
    weekly:   "Contact for Rate",
    monthly:  "Contact for Rate",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const buildWhatsAppMessage = () => {
    const dateStr = selectedDate ? format(selectedDate, "dd MMM yyyy") : "Not specified";
    const endDateStr =
      (bookingType === "weekly" || bookingType === "monthly") && endDate
        ? format(endDate, "dd MMM yyyy")
        : null;

    return [
      `*New Booking Request — Chauffeur Dubai*`,
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
      endDateStr ? `End Date: ${endDateStr}` : null,
      form.time ? `Time: ${form.time}` : null,
      bookingType === "custom" && form.customHours
        ? `Duration: ${form.customHours} hours`
        : null,
      form.pickup  ? `Pickup: ${form.pickup}`   : null,
      form.dropoff ? `Drop-off: ${form.dropoff}` : null,
      form.notes   ? `\nNotes: ${form.notes}`    : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const encoded = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/971XXXXXXXXX?text=${encoded}`, "_blank");
  };

  const isMultiDay = bookingType === "weekly" || bookingType === "monthly";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
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

        {/* Step Indicator */}
        <div className="flex gap-2 px-6 pt-4">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ background: step >= s ? roseGoldGradient : "#f0e8e8" }}
            />
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-5">

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Booking Type
                </label>
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

              {/* Journey / Start Date */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  {isMultiDay ? "Start Date" : "Journey Date"}
                </label>
                <button
                  onClick={() => setShowCalendar((v) => !v)}
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

              {/* End Date */}
              {isMultiDay && (
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                    End Date
                  </label>
                  <button
                    onClick={() => setShowEndCalendar((v) => !v)}
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
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Pickup Time
                </label>
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

              {/* Custom Hours */}
              {bookingType === "custom" && (
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                    Number of Hours
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                    <input
                      type="number"
                      name="customHours"
                      placeholder="e.g. 6"
                      min="1"
                      max="24"
                      value={form.customHours}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+971 50 XXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Number of Passengers
                </label>
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
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Vehicle capacity:{" "}
                  <span className="font-semibold" style={{ color: "#b76e79" }}>
                    {seatCount} passenger{seatCount > 1 ? "s" : ""}
                  </span>
                </p>
              </div>

              {/* Pickup */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    type="text"
                    name="pickup"
                    placeholder="Hotel, address or landmark"
                    value={form.pickup}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300"
                  />
                </div>
              </div>

              {/* Drop-off */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Drop-off Location
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <input
                    type="text"
                    name="dropoff"
                    placeholder="Destination address"
                    value={form.dropoff}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-zinc-700 placeholder:text-zinc-300"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Additional Notes
                </label>
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
            </>
          )}
        </div>

        {/* Footer */}
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
              Send Enquiry
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
