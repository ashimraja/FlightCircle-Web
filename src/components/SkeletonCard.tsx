export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-6 h-5 w-48 rounded-full bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-3">
          <div className="h-8 w-24 rounded-full bg-slate-200" />
          <div className="h-4 w-32 rounded-full bg-slate-200" />
        </div>
        <div className="space-y-3">
          <div className="h-8 w-full rounded-full bg-slate-200" />
          <div className="h-4 w-32 rounded-full bg-slate-200" />
        </div>
        <div className="space-y-3">
          <div className="h-8 w-28 rounded-full bg-slate-200" />
          <div className="h-12 w-full rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
