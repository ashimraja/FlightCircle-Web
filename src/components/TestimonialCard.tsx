type TestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
};

export default function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <p className="text-lg leading-8 text-slate-900">“{quote}”</p>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">{name.charAt(0)}</div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
