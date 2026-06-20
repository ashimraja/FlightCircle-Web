import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { flightService } from '../services/flightService';
import type { Flight } from '../types';
import { formatCurrency } from '../utils/format';

export default function FlightDetails() {
  const { flightId } = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!flightId) return;
    flightService.getFlightById(flightId).then((result) => {
      setFlight(result);
      setLoading(false);
    });
  }, [flightId]);

  if (loading) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-soft sm:rounded-[2rem] sm:p-10">
        <p className="text-base font-semibold text-slate-900 sm:text-lg">Loading flight details…</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:rounded-[2rem] sm:p-10">
        <p className="text-base font-semibold text-slate-900 sm:text-lg">Flight not found</p>
        <p className="mt-2 text-xs text-slate-600 sm:text-sm">Return to search to continue exploring routes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">Flight details</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">{flight.originCode} → {flight.destinationCode}</h1>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center sm:rounded-3xl sm:px-5 sm:py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm">Price</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl">{formatCurrency(flight.price)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:gap-4 sm:mt-8 grid-cols-2 sm:grid-cols-2">
            {[
              { label: 'Departure', value: `${flight.departureTime} • ${flight.travelDate}` },
              { label: 'Arrival', value: `${flight.arrivalTime} • ${flight.returnDate ?? 'Return flexible'}` },
              { label: 'Duration', value: flight.duration },
              { label: 'Stops', value: flight.stops },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-3 sm:rounded-3xl sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 sm:mt-3 sm:text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 sm:mt-10 sm:space-y-6">
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-sm">Flight timeline</p>
              <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-5">
                {[
                  { label: flight.origin, time: flight.departureTime, note: 'Boarding begins 30 min before departure' },
                  { label: 'Airborne', time: flight.duration, note: `Arrives at ${flight.destination}` },
                  { label: flight.destination, time: flight.arrivalTime, note: 'Ground services available upon landing' },
                ].map((segment) => (
                  <div key={segment.label} className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-brand flex-shrink-0 sm:h-3 sm:w-3" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{segment.label}</p>
                      <p className="text-xs text-slate-600 sm:text-sm">{segment.note}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 flex-shrink-0 sm:text-sm">{segment.time}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-sm">What's included</p>
              <div className="mt-4 grid gap-3 grid-cols-2 sm:mt-6 sm:gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                  <p className="text-xs text-slate-500 sm:text-sm">Baggage</p>
                  <p className="mt-1 text-xs font-semibold text-slate-900 sm:mt-2 sm:text-sm">{flight.baggage}</p>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                  <p className="text-xs text-slate-500 sm:text-sm">Aircraft</p>
                  <p className="mt-1 text-xs font-semibold text-slate-900 sm:mt-2 sm:text-sm">{flight.aircraft}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4 sm:space-y-6">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">Fare summary</p>
            <div className="mt-4 space-y-3 text-xs text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
              <div className="flex items-center justify-between">
                <span>Base fare</span>
                <span className="font-semibold">{formatCurrency(flight.baseFare)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes and fees</span>
                <span className="font-semibold">{formatCurrency(flight.taxAmount)}</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 text-slate-800 sm:rounded-3xl sm:p-4">
                <div className="flex items-center justify-between text-xs font-semibold sm:text-sm">
                  <span>Total ({flight.currency})</span>
                  <span>{formatCurrency(flight.price)}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/traveller-details')}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white transition hover:bg-brand-dark sm:mt-6 sm:text-sm gap-2"
            >
              Continue to traveller details <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-sm">Refund policy</p>
            <p className="mt-3 text-xs leading-5 text-slate-600 sm:mt-4 sm:text-sm sm:leading-6">
              {flight.refundable 
                ? "This flight offers flexible refunds. You can modify your booking or request a refund within 24 hours of departure."
                : "This is a non-refundable ticket. You may be able to modify your booking before departure according to the airline's policy."
              }
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-slate-700 shadow-sm sm:mt-4 sm:px-4 sm:py-2 sm:text-sm">
              <CheckCircle2 size={14} className={flight.refundable ? "text-green-600 flex-shrink-0" : "text-brand flex-shrink-0"} />
              {flight.refundable ? "Refundable ticket" : "Non-refundable ticket"}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
