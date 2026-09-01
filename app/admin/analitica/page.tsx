import { getDailyViews, getTopPaths, getDashboardStats } from "@/lib/queries";
import StatsCard from "@/components/admin/StatsCard";
import ViewsBarChart from "@/components/admin/ViewsBarChart";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const [dailyViews, topPaths, stats] = await Promise.all([
    getDailyViews(30),
    getTopPaths(8),
    getDashboardStats(),
  ]);

  const total30d = dailyViews.reduce((sum, d) => sum + d.count, 0);
  const maxPath = Math.max(1, ...topPaths.map((p) => p.count));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-2xl font-extrabold text-ink-900">Analítica</h1>
        <p className="mt-1 font-serif text-ink-800">
          Tráfico real de limite-ilm.com, medido con nuestra propia tabla de
          visitas (sin cookies de terceros).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Visitas (30 días)" value={total30d} accent />
        <StatsCard label="Visitas (7 días)" value={stats.viewsLast7d} />
        <StatsCard
          label="Media diaria (30 días)"
          value={Math.round(total30d / 30)}
        />
      </div>

      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-6 shadow-glow-sm">
        <h2 className="mb-4 font-sans text-lg font-bold text-ink-900">
          Visitas por día — últimos 30 días
        </h2>
        <ViewsBarChart data={dailyViews} />
      </div>

      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-6 shadow-glow-sm">
        <h2 className="mb-4 font-sans text-lg font-bold text-ink-900">
          Páginas más visitadas — últimos 30 días
        </h2>
        {topPaths.length === 0 ? (
          <p className="font-serif text-sm text-ink-800/60">
            Todavía no hay datos suficientes.
          </p>
        ) : (
          <ul className="space-y-3">
            {topPaths.map((p) => (
              <li key={p.path}>
                <div className="mb-1 flex items-center justify-between font-serif text-sm">
                  <span className="truncate text-ink-900">{p.path}</span>
                  <span className="ml-3 shrink-0 font-sans font-semibold text-ink-800/60">
                    {p.count}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-electric-50">
                  <div
                    className="h-full rounded-full bg-electric-500"
                    style={{ width: `${(p.count / maxPath) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
