import Card from "./ui/Card";

export default function SkeletonCard() {
  return (
    <Card className="animate-pulse rounded-[2rem] p-6">
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
    </Card>
  );
}
