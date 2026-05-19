import flights from '../data/flights.json';
import type { Flight } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const flightService = {
  async searchFlights() {
    await delay(700);
    return flights as Flight[];
  },

  async getFlightById(id: string) {
    await delay(500);
    return (flights as Flight[]).find((flight) => flight.id === id) ?? null;
  },

  async submitBooking(data: Record<string, unknown>) {
    await delay(900);
    return {
      status: 'success',
      reference: `FC${Math.floor(100000 + Math.random() * 900000)}`,
      payload: data,
    };
  },
};
