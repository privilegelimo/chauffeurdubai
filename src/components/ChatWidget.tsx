"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const WA_LINK = "https://wa.me/971509852818?text=Hi,%20I%20need%20a%20chauffeur%20service";
const CALL_LINK = "tel:+971509852818";

export default function ChatWidget() {
  const [showLabel, setShowLabel] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);

    // Show label after 5s
    const showTimer = setTimeout(() => setShowLabel(true), 5000);
    // Hide label after 10s (visible for 5s)
    const hideTimer = setTimeout(() => setShowLabel(false), 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {showPanel && (
        <div className="fixed inset-0 z-40" onClick={() => setShowPanel(false)} />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ── Expanded Panel ─────────────────────────────────────────── */}
        <div
          className={`
            transition-all duration-300 origin-bottom-right
            ${showPanel
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }
          `}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden w-72">

            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: roseGoldGradient }}
            >
              <div>
                <p className="text-white font-bold text-sm">Chauffeur Dubai</p>
                <p className="text-white/80 text-xs mt-0.5">How would you like to talk to us?</p>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Options */}
            <div className="p-4 space-y-3">

              {/* WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-green-100 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">WhatsApp</p>
                  <p className="text-zinc-400 text-xs">Chat with us instantly</p>
                </div>
              </a>

              {/* Call */}
              <a
                href={CALL_LINK}
                className="flex items-center gap-4 p-4 rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform"
                  style={{ background: roseGoldGradient }}
                >
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm">Call Us</p>
                  <p className="text-zinc-400 text-xs">+971 50 985 2818</p>
                </div>
              </a>

            </div>

            {/* Footer */}
            <div className="px-4 pb-4 text-center">
              <p className="text-zinc-300 text-xs">Available 24/7 · Replies instantly</p>
            </div>

          </div>
        </div>

        {/* ── FAB Row (label + button) ───────────────────────────────── */}
        <div className="flex items-center gap-3">

          {/* Label — appears after 5s, hides after 5s, hides when panel opens */}
          <div
            className={`
              transition-all duration-500
              ${showLabel && !showPanel
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-4 pointer-events-none"
              }
            `}
          >
            <div className="bg-white text-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-rose-100 whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              Live support
            </div>
          </div>

                    {/* Main FAB button */}
          <button
            onClick={() => {
              setShowPanel((p) => !p);
              setShowLabel(false);
            }}
            className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 relative bg-green-500"
            aria-label="Open chat"
          >
            {/* X icon when open */}
            <div className={`absolute transition-all duration-200 ${showPanel ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
              <X size={22} className="text-white" />
            </div>

            {/* WhatsApp icon when closed */}
            <div className={`absolute transition-all duration-200 ${showPanel ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            {!showPanel && (
              <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-400" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
