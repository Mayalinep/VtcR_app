/**
 * Pricing Data - Tarifs VTC
 * 
 * Source unique de vérité pour tous les tarifs affichés.
 * Utilisé par la page tarifs/page.tsx
 */

export interface AirportPrice {
  id: string;
  name: string;
  shortName: string;
  description: string;
  dayPrice: number;
  nightPrice: number;
  dayHours: string;
  nightHours: string;
  waitTime: number; // minutes
  features: string[];
  popular?: boolean;
}

export interface TrainStation {
  id: string;
  name: string;
  price: number;
  zone: string;
}

export interface DisposalOption {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  hours?: number;
  minHours?: number;
  pricePerHour?: number;
  savings?: number;
  features: string[];
  recommended?: boolean;
}

export interface Surcharge {
  id: string;
  name: string;
  price: number | string;
  unit: string;
  description: string;
}

export interface IncludedFeature {
  id: string;
  title: string;
  description: string;
}

// Forfaits Aéroports
export const AIRPORT_PRICES: readonly AirportPrice[] = [
  {
    id: 'cdg',
    name: 'Paris ↔ CDG',
    shortName: 'CDG',
    description: 'Aéroport Charles de Gaulle',
    dayPrice: 60,
    nightPrice: 70,
    dayHours: '6h-22h',
    nightHours: '22h-6h',
    waitTime: 45,
    features: [
      '1 à 4 passagers',
      '3 bagages cabine + 3 valises',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  },
  {
    id: 'orly',
    name: 'Paris ↔ Orly',
    shortName: 'Orly',
    description: "Aéroport d'Orly",
    dayPrice: 55,
    nightPrice: 65,
    dayHours: '6h-22h',
    nightHours: '22h-6h',
    waitTime: 45,
    popular: true,
    features: [
      '1 à 4 passagers',
      '3 bagages cabine + 3 valises',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  },
  {
    id: 'beauvais',
    name: 'Paris ↔ Beauvais',
    shortName: 'Beauvais',
    description: 'Aéroport de Beauvais',
    dayPrice: 130,
    nightPrice: 150,
    dayHours: '6h-22h',
    nightHours: '22h-6h',
    waitTime: 45,
    features: [
      '1 à 4 passagers',
      '3 bagages cabine + 3 valises',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  }
] as const;

// Forfaits Gares Parisiennes
export const TRAIN_STATIONS: readonly TrainStation[] = [
  { id: 'nord', name: 'Gare du Nord', price: 45, zone: 'Paris intra-muros' },
  { id: 'lyon', name: 'Gare de Lyon', price: 45, zone: 'Paris intra-muros' },
  { id: 'montparnasse', name: 'Gare Montparnasse', price: 45, zone: 'Paris intra-muros' },
  { id: 'est', name: "Gare de l'Est", price: 45, zone: 'Paris intra-muros' },
  { id: 'lazare', name: 'Gare Saint-Lazare', price: 45, zone: 'Paris intra-muros' },
  { id: 'austerlitz', name: "Gare d'Austerlitz", price: 45, zone: 'Paris intra-muros' }
] as const;

// Mise à Disposition
export const DISPOSAL_OPTIONS: readonly DisposalOption[] = [
  {
    id: 'hourly',
    name: "À l'heure",
    description: 'Flexibilité maximale',
    price: 75,
    unit: 'par heure',
    minHours: 3,
    features: [
      'Minimum 3 heures',
      'Chauffeur à disposition',
      'Trajets multiples possibles'
    ]
  },
  {
    id: 'half-day',
    name: 'Demi-Journée',
    description: '4 heures',
    price: 240,
    unit: '4 heures',
    hours: 4,
    pricePerHour: 60,
    savings: 60,
    recommended: true,
    features: [
      '4 heures continues',
      'Chauffeur à disposition',
      'Idéal pour réunions'
    ]
  },
  {
    id: 'full-day',
    name: 'Journée',
    description: '8 heures',
    price: 480,
    unit: '8 heures',
    hours: 8,
    pricePerHour: 60,
    savings: 120,
    features: [
      '8 heures continues',
      'Chauffeur à disposition',
      'Idéal pour événements'
    ]
  }
] as const;

// Options & Suppléments
export const SURCHARGES: readonly Surcharge[] = [
  {
    id: 'child-seat',
    name: 'Siège enfant',
    price: 10,
    unit: 'Par siège',
    description: 'Par siège'
  },
  {
    id: 'extra-wait',
    name: 'Attente supplémentaire',
    price: 15,
    unit: 'Par tranche de 15 min',
    description: 'Par tranche de 15 min'
  },
  {
    id: 'extra-baggage',
    name: 'Bagage supplémentaire',
    price: 5,
    unit: 'Au-delà de 3 valises',
    description: 'Au-delà de 3 valises'
  },
  {
    id: 'extra-passenger',
    name: 'Passager supplémentaire',
    price: 'Gratuit',
    unit: "Jusqu'à 4 personnes",
    description: "Jusqu'à 4 personnes"
  }
] as const;

// Inclus dans tous nos tarifs
export const INCLUDED_FEATURES: readonly IncludedFeature[] = [
  {
    id: 'vehicle',
    title: 'Véhicule Premium',
    description: 'Berline récente, climatisée et entretenue'
  },
  {
    id: 'driver',
    title: 'Chauffeur Professionnel',
    description: 'Expérimenté, courtois et discret'
  },
  {
    id: 'amenities',
    title: 'Eau & Chargeurs',
    description: "Bouteilles d'eau et chargeurs USB/Lightning"
  },
  {
    id: 'wifi',
    title: 'Wi-Fi à bord',
    description: 'Connexion internet haut débit'
  },
  {
    id: 'fees',
    title: 'Tous frais inclus',
    description: 'Autoroute, stationnement, carburant'
  },
  {
    id: 'cancellation',
    title: 'Annulation flexible',
    description: "Gratuite jusqu'à 12h avant"
  }
] as const;

// Helper functions pour formatage
export function formatPrice(price: number | string): string {
  if (typeof price === 'string') return price;
  return `${price}€`;
}

export function getPriceByTime(airport: AirportPrice, isNight: boolean): number {
  return isNight ? airport.nightPrice : airport.dayPrice;
}
