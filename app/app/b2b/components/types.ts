export type Reservation = {
  id: string;
  hotel_id: string;
  hotel_name: string;
  client_name: string;
  client_phone: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  comment: string | null;
  estimated_price: number | null;
  final_price: number | null;
  commission_rate: number | null;
  commission_amount: number | null;
  commission_paid: boolean;
  status: string;
  created_at: string;
  room?: string;
  staff_role?: string;
  distance?: string;
  duration?: string;
};

export const DESTINATIONS = [
  { name: 'Aéroport CDG · Terminal 2E', cat: 'aéroport', price: 78 },
  { name: 'Aéroport CDG · Terminal 2F', cat: 'aéroport', price: 78 },
  { name: 'Aéroport CDG · Terminal 1',  cat: 'aéroport', price: 82 },
  { name: 'Aéroport Orly · Sud',        cat: 'aéroport', price: 64 },
  { name: 'Aéroport Orly · Ouest',      cat: 'aéroport', price: 65 },
  { name: 'Gare de Lyon',               cat: 'gare',     price: 24 },
  { name: 'Gare du Nord',               cat: 'gare',     price: 28 },
  { name: 'Gare Montparnasse',          cat: 'gare',     price: 20 },
  { name: 'Tour Eiffel',                cat: 'lieu',     price: 20 },
  { name: 'Musée du Louvre',            cat: 'lieu',     price: 18 },
  { name: 'Opéra Garnier',              cat: 'lieu',     price: 22 },
  { name: 'Château de Versailles',      cat: 'lieu',     price: 95 },
  { name: 'Disneyland Paris',           cat: 'lieu',     price: 142 },
];
