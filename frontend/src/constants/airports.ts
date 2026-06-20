// List of major airports with IATA codes for autocomplete
export const AIRPORTS = [
  // Nepal
  { city: 'Kathmandu', code: 'KTM', country: 'Nepal' },
  
  // Australia
  { city: 'Sydney', code: 'SYD', country: 'Australia' },
  { city: 'Melbourne', code: 'MEL', country: 'Australia' },
  { city: 'Brisbane', code: 'BNE', country: 'Australia' },
  { city: 'Perth', code: 'PER', country: 'Australia' },
  { city: 'Adelaide', code: 'ADL', country: 'Australia' },
  { city: 'Hobart', code: 'HBA', country: 'Australia' },
  { city: 'Cairns', code: 'CNS', country: 'Australia' },
  { city: 'Gold Coast', code: 'OOL', country: 'Australia' },
  
  // Asia
  { city: 'Bangkok', code: 'BKK', country: 'Thailand' },
  { city: 'Singapore', code: 'SIN', country: 'Singapore' },
  { city: 'Kuala Lumpur', code: 'KUL', country: 'Malaysia' },
  { city: 'Hong Kong', code: 'HKG', country: 'Hong Kong' },
  { city: 'Tokyo', code: 'NRT', country: 'Japan' },
  { city: 'Delhi', code: 'DEL', country: 'India' },
  { city: 'Mumbai', code: 'BOM', country: 'India' },
  { city: 'Bangalore', code: 'BLR', country: 'India' },
  { city: 'Kolkata', code: 'CCU', country: 'India' },
  { city: 'Manila', code: 'MNL', country: 'Philippines' },
  { city: 'Jakarta', code: 'CGK', country: 'Indonesia' },
  { city: 'Bali', code: 'DPS', country: 'Indonesia' },
  { city: 'Hanoi', code: 'HAN', country: 'Vietnam' },
  { city: 'Ho Chi Minh City', code: 'SGN', country: 'Vietnam' },
  
  // Middle East
  { city: 'Dubai', code: 'DXB', country: 'UAE' },
  { city: 'Abu Dhabi', code: 'AUH', country: 'UAE' },
  { city: 'Doha', code: 'DOH', country: 'Qatar' },
  
  // Europe
  { city: 'London', code: 'LHR', country: 'United Kingdom' },
  { city: 'Paris', code: 'CDG', country: 'France' },
  { city: 'Frankfurt', code: 'FRA', country: 'Germany' },
  { city: 'Amsterdam', code: 'AMS', country: 'Netherlands' },
  { city: 'Istanbul', code: 'IST', country: 'Turkey' },
  
  // Americas
  { city: 'New York', code: 'JFK', country: 'USA' },
  { city: 'Los Angeles', code: 'LAX', country: 'USA' },
  { city: 'San Francisco', code: 'SFO', country: 'USA' },
  { city: 'Chicago', code: 'ORD', country: 'USA' },
  { city: 'Toronto', code: 'YYZ', country: 'Canada' },
];

export function searchAirports(query: string): typeof AIRPORTS {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return AIRPORTS.filter(airport =>
    airport.city.toLowerCase().includes(lowerQuery) ||
    airport.code.toLowerCase().includes(lowerQuery) ||
    airport.country.toLowerCase().includes(lowerQuery)
  );
}
