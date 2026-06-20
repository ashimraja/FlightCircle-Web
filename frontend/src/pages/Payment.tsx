import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, DollarSign, Smartphone } from "lucide-react";

const paymentMethods = [
  { id: "card", title: "Credit card", icon: CreditCard },
  { id: "upi", title: "UPI payment", icon: Smartphone },
  { id: "wallet", title: "Wallet", icon: DollarSign },
];

export default function Payment() {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-10">
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">
              Payment
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:mt-3 sm:text-3xl">
              Choose your preferred payment method
            </h1>
          </div>
          <div className="rounded-full bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:px-4 sm:text-sm">
            Secure checkout
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          {paymentMethods.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setMethod(option.id)}
                className={`rounded-2xl border p-4 text-left transition sm:rounded-[1.75rem] sm:p-5 ${
                  method === option.id
                    ? "border-brand bg-brand/5 shadow-soft"
                    : "border-slate-200 bg-slate-50 hover:border-brand/60"
                }`}
              >
                <div className="flex items-center gap-2 text-brand sm:gap-3">
                  <Icon size={20} className="sm:size-22" />
                  <p className="text-sm font-semibold text-slate-900 sm:text-base">
                    {option.title}
                  </p>
                </div>
                <p className="mt-2 text-xs text-slate-600 sm:mt-3 sm:text-sm">
                  A modern payment option for your booking flow.
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:mt-8 sm:rounded-[2rem] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-sm">
            Payment details
          </p>
          <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
            <label className="block rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
              <span className="text-xs font-medium text-slate-700 sm:text-sm">
                Card number
              </span>
              <input
                className="mt-2 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:mt-3 sm:text-lg"
                placeholder="1234 5678 9012 3456"
              />
            </label>
            <div className="grid gap-3 grid-cols-2 sm:gap-4">
              <label className="block rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                <span className="text-xs font-medium text-slate-700 sm:text-sm">
                  Expiry
                </span>
                <input
                  className="mt-2 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:mt-3 sm:text-lg"
                  placeholder="08/28"
                />
              </label>
              <label className="block rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
                <span className="text-xs font-medium text-slate-700 sm:text-sm">
                  CVC
                </span>
                <input
                  className="mt-2 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:mt-3 sm:text-lg"
                  placeholder="123"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand sm:text-sm">
              Booking summary
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:mt-3 sm:text-2xl">
              Complete your reservation
            </h2>
          </div>
          <div className="rounded-full bg-slate-50 px-2 py-1.5 text-xs text-slate-600 whitespace-nowrap sm:px-4 sm:py-2 sm:text-sm">
            Total due
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 grid-cols-2 sm:grid-cols-2">
          {[
            { label: "Ticket price", value: "$412" },
            { label: "Service fees", value: "$34" },
            { label: "Taxes", value: "$28" },
            { label: "Total", value: "$474" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 shadow-sm sm:rounded-3xl sm:p-5 sm:text-sm"
            >
              <p className="font-semibold text-slate-900">{item.label}</p>
              <p className="mt-1 text-base sm:mt-3 sm:text-lg font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-600 sm:mt-6 sm:text-sm sm:leading-6">
          Payments are processed securely via our payment provider. This page
          demonstrates the checkout flow; live provider credentials are used in
          production.
        </p>
        <button
          type="button"
          onClick={() => navigate("/success")}
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand px-4 py-3 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:mt-8 sm:text-sm gap-2"
        >
          Pay $474 <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
