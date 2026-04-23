/**
 * FAQ Data - Questions Fréquentes
 * 
 * Source unique de vérité pour toutes les questions/réponses FAQ.
 * Utilisé par le composant FAQ.tsx
 */

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: 'reservation' | 'paiement' | 'service' | 'annulation';
}

export const FAQ_DATA: readonly FAQItem[] = [
  {
    id: 1,
    question: "Comment réserver une course ?",
    answer: "La réservation est simple et rapide : indiquez votre point de départ et destination, choisissez votre date et heure, puis confirmez votre réservation. Vous recevrez une confirmation immédiate par email.",
    category: 'reservation'
  },
  {
    id: 2,
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons la carte bancaire (Visa, Mastercard) à bord du véhicule, les espèces, ainsi que le virement bancaire pour les réservations à l'avance ou les entreprises. Le paiement en ligne n'est actuellement pas disponible.",
    category: 'paiement'
  },
  {
    id: 3,
    question: "Puis-je modifier ou annuler ma réservation ?",
    answer: "Oui. La modification est gratuite jusqu'à 24h avant la prise en charge. L'annulation est progressive : gratuite au-delà de 24h, puis 25% (12h-24h), 50% (6h-12h), 75% (2h-6h) et 100% à moins de 2h ou en cas de no-show.",
    category: 'annulation'
  },
  {
    id: 4,
    question: "Proposez-vous des sièges enfants ?",
    answer: "Oui, nous proposons des sièges auto enfants homologués (siège bébé, rehausseur). Pensez à le mentionner lors de votre réservation. Un supplément de 5€ s'applique.",
    category: 'service'
  },
  {
    id: 5,
    question: "Quelles zones desservez-vous ?",
    answer: "Nous couvrons l'ensemble de l'Île-de-France : Paris intra-muros, petite et grande couronne, aéroports CDG et Orly, gares principales, et toutes les villes d'Île-de-France. Pour les destinations hors Île-de-France, contactez-nous.",
    category: 'service'
  },
  {
    id: 6,
    question: "Êtes-vous disponible 24h/24 et 7j/7 ?",
    answer: "Oui, notre service de réservation en ligne est accessible 24h/24. Les courses peuvent être effectuées à toute heure, y compris la nuit et les weekends. Pour les réservations de dernière minute, il est préférable de nous contacter par téléphone.",
    category: 'service'
  },
  {
    id: 7,
    question: "Suivez-vous les vols pour les transferts aéroport ?",
    answer: "Absolument ! Nous suivons votre vol en temps réel pour les transferts aéroport. En cas de retard ou d'avance, nous ajustons automatiquement l'heure de prise en charge sans frais supplémentaires.",
    category: 'service'
  },
  {
    id: 8,
    question: "Quel type de véhicule utilisez-vous ?",
    answer: "Nous utilisons des véhicules premium récents (Mercedes Classe E ou équivalent), climatisés, spacieux et parfaitement entretenus. Confort et propreté garantis pour tous vos déplacements.",
    category: 'service'
  },
  {
    id: 9,
    question: "Puis-je demander un arrêt en cours de route ?",
    answer: "Oui, vous pouvez demander un ou plusieurs arrêts lors de votre réservation. Les 10 premières minutes d'attente sont incluses, puis un supplément de 15€ par tranche de 20 minutes s'applique.",
    category: 'service'
  },
  {
    id: 10,
    question: "Comment obtenir une facture ?",
    answer: "Une facture est délivrée sur demande par email au format PDF. Elle est obligatoire pour les courses professionnelles et mentionne les détails de la prestation (prix TTC, TVA incluse).",
    category: 'service'
  }
] as const;
