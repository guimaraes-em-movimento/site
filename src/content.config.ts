import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// O painel (Pages CMS) grava campos vazios como "" ou null: tratamos ambos como "sem valor".
const texto = z
  .string()
  .nullish()
  .transform((v) => (v && v.trim() ? v.trim() : undefined));

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    resumo: texto,
    imagem: texto,
    imagem_descricao: texto,
    rascunho: z.boolean().nullish(),
  }),
});

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string(),
    subtitulo: texto,
    data: z.coerce.date(),
    hora: texto,
    local: texto,
    mapa: texto,
    resumo: texto,
    imagem: texto,
    imagem_descricao: texto,
    rascunho: z.boolean().nullish(),
  }),
});

export const collections = { noticias, eventos };
