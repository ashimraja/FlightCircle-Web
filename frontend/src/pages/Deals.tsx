import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DealCard from '../components/DealCard';
import SectionHeading from '../components/SectionHeading';
import deals from '../data/deals.json';

export default function Deals() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-brand/15 via-white to-slate-100 px-4 py-8 shadow-soft sm:rounded-[2rem] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <span className="inline-flex rounded-full bg-brand/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:px-4 sm:text-sm">
            Exclusive offers
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Premium deals on trending routes.
          </h1>
          <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Discover handpicked flight deals with exceptional fares, ideal connections, and flexible booking options. All curated for premium travelers seeking value without compromise.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:px-6"
          >
            Explore all flights <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <section className="space-y-6 sm:space-y-8">
        <SectionHeading title="Available deals" description="Browse through our curated selection of premium flight offers." />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <DealCard key={deal.title} {...deal} />
          ))}
        </div>
      </section>

      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-center sm:rounded-[2rem] sm:p-8 lg:p-12">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">See more flight options</h2>
        <p className="mt-2 text-xs text-slate-600 sm:mt-3 sm:text-sm">Access the full flight search to find more deals and personalized options.</p>
        <Link
          to="/search"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:mt-6 sm:px-6 sm:text-sm"
        >
          Start searching <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
