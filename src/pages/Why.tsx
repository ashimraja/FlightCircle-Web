import { ArrowRight, CreditCard, ShieldCheck, Ticket, Zap, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: Ticket,
    title: 'Clear trip selection',
    description: 'Simple flight comparison with premium details and fewer distractions. Every flight card is designed for quick decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Confidence-driven choices',
    description: 'Transparent fares, baggage notes, and refund clarity for every booking. No hidden surprises.',
  },
  {
    icon: CreditCard,
    title: 'Ready for next phase',
    description: 'A polished booking flow built to transition seamlessly into payments. From search to confirmation.',
  },
  {
    icon: Zap,
    title: 'Lightning-fast search',
    description: 'Instant flight filtering with real-time results. Find your perfect flight in seconds.',
  },
  {
    icon: Globe,
    title: 'Global coverage',
    description: 'Access to flights across major routes with trusted airlines and premium service partners.',
  },
  {
    icon: Award,
    title: 'Premium experience',
    description: 'Designed by travelers, for travelers. Every detail reflects quality and user care.',
  },
];

export default function Why() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-brand/15 via-white to-slate-100 px-4 py-8 shadow-soft sm:rounded-[2rem] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <span className="inline-flex rounded-full bg-brand/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:px-4 sm:text-sm">
            Why choose us
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            A crafted booking journey for premium travelers.
          </h1>
          <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Flight Circle is built with intention. Every interaction, every design decision, and every feature is crafted to make your flight search and booking experience intuitive, transparent, and enjoyable.
          </p>
        </div>
      </div>

      <section className="space-y-6 sm:space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">What sets us apart</h2>
          <p className="text-xs text-slate-600 sm:text-sm">Six core values that define the Flight Circle experience</p>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-lg hover:border-brand/40 sm:rounded-[1.75rem] sm:p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-brand/10 text-brand sm:h-12 sm:w-12 mb-4">
                  <Icon size={20} className="sm:size-24" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 sm:text-lg">{benefit.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Built for real travelers</h2>
            <div className="space-y-3 text-xs text-slate-600 sm:space-y-4 sm:text-sm">
              <p>
                Flight Circle isn't a generic booking platform. It's a premium prototype designed for travelers who value clarity, transparency, and beautiful design.
              </p>
              <p>
                Every component, every interaction, and every animation is intentional. We believe that booking a flight should feel as premium as the journey itself.
              </p>
              <p>
                Our team has spent countless hours refining the details—from perfect typography hierarchy to smooth transitions—ensuring that every pixel serves a purpose.
              </p>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:px-5 sm:text-sm"
            >
              Experience it now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 space-y-3 sm:rounded-[1.75rem] sm:p-6 sm:space-y-4">
            {[
              { label: 'Design approach', value: 'Minimalist & premium' },
              { label: 'User focus', value: 'Travelers first' },
              { label: 'Technology', value: 'React + TypeScript' },
              { label: 'Philosophy', value: 'Less clutter, more clarity' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 sm:mt-2 sm:text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
