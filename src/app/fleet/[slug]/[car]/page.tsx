import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserRound, Luggage, CheckCircle, Phone, MessageCircle, Star } from "lucide-react";
import BookingButton from "@/components/BookingButton";

const roseGoldGradient       = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";
const roseGoldGradientSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)";

const allVehicles = [

  // ── Business Class ──────────────────────────────────────────────────────
  {
    slug: "lexus-es300",
    classSlug: "business-class",
    name: "Lexus ES 300",
    category: "Executive Saloon / Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85"],
    metaDesc: "Book a Lexus ES 300 with professional chauffeur in Dubai. Hybrid executive sedan for airport transfers, corporate travel and city tours. Available 24/7.",
    seoKeywords: "Lexus ES300 chauffeur Dubai, hybrid luxury car Dubai, executive sedan hire Dubai, business class car with driver Dubai, airport transfer Dubai sedan",
    desc: "The Lexus ES 300h combines refined luxury with exceptional fuel efficiency, offering a serene and sophisticated ride for business travellers across Dubai.",
    longDesc: "Looking for a business class chauffeur in Dubai? The Lexus ES 300 is one of the most popular executive sedans for corporate airport transfers, hotel pickups and city tours across Dubai and Abu Dhabi. Book your Lexus ES 300 with driver and enjoy a seamless, stress-free journey - available 24/7 with no hidden fees.",
    features: [
      "Heated & ventilated leather seats",
      "Mark Levinson premium sound system",
      "12.3-inch touchscreen infotainment",
      "Wireless charging pad",
      "Lexus Safety System+",
      "Professional uniformed chauffeur",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "Business Class" },
      { label: "Fuel Type",    value: "Hybrid"         },
      { label: "Transmission", value: "Automatic"      },
      { label: "A/C",          value: "Dual Zone"      },
    ],
    faq: [
      { q: "Is the Lexus ES 300 a good car for corporate travel in Dubai?", a: "Yes - the Lexus ES 300h is one of Dubai's most popular business class chauffeur cars, offering a quiet hybrid ride ideal for executives and business travellers." },
      { q: "Can I book a Lexus ES 300 with driver for an airport pickup in Dubai?", a: "Absolutely. We offer 24/7 Lexus ES 300 airport transfers across Dubai International Airport (DXB), Al Maktoum Airport (DWC) and all Dubai hotels." },
      { q: "What is included with the Lexus ES 300 chauffeur hire in Dubai?", a: "All bookings include a professional uniformed chauffeur, complimentary water, real-time flight tracking and meet & greet for airport transfers." },
    ],
  },
  {
    slug: "audi-a6",
    classSlug: "business-class",
    name: "Audi A6",
    category: "Executive Saloon / Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85"],
    metaDesc: "Hire an Audi A6 with professional chauffeur in Dubai. German executive saloon for airport transfers, corporate meetings and business travel across Dubai and UAE.",
    seoKeywords: "Audi A6 chauffeur Dubai, Audi with driver Dubai, executive car hire Dubai, business chauffeur Dubai, luxury sedan airport transfer Dubai",
    desc: "The Audi A6 is a masterpiece of German engineering - sleek, sporty and supremely comfortable for business travel across Dubai and the UAE.",
    longDesc: "Hiring an Audi A6 with a professional chauffeur in Dubai gives you the perfect blend of German precision and executive comfort for corporate meetings, airport transfers and business events. Our Audi A6 chauffeur service operates 24/7 across Dubai, Sharjah and Abu Dhabi - fixed price, no surprises.",
    features: [
      "Valcona leather sports seats",
      "Bang & Olufsen 3D Premium Sound",
      "Audi Virtual Cockpit Plus",
      "Panoramic sunroof",
      "Audi Pre Sense safety suite",
      "Professional uniformed chauffeur",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "Business Class" },
      { label: "Fuel Type",    value: "Petrol/Diesel"  },
      { label: "Transmission", value: "Automatic 7G"   },
      { label: "A/C",          value: "3-Zone Climate" },
    ],
    faq: [
      { q: "Is the Audi A6 available for corporate hire in Dubai?", a: "Yes - the Audi A6 is a top choice for corporate chauffeur hire in Dubai, combining German engineering with executive comfort for business travel." },
      { q: "Can I book an Audi A6 with driver for a Dubai airport transfer?", a: "Yes, we offer 24/7 Audi A6 airport transfers from DXB, DWC and all major Dubai hotels at a fixed price with no hidden charges." },
      { q: "What is included in the Audi A6 chauffeur service in Dubai?", a: "All bookings include a professional uniformed chauffeur, complimentary water, real-time flight tracking and meet & greet for airport arrivals." },
    ],
  },
  {
    slug: "byd-han",
    classSlug: "business-class",
    name: "BYD Han EV",
    category: "Executive Electric Sedan",
    passengers: 3, luggage: 3,
    transferPrice: "AED 350", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85"],
    metaDesc: "Book a BYD Han EV electric chauffeur in Dubai. Premium all-electric executive sedan with professional driver for airport transfers and corporate travel.",
    seoKeywords: "BYD Han EV chauffeur Dubai, electric luxury car Dubai, eco chauffeur Dubai, sustainable car hire Dubai, electric executive sedan Dubai",
    desc: "The BYD Han EV is a premium all-electric sedan blending cutting-edge technology with executive comfort - ideal for the eco-conscious traveller in Dubai.",
    longDesc: "Our BYD Han EV chauffeur service in Dubai is perfect for travellers who want a green luxury car with a professional driver. Zero emissions, zero compromise - book this electric executive sedan for airport transfers and corporate travel across Dubai, available 24/7.",
    features: [
      "Nappa leather seating throughout",
      "DiLink 4.0 smart infotainment system",
      "360-degree HD camera",
      "Zero emissions - fully electric",
      "Rapid DC fast-charging capability",
      "Professional uniformed chauffeur",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "Business Class" },
      { label: "Fuel Type",    value: "Electric"       },
      { label: "Transmission", value: "Automatic"      },
      { label: "A/C",          value: "Dual Zone"      },
    ],
    faq: [
      { q: "Can I book an electric chauffeur car in Dubai?", a: "Yes - our BYD Han EV chauffeur service offers a fully electric luxury sedan with a professional driver in Dubai, available 24/7." },
      { q: "Is the BYD Han a good luxury car for Dubai airport transfers?", a: "Absolutely. The BYD Han EV delivers premium executive comfort with zero emissions - a popular choice for eco-conscious business travellers and airport transfers in Dubai." },
      { q: "What is included with the BYD Han EV chauffeur hire in Dubai?", a: "All bookings include a professional uniformed chauffeur, complimentary water and real-time flight tracking for airport transfers." },
    ],
  },
  {
    slug: "citroen-space-tourer",
    classSlug: "business-class",
    name: "Citroën Space Tourer 7 Pax",
    category: "Executive MPV / 7 Seater",
    passengers: 7, luggage: 5,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85"],
    metaDesc: "Hire a Citroën Space Tourer 7 seater with chauffeur in Dubai. Ideal for group airport transfers, family travel and sightseeing across Dubai and UAE.",
    seoKeywords: "7 seater chauffeur Dubai, Citroen Space Tourer hire Dubai, group transfer Dubai, MPV with driver Dubai, family airport transfer Dubai",
    desc: "The Citroën Space Tourer offers flexible, comfortable seating for up to 7 passengers - the ideal choice for family or group airport transfers and sightseeing across Dubai.",
    longDesc: "Need a 7 seater chauffeur in Dubai for a group airport transfer or family tour? The Citroën Space Tourer seats 7 passengers comfortably with ample luggage space - one of the most popular group chauffeur options for families and corporate teams travelling across Dubai and the UAE.",
    features: [
      "Modular 7-seat layout",
      "Large panoramic glass roof",
      "USB charging points throughout",
      "Hands-free electric sliding doors",
      "Rear climate control vents",
      "Professional uniformed chauffeur",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"       },
      { label: "Luggage",      value: "5 bags"         },
      { label: "Class",        value: "Business Class" },
      { label: "Fuel Type",    value: "Diesel"         },
      { label: "Transmission", value: "Automatic"      },
      { label: "A/C",          value: "Dual Zone"      },
    ],
    faq: [
      { q: "Can I book a 7 seater chauffeur in Dubai for a group airport transfer?", a: "Yes - the Citroën Space Tourer seats up to 7 passengers with luggage, making it ideal for group airport transfers in Dubai." },
      { q: "Is the Citroën Space Tourer good for family travel in Dubai?", a: "Absolutely. With a modular layout, panoramic roof and sliding doors, it's one of the best family chauffeur cars available in Dubai." },
      { q: "Do you offer group chauffeur hire in Dubai for sightseeing?", a: "Yes - we offer full-day and half-day group chauffeur tours across Dubai, including sightseeing, shopping and city tours in 7 seater vehicles." },
    ],
  },
  {
    slug: "toyota-granvia",
    classSlug: "business-class",
    name: "Toyota Granvia Van 7 Pax",
    category: "Premium MPV / 7 Seater",
    passengers: 7, luggage: 6,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85"],
    metaDesc: "Book a Toyota Granvia 7 seater with chauffeur in Dubai. Premium captain-chair MPV for group airport transfers, family travel and tours across Dubai.",
    seoKeywords: "Toyota Granvia chauffeur Dubai, 7 seater van hire Dubai, premium MPV Dubai, group airport transfer Dubai, family chauffeur car Dubai",
    desc: "The Toyota Granvia is a premium 7-seater MPV with captain chairs, delivering outstanding comfort and space for families and groups across Dubai.",
    longDesc: "The Toyota Granvia is one of Dubai's most in-demand 7 seater chauffeur vehicles - with individual captain chairs, power sliding doors and generous luggage space. Perfect for group airport transfers, hotel pickups and family tours across Dubai, Sharjah and Abu Dhabi.",
    features: [
      "Individual captain chair seating",
      "Power sliding rear doors",
      "Rear multi-zone climate control",
      "Roof ventilation windows",
      "JBL premium audio system",
      "Professional uniformed chauffeur",
      "Complimentary bottled water",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"       },
      { label: "Luggage",      value: "6 bags"         },
      { label: "Class",        value: "Business Class" },
      { label: "Fuel Type",    value: "Diesel"         },
      { label: "Transmission", value: "Automatic"      },
      { label: "A/C",          value: "Multi-Zone"     },
    ],
    faq: [
      { q: "Is the Toyota Granvia suitable for large families in Dubai?", a: "Yes - with 7 captain chairs, power sliding doors and space for 6 bags, the Toyota Granvia is ideal for families and groups travelling across Dubai." },
      { q: "Can I hire a Toyota Granvia with driver for a Dubai tour?", a: "Absolutely - we offer half-day and full-day Toyota Granvia chauffeur tours across Dubai for groups of up to 7 passengers." },
      { q: "Is the Toyota Granvia available for airport transfers in Dubai?", a: "Yes - we offer 24/7 Toyota Granvia airport transfers from DXB and DWC with meet & greet and flight tracking included." },
    ],
  },

  // ── First Class ─────────────────────────────────────────────────────────
  {
    slug: "mercedes-s500",
    classSlug: "first-class",
    name: "Mercedes S 500",
    category: "Executive VIP / First Class",
    passengers: 3, luggage: 3,
    transferPrice: "AED 900", price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,700 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=85"],
    metaDesc: "Book a Mercedes S500 with chauffeur in Dubai. First-class VIP luxury sedan for airport pick-up, corporate travel and special occasions across Dubai.",
    seoKeywords: "Mercedes S500 chauffeur Dubai, Mercedes S Class hire Dubai, VIP airport transfer Dubai, first class chauffeur Dubai, luxury sedan with driver Dubai",
    desc: "The Mercedes S 500 is the undisputed pinnacle of luxury motoring - a rolling sanctuary of refinement, technology and prestige for Dubai's most discerning travellers.",
    longDesc: "When only the very best will do, the Mercedes S500 chauffeur service in Dubai delivers an unrivalled first-class experience. Favoured by executives, dignitaries and VIP guests, this is the most prestigious airport transfer car in Dubai - white-glove meet & greet and champagne service included.",
    features: [
      "First-class rear cabin with reclining seats",
      "ENERGIZING massage and wellness system",
      "Burmester® 4D high-end surround sound",
      "Augmented reality Head-Up Display",
      "Rear-axle steering for city manoeuvring",
      "Champagne service and premium refreshments",
      "White-glove meet & greet included",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "First Class"    },
      { label: "Fuel Type",    value: "Petrol V8"      },
      { label: "Transmission", value: "Automatic 9G"   },
      { label: "A/C",          value: "4-Zone Climate" },
    ],
    faq: [
      { q: "Is the Mercedes S Class the best chauffeur car in Dubai?", a: "The Mercedes S500 is consistently ranked the top first-class chauffeur car in Dubai - chosen by executives, celebrities and diplomats for its unmatched cabin refinement." },
      { q: "Does the Mercedes S500 chauffeur service include meet & greet?", a: "Yes - all our Mercedes S500 airport transfers in Dubai include a white-glove meet & greet service with name board and luggage assistance." },
      { q: "Is the Mercedes S500 available for corporate events in Dubai?", a: "Absolutely - the Mercedes S500 is available for corporate chauffeur hire, VIP airport transfers and special occasions across Dubai, 24/7." },
    ],
  },
  {
    slug: "bmw-7-series",
    classSlug: "first-class",
    name: "BMW 7 Series",
    category: "Executive Saloon / First Class",
    passengers: 3, luggage: 3,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85"],
    metaDesc: "Hire a BMW 7 Series with chauffeur in Dubai. First-class executive saloon with Sky Lounge roof and Bowers & Wilkins sound for VIP travel across Dubai.",
    seoKeywords: "BMW 7 Series chauffeur Dubai, BMW 7 Series with driver Dubai, first class car hire Dubai, VIP executive chauffeur Dubai, luxury airport transfer Dubai",
    desc: "The BMW 7 Series redefines first-class travel in Dubai - with an opulent rear cabin, Sky Lounge panoramic roof, and effortless V8 performance.",
    longDesc: "Our BMW 7 Series chauffeur service in Dubai is the perfect first-class solution for executives and VIP guests. Whether you need a luxury airport transfer, a corporate chauffeur for a full day or an executive hire for a special event, the BMW 7 Series delivers unmatched comfort and presence across Dubai.",
    features: [
      "Executive rear lounge with reclining seats",
      "Bowers & Wilkins Diamond Surround Sound",
      "Sky Lounge panoramic glass roof",
      "Rear-seat entertainment screens",
      "Executive Lounge rear package",
      "Professional uniformed chauffeur",
      "Complimentary water and refreshments",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "First Class"    },
      { label: "Fuel Type",    value: "Petrol"         },
      { label: "Transmission", value: "Automatic 8G"   },
      { label: "A/C",          value: "4-Zone Climate" },
    ],
    faq: [
      { q: "Is the BMW 7 Series available for VIP airport transfers in Dubai?", a: "Yes - the BMW 7 Series is one of our most popular VIP airport transfer cars in Dubai, available 24/7 with meet & greet and flight tracking included." },
      { q: "What is included in the BMW 7 Series chauffeur hire in Dubai?", a: "All BMW 7 Series bookings include a professional uniformed chauffeur, complimentary refreshments, real-time flight tracking and meet & greet for airport transfers." },
      { q: "Can I hire a BMW 7 Series for a full day in Dubai?", a: "Absolutely - we offer full-day BMW 7 Series chauffeur hire in Dubai for corporate travel, city tours and special occasions." },
    ],
  },

  // ── Business Van ────────────────────────────────────────────────────────
  {
    slug: "mercedes-vito-tourer",
    classSlug: "business-van",
    name: "Mercedes Vito Tourer",
    category: "Executive MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85"],
    metaDesc: "Book a Mercedes Vito Tourer 7 seater with chauffeur in Dubai. Executive MPV for group airport transfers, corporate travel and city tours across Dubai.",
    seoKeywords: "Mercedes Vito chauffeur Dubai, luxury van with driver Dubai, 7 seater airport transfer Dubai, group chauffeur Dubai, business van hire Dubai",
    desc: "The Mercedes Vito Tourer is the ideal group chauffeur vehicle - combining generous space for 7 passengers with the quality and refinement of Mercedes-Benz.",
    longDesc: "Book a Mercedes Vito Tourer with chauffeur in Dubai for your next group airport transfer or corporate event. Seating 7 passengers in individual captain seats with full luggage capacity, the Vito Tourer is one of the most popular business van hire choices in Dubai and the UAE.",
    features: [
      "Flexible seating for up to 7 passengers",
      "Individual captain-style seats",
      "Panoramic windows for scenic journeys",
      "Generous luggage space at the rear",
      "USB charging ports at every seat",
      "Dual-zone climate control",
      "Professional uniformed chauffeur",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"    },
      { label: "Luggage",      value: "7 bags"      },
      { label: "Class",        value: "Business Van"},
      { label: "Fuel Type",    value: "Diesel"      },
      { label: "Transmission", value: "Automatic"   },
      { label: "A/C",          value: "Dual Zone"   },
    ],
    faq: [
      { q: "Is the Mercedes Vito Tourer good for corporate group travel in Dubai?", a: "Yes - the Vito Tourer is one of Dubai's most popular business van hire options for corporate groups, seating 7 in individual captain seats with full luggage space." },
      { q: "Can I book a Mercedes Vito with driver for a Dubai airport pickup?", a: "Absolutely - we offer 24/7 Mercedes Vito Tourer airport transfers from DXB, DWC and all major Dubai hotels at a fixed rate." },
      { q: "What is included in the Mercedes Vito chauffeur hire in Dubai?", a: "All bookings include a professional uniformed chauffeur, complimentary water, real-time flight tracking and meet & greet for airport arrivals." },
    ],
  },
  {
    slug: "mercedes-v300-tiffany",
    classSlug: "business-van",
    name: "Mercedes V 300 Tiffany",
    category: "Luxury MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 550", price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85"],
    metaDesc: "Hire a Mercedes V300 Tiffany Edition with chauffeur in Dubai. Bespoke VIP luxury MPV with starlight ceiling and premium interior for group travel.",
    seoKeywords: "Mercedes V300 Tiffany Dubai, Mercedes V Class hire Dubai, luxury MPV chauffeur Dubai, VIP group transfer Dubai, Mercedes van with driver Dubai",
    desc: "The Mercedes V 300 Tiffany Edition elevates group travel to an art form - a fully customised VIP interior with starlight ceiling, individual reclining seats and a premium sound system.",
    longDesc: "The Mercedes V300 Tiffany is the ultimate luxury van hire in Dubai - a fully bespoke VIP interior makes it the go-to choice for exclusive group transfers, corporate events and special occasions. Book your Mercedes V Class chauffeur in Dubai and enjoy a white-glove service from door to door.",
    features: [
      "Custom Tiffany VIP interior conversion",
      "Individual reclining luxury seats",
      "Starlight LED ceiling effect",
      "Premium entertainment system",
      "Refrigerator and refreshment station",
      "Privacy blinds on all windows",
      "Professional uniformed chauffeur",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"    },
      { label: "Luggage",      value: "7 bags"      },
      { label: "Class",        value: "Business Van"},
      { label: "Fuel Type",    value: "Diesel"      },
      { label: "Transmission", value: "Automatic 9G"},
      { label: "A/C",          value: "Multi-Zone"  },
    ],
    faq: [
      { q: "What is the Mercedes V300 Tiffany Edition in Dubai?", a: "The Mercedes V300 Tiffany is a fully customised luxury MPV with a bespoke VIP interior - one of the most exclusive group chauffeur options available in Dubai." },
      { q: "Is the Mercedes V Class Tiffany suitable for VIP events in Dubai?", a: "Yes - the Tiffany Edition is a top choice for VIP corporate events, exclusive group transfers and special occasions across Dubai." },
      { q: "Can I book a Mercedes V300 Tiffany for a group airport transfer in Dubai?", a: "Absolutely - the Vito Tiffany is available 24/7 for group airport transfers from DXB and DWC with a white-glove chauffeur service." },
    ],
  },
  {
    slug: "mercedes-vip-trend",
    classSlug: "business-van",
    name: "Mercedes VIP Trend 250",
    category: "Executive VIP MPV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 750", price5hr: "AED 1,300 / 5 Hr", price10hr: "AED 2,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1617469955246-19b0e89ce0d3?w=1200&q=85"],
    metaDesc: "Book a Mercedes VIP Trend 250 with chauffeur in Dubai. Executive MPV with Nappa leather, 42-inch screen and mini-bar for VIP group travel.",
    seoKeywords: "Mercedes VIP Trend 250 Dubai, executive VIP van Dubai, luxury MPV with driver Dubai, Mercedes V Class VIP Dubai, group chauffeur service Dubai",
    desc: "The Mercedes VIP Trend 250 is the ultimate executive MPV in Dubai - Nappa leather seating, a 42-inch rear screen, 4-zone climate and a private mini-bar.",
    longDesc: "For the most demanding VIP group travel in Dubai, the Mercedes VIP Trend 250 stands in a class of its own. Nappa leather seating, a private mini-bar and a 42-inch display make this executive van hire the ideal choice for corporate delegations, VIP guests and high-profile group transfers across Dubai.",
    features: [
      "Nappa leather individual VIP seating",
      "4-zone independent climate control",
      "Rear mini-bar with chilled compartment",
      "42-inch fold-out display screen",
      "Soundproofed cabin for private conversations",
      "Full-length centre console with storage",
      "White-glove chauffeur service included",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"    },
      { label: "Luggage",      value: "7 bags"      },
      { label: "Class",        value: "Business Van"},
      { label: "Fuel Type",    value: "Diesel"      },
      { label: "Transmission", value: "Automatic"   },
      { label: "A/C",          value: "4-Zone VIP"  },
    ],
    faq: [
      { q: "What is the Mercedes VIP Trend 250 in Dubai?", a: "The Mercedes VIP Trend 250 is an executive luxury MPV with a 42-inch rear screen, Nappa leather seating and mini-bar - one of the most premium group chauffeur options in Dubai." },
      { q: "Is the Mercedes VIP Trend 250 good for corporate groups in Dubai?", a: "Yes - it's the top choice for executive corporate group travel in Dubai, with a soundproofed cabin, individual climate zones and a private mini-bar." },
      { q: "Can I book the Mercedes VIP Trend 250 for a VIP airport transfer in Dubai?", a: "Yes - the VIP Trend 250 is available 24/7 for group airport transfers with full white-glove service across Dubai." },
    ],
  },

  // ── Mercedes Sprinter Luxury Van ────────────────────────────────────────
  {
    slug: "mercedes-sprinter-ultra-luxury",
    classSlug: "mercedes-sprinter-luxury-van",
    name: "Mercedes Sprinter Ultra Luxury Van",
    category: "Executive Luxury Van",
    passengers: 16, luggage: 9,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85"],
    metaDesc: "Book a Mercedes Sprinter Ultra Luxury Van with chauffeur in Dubai. 16 captain seats, onboard Wi-Fi and entertainment for large group transport.",
    seoKeywords: "Mercedes Sprinter luxury van Dubai, Sprinter with driver Dubai, 16 seater luxury van Dubai, large group transport Dubai, corporate van hire Dubai",
    desc: "The Mercedes Sprinter Ultra Luxury Van sets the benchmark for large group transport in Dubai - 16 premium captain seats, individual screens, onboard Wi-Fi and generous luggage space.",
    longDesc: "Searching for a Mercedes Sprinter hire in Dubai for a large group? Our Ultra Luxury Sprinter seats 16 passengers in first-class captain chairs with individual screens, Wi-Fi and onboard refreshments - ideal for corporate events, group airport transfers and tours across Dubai and the UAE.",
    features: [
      "16 premium captain seats with recline",
      "Individual entertainment screens per row",
      "USB-C and wireless charging at every seat",
      "Onboard Wi-Fi for all passengers",
      "Temperature-controlled drink storage",
      "Premium sound system throughout",
      "Large luggage bay at the rear",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 16"                     },
      { label: "Luggage",      value: "9 bags"                       },
      { label: "Class",        value: "Mercedes Sprinter Luxury Van" },
      { label: "Fuel Type",    value: "Diesel"                       },
      { label: "Transmission", value: "Automatic"                    },
      { label: "A/C",          value: "Full Van A/C"                 },
    ],
    faq: [
      { q: "Does the Mercedes Sprinter Luxury Van have Wi-Fi in Dubai?", a: "Yes - our Sprinter Ultra Luxury Van is fitted with onboard Wi-Fi, individual screens and USB charging for all 16 passengers." },
      { q: "Can I book a 16 seater luxury van for a corporate event in Dubai?", a: "Absolutely - our Mercedes Sprinter Ultra Luxury Van is the perfect large group transport solution for corporate events and airport transfers across Dubai." },
      { q: "Is the Sprinter Ultra Luxury Van suitable for group tours in Dubai?", a: "Yes - with individual captain seats, Wi-Fi and entertainment screens, it's ideal for premium group tours and corporate outings across Dubai and the UAE." },
    ],
  },
  {
    slug: "mercedes-sprinter-19",
    classSlug: "mercedes-sprinter-luxury-van",
    name: "Mercedes Sprinter 19 Seater",
    category: "Luxury Van",
    passengers: 19, luggage: 9,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85"],
    metaDesc: "Hire a Mercedes Sprinter 19 Seater with chauffeur in Dubai. Large group airport transfers and corporate events across Dubai and UAE.",
    seoKeywords: "Mercedes Sprinter 19 seater Dubai, Sprinter hire Dubai, large group airport transfer Dubai, 19 seater van Dubai, corporate bus hire Dubai",
    desc: "The Mercedes Sprinter 19 Seater is Dubai's most popular large group transport solution - fully air-conditioned, with overhead racks, USB charging and onboard Wi-Fi.",
    longDesc: "Our Mercedes Sprinter 19 Seater is the top choice for large group airport transfers, corporate events and tour groups across Dubai and the UAE. With 19 premium seats, a PA system and full cabin A/C, this is the most requested 19 seater van hire in Dubai - available 24/7 at a fixed price.",
    features: [
      "19 premium fabric/leather seats",
      "Overhead luggage racks",
      "USB charging ports throughout",
      "Onboard Wi-Fi available",
      "Full-length cabin air conditioning",
      "PA system for tour groups",
      "Step-assist entry for easy boarding",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 19"                     },
      { label: "Luggage",      value: "9 bags"                       },
      { label: "Class",        value: "Mercedes Sprinter Luxury Van" },
      { label: "Fuel Type",    value: "Diesel"                       },
      { label: "Transmission", value: "Automatic"                    },
      { label: "A/C",          value: "Full Van A/C"                 },
    ],
    faq: [
      { q: "Is the Mercedes Sprinter 19 Seater available for corporate events in Dubai?", a: "Yes - the Sprinter 19 Seater is one of our most popular corporate group transport options in Dubai, with Wi-Fi, PA system and air conditioning throughout." },
      { q: "Can I hire a 19 seater Mercedes Sprinter for a tour group in Dubai?", a: "Absolutely - our Sprinter 19 Seater is ideal for tour groups across Dubai, complete with a PA system, overhead storage and a professional licensed driver." },
      { q: "Is the Sprinter 19 Seater available for large group airport transfers in Dubai?", a: "Yes - we offer 24/7 Sprinter 19 Seater airport transfers from DXB and DWC for large groups across Dubai and the UAE." },
    ],
  },

  // ── Mercedes Sprinter Luxury VIP ────────────────────────────────────────
  {
    slug: "mercedes-sprinter-avant-garde",
    classSlug: "mercedes-sprinter-luxury-vip",
    name: "Mercedes Sprinter Avant Garde VIP",
    category: "Executive VIP Van",
    passengers: 11, luggage: 6,
    transferPrice: "AED 1,100", price5hr: "AED 1,500 / 5 Hr", price10hr: "AED 2,500 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85"],
    metaDesc: "Book a Mercedes Sprinter Avant Garde VIP with chauffeur in Dubai. Handcrafted starlight interior and champagne fridge for exclusive group travel.",
    seoKeywords: "Mercedes Sprinter Avant Garde VIP Dubai, VIP Sprinter hire Dubai, luxury group van Dubai, Sprinter VIP with driver Dubai, executive van Dubai",
    desc: "The Mercedes Sprinter Avant Garde VIP is the gold standard in luxury group transport - handcrafted interiors, starlight ceiling and champagne fridge for Dubai's most exclusive travellers.",
    longDesc: "The Avant Garde VIP Sprinter is the finest luxury van hire in Dubai - handcrafted from floor to ceiling with a starlight LED roof, individual electric-recline seats and a champagne refrigerator. Perfect for VIP group transfers, corporate roadshows and exclusive private events across Dubai.",
    features: [
      "Handcrafted Avant Garde VIP interior",
      "Starlight LED ceiling throughout",
      "Electric recline captain seats",
      "Central LED display and entertainment hub",
      "Champagne-style refrigerator unit",
      "Mood lighting with preset scenes",
      "Separate driver cabin with partition",
      "White-glove group concierge service",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 11"                     },
      { label: "Luggage",      value: "6 bags"                       },
      { label: "Class",        value: "Mercedes Sprinter Luxury VIP" },
      { label: "Fuel Type",    value: "Diesel"                       },
      { label: "Transmission", value: "Automatic"                    },
      { label: "A/C",          value: "Multi-Zone VIP"               },
    ],
    faq: [
      { q: "What is the Mercedes Sprinter Avant Garde VIP in Dubai?", a: "The Avant Garde VIP is a fully handcrafted luxury Sprinter van with a starlight ceiling, electric seats and champagne fridge - one of Dubai's most exclusive group transport vehicles." },
      { q: "Is the Sprinter Avant Garde VIP suitable for corporate events in Dubai?", a: "Yes - it is a top choice for corporate roadshows, VIP airport transfers and exclusive private group events across Dubai and the UAE." },
      { q: "Can I hire the Avant Garde VIP Sprinter for a group tour in Dubai?", a: "Absolutely - it's available 24/7 for group tours, private events and VIP transfers across Dubai with a white-glove concierge service." },
    ],
  },
  {
    slug: "mercedes-sprinter-business-vip",
    classSlug: "mercedes-sprinter-luxury-vip",
    name: "Mercedes Sprinter Business Class VIP",
    category: "Business Class VIP Van",
    passengers: 13, luggage: 7,
    transferPrice: "AED 1,000", price5hr: "AED 1,400 / 5 Hr", price10hr: "AED 2,300 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85"],
    metaDesc: "Hire a Mercedes Sprinter Business Class VIP with chauffeur in Dubai. 13-seat premium van with fold-out tables, Wi-Fi and business amenities.",
    seoKeywords: "Mercedes Sprinter Business VIP Dubai, VIP van hire Dubai, business class group transport Dubai, Sprinter corporate van Dubai, luxury van with driver Dubai",
    desc: "The Mercedes Sprinter Business Class VIP delivers an elevated group travel experience - premium leather seating, fold-out work tables and onboard Wi-Fi for 13 passengers.",
    longDesc: "Need a business class van hire in Dubai for a corporate group? The Sprinter Business Class VIP seats 13 in premium leather with fold-out tables and Wi-Fi - making it the ideal choice for executive airport transfers, corporate team travel and business group hire across Dubai and Abu Dhabi.",
    features: [
      "Business class leather seating",
      "Individual fold-out work tables",
      "Rear entertainment system",
      "Onboard Wi-Fi for all passengers",
      "USB charging at every seat",
      "Premium sound system",
      "Full-length cabin A/C",
      "Professional uniformed chauffeur",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 13"                     },
      { label: "Luggage",      value: "7 bags"                       },
      { label: "Class",        value: "Mercedes Sprinter Luxury VIP" },
      { label: "Fuel Type",    value: "Diesel"                       },
      { label: "Transmission", value: "Automatic"                    },
      { label: "A/C",          value: "Full Van VIP A/C"             },
    ],
    faq: [
      { q: "Does the Sprinter Business Class VIP have Wi-Fi in Dubai?", a: "Yes - all seats are fitted with onboard Wi-Fi, fold-out tables and USB charging, making it perfect for working groups and corporate travel in Dubai." },
      { q: "Can I hire the Sprinter Business Class VIP for corporate events in Dubai?", a: "Yes - it's one of our most popular corporate van hire options in Dubai for executive teams, conferences and VIP airport transfers." },
      { q: "Is the Sprinter Business Class VIP good for group airport transfers in Dubai?", a: "Absolutely - it seats 13 passengers with full luggage capacity and is available 24/7 for group airport transfers from DXB and DWC." },
    ],
  },

  // ── Luxury SUV ──────────────────────────────────────────────────────────
  {
    slug: "gmc-yukon-denali",
    classSlug: "luxury-suv",
    name: "GMC Yukon Denali",
    category: "Luxury SUV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 350", price5hr: "AED 950 / 5 Hr", price10hr: "AED 1,400 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85"],
    metaDesc: "Book a GMC Yukon Denali with chauffeur in Dubai. Premium 7-seat luxury SUV with professional driver for airport transfers and group travel.",
    seoKeywords: "GMC Yukon Denali chauffeur Dubai, GMC Yukon with driver Dubai, luxury SUV hire Dubai, 7 seater SUV Dubai, executive SUV airport transfer Dubai",
    desc: "The GMC Yukon Denali commands attention on every road in Dubai - a premium 7-seat luxury SUV with Bose audio, tri-zone climate and commanding V8 presence.",
    longDesc: "Book a GMC Yukon Denali with chauffeur in Dubai for a premium 7-seat SUV experience. With Denali leather, Bose audio and Magnetic Ride Control, the Yukon Denali is a top luxury SUV hire in Dubai for families, groups and executive airport transfers across the city.",
    features: [
      "Denali Premium leather-trimmed interior",
      "Tri-zone automatic climate control",
      "Power-folding third row for extra luggage",
      "Rear-seat entertainment system",
      "Bose premium audio throughout",
      "Magnetic Ride Control suspension",
      "USB charging at all three rows",
      "Professional chauffeur service included",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"         },
      { label: "Luggage",      value: "7 bags"           },
      { label: "Class",        value: "Luxury SUV"       },
      { label: "Fuel Type",    value: "Petrol V8"        },
      { label: "Transmission", value: "Automatic 10-Spd" },
      { label: "A/C",          value: "Tri-Zone Climate" },
    ],
    faq: [
      { q: "Is the GMC Yukon Denali good for group travel in Dubai?", a: "Yes - with 7 seats, Bose audio and generous luggage space, the Yukon Denali is one of Dubai's most popular luxury SUVs for group airport transfers and family travel." },
      { q: "Can I hire a GMC Yukon Denali with driver for a Dubai tour?", a: "Absolutely - we offer half-day and full-day GMC Yukon Denali chauffeur hire across Dubai, including sightseeing and city tours." },
      { q: "Is the GMC Yukon Denali available for airport transfers in Dubai?", a: "Yes - we offer 24/7 GMC Yukon Denali airport transfers from DXB and DWC with meet & greet and flight tracking included." },
    ],
  },
  {
    slug: "cadillac-escalade",
    classSlug: "luxury-suv",
    name: "Cadillac Escalade 7 Seater",
    category: "Luxury SUV",
    passengers: 7, luggage: 7,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85"],
    metaDesc: "Hire a Cadillac Escalade with chauffeur in Dubai. Iconic 7-seat luxury SUV with 38-inch OLED display and AKG audio for VIP airport transfers.",
    seoKeywords: "Cadillac Escalade chauffeur Dubai, Escalade hire Dubai, luxury SUV with driver Dubai, VIP SUV transfer Dubai, American luxury car Dubai",
    desc: "The Cadillac Escalade is the ultimate American luxury SUV hire in Dubai - 38-inch curved OLED display, AKG Studio audio and commanding V8 presence for 7 passengers.",
    longDesc: "The Cadillac Escalade chauffeur service in Dubai is the ultimate statement in American luxury. With a 38-inch OLED display, AKG studio audio and Super Cruise technology, the Escalade is the most impressive luxury SUV hire in Dubai for VIP airport transfers and corporate events.",
    features: [
      "Semi-aniline leather seating",
      "38-inch curved OLED display",
      "AKG Studio Reference 36-speaker audio",
      "Super Cruise driver assistance",
      "4-zone automatic climate control",
      "Night Vision with pedestrian detection",
      "Professional uniformed chauffeur",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 7"       },
      { label: "Luggage",      value: "7 bags"         },
      { label: "Class",        value: "Luxury SUV"     },
      { label: "Fuel Type",    value: "Petrol V8"      },
      { label: "Transmission", value: "Automatic 10G"  },
      { label: "A/C",          value: "4-Zone Climate" },
    ],
    faq: [
      { q: "Is the Cadillac Escalade available for VIP events in Dubai?", a: "Yes - the Escalade is one of the most requested luxury SUVs in Dubai for VIP corporate events, weddings and exclusive occasions." },
      { q: "What is included in the Cadillac Escalade chauffeur hire in Dubai?", a: "All Escalade bookings include a professional chauffeur, complimentary water, flight tracking and meet & greet for airport transfers." },
      { q: "Can I hire a Cadillac Escalade for a full day in Dubai?", a: "Absolutely - we offer full-day Cadillac Escalade chauffeur hire in Dubai for corporate travel, city tours and special events." },
    ],
  },
  {
    slug: "range-rover-sport",
    classSlug: "luxury-suv",
    name: "Range Rover Sport",
    category: "Luxury SUV",
    passengers: 5, luggage: 4,
    transferPrice: "AED 550", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85"],
    metaDesc: "Book a Range Rover Sport with chauffeur in Dubai. British luxury SUV with Meridian sound and professional driver for airport transfers and executive travel.",
    seoKeywords: "Range Rover Sport chauffeur Dubai, Range Rover hire Dubai, luxury SUV Dubai, British luxury car hire Dubai, executive SUV with driver Dubai",
    desc: "The Range Rover Sport is the definitive British luxury SUV for hire in Dubai - combining iconic design, Meridian 3D surround sound and air suspension with a professional chauffeur.",
    longDesc: "Hire a Range Rover Sport with chauffeur in Dubai for the ultimate British luxury SUV experience. With Meridian 3D sound, Pivi Pro infotainment and configurable terrain response, the Range Rover Sport is one of the most requested executive SUV chauffeur cars in Dubai for airport transfers and corporate travel.",
    features: [
      "Windsor leather heated & cooled seats",
      "Meridian Signature 3D Surround Sound",
      "Pivi Pro dual-touchscreen infotainment",
      "Configurable Terrain Response 2",
      "Air suspension with Dynamic mode",
      "Head-Up Display with navigation",
      "Professional uniformed chauffeur",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 5"           },
      { label: "Luggage",      value: "4 bags"             },
      { label: "Class",        value: "Luxury SUV"         },
      { label: "Fuel Type",    value: "Petrol/Mild Hybrid" },
      { label: "Transmission", value: "Automatic 8G"       },
      { label: "A/C",          value: "4-Zone Climate"     },
    ],
    faq: [
      { q: "Is the Range Rover Sport available for executive travel in Dubai?", a: "Yes - the Range Rover Sport is one of Dubai's most popular executive SUVs for corporate airport transfers, business travel and special occasions." },
      { q: "Can I book a Range Rover with driver in Dubai for a full day?", a: "Absolutely - we offer full-day Range Rover Sport chauffeur hire across Dubai for corporate travel, city tours and special events." },
      { q: "What is included in the Range Rover Sport chauffeur service in Dubai?", a: "All bookings include a professional uniformed chauffeur, complimentary water, real-time flight tracking and meet & greet for airport transfers." },
    ],
  },

  // ── Rolls-Royce ─────────────────────────────────────────────────────────
  {
    slug: "rolls-royce-ghost",
    classSlug: "rolls-royce",
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury Saloon",
    passengers: 3, luggage: 3,
    transferPrice: "AED 2,500", price5hr: "AED 5,000 / 5 Hr", price10hr: "AED 9,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=85"],
    metaDesc: "Book a Rolls-Royce Ghost with chauffeur in Dubai. The pinnacle of ultra-luxury travel for VIP airport pick-up, weddings and special events in Dubai.",
    seoKeywords: "Rolls Royce Ghost chauffeur Dubai, Rolls Royce hire Dubai, Rolls Royce with driver Dubai, ultra luxury car Dubai, VIP chauffeur service Dubai",
    desc: "The Rolls-Royce Ghost is the definitive expression of effortless luxury - hand-stitched leather, real wood veneers and a Starlight Headliner for Dubai's most distinguished guests.",
    longDesc: "Hiring a Rolls-Royce Ghost with chauffeur in Dubai is the ultimate statement of prestige. Whether it's a VIP airport transfer, a wedding, a special occasion or a corporate event, the Rolls-Royce Ghost chauffeur service in Dubai sets an unrivalled standard that no other car can match.",
    features: [
      "Starlight Headliner with 1,340 fibre optic lights",
      "Hand-stitched Connolly leather interior",
      "Bespoke real wood and metal veneers",
      "Spirit of Ecstasy illuminated hood ornament",
      "Gallery dashboard with floating illuminated panel",
      "Rear lounge seating with champagne cooler",
      "White-glove meet & greet included",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 3"       },
      { label: "Luggage",      value: "3 bags"         },
      { label: "Class",        value: "Rolls-Royce"    },
      { label: "Fuel Type",    value: "Petrol V12"     },
      { label: "Transmission", value: "Automatic 8G"   },
      { label: "A/C",          value: "4-Zone Climate" },
    ],
    faq: [
      { q: "Can I hire a Rolls-Royce Ghost for a wedding in Dubai?", a: "Absolutely - the Rolls-Royce Ghost is one of the most popular wedding cars in Dubai, complete with white-glove chauffeur service and complimentary champagne." },
      { q: "Is a Rolls-Royce Ghost available for VIP airport transfers in Dubai?", a: "Yes - we offer 24/7 Rolls-Royce Ghost airport transfers from DXB and DWC with meet & greet, name board and full white-glove service included." },
      { q: "What makes the Rolls-Royce Ghost the best chauffeur car in Dubai?", a: "The Ghost combines a hand-stitched bespoke interior, whisper-quiet V12 ride and a Starlight Headliner with a professional white-glove chauffeur - unmatched by any other car in Dubai." },
    ],
  },
  {
    slug: "rolls-royce-cullinan",
    classSlug: "rolls-royce",
    name: "Rolls-Royce Cullinan",
    category: "Ultra Luxury SUV",
    passengers: 4, luggage: 4,
    transferPrice: "AED 3,000", price5hr: "AED 6,000 / 5 Hr", price10hr: "AED 11,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85"],
    metaDesc: "Hire a Rolls-Royce Cullinan with chauffeur in Dubai. The world's most luxurious SUV with professional driver for VIP events and airport transfers.",
    seoKeywords: "Rolls Royce Cullinan chauffeur Dubai, Rolls Royce SUV hire Dubai, luxury SUV with driver Dubai, Rolls Royce rental Dubai, VIP airport transfer Dubai",
    desc: "The Rolls-Royce Cullinan is the world's most luxurious SUV for hire in Dubai - Magic Carpet Ride, Starlight Headliner and bespoke craftsmanship in an all-terrain commanding body.",
    longDesc: "The Rolls-Royce Cullinan is the most exclusive luxury SUV hire in Dubai - combining the commanding presence of a full-size SUV with the whisper-quiet refinement of a Rolls-Royce. Book your Rolls-Royce Cullinan chauffeur in Dubai for weddings, VIP events, corporate occasions and airport transfers.",
    features: [
      "Magic Carpet Ride air suspension",
      "Starlight Headliner with shooting stars",
      "Viewing Suite rear lounge seats",
      "Bespoke Rolls-Royce interior craftsmanship",
      "All-terrain capability with off-road mode",
      "Privacy glass and partition on request",
      "White-glove meet & greet included",
      "Real-time flight tracking for airport transfers",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 4"       },
      { label: "Luggage",      value: "4 bags"         },
      { label: "Class",        value: "Rolls-Royce"    },
      { label: "Fuel Type",    value: "Petrol V12"     },
      { label: "Transmission", value: "Automatic 8G"   },
      { label: "A/C",          value: "4-Zone Climate" },
    ],
    faq: [
      { q: "Is the Rolls-Royce Cullinan the most luxurious SUV in Dubai?", a: "Yes - the Rolls-Royce Cullinan is widely regarded as the world's most luxurious SUV, available for hire with a professional chauffeur in Dubai." },
      { q: "Can I hire a Rolls-Royce Cullinan for a wedding in Dubai?", a: "Absolutely - the Cullinan is one of the most popular Rolls-Royce wedding car hire options in Dubai, with white-glove service and meet & greet included." },
      { q: "Is the Rolls-Royce Cullinan available for VIP airport transfers in Dubai?", a: "Yes - we offer 24/7 Rolls-Royce Cullinan airport transfers from DXB and DWC with full white-glove meet & greet service." },
    ],
  },

  // ── Stretch Limousine ───────────────────────────────────────────────────
  {
    slug: "gmc-yukon-limousine",
    classSlug: "stretch-limousine",
    name: "GMC Yukon Limousine",
    category: "Stretch Limousine",
    passengers: 18, luggage: 2,
    transferPrice: "AED 850", price5hr: "AED 4,000 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85"],
    metaDesc: "Book a GMC Yukon Stretch Limousine in Dubai. Seats 18 for weddings, birthday parties, VIP events and nights out - available 24/7 across Dubai.",
    seoKeywords: "GMC Yukon limousine Dubai, stretch limo hire Dubai, wedding limo Dubai, party limousine Dubai, luxury limo service Dubai",
    desc: "The GMC Yukon Stretch Limousine is the ultimate event vehicle in Dubai - seating 18 guests with a full entertainment bar, LED mood lighting and surround sound.",
    longDesc: "Looking for stretch limo hire in Dubai for a wedding, birthday or VIP night out? The GMC Yukon Limousine seats 18 guests in a fully equipped entertainment cabin with a bar, LED lighting and surround sound. Book your Dubai stretch limousine 24/7 - no event is too big or too glamorous.",
    features: [
      "Stretch limousine seating for 18",
      "Full built-in entertainment bar",
      "LED colour-changing mood lighting",
      "Surround sound premium audio system",
      "Multiple flat-screen displays",
      "Champagne/drinks cooler included",
      "Starlight ceiling and mirror panels",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 18"         },
      { label: "Luggage",      value: "2 bags"            },
      { label: "Class",        value: "Stretch Limousine" },
      { label: "Fuel Type",    value: "Petrol V8"         },
      { label: "Transmission", value: "Automatic"         },
      { label: "A/C",          value: "Full Limo Climate" },
    ],
    faq: [
      { q: "Can I hire a limo for a wedding in Dubai?", a: "Yes - the GMC Yukon Limousine is one of the most popular wedding limo hire options in Dubai, seating 18 guests with champagne service and a formal chauffeur." },
      { q: "Is the GMC Yukon Limousine available for birthday parties in Dubai?", a: "Absolutely - our Dubai stretch limo is available 24/7 for birthdays, hen nights, prom events and VIP nights out across the city." },
      { q: "How many passengers does the GMC Yukon Limousine seat in Dubai?", a: "The GMC Yukon Stretch Limousine comfortably seats up to 18 guests with a full entertainment bar, LED lighting and surround sound." },
    ],
  },
  {
    slug: "chevy-suburban-titanium-limousine",
    classSlug: "stretch-limousine",
    name: "Chevy Suburban Titanium Limousine",
    category: "Stretch Limousine",
    passengers: 16, luggage: 2,
    transferPrice: "AED 900", price5hr: "AED 4,200 / 5 Hr", price10hr: "AED 7,500 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85"],
    metaDesc: "Hire a Chevy Suburban Titanium Stretch Limousine in Dubai. Seats 16 for weddings, VIP events and nights out - premium bar and entertainment onboard.",
    seoKeywords: "Chevy Suburban limousine Dubai, stretch limo hire Dubai, titanium limo Dubai, wedding limousine Dubai, VIP limo service Dubai",
    desc: "The Chevy Suburban Titanium Limousine delivers bold American stretch luxury in Dubai - a premium bar, privacy partition and LED lighting for up to 16 guests.",
    longDesc: "The Chevy Suburban Titanium is one of Dubai's most iconic stretch limos for hire - with a premium bar, privacy partition and neon mood lighting, it is the perfect wedding limousine or VIP party limo in Dubai. Seats 16 guests and is available 24/7 across the city.",
    features: [
      "Titanium interior trim and finishes",
      "Premium bar setup with glassware",
      "Privacy partition between driver and cabin",
      "Neon and LED mood lighting",
      "Surround sound entertainment system",
      "Seating for up to 16 guests",
      "Champagne service available",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 16"         },
      { label: "Luggage",      value: "2 bags"            },
      { label: "Class",        value: "Stretch Limousine" },
      { label: "Fuel Type",    value: "Petrol V8"         },
      { label: "Transmission", value: "Automatic"         },
      { label: "A/C",          value: "Full Limo Climate" },
    ],
    faq: [
      { q: "Can I book the Chevy Suburban Titanium for a wedding in Dubai?", a: "Yes - the Titanium Limousine is a popular Dubai wedding limo hire, seating 16 guests with champagne service and a formally dressed chauffeur." },
      { q: "Is this limo available for VIP nights out in Dubai?", a: "Absolutely - our Chevy Suburban Titanium stretch limo is available 24/7 for VIP events, hen parties and birthdays across Dubai." },
      { q: "How many people does the Chevy Suburban Titanium Limousine seat in Dubai?", a: "The Chevy Suburban Titanium seats up to 16 guests with a premium bar, neon lighting and a privacy partition between the cabin and driver." },
    ],
  },
  {
    slug: "gmc-yukon-diamond-limousine",
    classSlug: "stretch-limousine",
    name: "GMC Yukon Diamond Limousine",
    category: "Stretch Limousine",
    passengers: 18, luggage: 2,
    transferPrice: "AED 950", price5hr: "AED 4,500 / 5 Hr", price10hr: "AED 8,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85"],
    metaDesc: "Book a GMC Yukon Diamond Stretch Limousine in Dubai. Diamond-stitched interiors, full bar and starlight ceiling for the most exclusive events in Dubai.",
    seoKeywords: "GMC Yukon Diamond limousine Dubai, VIP stretch limo Dubai, diamond limo hire Dubai, luxury limousine Dubai, best limo service Dubai",
    desc: "The GMC Yukon Diamond Limousine is the crown jewel of Dubai's stretch fleet - diamond-stitched leather, crystal glassware and a full bar for 18 guests.",
    longDesc: "For the most exclusive stretch limo hire in Dubai, the GMC Yukon Diamond Limousine is unrivalled. Diamond-stitched leather, crystal glassware and a starlight ceiling make this the top choice for luxury weddings, VIP corporate events and milestone celebrations across Dubai.",
    features: [
      "Diamond-stitched premium leather interior",
      "Full bar lounge with crystal glassware",
      "Starlight ceiling throughout the cabin",
      "LED dance floor lighting",
      "Multiple entertainment screens",
      "Champagne and drinks cooler",
      "Seating for up to 18 guests",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 18"         },
      { label: "Luggage",      value: "2 bags"            },
      { label: "Class",        value: "Stretch Limousine" },
      { label: "Fuel Type",    value: "Petrol V8"         },
      { label: "Transmission", value: "Automatic"         },
      { label: "A/C",          value: "Full Limo Climate" },
    ],
    faq: [
      { q: "What makes the GMC Yukon Diamond Limousine special in Dubai?", a: "The Diamond Limousine features hand-stitched diamond leather, crystal glassware and a starlight ceiling - making it the most luxurious stretch limo hire in Dubai." },
      { q: "Is the Diamond Limousine available for weddings in Dubai?", a: "Yes - it is the number one choice for luxury wedding limo hire in Dubai, with champagne service and a formally dressed chauffeur included." },
      { q: "How many passengers does the GMC Yukon Diamond Limousine seat?", a: "The GMC Yukon Diamond Limousine comfortably seats up to 18 guests with a full bar, LED dance floor and starlight ceiling." },
    ],
  },
  {
    slug: "chrysler-emerald-limousine",
    classSlug: "stretch-limousine",
    name: "Chrysler Emerald Limousine",
    category: "Stretch Limousine",
    passengers: 14, luggage: 2,
    transferPrice: "AED 800", price5hr: "AED 3,800 / 5 Hr", price10hr: "AED 7,000 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=85"],
    metaDesc: "Hire a Chrysler Emerald Stretch Limousine in Dubai. Classic stretch limo for weddings, prom nights and special events - 14 guests, available 24/7.",
    seoKeywords: "Chrysler limousine Dubai, classic stretch limo Dubai, wedding limo hire Dubai, prom limo Dubai, emerald limo Dubai",
    desc: "The Chrysler Emerald Limousine is a classic stretch icon in Dubai - elegant emerald accents, fibre optic lighting and a full bar for up to 14 guests.",
    longDesc: "The Chrysler Emerald is a timeless classic stretch limousine for hire in Dubai - instantly glamorous for weddings, prom nights and milestone events. Seating 14 guests with a full entertainment bar and fibre optic lighting, this classic limo hire in Dubai is available 24/7 across the emirate.",
    features: [
      "Classic stretch limousine design",
      "Emerald-tone interior accents",
      "Full bar and entertainment unit",
      "Fibre optic ceiling lighting",
      "Flat-screen display inside cabin",
      "Champagne service available",
      "Seating for up to 14 guests",
      "Professional chauffeur in formal attire",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 14"         },
      { label: "Luggage",      value: "2 bags"            },
      { label: "Class",        value: "Stretch Limousine" },
      { label: "Fuel Type",    value: "Petrol V8"         },
      { label: "Transmission", value: "Automatic"         },
      { label: "A/C",          value: "Full Limo Climate" },
    ],
    faq: [
      { q: "Is the Chrysler Emerald Limousine good for weddings in Dubai?", a: "Yes - the Chrysler Emerald is a beloved classic wedding limo in Dubai, seating 14 guests with fibre optic lighting and champagne service." },
      { q: "Can I book the Chrysler Emerald for a prom night in Dubai?", a: "Absolutely - the Chrysler Emerald is one of the most popular prom limo hire options in Dubai, available 24/7 for school proms and special events." },
      { q: "How many passengers does the Chrysler Emerald Limousine seat?", a: "The Chrysler Emerald seats up to 14 guests with a full bar, fibre optic ceiling and champagne service included." },
    ],
  },

  // ── Standard Bus ────────────────────────────────────────────────────────
  {
    slug: "toyota-coaster-21",
    classSlug: "standard-bus",
    name: "Toyota Coaster 21 Seater",
    category: "Standard Bus",
    passengers: 21, luggage: 15,
    transferPrice: "AED 500", price5hr: "AED 900 / 5 Hr", price10hr: "AED 1,500 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=85"],
    metaDesc: "Hire a Toyota Coaster 21 Seater with driver in Dubai. Reliable mini-bus for corporate shuttles, school runs and group airport transfers across Dubai.",
    seoKeywords: "Toyota Coaster hire Dubai, 21 seater bus Dubai, mini bus with driver Dubai, corporate shuttle Dubai, school bus hire Dubai",
    desc: "The Toyota Coaster 21 Seater is Dubai's most trusted mini-bus for corporate shuttles, school runs and group airport transfers - reliable, air-conditioned and professionally driven.",
    longDesc: "Searching for a 21 seater mini bus hire in Dubai? The Toyota Coaster is the most dependable group transport solution in Dubai - air-conditioned, professionally driven and available 24/7. Ideal for corporate shuttles, school trips, hotel runs and group airport transfers across Dubai and the UAE.",
    features: [
      "21 reclining seats with armrests",
      "Overhead storage racks",
      "Central full-cabin A/C",
      "PA/microphone system",
      "USB charging points",
      "Step-assist entry",
      "Professional licensed driver",
      "Available 24/7 across Dubai and UAE",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 21"    },
      { label: "Luggage",      value: "15 bags"      },
      { label: "Class",        value: "Standard Bus" },
      { label: "Fuel Type",    value: "Diesel"       },
      { label: "Transmission", value: "Automatic"    },
      { label: "A/C",          value: "Full Bus A/C" },
    ],
    faq: [
      { q: "Is the Toyota Coaster available for corporate shuttles in Dubai?", a: "Yes - the Toyota Coaster is one of our most popular corporate shuttle buses in Dubai, available 24/7 with a professional licensed driver." },
      { q: "Can I book a 21 seater bus for a school trip in Dubai?", a: "Absolutely - our Toyota Coaster is fully licensed for school runs and group trips across Dubai, with air conditioning and a PA system included." },
      { q: "Is the Toyota Coaster good for group airport transfers in Dubai?", a: "Yes - with 21 seats and space for 15 bags, the Toyota Coaster is ideal for large group airport transfers from DXB and DWC across Dubai." },
    ],
  },
  {
    slug: "toyota-hiace-11",
    classSlug: "standard-bus",
    name: "Toyota Hiace 11 Seater",
    category: "Standard Van / Mini Bus",
    passengers: 11, luggage: 8,
    transferPrice: "AED 350", price5hr: "AED 750 / 5 Hr", price10hr: "AED 1,200 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=85"],
    metaDesc: "Book a Toyota Hiace 11 Seater with driver in Dubai. Dependable mid-size van for group airport transfers, corporate shuttles and tours across Dubai.",
    seoKeywords: "Toyota Hiace hire Dubai, 11 seater van Dubai, minivan with driver Dubai, group airport transfer Dubai, airport shuttle Dubai",
    desc: "The Toyota Hiace 11 Seater is Dubai's go-to mid-size group transport - dependable, spacious and available 24/7 for airport transfers and corporate shuttles.",
    longDesc: "The Toyota Hiace 11 Seater is one of the most popular van hire options in Dubai for mid-size groups. Whether you need an 11 seater for an airport transfer, a corporate shuttle or a hotel group run, our Toyota Hiace with driver in Dubai is available 24/7 at a fixed price with no surprises.",
    features: [
      "11 comfortable passenger seats",
      "Overhead storage racks",
      "USB charging ports",
      "Rear A/C vents",
      "Large rear luggage area",
      "Step-assist entry",
      "Professional licensed driver",
      "Available 24/7 across Dubai and UAE",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 11"     },
      { label: "Luggage",      value: "8 bags"        },
      { label: "Class",        value: "Standard Bus"  },
      { label: "Fuel Type",    value: "Diesel"        },
      { label: "Transmission", value: "Automatic"     },
      { label: "A/C",          value: "Dual Zone A/C" },
    ],
    faq: [
      { q: "Is the Toyota Hiace available for corporate shuttles in Dubai?", a: "Yes - the Hiace is one of the most popular corporate shuttle vans in Dubai, available 24/7 with a professional licensed driver at a fixed price." },
      { q: "Can I book a Toyota Hiace with driver for a hotel transfer in Dubai?", a: "Absolutely - we offer 24/7 Toyota Hiace hotel transfers across all major Dubai hotels, resorts and serviced apartments." },
      { q: "How many passengers does the Toyota Hiace 11 Seater hold?", a: "The Toyota Hiace seats up to 11 passengers with space for 8 bags - perfect for mid-size group airport transfers and corporate shuttles in Dubai." },
    ],
  },
  {
    slug: "50-seater-luxury-bus",
    classSlug: "standard-bus",
    name: "50 Seater Luxury Coach",
    category: "Luxury Coach",
    passengers: 50, luggage: 50,
    transferPrice: "AED 800", price5hr: "AED 1,100 / 5 Hr", price10hr: "AED 1,700 / 10 Hr",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=85"],
    metaDesc: "Hire a 50 Seater Luxury Coach with driver in Dubai. Premium large-group transport for corporate events, airport runs and tours across Dubai and UAE.",
    seoKeywords: "50 seater bus hire Dubai, luxury coach Dubai, large group transport Dubai, corporate bus hire Dubai, bus rental with driver Dubai",
    desc: "Our 50-Seater Luxury Coach is Dubai's premier large group transport solution - Wi-Fi, USB charging, underfloor luggage and premium reclining seats for every passenger.",
    longDesc: "Need a 50 seater luxury coach hire in Dubai for a large corporate event, conference transfer or airport run? Our premium coach seats 50 in reclining chairs with individual USB charging, onboard Wi-Fi and a full PA system - the most complete large group bus hire in Dubai, available 24/7.",
    features: [
      "50 premium reclining seats with armrests",
      "Full-length underfloor luggage storage",
      "Onboard Wi-Fi for all passengers",
      "Individual USB charging at every seat",
      "PA and microphone system for guides",
      "Overhead storage racks throughout",
      "Full climate-controlled cabin",
      "Professional licensed coach driver",
    ],
    specs: [
      { label: "Passengers",   value: "Up to 50"        },
      { label: "Luggage",      value: "Full luggage bay" },
      { label: "Class",        value: "Standard Bus"     },
      { label: "Fuel Type",    value: "Diesel"           },
      { label: "Transmission", value: "Automatic"        },
      { label: "A/C",          value: "Full Coach A/C"   },
    ],
    faq: [
      { q: "Is the 50 seater coach available for corporate events in Dubai?", a: "Yes - our luxury coach is the top choice for large corporate group transport in Dubai, with Wi-Fi, PA system and underfloor luggage for up to 50 passengers." },
      { q: "Can I hire a 50 seater bus for a tour group in Dubai?", a: "Absolutely - our luxury coach is ideal for city tours, conference shuttles and large group airport transfers across Dubai and the UAE." },
      { q: "Does the 50 seater coach have Wi-Fi in Dubai?", a: "Yes - our luxury coach is fitted with onboard Wi-Fi, individual USB charging and a PA system for all 50 passengers." },
    ],
  },
];

export async function generateStaticParams() {
  return allVehicles.map((v) => ({ slug: v.classSlug, car: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}): Promise<Metadata> {
  const { car, slug } = await params;
  const vehicle = allVehicles.find((v) => v.slug === car && v.classSlug === slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} Chauffeur Dubai | Hire with Driver from ${vehicle.transferPrice}`,
    description: vehicle.metaDesc,
    keywords: vehicle.seoKeywords,
    alternates: {
      canonical: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
    },
    openGraph: {
      title: `${vehicle.name} - Luxury Chauffeur Dubai`,
      description: vehicle.metaDesc,
      url: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
      images: [{ url: vehicle.images[0], alt: `${vehicle.name} chauffeur hire Dubai` }],
      type: "website",
    },
  };
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string; car: string }>;
}) {
  const { car, slug } = await params;
  const vehicle = allVehicles.find((v) => v.slug === car && v.classSlug === slug);
  if (!vehicle) notFound();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${vehicle.name} Chauffeur Dubai`,
            description: vehicle.metaDesc,
            image: vehicle.images[0],
            url: `https://chauffeurdubai.ae/fleet/${vehicle.classSlug}/${vehicle.slug}`,
            brand: { "@type": "Brand", name: "Privilege Luxury Travel" },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "AED",
              lowPrice: vehicle.transferPrice.replace(/[^0-9]/g, ""),
              offerCount: 3,
              offers: [
                { "@type": "Offer", name: "Airport Transfer Dubai", price: vehicle.transferPrice.replace(/[^0-9]/g, ""), priceCurrency: "AED" },
                { "@type": "Offer", name: "5 Hour Package", price: vehicle.price5hr.replace(/[^0-9]/g, "").slice(0, 4), priceCurrency: "AED" },
                { "@type": "Offer", name: "10 Hour Package", price: vehicle.price10hr.replace(/[^0-9]/g, "").slice(0, 5), priceCurrency: "AED" },
              ],
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "47", bestRating: "5" },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden pt-16">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.name} chauffeur hire Dubai`}
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(183,110,121,0.2) 60%, transparent 100%)" }}
        />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/fleet/${vehicle.classSlug}`}
              className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to {vehicle.classSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3 inline-block"
                  style={{ background: roseGoldGradient }}
                >
                  {vehicle.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-white">{vehicle.name}</h1>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} fill="#e8a4a0" className="text-rose-300" />
                ))}
                <span className="ml-1">5.0 - Luxury Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2 space-y-10">

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                {vehicle.name} Chauffeur Service in Dubai
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-4">{vehicle.desc}</p>
              <p className="text-zinc-400 leading-relaxed text-sm">{vehicle.longDesc}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                What&apos;s Included with Your {vehicle.name} Hire
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-zinc-600 text-sm">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#b76e79" }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                {vehicle.name} Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {vehicle.specs.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4 border border-rose-100 text-center"
                    style={{ background: roseGoldGradientSubtle }}
                  >
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-zinc-900 font-bold text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-rose-100 flex-1 shadow-sm">
                <UserRound size={28} style={{ color: "#b76e79" }} />
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Passengers</p>
                  <p className="text-zinc-900 font-bold">Up to {vehicle.passengers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-rose-100 flex-1 shadow-sm">
                <Luggage size={28} style={{ color: "#b76e79" }} />
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">Luggage</p>
                  <p className="text-zinc-900 font-bold">{vehicle.luggage} Standard Bags</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {vehicle.faq.map(({ q, a }) => (
                  <div key={q} className="rounded-2xl border border-rose-100 p-5" style={{ background: roseGoldGradientSubtle }}>
                    <p className="font-semibold text-zinc-800 text-sm mb-2">{q}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-rose-100 shadow-lg overflow-hidden">
                <div className="p-6" style={{ background: roseGoldGradient }}>
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Starting From</p>
                  <p className="text-white font-bold text-3xl">{vehicle.transferPrice}</p>
                  <p className="text-white/70 text-xs mt-1">Airport Transfer in Dubai</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">Transfer in Dubai</span>
                    <span className="font-bold" style={{ color: "#b76e79" }}>{vehicle.transferPrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-rose-50 text-sm">
                    <span className="text-zinc-500">5 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price5hr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-zinc-500">10 Hour Package</span>
                    <span className="font-semibold text-zinc-700">{vehicle.price10hr}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <BookingButton
                    carName={vehicle.name}
                    carCategory={vehicle.category}
                    transferPrice={vehicle.transferPrice}
                    price5hr={vehicle.price5hr}
                    price10hr={vehicle.price10hr}
                    maxPassengers={vehicle.passengers}
                  />
                  <a
                    href="tel:+971509200818"
                    className="flex items-center justify-center gap-2 w-full border-2 border-rose-200 text-rose-400 hover:bg-rose-50 font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <Phone size={16} />
                    Call to Book
                  </a>
                  <a
                    href={`https://wa.me/971509200818?text=Hi,%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}%20in%20Dubai`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Directly
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm space-y-3 text-sm text-zinc-500">
                {[
                  "Professional licensed chauffeur included",
                  "Fixed price - no hidden charges",
                  "Free cancellation (24h notice)",
                  "Confirmed within minutes",
                  "Available 24/7 across Dubai",
                ].map((t) => (
                  <p key={t} className="font-medium">&#10003; {t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 px-4 text-center" style={{ background: roseGoldGradient }}>
        <h2 className="text-2xl font-bold text-white mb-2">
          Ready to Book the {vehicle.name} in Dubai?
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Available 24/7 - airport transfers, corporate hire and special occasions across Dubai and UAE.
        </p>
        <BookingButton
          carName={vehicle.name}
          carCategory={vehicle.category}
          transferPrice={vehicle.transferPrice}
          price5hr={vehicle.price5hr}
          price10hr={vehicle.price10hr}
          maxPassengers={vehicle.passengers}
        />
      </section>
    </>
  );
}
