import { motion } from "framer-motion";
import { ArrowRight, CreditCard, ShieldCheck, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import DealCard from "../components/DealCard";
import DestinationCard from "../components/DestinationCard";
import HeroSearch from "../components/HeroSearch";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import destinations from "../data/destinations.json";
import deals from "../data/deals.json";
import testimonials from "../data/testimonials.json";
import { useI18n } from "../i18n/I18nProvider";

const benefits = [
  {
    icon: Ticket,
    title: "Clear trip selection",
    description:
      "Simple flight comparison with premium details and fewer distractions.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence-driven choices",
    description:
      "Transparent fares, baggage notes, and refund clarity for every booking.",
  },
  {
    icon: CreditCard,
    title: "Ready for next phase",
    description:
      "A polished booking flow built to transition seamlessly into payments.",
  },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="space-y-12 sm:space-y-16">
      <HeroSearch />

      <section className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-brand/15 via-white to-slate-100 px-4 py-8 shadow-soft sm:rounded-[2.5rem] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <span className="inline-flex rounded-full bg-brand/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:px-4 sm:py-2 sm:text-sm">
              Nepal ↔ Australia routes
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              Book flights from Nepal to Australia — and beyond.
            </h1>
            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              Flight Circle helps travelers from Nepal find and book flights to
              Australia with clear fares, secure checkout, and local support.
              Other international destinations are available too.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:px-6"
              >
                {t("hero.cta_search")} <ArrowRight size={16} />
              </Link>
              <a
                href="#why"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand/40"
              >
                {t("hero.cta_benefits")}
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-slate-200" />
            <div className="space-y-4 sm:space-y-6">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-slate-50 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Featured route
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 sm:mt-3 sm:text-xl">
                    KTM → SYD
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-slate-50 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Approx. starting fare
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 sm:mt-3 sm:text-xl">
                    NPR 120,000
                  </p>
                </div>
              </div>
              <div className="rounded-[1.25rem] bg-brand/5 p-4 text-slate-700 sm:rounded-[1.5rem] sm:p-6">
                <p className="text-sm font-medium text-slate-900">
                  Focused on Nepal → Australia
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                  Search, compare, and book flights between Nepal and Australia
                  with clear baggage rules, fare breakdowns, and local customer
                  support.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" id="deals">
        <SectionHeading
          title={t("sections.trending_deals.title")}
          description={t("sections.trending_deals.description")}
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <DealCard key={deal.title} {...deal} />
          ))}
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <SectionHeading
          title={t("sections.popular_destinations.title")}
          description={t("sections.popular_destinations.description")}
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.city} {...destination} />
          ))}
        </div>
      </section>

      <section className="space-y-8 sm:space-y-10" id="why">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm">
              Why choose Flight Circle
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Focused on Nepal → Australia bookings
            </h2>
            <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Specialized in Nepal–Australia routes with transparent pricing,
              flexible options, and local customer support based in Kathmandu.
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[1.75rem] sm:p-6"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-brand/10 text-brand sm:h-12 sm:w-12">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-8" id="testimonials">
        <SectionHeading
          title={t("sections.testimonials.title")}
          description={t("sections.testimonials.description")}
        />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
}
