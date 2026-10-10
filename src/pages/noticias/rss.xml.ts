import type { APIRoute } from 'astro';
import { noticias } from '../../lib/conteudo';
import { NOME } from '../../lib/seo';

// Feed RSS das notícias: permite a jornais, agregadores e leitores de feeds receber as notícias automaticamente.
const xml = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const feed = new URL('/noticias/rss.xml', site).href;
  const itens = (await noticias())
    .map((n) => {
      const link = new URL(`/noticias/${n.id}/`, site).href;
      return [
        '    <item>',
        `      <title>${xml(n.data.titulo)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${n.data.data.toUTCString()}</pubDate>`,
        n.data.resumo ? `      <description>${xml(n.data.resumo)}</description>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');
  const corpo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`Notícias · ${NOME}`)}</title>
    <link>${new URL('/noticias/', site).href}</link>
    <description>Notícias da Associação Guimarães em Movimento.</description>
    <language>pt-PT</language>
    <atom:link href="${feed}" rel="self" type="application/rss+xml" />
${itens}
  </channel>
</rss>
`;
  return new Response(corpo, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
