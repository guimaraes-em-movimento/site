// Modo "em breve": enquanto o site não é lançado, quem não tem a palavra-passe só vê a página /em-breve/.
// A palavra-passe é a variável SENHA do projeto no Cloudflare Pages (Settings → Variables), nunca no repo.
// Sem SENHA definida, ninguém entra. Para lançar o site: apagar este ficheiro, src/pages/em-breve.astro e
// public/_routes.json.

const COOKIE = 'agem_acesso';

async function chave(senha) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`agem-em-breve:${senha}`));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function lerCookie(request, nome) {
  for (const parte of (request.headers.get('Cookie') ?? '').split(';')) {
    const [k, ...v] = parte.trim().split('=');
    if (k === nome) return v.join('=');
  }
  return null;
}

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);

  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.toString(), 301);
  }

  const senha = env.SENHA;
  const esperado = senha ? await chave(senha) : null;

  if (url.pathname === '/entrar' && request.method === 'POST') {
    let tentativa = null;
    try {
      tentativa = (await request.formData()).get('senha');
    } catch {}
    const certo = esperado !== null && tentativa === senha;
    const headers = new Headers({ Location: certo ? '/' : '/?erro=1' });
    if (certo) headers.append('Set-Cookie', `${COOKIE}=${esperado}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);
    return new Response(null, { status: 303, headers });
  }

  if (url.pathname === '/sair') {
    return new Response(null, {
      status: 303,
      headers: { Location: '/', 'Set-Cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` },
    });
  }

  if (esperado !== null && lerCookie(request, COOKIE) === esperado) return next();

  const pagina = await env.ASSETS.fetch(new URL('/em-breve/', url));
  return new Response(pagina.body, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}
