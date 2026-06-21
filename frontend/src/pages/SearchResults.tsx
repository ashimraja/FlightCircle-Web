import { useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "../hooks/useApi";
import { searchFlightsApi } from "../services/searchService";
import FlightCard from "../components/FlightCard";
import FilterSidebar from "../components/FilterSidebar";
import SortBar from "../components/SortBar";
import SkeletonCard from "../components/SkeletonCard";
import HeroSearch from "../components/HeroSearch";
import type { Flight } from "../types";
import { Filter, X, Search } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import { useLocation } from "react-router-dom";

type SortOption = "best" | "price" | "duration";
type StopFilter = "any" | "Non-stop" | "1 stop" | "2+ stops";
type TravelClass = "any" | "Economy" | "Premium Economy" | "Business";

const defaultFilters: {
  stops: StopFilter;
  airlines: string[];
  travelClass: TravelClass;
} = {
  stops: "any",
  airlines: [], // Will be populated dynamically
  travelClass: "any",
};

function parseDuration(duration: string) {
  const hours = Number(duration.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(duration.match(/(\d+)m/)?.[1] ?? 0);
  return hours * 60 + minutes;
}

export default function SearchResults() {
  const location = useLocation();
  // Parse query params for initial state
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const initialCabin = (query.get("cabin") as TravelClass) || "any";
  const fromParam = query.get("from") || "";
  const toParam = query.get("to") || "";
  const departParam = query.get("depart") || "";
  const retParam = query.get("ret") || undefined;
  const travellersParam = query.get("travellers") || "1";

  // Create operation function that's memoized to avoid unnecessary re-renders
  const searchOperation = useMemo(() => {
    if (!fromParam || !toParam || !departParam) return null;
    
    return () =>
      searchFlightsApi({
        from: fromParam,
        to: toParam,
        depart: departParam,
        ret: retParam,
        travellers: travellersParam,
        cabin: initialCabin === "any" ? undefined : initialCabin,
      });
  }, [fromParam, toParam, departParam, retParam, travellersParam, initialCabin]);

  const { data: flights, loading, error } = useApi<Flight[]>(
    searchOperation,
    [],
    { retries: 2, retryDelay: 1000 }
  );

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("best");
  
  // Dynamically set available airlines from fetched flights
  const availableAirlines = useMemo(() => {
    const airlines = new Set(flights.map(f => f.airline));
    return Array.from(airlines).sort();
  }, [flights]);

  const [filters, setFilters] = useState({
    ...defaultFilters,
    airlines: availableAirlines,
    travelClass: initialCabin,
  });

  const [isRefining, setIsRefining] = useState(false);
  const firstRender = useRef(true);

  // Update available airlines when flights change
  useEffect(() => {
    setFilters(current => ({
      ...current,
      airlines: availableAirlines.length > 0 ? availableAirlines : current.airlines,
    }));
  }, [availableAirlines]);

  const displayFlights = useMemo(() => {
    if (!flights) return [];
    return flights
      .filter((flight) => {
        const matchesStops =
          filters.stops === "any" || flight.stops === filters.stops;

        const matchesAirline = filters.airlines.includes(flight.airline);

        const matchesClass =
          filters.travelClass === "any" ||
          (filters.travelClass === "Economy" && flight.cabinClass === "economy") ||
          (filters.travelClass === "Premium Economy" && flight.cabinClass === "premium_economy") ||
          (filters.travelClass === "Business" && flight.cabinClass === "business");

        return matchesStops && matchesAirline && matchesClass;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "duration")
          return parseDuration(a.duration) - parseDuration(b.duration);
        // For "best", sort by price but prefer non-stop flights
        const stopDiff = (a.stops === "Non-stop" ? 0 : 1) - (b.stops === "Non-stop" ? 0 : 1);
        return stopDiff !== 0 ? stopDiff : a.price - b.price;
      });
  }, [flights, filters, sortBy]);

  useEffect(() => {
    if (loading) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setIsRefining(true);
    const timer = window.setTimeout(() => setIsRefining(false), 450);
    return () => window.clearTimeout(timer);
  }, [filters, sortBy, loading]);

  const { t } = useI18n();

  const summaryText = useMemo(() => {
    if (loading) return t("results.loading");
    if (error) return `Error: ${error}`;
    if (isRefining) return t("results.refining");
    if (!displayFlights.length) return t("results.no_matches");
    const routeText =
      fromParam && toParam ? ` for ${fromParam} → ${toParam}` : "";
    return t("results.found")
      .replace("{count}", String(displayFlights.length))
      .replace("{route}", routeText);
  }, [displayFlights.length, isRefining, loading, error, t]);

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];
    if (filters.stops !== "any") labels.push(filters.stops);
    if (filters.airlines.length !== availableAirlines.length && filters.airlines.length > 0)
      labels.push(...filters.airlines);
    if (filters.travelClass !== "any") labels.push(filters.travelClass);
    return labels;
  }, [filters, availableAirlines.length]);

  const handleStopsChange = (value: StopFilter) => {
    setFilters((current) => ({ ...current, stops: value }));
  };

  const handleAirlineToggle = (airline: string) => {
    setFilters((current) => {
      const next = current.airlines.includes(airline)
        ? current.airlines.filter((item) => item !== airline)
        : [...current.airlines, airline];
      return { ...current, airlines: next.length ? next : availableAirlines };
    });
  };

  const handleClassChange = (value: TravelClass) => {
    setFilters((current) => ({ ...current, travelClass: value }));
  };

  const handleClearFilters = () => setFilters({ 
    ...defaultFilters, 
    airlines: availableAirlines,
    travelClass: initialCabin,
  });

  const hasSearchParams = !!(fromParam && toParam && departParam);
  const tripParam = query.get("trip") || "roundtrip";

  // When navigated directly without search params, show full search form
  if (!hasSearchParams) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
          <div className="flex flex-col items-center text-center gap-3 py-4 sm:py-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand sm:h-16 sm:w-16">
              <Search size={28} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t("results.title")}
            </h1>
            <p className="max-w-md text-sm text-slate-500 sm:text-base">
              Search from hundreds of flights between Nepal, Australia, and beyond. Enter your details below to get started.
            </p>
          </div>
        </div>
        <HeroSearch
          initialValues={{
            from: "",
            to: "",
            depart: "",
            ret: "",
            travellers: "1",
            cabin: "Economy",
            trip: "roundtrip",
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Compact search bar — collapsible, shows current search */}
      <HeroSearch
        compact
        initialValues={{
          from: fromParam,
          to: toParam,
          depart: departParam,
          ret: retParam,
          travellers: travellersParam,
          cabin: initialCabin === "any" ? "Economy" : initialCabin,
          trip: tripParam,
        }}
      />

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">
              {t("search.subtitle")}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900 sm:mt-2 sm:text-2xl">
              {t("results.title")}
            </p>
            {fromParam && toParam && (
              <p className="mt-1 text-sm text-slate-500">{`${fromParam} → ${toParam}`}</p>
            )}
          </div>
          <p className="text-xs text-slate-500 sm:text-sm whitespace-nowrap">
            {summaryText}
          </p>
        </div>
        {activeFilterLabels.length > 0 && !loading && !isRefining && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {t("results.filters_active")}
            </span>
            {activeFilterLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>


      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filter Sidebar - Hidden on mobile, visible on lg */}
        <div className="hidden lg:block">
          <FilterSidebar
            stops={filters.stops}
            airlines={filters.airlines}
            travelClass={filters.travelClass}
            onStopsChange={handleStopsChange}
            onAirlineChange={handleAirlineToggle}
            onClassChange={handleClassChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-900 shadow-soft transition hover:border-brand/60"
          >
            <Filter size={18} />
            {showFilters ? t("ui.hide_filters") : t("ui.show_filters")}
          </button>
          {showFilters && (
            <div className="mt-4">
              <FilterSidebar
                stops={filters.stops}
                airlines={filters.airlines}
                travelClass={filters.travelClass}
                onStopsChange={handleStopsChange}
                onAirlineChange={handleAirlineToggle}
                onClassChange={handleClassChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}
        </div>

        {/* Flight Results */}
        <div className="space-y-4 sm:space-y-6">
          <SortBar sortBy={sortBy} onSortChange={setSortBy} />
          {loading || isRefining ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-soft sm:px-5">
                {loading
                  ? "Connecting to the search engine..."
                  : "Refining results with your filters..."}
              </div>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : displayFlights.length ? (
            <div className="space-y-4 sm:space-y-6">
              {displayFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600 sm:rounded-[2rem] sm:p-10">
              <p className="text-lg font-semibold text-slate-900 sm:text-xl">
                No flights match your selected preferences
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-600 sm:mt-3 sm:text-sm">
                Try relaxing the airline or stop filters, or switch to a broader
                travel class.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
