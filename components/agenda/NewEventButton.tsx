"use client";

import { FormEvent, useState } from "react";

export type NewAgendaEvent = {
  title: string;
  date: string;
  time: string;
  type: "Reunión" | "Servicio" | "Recordatorio" | "Personal";
  notes: string;
};

type NewEventButtonProps = {
  defaultDate: string;
  onCreate: (event: NewAgendaEvent) => void;
};

export default function NewEventButton({
  defaultDate,
  onCreate,
}: NewEventButtonProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("09:00");
  const [type, setType] = useState<NewAgendaEvent["type"]>("Reunión");
  const [notes, setNotes] = useState("");

  function closeModal() {
    setOpen(false);
    setTitle("");
    setNotes("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !date || !time) return;

    onCreate({
      title: title.trim(),
      date,
      time,
      type,
      notes: notes.trim(),
    });
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDate(defaultDate);
          setOpen(true);
        }}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
      >
        <span aria-hidden="true">＋</span>
        Nuevo evento
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
          <button
            type="button"
            aria-label="Cerrar ventana"
            className="absolute inset-0 cursor-default"
            onClick={closeModal}
          />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
                  Agenda
                </p>
                <h2 className="mt-2 text-2xl font-bold">Crear evento</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-zinc-800 px-3 py-2 text-zinc-400 hover:text-white"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Título</span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ej. Reunión con cliente"
                  autoFocus
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Fecha</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Hora</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Tipo</span>
                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value as NewAgendaEvent["type"])
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                >
                  <option>Reunión</option>
                  <option>Servicio</option>
                  <option>Recordatorio</option>
                  <option>Personal</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Notas</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Información adicional (opcional)"
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-300"
              >
                Guardar evento
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
