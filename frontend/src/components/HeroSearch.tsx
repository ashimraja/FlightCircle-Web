import { motion } from "framer-motion";
import { Search, Calendar, Users, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import Select from "./Select";
import AirportInput from "./AirportInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";
import { AIRPORTS } from "../constants/airports";

const tabs = ["roundtrip", "oneway", "multicity"];

type HeroSearchProps = {
  /** When true, renders a compact inline search bar (for the results page) */
  compact?: boolean;
  /** Initial values to pre-fill the form (e.g. from URL params) */
  initialValues?: {
    from?: string;
    to?: string;
    depart?: string;
    ret?: string;
    travellers?: string;
    cabin?: string;
    trip?: string;
  };
};

export default function HeroSearch({ compact = false, initialValues }: HeroSearchProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(initialValues?.trip || "roundtrip");
  const [from, setFrom] = useState(initialValues?.from || "Kathmandu");
  const [to, setTo] = useState(initialValues?.to || "Sydney");
  const [depart, setDepart] = useState(initialValues?.depart || "2026-07-20");
  const [ret, setRet] = useState(initialValues?.ret || "2026-07-27");
  const [travellers, setTravellers] = useState(initialValues?.travellers || "2");
  const [cabin, setCabin] = useState(initialValues?.cabin || "Premium Economy");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState(!compact || !initialValues?.from);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate departure city
    if (!from.trim()) {
      newErrors.from = "Departure city is required";
    } else if (!AIRPORTS.find(a => a.city.toLowerCase() === from.toLowerCase())) {
      newErrors.from = "Invalid departure city";
    }

    // Validate arrival city
    if (!to.trim()) {
      newErrors.to = "Arrival city is required";
    } else if (!AIRPORTS.find(a => a.city.toLowerCase() === to.toLowerCase())) {
      newErrors.to = "Invalid arrival city";
    }

    // Check if from and to are different
    if (from.toLowerCase() === to.toLowerCase()) {
      newErrors.to = "Departure and arrival cities must be different";
    }

    // Validate departure date
    if (!depart) {
      newErrors.depart = "Departure date is required";
    } else if (new Date(depart) <= new Date()) {
      newErrors.depart = "Departure date must be in the future";
    }

    // Validate return date if round trip
    if (activeTab === "roundtrip") {
      if (!ret) {
        newErrors.ret = "Return date is required";
      } else if (new Date(ret) <= new Date(depart)) {
        newErrors.ret = "Return date must be after departure date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!validateInputs()) {
      return;
    }

    // Only include return date if it's a round trip
    const params: Record<string, string> = {
      from,
      to,
      depart,
      travellers,
      cabin,
      trip: activeTab,
    };
    
    if (activeTab === "roundtrip") {
      params.ret = ret;
    }
    
    const searchParams = new URLSearchParams(params);
    navigate(`/search?${searchParams.toString()}`);
  };

  // Compact collapsed summary bar
  if (compact && !expanded) {
    return (
      <section className="rounded-2xl sm:rounded-[2rem] border border-slate-200/80 bg-white/95 p-3 sm:p-4 shadow-soft overflow-hidden">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex w-full items-center justify-between gap-3"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-700 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-brand truncate">
              {from || "From"} → {to || "To"}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
              <Calendar size={14} /> {depart || "Date"}
            </span>
            {activeTab === "roundtrip" && ret && (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Calendar size={14} /> {ret}
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
              <Users size={14} /> {travellers}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-brand sm:text-sm">Modify</span>
            <ChevronDown size={18} className="text-brand" />
          </div>
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl sm:rounded-[2rem] border border-slate-200/80 bg-white/95 p-3 sm:p-10 shadow-soft overflow-hidden">
      {!compact && (
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">
              {t("search.subtitle")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {t("search.title")}
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 shadow-inner self-start sm:self-auto">
            <span className="mr-2 text-brand">{t("search.live")}</span>
            {t("search.live_note")}
          </div>
        </div>
      )}

      {compact && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            {t("search.subtitle")}
          </p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition"
          >
            Collapse <ChevronUp size={16} />
          </button>
        </div>
      )}

      <div className="grid gap-3 sm:gap-4 rounded-2xl sm:rounded-[1.5rem] bg-slate-50 p-2 sm:p-5">
        <div className="grid grid-cols-3 gap-1 sm:flex sm:flex-wrap sm:gap-3 rounded-3xl bg-white p-1 sm:p-2 shadow-sm">
          {tabs.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-3xl px-2 py-2 sm:px-4 text-center text-xs sm:text-sm transition ${
                activeTab === key
                  ? "bg-brand text-white shadow-soft"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(`search.tabs.${key}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <AirportInput
              value={from}
              onChange={(value) => {
                setFrom(value);
                setErrors(prev => ({ ...prev, from: '' }));
              }}
              label={t("search.from")}
              placeholder={t("search.from")}
            />
            {errors.from && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={14} /> {errors.from}
              </p>
            )}
          </div>

          <div>
            <AirportInput
              value={to}
              onChange={(value) => {
                setTo(value);
                setErrors(prev => ({ ...prev, to: '' }));
              }}
              label={t("search.to")}
              placeholder={t("search.to")}
            />
            {errors.to && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={14} /> {errors.to}
              </p>
            )}
          </div>

          <div>
            <div className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 transition hover:border-brand/60 overflow-hidden">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar size={16} /> {t("search.departure")}
              </span>
              <input
                type="date"
                value={depart}
                onChange={(e) => {
                  setDepart(e.target.value);
                  setErrors(prev => ({ ...prev, depart: '' }));
                }}
                className="mt-2 sm:mt-3 w-full bg-transparent text-base sm:text-lg font-semibold text-slate-900 outline-none"
              />
            </div>
            {errors.depart && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={14} /> {errors.depart}
              </p>
            )}
          </div>

          {activeTab === "roundtrip" && (
            <div>
              <div className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 transition hover:border-brand/60 overflow-hidden">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar size={16} /> {t("search.return")}
                </span>
                <input
                  type="date"
                  value={ret}
                  onChange={(e) => {
                    setRet(e.target.value);
                    setErrors(prev => ({ ...prev, ret: '' }));
                  }}
                  className="mt-2 sm:mt-3 w-full bg-transparent text-base sm:text-lg font-semibold text-slate-900 outline-none"
                />
              </div>
              {errors.ret && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={14} /> {errors.ret}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 transition hover:border-brand/60 overflow-hidden">
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
          </div>

          <div className="flex flex-col group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 transition hover:border-brand/60 overflow-hidden">
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
          </div>
        </div>

        <motion.div whileHover={{ y: -2 }} className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-3xl bg-brand px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          >
            {t("search.search_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
