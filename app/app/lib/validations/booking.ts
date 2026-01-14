import { z } from 'zod';

/**
 * Schema de validation pour l'estimateur de prix (PriceEstimator)
 * 
 * Validation basique pour départ/arrivée
 * Sera étendu avec date/heure/options quand backend créé
 */
export const priceEstimateSchema = z.object({
  departure: z
    .string()
    .min(5, 'L\'adresse de départ doit contenir au moins 5 caractères')
    .max(500, 'Adresse trop longue')
    .trim(),
  
  arrival: z
    .string()
    .min(5, 'L\'adresse d\'arrivée doit contenir au moins 5 caractères')
    .max(500, 'Adresse trop longue')
    .trim(),
});

export type PriceEstimateData = z.infer<typeof priceEstimateSchema>;

/**
 * Schema complet pour réservation (à utiliser quand backend créé)
 */
export const bookingSchema = z.object({
  // Adresses
  pickup_address: z.string().min(5).max(500),
  pickup_latitude: z.number().min(-90).max(90).optional(),
  pickup_longitude: z.number().min(-180).max(180).optional(),
  pickup_place_id: z.string().optional(),
  
  dropoff_address: z.string().min(5).max(500),
  dropoff_latitude: z.number().min(-90).max(90).optional(),
  dropoff_longitude: z.number().min(-180).max(180).optional(),
  dropoff_place_id: z.string().optional(),
  
  // Date/heure
  pickup_datetime: z
    .string()
    .datetime('Date/heure invalide')
    .refine(
      (date) => new Date(date) > new Date(),
      { message: 'La date doit être dans le futur' }
    ),
  
  // Passagers et options
  passengers_count: z.number().int().min(1).max(4),
  has_child_seat: z.boolean().optional().default(false),
  has_luggage: z.boolean().optional().default(false),
  waiting_time_minutes: z.number().int().min(0).max(120).optional().default(0),
  has_pets: z.boolean().optional().default(false),
  special_notes: z.string().max(500).optional(),
});

export type BookingData = z.infer<typeof bookingSchema>;

/**
 * Valide les données d'estimation de prix
 */
export function validatePriceEstimate(data: unknown) {
  return priceEstimateSchema.safeParse(data);
}

/**
 * Valide les données de réservation complète
 */
export function validateBooking(data: unknown) {
  return bookingSchema.safeParse(data);
}
