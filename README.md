# Guimarães em Movimento — site

Site público da Associação Guimarães em Movimento: **guimaraesemmovimento.pt**.

## Como publicar notícias e eventos

1. Abra **[guimaraesemmovimento.pt/admin](https://guimaraesemmovimento.pt/admin)** (abre o painel de edição, o
   Pages CMS) e entre com o email com que foi convidado(a).
2. Se lhe pedir para escolher um projeto, escolha **guimaraes-em-movimento / site**.
3. No menu da esquerda, escolha **Notícias** ou **Eventos** e carregue em **Add an entry** (adicionar).
4. Preencha os campos e carregue em **Save** (guardar).
5. O site atualiza-se sozinho em 1–2 minutos.

### Dicas

- **Rascunho:** se ativar "Rascunho", a entrada fica guardada mas não aparece no site. Desative quando estiver pronta.
- **Fotografias:** prefira fotos na horizontal e com menos de 1 MB. Fotos tiradas com o telemóvel costumam ter 3–5 MB;
  reduza-as antes de enviar (por exemplo, enviando-as primeiro para si próprio pelo WhatsApp).
- **Descrição da imagem:** escreva numa frase o que se vê na foto. Ajuda quem usa leitores de ecrã.
- **Eventos:** os eventos aparecem em "Próximos" até ao próprio dia e depois passam para "Realizados".
- **Fotografias de pessoas:** só publique fotos de crianças e jovens com autorização dos pais ou encarregados de
  educação.

## Regras

- Este repositório é público: não colocar aqui palavras-passe, chaves nem dados pessoais de sócios.
- Os dados de sócios e quotas ficam nas ferramentas internas da associação, nunca aqui.

## Como funciona

Site estático feito com [Astro](https://astro.build), publicado no [Cloudflare Pages](https://pages.cloudflare.com/)
a cada alteração. Os conteúdos estão em `src/content/` (Markdown) e as imagens em `public/media/`.

Enquanto o site não é lançado, quem o visita vê só uma página "Em breve". Para ver o site completo, abra
**Acesso reservado** nessa página e escreva a palavra-passe (peça-a à Direção). As alterações publicadas continuam a
aparecer normalmente para quem entrou.
