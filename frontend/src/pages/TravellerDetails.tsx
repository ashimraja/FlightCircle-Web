import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LayoutGrid, User } from "lucide-react";

const seats = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function TravellerDetails() {
  const [selectedSeat, setSelectedSeat] = useState("A1");
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-10">
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">
              Passenger details
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
              Add traveler information
            </h1>
          </div>
          <div className="rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:px-4 sm:text-sm">
            2 passengers
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            { label: "First name", placeholder: "Avery" },
            { label: "Last name", placeholder: "Morgan" },
            { label: "Email", placeholder: "avery.morgan@email.com" },
            { label: "Phone", placeholder: "+1 415 555 0172" },
          ].map((field) => (
            <label
              key={field.label}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:rounded-3xl sm:p-4"
            >
              <span className="text-xs font-medium text-slate-700 sm:text-sm">
                {field.label}
              </span>
              <input
                type="text"
                placeholder={field.placeholder}
                className="mt-2 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:mt-3 sm:text-lg"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-6 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand sm:gap-3 sm:text-sm">
            <User size={16} className="sm:size-18" /> Seat details
          </div>
          <p className="mt-4 text-2xl font-semibold text-slate-900 sm:mt-5 sm:text-3xl">
            Select your seat
          </p>
          <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
            Choose a comfortable position in the cabin. Seating options are
            presented for selection; final assignments are subject to airline
            availability.
          </p>

          <div className="mt-6 grid gap-2 sm:mt-10 sm:gap-3 grid-cols-3 sm:grid-cols-3">
            {seats.map((seat) => (
              <button
                key={seat}
                type="button"
                onClick={() => setSelectedSeat(seat)}
                className={`rounded-2xl border px-2 py-3 text-left transition sm:rounded-3xl sm:px-4 sm:py-5 ${
                  selectedSeat === seat
                    ? "border-brand bg-brand/10 text-slate-900 shadow-soft"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand/60"
                }`}
              >
                <p className="text-xs text-slate-500 sm:text-sm">Seat</p>
                <p className="mt-2 text-base font-semibold sm:mt-3 sm:text-xl">
                  {seat}
                </p>
              </button>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500 sm:gap-3 sm:text-sm">
            <LayoutGrid size={16} className="sm:size-18" /> Booking summary
          </div>
          <div className="mt-4 space-y-3 text-xs text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
              <p className="font-semibold text-slate-900">Seat selection</p>
              <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                {selectedSeat} assigned
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
              <p className="font-semibold text-slate-900">Flight class</p>
              <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                Premium Economy
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
              <p className="font-semibold text-slate-900">Baggage</p>
              <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm">
                1 carry-on + 1 checked bag
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/payment")}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white transition hover:bg-brand-dark sm:mt-8 sm:px-5 sm:text-sm gap-2"
          >
            Continue to payment <ArrowRight size={16} />
          </button>
        </aside>
      </section>
    </div>
  );
}
