/**
 * Données de tarification VTC Rachel
 * 
 * Structure centralisée de tous les tarifs :
 * - Forfaits aéroports
 * - Forfaits gares
 * - Mise à disposition
 * - Options supplémentaires
 */

// Types
export interface PriceCard {
  id: string;
  name: string;
  subtitle: string;
  dayPrice: string;
  nightPrice: string;
  dayHours: string;
  nightHours: string;
  features: string[];
  isPopular?: boolean;
  icon: 'airport' | 'clock' | 'sun' | 'star';
}

export interface StationPrice {
  name: string;
  price: string;
}

export interface Option {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: 'child' | 'clock' | 'luggage' | 'passenger';
}

export interface IncludedFeature {
  title: string;
  description: string;
}

// Forfaits Aéroports
export const AIRPORT_PACKAGES: PriceCard[] = [
  {
    id: 'cdg',
    name: 'Paris ↔ CDG',
    subtitle: 'Aéroport Charles de Gaulle',
    dayPrice: 'À partir de 35€',
    nightPrice: '',
    dayHours: 'Prix indicatif',
    nightHours: '',
    icon: 'airport',
    features: [
      '1 à 3 passagers',
      '2 valises de taille standard',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  },
  {
    id: 'orly',
    name: 'Paris ↔ Orly',
    subtitle: "Aéroport d'Orly",
    dayPrice: 'À partir de 30€',
    nightPrice: '',
    dayHours: 'Prix indicatif',
    nightHours: '',
    icon: 'airport',
    isPopular: true,
    features: [
      '1 à 3 passagers',
      '2 valises de taille standard',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  },
  {
    id: 'beauvais',
    name: 'Paris ↔ Beauvais',
    subtitle: 'Aéroport de Beauvais',
    dayPrice: '130€',
    nightPrice: '150€',
    dayHours: 'Jour (6h-22h)',
    nightHours: 'Nuit (22h-6h)',
    icon: 'airport',
    features: [
      '1 à 3 passagers',
      '2 valises de taille standard',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min'
    ]
  }
];

// Forfaits Gares
export const STATION_PACKAGES: StationPrice[] = [
  { name: 'Gare du Nord', price: '45€' },
  { name: 'Gare de Lyon', price: '45€' },
  { name: 'Gare Montparnasse', price: '45€' },
  { name: "Gare de l'Est", price: '45€' },
  { name: 'Gare Saint-Lazare', price: '45€' },
  { name: "Gare d'Austerlitz", price: '45€' }
];

export const STATION_NOTE = "Ces tarifs s'appliquent pour des trajets depuis/vers Paris intra-muros. Pour les destinations en banlieue, contactez-nous pour un devis personnalisé.";

// Mise à Disposition
export const AVAILABILITY_PACKAGES: PriceCard[] = [
  {
    id: 'hourly',
    name: "À l'heure",
    subtitle: '1 heure',
    dayPrice: '45€',
    nightPrice: '',
    dayHours: 'Par heure',
    nightHours: '',
    icon: 'clock',
    features: [
      'Max 20 km par heure',
      'Chauffeur à disposition',
      'Trajets multiples possibles'
    ]
  },
  {
    id: 'half-day',
    name: 'Demi-Journée',
    subtitle: '4 heures',
    dayPrice: '160€',
    nightPrice: '',
    dayHours: '40€/heure',
    nightHours: '80 km max (4h)',
    icon: 'sun',
    isPopular: true,
    features: [
      '4 heures continues',
      'Chauffeur à disposition',
      'Idéal pour réunions'
    ]
  },
  {
    id: 'full-day',
    name: 'Journée',
    subtitle: '8 heures',
    dayPrice: '280€',
    nightPrice: '',
    dayHours: '8 heures',
    nightHours: 'Km à définir',
    icon: 'star',
    features: [
      '8 heures continues',
      'Chauffeur à disposition',
      'Parfait pour événements'
    ]
  }
];

// Options Supplémentaires
export const ADDITIONAL_OPTIONS: Option[] = [
  {
    id: 'child-seat',
    name: 'Siège enfant',
    price: '5€',
    description: 'Par siège',
    icon: 'child'
  },
  {
    id: 'extra-waiting',
    name: 'Attente supplémentaire',
    price: '15€',
    description: 'Par tranche de 20 min (après 10 min)',
    icon: 'clock'
  },
  {
    id: 'extra-luggage',
    name: 'Bagages',
    price: 'Inclus',
    description: '2 valises de taille standard',
    icon: 'luggage'
  },
  {
    id: 'extra-passenger',
    name: 'Passagers',
    price: 'Inclus',
    description: 'Maximum 3 personnes',
    icon: 'passenger'
  }
];

// Inclus dans tous nos tarifs
export const INCLUDED_FEATURES: IncludedFeature[] = [
  {
    title: 'Véhicule Premium',
    description: 'Berline récente, climatisée et entretenue'
  },
  {
    title: 'Chauffeur Professionnel',
    description: 'Expérimenté, courtois et discret'
  },
  {
    title: 'Eau & Chargeurs',
    description: "Bouteilles d'eau et chargeurs USB/Lightning"
  },
  {
    title: 'Wi-Fi à bord',
    description: 'Connexion internet haut débit'
  },
  {
    title: 'Tous frais inclus',
    description: 'Autoroute, stationnement, carburant'
  },
  {
    title: 'Annulation flexible',
    description: "Gratuite jusqu'à 24h avant"
  }
];

// Metadata
export const PRICING_METADATA = {
  title: 'Nos Tarifs | VTC Rachel',
  description: 'Découvrez nos tarifs transparents pour vos courses VTC en Île-de-France : forfaits aéroports, mise à disposition, trajets longue distance.',
  sectionTitles: {
    airports: 'Forfaits Aéroports',
    airportsSubtitle: 'Tarifs fixes depuis ou vers les aéroports parisiens, valables pour 1 à 3 passagers',
    stations: 'Forfaits Gares Parisiennes',
    stationsSubtitle: 'Transferts depuis ou vers les principales gares de Paris',
    availability: 'Mise à Disposition',
    availabilitySubtitle: "Pour vos événements, réunions d'affaires ou journées shopping",
    options: 'Options & Suppléments',
    included: 'Inclus dans Tous nos Tarifs'
  }
};
