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
// Tarifs page
// -----------------------------------------------------------------------------

export type TarifsTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  airportsSectionTitle: string;
  airportsSectionSubtitle: string;
  airportSubtitles: { cdg: string; orly: string; beauvais: string };
  fromPrefix: string;
  priceIndicative: string;
  dayLabel: string;
  nightLabel: string;
  popularBadge: string;
  bookButton: string;
  airportFeatures: string[];
  availabilitySectionTitle: string;
  availabilitySectionSubtitle: string;
  bestValueBadge: string;
  availabilityCards: Array<{ title: string; duration: string; rateLabel: string; kmBadge?: string; features: string[] }>;
  optionsSectionTitle: string;
  optionsSectionSubtitle: string;
  paidOptionsTitle: string;
  onDemandBadge: string;
  childSeat: { title: string; perLabel: string };
  extraWait: { title: string; perLabel: string };
  includedTitle: string;
  includedItems: Array<{ title: string; description: string }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const TARIFS_TRANSLATIONS: Record<AppLocale, TarifsTranslations> = {
  fr: {
    heroBadge: 'Tarification transparente',
    heroTitleLine1: 'Nos',
    heroTitleLine2: 'Tarifs',
    heroDescription: "Prix fixes, pas de surprise. Tous nos tarifs incluent les frais d'approche, d'autoroute et de stationnement",
    airportsSectionTitle: 'Forfaits Aéroports',
    airportsSectionSubtitle: 'Tarifs fixes depuis ou vers les aéroports parisiens, valables pour 1 à 3 passagers',
    airportSubtitles: { cdg: 'Aéroport Charles de Gaulle', orly: "Aéroport d'Orly", beauvais: 'Aéroport de Beauvais' },
    fromPrefix: 'À partir de',
    priceIndicative: 'Prix indicatif selon les conditions de circulation',
    dayLabel: 'Jour (6h-22h)',
    nightLabel: 'Nuit (22h-6h)',
    popularBadge: 'POPULAIRE',
    bookButton: 'Réserver',
    airportFeatures: [
      '1 à 3 passagers',
      '2 valises de taille standard',
      'Accueil personnalisé avec pancarte',
      'Suivi du vol en temps réel',
      'Attente gratuite : 45 min',
    ],
    availabilitySectionTitle: 'Mise à Disposition',
    availabilitySectionSubtitle: "Pour vos événements, réunions d'affaires ou journées shopping",
    bestValueBadge: 'MEILLEURE VALEUR',
    availabilityCards: [
      {
        title: "À l'heure",
        duration: '1 heure',
        rateLabel: 'Par heure',
        features: ['Max 20 km par heure', 'Chauffeur à disposition', 'Trajets multiples possibles'],
      },
      {
        title: 'Demi-Journée',
        duration: '4 heures',
        rateLabel: '40€/heure',
        kmBadge: '80 km max',
        features: ['4 heures continues', 'Chauffeur à disposition', 'Idéal pour réunions'],
      },
      {
        title: 'Journée',
        duration: '8 heures',
        rateLabel: '35€/heure',
        features: ['8 heures continues', 'Chauffeur à disposition', 'Parfait pour événements'],
      },
    ],
    optionsSectionTitle: 'Conditions tarifaires',
    optionsSectionSubtitle: 'Les options pouvant entraîner une facturation supplémentaire.',
    paidOptionsTitle: 'Options payantes',
    onDemandBadge: 'Selon besoin',
    childSeat: { title: 'Siège enfant', perLabel: 'Par siège' },
    extraWait: { title: 'Attente supplémentaire', perLabel: 'Par tranche de 20 min (après 10 min)' },
    includedTitle: 'Inclus dans Tous nos Tarifs',
    includedItems: [
      { title: 'Véhicule Premium', description: 'Berline récente, climatisée et entretenue' },
      { title: 'Chauffeur Professionnel', description: 'Expérimenté, courtois et discret' },
      { title: 'Eau & Chargeurs', description: "Bouteilles d'eau et chargeurs USB/Lightning" },
      { title: 'Wi-Fi à bord', description: 'Connexion internet haut débit' },
      { title: 'Tous frais inclus', description: 'Autoroute, stationnement, carburant' },
      { title: 'Annulation flexible', description: "Gratuite jusqu'à 24h avant" },
    ],
    ctaTitle: "Besoin d'un Devis Personnalisé ?",
    ctaDescription: 'Contactez-nous pour obtenir un tarif adapté à vos besoins spécifiques',
    ctaPrimary: 'Réserver maintenant',
    ctaSecondary: 'Demander un devis',
  },
  en: {
    heroBadge: 'Transparent pricing',
    heroTitleLine1: 'Our',
    heroTitleLine2: 'Rates',
    heroDescription: 'Fixed prices, no surprises. All fares include approach, motorway and parking fees',
    airportsSectionTitle: 'Airport Packages',
    airportsSectionSubtitle: 'Fixed fares to or from Paris airports, for 1 to 3 passengers',
    airportSubtitles: { cdg: 'Charles de Gaulle Airport', orly: 'Orly Airport', beauvais: 'Beauvais Airport' },
    fromPrefix: 'From',
    priceIndicative: 'Indicative price depending on traffic conditions',
    dayLabel: 'Day (6am–10pm)',
    nightLabel: 'Night (10pm–6am)',
    popularBadge: 'POPULAR',
    bookButton: 'Book',
    airportFeatures: [
      '1 to 3 passengers',
      '2 standard-size suitcases',
      'Personalised welcome with nameplate',
      'Real-time flight tracking',
      'Free waiting time: 45 min',
    ],
    availabilitySectionTitle: 'Chauffeur on Demand',
    availabilitySectionSubtitle: 'For your events, business meetings or shopping days',
    bestValueBadge: 'BEST VALUE',
    availabilityCards: [
      {
        title: 'Hourly',
        duration: '1 hour',
        rateLabel: 'Per hour',
        features: ['Max 20 km per hour', 'Driver at your disposal', 'Multiple stops possible'],
      },
      {
        title: 'Half-Day',
        duration: '4 hours',
        rateLabel: '€40/hour',
        kmBadge: '80 km max',
        features: ['4 consecutive hours', 'Driver at your disposal', 'Ideal for meetings'],
      },
      {
        title: 'Full Day',
        duration: '8 hours',
        rateLabel: '€35/hour',
        features: ['8 consecutive hours', 'Driver at your disposal', 'Perfect for events'],
      },
    ],
    optionsSectionTitle: 'Pricing conditions',
    optionsSectionSubtitle: 'Options that may result in an additional charge.',
    paidOptionsTitle: 'Paid options',
    onDemandBadge: 'On request',
    childSeat: { title: 'Child seat', perLabel: 'Per seat' },
    extraWait: { title: 'Extra waiting time', perLabel: 'Per 20-min block (after 10 min)' },
    includedTitle: 'Included in All Our Fares',
    includedItems: [
      { title: 'Premium Vehicle', description: 'Recent, air-conditioned and well-maintained saloon' },
      { title: 'Professional Driver', description: 'Experienced, courteous and discreet' },
      { title: 'Water & Chargers', description: 'Water bottles and USB/Lightning chargers' },
      { title: 'On-board Wi-Fi', description: 'High-speed internet connection' },
      { title: 'All fees included', description: 'Motorway, parking, fuel' },
      { title: 'Flexible cancellation', description: 'Free up to 24h before' },
    ],
    ctaTitle: 'Need a Custom Quote?',
    ctaDescription: 'Contact us for a fare tailored to your specific needs',
    ctaPrimary: 'Book now',
    ctaSecondary: 'Request a quote',
  },
  es: {
    heroBadge: 'Tarifas transparentes',
    heroTitleLine1: 'Nuestras',
    heroTitleLine2: 'Tarifas',
    heroDescription: 'Precios fijos, sin sorpresas. Todas nuestras tarifas incluyen los gastos de aproximación, autopista y aparcamiento',
    airportsSectionTitle: 'Paquetes Aeropuerto',
    airportsSectionSubtitle: 'Tarifas fijas desde o hacia los aeropuertos de París, válidas para 1 a 3 pasajeros',
    airportSubtitles: { cdg: 'Aeropuerto Charles de Gaulle', orly: 'Aeropuerto de Orly', beauvais: 'Aeropuerto de Beauvais' },
    fromPrefix: 'Desde',
    priceIndicative: 'Precio indicativo según las condiciones de tráfico',
    dayLabel: 'Día (6h-22h)',
    nightLabel: 'Noche (22h-6h)',
    popularBadge: 'POPULAR',
    bookButton: 'Reservar',
    airportFeatures: [
      '1 a 3 pasajeros',
      '2 maletas de tamaño estándar',
      'Bienvenida personalizada con cartel',
      'Seguimiento del vuelo en tiempo real',
      'Espera gratuita: 45 min',
    ],
    availabilitySectionTitle: 'Chófer a Disposición',
    availabilitySectionSubtitle: 'Para sus eventos, reuniones de negocios o jornadas de compras',
    bestValueBadge: 'MEJOR VALOR',
    availabilityCards: [
      {
        title: 'Por hora',
        duration: '1 hora',
        rateLabel: 'Por hora',
        features: ['Máx. 20 km por hora', 'Chófer a disposición', 'Múltiples paradas posibles'],
      },
      {
        title: 'Media jornada',
        duration: '4 horas',
        rateLabel: '40€/hora',
        kmBadge: '80 km máx.',
        features: ['4 horas consecutivas', 'Chófer a disposición', 'Ideal para reuniones'],
      },
      {
        title: 'Jornada completa',
        duration: '8 horas',
        rateLabel: '35€/hora',
        features: ['8 horas consecutivas', 'Chófer a disposición', 'Perfecto para eventos'],
      },
    ],
    optionsSectionTitle: 'Condiciones tarifarias',
    optionsSectionSubtitle: 'Opciones que pueden generar una facturación adicional.',
    paidOptionsTitle: 'Opciones de pago',
    onDemandBadge: 'Según necesidad',
    childSeat: { title: 'Silla infantil', perLabel: 'Por asiento' },
    extraWait: { title: 'Espera adicional', perLabel: 'Por tramo de 20 min (después de 10 min)' },
    includedTitle: 'Incluido en Todas Nuestras Tarifas',
    includedItems: [
      { title: 'Vehículo Premium', description: 'Berlina reciente, climatizada y mantenida' },
      { title: 'Chófer Profesional', description: 'Experimentado, cortés y discreto' },
      { title: 'Agua y Cargadores', description: 'Botellas de agua y cargadores USB/Lightning' },
      { title: 'Wi-Fi a bordo', description: 'Conexión a internet de alta velocidad' },
      { title: 'Todos los gastos incluidos', description: 'Autopista, aparcamiento, combustible' },
      { title: 'Cancelación flexible', description: 'Gratuita hasta 24 h antes' },
    ],
    ctaTitle: '¿Necesita un Presupuesto Personalizado?',
    ctaDescription: 'Contáctenos para obtener una tarifa adaptada a sus necesidades específicas',
    ctaPrimary: 'Reservar ahora',
    ctaSecondary: 'Solicitar presupuesto',
  },
};

// -----------------------------------------------------------------------------
// Contact page
// -----------------------------------------------------------------------------

export type ContactTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  formTitle: string;
  formSubtitle: string;
  phone: { title: string; availability: string };
  email: { title: string; responseTime: string };
  address: { title: string; area: string; airports: string };
  hours: { title: string; schedule: string; days: string };
  mapTitle: string;
  mapSubtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const CONTACT_TRANSLATIONS: Record<AppLocale, ContactTranslations> = {
  fr: {
    heroBadge: 'Nous sommes à votre écoute',
    heroTitleLine1: 'Contactez',
    heroTitleLine2: 'VTC Rachel',
    heroDescription: 'Une question ? Un devis personnalisé ? Notre équipe vous répond rapidement',
    formTitle: 'Envoyez-nous un message',
    formSubtitle: 'Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais',
    phone: { title: 'Téléphone', availability: 'Disponible 7j/7, 24h/24' },
    email: { title: 'Email', responseTime: 'Réponse sous 24h' },
    address: { title: 'Zone de service', area: 'Paris et Île-de-France', airports: 'Aéroports CDG & Orly' },
    hours: { title: 'Disponibilité', schedule: 'Service 24h/24', days: '7 jours sur 7, week-ends et jours fériés' },
    mapTitle: 'Notre zone de service',
    mapSubtitle: "Nous couvrons l'ensemble de l'Île-de-France",
    ctaTitle: "Besoin d'une course immédiate ?",
    ctaDescription: 'Appelez-nous directement pour une réservation rapide',
    ctaPrimary: 'Appeler maintenant',
    ctaSecondary: 'Réserver en ligne',
  },
  en: {
    heroBadge: 'We are here for you',
    heroTitleLine1: 'Contact',
    heroTitleLine2: 'VTC Rachel',
    heroDescription: 'A question? A custom quote? Our team replies quickly',
    formTitle: 'Send us a message',
    formSubtitle: 'Fill in this form and we will get back to you as soon as possible',
    phone: { title: 'Phone', availability: 'Available 7 days a week, 24/7' },
    email: { title: 'Email', responseTime: 'Response within 24h' },
    address: { title: 'Service area', area: 'Paris & Île-de-France', airports: 'CDG & Orly Airports' },
    hours: { title: 'Availability', schedule: '24/7 service', days: '7 days a week, weekends and public holidays' },
    mapTitle: 'Our service area',
    mapSubtitle: 'We cover the entire Île-de-France region',
    ctaTitle: 'Need an immediate ride?',
    ctaDescription: 'Call us directly for a quick booking',
    ctaPrimary: 'Call now',
    ctaSecondary: 'Book online',
  },
  es: {
    heroBadge: 'Estamos aquí para usted',
    heroTitleLine1: 'Contacte con',
    heroTitleLine2: 'VTC Rachel',
    heroDescription: '¿Una pregunta? ¿Un presupuesto personalizado? Nuestro equipo le responde rápidamente',
    formTitle: 'Envíenos un mensaje',
    formSubtitle: 'Rellene este formulario y le responderemos lo antes posible',
    phone: { title: 'Teléfono', availability: 'Disponible 7 días a la semana, 24 h/24' },
    email: { title: 'Correo electrónico', responseTime: 'Respuesta en 24 h' },
    address: { title: 'Zona de servicio', area: 'París e Île-de-France', airports: 'Aeropuertos CDG y Orly' },
    hours: { title: 'Disponibilidad', schedule: 'Servicio 24 h/24', days: '7 días a la semana, fines de semana y festivos' },
    mapTitle: 'Nuestra zona de servicio',
    mapSubtitle: 'Cubrimos toda la región de Île-de-France',
    ctaTitle: '¿Necesita un trayecto inmediato?',
    ctaDescription: 'Llámenos directamente para una reserva rápida',
    ctaPrimary: 'Llamar ahora',
    ctaSecondary: 'Reservar en línea',
  },
};

// -----------------------------------------------------------------------------
// FAQ page
// -----------------------------------------------------------------------------

export type FaqPageTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const FAQ_PAGE_TRANSLATIONS: Record<AppLocale, FaqPageTranslations> = {
  fr: {
    heroBadge: "Centre d'aide",
    heroTitleLine1: 'Questions',
    heroTitleLine2: 'Fréquentes',
    heroDescription: 'Trouvez rapidement les réponses à toutes vos questions sur notre service VTC',
    ctaTitle: 'Vous ne trouvez pas la réponse ?',
    ctaDescription: 'Notre équipe est à votre disposition pour répondre à toutes vos questions',
    ctaPrimary: 'Nous contacter',
    ctaSecondary: 'Appeler maintenant',
  },
  en: {
    heroBadge: 'Help centre',
    heroTitleLine1: 'Frequently',
    heroTitleLine2: 'Asked Questions',
    heroDescription: 'Quickly find answers to all your questions about our private driver service',
    ctaTitle: "Can't find the answer?",
    ctaDescription: 'Our team is on hand to answer all your questions',
    ctaPrimary: 'Contact us',
    ctaSecondary: 'Call now',
  },
  es: {
    heroBadge: 'Centro de ayuda',
    heroTitleLine1: 'Preguntas',
    heroTitleLine2: 'Frecuentes',
    heroDescription: 'Encuentra rápidamente respuestas a todas tus preguntas sobre nuestro servicio VTC',
    ctaTitle: '¿No encuentras la respuesta?',
    ctaDescription: 'Nuestro equipo está disponible para responder todas tus preguntas',
    ctaPrimary: 'Contáctanos',
    ctaSecondary: 'Llamar ahora',
  },
};

// -----------------------------------------------------------------------------
// About page
// -----------------------------------------------------------------------------

export type AboutTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  valuesSectionTitle: string;
  valuesSectionSubtitle: string;
  values: Array<{ title: string; description: string }>;
  teamSectionTitle: string;
  teamSectionSubtitle: string;
  teamFounderBadge: string;
  teamRachelRole: string;
  teamRachelDescription: string;
  teamSoonTitle: string;
  teamSoonRole: string;
  teamSoonDescription: string;
  teamJoinTitle: string;
  teamJoinRole: string;
  teamJoinDescription: string;
  whySectionTitle: string;
  whyItems: Array<{ title: string; description: string }>;
  statsYearLabel: string;
  statsRidesLabel: string;
  statsRatingLabel: string;
  statsClientsLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
};

export const ABOUT_TRANSLATIONS: Record<AppLocale, AboutTranslations> = {
  fr: {
    heroBadge: 'Notre Histoire',
    heroTitleLine1: "L'Excellence au Service",
    heroTitleLine2: 'de Vos Déplacements',
    heroDescription: "Depuis 2020, VTC Rachel incarne l'élégance, le professionnalisme et la fiabilité dans le transport avec chauffeur en Île-de-France",
    storyTitle: 'Une Passion Devenue Métier',
    storyP1: "VTC Rachel est née de la vision de Rachel, passionnée par l'excellence du service et la satisfaction client. Après plusieurs années dans le secteur du transport premium, elle décide en 2020 de créer sa propre entreprise pour offrir une expérience VTC différente.",
    storyP2: "Notre ambition ? Allier confort haut de gamme, ponctualité irréprochable et attention personnalisée pour chaque client, que ce soit pour un trajet professionnel, un transfert aéroport ou une occasion spéciale.",
    storyP3: "Aujourd'hui, VTC Rachel continue de grandir tout en préservant ce qui fait notre force : un service humain, fiable et raffiné.",
    valuesSectionTitle: 'Nos Valeurs',
    valuesSectionSubtitle: "Les principes qui guident chacune de nos courses et définissent notre engagement envers vous",
    values: [
      { title: 'Excellence', description: "Nous visons l'excellence dans chaque détail : véhicules impeccables, conduite professionnelle et service irréprochable." },
      { title: 'Ponctualité', description: "Votre temps est précieux. Nous garantissons une ponctualité absolue pour tous vos trajets, professionnels comme personnels." },
      { title: 'Discrétion', description: "Respect de votre vie privée et confidentialité totale. Nous sommes à votre service sans jamais être intrusifs." },
      { title: 'Sécurité', description: "Votre sécurité est notre priorité absolue. Chauffeurs expérimentés, véhicules régulièrement contrôlés et assurances complètes." },
      { title: 'Convivialité', description: "Un service chaleureux et humain. Nous créons une atmosphère agréable pour que chaque trajet soit un moment plaisant." },
      { title: 'Éco-responsabilité', description: "Engagement pour des véhicules récents et moins polluants. Nous contribuons activement à une mobilité plus durable." },
    ],
    teamSectionTitle: 'Notre Équipe',
    teamSectionSubtitle: 'Des professionnels passionnés, formés et expérimentés pour vous offrir le meilleur service',
    teamFounderBadge: 'Fondatrice',
    teamRachelRole: 'Chauffeur VTC - Fondatrice',
    teamRachelDescription: "Passionnée par l'excellence du service client, Rachel garantit professionnalisme et élégance à chaque trajet.",
    teamSoonTitle: 'Bientôt',
    teamSoonRole: 'Chauffeur VTC',
    teamSoonDescription: "Nous recrutons des professionnels expérimentés partageant nos valeurs d'excellence.",
    teamJoinTitle: 'Vous ?',
    teamJoinRole: 'Chauffeur VTC',
    teamJoinDescription: "Chauffeur professionnel ? Contactez-nous pour rejoindre une équipe d'excellence.",
    whySectionTitle: 'Pourquoi Choisir VTC Rachel ?',
    whyItems: [
      { title: 'Véhicules Premium', description: "Flotte récente de véhicules haut de gamme, climatisés, équipés Wi-Fi et chargeurs. Nettoyés et désinfectés après chaque course." },
      { title: 'Tarifs Transparents', description: "Prix fixe annoncé à la réservation. Aucune surprise, aucun frais caché. Facture détaillée envoyée automatiquement." },
      { title: 'Réservation Simple', description: "Réservez en ligne 24/7 en quelques clics. Confirmation immédiate par SMS et email. Modification et annulation flexibles." },
      { title: 'Service Personnalisé', description: "Attention aux détails, écoute de vos besoins spécifiques. Trajet adapté à vos préférences (température, musique, conversation)." },
    ],
    statsYearLabel: 'Année de création',
    statsRidesLabel: 'Courses effectuées',
    statsRatingLabel: 'Note moyenne',
    statsClientsLabel: 'Clients satisfaits',
    ctaTitle: 'Prêt à Voyager avec Nous ?',
    ctaDescription: "Réservez votre prochaine course et découvrez l'expérience VTC Rachel",
    ctaPrimary: 'Réserver maintenant',
  },
  en: {
    heroBadge: 'Our Story',
    heroTitleLine1: 'Excellence at the Heart',
    heroTitleLine2: 'of Every Journey',
    heroDescription: 'Since 2020, VTC Rachel has embodied elegance, professionalism and reliability in private-driver transport across the Paris region',
    storyTitle: 'A Passion Turned Profession',
    storyP1: "VTC Rachel was born from Rachel's vision — a passion for service excellence and client satisfaction. After several years in the premium transport sector, she decided in 2020 to launch her own company to offer a different kind of private-driver experience.",
    storyP2: "Our ambition? To combine premium comfort, impeccable punctuality and personalised attention for every client — whether for a professional trip, an airport transfer or a special occasion.",
    storyP3: "Today, VTC Rachel continues to grow while preserving what makes us strong: a service that is human, reliable and refined.",
    valuesSectionTitle: 'Our Values',
    valuesSectionSubtitle: 'The principles that guide every ride and define our commitment to you',
    values: [
      { title: 'Excellence', description: 'We aim for excellence in every detail: impeccable vehicles, professional driving and flawless service.' },
      { title: 'Punctuality', description: 'Your time is precious. We guarantee absolute punctuality for all your trips, professional and personal alike.' },
      { title: 'Discretion', description: 'Respect for your privacy and complete confidentiality. We are at your service without ever being intrusive.' },
      { title: 'Safety', description: 'Your safety is our absolute priority. Experienced drivers, regularly inspected vehicles and full insurance coverage.' },
      { title: 'Friendliness', description: 'A warm and human service. We create a pleasant atmosphere so that every ride is an enjoyable moment.' },
      { title: 'Eco-responsibility', description: 'A commitment to newer, cleaner vehicles. We actively contribute to more sustainable mobility.' },
    ],
    teamSectionTitle: 'Our Team',
    teamSectionSubtitle: 'Passionate, trained and experienced professionals dedicated to offering you the best service',
    teamFounderBadge: 'Founder',
    teamRachelRole: 'Private Driver – Founder',
    teamRachelDescription: 'Driven by a passion for outstanding client service, Rachel ensures professionalism and elegance on every ride.',
    teamSoonTitle: 'Coming soon',
    teamSoonRole: 'Private Driver',
    teamSoonDescription: 'We are recruiting experienced professionals who share our values of excellence.',
    teamJoinTitle: 'You?',
    teamJoinRole: 'Private Driver',
    teamJoinDescription: 'Professional driver? Contact us to join a team dedicated to excellence.',
    whySectionTitle: 'Why Choose VTC Rachel?',
    whyItems: [
      { title: 'Premium Vehicles', description: 'A fleet of recent high-end vehicles, air-conditioned, equipped with Wi-Fi and chargers. Cleaned and disinfected after every ride.' },
      { title: 'Transparent Pricing', description: 'Fixed price confirmed at booking. No surprises, no hidden fees. Detailed invoice sent automatically.' },
      { title: 'Easy Booking', description: 'Book online 24/7 in a few clicks. Immediate confirmation by SMS and email. Flexible modification and cancellation.' },
      { title: 'Personalised Service', description: 'Attention to detail and a listening ear for your specific needs. Journey adapted to your preferences (temperature, music, conversation).' },
    ],
    statsYearLabel: 'Founded',
    statsRidesLabel: 'Rides completed',
    statsRatingLabel: 'Average rating',
    statsClientsLabel: 'Satisfied clients',
    ctaTitle: 'Ready to Ride with Us?',
    ctaDescription: 'Book your next ride and discover the VTC Rachel experience',
    ctaPrimary: 'Book now',
  },
  es: {
    heroBadge: 'Nuestra Historia',
    heroTitleLine1: 'Excelencia al Servicio',
    heroTitleLine2: 'de Sus Trayectos',
    heroDescription: 'Desde 2020, VTC Rachel encarna la elegancia, el profesionalismo y la fiabilidad en el transporte con chófer en la región de París',
    storyTitle: 'Una Pasión Convertida en Profesión',
    storyP1: 'VTC Rachel nació de la visión de Rachel, apasionada por la excelencia del servicio y la satisfacción del cliente. Tras varios años en el sector del transporte premium, en 2020 decidió crear su propia empresa para ofrecer una experiencia VTC diferente.',
    storyP2: '¿Nuestra ambición? Combinar confort de alta gama, puntualidad impecable y atención personalizada para cada cliente, ya sea para un trayecto profesional, un traslado al aeropuerto o una ocasión especial.',
    storyP3: 'Hoy, VTC Rachel sigue creciendo preservando lo que nos hace fuertes: un servicio humano, fiable y refinado.',
    valuesSectionTitle: 'Nuestros Valores',
    valuesSectionSubtitle: 'Los principios que guían cada uno de nuestros trayectos y definen nuestro compromiso con usted',
    values: [
      { title: 'Excelencia', description: 'Buscamos la excelencia en cada detalle: vehículos impecables, conducción profesional y servicio irreprochable.' },
      { title: 'Puntualidad', description: 'Su tiempo es valioso. Garantizamos puntualidad absoluta en todos sus trayectos, profesionales y personales.' },
      { title: 'Discreción', description: 'Respeto por su vida privada y confidencialidad total. Estamos a su servicio sin ser nunca intrusivos.' },
      { title: 'Seguridad', description: 'Su seguridad es nuestra prioridad absoluta. Conductores experimentados, vehículos revisados regularmente y seguros completos.' },
      { title: 'Amabilidad', description: 'Un servicio cálido y humano. Creamos un ambiente agradable para que cada trayecto sea un momento placentero.' },
      { title: 'Ecoresponsabilidad', description: 'Compromiso con vehículos más recientes y menos contaminantes. Contribuimos activamente a una movilidad más sostenible.' },
    ],
    teamSectionTitle: 'Nuestro Equipo',
    teamSectionSubtitle: 'Profesionales apasionados, formados y con experiencia para ofrecerle el mejor servicio',
    teamFounderBadge: 'Fundadora',
    teamRachelRole: 'Chófer VTC – Fundadora',
    teamRachelDescription: 'Apasionada por la excelencia en el servicio al cliente, Rachel garantiza profesionalismo y elegancia en cada trayecto.',
    teamSoonTitle: 'Próximamente',
    teamSoonRole: 'Chófer VTC',
    teamSoonDescription: 'Estamos reclutando profesionales experimentados que compartan nuestros valores de excelencia.',
    teamJoinTitle: '¿Usted?',
    teamJoinRole: 'Chófer VTC',
    teamJoinDescription: '¿Conductor profesional? Contáctenos para unirse a un equipo de excelencia.',
    whySectionTitle: '¿Por qué elegir VTC Rachel?',
    whyItems: [
      { title: 'Vehículos Premium', description: 'Flota de vehículos recientes de alta gama, climatizados, con Wi-Fi y cargadores. Limpiados y desinfectados tras cada trayecto.' },
      { title: 'Tarifas Transparentes', description: 'Precio fijo confirmado en la reserva. Sin sorpresas, sin cargos ocultos. Factura detallada enviada automáticamente.' },
      { title: 'Reserva Sencilla', description: 'Reserve en línea 24/7 en pocos clics. Confirmación inmediata por SMS y correo. Modificación y cancelación flexibles.' },
      { title: 'Servicio Personalizado', description: 'Atención al detalle y escucha de sus necesidades específicas. Trayecto adaptado a sus preferencias (temperatura, música, conversación).' },
    ],
    statsYearLabel: 'Año de fundación',
    statsRidesLabel: 'Trayectos realizados',
    statsRatingLabel: 'Valoración media',
    statsClientsLabel: 'Clientes satisfechos',
    ctaTitle: '¿Listo para viajar con nosotros?',
    ctaDescription: 'Reserve su próximo trayecto y descubra la experiencia VTC Rachel',
    ctaPrimary: 'Reservar ahora',
  },
};

// -----------------------------------------------------------------------------
// Prestations page
// -----------------------------------------------------------------------------

export type PrestationsTranslations = {
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  sectionTitle: string;
  sectionSubtitle: string;
  notice: string;
  services: Array<{ title: string; description: string; points: string[] }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const PRESTATIONS_TRANSLATIONS: Record<AppLocale, PrestationsTranslations> = {
  fr: {
    heroBadge: 'Services premium',
    heroTitleLine1: 'Nos',
    heroTitleLine2: 'prestations',
    heroDescription: 'Des solutions de transport fiables, élégantes et adaptées à chaque besoin.',
    sectionTitle: 'Un accompagnement sur mesure',
    sectionSubtitle: "Chaque prestation est pensée pour allier ponctualité, confort et discrétion. Vous bénéficiez d'un service humain, organisé et adapté à votre contexte.",
    notice: "Pour les prestations longues distances et le transport adolescent, une réservation anticipée est recommandée afin de garantir les meilleures conditions de prise en charge.",
    services: [
      {
        title: 'Aéroports et gares',
        description: "Nous assurons vos transferts depuis et vers les aéroports et gares avec une prise en charge ponctuelle, un suivi en temps réel et une communication claire avant l'arrivée du chauffeur.",
        points: [
          'Transferts CDG, Orly et principales gares parisiennes',
          'Accueil personnalisé et aide aux bagages',
          'Idéal pour trajets professionnels, vacances et retours tardifs',
        ],
      },
      {
        title: 'Trajets inter-cités — Toute la France',
        description: "Au-delà de l'Île-de-France, nous réalisons vos déplacements vers d'autres villes de France dans un cadre confortable et serein.",
        points: [
          'Longues distances sur réservation',
          'Itinéraires adaptés à vos contraintes horaires',
          'Solution fiable pour déplacements personnels ou business',
        ],
      },
      {
        title: 'Mise à disposition',
        description: "Un chauffeur dédié reste disponible sur la durée de votre choix pour vous accompagner sur plusieurs étapes de la journée ou de la soirée.",
        points: [
          "Formules à l'heure, demi-journée et journée",
          'Parfait pour événements, réunions, shopping ou cérémonies',
          'Souplesse des arrêts et des horaires selon votre programme',
        ],
      },
      {
        title: 'Transport adolescent',
        description: 'Nous proposons un transport encadré pour les adolescents, avec des règles claires de sécurité et une coordination avec les parents.',
        points: [
          'Trajets école, activités et déplacements ponctuels',
          'Confirmation des horaires de prise en charge et dépose',
          'Réservation avec informations parentales obligatoires',
        ],
      },
    ],
    ctaTitle: "Besoin d'une prestation spécifique ?",
    ctaDescription: 'Contactez-nous pour organiser votre trajet avec une proposition adaptée.',
    ctaPrimary: 'Demander un devis',
    ctaSecondary: 'Voir les tarifs',
  },
  en: {
    heroBadge: 'Premium services',
    heroTitleLine1: 'Our',
    heroTitleLine2: 'Services',
    heroDescription: 'Reliable, elegant transport solutions tailored to every need.',
    sectionTitle: 'Tailored to you',
    sectionSubtitle: 'Every service is designed to combine punctuality, comfort and discretion. You benefit from a human, organised service adapted to your situation.',
    notice: 'For long-distance rides and teenage transport, advance booking is recommended to ensure the best pick-up conditions.',
    services: [
      {
        title: 'Airports & train stations',
        description: 'We handle your transfers to and from airports and train stations with punctual pick-up, real-time tracking and clear communication before the driver arrives.',
        points: [
          'Transfers to CDG, Orly and major Paris train stations',
          'Personalised welcome and luggage assistance',
          'Ideal for business trips, holidays and late-night returns',
        ],
      },
      {
        title: 'Intercity rides — Across France',
        description: 'Beyond the Paris region, we take you to other cities across France in a comfortable and peaceful environment.',
        points: [
          'Long-distance rides on request',
          'Itineraries adapted to your schedule',
          'Reliable solution for personal or business travel',
        ],
      },
      {
        title: 'Chauffeur on demand',
        description: 'A dedicated driver stays available for the duration you choose, accompanying you across several stops throughout the day or evening.',
        points: [
          'Hourly, half-day and full-day packages',
          'Perfect for events, meetings, shopping or ceremonies',
          'Flexible stops and schedules according to your programme',
        ],
      },
      {
        title: 'Teenage transport',
        description: 'We offer supervised transport for teenagers, with clear safety rules and coordination with parents.',
        points: [
          'School runs, activities and one-off trips',
          'Pick-up and drop-off time confirmation',
          'Booking requires parental information',
        ],
      },
    ],
    ctaTitle: 'Need a specific service?',
    ctaDescription: 'Contact us to organise your ride with a tailored proposal.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'View pricing',
  },
  es: {
    heroBadge: 'Servicios premium',
    heroTitleLine1: 'Nuestras',
    heroTitleLine2: 'prestaciones',
    heroDescription: 'Soluciones de transporte fiables, elegantes y adaptadas a cada necesidad.',
    sectionTitle: 'Un acompañamiento a medida',
    sectionSubtitle: 'Cada servicio está diseñado para combinar puntualidad, comodidad y discreción. Se beneficia de un servicio humano, organizado y adaptado a su situación.',
    notice: 'Para los trayectos de larga distancia y el transporte de adolescentes, se recomienda una reserva anticipada para garantizar las mejores condiciones de recogida.',
    services: [
      {
        title: 'Aeropuertos y estaciones',
        description: 'Nos encargamos de sus traslados desde y hacia aeropuertos y estaciones con recogida puntual, seguimiento en tiempo real y comunicación clara antes de la llegada del chófer.',
        points: [
          'Traslados a CDG, Orly y principales estaciones de París',
          'Bienvenida personalizada y ayuda con el equipaje',
          'Ideal para viajes profesionales, vacaciones y regresos nocturnos',
        ],
      },
      {
        title: 'Trayectos entre ciudades — Toda Francia',
        description: 'Más allá de la región de París, le llevamos a otras ciudades de Francia en un entorno cómodo y tranquilo.',
        points: [
          'Largas distancias bajo reserva',
          'Itinerarios adaptados a sus restricciones horarias',
          'Solución fiable para desplazamientos personales o de negocios',
        ],
      },
      {
        title: 'Chófer a disposición',
        description: 'Un chófer dedicado permanece disponible durante el tiempo que elija para acompañarle en varias etapas del día o de la noche.',
        points: [
          'Fórmulas por hora, media jornada y jornada completa',
          'Perfecto para eventos, reuniones, compras o ceremonias',
          'Flexibilidad de paradas y horarios según su programa',
        ],
      },
      {
        title: 'Transporte de adolescentes',
        description: 'Ofrecemos transporte supervisado para adolescentes, con normas de seguridad claras y coordinación con los padres.',
        points: [
          'Trayectos al colegio, actividades y desplazamientos puntuales',
          'Confirmación de horarios de recogida y entrega',
          'Reserva con información parental obligatoria',
        ],
      },
    ],
    ctaTitle: '¿Necesita una prestación específica?',
    ctaDescription: 'Contáctenos para organizar su trayecto con una propuesta adaptada.',
    ctaPrimary: 'Solicitar presupuesto',
    ctaSecondary: 'Ver tarifas',
  },
};

// -----------------------------------------------------------------------------
// Contact form
// -----------------------------------------------------------------------------

export type ContactFormTranslations = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  subjectPlaceholder: string;
  subjectOptions: Array<{ value: string; label: string }>;
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  subjectRequired: string;
  messageRequired: string;
  messageTooShort: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  submitButton: string;
  submitting: string;
  requiredFields: string;
  prefillGreeting: string;
  prefillIntro: string;
  prefillDeparture: string;
  prefillArrival: string;
  prefillFare: string;
  prefillConfirmation: string;
};

export const CONTACT_FORM_TRANSLATIONS: Record<AppLocale, ContactFormTranslations> = {
  fr: {
    nameLabel: 'Nom complet',
    emailLabel: 'Email',
    phoneLabel: 'Téléphone',
    subjectLabel: 'Sujet',
    messageLabel: 'Message',
    namePlaceholder: 'Jean Dupont',
    emailPlaceholder: 'jean@exemple.com',
    phonePlaceholder: '+33 6 61 59 02 90',
    messagePlaceholder: 'Décrivez votre demande...',
    subjectPlaceholder: 'Sélectionnez un sujet',
    subjectOptions: [
      { value: 'reservation', label: 'Question sur une réservation' },
      { value: 'tarifs', label: 'Demande de tarifs' },
      { value: 'service', label: 'Question sur le service' },
      { value: 'partenariat', label: 'Partenariat / Entreprise' },
      { value: 'autre', label: 'Autre' },
    ],
    nameRequired: 'Le nom est requis',
    emailRequired: "L'email est requis",
    emailInvalid: 'Email invalide',
    phoneRequired: 'Le téléphone est requis',
    phoneInvalid: 'Numéro invalide',
    subjectRequired: 'Le sujet est requis',
    messageRequired: 'Le message est requis',
    messageTooShort: 'Le message doit contenir au moins 10 caractères',
    successTitle: 'Message envoyé avec succès !',
    successMessage: 'Nous vous répondrons dans les plus brefs délais.',
    errorTitle: "Erreur lors de l'envoi",
    errorMessage: 'Veuillez réessayer ou nous contacter par téléphone.',
    submitButton: 'Envoyer le message',
    submitting: 'Envoi en cours...',
    requiredFields: '* Champs obligatoires',
    prefillGreeting: 'Bonjour,',
    prefillIntro: 'Je souhaite réserver une course avec les informations suivantes :',
    prefillDeparture: 'Départ',
    prefillArrival: 'Arrivée',
    prefillFare: 'Tarif estimé',
    prefillConfirmation: 'Merci de me confirmer la disponibilité.',
  },
  en: {
    nameLabel: 'Full name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    namePlaceholder: 'John Smith',
    emailPlaceholder: 'john@example.com',
    phonePlaceholder: '+33 6 61 59 02 90',
    messagePlaceholder: 'Describe your request...',
    subjectPlaceholder: 'Select a subject',
    subjectOptions: [
      { value: 'reservation', label: 'Booking enquiry' },
      { value: 'tarifs', label: 'Pricing enquiry' },
      { value: 'service', label: 'Service question' },
      { value: 'partenariat', label: 'Partnership / Corporate' },
      { value: 'autre', label: 'Other' },
    ],
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Invalid number',
    subjectRequired: 'Subject is required',
    messageRequired: 'Message is required',
    messageTooShort: 'Message must be at least 10 characters',
    successTitle: 'Message sent successfully!',
    successMessage: 'We will get back to you as soon as possible.',
    errorTitle: 'Error sending message',
    errorMessage: 'Please try again or contact us by phone.',
    submitButton: 'Send message',
    submitting: 'Sending...',
    requiredFields: '* Required fields',
    prefillGreeting: 'Hello,',
    prefillIntro: 'I would like to book a ride with the following details:',
    prefillDeparture: 'Pick-up',
    prefillArrival: 'Destination',
    prefillFare: 'Estimated fare',
    prefillConfirmation: 'Please confirm availability.',
  },
  es: {
    nameLabel: 'Nombre completo',
    emailLabel: 'Correo electrónico',
    phoneLabel: 'Teléfono',
    subjectLabel: 'Asunto',
    messageLabel: 'Mensaje',
    namePlaceholder: 'Juan García',
    emailPlaceholder: 'juan@ejemplo.com',
    phonePlaceholder: '+33 6 61 59 02 90',
    messagePlaceholder: 'Describa su solicitud...',
    subjectPlaceholder: 'Seleccione un asunto',
    subjectOptions: [
      { value: 'reservation', label: 'Consulta sobre reserva' },
      { value: 'tarifs', label: 'Solicitud de tarifas' },
      { value: 'service', label: 'Pregunta sobre el servicio' },
      { value: 'partenariat', label: 'Asociación / Empresa' },
      { value: 'autre', label: 'Otro' },
    ],
    nameRequired: 'El nombre es obligatorio',
    emailRequired: 'El correo electrónico es obligatorio',
    emailInvalid: 'Correo electrónico inválido',
    phoneRequired: 'El teléfono es obligatorio',
    phoneInvalid: 'Número inválido',
    subjectRequired: 'El asunto es obligatorio',
    messageRequired: 'El mensaje es obligatorio',
    messageTooShort: 'El mensaje debe tener al menos 10 caracteres',
    successTitle: '¡Mensaje enviado con éxito!',
    successMessage: 'Le responderemos lo antes posible.',
    errorTitle: 'Error al enviar el mensaje',
    errorMessage: 'Por favor, inténtelo de nuevo o contáctenos por teléfono.',
    submitButton: 'Enviar mensaje',
    submitting: 'Enviando...',
    requiredFields: '* Campos obligatorios',
    prefillGreeting: 'Hola,',
    prefillIntro: 'Me gustaría reservar un trayecto con los siguientes datos:',
    prefillDeparture: 'Origen',
    prefillArrival: 'Destino',
    prefillFare: 'Tarifa estimada',
    prefillConfirmation: 'Por favor, confirme la disponibilidad.',
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
