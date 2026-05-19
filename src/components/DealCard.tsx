type DealCardProps = {
  title: string;
  route: string;
  price: string;
  save: string;
};

export default function DealCard({ title, route, price, save }: DealCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">{title}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-slate-900">{route}</p>
          <p className="mt-2 text-sm text-slate-600">{save}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-3 text-lg font-semibold text-slate-900">{price}</div>
      </div>
    </div>
  );
}
