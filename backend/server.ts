import express from 'express';
import cors from 'cors';
import { Duffel } from '@duffel/api';
import type { SearchParams } from '../frontend/src/types/index.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

const token = process.env.VITE_DUFFEL_TOKEN;

const duffel = new Duffel({
    token: token!,
});

// City to IATA code mapping
const CITY_TO_IATA: Record<string, string> = {
  'kathmandu': 'KTM',
  'sydney': 'SYD',
  'auckland': 'AKL',
  'melbourne': 'MEL',
  'brisbane': 'BNE',
  'perth': 'PER',
  'bangkok': 'BKK',
  'dubai': 'DXB',
  'singapore': 'SIN',
  'kuala lumpur': 'KUL',
  'hong kong': 'HKG',
  'tokyo': 'NRT',
  'london': 'LHR',
  'new york': 'JFK',
  'paris': 'CDG',
  'delhi': 'DEL',
  'mumbai': 'BOM',
  'bangalore': 'BLR',
  'kolkata': 'CCU',
};

function getCityIATACode(city: string): string {
  const normalizedCity = city.toLowerCase().trim();
  return CITY_TO_IATA[normalizedCity] || normalizedCity.toUpperCase().substring(0, 3);
}

// Middleware
app.use(cors());
app.use(express.json());

// Type definitions for Duffel response
type DuffelOffer = Awaited<ReturnType<typeof duffel.offers.get>>['data'];
type DuffelSlice = DuffelOffer['slices'][number];

// Helper functions from flightService
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h` : '';
  const m = match[2] ? ` ${match[2]}m` : '';
  return `${h}${m}`.trim();
}

function formatTime(datetime: string): string {
  return datetime.slice(11, 16);
}

function formatDate(datetime: string): string {
  return new Date(datetime).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function getCityName(place: DuffelSlice['origin']): string {
  if (place.type === 'airport') {
    return place.city_name ?? place.name;
  }
  return place.name;
}

function getIataCode(place: DuffelSlice['origin']): string {
  if (place.type === 'airport') {
    return place.iata_code ?? place.iata_city_code ?? '';
  }
  return place.iata_code;
}

function mapOfferToFlight(offer: DuffelOffer) {
  const slice = offer.slices[0];
  const firstSeg = slice.segments[0];
  const lastSeg = slice.segments[slice.segments.length - 1];

  const stopCount = slice.segments.length - 1;
  const stops = stopCount === 0
    ? 'Non-stop'
    : `${stopCount} stop${stopCount > 1 ? 's' : ''}`;

  const baggages = firstSeg.passengers?.[0]?.baggages ?? [];
  const checkedBag = baggages.find(b => b.type === 'checked');
  const baggage = checkedBag
    ? `${checkedBag.quantity} checked bag`
    : 'Cabin only';

  return {
    id: offer.id,
    airline: offer.owner.name,
    airlineCode: offer.owner.iata_code ?? '',
    airlineLogoUrl: offer.owner.logo_symbol_url ?? '',
    price: parseFloat(offer.total_amount),
    baseFare: parseFloat(offer.base_amount),
    taxAmount: parseFloat(offer.tax_amount ?? '0'),
    currency: offer.total_currency,
    origin: getCityName(slice.origin),
    originCode: getIataCode(slice.origin),
    destination: getCityName(slice.destination),
    destinationCode: getIataCode(slice.destination),
    departureTime: formatTime(firstSeg.departing_at),
    arrivalTime: formatTime(lastSeg.arriving_at),
    duration: parseDuration(slice.duration ?? 'PT0H'),
    stops,
    aircraft: firstSeg.aircraft?.name ?? 'N/A',
    travelDate: formatDate(firstSeg.departing_at),
    baggage,
    cabinClass: firstSeg.passengers?.[0]?.cabin_class ?? 'economy',
    refundable: offer.conditions?.refund_before_departure?.allowed ?? false,
  };
}

// Search flights endpoint
app.post('/api/search-flights', async (req, res) => {
  try {
    const params: SearchParams = req.body;

    // Convert city names to IATA codes
    const originIATA = getCityIATACode(params.origin);
    const destinationIATA = getCityIATACode(params.destination);

    const slices = [
      {
        origin: originIATA,
        destination: destinationIATA,
        departure_date: params.travelDate,
        arrival_time: null,
        departure_time: null,
      },
      ...(params.returnDate ? [{
        origin: destinationIATA,
        destination: originIATA,
        departure_date: params.returnDate,
        arrival_time: null as null,
        departure_time: null as null,
      }] : []),
    ];

    const passengers = [
      ...Array(params.adults).fill({ type: 'adult' as const }),
      ...Array(params.children ?? 0).fill({ type: 'child' as const }),
    ];

    const offerRequest = await duffel.offerRequests.create({
      slices: slices as any,
      passengers,
      cabin_class: params.cabinClass,
      return_offers: true,
    });

    const offersResponse = await duffel.offers.list({
      offer_request_id: offerRequest.data.id,
      sort: 'total_amount',
      limit: 20,
    });

    const flights = offersResponse.data.map(mapOfferToFlight);
    res.json(flights);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get single flight endpoint
app.get('/api/flight/:offerId', async (req, res) => {
  try {
    const { offerId } = req.params;
    const response = await duffel.offers.get(offerId);
    const flight = mapOfferToFlight(response.data);
    res.json(flight);
  } catch (error) {
    console.error('Get flight error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { offerId, passengers, amount, currency } = req.body;

    const order = await duffel.orders.create({
      type: 'instant',
      selected_offers: [offerId],
      passengers,
      payments: [
        {
          type: 'balance',
          currency,
          amount,
        },
      ],
    });

    res.json({
      status: 'success',
      reference: order.data.booking_reference,
      orderId: order.data.id,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`🛫 Flight Circle API server running on port ${PORT}`);
});
