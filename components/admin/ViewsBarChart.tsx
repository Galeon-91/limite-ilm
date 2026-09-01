export default function ViewsBarChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex h-40 gap-1.5">
      {data.map((d) => (
        <div
          key={d.date}
          className="group relative flex h-full flex-1 flex-col justify-end"
        >
          <div
            className="w-full rounded-t-md bg-electric-500 transition-colors group-hover:bg-electric-600"
            style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
          />
          <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 font-sans text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {d.date.slice(5)}: {d.count}
          </div>
        </div>
      ))}
    </div>
  );
}
