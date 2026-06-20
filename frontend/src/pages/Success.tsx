import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-10"
      >
        <div className="flex items-start gap-3 rounded-2xl bg-brand/5 p-3 text-slate-900 sm:items-center sm:gap-4 sm:rounded-[1.75rem] sm:p-6">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-3xl bg-brand text-white sm:h-14 sm:w-14">
            <CheckCircle2 size={20} className="sm:size-24" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">Booking confirmed</p>
            <p className="mt-1 text-xl font-semibold sm:mt-2 sm:text-3xl">Your reservation is ready.</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 sm:mt-10 sm:space-y-6">
          <div className="rounded-2xl bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 sm:text-sm">Reference</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-4xl">FC672401</p>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
              <p className="text-xs text-slate-500 sm:text-sm">Route</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 sm:mt-3 sm:text-xl">SFO → JFK</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
              <p className="text-xs text-slate-500 sm:text-sm">Passenger</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 sm:mt-3 sm:text-xl">Avery Morgan</p>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 sm:rounded-[1.75rem] sm:p-6">
            <p className="text-xs text-slate-500 sm:text-sm">Flight details</p>
            <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-3 grid-cols-2 sm:grid-cols-3">
              {[
                { label: 'Departure', value: '07:10 • Jul 20' },
                { label: 'Arrival', value: '15:05 • Jul 20' },
                { label: 'Cabin', value: 'Premium Economy' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white p-2 shadow-sm sm:rounded-3xl sm:p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 sm:text-xs">{item.label}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-900 sm:mt-2 sm:text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8"
      >
        <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">Next steps</p>
        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-[1.75rem] sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">Download your ticket</p>
            <p className="mt-2 text-xs text-slate-900 sm:mt-3 sm:text-sm">A digital ticket is ready for your itinerary and can be shared instantly.</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-[1.75rem] sm:p-5">
            <p className="text-xs text-slate-500 sm:text-sm">Prepare for travel</p>
            <p className="mt-2 text-xs text-slate-900 sm:mt-3 sm:text-sm">Review baggage allowances, airport check-in, and lounge access options before departure.</p>
          </div>
          <button className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white transition hover:bg-brand-dark sm:mt-4 sm:gap-2">
            Download ticket <Download size={16} />
          </button>
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-900 transition hover:bg-slate-100 sm:gap-2"
          >
            Return to homepage <ArrowRight size={16} />
          </Link>
        </div>
      </motion.aside>
    </div>
  );
}
