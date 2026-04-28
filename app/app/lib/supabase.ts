import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client serveur avec la clé service_role (bypass RLS) — uniquement dans les API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Hotel = {
  id: string;
  name: string;
  password_hash: string;
  commission_rate: number;
  contact_email: string | null;
  contact_phone: string | null;
  is_demo: boolean;
  created_at: string;
};

export type B2BReservation = {
  id: string;
  hotel_id: string;
  hotel_name: string;
  client_name: string;
  client_phone: string;
  departure: string;
  arrival: string;
  distance: string | null;
  duration: string | null;
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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  staff_role: string | null;
  created_at: string;
  updated_at: string;
};
