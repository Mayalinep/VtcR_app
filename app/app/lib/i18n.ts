/**
 * i18n - Coeur du systeme de traduction (FR/EN/ES)
 *
 * - Les pages legales (CGV, Mentions legales, Confidentialite) restent en FR.
 * - Les pages UI (Accueil, Tarifs, Prestations, Contact, FAQ) sont traduites.
 */

export const SUPPORTED_LOCALES = ['fr', 'en', 'es'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'fr';

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export const NAV_TRANSLATIONS: Record<
  AppLocale,
  {
    tarifs: string;
    about: string;
    services: string;
    contact: string;
    faq: string;
    login: string;
    signup: string;
  }
> = {
  fr: {
    tarifs: 'Tarifs',
    about: 'À propos',
    services: 'Nos prestations',
    contact: 'Contact',
    faq: 'FAQ',
    login: 'Connexion',
    signup: 'Inscription',
  },
  en: {
    tarifs: 'Pricing',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    faq: 'FAQ',
    login: 'Log in',
    signup: 'Sign up',
  },
  es: {
    tarifs: 'Tarifas',
    about: 'Nosotros',
    services: 'Servicios',
    contact: 'Contacto',
    faq: 'FAQ',
    login: 'Acceder',
    signup: 'Registrarse',
  },
};

export const LANGUAGE_OPTIONS: Array<{ locale: AppLocale; label: string; icon: string }> = [
  { locale: 'fr', label: 'Francais', icon: '🇫🇷' },
  { locale: 'en', label: 'English', icon: '🇬🇧' },
  { locale: 'es', label: 'Espanol', icon: '🇪🇸' },
];

// -----------------------------------------------------------------------------
// Common (boutons, actions partagees)
// -----------------------------------------------------------------------------

export const COMMON_TRANSLATIONS: Record<
  AppLocale,
  {
    bookNow: string;
    learnMore: string;
    contactUs: string;
    readMore: string;
    legalInFrenchNotice: string;
  }
> = {
  fr: {
    bookNow: 'Réserver maintenant',
    learnMore: 'En savoir plus',
    contactUs: 'Nous contacter',
    readMore: 'En savoir plus',
    legalInFrenchNotice: 'Les documents légaux sont disponibles uniquement en français.',
  },
  en: {
    bookNow: 'Book now',
    learnMore: 'Learn more',
    contactUs: 'Contact us',
    readMore: 'Learn more',
    legalInFrenchNotice: 'Legal documents are only available in French.',
  },
  es: {
    bookNow: 'Reservar ahora',
    learnMore: 'Saber más',
    contactUs: 'Contáctanos',
    readMore: 'Saber más',
    legalInFrenchNotice: 'Los documentos legales solo están disponibles en francés.',
  },
};

// -----------------------------------------------------------------------------
// Home page
// -----------------------------------------------------------------------------

export type HomeTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  bookingTitle: string;
  bookingSubtitle: string;
  whyChooseTitle: string;
  whyChooseHighlight: string;
  whyChooseSubtitle: string;
  testimonialsBadge: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  zonesTitle: string;
  zonesDescription: string;
  zonesAdditional: string;
  zones: string[];
  ctaTitle: string;
  ctaDescription: string;
  features: Array<{ id: string; title: string; description: string }>;
};

export const HOME_TRANSLATIONS: Record<AppLocale, HomeTranslations> = {
  fr: {
    heroBadge: '🏆 Service Premium Île-de-France',
    heroTitleLine1: 'Votre chauffeur',
    heroTitleLine2: 'de confiance',
    heroDescription:
      'Réservez votre course VTC en quelques clics. Service professionnel, confort premium, tarifs transparents.',
    bookingTitle: 'Réservez votre course',
    bookingSubtitle: 'Tarif instantané • Réservation en 2 clics',
    whyChooseTitle: 'Pourquoi choisir',
    whyChooseHighlight: 'VTC Rachel',
    whyChooseSubtitle: 'Votre confort et votre sérénité au cœur de chaque trajet',
    testimonialsBadge: 'Ils nous font confiance',
    testimonialsTitle: 'Ce que disent nos clients',
    testimonialsSubtitle: 'Plus de 500 clients satisfaits en Île-de-France',
    zonesTitle: 'Zones desservies',
    zonesDescription:
      "Nous couvrons l'ensemble de l'Île-de-France et proposons aussi des trajets vers d'autres villes en France",
    zonesAdditional: "Et bien d'autres destinations en France, sur demande",
    zones: [
      'Paris intra-muros',
      'Aéroport CDG',
      'Aéroport Orly',
      'La Défense',
      'Versailles',
      'Saint-Denis',
      'Neuilly',
      'Boulogne',
    ],
    ctaTitle: 'Prêt à réserver votre course ?',
    ctaDescription: "Profitez d'un service de qualité avec un chauffeur professionnel",
    features: [
      {
        id: 'chauffeur-certifie',
        title: 'Chauffeur certifié et expérimenté',
        description:
          "5 ans d'expérience, formation continue, connaissance parfaite de l'Île-de-France",
      },
      {
        id: 'service-personnalise',
        title: 'Service personnalisé',
        description:
          'Accueil sur-mesure, préférences mémorisées, attention aux détails',
      },
      {
        id: 'specialiste-aeroports',
        title: 'Spécialiste des aéroports',
        description:
          'Suivi des vols en temps réel, aide aux bagages, connaissance des terminaux',
      },
    ],
  },
  en: {
    heroBadge: '🏆 Premium Service — Greater Paris',
    heroTitleLine1: 'Your trusted',
    heroTitleLine2: 'private driver',
    heroDescription:
      'Book your ride in a few clicks. Professional service, premium comfort, transparent pricing.',
    bookingTitle: 'Book your ride',
    bookingSubtitle: 'Instant quote • 2-click booking',
    whyChooseTitle: 'Why choose',
    whyChooseHighlight: 'VTC Rachel',
    whyChooseSubtitle: 'Your comfort and peace of mind at the heart of every trip',
    testimonialsBadge: 'They trust us',
    testimonialsTitle: 'What our clients say',
    testimonialsSubtitle: 'Over 500 happy clients across the Paris region',
    zonesTitle: 'Service area',
    zonesDescription:
      'We cover the entire Paris region (Île-de-France) and also offer rides to other cities across France.',
    zonesAdditional: 'And many more destinations across France, on request',
    zones: [
      'Central Paris',
      'CDG Airport',
      'Orly Airport',
      'La Défense',
      'Versailles',
      'Saint-Denis',
      'Neuilly',
      'Boulogne',
    ],
    ctaTitle: 'Ready to book your ride?',
    ctaDescription: 'Enjoy a quality service with a professional driver',
    features: [
      {
        id: 'chauffeur-certifie',
        title: 'Certified & experienced driver',
        description:
          '5 years of experience, continuous training, deep knowledge of the Paris region',
      },
      {
        id: 'service-personnalise',
        title: 'Personalised service',
        description: 'Tailored welcome, saved preferences, attention to detail',
      },
      {
        id: 'specialiste-aeroports',
        title: 'Airport specialist',
        description:
          'Real-time flight tracking, luggage assistance, terminal expertise',
      },
    ],
  },
  es: {
    heroBadge: '🏆 Servicio Premium — Región de París',
    heroTitleLine1: 'Tu chófer',
    heroTitleLine2: 'de confianza',
    heroDescription:
      'Reserva tu trayecto en unos clics. Servicio profesional, confort premium, tarifas transparentes.',
    bookingTitle: 'Reserva tu trayecto',
    bookingSubtitle: 'Tarifa instantánea • Reserva en 2 clics',
    whyChooseTitle: 'Por qué elegir',
    whyChooseHighlight: 'VTC Rachel',
    whyChooseSubtitle: 'Tu confort y tranquilidad en el centro de cada trayecto',
    testimonialsBadge: 'Confían en nosotros',
    testimonialsTitle: 'Lo que dicen nuestros clientes',
    testimonialsSubtitle: 'Más de 500 clientes satisfechos en la región de París',
    zonesTitle: 'Zonas cubiertas',
    zonesDescription:
      'Cubrimos toda la región de París (Île-de-France) y también ofrecemos trayectos a otras ciudades de Francia.',
    zonesAdditional: 'Y muchos otros destinos en Francia, bajo petición',
    zones: [
      'París centro',
      'Aeropuerto CDG',
      'Aeropuerto Orly',
      'La Défense',
      'Versailles',
      'Saint-Denis',
      'Neuilly',
      'Boulogne',
    ],
    ctaTitle: '¿Listo para reservar tu trayecto?',
    ctaDescription: 'Disfruta de un servicio de calidad con un chófer profesional',
    features: [
      {
        id: 'chauffeur-certifie',
        title: 'Chófer certificado y experimentado',
        description:
          '5 años de experiencia, formación continua, conocimiento perfecto de la región de París',
      },
      {
        id: 'service-personnalise',
        title: 'Servicio personalizado',
        description:
          'Bienvenida a medida, preferencias memorizadas, atención al detalle',
      },
      {
        id: 'specialiste-aeroports',
        title: 'Especialista en aeropuertos',
        description:
          'Seguimiento de vuelos en tiempo real, ayuda con el equipaje, conocimiento de las terminales',
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// Price Estimator (Home form)
// -----------------------------------------------------------------------------

export const PRICE_ESTIMATOR_TRANSLATIONS: Record<
  AppLocale,
  {
    departurePlaceholder: string;
    destinationPlaceholder: string;
    calculating: string;
    estimatedLabel: string;
    priceNotice: string;
    seePrices: string;
    editRoute: string;
    disclaimer: string;
    calculationError: string;
  }
> = {
  fr: {
    departurePlaceholder: 'Adresse de départ',
    destinationPlaceholder: 'Destination',
    calculating: 'Calcul en cours...',
    estimatedLabel: 'Tarif estimé',
    priceNotice: 'Prix indicatif toutes taxes comprises',
    seePrices: 'Voir les prix',
    editRoute: 'Modifier le trajet',
    disclaimer: "Sans engagement • Annulation gratuite jusqu'à 2h avant",
    calculationError: 'Impossible de calculer le prix. Vérifiez les adresses et réessayez.',
  },
  en: {
    departurePlaceholder: 'Pickup address',
    destinationPlaceholder: 'Destination',
    calculating: 'Calculating...',
    estimatedLabel: 'Estimated fare',
    priceNotice: 'Indicative price, all taxes included',
    seePrices: 'See prices',
    editRoute: 'Edit route',
    disclaimer: 'No commitment • Free cancellation up to 2h before',
    calculationError: 'Unable to calculate fare. Check addresses and try again.',
  },
  es: {
    departurePlaceholder: 'Dirección de origen',
    destinationPlaceholder: 'Destino',
    calculating: 'Calculando...',
    estimatedLabel: 'Tarifa estimada',
    priceNotice: 'Precio indicativo, impuestos incluidos',
    seePrices: 'Ver precios',
    editRoute: 'Editar trayecto',
    disclaimer: 'Sin compromiso • Cancelación gratuita hasta 2 h antes',
    calculationError: 'No se puede calcular la tarifa. Verifica las direcciones e inténtalo de nuevo.',
  },
};

// -----------------------------------------------------------------------------
// Hero scroll indicator
// -----------------------------------------------------------------------------

export const HERO_SCROLL_TRANSLATIONS: Record<AppLocale, { discover: string }> = {
  fr: { discover: 'Découvrez nos services' },
  en: { discover: 'Discover our services' },
  es: { discover: 'Descubre nuestros servicios' },
};

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

export const FOOTER_TRANSLATIONS: Record<
  AppLocale,
  {
    tagline: string;
    navTitle: string;
    legalTitle: string;
    contactTitle: string;
    rights: string;
    legalNotice: string;
    cgv: string;
    mentionsLegales: string;
    confidentialite: string;
    legalOnlyInFrench: string;
  }
> = {
  fr: {
    tagline: 'Votre service VTC premium en Île-de-France',
    navTitle: 'Navigation',
    legalTitle: 'Légal',
    contactTitle: 'Contact',
    rights: 'Tous droits réservés',
    legalNotice: 'Documents légaux disponibles uniquement en français',
    cgv: 'CGV',
    mentionsLegales: 'Mentions légales',
    confidentialite: 'Confidentialité',
    legalOnlyInFrench: 'Documents légaux en français uniquement',
  },
  en: {
    tagline: 'Your premium private-driver service in the Paris region',
    navTitle: 'Navigation',
    legalTitle: 'Legal',
    contactTitle: 'Contact',
    rights: 'All rights reserved',
    legalNotice: 'Legal documents available in French only',
    cgv: 'Terms of sale (FR)',
    mentionsLegales: 'Legal notice (FR)',
    confidentialite: 'Privacy (FR)',
    legalOnlyInFrench: 'Legal documents in French only',
  },
  es: {
    tagline: 'Tu servicio VTC premium en la región de París',
    navTitle: 'Navegación',
    legalTitle: 'Legal',
    contactTitle: 'Contacto',
    rights: 'Todos los derechos reservados',
    legalNotice: 'Documentos legales disponibles solo en francés',
    cgv: 'Condiciones (FR)',
    mentionsLegales: 'Aviso legal (FR)',
    confidentialite: 'Privacidad (FR)',
    legalOnlyInFrench: 'Documentos legales solo en francés',
  },
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getLocaleFromPath(pathname: string): AppLocale {
  const locale = pathname.split('/').filter(Boolean)[0];
  if (SUPPORTED_LOCALES.includes(locale as AppLocale)) {
    return locale as AppLocale;
  }
  return DEFAULT_LOCALE;
}

export function isSupportedLocale(value: string | undefined | null): value is AppLocale {
  return !!value && SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as AppLocale)) {
    return `/${segments.slice(1).join('/')}`;
  }
  return pathname || '/';
}

export function localizeHref(href: string, locale: AppLocale): string {
  if (
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('#')
  ) {
    return href;
  }

  const normalized = href.startsWith('/') ? href : `/${href}`;
  const pathWithoutLocale = stripLocale(normalized);
  if (pathWithoutLocale === '/' || pathWithoutLocale === '') {
    return `/${locale}`;
  }
  return `/${locale}${pathWithoutLocale}`;
}

export function switchLocalePath(pathname: string, nextLocale: AppLocale): string {
  const stripped = stripLocale(pathname);
  if (!stripped || stripped === '/') return `/${nextLocale}`;
  return `/${nextLocale}${stripped}`;
}
