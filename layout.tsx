import Link from "next/link";
import type { ReactNode } from "react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "⌂" },
  { name: "Agenda", href: "/dashboard/agenda", icon: "▣" },
  { name: "Correos", href: "/dashboard/correos", icon: "✉" },
  { name: "Contactos", href: "/dashboard/contactos", icon: "◎" },
  { name: "Documentos", href: "/dashboard/documentos", icon: "▤" },
  { name: "Finanzas", href: "/dashboard/finanzas", icon: "€" },
  { name: "Empresas", href: "/dashboard/empresas", icon: "◆" },
  { name: "COO Digital", href: "/dashboard/coo", icon: "✦" },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-800 bg-black lg:flex lg:flex-col">
        <div className="border-b border-zinc-800 px-6 py-6">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-yellow-500">
            CEO
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Office
          </h1>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            >
              <span className="w-5 text-center text-yellow-500">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <Link
            href="/dashboard/configuracion"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <span className="w-5 text-center text-yellow-500">⚙</span>
            Configuración
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-6 backdrop-blur lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Empresa activa
            </p>

            <button className="mt-1 text-sm font-medium text-white">
              Suarez Dienstleistungen ▾
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notificaciones"
              className="rounded-xl border border-zinc-800 px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              ◉
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
                NS
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium">Nacher Suarez</p>
                <p className="text-xs text-zinc-500">CEO</p>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}