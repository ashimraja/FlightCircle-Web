import { Star } from "lucide-react";
import { useState } from "react";
import TestimonialCard from "../components/TestimonialCard";
import SectionHeading from "../components/SectionHeading";
import testimonials from "../data/testimonials.json";
import { useI18n } from "../i18n/I18nProvider";
import Modal from "../components/Modal";
import FeedbackForm from "../components/FeedbackForm";

export default function Testimonials() {
  const { t } = useI18n();
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div className="space-y-10 sm:space-y-16">
      <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-brand/15 via-white to-slate-100 px-4 py-8 shadow-soft sm:rounded-[2rem] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <span className="inline-flex rounded-full bg-brand/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:px-4 sm:text-sm">
            {t("testimonials.badge")}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h1>
          <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {t("testimonials.subtitle")}
          </p>
        </div>
      </div>

      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-2 sm:gap-3 text-center">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-brand text-brand sm:size-18"
              />
            ))}
          </div>
          <p className="text-xs text-slate-600 sm:text-sm">
            {t("testimonials.rating_text")}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {[
            { label: t("testimonials.stats.happy_users"), value: "10,000+" },
            { label: t("testimonials.stats.flights_booked"), value: "50,000+" },
            { label: t("testimonials.stats.satisfaction"), value: "98%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-center sm:rounded-[1.75rem] sm:p-6"
            >
              <p className="text-xs text-slate-600 sm:text-sm">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-brand sm:mt-3 sm:text-3xl lg:text-4xl">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-center sm:rounded-[2rem] sm:p-8 lg:p-12">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {t("testimonials.join_title")}
        </h2>
        <p className="mt-2 text-xs text-slate-600 sm:mt-3 sm:text-sm">
          {t("testimonials.join_text")}
        </p>
        <button
          onClick={() => setShowFeedback(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:mt-6 sm:px-5 sm:text-sm"
        >
          {t("testimonials.share_cta")}
        </button>
        <Modal
          open={showFeedback}
          onClose={() => setShowFeedback(false)}
          title={t("feedback.title")}
        >
          <FeedbackForm onDone={() => setShowFeedback(false)} />
        </Modal>
      </section>
    </div>
  );
}
