import Link from "next/link";

const metrics = [
  { label: "Ingresos este mes", value: "0,00 €", detail: "Sin datos conectados" },
  { label: "Presupuestos pendientes", value: "0", detail: "Todo al día" },
  { label: "Correos importantes", value: "0", detail: "Gmail pendiente" },
  { label: "Clientes nuevos", value: "0", detail: "Este mes" },
  { label: "Próximo servicio", value: "—", detail: "Agenda pendiente" },
];

const shortcuts = [
  ["Agenda", "/dashboard/agenda"],
  ["Correos", "/dashboard/correos"],
  ["Documentos", "/dashboard/documentos"],
  ["Finanzas", "/dashboard/finanzas"],
];

export default function DashboardPage() {
  return (
    <section className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
        Centro de operaciones
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Buenos días, Nacher</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Aquí tendrás las prioridades, riesgos y próximos pasos de todas tus empresas.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">{metric.label}</p>
            <p className="mt-3 text-2xl font-bold text-white">{metric.value}</p>
            <p className="mt-2 text-xs text-zinc-500">{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-yellow-500/40 bg-zinc-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">COO Digital</p>
          <h2 className="mt-3 text-2xl font-semibold">Resumen ejecutivo</h2>
          <p className="mt-3 text-zinc-400">
            Todavía no hay fuentes conectadas. Cuando activemos Calendar, Gmail y Supabase, aquí aparecerán automáticamente las prioridades del día.
          </p>
          <Link href="/dashboard/coo-digital" className="mt-6 inline-flex rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-300">
            Abrir COO Digital
          </Link>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Accesos rápidos</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {shortcuts.map(([name, href]) => (
              <Link key={href} href={href} className="rounded-xl border border-zinc-800 p-4 text-sm font-medium hover:border-yellow-500 hover:text-yellow-400">
                {name}
              </Link>
            ))}
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold">Actividad reciente</h2>
        <p className="mt-3 text-sm text-zinc-500">La actividad aparecerá aquí cuando comiences a crear registros.</p>
      </article>
    </section>
  );
}
