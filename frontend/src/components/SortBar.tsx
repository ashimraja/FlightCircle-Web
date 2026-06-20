import { ChevronDown } from 'lucide-react';

type SortBarProps = {
  sortBy: 'best' | 'price' | 'duration';
  onSortChange: (id: 'best' | 'price' | 'duration') => void;
};

export default function SortBar({ sortBy, onSortChange }: SortBarProps) {
  const sortOptions = [
    { id: 'best' as const, label: 'Best match' },
    { id: 'price' as const, label: 'Price' },
    { id: 'duration' as const, label: 'Duration' },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">Search results</p>
        <p className="text-xs text-slate-500 sm:text-sm">Best flights available for your route</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 sm:gap-3">
        <span className="hidden sm:inline">Sort by:</span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSortChange(option.id)}
              className={`rounded-full px-3 py-2 text-xs sm:text-sm transition ${
                sortBy === option.id
                  ? 'bg-brand text-white shadow-soft'
                  : 'border border-slate-200 bg-white hover:border-brand/70 hover:text-slate-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

