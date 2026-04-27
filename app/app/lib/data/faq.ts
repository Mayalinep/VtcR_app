import type { AppLocale } from '../i18n';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: 'reservation' | 'paiement' | 'service' | 'annulation';
}

export const FAQ_DATA_MULTILINGUAL: Record<AppLocale, readonly FAQItem[]> = {
  fr: [
    {
      id: 1,
      question: "Comment réserver une course ?",
      answer: "La réservation est simple et rapide : indiquez votre point de départ et destination, choisissez votre date et heure, puis confirmez votre réservation. Vous recevrez une confirmation immédiate par email.",
      category: 'reservation',
    },
    {
      id: 2,
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons la carte bancaire (Visa, Mastercard) à bord du véhicule, les espèces, ainsi que le virement bancaire pour les réservations à l'avance ou les entreprises. Le paiement en ligne n'est actuellement pas disponible.",
      category: 'paiement',
    },
    {
      id: 3,
      question: "Puis-je modifier ou annuler ma réservation ?",
      answer: "Oui. La modification est gratuite jusqu'à 24h avant la prise en charge. L'annulation est progressive : gratuite au-delà de 24h, puis 25% (12h-24h), 50% (6h-12h), 75% (2h-6h) et 100% à moins de 2h ou en cas de no-show.",
      category: 'annulation',
    },
    {
      id: 4,
      question: "Proposez-vous des sièges enfants ?",
      answer: "Oui, nous proposons des sièges auto enfants homologués (siège bébé, rehausseur). Pensez à le mentionner lors de votre réservation. Un supplément de 5€ s'applique.",
      category: 'service',
    },
    {
      id: 5,
      question: "Quelles zones desservez-vous ?",
      answer: "Nous couvrons l'ensemble de l'Île-de-France : Paris intra-muros, petite et grande couronne, aéroports CDG et Orly, gares principales, et toutes les villes d'Île-de-France. Pour les destinations hors Île-de-France, contactez-nous.",
      category: 'service',
    },
    {
      id: 6,
      question: "Êtes-vous disponible 24h/24 et 7j/7 ?",
      answer: "Oui, notre service de réservation en ligne est accessible 24h/24. Les courses peuvent être effectuées à toute heure, y compris la nuit et les weekends. Pour les réservations de dernière minute, il est préférable de nous contacter par téléphone.",
      category: 'service',
    },
    {
      id: 7,
      question: "Suivez-vous les vols pour les transferts aéroport ?",
      answer: "Absolument ! Nous suivons votre vol en temps réel pour les transferts aéroport. En cas de retard ou d'avance, nous ajustons automatiquement l'heure de prise en charge sans frais supplémentaires.",
      category: 'service',
    },
    {
      id: 8,
      question: "Quel type de véhicule utilisez-vous ?",
      answer: "Nous utilisons des véhicules premium récents (Mercedes Classe E ou équivalent), climatisés, spacieux et parfaitement entretenus. Confort et propreté garantis pour tous vos déplacements.",
      category: 'service',
    },
    {
      id: 9,
      question: "Puis-je demander un arrêt en cours de route ?",
      answer: "Oui, vous pouvez demander un ou plusieurs arrêts lors de votre réservation. Les 10 premières minutes d'attente sont incluses, puis un supplément de 15€ par tranche de 20 minutes s'applique.",
      category: 'service',
    },
    {
      id: 10,
      question: "Comment obtenir une facture ?",
      answer: "Une facture est délivrée sur demande par email au format PDF. Elle est obligatoire pour les courses professionnelles et mentionne les détails de la prestation (prix TTC, TVA incluse).",
      category: 'service',
    },
  ],
  en: [
    {
      id: 1,
      question: "How do I book a ride?",
      answer: "Booking is simple and quick: enter your departure point and destination, choose your date and time, then confirm your booking. You will receive an immediate confirmation by email.",
      category: 'reservation',
    },
    {
      id: 2,
      question: "What payment methods are accepted?",
      answer: "We accept bank cards (Visa, Mastercard) in the vehicle, cash, and bank transfer for advance bookings or corporate clients. Online payment is not currently available.",
      category: 'paiement',
    },
    {
      id: 3,
      question: "Can I change or cancel my booking?",
      answer: "Yes. Changes are free up to 24h before pick-up. Cancellation fees are progressive: free beyond 24h, then 25% (12h–24h), 50% (6h–12h), 75% (2h–6h) and 100% less than 2h before or in case of no-show.",
      category: 'annulation',
    },
    {
      id: 4,
      question: "Do you offer child seats?",
      answer: "Yes, we offer approved child car seats (infant seat, booster seat). Please mention it when booking. A supplement of €5 applies.",
      category: 'service',
    },
    {
      id: 5,
      question: "Which areas do you serve?",
      answer: "We cover the entire Île-de-France region: central Paris, inner and outer suburbs, CDG and Orly airports, main train stations, and all towns in Île-de-France. For destinations outside Île-de-France, please contact us.",
      category: 'service',
    },
    {
      id: 6,
      question: "Are you available 24/7?",
      answer: "Yes, our online booking service is accessible 24/7. Rides can be arranged at any time, including nights and weekends. For last-minute bookings, it is best to contact us by phone.",
      category: 'service',
    },
    {
      id: 7,
      question: "Do you track flights for airport transfers?",
      answer: "Absolutely! We track your flight in real time for airport transfers. In the event of a delay or early arrival, we automatically adjust the pick-up time at no extra charge.",
      category: 'service',
    },
    {
      id: 8,
      question: "What type of vehicle do you use?",
      answer: "We use recent premium vehicles (Mercedes E-Class or equivalent), air-conditioned, spacious and perfectly maintained. Comfort and cleanliness guaranteed for all your journeys.",
      category: 'service',
    },
    {
      id: 9,
      question: "Can I request a stop along the way?",
      answer: "Yes, you can request one or more stops when booking. The first 10 minutes of waiting are included, then a supplement of €15 per 20-minute block applies.",
      category: 'service',
    },
    {
      id: 10,
      question: "How do I get an invoice?",
      answer: "An invoice is issued on request by email in PDF format. It is mandatory for business rides and includes full details of the service (all-inclusive price, VAT included).",
      category: 'service',
    },
  ],
  es: [
    {
      id: 1,
      question: "¿Cómo reservo un trayecto?",
      answer: "La reserva es sencilla y rápida: indique su punto de partida y destino, elija fecha y hora, y confirme su reserva. Recibirá una confirmación inmediata por correo electrónico.",
      category: 'reservation',
    },
    {
      id: 2,
      question: "¿Qué métodos de pago se aceptan?",
      answer: "Aceptamos tarjeta bancaria (Visa, Mastercard) a bordo del vehículo, efectivo y transferencia bancaria para reservas anticipadas o empresas. El pago en línea no está disponible actualmente.",
      category: 'paiement',
    },
    {
      id: 3,
      question: "¿Puedo modificar o cancelar mi reserva?",
      answer: "Sí. La modificación es gratuita hasta 24 h antes de la recogida. La cancelación es progresiva: gratuita más de 24 h antes, luego 25 % (12 h-24 h), 50 % (6 h-12 h), 75 % (2 h-6 h) y 100 % a menos de 2 h o en caso de no presentarse.",
      category: 'annulation',
    },
    {
      id: 4,
      question: "¿Ofrecen sillas infantiles?",
      answer: "Sí, disponemos de sillas de coche homologadas (silla de bebé, alzador). Indíquelo al hacer la reserva. Se aplica un suplemento de 5 €.",
      category: 'service',
    },
    {
      id: 5,
      question: "¿Qué zonas cubren?",
      answer: "Cubrimos toda la región de Île-de-France: París centro, primer y segundo cinturón, aeropuertos CDG y Orly, principales estaciones y todas las ciudades de Île-de-France. Para destinos fuera de Île-de-France, contáctenos.",
      category: 'service',
    },
    {
      id: 6,
      question: "¿Están disponibles 24 h/24 y 7 días a la semana?",
      answer: "Sí, nuestro servicio de reserva en línea es accesible 24 h/24. Los trayectos pueden realizarse a cualquier hora, incluso de noche y los fines de semana. Para reservas de última hora, es preferible contactarnos por teléfono.",
      category: 'service',
    },
    {
      id: 7,
      question: "¿Hacen seguimiento de los vuelos para los traslados al aeropuerto?",
      answer: "¡Por supuesto! Hacemos seguimiento de su vuelo en tiempo real para los traslados al aeropuerto. En caso de retraso o adelanto, ajustamos automáticamente la hora de recogida sin coste adicional.",
      category: 'service',
    },
    {
      id: 8,
      question: "¿Qué tipo de vehículo utilizan?",
      answer: "Utilizamos vehículos premium recientes (Mercedes Clase E o equivalente), climatizados, espaciosos y perfectamente mantenidos. Confort y limpieza garantizados en todos sus desplazamientos.",
      category: 'service',
    },
    {
      id: 9,
      question: "¿Puedo pedir una parada durante el trayecto?",
      answer: "Sí, puede solicitar una o varias paradas al hacer su reserva. Los primeros 10 minutos de espera están incluidos; a partir de ahí se aplica un suplemento de 15 € por tramo de 20 minutos.",
      category: 'service',
    },
    {
      id: 10,
      question: "¿Cómo obtengo una factura?",
      answer: "La factura se emite bajo petición por correo electrónico en formato PDF. Es obligatoria para los trayectos profesionales e incluye todos los detalles del servicio (precio con IVA incluido).",
      category: 'service',
    },
  ],
};

export const FAQ_DATA = FAQ_DATA_MULTILINGUAL.fr;
