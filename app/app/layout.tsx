import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/seo/StructuredData";
import { LOCAL_BUSINESS_SCHEMA } from "./lib/seo/schema";

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Police principale - Inter (moderne et lisible)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Police accent - Playfair Display (élégante pour les titres)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vtcrachel.fr'),
  title: {
    default: "VTC Rachel - Chauffeur Privé Premium en Île-de-France",
    template: "%s | VTC Rachel"
  },
  description: "Service VTC premium avec chauffeur professionnel. Réservation en ligne simple et rapide. Paris, CDG, Orly et toute l'Île-de-France.",
  keywords: [
    'VTC Paris',
    'chauffeur privé',
    'transfert aéroport',
    'CDG',
    'Orly',
    'Beauvais',
    'VTC Île-de-France',
    'chauffeur VTC',
    'réservation VTC',
    'taxi premium Paris'
  ],
  authors: [{ name: 'VTC Rachel' }],
  creator: 'VTC Rachel',
  publisher: 'VTC Rachel',
  
  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://vtcrachel.fr',
    siteName: 'VTC Rachel',
    title: 'VTC Rachel - Chauffeur Privé Premium en Île-de-France',
    description: 'Service VTC premium avec chauffeur professionnel. Réservation en ligne simple et rapide. Paris, CDG, Orly et toute l\'Île-de-France.',
    images: [
      {
        url: '/images/vtc-rachel-car.png',
        width: 1200,
        height: 630,
        alt: 'VTC Rachel - Voiture premium',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'VTC Rachel - Chauffeur Privé Premium',
    description: 'Service VTC premium avec chauffeur professionnel en Île-de-France.',
    images: ['/images/vtc-rachel-car.png'],
  },
  
  // Verification (à ajouter plus tard)
  // verification: {
  //   google: 'verification_token',
  // },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData data={LOCAL_BUSINESS_SCHEMA} />
      </head>
      <body
        className={`${bodoni.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
