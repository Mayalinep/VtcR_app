/**
 * Constants - Constantes globales de l'application
 * 
 * Source unique de vérité pour toutes les constantes (branding, contact, animations, couleurs...)
 */

// Informations de marque
export const BRAND = {
  name: 'VTC Rachel',
  tagline: 'Service VTC premium en Île-de-France',
  slogan: 'Votre confort, notre priorité',
  description: 'Service de transport VTC haut de gamme en Île-de-France. Professionnalisme, ponctualité et discrétion garantis.',
} as const;

// Coordonnées de contact
export const CONTACT = {
  email: 'contact@vtc-rachel.fr',
  phone: '+33 6 61 59 02 90',
  phoneDisplay: '06 61 59 02 90',
  address: 'Île-de-France',
  availability: '24h/24, 7j/7',
} as const;

// Réseaux sociaux (à compléter si besoin)
export const SOCIAL = {
  facebook: '#',
  instagram: '#',
  linkedin: '#',
  twitter: '#',
} as const;

// Couleurs du thème (cohérence avec globals.css)
export const COLORS = {
  forestGreen: '#0F4C3A',
  forestGreenLight: '#16A34A',
  forestGreenDark: '#0A3428',
  goldChampagne: '#D4AF37',
  goldLight: '#F5E6D3',
  goldDark: '#B8941F',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

// Délais d'animation (en secondes)
export const ANIMATION_DELAYS = {
  badge: 0.4,
  title: 0.7,
  description: 1.0,
  cta: 1.3,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

// Durées d'animation (en secondes)
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  xslow: 0.8,
} as const;

// Breakpoints responsive (cohérence avec Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Routes de navigation
export const ROUTES = {
  home: '/',
  tarifs: '/tarifs',
  about: '/a-propos',
  contact: '/contact',
  faq: '/faq',
  cgv: '/cgv',
  mentions: '/mentions-legales',
  privacy: '/confidentialite',
} as const;

// Labels de navigation
export const NAV_LABELS = {
  home: 'Accueil',
  tarifs: 'Tarifs',
  about: 'À propos',
  contact: 'Contact',
  faq: 'FAQ',
  booking: 'Réserver',
} as const;

// Paramètres business
export const BUSINESS = {
  currency: '€',
  locale: 'fr-FR',
  timezone: 'Europe/Paris',
  maxPassengers: 4,
  maxLuggage: 3,
  maxCabinBaggage: 3,
  freeWaitTimeMinutes: 45, // Temps d'attente gratuit aéroport
  cancelationFreeHours: 12, // Annulation gratuite jusqu'à X heures avant
  modificationFreeHours: 4, // Modification gratuite jusqu'à X heures avant
} as const;

// Zones de service
export const SERVICE_ZONES = {
  paris: 'Paris intra-muros',
  petiteCouronne: 'Petite couronne (92, 93, 94)',
  grandeCouronne: 'Grande couronne (77, 78, 91, 95)',
  ileDeFrance: 'Île-de-France',
  airports: 'Aéroports (CDG, Orly, Beauvais)',
} as const;

// Horaires de service
export const SERVICE_HOURS = {
  dayStart: '6:00',
  dayEnd: '22:00',
  nightStart: '22:00',
  nightEnd: '6:00',
} as const;

// Messages d'erreur communs
export const ERROR_MESSAGES = {
  required: 'Ce champ est obligatoire',
  invalidEmail: 'Adresse email invalide',
  invalidPhone: 'Numéro de téléphone invalide',
  minLength: (min: number) => `Minimum ${min} caractères requis`,
  maxLength: (max: number) => `Maximum ${max} caractères autorisés`,
  networkError: 'Erreur de connexion. Veuillez réessayer.',
  serverError: 'Une erreur est survenue. Veuillez réessayer plus tard.',
} as const;

// Messages de succès communs
export const SUCCESS_MESSAGES = {
  contactSent: 'Votre message a été envoyé avec succès !',
  bookingSent: 'Votre demande de réservation a été envoyée !',
  subscribed: 'Merci pour votre inscription !',
} as const;

// Configuration SEO par défaut
export const SEO_DEFAULTS = {
  siteName: 'VTC Rachel',
  siteUrl: 'https://vtc-rachel.fr',
  twitterHandle: '@vtcrachel',
  defaultImage: '/images/og-default.jpg',
  locale: 'fr_FR',
} as const;
