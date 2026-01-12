/**
 * Features Data - Données des fonctionnalités/avantages VTC Rachel
 * 
 * Liste des 3 arguments clés "Pourquoi choisir VTC Rachel"
 * utilisés sur la landing page.
 */

export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: 'chauffeur-certifie',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path d="M32 12L36 24L48 26L40 34L42 46L32 40L22 46L24 34L16 26L28 24L32 12Z" fill="var(--forest-green)" />
      </svg>
    ),
    title: 'Chauffeur certifié et expérimenté',
    description: '5 ans d\'expérience, formation continue, connaissance parfaite de l\'Île-de-France',
  },
  {
    id: 'service-personnalise',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#FFF9E6" />
        <path d="M32 18C25.4 18 20 23.4 20 30C20 38 32 50 32 50C32 50 44 38 44 30C44 23.4 38.6 18 32 18ZM32 34C29.8 34 28 32.2 28 30C28 27.8 29.8 26 32 26C34.2 26 36 27.8 36 30C36 32.2 34.2 34 32 34Z" fill="var(--gold-champagne)" />
      </svg>
    ),
    title: 'Service personnalisé',
    description: 'Accueil sur-mesure, préférences mémorisées, attention aux détails',
  },
  {
    id: 'specialiste-aeroports',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path d="M32 16L26 22V28L20 32L26 36V42L32 48L38 42V36L44 32L38 28V22L32 16ZM32 26L36 30H38V34L32 38L26 34V30H28L32 26Z" fill="var(--forest-green)" />
      </svg>
    ),
    title: 'Spécialiste des aéroports',
    description: 'Suivi des vols en temps réel, aide aux bagages, connaissance des terminaux',
  },
];
