type SectionHeadingProps = {
  title: string;
  description: string;
};

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">{title}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{description}</p>
    </div>
  );
}
