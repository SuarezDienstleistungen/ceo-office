"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "▦" },
  { name: "Agenda", href: "/dashboard/agenda", icon: "◫" },
  { name: "Correos", href: "/dashboard/correos", icon: "✉" },
  { name: "Contactos", href: "/dashboard/contactos", icon: "◎" },
  { name: "Documentos", href: "/dashboard/documentos", icon: "▤" },
  { name: "Finanzas", href: "/dashboard/finanzas", icon: "€" },
  { name: "Contratos", href: "/dashboard/contratos", icon: "✎" },
  { name: "Empresas", href: "/dashboard/empresas", icon: "⌂" },
  { name: "COO Digital", href: "/dashboard/coo-digital", icon: "✦" },
  { name: "Configuración", href: "/dashboard/configuracion", icon: "⚙" },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {open && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-zinc-800 px-6 py-6">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <p className="text-2xl font-black tracking-tight text-yellow-400">CEO Office</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-zinc-500">
              Centro de operaciones
            </p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navigation.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-yellow-400 text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-base" aria-hidden="true">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Empresa activa</p>
            <p className="mt-1 text-sm font-semibold">Suarez Dienstleistungen</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-zinc-800 bg-black/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-zinc-800 px-3 py-2 text-zinc-300 lg:hidden"
            aria-label="Abrir menú"
          >
            ☰
          </button>

          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Empresa activa</p>
            <p className="text-sm font-semibold">Suarez Dienstleistungen</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              aria-label="Notificaciones"
              className="grid h-10 w-10 place-items-center rounded-full border border-zinc-800 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400"
            >
              ◉
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 font-bold text-black">
              NS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Nacher Suarez</p>
              <p className="text-xs text-zinc-500">CEO</p>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
