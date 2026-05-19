import { motion } from 'framer-motion';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = ['Round Trip', 'One Way', 'Multi-city'];

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState('Round Trip');
  const navigate = useNavigate();

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft sm:p-10">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Smart search</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Find the flight that fits your schedule and comfort.
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 shadow-inner">
          <span className="mr-2 text-brand">Live</span>
          rates updated hourly
        </div>
      </div>

      <div className="grid gap-4 rounded-[1.5rem] bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-2 shadow-sm">
          {tabs.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(label)}
              className={`rounded-3xl px-4 py-2 text-sm transition ${
                activeTab === label
                  ? 'bg-brand text-white shadow-soft'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={16} /> From
            </span>
            <input
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="San Francisco"
              defaultValue="San Francisco"
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={16} /> To
            </span>
            <input
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              placeholder="New York"
              defaultValue="New York"
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar size={16} /> Departure
            </span>
            <input type="date" className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none" defaultValue="2026-07-20" />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar size={16} /> Return
            </span>
            <input type="date" className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none" defaultValue="2026-07-27" />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users size={16} /> Travellers
            </span>
            <input className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none" placeholder="2 adults" defaultValue="2 adults" />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Search size={16} /> Cabin class
            </span>
            <input className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none" placeholder="Premium Economy" defaultValue="Premium Economy" />
          </label>
        </div>

        <motion.div whileHover={{ y: -2 }} className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="inline-flex items-center justify-center rounded-3xl bg-brand px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          >
            Search flights
          </button>
        </motion.div>
      </div>
    </section>
  );
}
