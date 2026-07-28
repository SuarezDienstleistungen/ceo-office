"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    setMessage("Inicio de sesión correcto. Entrando...");
    window.location.href = "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-yellow-400">
          CEO Office
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Centro de Operaciones Personal
        </p>

        <form onSubmit={handleLogin} className="mt-10 space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Comprobando..." : "Iniciar sesión"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-center text-sm text-zinc-300">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}