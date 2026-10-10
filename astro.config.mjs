import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://guimaraesemmovimento.pt',
  // Fotografias no meio dos textos: o site gera várias larguras e o browser escolhe a mais leve.
  image: { layout: 'constrained' },
});
