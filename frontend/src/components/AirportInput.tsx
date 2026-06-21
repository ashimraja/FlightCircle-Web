import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { searchAirports, AIRPORTS } from '../constants/airports';

type AirportInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
};

export default function AirportInput({
  value,
  onChange,
  placeholder = 'Select airport',
  label,
}: AirportInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(AIRPORTS);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newSuggestions = searchAirports(value);
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const airport = suggestions[selectedIndex];
          onChange(airport.city);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (airport: typeof AIRPORTS[0]) => {
    onChange(airport.city);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const selectedAirport = AIRPORTS.find(a => a.city === value);

  return (
    <div ref={containerRef} className="relative">
      <div className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 transition hover:border-brand/60 overflow-hidden">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MapPin size={16} /> {label}
        </span>
        <div className="mt-2 sm:mt-3 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent text-base sm:text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            autoComplete="off"
          />
          {selectedAirport && (
            <span className="whitespace-nowrap rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
              {selectedAirport.code}
            </span>
          )}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg pointer-events-auto">
          {suggestions.map((airport, index) => (
            <button
              key={airport.code}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(airport);
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-3 text-left transition cursor-pointer ${
                index === selectedIndex
                  ? 'bg-brand/10'
                  : 'hover:bg-slate-50'
              } ${index !== suggestions.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {airport.city}
                  </p>
                  <p className="text-xs text-slate-600">{airport.country}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-semibold text-slate-700">
                  {airport.code}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && suggestions.length === 0 && value.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg text-center text-sm text-slate-600">
          No airports found
        </div>
      )}
    </div>
  );
}
