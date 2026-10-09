# Guimarães em Movimento — plataformas digitais

## O que é

Configuração das plataformas digitais da associação Guimarães em Movimento: domínio, email, site público e
ferramentas de gestão interna. Orçamento: zero (só serviços gratuitos, além do domínio).

## Decisões (2026-10-09)

- **Domínio**: já registado. DNS no **Cloudflare** (plano gratuito).
- **Email + Drive + Calendário + Forms**: **Google Workspace for Nonprofits** (gratuito). A candidatura é feita em
  google.com/nonprofits e a verificação é da **Goodstack** (emails de `verifications@mail.goodstack.org`, 3–5 dias úteis),
  que pede prova de que a associação está legalmente constituída.
- **Site público**: site estático neste repo, publicado no **Cloudflare Pages** com o domínio próprio.
  Conteúdos em Markdown, editáveis por voluntários através de um CMS ligado ao git; estrutura e código ficam connosco.
- **Gestão de sócios e quotas**: Google Sheets + Forms (depois de o Workspace estar ativo). Não construir uma app.

## Alojamento

Nada deste projeto é alojado em servidores próprios: o site vive no Cloudflare Pages e o resto são serviços geridos.
**Não** há Dockerfile, containers nem deploy manual — o Pages publica a cada push para `main`.

## Repositório

- Público, na organização GitHub da associação: `github.com/guimaraes-em-movimento/site`.
- Não entram aqui segredos, dados de sócios nem nada que não possa ser lido por qualquer pessoa.

## Cuidados

- Mudanças de DNS num domínio ativo são visíveis para fora: confirmar com o user antes de as aplicar.
- Os registos MX do Cloudflare Email Routing (se forem usados enquanto o Google não aprova) entram em conflito com os do
  Google: apagá-los quando se mudar para o Workspace.
- Dados de sócios são dados pessoais (RGPD): nunca no repo.
