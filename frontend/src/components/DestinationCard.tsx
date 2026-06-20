import Card from "./ui/Card";

type DestinationCardProps = {
  city: string;
  airport: string;
  offer: string;
  image: string;
};

export default function DestinationCard({
  city,
  airport,
  offer,
  image,
}: DestinationCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden ${image} p-6 text-white`}
      as="div"
    >
      <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/25" />
      <div className="relative space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-100/80">
          {airport}
        </p>
        <h3 className="text-2xl font-semibold">{city}</h3>
        <p className="max-w-xs text-sm leading-6 text-slate-100/85">{offer}</p>
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90">
          Explore now
        </span>
      </div>
    </Card>
  );
}
