/**
 * Schema.org Structured Data pour VTC Rachel
 * 
 * Aide Google à mieux comprendre le business :
 * - LocalBusiness (entreprise locale)
 * - Service (services VTC)
 * - ContactPoint (coordonnées)
 */

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://vtcrachel.fr',
  name: 'VTC Rachel',
  description: 'Service de VTC premium en Île-de-France. Transferts aéroports, mise à disposition, trajets professionnels et privés.',
  image: 'https://vtcrachel.fr/images/vtc-rachel-car.png',
  logo: 'https://vtcrachel.fr/images/logo.png',
  url: 'https://vtcrachel.fr',
  
  // Adresse (à compléter quand disponible)
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressRegion: 'Île-de-France',
    addressLocality: 'Paris',
    postalCode: '75000',
    streetAddress: 'Paris, Île-de-France'
  },
  
  // Coordonnées
  telephone: '+33661590290',
  // email: 'contact@vtcrachel.fr', // À décommenter quand disponible
  
  // Zones de service
  areaServed: [
    {
      '@type': 'City',
      name: 'Paris'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France'
    }
  ],
  
  // Services proposés
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services VTC',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Transfert Aéroport CDG',
          description: 'Transfert depuis/vers l\'aéroport Charles de Gaulle',
          provider: {
            '@type': 'LocalBusiness',
            name: 'VTC Rachel'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Transfert Aéroport Orly',
          description: 'Transfert depuis/vers l\'aéroport d\'Orly',
          provider: {
            '@type': 'LocalBusiness',
            name: 'VTC Rachel'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mise à Disposition',
          description: 'Chauffeur à disposition pour vos événements et réunions',
          provider: {
            '@type': 'LocalBusiness',
            name: 'VTC Rachel'
          }
        }
      }
    ]
  },
  
  // Heures d'ouverture (7j/7, 24h/24)
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '00:00',
    closes: '23:59'
  },
  
  // Prix range
  priceRange: '€€',
  
  // Moyens de paiement
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  
  // Réseaux sociaux (à ajouter quand disponibles)
  // sameAs: [
  //   'https://www.facebook.com/vtcrachel',
  //   'https://www.instagram.com/vtcrachel',
  //   'https://www.linkedin.com/company/vtcrachel'
  // ]
};

export const AGGREGATE_RATING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'VTC Rachel',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1'
  }
};
