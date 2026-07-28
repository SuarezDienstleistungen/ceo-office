"use client";

import type { CalendarEvent } from "./AgendaCalendar";

type AgendaEventsProps = {
  selectedDate: string;
  events: CalendarEvent[];
  onDelete: (id: number) => void;
};

export default function AgendaEvents({
  selectedDate,
  events,
  onDelete,
}: AgendaEventsProps) {
  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${selectedDate}T12:00:00`));

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Eventos del día</p>
      <h2 className="mt-1 text-xl font-bold capitalize">{formattedDate}</h2>

      <div className="mt-6 space-y-3">
        {selectedEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-6 text-center">
            <p className="font-semibold text-zinc-300">Día libre</p>
            <p className="mt-2 text-sm text-zinc-500">No hay eventos programados.</p>
          </div>
        ) : (
          selectedEvents.map((event) => (
            <article
              key={event.id}
              className="group rounded-2xl border border-zinc-800 bg-black/30 p-4 transition hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                      {event.time}
                    </span>
                    <span className="text-xs text-zinc-500">{event.type}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{event.title}</h3>
                  {event.notes && (
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{event.notes}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="rounded-lg px-2 py-1 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                  aria-label={`Eliminar ${event.title}`}
                >
                  ×
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
