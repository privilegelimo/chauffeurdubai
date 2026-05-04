import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import ConditionalLayout from "@/components/ConditionalLayout"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#b76e79",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chauffeurdubai.ae"),
  title: "Luxury Chauffeur Service in Dubai, UAE | Chauffeur Dubai",
  description:
    "Book premium chauffeur service in Dubai. Professional drivers for airport transfers, corporate travel, and city tours. Luxury cars with chauffeur in Dubai, UAE.",
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
  authors:         [{ name: "Chauffeur Dubai" }],
  creator:         "Chauffeur Dubai",
  publisher:       "Chauffeur Dubai",
  formatDetection: { email: false, address: false, telephone: false },
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable:        true,
    statusBarStyle: "default",
    title:          "Chauffeur Dubai",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

        {/* PWA */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>

      <body className={inter.className}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PP63MWX7"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Ads */}
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

        {/* PWA Service Worker */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>

        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}