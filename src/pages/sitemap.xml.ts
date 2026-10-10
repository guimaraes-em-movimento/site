import type { APIRoute } from 'astro';
import { eventos, isoDia, noticias } from '../lib/conteudo';

// Lista de páginas para os motores de busca (referida no robots.txt).
export const GET: APIRoute = async ({ site }) => {
  const { proximos, realizados } = await eventos();
  const paginas: [string, string?][] = [
    ['/'],
    ['/eventos/'],
    ['/noticias/'],
    ['/associacao/'],
    ['/privacidade/'],
    ...[...proximos, ...realizados].map((e): [string] => [`/eventos/${e.id}/`]),
    ...(await noticias()).map((n): [string, string] => [`/noticias/${n.id}/`, isoDia(n.data.data)]),
  ];
  const urls = paginas
    .map(([caminho, data]) => {
      const loc = new URL(caminho, site).href;
      return `  <url><loc>${loc}</loc>${data ? `<lastmod>${data}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
