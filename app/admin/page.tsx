import Link from "next/link";
import { getDashboardStats, getDailyViews, getAllMessages } from "@/lib/queries";
import StatsCard from "@/components/admin/StatsCard";
import ViewsBarChart from "@/components/admin/ViewsBarChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [stats, dailyViews, messages] = await Promise.all([
    getDashboardStats(),
    getDailyViews(14),
    getAllMessages(),
  ]);

  const latestMessages = messages.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-2xl font-extrabold text-ink-900">Resumen</h1>
        <p className="mt-1 font-serif text-ink-800">
          Lo que está pasando en Límite ILM esta semana.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Artículos publicados" value={stats.totalArticles - stats.draftArticles} accent />
        <StatsCard label="Borradores" value={stats.draftArticles} />
        <StatsCard label="Visitas (7 días)" value={stats.viewsLast7d} />
        <StatsCard label="Mensajes sin leer" value={stats.unreadMessages} />
      </div>

      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-6 shadow-glow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-sans text-lg font-bold text-ink-900">
            Visitas — últimos 14 días
          </h2>
          <Link
            href="/admin/analitica"
            className="font-sans text-sm font-semibold text-electric-600 hover:text-electric-700"
          >
            Ver analítica completa →
          </Link>
        </div>
        <ViewsBarChart data={dailyViews} />
      </div>

      <div className="rounded-tr-3xl rounded-bl-3xl border border-electric-100 bg-white p-6 shadow-glow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-sans text-lg font-bold text-ink-900">Últimos mensajes</h2>
          <Link
            href="/admin/mensajes"
            className="font-sans text-sm font-semibold text-electric-600 hover:text-electric-700"
          >
            Ver todos →
          </Link>
        </div>
        {latestMessages.length === 0 ? (
          <p className="font-serif text-sm text-ink-800/60">
            Todavía no ha llegado ningún mensaje.
          </p>
        ) : (
          <ul className="divide-y divide-electric-100">
            {latestMessages.map((m) => (
              <li key={m.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-sans text-sm font-semibold text-ink-900">
                    {m.name} {!m.read && <span className="ml-1 text-electric-600">●</span>}
                  </p>
                  <p className="font-serif text-sm text-ink-800/70">
                    {m.subject || m.message.slice(0, 60)}
                  </p>
                </div>
                <span className="font-serif text-xs text-ink-800/50">
                  {new Date(m.created_at).toLocaleDateString("es-ES")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
