// Dados estruturados (schema.org) que ajudam o Google a perceber quem somos, os eventos e as notícias.
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export const SITE = 'https://guimaraesemmovimento.pt';
export const NOME = 'Associação Guimarães em Movimento';

const ORGANIZACAO_ID = `${SITE}/#organizacao`;

export const organizacao = {
  '@type': 'SportsOrganization',
  '@id': ORGANIZACAO_ID,
  name: NOME,
  alternateName: 'AGEM',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 600, height: 600 },
  image: `${SITE}/og.png`,
  foundingDate: '2026-10-07',
  taxID: '519670051',
  address: { '@type': 'PostalAddress', addressLocality: 'Guimarães', addressCountry: 'PT' },
};

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE}/#site`,
  url: `${SITE}/`,
  name: NOME,
  alternateName: 'AGEM',
  inLanguage: 'pt-PT',
  publisher: { '@id': ORGANIZACAO_ID },
};

export const referenciaOrganizacao = { '@id': ORGANIZACAO_ID };

export function migalhas(itens: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: itens.map(([nome, caminho], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: nome,
      item: new URL(caminho, SITE).href,
    })),
  };
}

/** Endereço da imagem usada nas partilhas e no Google: a foto recortada a 1200×630, ou o logótipo. */
export async function imagemPartilha(foto?: ImageMetadata) {
  if (!foto) return `${SITE}/og.png`;
  const r = await getImage({
    src: foto,
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'jpg',
    quality: 82,
    layout: 'none',
  });
  return new URL(r.src, SITE).href;
}
