type AgendaHeaderProps = {
  eventCount: number;
  pendingTasks: number;
};

export default function AgendaHeader({
  eventCount,
  pendingTasks,
}: AgendaHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
          Módulo
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Agenda</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Organiza reuniones, servicios, recordatorios y tareas desde un único lugar.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <p className="text-2xl font-bold text-yellow-400">{eventCount}</p>
          <p className="text-xs text-zinc-500">Eventos próximos</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <p className="text-2xl font-bold text-yellow-400">{pendingTasks}</p>
          <p className="text-xs text-zinc-500">Tareas pendientes</p>
        </div>
      </div>
    </header>
  );
}
