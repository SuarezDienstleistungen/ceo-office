"use client";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
};

type AgendaCalendarProps = {
  month: Date;
  selectedDate: string;
  events: CalendarEvent[];
  onSelectDate: (date: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
};

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function AgendaCalendar({
  month,
  selectedDate,
  events,
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: AgendaCalendarProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - startOffset + 1;
    return day >= 1 && day <= lastDay.getDate() ? day : null;
  });
  const todayKey = new Date().toLocaleDateString("sv-SE");
  const title = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(month);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Calendario</p>
          <h2 className="mt-1 text-xl font-bold capitalize">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:border-yellow-500 hover:text-yellow-400"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="Mes anterior"
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Mes siguiente"
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="pb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sm:text-xs"
          >
            {day}
          </div>
        ))}

        {cells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="aspect-square rounded-xl" />;
          }

          const dateKey = toDateKey(year, monthIndex, day);
          const dayEvents = events.filter((event) => event.date === dateKey);
          const selected = selectedDate === dateKey;
          const today = todayKey === dateKey;

          return (
            <button
              type="button"
              key={dateKey}
              onClick={() => onSelectDate(dateKey)}
              className={`relative aspect-square rounded-xl border p-1 text-sm transition sm:p-2 ${
                selected
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-zinc-800 bg-black/30 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <span className={today && !selected ? "font-bold text-yellow-400" : "font-semibold"}>
                {day}
              </span>
              {dayEvents.length > 0 && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                    selected ? "bg-black" : "bg-yellow-400"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
