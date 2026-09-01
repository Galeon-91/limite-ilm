export default function StatsCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-tr-3xl rounded-bl-3xl border p-6 shadow-glow-sm ${
        accent
          ? "border-electric-200 bg-electric-600 text-white"
          : "border-electric-100 bg-white text-ink-900"
      }`}
    >
      <p
        className={`font-sans text-xs font-bold uppercase tracking-wide ${
          accent ? "text-electric-100" : "text-ink-800/60"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 font-sans text-3xl font-extrabold">{value}</p>
    </div>
  );
}
