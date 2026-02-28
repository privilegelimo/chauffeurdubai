"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VehicleImageCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (images.length === 1) {
    return (
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={images[0]}
          alt={`${name} chauffeur hire Dubai Abu Dhabi Sharjah`}
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
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Images */}
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`${name} - image ${idx + 1}`}
            fill
            className="object-cover object-center"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(183,110,121,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background:
                idx === current
                  ? "linear-gradient(135deg, #b76e79, #e8a4a0)"
                  : "rgba(255,255,255,0.4)",
              transform: idx === current ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div className="absolute top-20 right-4 z-30 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
