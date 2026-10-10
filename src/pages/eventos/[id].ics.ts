import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

// Ficheiro de calendário (.ics) de cada evento: abre no calendário do iPhone, Outlook, etc.
export const getStaticPaths = (async () => {
  const eventos = await getCollection('eventos', ({ data }) => !data.rascunho);
  return eventos.map((evento) => ({ params: { id: evento.id }, props: { evento } }));
}) satisfies GetStaticPaths;

const texto = (t: string) => t.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const dia = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');

// As linhas de um .ics não podem passar de 75 bytes: as seguintes continuam com um espaço.
function dobrar(linha: string) {
  const partes: string[] = [];
  let atual = '';
  let bytes = 0;
  for (const c of linha) {
    const n = new TextEncoder().encode(c).length;
    if (bytes + n > (partes.length ? 74 : 75)) {
      partes.push(atual);
      atual = '';
      bytes = 0;
    }
    atual += c;
    bytes += n;
  }
  partes.push(atual);
  return partes.join('\r\n ');
}

export const GET: APIRoute = ({ props, site }) => {
  const { evento } = props as { evento: CollectionEntry<'eventos'> };
  const { titulo, data, hora, local } = evento.data;
  const url = new URL(`/eventos/${evento.id}/`, site).href;
  const seguinte = new Date(data.getTime() + 864e5);
  const linhas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Associacao Guimaraes em Movimento//Site//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${evento.id}@guimaraesemmovimento.pt`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${dia(data)}`,
    `DTEND;VALUE=DATE:${dia(seguinte)}`,
    `SUMMARY:${texto(titulo)}`,
    local && `LOCATION:${texto(local)}`,
    `DESCRIPTION:${texto([hora, url].filter(Boolean).join('\n\n'))}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter((l): l is string => Boolean(l));
  return new Response(linhas.map(dobrar).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
