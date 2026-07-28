"use client";

import { FormEvent, useState } from "react";

export type AgendaTask = {
  id: number;
  title: string;
  completed: boolean;
};

type AgendaTasksProps = {
  tasks: AgendaTask[];
  onToggle: (id: number) => void;
  onAdd: (title: string) => void;
  onDelete: (id: number) => void;
};

export default function AgendaTasks({
  tasks,
  onToggle,
  onAdd,
  onDelete,
}: AgendaTasksProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Organización</p>
          <h2 className="mt-1 text-xl font-bold">Tareas pendientes</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:max-w-md">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nueva tarea"
            className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white outline-none focus:border-yellow-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black hover:bg-yellow-300"
          >
            Añadir
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-5 text-sm text-zinc-500">
            No tienes tareas pendientes.
          </div>
        ) : (
          tasks.map((task) => (
            <article
              key={task.id}
              className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black/30 p-4"
            >
              <button
                type="button"
                onClick={() => onToggle(task.id)}
                aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
                  task.completed
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-zinc-600 text-transparent hover:border-yellow-500"
                }`}
              >
                ✓
              </button>
              <p
                className={`min-w-0 flex-1 text-sm ${
                  task.completed ? "text-zinc-600 line-through" : "text-zinc-300"
                }`}
              >
                {task.title}
              </p>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="text-zinc-600 hover:text-red-400"
                aria-label={`Eliminar ${task.title}`}
              >
                ×
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
