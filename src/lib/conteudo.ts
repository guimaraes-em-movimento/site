import { getCollection } from 'astro:content';

// As datas do painel são só dia (sem hora): formatamos em UTC para nunca "saltar" um dia.
const fmt = (opcoes: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('pt-PT', { timeZone: 'UTC', ...opcoes });

export const dataLonga = (d: Date) => fmt({ day: 'numeric', month: 'long', year: 'numeric' }).format(d);
export const diaSemana = (d: Date) => fmt({ weekday: 'long' }).format(d);
export const dia = (d: Date) => fmt({ day: 'numeric' }).format(d);
export const mesCurto = (d: Date) => fmt({ month: 'short' }).format(d).replace('.', '');
export const isoDia = (d: Date) => d.toISOString().slice(0, 10);

const hojeISO = () => new Date().toISOString().slice(0, 10);

export async function noticias() {
  const todas = await getCollection('noticias', ({ data }) => !data.rascunho);
  return todas.sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}

export async function eventos() {
  const todos = await getCollection('eventos', ({ data }) => !data.rascunho);
  const hoje = hojeISO();
  const proximos = todos
    .filter((e) => isoDia(e.data.data) >= hoje)
    .sort((a, b) => a.data.data.valueOf() - b.data.data.valueOf());
  const realizados = todos
    .filter((e) => isoDia(e.data.data) < hoje)
    .sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
  return { proximos, realizados };
}
