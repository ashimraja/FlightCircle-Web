import { motion } from 'framer-motion';
import { ArrowRight, Globe, Moon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Flight } from '../types';
import { formatCurrency } from '../utils/format';

type FlightCardProps = {
  flight: Flight;
};

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft transition sm:rounded-[2rem] sm:p-6"
    >
      <div className="flex flex-col gap-4">
        {/* Header: Airline and aircraft info */}
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand font-semibold text-xs sm:h-12 sm:w-12 sm:text-sm">
            {flight.airlineCode}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm">{flight.airline}</p>
            <p className="text-xs text-slate-600 sm:text-sm">{flight.aircraft} • {flight.baggage}</p>
          </div>
        </div>

        {/* Flight details: Times and price */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
          <div className="rounded-[1.25rem] bg-slate-50 p-3 sm:p-4 sm:rounded-3xl">
            <p className="text-lg font-semibold text-slate-900 sm:text-2xl">{flight.departureTime}</p>
            <p className="text-xs text-slate-500 sm:text-sm mt-1">{flight.originCode}</p>
          </div>
          <div className="rounded-[1.25rem] bg-slate-50 p-3 sm:p-4 sm:rounded-3xl sm:text-center">
            <p className="text-xs text-slate-500 sm:text-sm">{flight.duration}</p>
            <div className="my-2 h-px bg-slate-200" />
            <p className="text-xs text-slate-500 sm:text-sm">{flight.stops}</p>
          </div>
          <div className="rounded-[1.25rem] bg-slate-50 p-3 sm:p-4 sm:rounded-3xl sm:text-right">
            <p className="text-lg font-semibold text-slate-900 sm:text-2xl">{flight.arrivalTime}</p>
            <p className="text-xs text-slate-500 sm:text-sm mt-1">{flight.destinationCode}</p>
          </div>
        </div>

        {/* Price and features */}
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 space-y-2 sm:rounded-[1.5rem] sm:p-4 sm:space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-xs text-slate-500 sm:text-sm">Price</p>
                <p className="text-lg font-semibold text-slate-900 sm:text-xl">{formatCurrency(flight.price)}</p>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Preferred</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Sparkles size={14} /> Flexible
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe size={14} /> {flight.rating.toFixed(1)}★
            </span>
            <span className="inline-flex items-center gap-1">
              <Moon size={14} /> Night-friendly
            </span>
          </div>
        </div>

        {/* Action button */}
        <Link
          to={`/details/${flight.id}`}
          className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white transition hover:bg-brand-dark sm:text-sm gap-2"
        >
          Select flight <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
