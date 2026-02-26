"use client";

import { useState } from "react";
import { X, CheckCircle, CalendarCheck } from "lucide-react";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

type BookingButtonProps = {
  carName: string;
  carCategory: string;
  transferPrice: string;
  price5hr: string;
  price10hr: string;
  maxPassengers: number;
  variant?: "default" | "light";
};

type BookingType = "transfer" | "5hr" | "10hr";

export default function BookingButton({
  carName,
  carCategory,
  transferPrice,
  price5hr,
  price10hr,
  maxPassengers,
  variant = "default",
}: BookingButtonProps) {
  const [open, setOpen]               = useState(false);
  const [sent, setSent]               = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>("transfer");
  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [date, setDate]               = useState("");
  const [time, setTime]               = useState("");
  const [passengers, setPassengers]   = useState(1);
  const [pickup, setPickup]           = useState("");
  const [dropoff, setDropoff]         = useState("");
  const [notes, setNotes]             = useState("");

  function resetForm() {
    setBookingType("transfer");
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setPassengers(1);
    setPickup("");
    setDropoff("");
    setNotes("");
  }

  function handleClose() {
    setOpen(false);
    setSent(false);
    resetForm();
  }

  const priceLabel =
    bookingType === "transfer"
      ? transferPrice
      : bookingType === "5hr"
      ? price5hr
      : price10hr;

  const bookingTypeLabel =
    bookingType === "transfer"
      ? "Airport / Point-to-Point Transfer"
      : bookingType === "5hr"
      ? "5 Hour Package"
      : "10 Hour Package";

  function handleSend() {
    const msg = [
      `🚘 *New Booking Request*`,
      ``,
      `*Vehicle:* ${carName} (${carCategory})`,
      `*Booking Type:* ${bookingTypeLabel}`,
      `*Price:* ${priceLabel}`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Date:* ${date}`,
      `*Time:* ${time}`,
      `*Passengers:* ${passengers}`,
      `*Pickup:* ${pickup}`,
      bookingType === "transfer" ? `*Drop-off:* ${dropoff}` : "",
      notes ? `*Notes:* ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/971509200818?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setTimeout(() => setSent(true), 2500);
  }

  const isValid = name && phone && date && time && pickup;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 w-full text-white font-bold text-sm py-3.5 rounded-xl hover:opacity-90 transition-all"
        style={{ background: roseGoldGradient }}
      >
        <CalendarCheck size={16} />
        Book Now
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">

            {/* ── SUCCESS SCREEN ─────────────────────────────────── */}
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-bounce"
                  style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                >
                  <CheckCircle size={52} color="white" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                  Booking Sent!
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  Your booking request for the{" "}
                  <span className="font-semibold text-zinc-700">{carName}</span> has
                  been sent via WhatsApp. Our team will confirm within minutes.
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
                {/* Header */}
                <div className="p-5 text-white" style={{ background: roseGoldGradient }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-widest mb-0.5">
                        Booking Request
                      </p>
                      <h2 className="text-lg font-bold leading-tight">{carName}</h2>
                      <p className="text-white/70 text-xs mt-0.5">{carCategory}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-white/70 hover:text-white transition-colors mt-0.5"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">

                  {/* Booking Type */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                      Booking Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { key: "transfer", label: "Transfer", price: transferPrice },
                          { key: "5hr",      label: "5 Hours",  price: price5hr      },
                          { key: "10hr",     label: "10 Hours", price: price10hr     },
                        ] as { key: BookingType; label: string; price: string }[]
                      ).map(({ key, label, price }) => (
                        <button
                          key={key}
                          onClick={() => setBookingType(key)}
                          className={`rounded-xl p-2.5 text-center border transition-all ${
                            bookingType === key
                              ? "border-rose-300 text-white"
                              : "border-rose-100 text-zinc-600 hover:border-rose-200"
                          }`}
                          style={
                            bookingType === key
                              ? { background: roseGoldGradient }
                              : { background: "linear-gradient(135deg, #f9eded, #fdf4f0)" }
                          }
                        >
                          <p className="text-xs font-bold">{label}</p>
                          <p className="text-[10px] opacity-80 mt-0.5">{price}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 000 0000"
                        className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                      Passengers (max {maxPassengers})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={maxPassengers}
                      value={passengers}
                      onChange={(e) =>
                        setPassengers(Math.min(Number(e.target.value), maxPassengers))
                      }
                      className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                    />
                  </div>

                  {/* Pickup */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Hotel name, airport terminal, address…"
                      className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                    />
                  </div>

                  {/* Drop-off (transfer only) */}
                  {bookingType === "transfer" && (
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                        Drop-off Location
                      </label>
                      <input
                        type="text"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="Destination address…"
                        className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30"
                      />
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                      Special Requests
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Flight number, child seat, meet & greet…"
                      rows={2}
                      className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-zinc-800 focus:outline-none focus:border-rose-300 bg-rose-50/30 resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5">
                  <button
                    onClick={handleSend}
                    disabled={!isValid}
                    className="flex items-center justify-center gap-2 w-full text-white font-bold text-sm py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                    style={{ background: roseGoldGradient }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    Send Booking via WhatsApp
                  </button>
                  <p className="text-center text-[11px] text-zinc-400 mt-2">
                    Opens WhatsApp · Confirmed within minutes
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
