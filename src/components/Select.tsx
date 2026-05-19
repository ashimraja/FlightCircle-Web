import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  ariaLabel?: string;
};

export default function Select({
  value,
  onChange,
  options,
  className = "",
  ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        onClick={() => setOpen((s) => !s)}
      >
        <span className="truncate text-left">{selected?.label}</span>
        <ChevronDown size={16} className="ml-2 text-slate-400" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 z-50 mt-2 w-full min-w-[10rem] rounded-md border border-slate-200 bg-white shadow-lg"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 ${
                opt.value === value ? "font-semibold" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
