"use client";

import { useMemo, useState } from "react";
import AgendaCalendar, {
  type CalendarEvent,
} from "@/components/agenda/AgendaCalendar";
import AgendaEvents from "@/components/agenda/AgendaEvents";
import AgendaHeader from "@/components/agenda/AgendaHeader";
import AgendaTasks, {
  type AgendaTask,
} from "@/components/agenda/AgendaTasks";
import NewEventButton, {
  type NewAgendaEvent,
} from "@/components/agenda/NewEventButton";

function dateKey(date: Date) {
  return date.toLocaleDateString("sv-SE");
}

function futureDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Revisar solicitudes de clientes",
    date: futureDate(0),
    time: "09:00",
    type: "Recordatorio",
    notes: "Comprobar formularios recibidos y responder los prioritarios.",
  },
  {
    id: 2,
    title: "Planificación semanal",
    date: futureDate(1),
    time: "10:30",
    type: "Reunión",
    notes: "Definir prioridades de Suarez Dienstleistungen y CEO Office.",
  },
  {
    id: 3,
    title: "Servicio de limpieza",
    date: futureDate(3),
    time: "14:00",
    type: "Servicio",
  },
];

const initialTasks: AgendaTask[] = [
  { id: 1, title: "Responder correos importantes", completed: false },
  { id: 2, title: "Revisar presupuesto pendiente", completed: false },
  { id: 3, title: "Organizar documentos de la empresa", completed: true },
];

export default function AgendaPage() {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(dateKey(today));
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [tasks, setTasks] = useState<AgendaTask[]>(initialTasks);

  const upcomingEvents = useMemo(
    () => events.filter((event) => event.date >= dateKey(new Date())).length,
    [events],
  );
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  function createEvent(event: NewAgendaEvent) {
    setEvents((current) => [
      ...current,
      {
        ...event,
        id: Date.now(),
      },
    ]);
    setSelectedDate(event.date);
    const createdDate = new Date(`${event.date}T12:00:00`);
    setMonth(new Date(createdDate.getFullYear(), createdDate.getMonth(), 1));
  }

  function selectToday() {
    const current = new Date();
    setSelectedDate(dateKey(current));
    setMonth(new Date(current.getFullYear(), current.getMonth(), 1));
  }

  return (
    <section className="p-5 sm:p-8 lg:p-10">
      <AgendaHeader eventCount={upcomingEvents} pendingTasks={pendingTasks} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-xl border border-zinc-800 bg-zinc-900 p-1 text-sm">
          <button type="button" className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-black">
            Mes
          </button>
          <button type="button" disabled className="px-4 py-2 text-zinc-600">
            Semana
          </button>
          <button type="button" disabled className="px-4 py-2 text-zinc-600">
            Día
          </button>
        </div>

        <NewEventButton defaultDate={selectedDate} onCreate={createEvent} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        <AgendaCalendar
          month={month}
          selectedDate={selectedDate}
          events={events}
          onSelectDate={setSelectedDate}
          onPreviousMonth={() =>
            setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
          }
          onNextMonth={() =>
            setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
          }
          onToday={selectToday}
        />

        <AgendaEvents
          selectedDate={selectedDate}
          events={events}
          onDelete={(id) => setEvents((current) => current.filter((event) => event.id !== id))}
        />
      </div>

      <div className="mt-6">
        <AgendaTasks
          tasks={tasks}
          onToggle={(id) =>
            setTasks((current) =>
              current.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
              ),
            )
          }
          onAdd={(title) =>
            setTasks((current) => [...current, { id: Date.now(), title, completed: false }])
          }
          onDelete={(id) => setTasks((current) => current.filter((task) => task.id !== id))}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 px-5 py-4 text-sm text-zinc-500">
        Los cambios funcionan durante esta sesión. La conexión permanente con Supabase y Google Calendar será la siguiente fase.
      </div>
    </section>
  );
}
