"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

interface BookingButtonProps {
  carName: string;
  carCategory: string;
  transferPrice: string;
  price5hr: string;
  price10hr: string;
  maxPassengers: number;
}

export default function BookingButton({
  carName,
  carCategory,
  transferPrice,
  price5hr,
  price10hr,
  maxPassengers,
}: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)",
        }}
      >
        Reserve Now
      </button>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        carName={carName}
        carCategory={carCategory}
        transferPrice={transferPrice}
        price5hr={price5hr}
        price10hr={price10hr}
        maxPassengers={maxPassengers}
      />
    </>
  );
}
