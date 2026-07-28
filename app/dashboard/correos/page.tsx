const cards = [
  ["Bandeja de entrada", "Consulta todos los correos recibidos."],
  ["Enviados", "Historial de mensajes enviados."],
  ["Borradores", "Continúa redactando mensajes pendientes."],
  ["Importantes", "Correos que requieren atención prioritaria."],
  ["Seguimientos", "Conversaciones que necesitan una respuesta."],
  ["COO Digital", "Clasificación, resumen y redacción asistida."],
];
export default function CorreosPage() {
  return <section className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Módulo</p><h1 className="mt-3 text-4xl font-bold">Correos</h1><p className="mt-3 max-w-3xl text-zinc-400">Administra tus cuentas de correo y permite que el COO Digital priorice lo importante.</p><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{cards.map(([t,d],i)=><article key={t} className={`rounded-2xl border bg-zinc-900 p-6 ${i===5?'border-yellow-500/60':'border-zinc-800'}`}><h2 className={`text-xl font-semibold ${i===5?'text-yellow-400':''}`}>{t}</h2><p className="mt-3 text-sm text-zinc-400">{d}</p></article>)}</div></section>;
}
