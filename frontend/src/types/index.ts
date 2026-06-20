// types/index.ts
import { Duffel } from '@duffel/api';

// Extract Offer type from the SDK without needing any sub-path import
type _duffel = InstanceType<typeof Duffel>;
export type DuffelOfferType = Awaited<ReturnType<_duffel['offers']['get']>>['data'];

export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogoUrl: string;
  price: number;
  baseFare: number;
  taxAmount: number;
  currency: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  aircraft: string;
  travelDate: string;
  returnDate?: string;
  baggage: string;
  cabinClass: string;
  refundable: boolean;
};

export type SearchParams = {
  origin: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
};

// Keep your existing types
export type Destination = {
  city: string;
  airport: string;
  offer: string;
  image: string;
};

export type Deal = {
  title: string;
  route: string;
  price: string;
  save: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};