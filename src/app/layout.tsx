import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chauffeurdubai.ae"),
  title: {
    default: "Chauffeur Dubai | Luxury Chauffeur Service in Dubai, UAE",
    template: "%s | Chauffeur Dubai",
  },
  description:
    "Book premium chauffeur service in Dubai. Professional drivers for airport transfers, corporate travel, and city tours. Luxury cars with chauffeur available 24/7 in Dubai, UAE.",
  keywords: [
    "chauffeur service Dubai",
    "luxury chauffeur Dubai",
    "airport transfer Dubai",
    "car with driver Dubai",
    "chauffeur car hire Dubai",
    "private driver Dubai",
    "corporate chauffeur Dubai",
    "chauffeur driven car Dubai",
    "luxury car rental with driver Dubai",
    "VIP chauffeur Dubai",
    "chauffeur hire Dubai",
    "executive car service Dubai",
  ],
  authors: [{ name: "Chauffeur Dubai" }],
  creator: "Chauffeur Dubai",
  publisher: "Chauffeur Dubai",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://chauffeurdubai.ae",
    siteName: "Chauffeur Dubai",
    title: "Chauffeur Dubai | Luxury Chauffeur Service in Dubai, UAE",
    description:
      "Premium chauffeur service in Dubai for airport transfers, corporate travel & city tours. Professional drivers. 24/7 availability.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chauffeur Dubai - Luxury Car Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chauffeur Dubai | Luxury Chauffeur Service",
    description:
      "Book a luxury chauffeur in Dubai for airport transfers, corporate rides, and VIP travel.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://chauffeurdubai.ae",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
