import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import Select from "./Select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

const tabs = ["roundtrip", "oneway", "multicity"];

export default function HeroSearch() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("roundtrip");
  const [from, setFrom] = useState("Kathmandu");
  const [to, setTo] = useState("Sydney");
  const [depart, setDepart] = useState("2026-07-20");
  const [ret, setRet] = useState("2026-07-27");
  const [travellers, setTravellers] = useState("2");
  const [cabin, setCabin] = useState("Premium Economy");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams({
      from,
      to,
      depart,
      ret,
      travellers,
      cabin,
      trip: activeTab,
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft sm:p-10">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            {t("search.subtitle")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {t("search.title")}
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 shadow-inner">
          <span className="mr-2 text-brand">{t("search.live")}</span>
          {t("search.live_note")}
        </div>
      </div>

      <div className="grid gap-4 rounded-[1.5rem] bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-2 shadow-sm">
          {tabs.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-3xl px-4 py-2 text-sm transition ${
                activeTab === key
                  ? "bg-brand text-white shadow-soft"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(`search.tabs.${key}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={16} /> {t("search.from")}
            </span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              placeholder={t("search.from")}
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={16} /> {t("search.to")}
            </span>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              placeholder={t("search.to")}
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar size={16} /> {t("search.departure")}
            </span>
            <input
              type="date"
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar size={16} /> {t("search.return")}
            </span>
            <input
              type="date"
              value={ret}
              onChange={(e) => setRet(e.target.value)}
              className="mt-3 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
            />
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users size={16} /> {t("search.travellers")}
            </span>
            <div className="mt-3">
              <Select
                ariaLabel={t("search.travellers")}
                value={travellers}
                onChange={(v: string) => setTravellers(v)}
                options={[1, 2, 3, 4, 5].map((n) => ({
                  value: String(n),
                  label: `${n} ${n === 1 ? t("search.traveller_singular") : t("search.traveller_plural")}`,
                }))}
              />
            </div>
          </label>
          <label className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand/60">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Search size={16} /> {t("search.cabin")}
            </span>
            <div className="mt-3">
              <Select
                ariaLabel={t("search.cabin")}
                value={cabin}
                onChange={(v: string) => setCabin(v)}
                options={[
                  {
                    value: "Economy",
                    label: t("search.cabin_options.economy"),
                  },
                  {
                    value: "Premium Economy",
                    label: t("search.cabin_options.premium"),
                  },
                  {
                    value: "Business",
                    label: t("search.cabin_options.business"),
                  },
                  { value: "First", label: t("search.cabin_options.first") },
                ]}
              />
            </div>
          </label>
        </div>

        <motion.div whileHover={{ y: -2 }} className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex items-center justify-center rounded-3xl bg-brand px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          >
            {t("search.search_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
