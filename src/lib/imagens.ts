import type { ImageMetadata } from 'astro';

// As fotografias carregadas no painel ficam em src/assets/media e o site reduz e converte-as sozinho.
// Procuramos pelo nome do ficheiro: se a foto já não existir (por exemplo, apagada no painel), a entrada aparece
// sem foto em vez de falhar a publicação.
const fotos = import.meta.glob<ImageMetadata>('/src/assets/media/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

export function foto(caminho?: string): ImageMetadata | undefined {
  if (!caminho) return undefined;
  const nome = caminho.split(/[?#]/)[0].split('/').pop() ?? '';
  let descodificado = nome;
  try {
    descodificado = decodeURIComponent(nome);
  } catch {}
  return fotos[`/src/assets/media/${descodificado}`] ?? fotos[`/src/assets/media/${nome}`];
}
