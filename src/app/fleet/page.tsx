// src/app/fleet/page.tsx
import type { Metadata } from "next";
import FleetClient from "@/Components/FleetClient";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Fleet Dubai | Cars, SUVs, Vans & Buses UAE",
  description:
    "Browse luxury chauffeur fleet in Dubai, Abu Dhabi & Sharjah. Luxury Sedans, SUVs, vans, limousines & buses with professional drivers and premium services.",
  alternates: {
    canonical: "https://chauffeurdubai.ae/fleet",
  },
  openGraph: {
    title: "Luxury Chauffeur Fleet Dubai | Cars, SUVs, Vans & Buses UAE",
    description:
      "Browse luxury chauffeur fleet in Dubai, Abu Dhabi & Sharjah. Luxury Sedans, SUVs, vans, limousines & buses with professional drivers and premium services.",
    url: "https://chauffeurdubai.ae/fleet",
    type: "website",
    images: [{ url: "https://chauffeurdubai.ae/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Chauffeur Fleet Dubai | Cars, SUVs, Vans & Buses UAE",
    description: "Browse luxury chauffeur fleet in Dubai, Abu Dhabi & Sharjah.",
    images: ["https://chauffeurdubai.ae/og-image.jpg"],
  },
};

export default function FleetPage() {
  return <FleetClient />;
}