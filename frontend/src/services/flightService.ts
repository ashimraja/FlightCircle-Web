// flightService.ts - Client-side API wrapper for backend Duffel integration
import type { Flight, SearchParams } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const flightService = {
  async searchFlights(params: SearchParams): Promise<Flight[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/search-flights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Flight search error:', error);
      throw error;
    }
  },

  async getFlightById(offerId: string): Promise<Flight | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/flight/${offerId}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch flight: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get flight error:', error);
      return null;
    }
  },

  async submitBooking(data: {
    offerId: string;
    passengers: {
      title: 'mr' | 'ms' | 'mrs' | 'dr';
      given_name: string;
      family_name: string;
      email: string;
      phone_number: string;
      born_on: string;
      gender: 'm' | 'f';
      id: string;
    }[];
    amount: string;
    currency: string;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Booking failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Booking error:', error);
      throw error;
    }
  },
};