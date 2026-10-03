export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export type LanguageCode = 'pt' | 'en' | 'fr' | 'es';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromEUR: number; // EUR is base 1.0
  format: (amountInEUR: number) => string;
}

export interface Accommodation {
  id: string;
  title: string;
  category: 'villa_pool' | 'master_suite' | 'ocean_view' | 'soaking_tub';
  tagline: string;
  areaM2: number;
  guestsMax: number;
  bedType: string;
  viewOrientation: string;
  acousticRating: string;
  pricePerNightEUR: number;
  image: string;
  gallery: string[];
  description: string;
  architecturalDetails: string;
  amenities: string[];
  features: string[];
  highlight: string;
}

export interface Experience {
  id: string;
  title: string;
  category: 'spa' | 'dining' | 'expeditions';
  tagline: string;
  duration: string;
  priceEUR: number;
  image: string;
  description: string;
  highlights: string[];
  scheduleOptions: string[];
}

export interface BookingState {
  suiteId?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  privateCode?: string;
  selectedAddOns: string[];
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface ConfirmedReservation {
  code: string;
  accommodation: Accommodation;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  totalEUR: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'apple_pay' | 'credit_card' | 'concierge_billing';
  addOns: { name: string; priceEUR: number }[];
  createdAt: string;
}

export interface ButlerRequest {
  id: string;
  title: string;
  description: string;
  category: 'dining' | 'transfer' | 'wellness' | 'amenity';
  quickAction?: string;
}
