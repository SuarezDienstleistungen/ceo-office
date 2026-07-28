const items = [
  ["Archivos recientes", "Últimos documentos creados o modificados."],
  ["Plantillas", "Contratos, presupuestos, facturas y cartas."],
  ["Carpetas", "Organización por empresa, cliente o proyecto."],
  ["Compartidos", "Documentos enviados o recibidos."],
  ["Firmas", "Archivos pendientes de firma."],
  ["Google Drive", "Conexión prevista para sincronización."],
];
export default function Page() {
  return (
    <section className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Módulo</p>
      <h1 className="mt-3 text-4xl font-bold">Documentos</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">Organiza archivos empresariales, plantillas y expedientes en un solo lugar.</p>
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
