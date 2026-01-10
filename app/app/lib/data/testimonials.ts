/**
 * Testimonials Data - Témoignages clients
 * 
 * Source unique de vérité pour tous les témoignages clients.
 * Utilisé par le composant Testimonials.tsx
 */

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: readonly Testimonial[] = [
  {
    id: 1,
    name: "Sophie Dubois",
    location: "Paris 16e",
    rating: 5,
    text: "Service impeccable ! Ponctualité, véhicule luxueux et chauffeur très professionnel. Je recommande vivement pour les trajets aéroport.",
    avatar: "SD"
  },
  {
    id: 2,
    name: "Thomas Martin",
    location: "Neuilly-sur-Seine",
    rating: 5,
    text: "Rachel m'a dépanné plusieurs fois pour mes déplacements professionnels. Toujours à l'heure, discret et très arrangeant. Un vrai partenaire de confiance.",
    avatar: "TM"
  },
  {
    id: 3,
    name: "Marie Lefebvre",
    location: "Versailles",
    rating: 5,
    text: "Excellent service pour notre mariage ! Rachel a géré tous nos déplacements avec professionnalisme. Les invités ont adoré. Merci encore !",
    avatar: "ML"
  },
  {
    id: 4,
    name: "Jean Dupont",
    location: "La Défense",
    rating: 5,
    text: "Depuis 2 ans, je fais appel à Rachel pour mes trajets CDG. Jamais déçu, suivi des vols en temps réel, aide avec les bagages. Top !",
    avatar: "JD"
  }
] as const;
