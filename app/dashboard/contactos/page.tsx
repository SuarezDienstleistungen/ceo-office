const items = [
  ["Clientes", "Personas y empresas que contratan servicios."],
  ["Candidatos", "Talento disponible para futuras contrataciones."],
  ["Proveedores", "Contactos comerciales y condiciones."],
  ["Seguimientos", "Próximos contactos y conversaciones pendientes."],
  ["Etiquetas", "Organización por tipo, ciudad o empresa."],
  ["Importar", "Carga futura desde Google Contacts."],
];
export default function Page() {
  return (
    <section className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Módulo</p>
      <h1 className="mt-3 text-4xl font-bold">Contactos</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">Centraliza clientes, candidatos, proveedores y colaboradores.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([title, description]) => (
          <article key={title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm text-zinc-400">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
