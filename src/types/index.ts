export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  price: number;
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
  rating: number;
  features: string[];
};

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
