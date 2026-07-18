export const CONFIRMATION_STORAGE_KEY = 'vtc-rachel-confirmation';

export type ConfirmationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  comment: string;
  departure: string;
  arrival: string;
  price: number;
  distance: string;
  duration: string;
};
