/**
 * Types globaux de l'application
 * 
 * Définit les types partagés entre les différents composants et pages
 */

// ============================================================================
// TYPES DE DONNÉES
// ============================================================================

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: 'reservation' | 'paiement' | 'service' | 'annulation';
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  avatar: string;
}

export interface AirportPrice {
  id: string;
  name: string;
  shortName: string;
  description: string;
  dayPrice: number;
  nightPrice: number;
  dayHours: string;
  nightHours: string;
  waitTime: number;
  features: string[];
  popular?: boolean;
}

export interface TrainStation {
  id: string;
  name: string;
  price: number;
  zone: string;
}

export interface DisposalOption {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  hours?: number;
  minHours?: number;
  pricePerHour?: number;
  savings?: number;
  features: string[];
  recommended?: boolean;
}

export interface Surcharge {
  id: string;
  name: string;
  price: number | string;
  unit: string;
  description: string;
}

export interface IncludedFeature {
  id: string;
  title: string;
  description: string;
}

// ============================================================================
// TYPES DE FORMULAIRES
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BookingEstimate {
  departure: string;
  arrival: string;
  date?: string;
  time?: string;
  passengers?: number;
  luggage?: number;
}

export interface BookingData extends BookingEstimate {
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  paymentMethod?: 'card' | 'cash' | 'online';
}

// ============================================================================
// TYPES DE COMPOSANTS
// ============================================================================

export interface HeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  variant?: 'default' | 'gradient' | 'landing';
  className?: string;
}

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'compact';
  className?: string;
}

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// ============================================================================
// TYPES D'API
// ============================================================================

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingResponse {
  bookingId: string;
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  estimatedArrival?: string;
}

// ============================================================================
// TYPES UTILITAIRES
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ValidationError {
  field: string;
  message: string;
}

export type FormValidationErrors = Record<string, string>;
