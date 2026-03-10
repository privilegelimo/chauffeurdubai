import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PP63MWX7');`}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP63MWX7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10996946200"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10996946200');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
