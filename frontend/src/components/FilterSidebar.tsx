import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

const airlineOptions = ['Aether Air', 'Skylark Airlines', 'Nimbus', 'Voyage'];
const stopOptions = ['any', 'Non-stop', '1 stop', '2+ stops'] as const;
const classOptions = ['any', 'Economy', 'Premium Economy', 'Business'] as const;

type StopFilter = (typeof stopOptions)[number];
type TravelClass = (typeof classOptions)[number];

type FilterSidebarProps = {
  stops: StopFilter;
  airlines: string[];
  travelClass: TravelClass;
  onStopsChange: (value: StopFilter) => void;
  onAirlineChange: (airline: string) => void;
  onClassChange: (value: TravelClass) => void;
  onClearFilters: () => void;
};

export default function FilterSidebar({
  stops,
  airlines,
  travelClass,
  onStopsChange,
  onAirlineChange,
  onClassChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>('stops');

  const toggleFilter = (filterId: string) => {
    setExpandedFilter(expandedFilter === filterId ? null : filterId);
  };

  const FilterGroup = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: ReactNode;
  }) => {
    const isExpanded = expandedFilter === id;
    return (
      <div className="rounded-3xl bg-slate-50">
        <button
          type="button"
          onClick={() => toggleFilter(id)}
          className="flex w-full items-center justify-between p-4 transition hover:bg-slate-100"
        >
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <ChevronDown
            size={18}
            className={`transition ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded && (
          <div className="border-t border-slate-200 px-4 py-4">
            <div className="space-y-3 text-sm text-slate-600">{children}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="sticky top-24 space-y-3 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Filters</p>
        <p className="mt-2 text-xs text-slate-600 sm:text-sm">Refine your search with real route preferences.</p>
      </div>

      <div className="space-y-3">
        <FilterGroup id="stops" title="Stops">
          <>
            {stopOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="stops"
                  checked={stops === option}
                  onChange={() => onStopsChange(option)}
                  className="h-4 w-4 rounded border-slate-300 text-brand"
                />
                <span className="capitalize text-slate-700">{option === 'any' ? 'Any' : option}</span>
              </label>
            ))}
          </>
        </FilterGroup>

        <FilterGroup id="airlines" title="Airlines">
          <>
            {airlineOptions.map((airline) => (
              <label key={airline} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={airlines.includes(airline)}
                  onChange={() => onAirlineChange(airline)}
                  className="h-4 w-4 rounded border-slate-300 text-brand"
                />
                <span>{airline}</span>
              </label>
            ))}
          </>
        </FilterGroup>

        <FilterGroup id="class" title="Travel class">
          <>
            {classOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="class"
                  checked={travelClass === option}
                  onChange={() => onClassChange(option)}
                  className="h-4 w-4 rounded border-slate-300 text-brand"
                />
                <span className="capitalize text-slate-700">{option === 'any' ? 'Any' : option}</span>
              </label>
            ))}
          </>
        </FilterGroup>

        <button
          type="button"
          onClick={onClearFilters}
          className="w-full rounded-3xl bg-brand/10 py-3 text-sm font-semibold text-brand transition hover:bg-brand/20"
        >
          Clear filters
        </button>
      </div>
    </aside>
  );
}

